import { ArrowLeft, Volume2, VolumeX, Trash2 } from 'lucide-react';
import { PlayerStats, saveStats } from '../store';
import { setSoundEnabled, playButton } from '../game/audio';

interface Props {
  stats: PlayerStats;
  updateStats: (updates: Partial<PlayerStats>) => void;
  onBack: () => void;
}

export default function SettingsScreen({ stats, updateStats, onBack }: Props) {
  const toggleSound = () => {
    playButton();
    const newState = !stats.soundEnabled;
    setSoundEnabled(newState);
    updateStats({ soundEnabled: newState });
  };

  const resetProgress = () => {
    playButton();
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      localStorage.removeItem('bubble_pop_stats');
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white relative">
      <div className="flex items-center p-4 bg-slate-800 border-b border-slate-700">
        <button onClick={() => { playButton(); onBack(); }} className="p-2 mr-4 hover:bg-slate-700 rounded-full transition-colors">
          <ArrowLeft />
        </button>
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">SETTINGS</h2>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {stats.soundEnabled ? <Volume2 className="text-emerald-400" /> : <VolumeX className="text-slate-500" />}
              <span className="font-bold text-lg">Sound Effects</span>
            </div>
            <button 
              onClick={toggleSound}
              className={`w-14 h-8 rounded-full p-1 transition-colors ${stats.soundEnabled ? 'bg-emerald-500' : 'bg-slate-600'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${stats.soundEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg text-red-400">Danger Zone</span>
          </div>
          <button 
            onClick={resetProgress}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-500 font-bold border border-red-500/20 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 size={20} /> RESET PROGRESS
          </button>
        </div>
      </div>
    </div>
  );
}
