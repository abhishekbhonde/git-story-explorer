import { motion } from "framer-motion";
import { GitHubUser } from "@/lib/github";
import { GitBranch, GitPullRequest, Star, Users } from "lucide-react";

interface StatsSlideProps {
  user: GitHubUser;
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
}

const StatsSlide = ({ user, totalStars, totalCommits, totalPRs }: StatsSlideProps) => {
  const stats = [
    { label: "Repositories", value: user.public_repos, icon: GitBranch, color: "from-github-blue to-github-blue/50" },
    { label: "Followers", value: user.followers, icon: Users, color: "from-github-pink to-github-pink/50" },
    { label: "Stars Earned", value: totalStars, icon: Star, color: "from-github-gold to-github-gold/50" },
    { label: "Pull Requests", value: totalPRs, icon: GitPullRequest, color: "from-github-purple to-github-purple/50" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-2xl"
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-2"
        >
          THE NUMBERS.
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-display text-4xl md:text-5xl font-medium text-foreground mb-12"
        >
          Your impact in{" "}
          <span className="text-gradient-blue">numbers</span>.
        </motion.h2>
        
        <div className="grid grid-cols-2 gap-4 md:gap-6">
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
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`} />
              
              <div className="relative bg-card/80 backdrop-blur border border-border/50 rounded-2xl p-6 overflow-hidden">
                {/* Icon background */}
                <stat.icon className="absolute -top-4 -right-4 w-24 h-24 text-muted/10" strokeWidth={1} />
                
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <stat.icon className="w-5 h-5 text-background" />
                </div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-display text-4xl md:text-5xl font-bold text-foreground"
                >
                  {stat.value}
                </motion.p>
                
                <p className="text-muted-foreground text-sm mt-1">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Commits highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 inline-flex items-center gap-4 bg-gradient-to-r from-github-green/20 via-github-green/10 to-transparent border border-github-green/30 rounded-full px-6 py-3"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-github-green animate-pulse" />
            <span className="text-github-green font-bold text-2xl">{totalCommits}+</span>
          </div>
          <span className="text-muted-foreground">commits this year</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StatsSlide;
