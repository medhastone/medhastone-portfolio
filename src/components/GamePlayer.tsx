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
      {/* Top Navigation Bar - Gamesnacks style */}
      <div className="h-14 bg-[#7e85ff] flex items-center justify-between px-4 shrink-0 shadow-md relative z-10">
        <a 
          href="#play-games" 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[24px]">home</span>
        </a>
        
        <div className="flex items-center justify-center bg-white rounded-full px-4 py-1.5 shadow-sm min-w-[80px]">
          <span className="material-symbols-outlined text-[#7e85ff] text-[18px] mr-1">emoji_events</span>
          <span className="font-bold text-[#7e85ff] text-sm">0</span>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors" title="Toggle Sound">
            <span className="material-symbols-outlined text-[22px]">volume_up</span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors" title="Profile">
            <span className="material-symbols-outlined text-[22px]">person</span>
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
