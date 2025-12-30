import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
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
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-4">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full overflow-hidden bg-muted cursor-pointer"
            onClick={() => setCurrentSlide(i)}
          >
            <motion.div
              className="h-full bg-foreground"
              initial={{ width: 0 }}
              animate={{ width: i < currentSlide ? '100%' : i === currentSlide ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* Home button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-card/80 backdrop-blur border border-border hover:bg-card transition-colors"
      >
        <Home className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Slides container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="h-full pt-12"
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
            currentSlide === 0
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-secondary hover:bg-secondary/80 text-foreground'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
            currentSlide === totalSlides - 1
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 text-muted-foreground text-sm font-mono z-50">
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
};

export default Story;
