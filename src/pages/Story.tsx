import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import GitHubLogo from "@/components/GitHubLogo";

// Mock data for demonstration
const generateMockData = (username: string) => ({
  username,
  totalCommits: Math.floor(Math.random() * 500) + 100,
  totalPRs: Math.floor(Math.random() * 50) + 5,
  totalStars: Math.floor(Math.random() * 100),
  followers: Math.floor(Math.random() * 200) + 10,
  topLanguage: ["JavaScript", "TypeScript", "Python", "Go", "Rust"][Math.floor(Math.random() * 5)],
  favoriteDay: ["Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays"][Math.floor(Math.random() * 5)],
  peakHour: Math.floor(Math.random() * 24),
  topRepo: `${username}-project`,
});

const Story = () => {
  const { username } = useParams<{ username: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ReturnType<typeof generateMockData> | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setData(generateMockData(username || "developer"));
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [username]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8">
        <GitHubLogo className="w-16 h-16 animate-pulse-slow" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-muted-foreground text-lg">Loading your story...</p>
          <p className="text-muted-foreground/50 text-sm mt-2">@{username}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <GitHubLogo className="w-16 h-16 mx-auto mb-8" />
          <h1 className="text-display text-6xl md:text-8xl font-bold text-foreground">
            2025<span className="text-primary">.</span>
          </h1>
          <p className="text-display-italic text-xl md:text-2xl text-muted-foreground mt-4">
            The year you wrote history.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-sm mb-4">THE DNA.</p>
          <h2 className="text-display text-4xl md:text-5xl font-medium text-foreground mb-12">
            How you built it.
          </h2>
          
          {/* Donut Chart Placeholder */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="hsl(var(--github-blue))"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 251.2" }}
                whileInView={{ strokeDasharray: "226 251.2" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="hsl(var(--github-purple))"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 251.2", strokeDashoffset: "-226" }}
                whileInView={{ strokeDasharray: "25 251.2", strokeDashoffset: "-226" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-display text-2xl font-bold text-foreground">100%</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-card border border-border rounded-xl px-6 py-4 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-github-blue" />
              <div className="text-left">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Commits</p>
                <p className="text-display text-2xl font-bold text-foreground">{data?.totalCommits}</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl px-6 py-4 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-github-purple" />
              <div className="text-left">
                <p className="text-muted-foreground text-xs uppercase tracking-wider">PRs</p>
                <p className="text-display text-2xl font-bold text-foreground">{data?.totalPRs}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contribution Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-display text-4xl md:text-5xl font-medium text-foreground mb-4">
            Every commit counts.
          </h2>
          <p className="text-github-green text-lg mb-8">
            <span className="text-display-italic">{data?.totalCommits}</span> contributions made.
          </p>
          
          {/* Contribution Grid Placeholder */}
          <div className="bg-card/50 border border-border rounded-2xl p-6 max-w-lg mx-auto">
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 84 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.01 }}
                  className={`w-3 h-3 rounded-sm ${
                    Math.random() > 0.7
                      ? "bg-github-green"
                      : Math.random() > 0.5
                      ? "bg-github-green/50"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mt-6 uppercase tracking-widest">
            Visualizing Recent Activity
          </p>
        </motion.div>
      </section>

      {/* Favorite Day Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-sm mb-4">YOUR FAVORITE DAY?</p>
          <h2 className="text-display-italic text-5xl md:text-7xl font-medium text-foreground mb-12">
            {data?.favoriteDay}.
          </h2>
          
          {/* Day Chart */}
          <div className="flex items-end justify-center gap-4 h-48">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => {
              const height = Math.random() * 100 + 20;
              const isHighlight = i === 3; // Wednesday
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`w-12 md:w-16 rounded-lg ${
                      isHighlight
                        ? "bg-foreground glow-blue"
                        : "bg-muted-foreground/30"
                    }`}
                    style={{ minHeight: 20 }}
                  />
                  <span className={`text-sm font-medium ${isHighlight ? "text-foreground" : "text-muted-foreground"}`}>
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
          
          <p className="text-display-italic text-muted-foreground text-lg mt-8">
            You ship most on {data?.favoriteDay}
          </p>
        </motion.div>
      </section>

      {/* Summary Card Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Movie Poster Style Card */}
          <div className="bg-card border-2 border-muted rounded-xl p-8 relative overflow-hidden">
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <GitHubLogo className="w-10 h-10" />
              </div>
              <div className="text-right">
                <p className="text-display-italic text-2xl text-muted-foreground">GitStory</p>
                <p className="text-muted-foreground">2025</p>
              </div>
            </div>
            
            <div className="border-t border-border pt-6 space-y-4">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">STARRING</p>
                <p className="text-foreground text-xl font-bold">@{data?.username}</p>
                <p className="text-primary text-display-italic">The Night Owl</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">COMMITS</p>
                  <p className="text-display-italic text-2xl text-foreground">{data?.totalCommits}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">TOP LANG</p>
                  <p className="text-display-italic text-2xl text-foreground">{data?.topLanguage}</p>
                </div>
              </div>
              
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">MAGNUM OPUS</p>
                <p className="text-foreground font-bold">{data?.topRepo}</p>
              </div>
              
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-1 h-8 bg-muted-foreground/50" />
                  ))}
                </div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">DIRECTED BY YOU</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-full font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Save
            </button>
            <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-full font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Story;
