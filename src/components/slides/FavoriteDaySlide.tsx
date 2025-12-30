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
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-4">YOUR FAVORITE DAY?</p>
        
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-display-italic text-5xl md:text-7xl font-medium text-foreground mb-12"
        >
          {favoriteDay}.
        </motion.h2>
        
        <div className="flex items-end justify-center gap-3 md:gap-5 h-56">
          {days.map((day, i) => {
            const count = dayCount[day] || 0;
            const height = (count / maxCount) * 150 + 20;
            const isHighlight = day === favoriteDay;
            
            return (
              <div key={day} className="flex flex-col items-center gap-3">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`w-10 md:w-14 rounded-xl transition-all duration-300 ${
                    isHighlight
                      ? "bg-foreground shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                      : "bg-muted-foreground/30"
                  }`}
                />
                <span className={`text-sm font-medium ${
                  isHighlight ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {dayLabels[i]}
                </span>
              </div>
            );
          })}
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-display-italic text-muted-foreground text-xl mt-8"
        >
          You ship most on {favoriteDay}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FavoriteDaySlide;
