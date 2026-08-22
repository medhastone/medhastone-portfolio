import { playButton } from '../game/audio';
import { useEffect, useRef, useState } from 'react';
import { GameEngine } from '../game/GameEngine';
import { Pause, X } from 'lucide-react';

interface Props {
  level: number;
  onWin: (score: number) => void;
  onLose: (score: number) => void;
  onQuit: () => void;
}

export default function GameScreen({ level, onWin, onLose, onQuit }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Resize canvas to match container exactly
    const resizeCanvas = () => {
      const parent = canvasRef.current!.parentElement;
      if (parent) {
        canvasRef.current!.width = parent.clientWidth;
        canvasRef.current!.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Init game engine
    const engine = new GameEngine(canvasRef.current, {
      level,
      onScoreChange: setScore,
      onWin: () => onWin(engine.score),
      onLose: () => onLose(engine.score),
    });
    
    engineRef.current = engine;
    engine.start();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      engine.destroy();
    };
  }, [level, onWin, onLose]);

  return (
    <div className="flex flex-col h-full w-full bg-slate-900 relative">
      {/* Top HUD */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 pointer-events-none">
        <div className="bg-black/40 rounded-full px-4 py-1 border border-white/10 backdrop-blur-sm flex items-center gap-2 pointer-events-auto">
          <span className="text-white font-black">{score}</span>
        </div>
        <button 
          onClick={() => { playButton(); onQuit(); }}
          className="w-10 h-10 bg-black/40 rounded-full border border-white/10 backdrop-blur-sm flex items-center justify-center pointer-events-auto hover:bg-black/60 transition-colors"
        >
          <X className="text-white" size={20} />
        </button>
      </div>

      {/* Game Canvas Container */}
      <div className="flex-1 w-full h-full overflow-hidden relative" style={{ touchAction: 'none' }}>
        <canvas 
          ref={canvasRef} 
          className="block w-full h-full bg-slate-800"
          style={{ touchAction: 'none' }}
        />
      </div>
    </div>
  );
}
