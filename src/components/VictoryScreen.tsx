import { playButton } from '../game/audio';
import { PlayerStats } from '../store';
import { Star, Home } from 'lucide-react';

interface Props {
  score: number;
  stats: PlayerStats;
  isWin: boolean;
  onContinue: () => void;
}

export default function VictoryScreen({ score, stats, isWin, onContinue }: Props) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-800 to-slate-900 text-white relative items-center justify-center p-6">
      <div className="bg-slate-800 border-4 border-slate-700 rounded-3xl p-8 w-full max-w-sm flex flex-col items-center shadow-2xl relative">
        
        {/* Stars */}
        {isWin && (
          <div className="flex gap-2 absolute -top-8">
            <Star size={48} className="text-yellow-400 drop-shadow-md -rotate-12" fill="currentColor" />
            <Star size={56} className="text-yellow-400 drop-shadow-md -translate-y-4" fill="currentColor" />
            <Star size={48} className="text-yellow-400 drop-shadow-md rotate-12" fill="currentColor" />
          </div>
        )}

        <h2 className={`text-4xl font-black mt-8 mb-2 ${isWin ? 'text-yellow-400' : 'text-red-400'}`}>
          {isWin ? 'LEVEL CLEARED!' : 'GAME OVER'}
        </h2>
        
        <div className="bg-slate-900/50 rounded-xl p-4 w-full mb-6 text-center">
          <p className="text-slate-400 text-sm font-bold uppercase mb-1">Score</p>
          <p className="text-3xl font-black text-white">{score}</p>
        </div>

        {isWin && (
          <div className="flex justify-center gap-6 mb-8 w-full">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-400 border border-yellow-200 mb-1"></div>
              <span className="font-bold text-yellow-400">+{Math.floor(score/100)}</span>
            </div>
          </div>
        )}

        <button 
          onClick={() => { playButton(); onContinue(); }}
          className="w-full h-14 rounded-full bg-blue-500 text-white font-bold text-xl shadow-[0_4px_0_rgb(37,99,235)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2"
        >
          <Home /> CONTINUE
        </button>
      </div>
    </div>
  );
}
