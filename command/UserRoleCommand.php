<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:user:role',
    description: 'Manage user roles',
)]
class UserRoleCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('email', InputArgument::REQUIRED, 'User email')
            ->addArgument('role', InputArgument::REQUIRED, 'Role to set (ROLE_USER, ROLE_REDACTOR, ROLE_ADMIN)')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $email = $input->getArgument('email');
        $role = $input->getArgument('role');

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user) {
            $io->error(sprintf('User with email "%s" not found.', $email));
            return Command::FAILURE;
        }

        $validRoles = ['ROLE_USER', 'ROLE_REDACTOR', 'ROLE_ADMIN'];
        if (!in_array($role, $validRoles)) {
            $io->error(sprintf('Invalid role. Must be one of: %s', implode(', ', $validRoles)));
            return Command::FAILURE;
        }

        $user->setRoles([$role]);
        $this->entityManager->flush();

        $io->success(sprintf('Role "%s" has been set for user "%s".', $role, $email));

        return Command::SUCCESS;
    }
} 