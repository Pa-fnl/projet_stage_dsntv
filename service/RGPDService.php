<?php
// src/Service/RGPDService.php
namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class RGPDService
{
    private EntityManagerInterface $entityManager;
    private LoggerInterface $logger;

    public function __construct(
        EntityManagerInterface $entityManager,
        LoggerInterface $logger
    ) {
        $this->entityManager = $entityManager;
        $this->logger = $logger;
    }

    /**
     * Supprime les historiques de visionnage plus anciens que la durée spécifiée
     */
    public function cleanOldHistory(string $duration = '-1 year'): int
    {
        $date = new \DateTime($duration);
        
        $query = $this->entityManager->createQuery('
            DELETE FROM App\Entity\UserHistory uh
            WHERE uh.createdAt < :date
        ')->setParameter('date', $date);
        
        $nbDeleted = $query->execute();
        
        $this->logger->info(sprintf('RGPD: %d historiques supprimés (antérieurs à %s)', 
            $nbDeleted, 
            $date->format('Y-m-d')
        ));
        
        return $nbDeleted;
    }

    /**
     * Nettoie les tokens expirés des utilisateurs
     */
    public function cleanExpiredTokens(): int
    {
        $now = new \DateTime();
        
        $query = $this->entityManager->createQuery('
            UPDATE App\Entity\User u
            SET u.refreshToken = NULL, u.accessToken = NULL
            WHERE u.tokenExpiresAt < :now
            AND (u.refreshToken IS NOT NULL OR u.accessToken IS NOT NULL)
        ')->setParameter('now', $now);
        
        $nbUpdated = $query->execute();
        
        $this->logger->info(sprintf('RGPD: %d tokens expirés nettoyés', $nbUpdated));
        
        return $nbUpdated;
    }

    /**
     * Supprime les comptes inactifs
     */
    public function cleanInactiveUsers(string $duration = '-3 years'): int
    {
        $date = new \DateTime($duration);
        
        // Récupérer les utilisateurs inactifs depuis plus de 3 ans
        // Prioriser lastActivityDate s'il existe, sinon utiliser updatedAt
        $inactiveUsers = $this->entityManager->createQuery('
            SELECT u FROM App\Entity\User u
            WHERE (
                u.lastActivityDate IS NOT NULL AND u.lastActivityDate < :date
            ) OR (
                u.lastActivityDate IS NULL AND u.updatedAt < :date
            )
        ')->setParameter('date', $date)
          ->getResult();
        
        $nbDeleted = 0;
        
        foreach ($inactiveUsers as $user) {
            try {
                $this->deleteUserData($user);
                $nbDeleted++;
            } catch (\Exception $e) {
                $this->logger->error(sprintf(
                    'RGPD: Erreur lors de la suppression de l\'utilisateur #%d: %s',
                    $user->getId(),
                    $e->getMessage()
                ));
                // Continuer avec l'utilisateur suivant
            }
        }
        
        $this->logger->info(sprintf('RGPD: %d utilisateurs inactifs supprimés (inactifs depuis %s)', 
            $nbDeleted, 
            $date->format('Y-m-d')
        ));
        
        return $nbDeleted;
    }

    /**
     * Supprime un utilisateur et toutes ses données associées
     */
    public function deleteUserData(User $user): void
    {
        $userId = $user->getId();
        
        // 1. Logger l'action pour audit (anonymisé)
        $this->logger->info(sprintf('RGPD: Suppression des données de l\'utilisateur #%d', $userId));

        // 2. Supprimer les favoris
        $query = $this->entityManager->createQuery('
            DELETE FROM App\Entity\UserFavorite uf
            WHERE uf.user = :user
        ')->setParameter('user', $user);
        $nbFavorites = $query->execute();
        
        // 3. Supprimer l'historique  
        $query = $this->entityManager->createQuery('
            DELETE FROM App\Entity\UserHistory uh
            WHERE uh.user = :user
        ')->setParameter('user', $user);
        $nbHistory = $query->execute();
        
        // 4. Supprimer les commentaires d'articles
        $query = $this->entityManager->createQuery('
            DELETE FROM App\Entity\ArticleComments ac
            WHERE ac.user = :user
        ')->setParameter('user', $user);
        $nbComments = $query->execute();
        
        // 5. Supprimer les likes
        $query = $this->entityManager->createQuery('
            DELETE FROM App\Entity\ArticleLike al
            WHERE al.user = :user
        ')->setParameter('user', $user);
        $nbLikes = $query->execute();
        
        // 6. Supprimer les soumissions de projet
        $query = $this->entityManager->createQuery('
            DELETE FROM App\Entity\ProjectSubmissions ps
            WHERE ps.user = :user
        ')->setParameter('user', $user);
        $nbSubmissions = $query->execute();
        
        // 7. Articles de l'utilisateur - définir l'auteur à NULL
        $query = $this->entityManager->createQuery('
            UPDATE App\Entity\Article a
            SET a.author = NULL
            WHERE a.author = :user
        ')->setParameter('user', $user);
        $nbArticles = $query->execute();
        
        // 8. Logger les statistiques
        $this->logger->info(sprintf(
            'RGPD: Utilisateur #%d - %d favoris, %d historiques, %d commentaires, %d likes, %d soumissions, %d articles modifiés',
            $userId, $nbFavorites, $nbHistory, $nbComments, $nbLikes, $nbSubmissions, $nbArticles
        ));
        
        // 9. Supprimer l'utilisateur
        $this->entityManager->remove($user);
        $this->entityManager->flush();
    }
}