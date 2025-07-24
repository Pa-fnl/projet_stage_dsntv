<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\HasLifecycleCallbacks]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\Column(length: 255)]
    private string $googleId;

    #[ORM\Column(length: 255)]
    private string $email;

    #[ORM\Column(length: 255)]
    private string $displayName;

    #[ORM\Column(length: 255)]
    private string $avatarUrl;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $refreshToken = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $accessToken = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $tokenExpiresAt = null;

    #[ORM\Column]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column]
    private \DateTimeImmutable $updatedAt;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var Collection<int, Article>
     */
    #[ORM\OneToMany(targetEntity: Article::class, mappedBy: 'author')]
    private Collection $articles;

    /**
     * @var Collection<int, ArticleComments>
     */
    #[ORM\OneToMany(targetEntity: ArticleComments::class, mappedBy: 'user')]
    private Collection $articleComments;

    /**
     * @var Collection<int, ProjectSubmissions>
     */
    #[ORM\OneToMany(targetEntity: ProjectSubmissions::class, mappedBy: 'user')]
    private Collection $projectSubmissions;

    /**
     * @var Collection<int, ArticleLike>
     */
    #[ORM\OneToMany(targetEntity: ArticleLike::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $articleLikes;

    // Ajout pour compatibilité avec l'interface
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $password = null;

    // Ajout pour la gestion de la date de dernière activité
    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $lastActivityDate = null;

    /**
     * @var Collection<int, UserFavorite>
     */
    #[ORM\OneToMany(targetEntity: UserFavorite::class, mappedBy: 'user')]
    private Collection $userFavorites;

    /**
     * @var Collection<int, UserHistory>
     */
    #[ORM\OneToMany(targetEntity: UserHistory::class, mappedBy: 'user')]
    private Collection $userHistories;

    #[ORM\Column(length: 500, nullable: true)]
    private ?string $biography = null;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->articleComments = new ArrayCollection();
        $this->projectSubmissions = new ArrayCollection();
        $this->articleLikes = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->userFavorites = new ArrayCollection();
        $this->userHistories = new ArrayCollection();
    }

    #[ORM\PreUpdate]
    public function updateTimestamps(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getGoogleId(): string
    {
        return $this->googleId;
    }

    public function setGoogleId(string $googleId): self
    {
        $this->googleId = $googleId;
        return $this;
    }

    /**
    * Récupère la date de dernière activité de l'utilisateur
    */
    public function getLastActivityDate(): ?\DateTimeInterface
    {
        return $this->lastActivityDate;
    }

    /**
    * Définit la date de dernière activité de l'utilisateur
    */
    public function setLastActivityDate(?\DateTimeInterface $lastActivityDate): self
    {
        $this->lastActivityDate = $lastActivityDate;
        return $this;
    }

    /**
    * Met à jour la date de dernière activité avec la date actuelle
    */
    public function updateLastActivity(): self
    {
        $this->lastActivityDate = new \DateTime();
        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getDisplayName(): string
    {
        return $this->displayName;
    }

    public function setDisplayName(string $displayName): self
    {
        $this->displayName = $displayName;
        return $this;
    }

    public function getAvatarUrl(): string
    {
        return $this->avatarUrl;
    }

    public function setAvatarUrl(string $avatarUrl): self
    {
        $this->avatarUrl = $avatarUrl;
        return $this;
    }

    public function getBiography(): ?string
    {
        return $this->biography;
    }

    public function setBiography(?string $biography): self
    {
        $this->biography = $biography;
        return $this;
    }

    public function getRefreshToken(): ?string
    {
        return $this->refreshToken;
    }

    public function setRefreshToken(?string $refreshToken): self
    {
        $this->refreshToken = $refreshToken;
        return $this;
    }

    public function getAccessToken(): ?string
    {
        return $this->accessToken;
    }

    public function setAccessToken(?string $accessToken): self
    {
        $this->accessToken = $accessToken;
        return $this;
    }

    public function getTokenExpiresAt(): ?\DateTimeImmutable
    {
        return $this->tokenExpiresAt;
    }

    public function setTokenExpiresAt(?\DateTimeImmutable $tokenExpiresAt): self
    {
        $this->tokenExpiresAt = $tokenExpiresAt;
        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getUpdatedAt(): \DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles->add($article);
            $article->setAuthor($this);
        }
        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->removeElement($article)) {
            if ($article->getAuthor() === $this) {
                $article->setAuthor(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection<int, ArticleComments>
     */
    public function getArticleComments(): Collection
    {
        return $this->articleComments;
    }

    public function addArticleComment(ArticleComments $articleComment): self
    {
        if (!$this->articleComments->contains($articleComment)) {
            $this->articleComments->add($articleComment);
            $articleComment->setUser($this);
        }
        return $this;
    }

    public function removeArticleComment(ArticleComments $articleComment): self
    {
        if ($this->articleComments->removeElement($articleComment)) {
            if ($articleComment->getUser() === $this) {
                $articleComment->setUser(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection<int, ProjectSubmissions>
     */
    public function getProjectSubmissions(): Collection
    {
        return $this->projectSubmissions;
    }

    public function addProjectSubmission(ProjectSubmissions $projectSubmission): self
    {
        if (!$this->projectSubmissions->contains($projectSubmission)) {
            $this->projectSubmissions->add($projectSubmission);
            $projectSubmission->setUser($this);
        }
        return $this;
    }

    public function removeProjectSubmission(ProjectSubmissions $projectSubmission): self
    {
        if ($this->projectSubmissions->removeElement($projectSubmission)) {
            if ($projectSubmission->getUser() === $this) {
                $projectSubmission->setUser(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection<int, ArticleLike>
     */
    public function getArticleLikes(): Collection
    {
        return $this->articleLikes;
    }

    public function addArticleLike(ArticleLike $articleLike): self
    {
        if (!$this->articleLikes->contains($articleLike)) {
            $this->articleLikes->add($articleLike);
            $articleLike->setUser($this);
        }
        return $this;
    }

    public function removeArticleLike(ArticleLike $articleLike): self
    {
        if ($this->articleLikes->removeElement($articleLike)) {
            // set the owning side to null (unless already changed)
            if ($articleLike->getUser() === $this) {
                $articleLike->setUser(null);
            }
        }
        return $this;
    }

    // Méthodes requises par UserInterface
    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function eraseCredentials(): void
    {
        // Cette méthode est destinée à effacer les données sensibles
        // comme les mots de passe en clair. Dans votre cas, avec Google OAuth,
        // il n'y a généralement pas besoin de faire quoi que ce soit ici.
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        // Garantir que chaque utilisateur a au moins ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    /**
     * @return Collection<int, UserFavorite>
     */
    public function getUserFavorites(): Collection
    {
        return $this->userFavorites;
    }

    public function addUserFavorite(UserFavorite $userFavorite): static
    {
        if (!$this->userFavorites->contains($userFavorite)) {
            $this->userFavorites->add($userFavorite);
            $userFavorite->setUser($this);
        }

        return $this;
    }

    public function removeUserFavorite(UserFavorite $userFavorite): static
    {
        if ($this->userFavorites->removeElement($userFavorite)) {
            // set the owning side to null (unless already changed)
            if ($userFavorite->getUser() === $this) {
                $userFavorite->setUser(null);
            }
        }

        return $this;
    }

    /**
     * Vérifie si une vidéo est dans les favoris de l'utilisateur
     */
    public function isVideoFavorite(Video $video): bool
    {
        foreach ($this->userFavorites as $favorite) {
            if ($favorite->getVideo() === $video && $favorite->getType() === UserFavorite::TYPE_VIDEO) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Vérifie si une émission est dans les favoris de l'utilisateur
     */
    public function isShowFavorite(Show $show): bool
    {
        foreach ($this->userFavorites as $favorite) {
            if ($favorite->getShow() === $show && $favorite->getType() === UserFavorite::TYPE_SHOW) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * @return Collection<int, UserHistory>
     */
    public function getUserHistories(): Collection
    {
        return $this->userHistories;
    }

    public function addUserHistory(UserHistory $userHistory): static
    {
        if (!$this->userHistories->contains($userHistory)) {
            $this->userHistories->add($userHistory);
            $userHistory->setUser($this);
        }

        return $this;
    }

    public function removeUserHistory(UserHistory $userHistory): static
    {
        if ($this->userHistories->removeElement($userHistory)) {
            // set the owning side to null (unless already changed)
            if ($userHistory->getUser() === $this) {
                $userHistory->setUser(null);
            }
        }

        return $this;
    }

    /**
     * Vérifie si une vidéo est dans l'historique de l'utilisateur
     */
    public function hasWatchedVideo(Video $video): bool
    {
        foreach ($this->userHistories as $history) {
            if ($history->getVideo() === $video && $history->getType() === UserHistory::TYPE_VIDEO) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Vérifie si une émission est dans l'historique de l'utilisateur
     */
    public function hasWatchedShow(Show $show): bool
    {
        foreach ($this->userHistories as $history) {
            if ($history->getShow() === $show && $history->getType() === UserHistory::TYPE_SHOW) {
                return true;
            }
        }
        
        return false;
    }
}

