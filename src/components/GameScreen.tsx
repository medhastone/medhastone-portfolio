import { playButton } from '../game/audio';
import { useEffect, useRef, useState } from 'react';
import { GameEngine } from '../game/GameEngine';
import { X, Maximize2, Minimize2, Sparkles, Trophy, HelpCircle } from 'lucide-react';

interface Props {
  level: number;
  onWin: (score: number) => void;
  onLose: (score: number) => void;
  onQuit: () => void;
}

export default function GameScreen({ level, onWin, onLose, onQuit }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playfieldRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const [score, setScore] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Track fullscreen state
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    playButton();
    const target = rootRef.current?.closest('section') || rootRef.current;
    if (!target) return;
    if (!document.fullscreenElement) {
      target.requestFullscreen?.().catch(err => console.error(err));
    } else {
      document.exitFullscreen?.().catch(err => console.error(err));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const playfield = playfieldRef.current;
    if (!canvas || !playfield) return;

    // Accurate resizing using bounding dimensions
    const updateSize = () => {
      if (!canvas || !playfield) return;
      const rect = playfield.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      
      if (w > 0 && h > 0) {
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          if (engineRef.current) {
            engineRef.current.resize(w, h);
          }
        }
      }
    };

    // Set initial size
    updateSize();

    // Init game engine
    const engine = new GameEngine(canvas, {
      level,
      onScoreChange: setScore,
      onWin: () => onWin(engine.score),
      onLose: () => onLose(engine.score),
    });
    
    engineRef.current = engine;
    engine.start();

    // ResizeObserver watches the playfield container continuously
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(playfield);

    const handleWindowResize = () => {
      updateSize();
    };

    const handleFsChange = () => {
      setTimeout(updateSize, 60);
      setTimeout(updateSize, 250);
    };

    window.addEventListener('resize', handleWindowResize);
    document.addEventListener('fullscreenchange', handleFsChange);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      document.removeEventListener('fullscreenchange', handleFsChange);
      engine.destroy();
    };
  }, [level, onWin, onLose]);

  return (
    <div ref={rootRef} className="flex flex-col h-full w-full bg-[#070a12] relative overflow-hidden select-none">
      
      {/* Top HUD */}
      <header className="w-full px-4 py-2.5 bg-[#0b0f1a]/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
            <Sparkles size={14} className="text-yellow-400" />
            <span className="text-xs text-white/60 font-semibold">SCORE:</span>
            <span className="text-white font-black text-sm">{score}</span>
          </div>

          <div className="bg-white/5 px-2.5 py-1 rounded-full border border-white/5 text-xs text-blue-300 font-bold hidden sm:flex items-center gap-1">
            <Trophy size={13} className="text-blue-400" />
            <span>LVL {level}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          <button 
            onClick={() => { playButton(); onQuit(); }}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 text-white/70 hover:text-red-400 flex items-center justify-center transition-colors"
            title="Quit Game"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Play Area with Arcade Centering */}
      <div className="flex-1 w-full h-full overflow-hidden relative flex items-center justify-center bg-radial from-[#10172b] to-[#06080e]">
        
        {/* Left Arcade Sidebar (Visible on Widescreen & Fullscreen) */}
        <aside className="hidden xl:flex flex-col justify-between p-6 w-60 h-full text-white/70 select-none z-10 pointer-events-none">
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Game Mode</span>
              <h3 className="text-base font-black text-white mt-0.5">Classic Arcade</h3>
              <p className="text-xs text-white/50 mt-1">Match 3 same-colored bubbles to pop them before they reach bottom.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Current Score</span>
              <div className="text-3xl font-black text-white mt-1 tracking-tight">{score}</div>
              <div className="text-[11px] text-white/40 mt-1">Pop groups for combo bonuses</div>
            </div>
          </div>

          <div className="text-[11px] text-white/30 text-center">
            Medhastone Arcade Engine
          </div>
        </aside>

        {/* Centered Arcade Playfield Canvas Container */}
        <div 
          ref={playfieldRef}
          className="relative h-full w-full max-w-[540px] flex items-center justify-center shadow-2xl shadow-black/80 border-x border-white/10 bg-[#090d16] overflow-hidden"
          style={{ touchAction: 'none' }}
        >
          <canvas 
            ref={canvasRef} 
            className="block w-full h-full"
            style={{ touchAction: 'none' }}
          />
        </div>

        {/* Right Arcade Sidebar (Visible on Widescreen & Fullscreen) */}
        <aside className="hidden xl:flex flex-col justify-between p-6 w-60 h-full text-white/70 select-none z-10 pointer-events-none">
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
                <HelpCircle size={14} />
                <span>HOW TO PLAY</span>
              </div>
              <ul className="text-xs text-white/60 space-y-2 leading-relaxed">
                <li>• <strong className="text-white">Move cursor</strong> or touch to aim trajectory laser.</li>
                <li>• <strong className="text-white">Click or tap</strong> to launch the bubble.</li>
                <li>• <strong className="text-white">Bank shots</strong> off side walls to hit difficult angles.</li>
                <li>• Dislodge hanging clusters for big falling bonus points!</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-white/50">
              {isFullscreen ? 'Press ESC or toggle icon to exit full screen' : 'Full screen mode enabled'}
            </div>
          </div>

          <div className="text-[11px] text-white/30 text-center">
            Zero latency 60 FPS Canvas
          </div>
        </aside>

      </div>
    </div>
  );
}
