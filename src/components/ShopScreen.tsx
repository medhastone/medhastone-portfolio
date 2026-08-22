import { ArrowLeft, ShoppingCart, Gem, CircleDollarSign } from 'lucide-react';
import { PlayerStats } from '../store';
import { playButton, playWin } from '../game/audio';

interface Props {
  stats: PlayerStats;
  updateStats: (updates: Partial<PlayerStats>) => void;
  onBack: () => void;
}

export default function ShopScreen({ stats, updateStats, onBack }: Props) {
  const buyGems = (amount: number, costCoins: number) => {
    if (stats.coins >= costCoins) {
      playWin();
      updateStats({ 
        coins: stats.coins - costCoins,
        gems: stats.gems + amount
      });
    } else {
      playButton(); // standard button sound for failure
      alert("Not enough coins!");
    }
  };

  const buyCoins = (amount: number, costGems: number) => {
    if (stats.gems >= costGems) {
      playWin();
      updateStats({ 
        gems: stats.gems - costGems,
        coins: stats.coins + amount
      });
    } else {
      playButton();
      alert("Not enough gems!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white relative">
      <div className="flex items-center p-4 bg-slate-800 border-b border-slate-700">
        <button onClick={() => { playButton(); onBack(); }} className="p-2 mr-4 hover:bg-slate-700 rounded-full transition-colors">
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center gap-2">
          <ShoppingCart /> SHOP
        </h2>
      </div>

      {/* Currency Display */}
      <div className="flex justify-center gap-6 p-4 bg-slate-800/50 border-b border-slate-700/50 shadow-inner">
        <div className="flex items-center gap-2 font-bold text-yellow-300 text-xl">
          <div className="w-6 h-6 rounded-full bg-yellow-400 border border-yellow-200 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
          {stats.coins}
        </div>
        <div className="flex items-center gap-2 font-bold text-emerald-300 text-xl">
          <div className="w-6 h-6 rounded-sm bg-emerald-400 rotate-45 border border-emerald-200 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
          {stats.gems}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        
        {/* Gems Section */}
        <div>
          <h3 className="font-bold text-emerald-400 mb-3 flex items-center gap-2 uppercase tracking-wide text-sm"><Gem size={16} /> Buy Gems</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => buyGems(10, 500)}
              className="bg-slate-800 border border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-slate-700 transition-colors active:scale-95"
            >
              <div className="w-10 h-10 rounded-sm bg-emerald-400 rotate-45 border-2 border-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.4)] mb-2"></div>
              <span className="font-black text-xl text-emerald-300">10 Gems</span>
              <div className="bg-slate-900 px-3 py-1 rounded-full text-sm font-bold text-yellow-400 flex items-center gap-1">
                500 Coins
              </div>
            </button>
            <button 
              onClick={() => buyGems(50, 2000)}
              className="bg-slate-800 border border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-slate-700 transition-colors active:scale-95"
            >
              <div className="relative mb-2">
                <div className="w-10 h-10 rounded-sm bg-emerald-400 rotate-45 border-2 border-emerald-200 absolute -left-2 top-0"></div>
                <div className="w-10 h-10 rounded-sm bg-emerald-400 rotate-45 border-2 border-emerald-200 relative shadow-[0_0_15px_rgba(52,211,153,0.4)]"></div>
              </div>
              <span className="font-black text-xl text-emerald-300">50 Gems</span>
              <div className="bg-slate-900 px-3 py-1 rounded-full text-sm font-bold text-yellow-400 flex items-center gap-1">
                2000 Coins
              </div>
            </button>
          </div>
        </div>

        {/* Coins Section */}
        <div>
          <h3 className="font-bold text-yellow-400 mb-3 flex items-center gap-2 uppercase tracking-wide text-sm"><CircleDollarSign size={16} /> Buy Coins</h3>
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => buyCoins(1000, 15)}
              className="bg-slate-800 border border-yellow-500/30 rounded-2xl p-4 flex items-center justify-between hover:bg-slate-700 transition-colors active:scale-95"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.4)] flex items-center justify-center">
                  <CircleDollarSign className="text-yellow-700" />
                </div>
                <span className="font-black text-xl text-yellow-300">1000 Coins</span>
              </div>
              <div className="bg-slate-900 px-4 py-2 rounded-full text-sm font-bold text-emerald-400 flex items-center gap-1">
                15 Gems
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
