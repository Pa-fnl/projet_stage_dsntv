<?php
// src/Repository/UserHistoryRepository.php
namespace App\Repository;

use App\Entity\User;
use App\Entity\UserHistory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserHistory>
 */
class UserHistoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserHistory::class);
    }

    /**
     * Trouve les entrées d'historique les plus récentes pour un utilisateur
     */
    public function findRecentByUser(User $user, string $type = null, int $limit = 100): array
    {
        $qb = $this->createQueryBuilder('h')
            ->andWhere('h.user = :user')
            ->setParameter('user', $user)
            ->orderBy('h.updatedAt', 'DESC')
            ->setMaxResults($limit);
            
        if ($type !== null) {
            $qb->andWhere('h.type = :type')
               ->setParameter('type', $type);
        }
        
        return $qb->getQuery()->getResult();
    }
    
    /**
     * Recherche si un élément existe déjà dans l'historique d'un utilisateur
     */
    public function findByUserAndContent(User $user, string $type, $content): ?UserHistory
    {
        $criteria = [
            'user' => $user,
            'type' => $type,
        ];
        
        if ($type === UserHistory::TYPE_VIDEO) {
            $criteria['video'] = $content;
        } elseif ($type === UserHistory::TYPE_SHOW) {
            $criteria['show'] = $content;
        }
        
        return $this->findOneBy($criteria);
    }
    
    /**
     * Compte le nombre d'entrées dans l'historique d'un utilisateur
     */
    public function countByUser(User $user): int
    {
        return $this->createQueryBuilder('h')
            ->select('COUNT(h.id)')
            ->andWhere('h.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getSingleScalarResult();
    }
    
    /**
     * Supprime les entrées d'historique les plus anciennes d'un utilisateur
     * lorsque le maximum est atteint
     */
    public function pruneOldestEntries(User $user, int $maxEntries = 200): int
    {
        $count = $this->countByUser($user);
        
        if ($count <= $maxEntries) {
            return 0;
        }
        
        $entriesToDelete = $count - $maxEntries;
        
        // Récupère les IDs des entrées les plus anciennes
        $oldestEntries = $this->createQueryBuilder('h')
            ->select('h.id')
            ->andWhere('h.user = :user')
            ->setParameter('user', $user)
            ->orderBy('h.updatedAt', 'ASC')
            ->setMaxResults($entriesToDelete)
            ->getQuery()
            ->getScalarResult();
        
        $oldestIds = array_column($oldestEntries, 'id');
        
        if (empty($oldestIds)) {
            return 0;
        }
        
        // Supprime ces entrées
        return $this->createQueryBuilder('h')
            ->delete()
            ->andWhere('h.id IN (:ids)')
            ->setParameter('ids', $oldestIds)
            ->getQuery()
            ->execute();
    }
}