<?php

namespace App\Controller;

use App\Entity\Show;
use App\Repository\ShowRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ShowController extends AbstractController
{
    private $showRepository;
    private $entityManager;

    public function __construct(ShowRepository $showRepository, EntityManagerInterface $entityManager)
    {
        $this->showRepository = $showRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/shows', name: 'app_shows')]
    public function index(Request $request): Response
    {
        // Get query parameters
        $page = $request->query->getInt('page', 1);
        $category = $request->query->get('category');
        $itemsPerPage = 12;

        // Prepare query
        $queryBuilder = $this->showRepository->createQueryBuilder('s');
        
        // Filter by category if specified
        if ($category) {
            $queryBuilder->andWhere('s.category = :category')
                         ->setParameter('category', $category);
        }

        // Get total shows count
        $totalShows = count($queryBuilder->getQuery()->getResult());
        $totalPages = ceil($totalShows / $itemsPerPage);

        // Paginate results
        $shows = $queryBuilder
            ->setFirstResult(($page - 1) * $itemsPerPage)
            ->setMaxResults($itemsPerPage)
            ->getQuery()
            ->getResult();

        // Get all categories with their counts
        $categoriesQuery = $this->showRepository->createQueryBuilder('s')
            ->select('s.category, COUNT(s) as showCount')
            ->groupBy('s.category')
            ->orderBy('showCount', 'DESC')
            ->getQuery();
        
        $categories = $categoriesQuery->getResult();

        return $this->render('shows/index.html.twig', [
            'shows' => $shows,
            'currentPage' => $page,
            'totalPages' => $totalPages,
            'categories' => array_column($categories, 'category'),
            'categoryCounts' => array_combine(
                array_column($categories, 'category'), 
                array_column($categories, 'showCount')
            ),
            'selectedCategory' => $category
        ]);
    }

    #[Route('/shows/{id}', name: 'app_shows_detail', requirements: ['id' => '\d+'])]
    public function show(Show $show): Response
    {
        return $this->render('shows/detail.html.twig', [
            'show' => $show
        ]);
    }
}