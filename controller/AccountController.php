<?php
namespace App\Controller;

use App\Service\FavoriteService;
use App\Service\HistoryService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\UserFavorite;

#[Route('/compte', name: 'app_account_')]
class AccountController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/profil', name: 'profile')]
    public function profile(): Response
    {
        return $this->render('account/profile.html.twig');
    }

    #[Route('/favoris', name: 'favorites')]
    public function favorites(FavoriteService $favoriteService): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $user = $this->getUser();
        
        $favorites = $favoriteService->getUserFavorites($user);
        
        // Transformer la liste des favoris en liste de contenu (vidéos ou émissions)
        $favoriteItems = array_map(function($favorite) {
            return $favorite->getVideo() ?: $favorite->getShow();
        }, $favorites);
        
        return $this->render('account/favorites.html.twig', [
            'favorites' => $favoriteItems
        ]);
    }

    #[Route('/historique', name: 'history')]
    public function history(HistoryService $historyService): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $user = $this->getUser();
        
        $historyItems = $historyService->getUserHistory($user);
        
        // Transformer la liste d'historique en liste de contenu
        $watchedItems = array_map(function($item) {
            return $item->getVideo() ?: $item->getShow();
        }, $historyItems);
        
        return $this->render('account/history.html.twig', [
            'history' => $watchedItems,
            'historyItems' => $historyItems
        ]);
    }

    #[Route('/parametres', name: 'settings')]
    public function settings(): Response
    {
        return $this->render('account/settings.html.twig');
    }

    #[Route('/notifications', name: 'notifications')]
    public function notifications(): Response
    {
        return $this->render('account/notifications.html.twig');
    }
}
