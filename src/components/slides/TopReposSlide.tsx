import { motion } from "framer-motion";
import { Star, Trophy, ExternalLink, GitFork } from "lucide-react";
import { GitHubRepo } from "@/lib/github";

interface TopReposSlideProps {
  topRepos: GitHubRepo[];
}

const medalConfig = [
  { bg: "bg-gradient-to-br from-github-gold/20 to-github-gold/5", border: "border-github-gold/50", icon: "text-github-gold" },
  { bg: "bg-gradient-to-br from-muted/30 to-muted/10", border: "border-muted-foreground/30", icon: "text-muted-foreground" },
  { bg: "bg-gradient-to-br from-github-pink/20 to-github-pink/5", border: "border-github-pink/50", icon: "text-github-pink" },
];

const TopReposSlide = ({ topRepos }: TopReposSlideProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-lg"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-display-italic text-4xl md:text-5xl font-medium text-foreground mb-2"
        >
          Your Top Projects
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-8"
        >
          The repos that defined your 2025.
        </motion.p>
        
        <div className="space-y-3">
          {topRepos.slice(0, 5).map((repo, index) => {
            const config = medalConfig[index] || { bg: "bg-card", border: "border-border", icon: "text-muted-foreground" };
            
            return (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 4, scale: 1.01 }}
                className={`block ${config.bg} border ${config.border} rounded-2xl p-4 transition-all duration-300 hover:shadow-lg group`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${index < 3 ? config.bg : 'bg-muted'} border ${config.border}`}>
                    {index < 3 ? (
                      <Trophy className={`w-6 h-6 ${config.icon}`} />
                    ) : (
                      <span className="text-muted-foreground font-bold text-lg">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {repo.name}
                      </h3>
                      {repo.language && (
                        <span className="w-2.5 h-2.5 rounded-full bg-github-green shrink-0" />
                      )}
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-muted-foreground text-sm truncate">
                      {repo.description || "No description provided."}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0">
                    {repo.forks_count > 0 && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <GitFork className="w-4 h-4" />
                        <span className="text-sm">{repo.forks_count}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-github-gold text-github-gold" />
                      <span className="font-bold text-foreground">{repo.stargazers_count}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground/60 text-sm mt-8 italic"
        >
          "Every commit tells a story."
        </motion.p>
      </motion.div>
    </div>
  );
};

export default TopReposSlide;
