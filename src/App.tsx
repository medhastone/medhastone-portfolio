import { setSoundEnabled } from './game/audio';
import RanksScreen from './components/RanksScreen';
import ShopScreen from './components/ShopScreen';
import SettingsScreen from './components/SettingsScreen';
import { useState, useEffect } from 'react';
import { loadStats, saveStats, PlayerStats } from './store';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import VictoryScreen from './components/VictoryScreen';
import GamesHubScreen from './components/GamesHubScreen';
import IframePlayerScreen from './components/IframePlayerScreen';
import LandingScreen from './components/LandingScreen';
import ProjectDetailsScreen from './components/ProjectDetailsScreen';
import PrivacyPolicyScreen from './components/PrivacyPolicyScreen';

export type ScreenState = 'HOME' | 'GAME' | 'VICTORY' | 'GAMEOVER' | 'RANKS' | 'SHOP' | 'SETTINGS' | 'GAMES_HUB' | 'PLAY_IFRAME' | 'LANDING' | 'PROJECT_DETAILS' | 'PRIVACY_POLICY';

function App() {
  const [screen, setScreen] = useState<ScreenState>('LANDING');
  const [activeGame, setActiveGame] = useState<{path: string, title: string} | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [stats, setStats] = useState<PlayerStats>(() => {
    const s = loadStats();
    setSoundEnabled(s.soundEnabled);
    return s;
  });
  
  const [lastScore, setLastScore] = useState(0);

  // Routing Logic (Supports both pathnames like /lexibrain/privacy-policy and hash routing like #lexibrain/privacy-policy)
  useEffect(() => {
    const handleRouting = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname.toLowerCase();
      const projectIds = ['medijourney', 'parkdock', 'brainmaze', 'rojgarbahi', 'pdfzero', 'lexibrain'];
      
      // 1. Check direct pathname routing (e.g., /lexibrain/privacy-policy or /privacy-policy)
      if (pathname.includes('/privacy-policy')) {
        const segments = pathname.replace(/^\/+|\/+$/g, '').split('/');
        const projectFromPath = segments[0] || 'lexibrain';
        setActiveProject(projectFromPath === 'privacy-policy' ? 'lexibrain' : projectFromPath);
        setScreen('PRIVACY_POLICY');
        return;
      }

      // Check if pathname matches a project directly (e.g. /lexibrain)
      const matchingPathProject = projectIds.find(p => pathname === `/${p}` || pathname === `/${p}/`);
      if (matchingPathProject) {
        setActiveProject(matchingPathProject);
        setScreen('PROJECT_DETAILS');
        return;
      }

      // 2. Check hash routing
      if (hash === '#bubble-mania') {
        setScreen('HOME');
      } else if (hash === '#play-games') {
        setScreen('GAMES_HUB');
      } else if (hash.endsWith('/privacy-policy')) {
        const proj = hash.substring(1).replace('/privacy-policy', '').replace(/^\/+/, '');
        setActiveProject(proj || 'lexibrain');
        setScreen('PRIVACY_POLICY');
      } else if (projectIds.some(p => hash === `#${p}`)) {
        setActiveProject(hash.substring(1));
        setScreen('PROJECT_DETAILS');
      } else {
        setScreen('LANDING');
      }
    };
    
    // Initial check
    handleRouting();

    window.addEventListener('hashchange', handleRouting);
    window.addEventListener('popstate', handleRouting);
    return () => {
      window.removeEventListener('hashchange', handleRouting);
      window.removeEventListener('popstate', handleRouting);
    };
  }, []);

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
    setScreen('GAMEOVER');
  };

  const playExternalGame = (path: string, title: string) => {
    setActiveGame({ path, title });
    setScreen('PLAY_IFRAME');
  };

  const closeExternalGame = () => {
    setActiveGame(null);
    setScreen('GAMES_HUB');
    window.location.hash = '#play-games'; // Back to hub
  };

  if (screen === 'PRIVACY_POLICY' && activeProject) {
    return <PrivacyPolicyScreen appId={activeProject} onBack={() => {
      setScreen('PROJECT_DETAILS');
      window.location.hash = `#${activeProject}`; // Return to project page
    }} />;
  }

  if (screen === 'PROJECT_DETAILS' && activeProject) {
    return <ProjectDetailsScreen id={activeProject} onBack={() => {
      setScreen('LANDING');
      window.location.hash = ''; // Clear hash to return to Landing
    }} />;
  }

  if (screen === 'LANDING') {
    return <LandingScreen />;
  }

  return (
    <div className="w-full h-screen fixed inset-0 overflow-hidden select-none touch-none bg-slate-900 flex items-center justify-center">
      <div className="w-full h-full bg-slate-800 relative overflow-hidden flex flex-col">
        {screen === 'HOME' && <HomeScreen stats={stats} onPlay={() => setScreen('GAME')} onRanks={() => setScreen('RANKS')} onShop={() => setScreen('SHOP')} onSettings={() => setScreen('SETTINGS')} />}
        {screen === 'RANKS' && <RanksScreen stats={stats} onBack={() => setScreen('HOME')} />}
        {screen === 'SHOP' && <ShopScreen stats={stats} updateStats={updateStats} onBack={() => setScreen('HOME')} />}
        {screen === 'SETTINGS' && <SettingsScreen stats={stats} updateStats={updateStats} onBack={() => setScreen('HOME')} />}
        {screen === 'GAME' && <GameScreen level={stats.level} onWin={handleLevelComplete} onLose={handleGameOver} onQuit={() => setScreen('HOME')} />}
        {screen === 'VICTORY' && <VictoryScreen score={lastScore} stats={stats} isWin={true} onContinue={() => setScreen('HOME')} />}
        {screen === 'GAMEOVER' && <VictoryScreen score={lastScore} stats={stats} isWin={false} onContinue={() => setScreen('HOME')} />}
        
        {screen === 'GAMES_HUB' && (
          <GamesHubScreen 
            onPlayGame={playExternalGame}
          />
        )}
        
        {screen === 'PLAY_IFRAME' && activeGame && (
          <IframePlayerScreen 
            gamePath={activeGame.path} 
            gameTitle={activeGame.title} 
            onBack={closeExternalGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;
