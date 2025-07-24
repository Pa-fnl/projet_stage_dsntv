<?php
// src/Controller/FavoriteController.php
namespace App\Controller;

use App\Entity\Video;
use App\Entity\Show;
use App\Service\FavoriteService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/favoris', name: 'app_favorite_')]

class FavoriteController extends AbstractController
{
    #[Route('/toggle-video/{id}', name: 'toggle_video', methods: ['POST'])]
    
    public function toggleVideoFavorite(Video $video, FavoriteService $favoriteService): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        
        $isNowFavorite = $favoriteService->toggleVideoFavorite($this->getUser(), $video);
        
        return new JsonResponse([
            'success' => true,
            'isFavorite' => $isNowFavorite
        ]);
    }
}