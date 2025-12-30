import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

interface UsernameInputProps {
  onSubmit: (username: string) => void;
  isLoading?: boolean;
}

const UsernameInput = ({ onSubmit, isLoading = false }: UsernameInputProps) => {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto"
    >
      <div className="relative group">
        {/* Animated border gradient */}
        <motion.div
          animate={{
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0.95,
          }}
          className="absolute -inset-[2px] bg-gradient-to-r from-primary via-github-purple to-github-green rounded-2xl blur-sm"
        />
        
        {/* Glass container */}
        <div className={`relative flex items-center gap-2 p-2 bg-card/80 backdrop-blur-xl border rounded-2xl transition-all duration-500 ${
          isFocused ? 'border-transparent shadow-2xl shadow-primary/20' : 'border-border'
        }`}>
          <div className="flex items-center gap-2 pl-4 text-muted-foreground">
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline opacity-60">github.com/</span>
          </div>
          
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="username"
            className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-medium"
            disabled={isLoading}
          />
          
          <motion.button
            type="submit"
            disabled={!username.trim() || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              username.trim() && !isLoading
                ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : (
              <>
                <span className="hidden sm:inline">Generate</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-muted-foreground/60 text-sm mt-4"
      >
        Enter your GitHub username to unwrap your 2025 story
      </motion.p>
    </motion.form>
  );
};

export default UsernameInput;
