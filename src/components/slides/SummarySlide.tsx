import React from "react";
import { motion } from "framer-motion";
import { Download, Share2, Sparkles, Twitter, Linkedin, Facebook, MessageCircle, Link2 } from "lucide-react";

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
}

interface SummarySlideProps {
  user: GitHubUser;
  totalCommits: number;
  topLanguage: string;
  topRepo: GitHubRepo | undefined;
  archetype: string;
}

// Simple toast system
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  // Remove any existing toast
  const existingToast = document.getElementById('toast-message');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.id = 'toast-message';
  toast.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// Simple dropdown component
const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [isOpen]);
  
  return (
    <div className="relative" ref={containerRef}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen,
            setIsOpen
          });
        }
        return child;
      })}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, isOpen, setIsOpen }: any) => {
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  });
};

const DropdownMenuContent = ({ children, isOpen, setIsOpen, align = "end" }: any) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 5 }}
      className={`absolute ${
        align === "end" ? "right-0 bottom-full mb-2" : "left-0 bottom-full mb-2"
      } w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50`}
      onClick={(e) => e.stopPropagation()}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            setIsOpen
          });
        }
        return child;
      })}
    </motion.div>
  );
};

const DropdownMenuItem = ({ children, onClick, setIsOpen }: any) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
        setIsOpen?.(false);
      }}
      className="w-full flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors text-left gap-2"
    >
      {children}
    </button>
  );
};

