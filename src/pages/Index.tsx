import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GitHubLogo from "@/components/GitHubLogo";
import UsernameInput from "@/components/UsernameInput";
import { useNavigate } from "react-router-dom";
import { fetchGitHubUser } from "@/lib/github";
import { toast } from "sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (username: string) => {
    setIsLoading(true);
    
    try {
      // Validate user exists
      await fetchGitHubUser(username);
      navigate(`/story/${username}`);
    } catch (error) {
      toast.error(`User @${username} not found on GitHub`);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-github-blue/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-github-green/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8 w-full max-w-2xl"
          >
            {/* GitHub Logo */}
            <GitHubLogo className="w-20 h-20 md:w-24 md:h-24" />

            {/* Year Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-display text-7xl md:text-9xl font-bold text-foreground tracking-tighter">
                2025<span className="text-primary">.</span>
              </h1>
              <p className="text-display-italic text-xl md:text-2xl text-muted-foreground mt-4">
                The year you wrote history.
              </p>
            </motion.div>

            {/* Username Input */}
            <div className="w-full mt-8">
              <UsernameInput onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            {/* Footer hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <p className="text-muted-foreground/50 text-xs tracking-widest uppercase">
                Your GitHub Story Awaits
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
