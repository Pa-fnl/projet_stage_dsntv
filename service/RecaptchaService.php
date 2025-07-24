<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class RecaptchaService
{
    private $httpClient;
    private $secretKey;

    public function __construct(HttpClientInterface $httpClient, string $secretKey)
    {
        $this->httpClient = $httpClient;
        $this->secretKey = $secretKey;
    }

    public function verify(string $recaptchaResponse, ?string $clientIp = null): bool
    {
        if (empty($recaptchaResponse)) {
            return false;
        }

        $response = $this->httpClient->request('POST', 'https://www.google.com/recaptcha/api/siteverify', [
            'body' => [
                'secret' => $this->secretKey,
                'response' => $recaptchaResponse,
                'remoteip' => $clientIp,
            ],
        ]);

        $data = $response->toArray();
        return $data['success'] ?? false;
    }
}