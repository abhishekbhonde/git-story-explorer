import { motion } from "framer-motion";

const GitHubLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const IntroSlide = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full relative px-4">
      {/* Animated rings - responsive sizing */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8 + i * 0.3, 1 + i * 0.4, 0.8 + i * 0.3],
            }}
            transition={{ 
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className={`absolute ${
              i === 1 ? 'w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]' :
              i === 2 ? 'w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px]' :
              'w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]'
            } border border-primary/20 rounded-full`}
          />
        ))}
      </div>

      {/* Glowing orb behind logo - responsive sizing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <GitHubLogo className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-6 sm:mb-8 md:mb-10" />
        </motion.div>
        
        <h1 className="text-display text-6xl sm:text-8xl md:text-[11rem] font-bold tracking-tighter leading-none">
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gradient-to-b from-foreground via-foreground/90 to-foreground/40 bg-clip-text text-transparent"
          >
            2025
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="inline-block text-primary"
          >
            .
          </motion.span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-display-italic text-lg sm:text-2xl md:text-3xl text-muted-foreground mt-4 sm:mt-6 px-4"
        >
          The year you wrote history.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default IntroSlide;