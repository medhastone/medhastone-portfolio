import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Download, 
  Lock, 
  Unlock, 
  ShieldAlert, 
  Filter, 
  Check, 
  Sliders, 
  Bookmark, 
  Trash2, 
  Search, 
  Zap, 
  Volume2, 
  X,
  Dices,
  Eye,
  Info,
  Layers,
  ChevronDown,
  ChevronUp,
  Share2,
  RefreshCcw,
  Star,
  Home
} from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas-pro';
import { 
  Pokemon, 
  PokemonType, 
  TYPE_COLORS, 
  GENERATIONS, 
  ALL_TYPES, 
  fisherYatesShuffle,
  getShinyArtworkUrl,
  getArtworkUrl,
  ULTRA_BEAST_IDS,
  PARADOX_IDS,
  BABY_IDS
} from '../data/pokemonData';
import { FALLBACK_POKEMON_LIST, loadFullPokemonDatabase } from '../data/pokemonList';

// Competitor Feature Suite Components
import TeamWeaknessMatrix from './pokemon/TeamWeaknessMatrix';
import ShowdownExportModal from './pokemon/ShowdownExportModal';
import PokemonCompareTool from './pokemon/PokemonCompareTool';
import FavoritePickerTool from './pokemon/FavoritePickerTool';
import WhosThatPokemonGame from './pokemon/WhosThatPokemonGame';
import PokemonNicknameTool from './pokemon/PokemonNicknameTool';
import PokemonIvCalculator from './pokemon/PokemonIvCalculator';
import NuzlockeChallengeTool from './pokemon/NuzlockeChallengeTool';
import PokemonCryButton from './pokemon/PokemonCryButton';
import PokemonGenerationList from './pokemon/PokemonGenerationList';
import PokemonDetailModal from './pokemon/PokemonDetailModal';
import PokemonToolSeoContent, { POKEMON_TOOLS_SEO_DATA, PokemonToolId } from './pokemon/PokemonToolSeoContent';

export type ActiveToolTab = PokemonToolId;

interface PokemonGeneratorScreenProps {
  onBack?: () => void;
  initialTool?: ActiveToolTab;
}

