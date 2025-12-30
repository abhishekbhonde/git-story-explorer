import { motion } from "framer-motion";

interface FavoriteDaySlideProps {
  favoriteDay: string;
  dayCount: Record<string, number>;
}

const FavoriteDaySlide = ({ favoriteDay, dayCount }: FavoriteDaySlideProps) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  const maxCount = Math.max(...Object.values(dayCount), 1);

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center w-full max-w-2xl"
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-3 sm:mb-4"
        >
          YOUR FAVORITE DAY?
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-display-italic text-4xl sm:text-6xl md:text-8xl font-medium text-foreground mb-8 sm:mb-12 md:mb-16"
        >
          {favoriteDay}
          <span className="text-primary">.</span>
        </motion.h2>
        
        <div className="flex items-end justify-center gap-1.5 sm:gap-3 md:gap-6 h-40 sm:h-52 md:h-64 mb-6 sm:mb-8">
          {days.map((day, i) => {
            const count = dayCount[day] || 0;
            const heightPercent = (count / maxCount) * 100;
            const height = Math.max(heightPercent * 1.8, 30);
            const isHighlight = day === favoriteDay;
            
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4"
              >
                <div className="relative">
                  {/* Glow for highlight */}
                  {isHighlight && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -inset-2 sm:-inset-4 bg-foreground/20 rounded-xl sm:rounded-2xl blur-xl sm:blur-2xl"
                    />
                  )}
                  
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.5 + i * 0.08,
                      type: "spring",
                      stiffness: 100
                    }}
                    className={`relative w-8 sm:w-12 md:w-16 rounded-lg sm:rounded-xl overflow-hidden ${
                      isHighlight
                        ? "bg-gradient-to-t from-foreground/80 to-foreground"
                        : "bg-gradient-to-t from-muted-foreground/20 to-muted-foreground/40"
                    }`}
                  >
                    {/* Animated shine */}
                    {isHighlight && (
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "-100%" }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent"
                      />
                    )}
                  </motion.div>
                </div>
                
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className={`text-xs sm:text-sm md:text-base font-bold ${
                    isHighlight ? "text-foreground" : "text-muted-foreground/60"
                  }`}
                >
                  {dayLabels[i]}
                </motion.span>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 bg-card/50 backdrop-blur border border-border/50 rounded-full px-3 sm:px-5 py-1.5 sm:py-2"
        >
          <span className="text-muted-foreground text-xs sm:text-sm">You ship most on</span>
          <span className="text-foreground font-bold text-xs sm:text-sm">{favoriteDay}</span>
          <span className="text-base sm:text-lg">🚀</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FavoriteDaySlide;