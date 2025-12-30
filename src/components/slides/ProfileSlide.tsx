import { motion } from "framer-motion";
import { MapPin, Building2, Calendar, Twitter } from "lucide-react";
import { GitHubUser } from "@/lib/github";

interface ProfileSlideProps {
  user: GitHubUser;
  yearsOnGitHub: number;
}

const ProfileSlide = ({ user, yearsOnGitHub }: ProfileSlideProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full relative px-6">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-github-pink/10 via-transparent to-transparent rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-md"
      >
        {/* Avatar with animated ring */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative inline-block mb-8"
        >
          {/* Spinning gradient ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 bg-gradient-conic from-primary via-github-purple via-github-pink via-github-gold to-primary rounded-full"
          />
          <div className="absolute -inset-1 bg-background rounded-full" />
          
          <img
            src={user.avatar_url}
            alt={user.name || user.login}
            className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover"
          />
          
          {/* Online indicator */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-2 right-2 w-6 h-6 bg-github-green rounded-full border-4 border-background"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] mb-2">MEET</p>
          
          <h2 className="text-display text-4xl md:text-5xl font-bold text-foreground mb-1">
            {user.name || user.login}
          </h2>
          
          <p className="text-primary text-xl font-medium mb-4">
            @{user.login}
          </p>
        </motion.div>
        
        {user.bio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl px-6 py-4 mb-8"
          >
            <p className="text-muted-foreground text-lg italic">"{user.bio}"</p>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {user.location && (
            <span className="flex items-center gap-2 bg-gradient-to-r from-github-pink/10 to-transparent px-4 py-2 rounded-full border border-github-pink/20">
              <MapPin className="w-4 h-4 text-github-pink" />
              <span className="text-sm">{user.location}</span>
            </span>
          )}
          {user.company && (
            <span className="flex items-center gap-2 bg-gradient-to-r from-github-blue/10 to-transparent px-4 py-2 rounded-full border border-github-blue/20">
              <Building2 className="w-4 h-4 text-github-blue" />
              <span className="text-sm">{user.company}</span>
            </span>
          )}
          <span className="flex items-center gap-2 bg-gradient-to-r from-github-green/10 to-transparent px-4 py-2 rounded-full border border-github-green/20">
            <Calendar className="w-4 h-4 text-github-green" />
            <span className="text-sm">{yearsOnGitHub} years on GitHub</span>
          </span>
          {user.twitter_username && (
            <span className="flex items-center gap-2 bg-gradient-to-r from-github-blue/10 to-transparent px-4 py-2 rounded-full border border-github-blue/20">
              <Twitter className="w-4 h-4 text-github-blue" />
              <span className="text-sm">@{user.twitter_username}</span>
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileSlide;
