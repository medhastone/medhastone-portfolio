import { setSoundEnabled } from './game/audio';
import RanksScreen from './components/RanksScreen';
import ShopScreen from './components/ShopScreen';
import SettingsScreen from './components/SettingsScreen';
import { useState, useEffect } from 'react';
import { loadStats, saveStats, PlayerStats } from './store';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import VictoryScreen from './components/VictoryScreen';

export type ScreenState = 'HOME' | 'GAME' | 'VICTORY' | 'GAMEOVER' | 'RANKS' | 'SHOP' | 'SETTINGS';

function App() {
  const [screen, setScreen] = useState<ScreenState>('HOME');
  const [stats, setStats] = useState<PlayerStats>(() => {
    const s = loadStats();
    setSoundEnabled(s.soundEnabled);
    return s;
  });
  const [lastScore, setLastScore] = useState(0);

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const updateStats = (updates: Partial<PlayerStats>) => {
    setStats(prev => ({ ...prev, ...updates }));
  };

  const handleLevelComplete = (score: number) => {
    setLastScore(score);
    updateStats({
      level: stats.level + 1,
      coins: stats.coins + Math.floor(score / 100),
      highestScore: Math.max(stats.highestScore, score)
    });
    setScreen('VICTORY');
  };

  const handleGameOver = (score: number) => {
    setLastScore(score);
    updateStats({
      highestScore: Math.max(stats.highestScore, score)
    });
    setScreen('GAMEOVER'); // We can reuse victory screen or make a new one, let's keep it simple
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-md h-full sm:h-[85vh] sm:rounded-3xl sm:border-4 border-slate-700 bg-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
        {screen === 'HOME' && <HomeScreen stats={stats} onPlay={() => setScreen('GAME')} onRanks={() => setScreen('RANKS')} onShop={() => setScreen('SHOP')} onSettings={() => setScreen('SETTINGS')} />}
        {screen === 'RANKS' && <RanksScreen stats={stats} onBack={() => setScreen('HOME')} />}
        {screen === 'SHOP' && <ShopScreen stats={stats} updateStats={updateStats} onBack={() => setScreen('HOME')} />}
        {screen === 'SETTINGS' && <SettingsScreen stats={stats} updateStats={updateStats} onBack={() => setScreen('HOME')} />}
        {screen === 'GAME' && <GameScreen level={stats.level} onWin={handleLevelComplete} onLose={handleGameOver} onQuit={() => setScreen('HOME')} />}
        {screen === 'VICTORY' && <VictoryScreen score={lastScore} stats={stats} isWin={true} onContinue={() => setScreen('HOME')} />}
        {screen === 'GAMEOVER' && <VictoryScreen score={lastScore} stats={stats} isWin={false} onContinue={() => setScreen('HOME')} />}
      </div>
    </div>
  );
}

export default App;
