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
import SingleGamePage from './components/SingleGamePage';
import PokemonGeneratorScreen, { ActiveToolTab } from './components/PokemonGeneratorScreen';

export type ScreenState = 
  | 'HOME' 
  | 'GAME' 
  | 'VICTORY' 
  | 'GAMEOVER' 
  | 'RANKS' 
  | 'SHOP' 
  | 'SETTINGS' 
  | 'GAMES_HUB' 
  | 'SINGLE_GAME'
  | 'PLAY_IFRAME' 
  | 'LANDING' 
  | 'PROJECT_DETAILS' 
  | 'PRIVACY_POLICY'
  | 'POKEMON_GENERATOR';

function App() {
  const [screen, setScreen] = useState<ScreenState>('LANDING');
  const [activeGame, setActiveGame] = useState<{path: string, title: string} | null>(null);
  const [activeGameId, setActiveGameId] = useState<string>('bubble-mania');
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activePokemonTool, setActivePokemonTool] = useState<ActiveToolTab>('generator');
  const [stats, setStats] = useState<PlayerStats>(() => {
    const s = loadStats();
    setSoundEnabled(s.soundEnabled);
    return s;
  });
  
  const [lastScore, setLastScore] = useState(0);

  // Routing Logic
  useEffect(() => {
    const handleRouting = () => {
      const hash = window.location.hash;
      const rawPath = window.location.pathname;
      let decodedPath = '';
      try {
        decodedPath = decodeURIComponent(rawPath);
      } catch {
        decodedPath = rawPath;
      }
      const pathname = decodedPath.toLowerCase();
      const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
      const segments = cleanPath.split('/');
      const projectIds = ['medijourney', 'parkdock', 'brainmaze', 'rojgarbahi', 'pdfzero', 'lexibrain'];
      
      // 0. Check Pokémon Tool Routes (Separate pages and URLs for SEO)
      // /pokemon-compare, /pokemon-favorite-tournament, /whos-that-pokemon, /pokemon-nickname-generator, /pokemon-iv-calculator, /pokemon-nuzlocke-tracker
      if (
        pathname === '/pokemon-compare' || 
        pathname === '/pokemon-compare/' ||
        pathname === '/compare-pokemon' ||
        pathname === '/compare-pokemon/' ||
        hash.toLowerCase() === '#pokemon-compare' ||
        hash.toLowerCase() === '#compare-pokemon'
      ) {
        if (pathname !== '/pokemon-compare') {
          window.history.replaceState(null, '', '/pokemon-compare');
        }
        setActivePokemonTool('compare');
        setScreen('POKEMON_GENERATOR');
        return;
      }

      if (
        pathname === '/pokemon-favorite-tournament' || 
        pathname === '/pokemon-favorite-tournament/' ||
        pathname === '/favorite-tournament' ||
        pathname === '/favorite-tournament/' ||
        pathname === '/pokemon-favorites' ||
        pathname === '/pokemon-favorites/' ||
        hash.toLowerCase() === '#pokemon-favorite-tournament' ||
        hash.toLowerCase() === '#favorite-tournament'
      ) {
        if (pathname !== '/pokemon-favorite-tournament') {
          window.history.replaceState(null, '', '/pokemon-favorite-tournament');
        }
        setActivePokemonTool('favorites');
        setScreen('POKEMON_GENERATOR');
        return;
      }

      if (
        pathname === '/whos-that-pokemon' || 
        pathname === '/whos-that-pokemon/' ||
        pathname === '/pokemon-quiz' ||
        pathname === '/pokemon-quiz/' ||
        hash.toLowerCase() === '#whos-that-pokemon' ||
        hash.toLowerCase() === '#pokemon-quiz'
      ) {
        if (pathname !== '/whos-that-pokemon') {
          window.history.replaceState(null, '', '/whos-that-pokemon');
        }
        setActivePokemonTool('quiz');
        setScreen('POKEMON_GENERATOR');
        return;
      }

      if (
        pathname === '/pokemon-nickname-generator' || 
        pathname === '/pokemon-nickname-generator/' ||
        pathname === '/pokemon-nicknames' ||
        pathname === '/pokemon-nicknames/' ||
        hash.toLowerCase() === '#pokemon-nickname-generator' ||
        hash.toLowerCase() === '#pokemon-nicknames'
      ) {
        if (pathname !== '/pokemon-nickname-generator') {
          window.history.replaceState(null, '', '/pokemon-nickname-generator');
        }
        setActivePokemonTool('nicknames');
        setScreen('POKEMON_GENERATOR');
        return;
      }

      if (
        pathname === '/pokemon-iv-calculator' || 
        pathname === '/pokemon-iv-calculator/' ||
        pathname === '/pokemon-stat-calculator' ||
        pathname === '/pokemon-stat-calculator/' ||
        hash.toLowerCase() === '#pokemon-iv-calculator' ||
        hash.toLowerCase() === '#pokemon-stat-calculator'
      ) {
        if (pathname !== '/pokemon-iv-calculator') {
          window.history.replaceState(null, '', '/pokemon-iv-calculator');
        }
        setActivePokemonTool('ivcalc');
        setScreen('POKEMON_GENERATOR');
        return;
      }

      if (
        pathname === '/pokemon-nuzlocke-tracker' || 
        pathname === '/pokemon-nuzlocke-tracker/' ||
        pathname === '/nuzlocke-tracker' ||
        pathname === '/nuzlocke-tracker/' ||
        hash.toLowerCase() === '#pokemon-nuzlocke-tracker' ||
        hash.toLowerCase() === '#nuzlocke-tracker'
      ) {
        if (pathname !== '/pokemon-nuzlocke-tracker') {
          window.history.replaceState(null, '', '/pokemon-nuzlocke-tracker');
        }
        setActivePokemonTool('nuzlocke');
        setScreen('POKEMON_GENERATOR');
        return;
      }

      // Check primary /random-pokemon-generator or /pokemon routes
      const isPokemonRoute = 
        pathname === '/random-pokemon-generator' || 
        pathname === '/random-pokemon-generator/' ||
        pathname === '/random-pokémon-generator' || 
        pathname === '/random-pokémon-generator/' || 
        rawPath.toLowerCase().includes('random-pok%c3%a9mon-generator') ||
        pathname === '/pokemon' || 
        pathname === '/pokemon/' || 
        pathname === '/pokemon-generator' || 
        pathname === '/pokemon-generator/' ||
        hash.toLowerCase() === '#pokemon' ||
        hash.toLowerCase() === '#pokemon-generator' ||
        hash.toLowerCase() === '#random-pokemon-generator' ||
        hash.toLowerCase() === '#random-pokémon-generator';

      if (isPokemonRoute) {
        if (pathname !== '/random-pokemon-generator') {
          window.history.replaceState(null, '', '/random-pokemon-generator');
        }
        setActivePokemonTool('generator');
        setScreen('POKEMON_GENERATOR');
        return;
      }

      // 1. Check /play-games/:gameId or /play-games
      if (segments[0] === 'play-games') {
        if (segments[1]) {
          setActiveGameId(segments[1]);
          setScreen('SINGLE_GAME');
          return;
        }
        setScreen('GAMES_HUB');
        return;
      }

      // 2. Check /privacy-policy routes
      if (pathname.includes('/privacy-policy')) {
        let projectFromPath = segments[0] || 'rojgarbahi';
        if (projectFromPath === 'privacy-policy') {
          projectFromPath = segments[1] || 'rojgarbahi';
        }
        if (!projectIds.includes(projectFromPath)) {
          const found = projectIds.find(p => pathname.includes(p));
          projectFromPath = found || 'rojgarbahi';
        }
        setActiveProject(projectFromPath);
        setScreen('PRIVACY_POLICY');
        return;
      }

      // 3. Check if pathname matches a project directly (e.g. /lexibrain)
      const matchingPathProject = projectIds.find(p => pathname === `/${p}` || pathname === `/${p}/`);
      if (matchingPathProject) {
        setActiveProject(matchingPathProject);
        setScreen('PROJECT_DETAILS');
        return;
      }

      // 4. Hash routing compatibility
      if (hash.startsWith('#play-games/')) {
        const gId = hash.replace('#play-games/', '').replace(/^\/+|\/+$/g, '');
        window.history.replaceState(null, '', `/play-games/${gId}`);
        setActiveGameId(gId);
        setScreen('SINGLE_GAME');
        return;
      } else if (hash === '#play-games') {
        window.history.replaceState(null, '', '/play-games');
        setScreen('GAMES_HUB');
        return;
      } else if (hash === '#bubble-mania') {
        window.history.replaceState(null, '', '/play-games/bubble-mania');
        setActiveGameId('bubble-mania');
        setScreen('SINGLE_GAME');
        return;
      } else if (hash.endsWith('/privacy-policy')) {
        const proj = hash.substring(1).replace('/privacy-policy', '').replace(/^\/+/, '');
        const targetProj = proj || 'lexibrain';
        window.history.replaceState(null, '', `/${targetProj}/privacy-policy`);
        setActiveProject(targetProj);
        setScreen('PRIVACY_POLICY');
        return;
      } else if (projectIds.some(p => hash === `#${p}`)) {
        const targetProj = hash.substring(1);
        window.history.replaceState(null, '', `/${targetProj}`);
        setActiveProject(targetProj);
        setScreen('PROJECT_DETAILS');
        return;
      }

      // Default to LANDING (previous homepage is kept in that location)
      setScreen('LANDING');
    };

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
    // If path is #bubble-mania or starts with /games/
    const foundId = Object.keys(loadStats()).length; // placeholder
    setActiveGame({ path, title });
    setScreen('PLAY_IFRAME');
  };

  const closeExternalGame = () => {
    setActiveGame(null);
    setScreen('GAMES_HUB');
    window.history.pushState(null, '', '/play-games');
  };

  if (screen === 'PRIVACY_POLICY') {
    const effectiveAppId = activeProject || 'rojgarbahi';
    return <PrivacyPolicyScreen appId={effectiveAppId} onBack={() => {
      setScreen('PROJECT_DETAILS');
      window.history.pushState(null, '', `/${effectiveAppId}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }} />;
  }

  if (screen === 'PROJECT_DETAILS' && activeProject) {
    return <ProjectDetailsScreen id={activeProject} onBack={() => {
      setScreen('LANDING');
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }} />;
  }

  if (screen === 'SINGLE_GAME') {
    return (
      <SingleGamePage 
        gameId={activeGameId}
        onNavigateHome={() => {
          window.history.pushState(null, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        onNavigateHub={() => {
          window.history.pushState(null, '', '/play-games');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        onSelectGame={(id) => {
          window.history.pushState(null, '', `/play-games/${id}`);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
      />
    );
  }

  if (screen === 'GAMES_HUB') {
    return (
      <GamesHubScreen 
        onPlayGame={(path, title) => {
          // Find gameId from path or title
          if (path === '#bubble-mania') {
            window.history.pushState(null, '', '/play-games/bubble-mania');
            window.dispatchEvent(new PopStateEvent('popstate'));
            return;
          }
          const matchedSegment = path.split('/')[2]; // e.g. /games/chess-ai/index.html -> chess-ai
          if (matchedSegment) {
            window.history.pushState(null, '', `/play-games/${matchedSegment}`);
            window.dispatchEvent(new PopStateEvent('popstate'));
          } else {
            playExternalGame(path, title);
          }
        }}
      />
    );
  }

  if (screen === 'POKEMON_GENERATOR') {
    return (
      <PokemonGeneratorScreen 
        initialTool={activePokemonTool}
        onBack={() => {
          setScreen('LANDING');
          window.history.pushState(null, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }} 
      />
    );
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
