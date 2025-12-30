import { motion } from "framer-motion";
import { GitHubUser } from "@/lib/github";

interface StatsSlideProps {
  user: GitHubUser;
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
}

const StatsSlide = ({ user, totalStars, totalCommits, totalPRs }: StatsSlideProps) => {
  const stats = [
    { label: "Public Repos", value: user.public_repos, color: "github-blue" },
    { label: "Followers", value: user.followers, color: "github-pink" },
    { label: "Following", value: user.following, color: "github-purple" },
    { label: "Stars Earned", value: totalStars, color: "github-gold" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-4">THE DNA.</p>
        <h2 className="text-display text-4xl md:text-5xl font-medium text-foreground mb-12">
          How you built it.
        </h2>
        
        <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/80 backdrop-blur border border-border rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-${stat.color}/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`w-3 h-3 rounded-full bg-${stat.color} mb-3`} />
              <p className="text-display text-4xl md:text-5xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4 mt-8"
        >
          <div className="bg-card border border-border rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-github-green" />
            <div className="text-left">
              <p className="text-muted-foreground text-xs uppercase tracking-wider">Commits</p>
              <p className="text-display text-2xl font-bold text-foreground">{totalCommits}+</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl px-6 py-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-github-purple" />
            <div className="text-left">
              <p className="text-muted-foreground text-xs uppercase tracking-wider">PRs</p>
              <p className="text-display text-2xl font-bold text-foreground">{totalPRs}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StatsSlide;
