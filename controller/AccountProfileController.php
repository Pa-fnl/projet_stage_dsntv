<?php
// src/Controller/AccountProfileController.php
namespace App\Controller;

use App\Form\ProfileSettingsType;
use App\Service\AvatarService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

#[Route('/account')]
class AccountProfileController extends AbstractController
{
    private TokenStorageInterface $tokenStorage;
    
    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    #[Route('/profile', name: 'app_account_profile')]
    public function profile(
        Request $request, 
        EntityManagerInterface $entityManager,
        AvatarService $avatarService
    ): Response
    {
        $user = $this->getUser();
        $form = $this->createForm(ProfileSettingsType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Gestion de l'upload de l'avatar
            $avatarFile = $form->get('avatarFile')->getData();
            
            if ($avatarFile) {
                $avatarUrl = $avatarService->uploadAvatar($avatarFile, $user->getAvatarUrl());
                $user->setAvatarUrl($avatarUrl);
            }

            // Mise à jour de la date de dernière activité
            $user->setLastActivityDate(new \DateTime());

            // Sauvegarde des modifications
            $entityManager->flush();
            
            $this->addFlash('success', 'Votre profil a été mis à jour avec succès !');
            
            return $this->redirectToRoute('app_account_profile');
        }

        return $this->render('account/profile.html.twig', [
            'form' => $form->createView(),
        ]);
    }
    
    #[Route('/delete-account', name: 'app_account_delete', methods: ['POST'])]
    public function deleteAccount(
        Request $request, 
        EntityManagerInterface $entityManager
    ): Response
    {
        // Vérification du token CSRF pour sécuriser l'action
        if (!$this->isCsrfTokenValid('delete-account', $request->request->get('_token'))) {
            $this->addFlash('error', 'Token de sécurité invalide.');
            return $this->redirectToRoute('app_account_profile');
        }
        
        $user = $this->getUser();
        $hasActiveTransaction = false;
        
        try {
            // 1. Supprimer les favoris
            $entityManager->createQuery('
                DELETE FROM App\Entity\UserFavorite uf
                WHERE uf.user = :user
            ')->setParameter('user', $user)
              ->execute();
              
            // 2. Supprimer l'historique
            $entityManager->createQuery('
                DELETE FROM App\Entity\UserHistory uh
                WHERE uh.user = :user
            ')->setParameter('user', $user)
              ->execute();
              
            // 3. Supprimer les commentaires d'articles
            $entityManager->createQuery('
                DELETE FROM App\Entity\ArticleComments ac
                WHERE ac.user = :user
            ')->setParameter('user', $user)
              ->execute();
              
            // 4. Supprimer les likes
            $entityManager->createQuery('
                DELETE FROM App\Entity\ArticleLike al
                WHERE al.user = :user
            ')->setParameter('user', $user)
              ->execute();
              
            // 5. Supprimer les soumissions de projet
            $entityManager->createQuery('
                DELETE FROM App\Entity\ProjectSubmissions ps
                WHERE ps.user = :user
            ')->setParameter('user', $user)
              ->execute();

            // 6. Articles de l'utilisateur - définir l'auteur à NULL ou les supprimer
            $entityManager->createQuery('
                UPDATE App\Entity\Article a
                SET a.author = NULL
                WHERE a.author = :user
            ')->setParameter('user', $user)
              ->execute();
              
            // 7. Supprimer l'utilisateur lui-même
            $entityManager->remove($user);
            $entityManager->flush();
            
            // 8. Déconnecter l'utilisateur
            $this->tokenStorage->setToken(null);
            $request->getSession()->invalidate();
            
            $this->addFlash('success', 'Votre compte a été supprimé avec succès.');
            
            // Rediriger vers la page d'accueil
            return $this->redirectToRoute('app_home');
            
        } catch (\Exception $e) {
            $this->addFlash('error', 'Une erreur est survenue lors de la suppression de votre compte. Veuillez réessayer plus tard.');
            
            return $this->redirectToRoute('app_account_profile');
        }
    }
}