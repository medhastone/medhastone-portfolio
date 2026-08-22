import { ArrowLeft, Award, Lock, CheckCircle2 } from 'lucide-react';
import { PlayerStats } from '../store';
import { playButton } from '../game/audio';

interface Props {
  stats: PlayerStats;
  onBack: () => void;
}

const RANKS = [
  { name: 'Beginner', level: 1, color: 'text-slate-400' },
  { name: 'Popper', level: 5, color: 'text-green-400' },
  { name: 'Shooter', level: 10, color: 'text-blue-400' },
  { name: 'Bubble Hunter', level: 20, color: 'text-purple-400' },
  { name: 'Puzzle Master', level: 35, color: 'text-pink-400' },
  { name: 'Bubble Wizard', level: 50, color: 'text-yellow-400' },
  { name: 'Legend', level: 100, color: 'text-red-400' },
];

export default function RanksScreen({ stats, onBack }: Props) {
  return (
    <div className="flex flex-col h-full bg-slate-900 text-white relative">
      <div className="flex items-center p-4 bg-slate-800 border-b border-slate-700">
        <button onClick={() => { playButton(); onBack(); }} className="p-2 mr-4 hover:bg-slate-700 rounded-full transition-colors">
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 flex items-center gap-2">
          <Award /> RANKS
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-6 text-center mb-4 border border-purple-500/30">
          <p className="text-purple-200 mb-1 font-medium">Current Level</p>
          <h3 className="text-4xl font-black text-white">{stats.level}</h3>
        </div>

        {RANKS.map((rank, i) => {
          const isUnlocked = stats.level >= rank.level;
          const isNext = !isUnlocked && (i === 0 || stats.level >= RANKS[i-1].level);
          
          return (
            <div key={rank.name} className={`flex items-center justify-between p-4 rounded-xl border ${isUnlocked ? 'bg-slate-800 border-slate-700' : isNext ? 'bg-slate-800/50 border-blue-500/30' : 'bg-slate-800/30 border-slate-800 opacity-60'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-slate-900 ${isUnlocked ? rank.color : 'text-slate-600'}`}>
                  {isUnlocked ? <Award size={24} /> : <Lock size={24} />}
                </div>
                <div>
                  <h4 className={`font-bold text-lg ${isUnlocked ? rank.color : 'text-slate-400'}`}>{rank.name}</h4>
                  <p className="text-sm text-slate-500">Unlocks at Level {rank.level}</p>
                </div>
              </div>
              {isUnlocked && <CheckCircle2 className="text-emerald-500" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
