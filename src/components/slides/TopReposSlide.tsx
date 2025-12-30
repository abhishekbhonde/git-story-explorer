import { motion } from "framer-motion";
import { Star, Trophy } from "lucide-react";
import { GitHubRepo } from "@/lib/github";

interface TopReposSlideProps {
  topRepos: GitHubRepo[];
}

const medalColors = ["github-gold", "muted-foreground", "github-pink"];

const TopReposSlide = ({ topRepos }: TopReposSlideProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-lg"
      >
        <h2 className="text-display-italic text-3xl md:text-4xl font-medium text-foreground mb-2">
          Your Top 5 Projects
        </h2>
        <p className="text-muted-foreground mb-8">The repos that defined your 2025.</p>
        
        <div className="space-y-3">
          {topRepos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-card border rounded-xl p-4 flex items-center gap-4 transition-all hover:border-primary/50 ${
                index === 0 ? "border-github-gold/50 bg-github-gold/5" : "border-border"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                index < 3 ? `bg-${medalColors[index]}/20` : "bg-muted"
              }`}>
                {index < 3 ? (
                  <Trophy className={`w-5 h-5 text-${medalColors[index]}`} />
                ) : (
                  <span className="text-muted-foreground font-bold">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-foreground truncate">{repo.name}</h3>
                  {repo.language && (
                    <span className="w-2 h-2 rounded-full bg-github-green shrink-0" />
                  )}
                </div>
                <p className="text-muted-foreground text-sm truncate">
                  {repo.description || "No description provided."}
                </p>
              </div>
              
              <div className="flex items-center gap-1 text-github-gold shrink-0">
                <Star className="w-4 h-4 fill-github-gold" />
                <span className="font-medium">{repo.stargazers_count}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-muted-foreground text-sm mt-8 italic"
        >
          Every commit tells a story.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default TopReposSlide;