const SummarySlide = ({ user, totalCommits, topLanguage, topRepo, archetype }: SummarySlideProps) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = React.useState(false);

  // Save card as PNG
  const handleSaveCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsCapturing(true);
      
      // Hide navigation elements
      const navButtons = document.querySelectorAll('[data-nav-button]');
      const slideCounter = document.querySelector('[data-slide-counter]');
      const progressBar = document.querySelector('[data-progress-bar]');
      const homeButton = document.querySelector('[data-home-button]');
      
      navButtons.forEach(btn => (btn as HTMLElement).style.display = 'none');
      if (slideCounter) (slideCounter as HTMLElement).style.display = 'none';
      if (progressBar) (progressBar as HTMLElement).style.display = 'none';
      if (homeButton) (homeButton as HTMLElement).style.display = 'none';

      await new Promise(resolve => setTimeout(resolve, 100));

      // Try to use html-to-image library
      try {
        const htmlToImage = await import('html-to-image');
        const dataUrl = await htmlToImage.toPng(cardRef.current, {
          cacheBust: true,
          backgroundColor: '#000000',
          pixelRatio: 2
        });
        
        // Restore navigation elements
        navButtons.forEach(btn => (btn as HTMLElement).style.display = '');
        if (slideCounter) (slideCounter as HTMLElement).style.display = '';
        if (progressBar) (progressBar as HTMLElement).style.display = '';
        if (homeButton) (homeButton as HTMLElement).style.display = '';

        const link = document.createElement('a');
        link.download = `gitstory-summary-${user.login}.png`;
        link.href = dataUrl;
        link.click();
        
        showToast('Image saved successfully!');
      } catch (importError) {
        // If library not available
        navButtons.forEach(btn => (btn as HTMLElement).style.display = '');
        if (slideCounter) (slideCounter as HTMLElement).style.display = '';
        if (progressBar) (progressBar as HTMLElement).style.display = '';
        if (homeButton) (homeButton as HTMLElement).style.display = '';
        
        showToast('Image library not available. Check console.', 'error');
        console.error('html-to-image library not loaded:', importError);
      }
    } catch (error) {
      console.error('Failed to save image:', error);
      showToast('Failed to save image. Please try again.', 'error');
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
      showToast('Link copied to clipboard!');
    } catch (error) {
      showToast('Failed to copy link', 'error');
    }
  };

  // Share image function
  const handleShareImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsCapturing(true);
      
      const navButtons = document.querySelectorAll('[data-nav-button]');
      const slideCounter = document.querySelector('[data-slide-counter]');
      const progressBar = document.querySelector('[data-progress-bar]');
      const homeButton = document.querySelector('[data-home-button]');
      
      navButtons.forEach(btn => (btn as HTMLElement).style.display = 'none');
      if (slideCounter) (slideCounter as HTMLElement).style.display = 'none';
      if (progressBar) (progressBar as HTMLElement).style.display = 'none';
      if (homeButton) (homeButton as HTMLElement).style.display = 'none';

      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        const htmlToImage = await import('html-to-image');
        const dataUrl = await htmlToImage.toPng(cardRef.current, {
          cacheBust: true,
          backgroundColor: '#000000',
          pixelRatio: 2
        });
        
        navButtons.forEach(btn => (btn as HTMLElement).style.display = '');
        if (slideCounter) (slideCounter as HTMLElement).style.display = '';
        if (progressBar) (progressBar as HTMLElement).style.display = '';
        if (homeButton) (homeButton as HTMLElement).style.display = '';

        // Convert to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], `gitstory-summary-${user.login}.png`, { type: 'image/png' });

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'My GitHub 2025 Story',
            text: shareText,
            files: [file],
          });
          showToast('Image shared successfully!');
        } else {
          // Fallback: try to copy to clipboard
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            showToast('Image copied to clipboard!');
          } catch (clipboardError) {
            // If clipboard fails, download the image
            const link = document.createElement('a');
            link.download = `gitstory-summary-${user.login}.png`;
            link.href = dataUrl;
            link.click();
            showToast('Image downloaded!');
          }
        }
      } catch (importError) {
        navButtons.forEach(btn => (btn as HTMLElement).style.display = '');
        if (slideCounter) (slideCounter as HTMLElement).style.display = '';
        if (progressBar) (progressBar as HTMLElement).style.display = '';
        if (homeButton) (homeButton as HTMLElement).style.display = '';
        
        showToast('Image library not available. Check console.', 'error');
        console.error('html-to-image library not loaded:', importError);
      }
    } catch (error) {
      console.error('Failed to share image:', error);
      showToast('Failed to share image', 'error');
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
        console.log('Share cancelled:', error);
      }
    } else {
      showToast('Web Share not supported in this browser', 'error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 relative overflow-hidden">
      {/* Toast container */}
      <div id="toast-container"></div>
      
      {/* Decorative elements - responsive sizing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-github-blue/10 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-24 h-24 sm:w-40 sm:h-40 bg-github-purple/10 rounded-full blur-2xl sm:blur-3xl" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative w-full max-w-[340px] sm:max-w-sm flex flex-col items-center"
      >
        {/* Card with film poster aesthetic */}
        <div className="relative w-full">
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-b from-muted-foreground/20 via-transparent to-muted-foreground/10 rounded-2xl sm:rounded-3xl blur-sm" />
          
          <div ref={cardRef} className="relative bg-gradient-to-b from-card via-card to-card/95 border border-muted/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            {/* Film grain overlay */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
            
            {/* Header */}
            <div className="relative flex items-start justify-between mb-6 sm:mb-8">
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
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-background"
                />
              </motion.div>
              
              <div className="text-right">
                <p className="text-display-italic text-xl sm:text-2xl text-muted-foreground">GitStory</p>
                <p className="text-foreground font-bold text-xl sm:text-2xl">2025</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative space-y-4 sm:space-y-6">
              <div className="border-t border-border/50 pt-4 sm:pt-6">
                <p className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1">STARRING</p>
                <p className="text-foreground text-xl sm:text-2xl font-bold truncate">@{user.login}</p>
                <p className="text-primary text-display-italic text-base sm:text-lg truncate">{archetype}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1">TOP LANG</p>
                  <p className="text-display-italic text-2xl sm:text-3xl text-foreground font-bold truncate">{topLanguage || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1">COMMITS</p>
                  <p className="text-display-italic text-2xl sm:text-3xl text-foreground font-bold">{totalCommits}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1">REPOS</p>
                  <p className="text-display-italic text-2xl sm:text-3xl text-foreground font-bold">{user.public_repos}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1">FOLLOWERS</p>
                  <p className="text-display-italic text-2xl sm:text-3xl text-foreground font-bold">{user.followers}</p>
                </div>
              </div>
              
              {topRepo && (
                <div>
                  <p className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1">TOP REPO</p>
                  <p className="text-foreground font-bold text-base sm:text-lg truncate">{topRepo.name}</p>
                </div>
              )}
              
              <div className="border-t border-border/50 pt-3 sm:pt-4 flex items-center justify-between">
                <div className="flex gap-[2px] sm:gap-[3px]">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 4 }}
                      animate={{ height: 4 + Math.sin(i * 0.5) * 8 + 4 }}
                      transition={{ delay: 0.5 + i * 0.02 }}
                      className="w-[1.5px] sm:w-[2px] bg-muted-foreground/40 rounded-full"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-[9px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em]">DIRECTED BY YOU</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 relative"
        >
          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveCard}
            disabled={isCapturing}
            className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-full font-medium transition-all border border-border/50 text-sm sm:text-base min-w-[100px] disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            Save
          </motion.button>
          
          {/* Share Button with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isCapturing}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-github-purple text-primary-foreground px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-primary/25 text-sm sm:text-base min-w-[100px] disabled:opacity-50"
              >
                <Share2 className="w-5 h-5" />
                Share
                <Sparkles className="w-4 h-4" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleShareImage}>
                <Share2 className="w-4 h-4" />
                Share Image
              </DropdownMenuItem>
              
              {navigator.share && (
                <DropdownMenuItem onClick={handleWebShare}>
                  <Share2 className="w-4 h-4" />
                  Share Link
                </DropdownMenuItem>
              )}
              
              <div className="border-t border-border/50 my-1" />
              
              <DropdownMenuItem onClick={shareToTwitter}>
                <Twitter className="w-4 h-4" />
                Twitter / X
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={shareToLinkedIn}>
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={shareToFacebook}>
                <Facebook className="w-4 h-4" />
                Facebook
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={shareToReddit}>
                <MessageCircle className="w-4 h-4" />
                Reddit
              </DropdownMenuItem>
              
              <div className="border-t border-border/50 my-1" />
              
              <DropdownMenuItem onClick={copyLink}>
                <Link2 className="w-4 h-4" />
                Copy Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SummarySlide;