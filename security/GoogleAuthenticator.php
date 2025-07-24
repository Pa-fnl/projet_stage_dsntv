<?php

namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Google_Client;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Security\Authenticator\OAuth2Authenticator;
use League\OAuth2\Client\Provider\GoogleUser;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class GoogleAuthenticator extends OAuth2Authenticator implements AuthenticationEntryPointInterface
{
    public function __construct(
        private ClientRegistry $clientRegistry,
        private EntityManagerInterface $entityManager,
        private RouterInterface $router
    ) {}

    public function supports(Request $request): ?bool
    {
        return $request->attributes->get('_route') === 'connect_google_check';
    }

    public function authenticate(Request $request): Passport
    {
        // 1) Fetch the OAuth2 access token

        $client      = $this->clientRegistry->getClient('google');
        $accessToken = $this->fetchAccessToken($client);

        // 2) Extract and verify the ID token (JWT)
        $values  = $accessToken->getValues();
        $idToken = $values['id_token'] ?? null;
        if (!$idToken) {
            throw new AuthenticationException('Google did not return an id_token.');
        }

        $googleClient = new Google_Client(['client_id' => $_ENV['GOOGLE_CLIENT_ID']]);
        $payload      = $googleClient->verifyIdToken($idToken);
        if (!$payload) {
            throw new AuthenticationException('Invalid or expired Google ID token.');
        }

        // 3) Build a SelfValidatingPassport using the verified email from the JWT
        
        return new SelfValidatingPassport(
            new UserBadge($payload['email'], function() use ($accessToken, $client, $payload) {
                /** @var GoogleUser $googleUser */
                $googleUser = $client->fetchUserFromToken($accessToken);
                $email    = $payload['email'];
                $googleId = $payload['sub'];                
                $user = $this->entityManager
                    ->getRepository(User::class)
                    ->findOneBy(['googleId' => $googleId]);               
                if (!$user) {
                    $user = $this->entityManager
                        ->getRepository(User::class)
                        ->findOneBy(['email' => $email]);
                    if ($user) {                      
                        $user->setGoogleId($googleId);
                    }
                }

                // 6) If still not found, create a new User

                if (!$user) {
                    $user = new User();
                    $user->setGoogleId($googleId);
                    $user->setEmail($email);
                    $user->setRoles(['ROLE_USER']);
                    $user->setDisplayName($googleUser->getName() ?? 'User');
                    $user->setAvatarUrl($googleUser->getAvatar() ?? null);
                    $this->entityManager->persist($user);
                }

                // 7) Update tokens on the User entity
                $user->setAccessToken($accessToken->getToken());
                if ($accessToken->getExpires()) {
                    $user->setTokenExpiresAt(
                        (new \DateTimeImmutable())
                            ->setTimestamp($accessToken->getExpires())
                    );
                }
                if ($refresh = $accessToken->getRefreshToken()) {
                    $user->setRefreshToken($refresh);
                }

                $this->entityManager->flush();

                return $user;
            })
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return new RedirectResponse($this->router->generate('app_homepage'));
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $message = strtr($exception->getMessageKey(), $exception->getMessageData());
        return new RedirectResponse($this->router->generate('app_login', ['error' => $message]));
    }

    public function start(Request $request, AuthenticationException $authException = null): Response
    {
        return new RedirectResponse($this->router->generate('app_login'));
    }
}
