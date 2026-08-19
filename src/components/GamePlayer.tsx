import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface GamePlayerProps {
  route: string;
}

export default function GamePlayer({ route }: GamePlayerProps) {
  const gameId = route.replace('#game/', '');
  const gameName = gameId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const [showExit, setShowExit] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black w-screen h-screen flex"
    >
      {/* Subtle Floating Exit Button */}
      <div 
        className="absolute top-4 left-4 z-50"
        onMouseEnter={() => setShowExit(true)}
        onMouseLeave={() => setShowExit(false)}
      >
        <a 
          href="#play-games" 
          className="w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all border border-white/10 shadow-lg"
          title="Exit Game"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </a>
      </div>

      {/* Game iframe Container */}
      <div className="flex-1 w-full h-full bg-black relative">
        <iframe 
          src={`/games/${gameId}/index.html`}
          title={gameName}
          className="w-full h-full border-none"
          allow="fullscreen; autoplay; gamepad"
          onLoad={(e) => (e.target as HTMLIFrameElement).contentWindow?.focus()}
        ></iframe>
      </div>
    </motion.div>
  );
}
