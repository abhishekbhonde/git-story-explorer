import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UsernameInputProps {
  onSubmit: (username: string) => void;
  isLoading?: boolean;
}

const UsernameInput = ({ onSubmit, isLoading = false }: UsernameInputProps) => {
  const [username, setUsername] = useState("");

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
      className="w-full max-w-md mx-auto"
    >
      <div className="relative group">
        {/* Glow effect on focus */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-center gap-3 p-2 bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl transition-all duration-300 group-focus-within:border-primary/50">
          <div className="flex items-center gap-2 pl-3 text-muted-foreground">
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">github.com/</span>
          </div>
          
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            disabled={!username.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-2 font-medium transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-muted-foreground text-sm mt-4"
      >
        Enter your GitHub username to see your 2025 story
      </motion.p>
    </motion.form>
  );
};

export default UsernameInput;
