<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use App\Entity\User;
use App\Entity\UserHistory;
use App\Entity\UserFavorite;
use App\Entity\VideoComment;
use App\Entity\ArticleLike;

#[AsCommand(
    name: 'app:rgpd:clean',
    description: 'Nettoie les données utilisateurs selon les règles RGPD',
)]
class RGPDCleanerCommand extends Command
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
    }

    protected function configure(): void
    {
        $this
            ->setHelp('Cette commande permet de supprimer ou anonymiser les données utilisateurs selon les règles RGPD');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $io->title('Nettoyage RGPD des données utilisateurs');

        // 1. Supprimer les historiques de visionnage de plus d'un an
        $this->cleanUserHistory($io);
        
        // 2. Supprimer ou anonymiser les comptes inactifs depuis plus de 3 ans
        $this->cleanInactiveUsers($io);
        
        // 3. Nettoyer les tokens expirés
        $this->cleanExpiredTokens($io);

        $io->success('Nettoyage RGPD terminé avec succès.');

        return Command::SUCCESS;
    }

    private function cleanUserHistory(SymfonyStyle $io): void
    {
        $oneYearAgo = new \DateTime('-1 year');
        
        $query = $this->entityManager->createQuery('
            DELETE FROM App\Entity\UserHistory uh
            WHERE uh.createdAt < :oneYearAgo
        ')->setParameter('oneYearAgo', $oneYearAgo);
        
        $nbDeleted = $query->execute();
        
        $io->info(sprintf('Historiques supprimés: %d', $nbDeleted));
    }

    private function cleanInactiveUsers(SymfonyStyle $io): void
    {
        $threeYearsAgo = new \DateTime('-3 years');
        
        // Récupérer les utilisateurs inactifs depuis plus de 3 ans
        $inactiveUsers = $this->entityManager->createQuery('
            SELECT u FROM App\Entity\User u
            WHERE u.updatedAt < :threeYearsAgo
        ')->setParameter('threeYearsAgo', $threeYearsAgo)
          ->getResult();
        
        $nbDeleted = 0;
        
        foreach ($inactiveUsers as $user) {
            // 1. Supprimer les favoris de l'utilisateur
            $this->entityManager->createQuery('
                DELETE FROM App\Entity\UserFavorite uf
                WHERE uf.user = :user
            ')->setParameter('user', $user)
              ->execute();
            
            // Notes: VideoComment n'a pas de relation avec User, nous ne pouvons pas l'anonymiser de cette façon
            // Si nécessaire, nous pourrions enregistrer le nom d'utilisateur pour référence, puis anonymiser
            
            // 3. Anonymiser les likes (option 1) ou les supprimer (option 2)
            // Anonymiser impossible si clé étrangère, donc suppression
            $this->entityManager->createQuery('
                DELETE FROM App\Entity\ArticleLike al
                WHERE al.user = :user
            ')->setParameter('user', $user)
              ->execute();
              
            // 4. Supprimer l'utilisateur
            $this->entityManager->remove($user);
            $nbDeleted++;
        }
        
        $this->entityManager->flush();
        
        $io->info(sprintf('Utilisateurs inactifs supprimés: %d', $nbDeleted));
    }

    private function cleanExpiredTokens(SymfonyStyle $io): void
    {
        $now = new \DateTime();
        
        // Mettre à NULL les tokens expirés
        $query = $this->entityManager->createQuery('
            UPDATE App\Entity\User u
            SET u.refreshToken = NULL, u.accessToken = NULL
            WHERE u.tokenExpiresAt < :now
            AND (u.refreshToken IS NOT NULL OR u.accessToken IS NOT NULL)
        ')->setParameter('now', $now);
        
        $nbUpdated = $query->execute();
        
        $io->info(sprintf('Tokens expirés nettoyés: %d', $nbUpdated));
    }
}