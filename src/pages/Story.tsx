// --- imports unchanged ---
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

// Slides
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
  const [data, setData] = useState<StoryData | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 8;

  useEffect(() => {
    if (!username) return;

    Promise.all([
      fetchGitHubUser(username),
      fetchGitHubRepos(username),
      fetchGitHubEvents(username)
    ])
      .then(([user, repos, events]) => {
        setData({ user, repos, stats: calculateStats(user, repos, events) });
      })
      .catch(() => toast.error("Failed to load GitHub data"))
      .finally(() => setIsLoading(false));
  }, [username]);

  const nextSlide = useCallback(
    () => setCurrentSlide((p) => Math.min(p + 1, totalSlides - 1)),
    []
  );

  const prevSlide = useCallback(
    () => setCurrentSlide((p) => Math.max(p - 1, 0)),
    []
  );

  if (isLoading || !data) return null;

  const { user, stats } = data;

  const slides = [
    <IntroSlide key="intro" />,
    <ProfileSlide key="profile" user={user} yearsOnGitHub={stats.yearsOnGitHub} />,
    <StatsSlide key="stats" user={user} {...stats} />,
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

      {/* ================= MOBILE GitHub ICON ================= */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() =>
          window.open("https://github.com/abhishekbhonde/git-story-explorer", "_blank")
        }
        className="md:hidden absolute top-16 left-4 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm border shadow"
      >
        <GitHubLogo className="w-5 h-5" />
      </motion.button>

      {/* ================= DESKTOP BADGE ================= */}
      <motion.div
        className="hidden md:block absolute top-16 left-6 z-50"
        onClick={() =>
          window.open("https://github.com/abhishekbhonde/git-story-explorer", "_blank")
        }
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/90 backdrop-blur border shadow cursor-pointer"
        >
          <Star className="w-4 h-4 text-primary fill-primary" />
          <div className="text-xs">
            <div className="font-semibold">Star on GitHub</div>
            <div className="text-muted-foreground text-[10px]">
              Made by abhishekbhonde
            </div>
          </div>
          <GitHubLogo className="w-4 h-4 opacity-80" />
        </motion.div>
      </motion.div>

      {/* ================= HOME BUTTON ================= */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-16 right-4 z-50 p-2 rounded-full bg-card/80 backdrop-blur border shadow"
      >
        <Home className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* ================= PROGRESS BAR ================= */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 p-3 z-40">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div key={i} className="flex-1 h-1 bg-muted/40 rounded">
            <motion.div
              className="h-full bg-primary rounded"
              animate={{ width: i <= currentSlide ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>

      {/* ================= SLIDES ================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          className="h-full pt-14 pb-24"
        >
          {slides[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* ================= NAV BUTTONS ================= */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-50">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="px-5 py-2 rounded-full bg-card border shadow disabled:opacity-40"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="px-5 py-2 rounded-full bg-primary text-primary-foreground shadow disabled:opacity-40"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Story;
