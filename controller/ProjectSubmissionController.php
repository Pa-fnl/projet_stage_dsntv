<?php

// src/Controller/ProjectSubmissionController.php
namespace App\Controller;

use App\Entity\ProjectSubmissions;
use App\Enum\SubmissionStatus;
use App\Form\ProjectSubmissionType;
use App\Service\NotificationService;
use App\Service\RecaptchaService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

class ProjectSubmissionController extends AbstractController
{
    #[Route('/projet/soumettre', name: 'app_project_submission')]
    public function submit(
        Request $request,
        EntityManagerInterface $entityManager,
        SluggerInterface $slugger,
        NotificationService $notificationService,
        RecaptchaService $recaptchaService
    ): Response {
        $submission = new ProjectSubmissions();
        
        // Pré-remplir les informations si l'utilisateur est connecté
        if ($this->getUser()) {
            $submission->setUser($this->getUser());
            $submission->setName($this->getUser()->getDisplayName());
            $submission->setEmail($this->getUser()->getEmail());
        }
        
        $form = $this->createForm(ProjectSubmissionType::class, $submission);
        $form->handleRequest($request);
        // Validation champs formulaire + token CSRF
        if ($form->isSubmitted() && $form->isValid()) {
            
            // Vérification du reCAPTCHA
            $recaptchaResponse = $request->request->get('g-recaptcha-response');
            
            if (!$recaptchaService->verify($recaptchaResponse, $request->getClientIp())) {
                $this->addFlash('error', 'Veuillez confirmer que vous n\'êtes pas un robot.');
                
                $featuredProjects = $entityManager->getRepository(ProjectSubmissions::class)
                    ->findFeaturedProjects(3);
                
                return $this->render('project_submission/submit.html.twig', [
                    'form' => $form->createView(),
                    'featured_projects' => $featuredProjects,
                    'google_recaptcha_site_key' => $this->getParameter('google_recaptcha_site_key')
                ]);
            }
            
            // Définir le statut initial
            $submission->setStatus(SubmissionStatus::NEW);
            
            // Définir les timestamps
            $now = new \DateTimeImmutable();
            $submission->setCreatedAt($now);
            $submission->setUpdatedAt($now);
            
            // Gérer les fichiers téléchargés
            $attachments = [];
            $files = $form->get('attachments')->getData();
            
            if ($files) {
                $uploadDir = $this->getParameter('uploads_directory').'/project_submissions';
                
                // S'assurer que le répertoire existe
                if (!file_exists($uploadDir) && !is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }
                
                foreach ($files as $file) {
                    $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                    $safeFilename = $slugger->slug($originalFilename);
                    $newFilename = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();
                    
                    $file->move($uploadDir, $newFilename);
                    $attachments[] = $newFilename;
                }
            }
            
            $submission->setAttachments($attachments);
            
            // Enregistrer dans la base de données
            $entityManager->persist($submission);
            $entityManager->flush();
            
            // Envoyer des notifications
            $notificationService->sendProjectSubmissionConfirmation($submission);
            $notificationService->notifyAdminNewSubmission($submission);
            
            // Rediriger vers une page de confirmation
            $this->addFlash('success', 'Votre projet a été soumis avec succès! Nous vous contacterons bientôt.');
            return $this->redirectToRoute('app_project_submission_confirmation');
        }
        
        // Récupérer les projets mis en avant
        $featuredProjects = $entityManager->getRepository(ProjectSubmissions::class)
            ->findFeaturedProjects(3);
        
        return $this->render('project_submission/submit.html.twig', [
            'form' => $form->createView(),
            'featured_projects' => $featuredProjects,
            'google_recaptcha_site_key' => $this->getParameter('google_recaptcha_site_key')
        ]);
    }
    
    #[Route('/projet/confirmation', name: 'app_project_submission_confirmation')]
    public function confirmation(): Response
    {
        return $this->render('project_submission/confirmation.html.twig');
    }
    
    #[Route('/mes-projets', name: 'app_my_projects')]
    public function myProjects(): Response
    {
        if (!$this->getUser()) {
            return $this->redirectToRoute('app_login');
        }
        
        $submissions = $this->getUser()->getProjectSubmissions();
        
        return $this->render('project_submission/my_projects.html.twig', [
            'submissions' => $submissions,
        ]);
    }

    #[Route('/projet/{id}', name: 'app_project_submission_show')]
    public function show(ProjectSubmissions $submission): Response
    {
        // Vérifier que l'utilisateur actuel est bien le propriétaire du projet
        if ($this->getUser() !== $submission->getUser()) {
            throw $this->createAccessDeniedException('Vous n\'êtes pas autorisé à voir ce projet.');
        }
    
        return $this->render('project_submission/show.html.twig', [
            'submission' => $submission,
        ]);
    }
}