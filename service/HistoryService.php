<?php
// src/Service/HistoryService.php
namespace App\Service;

use App\Entity\User;
use App\Entity\Video;
use App\Entity\Show;
use App\Entity\UserHistory;
use Doctrine\ORM\EntityManagerInterface;

class HistoryService
{
    private $entityManager;
    private $maxHistoryEntries;

    public function __construct(EntityManagerInterface $entityManager, int $maxHistoryEntries = 50)
    {
        $this->entityManager = $entityManager;
        $this->maxHistoryEntries = $maxHistoryEntries;
    }

    /**
     * Ajoute ou met à jour une vidéo dans l'historique
     * 
     * @param User $user Utilisateur
     * @param Video $video Vidéo
     * @param int|null $watchDuration Durée de visionnage en secondes
     * @param float|null $watchPercentage Pourcentage de la vidéo visionnée (0-100)
     * @return UserHistory
     */
    public function addVideoToHistory(User $user, Video $video, ?int $watchDuration = null, ?float $watchPercentage = null): UserHistory
    {
        $repository = $this->entityManager->getRepository(UserHistory::class);
        
        // Vérifier si la vidéo est déjà dans l'historique
        $history = $repository->findByUserAndContent($user, UserHistory::TYPE_VIDEO, $video);
        
        if (!$history) {
            // Créer une nouvelle entrée si elle n'existe pas
            $history = new UserHistory();
            $history->setUser($user);
            $history->setVideo($video);
            $history->setType(UserHistory::TYPE_VIDEO);
        } else {
            // Mettre à jour le timestamp si elle existe déjà
            $history->updateTimestamp();
        }
        
        // Mettre à jour les informations de visionnage
        if ($watchDuration !== null) {
            $history->setWatchDuration($watchDuration);
        }
        
        if ($watchPercentage !== null) {
            $history->setWatchPercentage($watchPercentage);
        }
        
        $this->entityManager->persist($history);
        $this->entityManager->flush();
        
        // Nettoyer l'historique si nécessaire
        $this->pruneHistory($user);
        
        return $history;
    }

    /**
     * Ajoute ou met à jour une émission dans l'historique
     */
    public function addShowToHistory(User $user, Show $show): UserHistory
    {
        $repository = $this->entityManager->getRepository(UserHistory::class);
        
        // Vérifier si l'émission est déjà dans l'historique
        $history = $repository->findByUserAndContent($user, UserHistory::TYPE_SHOW, $show);
        
        if (!$history) {
            // Créer une nouvelle entrée si elle n'existe pas
            $history = new UserHistory();
            $history->setUser($user);
            $history->setShow($show);
            $history->setType(UserHistory::TYPE_SHOW);
        } else {
            // Mettre à jour le timestamp si elle existe déjà
            $history->updateTimestamp();
        }
        
        $this->entityManager->persist($history);
        $this->entityManager->flush();
        
        // Nettoyer l'historique si nécessaire
        $this->pruneHistory($user);
        
        return $history;
    }

    /**
     * Récupère tout l'historique (vidéos et émissions)
     */
    public function getUserHistory(User $user, int $limit = 50): array
    {
        return $this->entityManager->getRepository(UserHistory::class)
            ->findRecentByUser($user, null, $limit);
    }

    /**
     * Récupère l'historique des vidéos (conservé pour la compatibilité)
     * @deprecated Utiliser getUserHistory() à la place
     */
    public function getUserVideoHistory(User $user, int $limit = 50): array
    {
        return $this->entityManager->getRepository(UserHistory::class)
            ->findRecentByUser($user, UserHistory::TYPE_VIDEO, $limit);
    }

    /**
     * Récupère l'historique des émissions (conservé pour la compatibilité)
     * @deprecated Utiliser getUserHistory() à la place
     */
    public function getUserShowHistory(User $user, int $limit = 50): array
    {
        return $this->entityManager->getRepository(UserHistory::class)
            ->findRecentByUser($user, UserHistory::TYPE_SHOW, $limit);
    }
    
    /**
     * Récupère tout l'historique (vidéos et émissions) - alias de getUserHistory
     * @deprecated Utiliser getUserHistory() à la place
     */
    public function getUserCompleteHistory(User $user, int $limit = 50): array
    {
        return $this->getUserHistory($user, $limit);
    }

    /**
     * Supprime une entrée de l'historique
     */
    public function removeFromHistory(UserHistory $history): bool
    {
        $this->entityManager->remove($history);
        $this->entityManager->flush();
        return true;
    }
    
    /**
     * Vide complètement l'historique d'un utilisateur
     */
    public function clearUserHistory(User $user, ?string $type = null): int
    {
        $repository = $this->entityManager->getRepository(UserHistory::class);
        $criteria = ['user' => $user];
        
        if ($type !== null) {
            $criteria['type'] = $type;
        }
        
        $history = $repository->findBy($criteria);
        $count = count($history);
        
        foreach ($history as $item) {
            $this->entityManager->remove($item);
        }
        
        $this->entityManager->flush();
        return $count;
    }
    
    /**
     * Vérifie si une vidéo est dans l'historique de l'utilisateur
     */
    public function isVideoInHistory(User $user, Video $video): bool
    {
        $repository = $this->entityManager->getRepository(UserHistory::class);
        $history = $repository->findByUserAndContent($user, UserHistory::TYPE_VIDEO, $video);
        return $history !== null;
    }
    
    /**
     * Vérifie si une émission est dans l'historique de l'utilisateur
     */
    public function isShowInHistory(User $user, Show $show): bool
    {
        $repository = $this->entityManager->getRepository(UserHistory::class);
        $history = $repository->findByUserAndContent($user, UserHistory::TYPE_SHOW, $show);
        return $history !== null;
    }
    
    /**
     * Nettoie l'historique en supprimant les entrées les plus anciennes
     * si le nombre maximal est dépassé
     */
    private function pruneHistory(User $user): void
    {
        $repository = $this->entityManager->getRepository(UserHistory::class);
        $repository->pruneOldestEntries($user, $this->maxHistoryEntries);
    }
}