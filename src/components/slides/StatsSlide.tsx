import { motion } from "framer-motion";
import { GitBranch, GitPullRequest, Star, Users, GitCommit, Activity } from "lucide-react";

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface StatsSlideProps {
  user: GitHubUser;
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalEvents: number;
}

const StatsSlide = ({ user, totalStars, totalCommits, totalPRs, totalEvents }: StatsSlideProps) => {
  const stats = [
    { label: "Public Repos", value: user.public_repos, icon: GitBranch, color: "from-github-blue to-github-blue/50" },
    { label: "Followers", value: user.followers, icon: Users, color: "from-github-pink to-github-pink/50" },
    { label: "Stars Earned", value: totalStars, icon: Star, color: "from-github-gold to-github-gold/50" },
    { label: "Following", value: user.following, icon: Users, color: "from-github-purple to-github-purple/50" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-2xl w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-2"
        >
          THE NUMBERS.
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-display text-2xl sm:text-4xl md:text-5xl font-medium text-foreground mb-8 sm:mb-10 md:mb-12 px-2"
        >
          Your impact in{" "}
          <span className="text-gradient-blue">numbers</span>.
        </motion.h2>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="relative group"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-xl sm:rounded-2xl blur-xl transition-opacity duration-300`} />
              
              <div className="relative bg-card/80 backdrop-blur border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 overflow-hidden">
                {/* Icon background */}
                <stat.icon className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-muted/10" strokeWidth={1} />
                
                <div className={`inline-flex p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} mb-3 sm:mb-4`}>
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
                </div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
                >
                  {stat.value}
                </motion.p>
                
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activity stats from events API */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 md:gap-4"
        >
          <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-github-green/20 via-github-green/10 to-transparent border border-github-green/30 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3">
            <GitCommit className="w-4 h-4 sm:w-5 sm:h-5 text-github-green shrink-0" />
            <div className="text-left">
              <span className="text-github-green font-bold text-base sm:text-lg md:text-xl">{totalCommits}</span>
              <span className="text-muted-foreground text-xs sm:text-sm ml-1.5 sm:ml-2">recent commits</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-github-purple/20 via-github-purple/10 to-transparent border border-github-purple/30 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3">
            <GitPullRequest className="w-4 h-4 sm:w-5 sm:h-5 text-github-purple shrink-0" />
            <div className="text-left">
              <span className="text-github-purple font-bold text-base sm:text-lg md:text-xl">{totalPRs}</span>
              <span className="text-muted-foreground text-xs sm:text-sm ml-1.5 sm:ml-2">pull requests</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <div className="text-left">
              <span className="text-primary font-bold text-base sm:text-lg md:text-xl">{totalEvents}</span>
              <span className="text-muted-foreground text-xs sm:text-sm ml-1.5 sm:ml-2">events tracked</span>
            </div>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-muted-foreground/50 text-[10px] sm:text-xs mt-4 sm:mt-6 px-2"
        >
          * Activity data from last 90 days (GitHub API limit)
        </motion.p>
      </motion.div>
    </div>
  );
};

export default StatsSlide;