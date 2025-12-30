import { motion } from "framer-motion";

interface LanguagesSlideProps {
  topLanguages: { language: string; count: number; percentage: number }[];
}

const languageColors: Record<string, string> = {
  JavaScript: "github-gold",
  TypeScript: "github-blue",
  Python: "github-green",
  Java: "destructive",
  Go: "github-blue",
  Rust: "destructive",
  CSS: "github-purple",
  HTML: "destructive",
  Ruby: "destructive",
  PHP: "github-purple",
  C: "muted-foreground",
  "C++": "github-pink",
  "C#": "github-purple",
  Swift: "destructive",
  Kotlin: "github-purple",
};

const LanguagesSlide = ({ topLanguages }: LanguagesSlideProps) => {
  const topLang = topLanguages[0]?.language || "Code";

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden">
      {/* Glowing background effect */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-github-gold/20 rounded-full blur-[100px]" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-github-blue/20 rounded-full blur-[100px]" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-4">THE PALETTE.</p>
        
        <h2 className="text-display text-3xl md:text-5xl font-medium text-foreground mb-12">
          You spoke{" "}
          <span className="text-display-italic text-github-blue">{topLang}</span>{" "}
          fluently.
        </h2>
        
        <div className="space-y-4">
          {topLanguages.map((lang, index) => {
            const colorClass = languageColors[lang.language] || "muted-foreground";
            return (
              <motion.div
                key={lang.language}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className={`w-3 h-3 rounded-full bg-${colorClass} shrink-0`} />
                <span className="text-foreground font-medium w-32">{lang.language}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className={`h-full bg-${colorClass} rounded-full`}
                  />
                </div>
                <span className="text-muted-foreground text-sm w-12 text-right">{lang.percentage}%</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default LanguagesSlide;