export default function PokemonGeneratorScreen({ onBack, initialTool = 'generator' }: PokemonGeneratorScreenProps) {
  // Active Tool Tab Navigation
  const [activeTab, setActiveTab] = useState<ActiveToolTab>(initialTool);

  // Sync activeTab when initialTool prop changes
  useEffect(() => {
    if (initialTool && initialTool !== activeTab) {
      setActiveTab(initialTool);
    }
  }, [initialTool]);

  // Master Pokémon list (loaded from local fallback + async PokéAPI fetch)
  const [masterList, setMasterList] = useState<Pokemon[]>(FALLBACK_POKEMON_LIST);
  const [isLoadingDb, setIsLoadingDb] = useState<boolean>(true);

  // Filter States
  const [selectedGens, setSelectedGens] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [selectedType, setSelectedType] = useState<PokemonType | 'all'>('all');
  const [excludeLegendary, setExcludeLegendary] = useState<boolean>(true);
  const [excludeUltraBeast, setExcludeUltraBeast] = useState<boolean>(false);
  const [excludeParadox, setExcludeParadox] = useState<boolean>(false);
  const [stageFilter, setStageFilter] = useState<'all' | 'basic' | 'final'>('all');
  const [teamSize, setTeamSize] = useState<number>(6);
  const [globalShiny, setGlobalShiny] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Team Synergy Matrix Drawer State
  const [isMatrixOpen, setIsMatrixOpen] = useState<boolean>(true);
  // Showdown Export Modal State
  const [showShowdownModal, setShowShowdownModal] = useState<boolean>(false);

  // Generated Team State (Stores Pokemon objects with custom locked and shiny flags)
  interface TeamMember {
    pokemon: Pokemon;
    isLocked: boolean;
    isShiny: boolean;
  }
  const [team, setTeam] = useState<TeamMember[]>([]);

  // Locked slots tracking
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Saved Teams in LocalStorage
  interface SavedTeam {
    id: string;
    name: string;
    date: string;
    members: { id: number; name: string; types: PokemonType[]; artwork: string; isShiny: boolean }[];
  }
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>(() => {
    try {
      const stored = localStorage.getItem('pokemon_saved_teams');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showSavedModal, setShowSavedModal] = useState<boolean>(false);
  const [selectedDetailsPokemon, setSelectedDetailsPokemon] = useState<Pokemon | null>(null);

  // Ref for capture element
  const teamContainerRef = useRef<HTMLDivElement>(null);

  // Helper function to switch tabs and update browser URL seamlessly
  const handleSelectTab = (tab: ActiveToolTab) => {
    setActiveTab(tab);
    const seoInfo = POKEMON_TOOLS_SEO_DATA[tab];
    if (seoInfo) {
      document.title = seoInfo.pageTitle;
      window.history.pushState(null, '', seoInfo.urlPath);
    }
  };

  // Sync browser document.title and URL when activeTab changes
  useEffect(() => {
    const seoInfo = POKEMON_TOOLS_SEO_DATA[activeTab];
    if (seoInfo) {
      document.title = seoInfo.pageTitle;
      const curPath = window.location.pathname;
      try {
        const decoded = decodeURIComponent(curPath);
        if (decoded !== seoInfo.urlPath && decoded.toLowerCase() !== seoInfo.urlPath.toLowerCase()) {
          window.history.replaceState(null, '', seoInfo.urlPath);
        }
      } catch {
        // Fallback
      }
    }
  }, [activeTab]);

  // Load database on mount
  useEffect(() => {
    let isMounted = true;
    async function initDb() {
      setIsLoadingDb(true);
      const db = await loadFullPokemonDatabase();
      if (isMounted) {
        setMasterList(db);
        setIsLoadingDb(false);
      }
    }
    initDb();
    return () => { isMounted = false; };
  }, []);

  // Compute filtered candidates pool based on filters
  const candidatePool = useMemo(() => {
    return masterList.filter(p => {
      // 1. Generation filter
      if (!selectedGens.includes(p.gen)) return false;

      // 2. Type filter
      if (selectedType !== 'all' && !p.types.includes(selectedType)) return false;

      // 3. Legendary / Mythical filter
      if (excludeLegendary && (p.isLegendary || p.isMythical)) return false;

      // 4. Ultra Beast filter
      if (excludeUltraBeast && (p.isUltraBeast || ULTRA_BEAST_IDS.has(p.id))) return false;

      // 5. Paradox filter
      if (excludeParadox && (p.isParadox || PARADOX_IDS.has(p.id))) return false;

      // 6. Stage filter (Basic vs Fully Evolved)
      if (stageFilter === 'basic') {
        if (p.stage && p.stage !== 'basic') return false;
        // If stage not explicitly provided in API, estimate via BST (< 420 is generally basic/middle unless legendary)
        if (!p.stage && p.stats.total >= 460 && !p.isLegendary) return false;
      } else if (stageFilter === 'final') {
        if (p.stage && p.stage !== 'final' && !p.isLegendary) return false;
        if (!p.stage && p.stats.total < 430 && !p.isLegendary) return false;
      }

      // 7. Real-time search query filter (supports name, #ID, padded ID, and type)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.trim().toLowerCase();
        const cleanNum = q.replace(/[^0-9]/g, '');
        const cleanName = q.replace(/^#/, '');

        const matchesName = p.name.toLowerCase().includes(cleanName);
        const idStr = p.id.toString();
        const paddedId = idStr.padStart(4, '0');
        const paddedThree = idStr.padStart(3, '0');

        const matchesId = 
          idStr === cleanNum || 
          paddedId === cleanNum || 
          paddedThree === cleanNum ||
          idStr === cleanName ||
          paddedId === cleanName ||
          paddedThree === cleanName ||
          (cleanNum.length >= 2 && idStr.includes(cleanNum));

        const matchesType = p.types.some(t => t.toLowerCase() === cleanName);

        if (!matchesName && !matchesId && !matchesType) return false;
      }

      return true;
    });
  }, [masterList, selectedGens, selectedType, excludeLegendary, excludeUltraBeast, excludeParadox, stageFilter, searchQuery]);

  // Initial Team Generation once DB is ready
  useEffect(() => {
    if (masterList.length > 0 && team.length === 0) {
      handleGenerateTeam(true);
    }
  }, [masterList]);

  // Main Team Generator using Fisher-Yates Shuffle
  const handleGenerateTeam = (isInitial = false) => {
    if (candidatePool.length === 0) return;

    setIsGenerating(true);

    // Perform Fisher-Yates Shuffle on candidates
    const shuffled: Pokemon[] = fisherYatesShuffle<Pokemon>(candidatePool);

    let nextTeam: TeamMember[] = [];
    let shuffledIdx = 0;

    for (let i = 0; i < teamSize; i++) {
      // If slot i exists in current team and is locked, preserve it!
      if (!isInitial && team[i] && team[i].isLocked) {
        nextTeam.push(team[i]);
      } else {
        // Find next unused candidate from shuffled pool
        while (
          shuffledIdx < shuffled.length && 
          nextTeam.some(m => m.pokemon.id === shuffled[shuffledIdx].id)
        ) {
          shuffledIdx++;
        }

        if (shuffledIdx < shuffled.length) {
          const p = shuffled[shuffledIdx];
          shuffledIdx++;
          
          // Random 1/15 shiny roll if global shiny is disabled, or 100% shiny if global shiny enabled
          const isShinyRoll = globalShiny || Math.random() < 0.08;

          nextTeam.push({
            pokemon: p,
            isLocked: false,
            isShiny: isShinyRoll
          });
        } else if (candidatePool.length > 0) {
          // Fallback if team size > pool size
          const fallbackPokemon = candidatePool[Math.floor(Math.random() * candidatePool.length)];
          nextTeam.push({
            pokemon: fallbackPokemon,
            isLocked: false,
            isShiny: globalShiny
          });
        }
      }
    }

    setTeam(nextTeam);

    // Trigger confetti if any legendary or shiny appeared!
    const hasSpecial = nextTeam.some(m => m.isShiny || m.pokemon.isLegendary);
    if (hasSpecial && !isInitial) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    setTimeout(() => {
      setIsGenerating(false);
    }, 250);
  };

  // Toggle individual card lock
  const toggleLock = (index: number) => {
    setTeam(prev => prev.map((item, idx) => 
      idx === index ? { ...item, isLocked: !item.isLocked } : item
    ));
  };

  // Toggle individual card shiny
  const toggleShiny = (index: number) => {
    setTeam(prev => prev.map((item, idx) => 
      idx === index ? { ...item, isShiny: !item.isShiny } : item
    ));
  };

  // Reroll single unlocked slot
  const rerollSlot = (index: number) => {
    if (candidatePool.length === 0) return;
    const currentIds = team.map(m => m.pokemon.id);
    const available = candidatePool.filter(p => !currentIds.includes(p.id));
    const poolToUse = available.length > 0 ? available : candidatePool;
    const newPokemon = poolToUse[Math.floor(Math.random() * poolToUse.length)];

    setTeam(prev => prev.map((item, idx) => 
      idx === index ? { pokemon: newPokemon, isLocked: false, isShiny: globalShiny || Math.random() < 0.08 } : item
    ));
  };

  // Toggle Generation selection
  const toggleGen = (genId: number) => {
    setSelectedGens(prev => {
      if (prev.includes(genId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(g => g !== genId);
      } else {
        return [...prev, genId].sort((a, b) => a - b);
      }
    });
  };

  const selectAllGens = () => setSelectedGens([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const selectKantoOnly = () => setSelectedGens([1]);

  // Save current team to LocalStorage
  const handleSaveTeam = () => {
    if (team.length === 0) return;
    const newSaved: SavedTeam = {
      id: Date.now().toString(),
      name: `Team ${savedTeams.length + 1} (${team.map(m => m.pokemon.name).slice(0, 2).join(', ')}...)`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      members: team.map(m => ({
        id: m.pokemon.id,
        name: m.pokemon.name,
        types: m.pokemon.types,
        artwork: m.isShiny ? getShinyArtworkUrl(m.pokemon.id) : m.pokemon.officialArtworkUrl,
        isShiny: m.isShiny
      }))
    };

    const updated = [newSaved, ...savedTeams];
    setSavedTeams(updated);
    localStorage.setItem('pokemon_saved_teams', JSON.stringify(updated));

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 }
    });
  };

  const handleDeleteSavedTeam = (id: string) => {
    const updated = savedTeams.filter(t => t.id !== id);
    setSavedTeams(updated);
    localStorage.setItem('pokemon_saved_teams', JSON.stringify(updated));
  };

  // Add a specific Pokémon from list or detail modal directly to the team
  const handleAddToTeam = (pokemon: Pokemon) => {
    setTeam(prev => {
      const newMember: TeamMember = {
        pokemon,
        isLocked: true,
        isShiny: globalShiny
      };
      if (prev.length < teamSize) {
        return [...prev, newMember];
      }
      const unlockedIndex = prev.findIndex(m => !m.isLocked);
      if (unlockedIndex !== -1) {
        return prev.map((m, idx) => idx === unlockedIndex ? newMember : m);
      }
      return [...prev.slice(0, prev.length - 1), newMember];
    });
  };

  // Direct HTML5 2D Canvas Fallback Renderer for guaranteed zero-failure image export
  const renderDirectCanvasDownload = async () => {
    try {
      const count = team.length;
      if (count === 0) return;
      
      const cols = count === 1 ? 1 : count <= 4 ? 2 : 3;
      const rows = Math.ceil(count / cols);
      
      const cardWidth = 340;
      const cardHeight = 360;
      const padding = 36;
      const gap = 20;
      const headerHeight = 90;
      
      const canvas = document.createElement('canvas');
      canvas.width = padding * 2 + cols * cardWidth + (cols - 1) * gap;
      canvas.height = padding * 2 + headerHeight + rows * cardHeight + (rows - 1) * gap;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#0a0d16');
      bgGrad.addColorStop(0.5, '#0e1322');
      bgGrad.addColorStop(1, '#07090f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Outer border
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.strokeRect(padding / 2, padding / 2, canvas.width - padding, canvas.height - padding);
      
      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px system-ui, sans-serif';
      ctx.fillText('Pokémon Battle Team', padding, padding + 32);
      
      // Subtitle
      ctx.fillStyle = '#94a3b8';
      ctx.font = '13px system-ui, sans-serif';
      const genText = selectedGens.length === 9 ? 'Gens 1–9' : `Gens ${selectedGens.join(', ')}`;
      const typeText = selectedType === 'all' ? 'All Types' : `${selectedType.toUpperCase()} Type`;
      const legText = excludeLegendary ? 'Standard' : 'Includes Legendaries';
      ctx.fillText(`${genText} • ${typeText} • ${legText}`, padding, padding + 60);
      
      // Total BST
      const totalBst = team.reduce((sum, item) => sum + item.pokemon.stats.total, 0);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 22px system-ui, monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${totalBst} BST`, canvas.width - padding, padding + 36);
      ctx.fillStyle = '#64748b';
      ctx.font = '10px system-ui, sans-serif';
      ctx.fillText('TEAM STAT TOTAL', canvas.width - padding, padding + 56);
      ctx.textAlign = 'left';

      // Load image promise helper
      const loadImage = (src: string): Promise<HTMLImageElement | null> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = src;
        });
      };

      for (let i = 0; i < count; i++) {
        const member = team[i];
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = padding + col * (cardWidth + gap);
        const y = padding + headerHeight + row * (cardHeight + gap);

        // Card Box
        ctx.fillStyle = member.isLocked ? '#181a16' : '#0d111d';
        ctx.strokeStyle = member.isLocked ? '#f59e0b' : '#1e293b';
        ctx.lineWidth = member.isLocked ? 2 : 1;
        ctx.beginPath();
        ctx.roundRect(x, y, cardWidth, cardHeight, 18);
        ctx.fill();
        ctx.stroke();

        // Dex ID & Gen
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`#${member.pokemon.id.toString().padStart(4, '0')}  GEN ${member.pokemon.gen}`, x + 16, y + 26);

        if (member.isShiny) {
          ctx.fillStyle = '#fbbf24';
          ctx.font = 'bold 11px system-ui';
          ctx.fillText('★ SHINY', x + cardWidth - 75, y + 26);
        }

        // Pokemon Image
        const artUrl = member.isShiny ? getShinyArtworkUrl(member.pokemon.id) : member.pokemon.officialArtworkUrl;
        const img = await loadImage(artUrl) || await loadImage(member.pokemon.spriteUrl);
        if (img) {
          ctx.drawImage(img, x + (cardWidth - 140) / 2, y + 40, 140, 140);
        }

        // Name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(member.pokemon.name, x + cardWidth / 2, y + 215);

        // Type badges
        let typeStartX = x + cardWidth / 2 - (member.pokemon.types.length * 45);
        ctx.font = 'bold 9px system-ui, sans-serif';
        member.pokemon.types.forEach((t) => {
          const colorHex = TYPE_COLORS[t]?.bg || '#64748b';
          ctx.fillStyle = colorHex;
          ctx.beginPath();
          ctx.roundRect(typeStartX, y + 228, 75, 20, 10);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillText(t.toUpperCase(), typeStartX + 37, y + 242);
          typeStartX += 85;
        });
        ctx.textAlign = 'left';

        // Stats summary block
        ctx.fillStyle = '#06080e';
        ctx.beginPath();
        ctx.roundRect(x + 14, y + 260, cardWidth - 28, 86, 12);
        ctx.fill();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px system-ui, sans-serif';
        ctx.fillText(`HP: ${member.pokemon.stats.hp}  ATK: ${member.pokemon.stats.attack}  DEF: ${member.pokemon.stats.defense}`, x + 24, y + 284);
        ctx.fillText(`SP.ATK: ${member.pokemon.stats.specialAttack}  SP.DEF: ${member.pokemon.stats.specialDefense}  SPD: ${member.pokemon.stats.speed}`, x + 24, y + 304);
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`BST TOTAL: ${member.pokemon.stats.total}`, x + 24, y + 326);
      }

      const link = document.createElement('a');
      link.download = `pokemon-team-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (fallbackErr) {
      console.error('Canvas fallback rendering also failed:', fallbackErr);
      alert('Could not download image. Please try again.');
    }
  };

  // Download Team as Image using html2canvas-pro with Canvas fallback
  const handleDownloadImage = async () => {
    if (!teamContainerRef.current) return;
    setIsDownloading(true);

    try {
      // Temporarily hide action buttons/controls during capture
      const actionElements = teamContainerRef.current.querySelectorAll('.no-capture');
      actionElements.forEach(el => (el as HTMLElement).style.display = 'none');

      const canvas = await html2canvas(teamContainerRef.current, {
        backgroundColor: '#0a0d14',
        scale: 2, // High DPI capture
        useCORS: true,
        allowTaint: false,
        logging: false
      });

      // Restore action buttons
      actionElements.forEach(el => (el as HTMLElement).style.display = '');

      const link = document.createElement('a');
      link.download = `pokemon-team-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.warn('html2canvas-pro encountered an issue, falling back to direct canvas renderer:', err);
      // Restore action buttons before fallback
      if (teamContainerRef.current) {
        const actionElements = teamContainerRef.current.querySelectorAll('.no-capture');
        actionElements.forEach(el => (el as HTMLElement).style.display = '');
      }
      await renderDirectCanvasDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-rose-500 selection:text-white pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Return to Home"
              >
                <Home className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Home</span>
              </button>
            )}
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 p-0.5 shadow-lg shadow-rose-500/20 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#0d111a] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-rose-600"></div>
                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-slate-900 z-10"></div>
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-slate-900 z-20 shadow-md"></div>
                </div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Random Pokémon Generator</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 hidden sm:inline-block">
                    Gens 1–9
                  </span>
                </h1>
                <p className="text-xs text-slate-400 font-medium hidden md:block">
                  Fisher-Yates Shuffle Engine • 100% Offline PokéAPI Database
                </p>
              </div>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowSavedModal(true)}
              className="relative px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Saved Teams</span>
              {savedTeams.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                  {savedTeams.length}
                </span>
              )}
            </button>

            <button
              onClick={handleSaveTeam}
              disabled={team.length === 0}
              className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span className="hidden sm:inline">Save Team</span>
            </button>

            <button
              onClick={handleDownloadImage}
              disabled={isDownloading || team.length === 0}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Capturing...' : 'Download Image'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <ol className="flex items-center space-x-1.5 text-slate-400 font-medium">
            <li>
              <a 
                href="/" 
                onClick={(e) => {
                  e.preventDefault();
                  if (onBack) {
                    onBack();
                  } else {
                    window.history.pushState(null, '', '/');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
                className="hover:text-rose-400 text-slate-300 hover:underline flex items-center gap-1.5 transition-colors font-medium"
              >
                <Home className="w-4 h-4 text-slate-400" />
                <span>Home</span>
              </a>
            </li>
            <li className="text-slate-500 font-black select-none px-0.5">&gt;</li>
            {activeTab !== 'generator' && (
              <>
                <li>
                  <a 
                    href="/random-pokemon-generator"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectTab('generator');
                    }}
                    className="hover:text-rose-400 text-slate-300 hover:underline transition-colors"
                  >
                    Pokémon Tools
                  </a>
                </li>
                <li className="text-slate-500 font-black select-none px-0.5">&gt;</li>
              </>
            )}
            <li className="text-white font-bold tracking-tight flex items-center gap-1.5">
              <span>{POKEMON_TOOLS_SEO_DATA[activeTab]?.metaH1 || 'Random Pokémon Generator'}</span>
            </li>
          </ol>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{POKEMON_TOOLS_SEO_DATA[activeTab]?.urlPath || '/random-pokemon-generator'}</span>
          </div>
        </nav>

        {/* Competitor Tools Navigation Bar */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
          <a
            href="/random-pokemon-generator"
            onClick={(e) => {
              e.preventDefault();
              handleSelectTab('generator');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'generator'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25 ring-2 ring-rose-500/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Dices className="w-4 h-4" />
            <span>Team Generator</span>
          </a>

          <a
            href="/pokemon-compare"
            onClick={(e) => {
              e.preventDefault();
              handleSelectTab('compare');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'compare'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25 ring-2 ring-rose-500/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Compare Pokémon</span>
          </a>

          <a
            href="/pokemon-favorite-tournament"
            onClick={(e) => {
              e.preventDefault();
              handleSelectTab('favorites');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'favorites'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25 ring-2 ring-rose-500/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span>Favorite Tournament</span>
          </a>

          <a
            href="/whos-that-pokemon"
            onClick={(e) => {
              e.preventDefault();
              handleSelectTab('quiz');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'quiz'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25 ring-2 ring-rose-500/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Who's That Pokémon?</span>
          </a>

          <a
            href="/pokemon-nickname-generator"
            onClick={(e) => {
              e.preventDefault();
              handleSelectTab('nicknames');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'nicknames'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25 ring-2 ring-rose-500/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Nickname Generator</span>
          </a>

          <a
            href="/pokemon-iv-calculator"
            onClick={(e) => {
              e.preventDefault();
              handleSelectTab('ivcalc');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'ivcalc'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25 ring-2 ring-rose-500/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>IV &amp; Stat Calculator</span>
          </a>

          <a
            href="/pokemon-nuzlocke-tracker"
            onClick={(e) => {
              e.preventDefault();
              handleSelectTab('nuzlocke');
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'nuzlocke'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25 ring-2 ring-rose-500/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Nuzlocke Tracker</span>
          </a>
        </div>

        {/* TOOL TAB VIEW SWITCHER */}
        {activeTab === 'compare' && (
          <PokemonCompareTool pokemonList={masterList} />
        )}

        {activeTab === 'favorites' && (
          <FavoritePickerTool pokemonList={masterList} />
        )}

        {activeTab === 'quiz' && (
          <WhosThatPokemonGame pokemonList={masterList} />
        )}

        {activeTab === 'nicknames' && (
          <PokemonNicknameTool pokemonList={masterList} />
        )}

        {activeTab === 'ivcalc' && (
          <PokemonIvCalculator pokemonList={masterList} />
        )}

        {activeTab === 'nuzlocke' && (
          <NuzlockeChallengeTool pokemonList={masterList} />
        )}

        {/* PRIMARY GENERATOR TAB */}
        {activeTab === 'generator' && (
          <>
        {/* Filter Controls Dashboard */}
        <section className="bg-gradient-to-b from-[#0f1422] to-[#0a0e18] rounded-3xl border border-white/10 p-5 sm:p-7 shadow-2xl mb-8 relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sliders className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Team Generator Controls</span>
              </div>
              <p className="text-sm text-slate-300 font-medium">
                Showing <strong className="text-white font-bold">{candidatePool.length}</strong> matching Pokémon in current candidate pool.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowShowdownModal(true)}
                disabled={team.length === 0}
                className="px-4 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-40"
                title="Export team in Pokémon Showdown format"
              >
                <span>Export Showdown</span>
              </button>

              <button
                onClick={() => handleGenerateTeam()}
                disabled={isGenerating || candidatePool.length === 0}
                className="flex-1 lg:flex-none px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Dices className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Shuffling...' : 'Generate New Team'}</span>
              </button>
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pt-6">

            {/* 1. Generation Selector (Col-span 5) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>Generations ({selectedGens.length}/9)</span>
                </label>
                <div className="flex items-center gap-2 text-[11px]">
                  <button onClick={selectAllGens} className="text-blue-400 hover:underline font-bold">All Gens</button>
                  <span className="text-slate-600">•</span>
                  <button onClick={selectKantoOnly} className="text-slate-400 hover:text-white transition-colors font-medium">Gen 1 Only</button>
                </div>
              </div>

              {/* Gen Toggle Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {GENERATIONS.map(gen => {
                  const isSelected = selectedGens.includes(gen.id);
                  return (
                    <button
                      key={gen.id}
                      onClick={() => toggleGen(gen.id)}
                      className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all border flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-blue-600/20 text-blue-300 border-blue-500/50 shadow-md shadow-blue-500/10'
                          : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-slate-200'
                      }`}
                    >
                      <span>{gen.name}</span>
                      <span className="text-[9px] font-normal text-slate-400">{gen.region}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Type & Evolution Stage Filter (Col-span 3) */}
            <div className="lg:col-span-3 space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-purple-400" />
                <span>Type &amp; Stage Filters</span>
              </label>

              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as PokemonType | 'all')}
                  className="w-full bg-[#121829] text-white text-xs font-bold rounded-2xl border border-white/10 px-4 py-2.5 appearance-none focus:outline-none focus:border-rose-500/50 cursor-pointer shadow-inner"
                >
                  <option value="all">🌟 All Types (No Filter)</option>
                  {ALL_TYPES.map(t => (
                    <option key={t} value={t}>
                      {t.toUpperCase()} Type
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Evolution Stage Dropdown */}
              <div className="relative">
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value as 'all' | 'basic' | 'final')}
                  className="w-full bg-[#121829] text-white text-xs font-bold rounded-2xl border border-white/10 px-4 py-2.5 appearance-none focus:outline-none focus:border-rose-500/50 cursor-pointer shadow-inner"
                >
                  <option value="all">All Evolution Stages</option>
                  <option value="basic">Basic (Unevolved) Only</option>
                  <option value="final">Fully Evolved Only</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Type Active Badge Preview */}
              {selectedType !== 'all' && (
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${TYPE_COLORS[selectedType].badge} text-white shadow-sm`}>
                    {selectedType}
                  </span>
                  <button 
                    onClick={() => setSelectedType('all')}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Clear Type
                  </button>
                </div>
              )}
            </div>

            {/* 3. Team Size & Advanced Toggles (Col-span 4) */}
            <div className="lg:col-span-4 space-y-3">
              
              {/* Team Size Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Team Count ({teamSize} Pokémon)</span>
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <button
                        key={num}
                        onClick={() => setTeamSize(num)}
                        className={`w-6 h-6 rounded-lg text-[11px] font-bold transition-colors ${
                          teamSize === num ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="range"
                  min={1}
                  max={6}
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                />
              </div>

              {/* Toggle Switches (Competitor features) */}
              <div className="space-y-2 pt-1">
                {/* Legendary Exclusion Toggle */}
                <label className="flex items-center justify-between cursor-pointer px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-[11px] font-bold text-slate-200">Exclude Legendaries</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={excludeLegendary}
                    onChange={(e) => setExcludeLegendary(e.target.checked)}
                    className="w-3.5 h-3.5 accent-rose-500 rounded cursor-pointer"
                  />
                </label>

                {/* Ultra Beasts Exclusion Toggle */}
                <label className="flex items-center justify-between cursor-pointer px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[11px] font-bold text-slate-200">Exclude Ultra Beasts</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={excludeUltraBeast}
                    onChange={(e) => setExcludeUltraBeast(e.target.checked)}
                    className="w-3.5 h-3.5 accent-rose-500 rounded cursor-pointer"
                  />
                </label>

                {/* Paradox Pokémon Exclusion Toggle */}
                <label className="flex items-center justify-between cursor-pointer px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[11px] font-bold text-slate-200">Exclude Paradox (Gen 9)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={excludeParadox}
                    onChange={(e) => setExcludeParadox(e.target.checked)}
                    className="w-3.5 h-3.5 accent-rose-500 rounded cursor-pointer"
                  />
                </label>

                {/* Global Shiny Mode Toggle */}
                <label className="flex items-center justify-between cursor-pointer px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] font-bold text-slate-200">Force Shiny Artworks</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={globalShiny}
                    onChange={(e) => {
                      setGlobalShiny(e.target.checked);
                      setTeam(prev => prev.map(m => ({ ...m, isShiny: e.target.checked })));
                    }}
                    className="w-3.5 h-3.5 accent-amber-500 rounded cursor-pointer"
                  />
                </label>
              </div>

            </div>

          </div>

        </section>

        {/* Candidate Pool Warnings or Empty States */}
        {candidatePool.length === 0 && (
          <div className="p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-center mb-8">
            <ShieldAlert className="w-10 h-10 text-rose-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Pokémon Match Current Filters</h3>
            <p className="text-xs text-slate-300 mb-4">Try selecting more generations or resetting type/legendary filters.</p>
            <button
              onClick={() => {
                selectAllGens();
                setSelectedType('all');
                setExcludeLegendary(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* TEAM DISPLAY AREA (Capturable Container) */}
        <section 
          ref={teamContainerRef}
          id="pokemon-team-container"
          className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0a0d16] via-[#0e1322] to-[#07090f] border border-white/10 shadow-2xl relative"
        >
          {/* Export Header Banner (Visible in Capture) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-black text-xs">
                ★
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Generated Pokémon Battle Team
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  {selectedGens.length === 9 ? 'Gens 1–9' : `Gens ${selectedGens.join(', ')}`} • {selectedType === 'all' ? 'All Types' : `${selectedType.toUpperCase()} Type`} • {excludeLegendary ? 'Standard' : 'Includes Legendaries'}
                </p>
              </div>
            </div>

            {/* Total Base Stat Calculation */}
            <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Team Stat Total</div>
              <div className="text-lg font-black text-amber-400 font-mono">
                {team.reduce((sum, item) => sum + item.pokemon.stats.total, 0)} BST
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className={`grid grid-cols-1 ${
            teamSize === 1 ? 'max-w-md mx-auto' :
            teamSize === 2 ? 'sm:grid-cols-2 max-w-2xl mx-auto' :
            teamSize === 3 ? 'sm:grid-cols-3 max-w-4xl mx-auto' :
            'sm:grid-cols-2 lg:grid-cols-3'
          } gap-6`}>
            
            {team.map((member, idx) => {
              const { pokemon, isLocked, isShiny } = member;
              const primaryType = pokemon.types[0];
              const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;
              const artworkSrc = isShiny ? getShinyArtworkUrl(pokemon.id) : pokemon.officialArtworkUrl;

              return (
                <div
                  key={`${pokemon.id}-${idx}`}
                  className={`relative rounded-3xl border transition-all duration-300 p-5 flex flex-col justify-between group overflow-hidden ${
                    isLocked 
                      ? 'bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-slate-950 border-amber-500/50 ring-2 ring-amber-500/20' 
                      : 'bg-gradient-to-b from-[#101628] via-[#0d111e] to-[#090c15] border-white/10 hover:border-white/20'
                  }`}
                  style={{
                    boxShadow: isLocked 
                      ? '0 10px 30px -10px rgba(245, 158, 11, 0.2)' 
                      : `0 10px 30px -10px ${typeColor.glow}`
                  }}
                >
                  {/* Background Type Glow Watermark */}
                  <div 
                    className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full opacity-10 pointer-events-none blur-2xl"
                    style={{ backgroundColor: typeColor.bg }}
                  ></div>

                  {/* Card Top Header */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-black text-slate-400">
                          #{pokemon.id.toString().padStart(4, '0')}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5 uppercase">
                          Gen {pokemon.gen}
                        </span>
                      </div>

                      {/* Locked Badge or Per-Card Controls (no-capture class handles hiding on export) */}
                      <div className="flex items-center gap-1.5 no-capture">
                        <PokemonCryButton 
                          pokemonId={pokemon.id} 
                          pokemonName={pokemon.name} 
                          variant="icon" 
                        />

                        <button
                          onClick={() => setSelectedDetailsPokemon(pokemon)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                          title="View Pokémon Stats & Matchups"
                        >
                          <Info className="w-3.5 h-3.5 text-blue-400" />
                        </button>

                        <button
                          onClick={() => toggleShiny(idx)}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                            isShiny 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' 
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                          title="Toggle Shiny Artwork"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => rerollSlot(idx)}
                          disabled={isLocked}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-30"
                          title="Reroll this slot"
                        >
                          <RefreshCcw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => toggleLock(idx)}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                            isLocked 
                              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                          title={isLocked ? "Unlock slot" : "Lock slot"}
                        >
                          {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Pokémon Artwork Frame */}
                    <div className="relative my-2 py-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      
                      {/* Aura Circle */}
                      <div 
                        className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full opacity-20 blur-xl"
                        style={{ backgroundColor: typeColor.bg }}
                      ></div>

                      {/* Artwork Image */}
                      <img
                        src={artworkSrc}
                        alt={pokemon.name}
                        crossOrigin="anonymous"
                        className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 object-contain filter drop-shadow-xl"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to standard front sprite if official artwork fails
                          (e.target as HTMLImageElement).src = pokemon.spriteUrl;
                        }}
                      />

                      {/* Shiny Sparkle Indicator */}
                      {isShiny && (
                        <div className="absolute top-1 right-2 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> Shiny
                        </div>
                      )}
                    </div>

                    {/* Name & Types */}
                    <div className="text-center space-y-1 mb-4">
                      <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                        <span>{pokemon.name}</span>
                        {pokemon.isLegendary && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Leg
                          </span>
                        )}
                      </h3>

                      <div className="flex items-center justify-center gap-1.5 pt-1">
                        {pokemon.types.map(t => {
                          const tc = TYPE_COLORS[t] || TYPE_COLORS.normal;
                          return (
                            <span 
                              key={t}
                              className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${tc.badge} text-white shadow-sm`}
                            >
                              {t}
                            </span>
                          );
                        })}
                      </div>

                      {/* Official Pokémon Cry Audio Player (Browser Audio API) */}
                      <div className="pt-2.5 flex items-center justify-center no-capture">
                        <PokemonCryButton 
                          pokemonId={pokemon.id} 
                          pokemonName={pokemon.name} 
                          variant="pill" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Base Stats Meters */}
                  <div className="space-y-1.5 pt-3 border-t border-white/5 bg-black/20 p-3 rounded-2xl">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                      <span>BASE STATS</span>
                      <span className="text-amber-400 font-mono">{pokemon.stats.total} BST</span>
                    </div>

                    {/* Stat Bars Grid */}
                    <div className="space-y-1 text-[10px]">
                      {/* HP */}
                      <div className="flex items-center gap-2">
                        <span className="w-8 font-bold text-slate-400">HP</span>
                        <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full" 
                            style={{ width: `${Math.min(100, (pokemon.stats.hp / 160) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="w-6 text-right font-mono text-slate-300">{pokemon.stats.hp}</span>
                      </div>

                      {/* ATK */}
                      <div className="flex items-center gap-2">
                        <span className="w-8 font-bold text-slate-400">ATK</span>
                        <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-rose-500 h-full rounded-full" 
                            style={{ width: `${Math.min(100, (pokemon.stats.attack / 170) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="w-6 text-right font-mono text-slate-300">{pokemon.stats.attack}</span>
                      </div>

                      {/* DEF */}
                      <div className="flex items-center gap-2">
                        <span className="w-8 font-bold text-slate-400">DEF</span>
                        <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full rounded-full" 
                            style={{ width: `${Math.min(100, (pokemon.stats.defense / 160) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="w-6 text-right font-mono text-slate-300">{pokemon.stats.defense}</span>
                      </div>

                      {/* SPE */}
                      <div className="flex items-center gap-2">
                        <span className="w-8 font-bold text-slate-400">SPD</span>
                        <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-amber-400 h-full rounded-full" 
                            style={{ width: `${Math.min(100, (pokemon.stats.speed / 150) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="w-6 text-right font-mono text-slate-300">{pokemon.stats.speed}</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}

          </div>

          {/* Export Footer Watermark (Visible in capture) */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Generated with Medhastone Random Pokémon Generator</span>
            <span>https://zentova.in/Random-Pokémon-Generator</span>
          </div>
        </section>

        {/* Team Defensive Weakness & Synergy Matrix (Competitor feature) */}
        <div className="mt-8">
          <TeamWeaknessMatrix 
            team={team} 
            isOpen={isMatrixOpen} 
            onToggle={() => setIsMatrixOpen(!isMatrixOpen)} 
          />
        </div>

        {/* Real-Time Filterable Pokémon Directory & Generation Pool Browser */}
        <div className="mt-8">
          <PokemonGenerationList
            pokemonList={candidatePool}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectPokemonForDetails={(p) => setSelectedDetailsPokemon(p)}
            onAddPokemonToTeam={handleAddToTeam}
            teamIds={team.map(m => m.pokemon.id)}
            showShinyArt={globalShiny}
          />
        </div>
        </>
      )}

        {/* Dynamic In-Depth Google SEO Keywords & Guide Content for the Active Tool */}
        <PokemonToolSeoContent 
          toolId={activeTab} 
          onNavigateTool={(toolId) => handleSelectTab(toolId)} 
        />

      </main>

      {/* Showdown Export Modal */}
      <ShowdownExportModal 
        team={team} 
        isOpen={showShowdownModal} 
        onClose={() => setShowShowdownModal(false)} 
      />

      {/* In-Depth Pokémon Details Modal */}
      <PokemonDetailModal
        pokemon={selectedDetailsPokemon}
        onClose={() => setSelectedDetailsPokemon(null)}
        onAddToTeam={handleAddToTeam}
        teamSize={teamSize}
      />

      {/* Saved Teams Modal */}
      {showSavedModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1422] border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-black text-white">Your Saved Pokémon Teams</h3>
              </div>
              <button 
                onClick={() => setShowSavedModal(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Saved Teams List */}
            <div className="overflow-y-auto flex-1 space-y-4 pr-1">
              {savedTeams.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Star className="w-10 h-10 mx-auto mb-3 opacity-30 text-amber-400" />
                  <p className="text-sm font-bold text-white mb-1">No Saved Teams Yet</p>
                  <p className="text-xs">Generate a team and click "Save Team" to bookmark your favorite combinations!</p>
                </div>
              ) : (
                savedTeams.map(saved => (
                  <div 
                    key={saved.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white text-sm">{saved.name}</div>
                        <div className="text-slate-400 text-[10px]">{saved.date} • {saved.members.length} Pokémon</div>
                      </div>
                      <button
                        onClick={() => handleDeleteSavedTeam(saved.id)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs"
                        title="Delete team"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Member Sprites Preview */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {saved.members.map((m, mIdx) => (
                        <div key={mIdx} className="w-12 h-12 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center p-1 shrink-0">
                          <img src={m.artwork} alt={m.name} className="w-10 h-10 object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-white/10 mt-6 text-right">
              <button
                onClick={() => setShowSavedModal(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
