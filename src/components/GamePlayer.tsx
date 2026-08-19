import { useEffect } from 'react';
import { motion } from 'motion/react';

interface GamePlayerProps {
  route: string;
}

export default function GamePlayer({ route }: GamePlayerProps) {
  // Extract game ID from route: "#game/neon-snake" -> "neon-snake"
  const gameId = route.replace('#game/', '');
  
  // Format game name for display
  const gameName = gameId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Prevent scrolling on the body while in full-screen game mode
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
      className="fixed inset-0 z-50 bg-black flex flex-col w-screen h-screen"
    >
      {/* Top Navigation Bar */}
      <div className="h-14 bg-surface-container-highest/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-md shrink-0">
        <a 
          href="#play-games" 
          className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="font-medium">Back to Games</span>
        </a>
        
        <h2 className="text-title-md font-bold text-on-surface absolute left-1/2 -translate-x-1/2 hidden sm:block">
          {gameName}
        </h2>
        
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors" title="Fullscreen" onClick={() => document.documentElement.requestFullscreen().catch(e => console.log(e))}>
            <span className="material-symbols-outlined text-[20px]">fullscreen</span>
          </button>
        </div>
      </div>

      {/* Game iframe Container */}
      <div className="flex-1 w-full bg-black relative">
        {/* Note for the developer: This iframe points to /games/{gameId}/index.html in the public folder.
            If the file doesn't exist yet, it will show a 404. 
            To add a real game, create a folder like public/games/neon-snake/ and place the index.html inside it. */}
        <iframe 
          src={`/games/${gameId}/index.html`}
          title={gameName}
          className="w-full h-full border-none"
          allow="fullscreen; autoplay; gamepad"
          onLoad={(e) => (e.target as HTMLIFrameElement).contentWindow?.focus()}
        ></iframe>

        {/* Temporary Placeholder UI for development just in case the file isn't uploaded yet */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
          <div className="text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[64px] mb-4 opacity-50">sports_esports</span>
            <p>Loading Game Files from <br/><code>/public/games/{gameId}/index.html</code></p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
