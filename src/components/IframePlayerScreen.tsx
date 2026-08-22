import { ArrowLeft, Maximize } from 'lucide-react';
import { playButton } from '../game/audio';

interface Props {
  gamePath: string;
  gameTitle: string;
  onBack: () => void;
}

export default function IframePlayerScreen({ gamePath, gameTitle, onBack }: Props) {
  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if ((iframe as any).webkitRequestFullscreen) {
        (iframe as any).webkitRequestFullscreen();
      }
    }
  };

  return (
    <div className="absolute inset-0 bg-black flex flex-col z-50">
      <div className="flex items-center justify-between p-3 bg-zinc-900 border-b border-zinc-800 shrink-0">
        <button 
          onClick={() => { playButton(); onBack(); }}
          className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-bold">{gameTitle}</span>
        </button>
        <button 
          onClick={() => { playButton(); toggleFullscreen(); }}
          className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          title="Fullscreen"
        >
          <Maximize size={20} />
        </button>
      </div>
      <div className="flex-1 w-full bg-black relative">
        <iframe 
          id="game-iframe"
          src={gamePath} 
          className="absolute inset-0 w-full h-full border-none"
          title={gameTitle}
          allow="autoplay; fullscreen"
        />
      </div>
    </div>
  );
}
