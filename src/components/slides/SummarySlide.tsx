import React from "react";
import { motion } from "framer-motion";
import { Download, Share2, Sparkles, Twitter, Linkedin, Facebook, MessageCircle, Link2 } from "lucide-react";
import { GitHubUser, GitHubRepo } from "@/lib/github";
import * as htmlToImage from 'html-to-image';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GitHubLogo from "@/components/GitHubLogo";

interface SummarySlideProps {
  user: GitHubUser;
  totalCommits: number;
  topLanguage: string;
  topRepo: GitHubRepo | undefined;
  archetype: string;
}

const SummarySlide = ({ user, totalCommits, topLanguage, topRepo, archetype }: SummarySlideProps) => {
  // Ref for card capture
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = React.useState(false);

  // Save card as PNG
  const handleSaveCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsCapturing(true);
      // Hide navigation buttons and other UI elements
      const navButtons = document.querySelectorAll('[data-nav-button]');
      const slideCounter = document.querySelector('[data-slide-counter]');
      const progressBar = document.querySelector('[data-progress-bar]');
      const homeButton = document.querySelector('[data-home-button]');
      const madeByTag = document.querySelector('[data-made-by-tag]');
      
      navButtons.forEach(btn => (btn as HTMLElement).style.display = 'none');
      if (slideCounter) (slideCounter as HTMLElement).style.display = 'none';
      if (progressBar) (progressBar as HTMLElement).style.display = 'none';
      if (homeButton) (homeButton as HTMLElement).style.display = 'none';
      if (madeByTag) (madeByTag as HTMLElement).style.display = 'none';

      // Wait a bit for DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await htmlToImage.toPng(cardRef.current, { 
        cacheBust: true,
        backgroundColor: '#000000'
      });
      
      // Restore navigation buttons
      navButtons.forEach(btn => (btn as HTMLElement).style.display = '');
      if (slideCounter) (slideCounter as HTMLElement).style.display = '';
      if (progressBar) (progressBar as HTMLElement).style.display = '';
      if (homeButton) (homeButton as HTMLElement).style.display = '';
      if (madeByTag) (madeByTag as HTMLElement).style.display = '';

      const link = document.createElement('a');
      link.download = `gitstory-summary-${user.login}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Image saved!');
    } catch (error) {
      toast.error('Failed to save image');
    } finally {
      setIsCapturing(false);
    }
  };

  // Social media share handlers
  const shareText = `Check out my GitHub Story for 2025! @${user.login}`;
  const shareUrl = window.location.href;

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareToReddit = () => {
    const url = `https://reddit.com/submit?title=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  // Share image function
  const handleShareImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsCapturing(true);
      // Hide navigation buttons and other UI elements
      const navButtons = document.querySelectorAll('[data-nav-button]');
      const slideCounter = document.querySelector('[data-slide-counter]');
      const progressBar = document.querySelector('[data-progress-bar]');
      const homeButton = document.querySelector('[data-home-button]');
      const madeByTag = document.querySelector('[data-made-by-tag]');
      
      navButtons.forEach(btn => (btn as HTMLElement).style.display = 'none');
      if (slideCounter) (slideCounter as HTMLElement).style.display = 'none';
      if (progressBar) (progressBar as HTMLElement).style.display = 'none';
      if (homeButton) (homeButton as HTMLElement).style.display = 'none';
      if (madeByTag) (madeByTag as HTMLElement).style.display = 'none';

      // Wait a bit for DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await htmlToImage.toPng(cardRef.current, { 
        cacheBust: true,
        backgroundColor: '#000000'
      });
      
      // Restore navigation buttons
      navButtons.forEach(btn => (btn as HTMLElement).style.display = '');
      if (slideCounter) (slideCounter as HTMLElement).style.display = '';
      if (progressBar) (progressBar as HTMLElement).style.display = '';
      if (homeButton) (homeButton as HTMLElement).style.display = '';
      if (madeByTag) (madeByTag as HTMLElement).style.display = '';

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], `gitstory-summary-${user.login}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My GitHub 2025 Story',
          text: shareText,
          files: [file],
        });
        toast.success('Image shared!');
      } else {
        // Fallback: try to copy to clipboard
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          toast.success('Image copied to clipboard!');
        } catch (clipboardError) {
          // If clipboard fails, download the image
          const link = document.createElement('a');
          link.download = `gitstory-summary-${user.login}.png`;
          link.href = dataUrl;
          link.click();
          toast.success('Image downloaded!');
        }
      }
    } catch (error) {
      toast.error('Failed to share image');
    } finally {
      setIsCapturing(false);
    }
  };

  // Web Share API (for mobile)
  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My GitHub 2025 Story',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden">
      {/* CARD REF for Save/Export */}
      <div ref={cardRef} id="summary-card-downloadable">
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
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-1">TOP LANG</p>
                  <p className="text-display-italic text-3xl text-foreground font-bold">{topLanguage || 'N/A'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-1">REPOS</p>
                  <p className="text-display-italic text-3xl text-foreground font-bold">{user.public_repos}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-1">FOLLOWERS</p>
                  <p className="text-display-italic text-3xl text-foreground font-bold">{user.followers}</p>
                </div>
              </div>
              
              {topRepo && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-1">MAGNUM OPUS</p>
                  <p className="text-foreground font-bold text-lg">{topRepo.name}</p>
                </div>
              )}
              
              <div className="border-t border-border/50 pt-4 flex items-center justify-between">
                <div className="flex gap-[3px]">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 4 }}
                      animate={{ height: 4 + Math.sin(i * 0.5) * 10 + 6 }}
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
            onClick={handleSaveCard}
          >
            <Download className="w-5 h-5" />
            Save
          </motion.button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-github-purple text-primary-foreground px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-primary/25"
              >
                <Share2 className="w-5 h-5" />
                Share
                <Sparkles className="w-4 h-4" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleShareImage}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Image
              </DropdownMenuItem>
              {navigator.share && (
                <>
                  <DropdownMenuItem onClick={handleWebShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Link
                  </DropdownMenuItem>
                  <div className="h-px bg-border my-1" />
                </>
              )}
              <DropdownMenuItem onClick={shareToTwitter}>
                <Twitter className="w-4 h-4 mr-2" />
                Twitter / X
              </DropdownMenuItem>
              <DropdownMenuItem onClick={shareToLinkedIn}>
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </DropdownMenuItem>
              <DropdownMenuItem onClick={shareToFacebook}>
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={shareToReddit}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Reddit
              </DropdownMenuItem>
              <div className="h-px bg-border my-1" />
              <DropdownMenuItem onClick={copyLink}>
                <Link2 className="w-4 h-4 mr-2" />
                Copy Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </motion.div>
      </div>
      {/* End Card Ref Wrapper */}
    </div>
  );
};

export default SummarySlide;
