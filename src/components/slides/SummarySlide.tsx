import { motion } from "framer-motion";
import { Download, Share2 } from "lucide-react";
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
    <div className="flex flex-col items-center justify-center h-full px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        {/* Movie Poster Style Card */}
        <div className="bg-card border-2 border-muted/50 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
          {/* Film grain overlay */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
          
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-muted">
                <img
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-right">
                <p className="text-display-italic text-2xl text-muted-foreground">GitStory</p>
                <p className="text-foreground font-bold text-xl">2025</p>
              </div>
            </div>
            
            <div className="border-t border-border pt-6 space-y-5">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">STARRING</p>
                <p className="text-foreground text-2xl font-bold">@{user.login}</p>
                <p className="text-primary text-display-italic text-lg">{archetype}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">COMMITS</p>
                  <p className="text-display-italic text-3xl text-foreground">{totalCommits}+</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">TOP LANG</p>
                  <p className="text-display-italic text-3xl text-foreground">{topLanguage}</p>
                </div>
              </div>
              
              {topRepo && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">MAGNUM OPUS</p>
                  <p className="text-foreground font-bold text-lg">{topRepo.name}</p>
                </div>
              )}
              
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-0.5 h-6 bg-muted-foreground/40" />
                  ))}
                </div>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.15em]">DIRECTED BY YOU</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mt-8"
        >
          <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-full font-medium transition-all hover:scale-105">
            <Download className="w-5 h-5" />
            Save
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium transition-all hover:scale-105">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SummarySlide;
