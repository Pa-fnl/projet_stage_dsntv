<?php
// src/Service/FavoriteService.php
namespace App\Service;

use App\Entity\User;
use App\Entity\Video;
use App\Entity\Show;
use App\Entity\UserFavorite;
use Doctrine\ORM\EntityManagerInterface;

class FavoriteService
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Ajoute/supprime une vidéo des favoris
     */
    public function toggleVideoFavorite(User $user, Video $video): bool
    {
        $repository = $this->entityManager->getRepository(UserFavorite::class);
        
        // Vérifier si la vidéo est déjà dans les favoris
        $favorite = $repository->findOneBy([
            'user' => $user,
            'video' => $video,
            'type' => UserFavorite::TYPE_VIDEO
        ]);
        
        if ($favorite) {
            // Supprimer le favori s'il existe déjà
            $this->entityManager->remove($favorite);
            $this->entityManager->flush();
            return false;
        } else {
            // Ajouter la vidéo aux favoris
            $favorite = new UserFavorite();
            $favorite->setUser($user);
            $favorite->setVideo($video);
            $favorite->setType(UserFavorite::TYPE_VIDEO);
            
            $this->entityManager->persist($favorite);
            $this->entityManager->flush();
            return true;
        }
    }

    /**
     * Récupère tous les favoris (vidéos et émissions)
     */
    public function getUserFavorites(User $user, int $limit = null): array
    {
        return $this->entityManager->getRepository(UserFavorite::class)
            ->findBy(
                ['user' => $user],
                ['createdAt' => 'DESC'],
                $limit
            );
    }

    /**
     * Récupère les favoris de type vidéo (conservé pour la compatibilité)
     * @deprecated Utiliser getUserFavorites() à la place
     */
    public function getUserFavoriteVideos(User $user, int $limit = null): array
    {
        return $this->entityManager->getRepository(UserFavorite::class)
            ->findBy(
                ['user' => $user, 'type' => UserFavorite::TYPE_VIDEO],
                ['createdAt' => 'DESC'],
                $limit
            );
    }
}