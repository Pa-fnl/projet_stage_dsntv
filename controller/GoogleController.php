<?php

namespace App\Controller;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/connect')]
class GoogleController extends AbstractController
{
    #[Route('/google', name: 'connect_google')]
    public function connectAction(ClientRegistry $clientRegistry): Response
    {
        return $clientRegistry
            ->getClient('google')
            ->redirect([
                'email', 'profile', 'openid', 
                
                 
            ], [
                'prompt' => 'select_account'
            ]);
    }

    #[Route('/google/check', name: 'connect_google_check')]
    public function connectCheckAction(): Response
    {
        // Cette méthode n'est jamais exécutée directement
        // L'authenticator intercepte cette route et gère le processus
        return new Response('This should not be reached!');
    }
}





