import { motion } from "framer-motion";

interface LanguagesSlideProps {
  topLanguages: { language: string; count: number; percentage: number }[];
}

const languageConfig: Record<string, { color: string; glow: string }> = {
  JavaScript: { color: "bg-github-gold", glow: "shadow-github-gold/30" },
  TypeScript: { color: "bg-github-blue", glow: "shadow-github-blue/30" },
  Python: { color: "bg-github-green", glow: "shadow-github-green/30" },
  Java: { color: "bg-destructive", glow: "shadow-destructive/30" },
  Go: { color: "bg-github-blue", glow: "shadow-github-blue/30" },
  Rust: { color: "bg-destructive", glow: "shadow-destructive/30" },
  CSS: { color: "bg-github-purple", glow: "shadow-github-purple/30" },
  HTML: { color: "bg-destructive", glow: "shadow-destructive/30" },
  Ruby: { color: "bg-destructive", glow: "shadow-destructive/30" },
  PHP: { color: "bg-github-purple", glow: "shadow-github-purple/30" },
};

const LanguagesSlide = ({ topLanguages }: LanguagesSlideProps) => {
  const topLang = topLanguages[0]?.language || "Code";

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 relative overflow-hidden">
      {/* Glowing background effect - responsive sizing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]"
        style={{ background: `radial-gradient(circle, hsl(var(--github-gold) / 0.2) 0%, transparent 70%)` }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute right-0 bottom-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] rounded-full blur-[70px] sm:blur-[80px] md:blur-[100px]"
        style={{ background: `radial-gradient(circle, hsl(var(--github-blue) / 0.15) 0%, transparent 70%)` }}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 w-full max-w-xl"
      >
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-muted-foreground uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-3 sm:mb-4"
        >
          THE PALETTE.
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-display text-2xl sm:text-4xl md:text-5xl font-medium text-foreground mb-8 sm:mb-10 md:mb-12"
        >
          You spoke{" "}
          <span className="text-display-italic text-github-blue relative inline-block">
            {topLang}
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-github-blue/50 rounded-full"
            />
          </span>{" "}
          fluently.
        </motion.h2>
        
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          {topLanguages.map((lang, index) => {
            const config = languageConfig[lang.language] || { color: "bg-muted-foreground", glow: "" };
            return (
              <motion.div
                key={lang.language}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${config.color} shadow-lg ${config.glow}`}
                    />
                    <span className="text-foreground font-medium text-base sm:text-lg">{lang.language}</span>
                  </div>
                  <span className="text-muted-foreground font-mono text-xs sm:text-sm">{lang.percentage}%</span>
                </div>
                
                <div className="h-2 sm:h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.percentage}%` }}
                    transition={{ duration: 1, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                    className={`h-full ${config.color} rounded-full relative`}
                  >
                    {/* Shine effect */}
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default LanguagesSlide;