import { motion } from "framer-motion";
import GitHubLogo from "@/components/GitHubLogo";

const IntroSlide = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <GitHubLogo className="w-20 h-20 mx-auto mb-8" />
        <h1 className="text-display text-7xl md:text-9xl font-bold text-foreground tracking-tighter">
          2025<span className="text-primary">.</span>
        </h1>
        <p className="text-display-italic text-xl md:text-2xl text-muted-foreground mt-6">
          The year you wrote history.
        </p>
      </motion.div>
    </div>
  );
};

export default IntroSlide;
