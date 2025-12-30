import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Home, Star } from "lucide-react";
import GitHubLogo from "@/components/GitHubLogo";
import { 
  fetchGitHubUser, 
  fetchGitHubRepos, 
  fetchGitHubEvents, 
  calculateStats,
  GitHubUser,
  GitHubRepo
} from "@/lib/github";
import { toast } from "sonner";

// Slide components
import IntroSlide from "@/components/slides/IntroSlide";
import ProfileSlide from "@/components/slides/ProfileSlide";
import StatsSlide from "@/components/slides/StatsSlide";
import LanguagesSlide from "@/components/slides/LanguagesSlide";
import FavoriteDaySlide from "@/components/slides/FavoriteDaySlide";
import ArchetypeSlide from "@/components/slides/ArchetypeSlide";
import TopReposSlide from "@/components/slides/TopReposSlide";
import SummarySlide from "@/components/slides/SummarySlide";

interface StoryData {
  user: GitHubUser;
  repos: GitHubRepo[];
  stats: ReturnType<typeof calculateStats>;
}

const Story = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StoryData | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 8;

  // Update meta tags for social sharing
  useEffect(() => {
    const updateMetaTags = (title: string, description: string, image: string, url: string) => {
      document.title = title;
      
      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');
      
      if (ogTitle) ogTitle.setAttribute('content', title);
      if (ogDescription) ogDescription.setAttribute('content', description);
      if (ogImage) ogImage.setAttribute('content', image);
      if (ogUrl) ogUrl.setAttribute('content', url);
      
      // Update Twitter tags
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      const twitterUrl = document.querySelector('meta[name="twitter:url"]');
      
      if (twitterTitle) twitterTitle.setAttribute('content', title);
      if (twitterDescription) twitterDescription.setAttribute('content', description);
      if (twitterImage) twitterImage.setAttribute('content', image);
      if (twitterUrl) twitterUrl.setAttribute('content', url);
    };

    if (username) {
      const currentUrl = window.location.href;
      const baseUrl = window.location.origin;
      const title = `@${username}'s GitHub Story 2025 - GitStory`;
      const description = `Check out @${username}'s GitHub story for 2025! See their commits, contributions, and coding journey.`;
      const image = `${baseUrl}/og-image.svg`;
      updateMetaTags(title, description, image, currentUrl);
    } else {
      const baseUrl = window.location.origin;
      const defaultTitle = 'GitStory 2025 - Your Year in Code';
      const defaultDescription = 'Discover your GitHub story for 2025. See your commits, contributions, and coding journey visualized in a beautiful, cinematic experience.';
      const defaultImage = `${baseUrl}/og-image.svg`;
      const defaultUrl = baseUrl;
      updateMetaTags(defaultTitle, defaultDescription, defaultImage, defaultUrl);
    }
  }, [username]);

  useEffect(() => {
    const loadData = async () => {
      if (!username) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const [user, repos, events] = await Promise.all([
          fetchGitHubUser(username),
          fetchGitHubRepos(username),
          fetchGitHubEvents(username)
        ]);
        
        const stats = calculateStats(user, repos, events);
        
        setData({ user, repos, stats });
        
        // Update meta tags with user-specific data
        const currentUrl = window.location.href;
        const title = `@${user.login}'s GitHub Story 2025 - GitStory`;
        const description = `Check out @${user.login}'s GitHub story! ${stats.totalCommits} commits, ${stats.topLanguages[0]?.language || 'Code'} developer, ${stats.archetype}.`;
        const image = `${window.location.origin}/og-image.svg`;
        
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');
        
        if (ogTitle) ogTitle.setAttribute('content', title);
        if (ogDescription) ogDescription.setAttribute('content', description);
        if (ogImage) ogImage.setAttribute('content', image);
        if (ogUrl) ogUrl.setAttribute('content', currentUrl);
        
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        const twitterImage = document.querySelector('meta[name="twitter:image"]');
        const twitterUrl = document.querySelector('meta[name="twitter:url"]');
        
        if (twitterTitle) twitterTitle.setAttribute('content', title);
        if (twitterDescription) twitterDescription.setAttribute('content', description);
        if (twitterImage) twitterImage.setAttribute('content', image);
        if (twitterUrl) twitterUrl.setAttribute('content', currentUrl);
        
        document.title = title;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        toast.error('Failed to load GitHub data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [username]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          <GitHubLogo className="relative w-20 h-20 animate-pulse" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-foreground text-xl font-medium">Loading your story...</p>
          <p className="text-muted-foreground text-sm mt-2">@{username}</p>
        </motion.div>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-6">
        <GitHubLogo className="w-16 h-16 opacity-50" />
        <div className="text-center">
          <h2 className="text-foreground text-2xl font-bold mb-2">User not found</h2>
          <p className="text-muted-foreground">Could not find GitHub user @{username}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          <Home className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  const { user, repos, stats } = data;

  const slides = [
    <IntroSlide key="intro" />,
    <ProfileSlide key="profile" user={user} yearsOnGitHub={stats.yearsOnGitHub} />,
    <StatsSlide key="stats" user={user} totalStars={stats.totalStars} totalCommits={stats.totalCommits} totalPRs={stats.totalPRs} totalEvents={stats.totalEvents} />,
    <LanguagesSlide key="languages" topLanguages={stats.topLanguages} />,
    <FavoriteDaySlide key="favoriteDay" favoriteDay={stats.favoriteDay} dayCount={stats.dayCount} />,
    <ArchetypeSlide key="archetype" archetype={stats.archetype} peakHour={stats.peakHour} />,
    <TopReposSlide key="topRepos" topRepos={stats.topRepos} />,
    <SummarySlide 
      key="summary" 
      user={user} 
      totalCommits={stats.totalCommits} 
      topLanguage={stats.topLanguages[0]?.language || "Code"} 
      topRepo={stats.topRepos[0]} 
      archetype={stats.archetype}
    />
  ];

  return (
    <div className="h-screen bg-background overflow-hidden relative">
      {/* Made by Abhishek Bhonde Tag - Top left, below progress bar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        data-made-by-tag
        className="absolute top-20 left-6 z-50"
        onClick={() => window.open('https://github.com/abhishekbhonde/git-story-explorer', '_blank')}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg cursor-pointer"
        >
          {/* Animated pulsing border */}
          <motion.div
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full border-2 border-primary/40"
          />
          
          {/* Moving gradient border effect */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 rounded-full opacity-60"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)',
              backgroundSize: '200% 100%',
              padding: '2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
            }}
          />
          
          {/* Content */}
          <div className="relative flex items-center gap-2">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Star className="w-4 h-4 text-primary fill-primary" />
            </motion.div>
            
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold text-foreground">Star on GitHub</span>
              <span className="text-[10px] text-muted-foreground">Made by abhishekbhonde</span>
            </div>
            
            <GitHubLogo className="w-4 h-4 text-foreground opacity-80" />
          </div>
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex gap-1.5 p-4" data-progress-bar>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted/50 cursor-pointer hover:bg-muted transition-colors backdrop-blur-sm"
            onClick={() => setCurrentSlide(i)}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-github-purple rounded-full"
              initial={{ width: 0 }}
              animate={{ width: i < currentSlide ? '100%' : i === currentSlide ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* Home button - Same line as Made by tag */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/')}
        className="absolute top-20 right-6 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-card transition-all shadow-lg hover:shadow-xl"
        data-home-button
      >
        <Home className="w-5 h-5 text-muted-foreground" />
      </motion.button>

      {/* Slides container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="h-full pt-12 pb-24"
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-50 px-4">
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          disabled={currentSlide === 0}
          data-nav-button
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all backdrop-blur-sm border ${
            currentSlide === 0
              ? 'bg-muted/50 text-muted-foreground cursor-not-allowed border-border/50'
              : 'bg-card/80 hover:bg-card text-foreground border-border shadow-lg hover:shadow-xl'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          data-nav-button
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all backdrop-blur-sm border ${
            currentSlide === totalSlides - 1
              ? 'bg-muted/50 text-muted-foreground cursor-not-allowed border-border/50'
              : 'bg-primary/90 hover:bg-primary text-primary-foreground border-primary/20 shadow-lg hover:shadow-xl shadow-primary/20'
          }`}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 text-muted-foreground text-sm font-mono z-50 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50 shadow-lg" data-slide-counter>
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
};

export default Story;
