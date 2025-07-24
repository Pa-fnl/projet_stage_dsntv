<?php
// src/Controller/HistoryController.php
namespace App\Controller;

use App\Entity\Video;
use App\Entity\Show;
use App\Entity\UserHistory;
use App\Service\HistoryService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/historique', name: 'app_history_')]
class HistoryController extends AbstractController
{
    /**
     * Ajoute une vidéo à l'historique (appelé via AJAX)
     */
    #[Route('/ajouter-video/{id}', name: 'add_video', methods: ['POST'])]
    public function addVideoToHistory(
        Video $video, 
        HistoryService $historyService, 
        Request $request
    ): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        
        $data = json_decode($request->getContent(), true);
        $watchDuration = $data['watchDuration'] ?? null;
        $watchPercentage = $data['watchPercentage'] ?? null;
        
        $history = $historyService->addVideoToHistory(
            $this->getUser(), 
            $video, 
            $watchDuration, 
            $watchPercentage
        );
        
        return new JsonResponse([
            'success' => true,
            'message' => 'Vidéo ajoutée à l\'historique'
        ]);
    }

    /**
     * Ajoute une émission à l'historique
     */
    #[Route('/ajouter-emission/{id}', name: 'add_show', methods: ['POST'])]
    public function addShowToHistory(Show $show, HistoryService $historyService): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        
        $history = $historyService->addShowToHistory($this->getUser(), $show);
        
        return new JsonResponse([
            'success' => true,
            'message' => 'Émission ajoutée à l\'historique'
        ]);
    }

    /**
     * Supprime un élément de l'historique
     */
    #[Route('/supprimer/{id}', name: 'remove_item', methods: ['POST'])]
    public function removeFromHistory(UserHistory $history, HistoryService $historyService): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        
        // Vérifier que l'utilisateur est bien le propriétaire de cet historique
        if ($history->getUser() !== $this->getUser()) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Vous n\'êtes pas autorisé à supprimer cet élément'
            ], 403);
        }
        
        $historyService->removeFromHistory($history);
        
        return new JsonResponse([
            'success' => true,
            'message' => 'Élément supprimé de l\'historique'
        ]);
    }

    /**
     * Vide l'historique complet
     */
    #[Route('/vider', name: 'clear', methods: ['POST'])]
    public function clearHistory(Request $request, HistoryService $historyService): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        
        $type = $request->request->get('type'); // 'video', 'show' ou null pour tout
        
        $count = $historyService->clearUserHistory($this->getUser(), $type);
        
        return new JsonResponse([
            'success' => true,
            'message' => $count . ' élément(s) supprimé(s) de l\'historique'
        ]);
    }
}