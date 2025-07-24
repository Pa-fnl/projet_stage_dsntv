<?php

namespace App\Service;

use App\Repository\ShowRepository;
use App\Entity\Video;
use App\Entity\Show;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class VideoShowMatcher
{
    private $showRepository;
    private $entityManager;
    private $logger;
    private $debug = true;

    public function __construct(
        ShowRepository $showRepository,
        EntityManagerInterface $entityManager,
        LoggerInterface $logger
    ) {
        $this->showRepository = $showRepository;
        $this->entityManager = $entityManager;
        $this->logger = $logger;
    }

    public function matchShowToVideo(Video $video): ?Show
    {
        // Récupérer tous les shows
        $shows = $this->showRepository->findAll();
        
        // Normaliser le titre de la vidéo
        $videoTitle = $this->normalizeString($video->getTitle());
        
        if ($this->debug) {
            $this->logger->info(sprintf(
                "Tentative de matching pour la vidéo : %s (normalisé: %s)",
                $video->getTitle(),
                $videoTitle
            ));
        }
        
        // 1. Première tentative: recherche par format [ÉMISSION]
        $bracketMatch = $this->matchByBrackets($videoTitle, $shows);
        if ($bracketMatch) {
            return $bracketMatch;
        }
        
        // 2. Deuxième tentative: recherche par préfixe (ÉMISSION:, ÉMISSION -)
        $prefixMatch = $this->matchByPrefix($videoTitle, $shows);
        if ($prefixMatch) {
            return $prefixMatch;
        }
        
        // 3. Troisième tentative: recherche par nom d'émission dans le titre
        $nameMatch = $this->matchByName($videoTitle, $shows);
        if ($nameMatch) {
            return $nameMatch;
        }
        
        // 4. Quatrième tentative: recherche par animateur
        $hostMatch = $this->matchByHost($videoTitle, $shows);
        if ($hostMatch) {
            return $hostMatch;
        }
        
        // Aucune correspondance trouvée
        if ($this->debug) {
            $this->logger->warning(sprintf(
                "Aucune émission trouvée pour la vidéo : %s",
                $video->getTitle()
            ));
        }
        
        return null;
    }
    
    /**
     * Recherche une émission par format [ÉMISSION]
     */
    private function matchByBrackets(string $videoTitle, array $shows): ?Show
    {
        // Recherche d'un pattern [Texte]
        if (preg_match('/\[(.*?)\]/i', $videoTitle, $matches)) {
            $bracketContent = $this->normalizeString($matches[1]);
            
            foreach ($shows as $show) {
                $normalizedShowTitle = $this->normalizeString($show->getTitle());
                
                // Si le contenu entre crochets correspond au titre de l'émission
                if ($bracketContent === $normalizedShowTitle || 
                    strpos($bracketContent, $normalizedShowTitle) !== false ||
                    strpos($normalizedShowTitle, $bracketContent) !== false) {
                    
                    if ($this->debug) {
                        $this->logger->info(sprintf(
                            "Match par crochets: %s => %s",
                            $matches[1],
                            $show->getTitle()
                        ));
                    }
                    
                    return $show;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Recherche une émission par préfixe (ÉMISSION:, ÉMISSION -)
     */
    private function matchByPrefix(string $videoTitle, array $shows): ?Show
    {
        foreach ($shows as $show) {
            $normalizedShowTitle = $this->normalizeString($show->getTitle());
            
            // Vérifier si le titre commence par le nom de l'émission suivi de ":" ou "-"
            $prefixPatterns = [
                $normalizedShowTitle . ':',
                $normalizedShowTitle . ' -',
                $normalizedShowTitle . '-',
                $normalizedShowTitle . ' :'
            ];
            
            foreach ($prefixPatterns as $pattern) {
                if (strpos($videoTitle, $pattern) === 0) {
                    if ($this->debug) {
                        $this->logger->info(sprintf(
                            "Match par préfixe: %s => %s",
                            $pattern,
                            $show->getTitle()
                        ));
                    }
                    
                    return $show;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Recherche une émission par nom dans le titre
     */
    private function matchByName(string $videoTitle, array $shows): ?Show
    {
        // Trier les émissions par longueur de titre (pour privilégier les plus longs)
        usort($shows, function($a, $b) {
            return strlen($b->getTitle()) - strlen($a->getTitle());
        });
        
        foreach ($shows as $show) {
            $normalizedShowTitle = $this->normalizeString($show->getTitle());
            
            // Recherche exacte du nom de l'émission dans le titre
            if (strpos($videoTitle, $normalizedShowTitle) !== false) {
                // Vérifier que ce n'est pas juste une sous-chaîne d'un mot
                // Par exemple, éviter que "vue" dans "Point de Vue" corresponde à "Entrevue"
                $pattern = '/\b' . preg_quote($normalizedShowTitle, '/') . '\b/i';
                if (preg_match($pattern, $videoTitle) || 
                    strpos($videoTitle, ' ' . $normalizedShowTitle) !== false ||
                    strpos($videoTitle, $normalizedShowTitle . ' ') !== false) {
                    
                    if ($this->debug) {
                        $this->logger->info(sprintf(
                            "Match par nom: %s dans le titre normalisé: %s",
                            $show->getTitle(),
                            $videoTitle
                        ));
                    }
                    
                    return $show;
                }
            }
            
            // Recherche avec "dans" ou "à" (ex: "Invité dans Woneko")
            $contextPatterns = [
                'dans ' . $normalizedShowTitle,
                'a ' . $normalizedShowTitle,
                'sur ' . $normalizedShowTitle,
                'pour ' . $normalizedShowTitle
            ];
            
            foreach ($contextPatterns as $pattern) {
                if (strpos($videoTitle, $pattern) !== false) {
                    if ($this->debug) {
                        $this->logger->info(sprintf(
                            "Match par contexte: %s => %s",
                            $pattern,
                            $show->getTitle()
                        ));
                    }
                    
                    return $show;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Recherche une émission par animateur
     */
    private function matchByHost(string $videoTitle, array $shows): ?Show
    {
        foreach ($shows as $show) {
            if (!$show->getHost()) {
                continue;
            }
            
            $normalizedHost = $this->normalizeString($show->getHost());
            
            // Si l'animateur est mentionné dans le titre
            if (strpos($videoTitle, $normalizedHost) !== false) {
                if ($this->debug) {
                    $this->logger->info(sprintf(
                        "Match par animateur: %s => %s",
                        $show->getHost(),
                        $show->getTitle()
                    ));
                }
                
                return $show;
            }
        }
        
        return null;
    }

    /**
     * Normalise une chaîne de caractères pour une comparaison plus flexible
     */
    private function normalizeString(string $string): string
    {
        // Convertir en minuscules
        $string = mb_strtolower($string);
        
        // Supprimer les accents
        $string = strtr(
            $string, 
            [
                'à' => 'a', 'â' => 'a', 'ä' => 'a', 'á' => 'a', 'ã' => 'a',
                'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e', 'í' => 'i',
                'î' => 'i', 'ï' => 'i', 'ì' => 'i',
                'ô' => 'o', 'ö' => 'o', 'ò' => 'o', 'ó' => 'o', 'õ' => 'o',
                'ù' => 'u', 'û' => 'u', 'ü' => 'u', 'ú' => 'u',
                'ç' => 'c',
                'œ' => 'oe',
                'æ' => 'ae'
            ]
        );
        
        // Supprimer l'apostrophe et la remplacer par un espace
        $string = str_replace("'", ' ', $string);
        $string = str_replace("'", ' ', $string);
        
        // Supprimer la ponctuation et les caractères spéciaux
        $string = preg_replace('/[^a-z0-9\s]/', ' ', $string);
        
        // Remplacer les espaces multiples par un seul espace
        $string = preg_replace('/\s+/', ' ', $string);
        
        return trim($string);
    }
}