import { motion } from "framer-motion";
import { Moon, Sun, Coffee, Sunset } from "lucide-react";

interface ArchetypeSlideProps {
  archetype: string;
  peakHour: number;
}

const ArchetypeSlide = ({ archetype, peakHour }: ArchetypeSlideProps) => {
  const getTimeDescription = () => {
    if (peakHour >= 22 || peakHour < 5) return "in the late night";
    if (peakHour >= 5 && peakHour < 9) return "in the early morning";
    if (peakHour >= 9 && peakHour < 17) return "during work hours";
    return "in the evening";
  };

  const getIcon = () => {
    if (peakHour >= 22 || peakHour < 5) return <Moon className="w-16 h-16 text-github-blue" />;
    if (peakHour >= 5 && peakHour < 9) return <Sun className="w-16 h-16 text-github-gold" />;
    if (peakHour >= 9 && peakHour < 17) return <Coffee className="w-16 h-16 text-github-green" />;
    return <Sunset className="w-16 h-16 text-github-pink" />;
  };

  const formatHour = (h: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:00 ${period}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-8">THE ZONE.</p>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-8"
        >
          {getIcon()}
        </motion.div>
        
        <h2 className="text-display text-3xl md:text-4xl font-medium text-foreground mb-8">
          You were most active {getTimeDescription()}.
        </h2>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 mb-12"
        >
          <div className="w-2 h-2 rounded-full bg-github-green animate-pulse" />
          <span className="text-muted-foreground">Peak:</span>
          <span className="text-foreground font-mono font-bold">{formatHour(peakHour)}</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs mb-3">YOUR DEVELOPER ARCHETYPE</p>
          <h3 className="text-display-italic text-4xl md:text-5xl text-foreground">
            <span className="text-muted-foreground">The </span>
            <span className="text-primary">{archetype.replace("The ", "")}</span>
          </h3>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ArchetypeSlide;
