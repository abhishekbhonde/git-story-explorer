import { motion } from "framer-motion";
import { MapPin, Building2, Calendar } from "lucide-react";
import { GitHubUser } from "@/lib/github";

interface ProfileSlideProps {
  user: GitHubUser;
  yearsOnGitHub: number;
}

const ProfileSlide = ({ user, yearsOnGitHub }: ProfileSlideProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative inline-block mb-6"
        >
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl" />
          <img
            src={user.avatar_url}
            alt={user.name || user.login}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/50 shadow-2xl"
          />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-display text-4xl md:text-5xl font-bold text-foreground mb-2"
        >
          {user.name || user.login}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-primary text-xl mb-6"
        >
          @{user.login}
        </motion.p>
        
        {user.bio && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-lg max-w-md mx-auto mb-8"
          >
            "{user.bio}"
          </motion.p>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground"
        >
          {user.location && (
            <span className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border">
              <MapPin className="w-4 h-4 text-github-pink" />
              {user.location}
            </span>
          )}
          {user.company && (
            <span className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border">
              <Building2 className="w-4 h-4 text-github-blue" />
              {user.company}
            </span>
          )}
          <span className="flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border">
            <Calendar className="w-4 h-4 text-github-green" />
            {yearsOnGitHub} years on GitHub
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileSlide;
