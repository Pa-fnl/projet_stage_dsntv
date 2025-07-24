<?php

namespace App\Controller;

use App\Repository\VideoRepository;
use App\Repository\ShowRepository; // Ajoutez cette ligne
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    public function index(VideoRepository $videoRepository, ShowRepository $showRepository): Response
    {
        // Récupérer les 3 dernières vidéos pour la section "Dernières vidéos"
        $latestVideos = $videoRepository->findBy(
            [], // Aucun critère spécifique
            ['published_at' => 'DESC'], // Tri par date de publication décroissante
            3 // Limité à 3 vidéos
        );
        
        // Récupére les 3 dernières émissions
        $latestShows = $showRepository->findBy(
            [],
            ['id' => 'DESC'], // Tri par ID décroissant (supposant que les IDs plus élevés sont plus récents)
            3
        );
        
        
        
        return $this->render('default/index.html.twig', [
            'latestVideos' => $latestVideos,
            'latestShows' => $latestShows, 
        ]);
    }
}
