import { motion } from "framer-motion";
import { Moon, Sun, Coffee, Sunset, Clock } from "lucide-react";

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

  const getIconAndColor = () => {
    if (peakHour >= 22 || peakHour < 5) return { 
      Icon: Moon, 
      color: "github-blue",
      gradient: "from-github-blue/20 via-github-purple/10 to-transparent"
    };
    if (peakHour >= 5 && peakHour < 9) return { 
      Icon: Sun, 
      color: "github-gold",
      gradient: "from-github-gold/20 via-github-pink/10 to-transparent"
    };
    if (peakHour >= 9 && peakHour < 17) return { 
      Icon: Coffee, 
      color: "github-green",
      gradient: "from-github-green/20 via-github-blue/10 to-transparent"
    };
    return { 
      Icon: Sunset, 
      color: "github-pink",
      gradient: "from-github-pink/20 via-github-purple/10 to-transparent"
    };
  };

  const formatHour = (h: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:00 ${period}`;
  };

  const { Icon, color, gradient } = getIconAndColor();

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 bg-gradient-radial ${gradient}`}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 text-center max-w-md w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-6 sm:mb-8"
        >
          THE ZONE.
        </motion.p>
        
        {/* Animated icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="relative inline-block mb-6 sm:mb-8"
        >
          {/* Rotating glow rings - smaller on mobile */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute -inset-6 sm:-inset-8 border-2 border-dashed border-${color}/30 rounded-full`}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className={`absolute -inset-8 sm:-inset-12 border border-${color}/20 rounded-full`}
          />
          
          <div className={`relative p-4 sm:p-6 rounded-full bg-gradient-to-br from-${color}/20 to-transparent`}>
            <Icon className={`w-12 h-12 sm:w-16 sm:h-16 text-${color}`} strokeWidth={1.5} />
          </div>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-6 sm:mb-8 px-2"
        >
          You were most active{" "}
          <span className="text-display-italic">{getTimeDescription()}</span>.
        </motion.h2>
        
        {/* Peak time badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="inline-flex items-center gap-2 sm:gap-3 bg-card/80 backdrop-blur border border-border/50 rounded-full px-4 sm:px-6 py-3 sm:py-4 mb-8 sm:mb-12"
        >
          <Clock className={`w-4 h-4 sm:w-5 sm:h-5 text-${color}`} />
          <span className="text-muted-foreground text-sm sm:text-base">Peak:</span>
          <span className="text-foreground font-mono font-bold text-lg sm:text-xl">{formatHour(peakHour)}</span>
        </motion.div>
        
        {/* Archetype reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs mb-3 sm:mb-4">
            YOUR DEVELOPER ARCHETYPE
          </p>
          
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
            className="text-display-italic text-3xl sm:text-5xl md:text-6xl px-2"
          >
            <span className="text-muted-foreground">The </span>
            <span className={`text-${color} relative inline-block`}>
              {archetype.replace("The ", "")}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className={`absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-${color}/50 rounded-full origin-left`}
              />
            </span>
          </motion.h3>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ArchetypeSlide;