import { motion } from "framer-motion";
import { Download, Share2, Sparkles } from "lucide-react";
import { GitHubUser, GitHubRepo } from "@/lib/github";

interface SummarySlideProps {
  user: GitHubUser;
  totalCommits: number;
  topLanguage: string;
  topRepo: GitHubRepo | undefined;
  archetype: string;
}

const SummarySlide = ({ user, totalCommits, topLanguage, topRepo, archetype }: SummarySlideProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-github-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-github-purple/10 rounded-full blur-3xl" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative w-full max-w-sm"
      >
        {/* Card with film poster aesthetic */}
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-b from-muted-foreground/20 via-transparent to-muted-foreground/10 rounded-3xl blur-sm" />
          
          <div className="relative bg-gradient-to-b from-card via-card to-card/95 border border-muted/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
            {/* Film grain overlay */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
            
            {/* Header */}
            <div className="relative flex items-start justify-between mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-primary to-github-purple rounded-full opacity-50 blur" />
                <img
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  className="relative w-20 h-20 rounded-full object-cover border-2 border-background"
                />
              </motion.div>
              
              <div className="text-right">
                <p className="text-display-italic text-2xl text-muted-foreground">GitStory</p>
                <p className="text-foreground font-bold text-2xl">2025</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative space-y-6">
              <div className="border-t border-border/50 pt-6">
                <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-1">STARRING</p>
                <p className="text-foreground text-2xl font-bold">@{user.login}</p>
                <p className="text-primary text-display-italic text-lg">{archetype}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-1">COMMITS</p>
                  <p className="text-display-italic text-4xl text-foreground font-bold">{totalCommits}+</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-1">TOP LANG</p>
                  <p className="text-display-italic text-4xl text-foreground font-bold">{topLanguage}</p>
                </div>
              </div>
              
              {topRepo && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-1">MAGNUM OPUS</p>
                  <p className="text-foreground font-bold text-lg">{topRepo.name}</p>
                </div>
              )}
              
              <div className="border-t border-border/50 pt-6 flex items-center justify-between">
                <div className="flex gap-[3px]">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 4 }}
                      animate={{ height: 4 + Math.random() * 20 }}
                      transition={{ delay: 0.5 + i * 0.02 }}
                      className="w-[2px] bg-muted-foreground/40 rounded-full"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.15em]">DIRECTED BY YOU</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-full font-medium transition-all border border-border/50"
          >
            <Download className="w-5 h-5" />
            Save
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-github-purple text-primary-foreground px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-primary/25"
          >
            <Share2 className="w-5 h-5" />
            Share
            <Sparkles className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SummarySlide;
