import { initAudio, playButton } from '../game/audio';
import { Play, Settings, ShoppingCart, Award, ArrowLeft } from 'lucide-react';
import { PlayerStats } from '../store';

interface Props {
  stats: PlayerStats;
  onPlay: () => void;
  onRanks: () => void;
  onShop: () => void;
  onSettings: () => void;
}

export default function HomeScreen({ stats, onPlay, onRanks, onShop, onSettings }: Props) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-indigo-500 to-purple-800 text-white relative">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black/20">
        <button 
          onClick={() => { playButton(); window.location.href = 'https://zentova.in/#play-games'; }}
          className="flex items-center gap-1 text-white/80 hover:text-white font-bold bg-white/10 px-3 py-1 rounded-full text-sm"
        >
          <ArrowLeft size={16} /> Hub
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-yellow-300">
            <div className="w-5 h-5 rounded-full bg-yellow-400 border border-yellow-200"></div>
            {stats.coins}
          </div>
          <div className="flex items-center gap-2 font-bold text-emerald-300">
            <div className="w-5 h-5 rounded-sm bg-emerald-400 rotate-45 border border-emerald-200"></div>
            {stats.gems}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500 drop-shadow-lg">
          BUBBLE
          <br/>
          MANIA
        </h1>
        <p className="text-purple-200 mb-8 font-medium">Level {stats.level}</p>
        
        <button 
          onClick={() => { initAudio(); playButton(); onPlay(); }}
          className="w-48 h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-white font-bold text-2xl shadow-[0_4px_0_rgb(4,120,87)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2 mb-8"
        >
          <Play fill="currentColor" /> PLAY
        </button>

        <div className="grid grid-cols-3 gap-4 w-full px-4">
          <button onClick={() => { playButton(); onRanks(); }} className="flex flex-col items-center gap-1 bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors">
            <Award className="text-yellow-400" />
            <span className="text-xs font-bold">Ranks</span>
          </button>
          <button onClick={() => { playButton(); onShop(); }} className="flex flex-col items-center gap-1 bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors">
            <ShoppingCart className="text-blue-400" />
            <span className="text-xs font-bold">Shop</span>
          </button>
          <button onClick={() => { playButton(); onSettings(); }} className="flex flex-col items-center gap-1 bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors">
            <Settings className="text-slate-300" />
            <span className="text-xs font-bold">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
