import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Shield, 
  Zap,
  Check,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { Pokemon, NATURES, PokemonNature, PokemonStats, TYPE_COLORS } from '../../data/pokemonData';
import PokemonCryButton from './PokemonCryButton';

interface PokemonIvCalculatorProps {
  pokemonList: Pokemon[];
}

export default function PokemonIvCalculator({ pokemonList }: PokemonIvCalculatorProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>(() => {
    return pokemonList.find(p => p.id === 448) || pokemonList[0]; // Lucario or first
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [level, setLevel] = useState<number>(50);
  const [natureName, setNatureName] = useState<string>('Adamant');

  // IVs (0 - 31)
  const [ivs, setIvs] = useState<Record<keyof Omit<PokemonStats, 'total'>, number>>({
    hp: 31,
    attack: 31,
    defense: 31,
    spAtk: 31,
    spDef: 31,
    speed: 31
  });

  // EVs (0 - 252, max total 510)
  const [evs, setEvs] = useState<Record<keyof Omit<PokemonStats, 'total'>, number>>({
    hp: 4,
    attack: 252,
    defense: 0,
    spAtk: 0,
    spDef: 0,
    speed: 252
  });

  const totalEvs = useMemo(() => {
    return (Object.values(evs) as number[]).reduce((a, b) => a + b, 0);
  }, [evs]);

  const activeNature = useMemo<PokemonNature>(() => {
    return NATURES.find(n => n.name === natureName) || NATURES[0];
  }, [natureName]);

  // Search filtered
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return pokemonList.slice(0, 30);
    const q = searchQuery.toLowerCase();
    return pokemonList.filter(p => p.name.toLowerCase().includes(q) || p.id.toString() === q).slice(0, 30);
  }, [pokemonList, searchQuery]);

  // Official Generation 3-9 Pokémon Stat Formula
  const calculatedStats = useMemo(() => {
    const base = selectedPokemon.stats;
    const statsResult: Record<keyof Omit<PokemonStats, 'total'>, number> = {
      hp: 0,
      attack: 0,
      defense: 0,
      spAtk: 0,
      spDef: 0,
      speed: 0
    };

    // HP Calculation (Shedinja exception = 1)
    if (selectedPokemon.id === 292) {
      statsResult.hp = 1;
    } else {
      statsResult.hp = Math.floor(
        ((2 * base.hp + ivs.hp + Math.floor(evs.hp / 4)) * level) / 100
      ) + level + 10;
    }

    // Other 5 stats
    const otherKeys: (keyof Omit<PokemonStats, 'total' | 'hp'>)[] = ['attack', 'defense', 'spAtk', 'spDef', 'speed'];

    otherKeys.forEach(key => {
      const raw = Math.floor(
        ((2 * base[key] + ivs[key] + Math.floor(evs[key] / 4)) * level) / 100
      ) + 5;

      let multiplier = 1.0;
      if (activeNature.increased === key && activeNature.decreased !== key) {
        multiplier = 1.1;
      } else if (activeNature.decreased === key && activeNature.increased !== key) {
        multiplier = 0.9;
      }

      statsResult[key] = Math.floor(raw * multiplier);
    });

    return statsResult;
  }, [selectedPokemon, level, ivs, evs, activeNature]);

  // Presets
  const applyPreset = (preset: 'physical' | 'special' | 'bulky' | 'all31') => {
    if (preset === 'physical') {
      setEvs({ hp: 4, attack: 252, defense: 0, spAtk: 0, spDef: 0, speed: 252 });
      setNatureName('Jolly');
    } else if (preset === 'special') {
      setEvs({ hp: 4, attack: 0, defense: 0, spAtk: 252, spDef: 0, speed: 252 });
      setNatureName('Timid');
    } else if (preset === 'bulky') {
      setEvs({ hp: 252, attack: 0, defense: 128, spAtk: 0, spDef: 128, speed: 0 });
      setNatureName('Bold');
    } else if (preset === 'all31') {
      setIvs({ hp: 31, attack: 31, defense: 31, spAtk: 31, spDef: 31, speed: 31 });
    }
  };

  const statLabels: { key: keyof Omit<PokemonStats, 'total'>; label: string; color: string }[] = [
    { key: 'hp', label: 'HP', color: 'text-emerald-400' },
    { key: 'attack', label: 'Attack', color: 'text-red-400' },
    { key: 'defense', label: 'Defense', color: 'text-blue-400' },
    { key: 'spAtk', label: 'Sp. Attack', color: 'text-amber-400' },
    { key: 'spDef', label: 'Sp. Defense', color: 'text-purple-400' },
    { key: 'speed', label: 'Speed', color: 'text-cyan-400' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-cyan-400" />
            Competitive IV & Stat Calculator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Compute precise tournament-ready in-game stats based on Level, Natures, IVs (0-31), and EVs (0-252).
          </p>
        </div>

        {/* Quick Level Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Battle Level:</span>
          <button
            onClick={() => setLevel(50)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              level === 50 ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            Level 50 (VGC)
          </button>
          <button
            onClick={() => setLevel(100)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              level === 100 ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            Level 100
          </button>
        </div>
      </div>

      {/* Target Pokémon & Nature Controls */}
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pokémon Selection */}
        <div className="relative">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Target Pokémon
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={`Search (${selectedPokemon.name})`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          {searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 right-0 mt-1.5 max-h-48 overflow-y-auto bg-slate-950 border border-white/10 rounded-xl shadow-2xl z-30 divide-y divide-white/5">
              {filteredList.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPokemon(p);
                    setSearchQuery('');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-white/10 flex items-center justify-between text-xs text-slate-300 hover:text-white"
                >
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">#{p.id}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-white/5">
            <div className="flex items-center gap-3">
              <img
                src={selectedPokemon.officialArtworkUrl}
                alt={selectedPokemon.name}
                crossOrigin="anonymous"
                className="w-16 h-16 object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = selectedPokemon.spriteUrl; }}
              />
              <div>
                <div className="font-black text-white text-base">{selectedPokemon.name}</div>
                <div className="text-[11px] text-slate-400 font-mono">Base Total: {selectedPokemon.stats.total} BST</div>
                <div className="flex gap-1 mt-1">
                  {selectedPokemon.types.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded text-[9px] font-bold uppercase text-white" style={{ backgroundColor: TYPE_COLORS[t].bg }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <PokemonCryButton pokemonId={selectedPokemon.id} pokemonName={selectedPokemon.name} variant="pill" />
          </div>
        </div>

        {/* Nature Selection */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Nature (+10% / -10%)
          </label>
          <select
            value={natureName}
            onChange={(e) => setNatureName(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/60"
          >
            {NATURES.map(n => (
              <option key={n.name} value={n.name}>
                {n.name} ({n.description})
              </option>
            ))}
          </select>

          <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-400">
            <div className="font-bold text-white mb-1">Selected: {activeNature.name}</div>
            <div>{activeNature.description}</div>
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Quick EV / Build Presets
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => applyPreset('physical')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white text-center transition-colors"
            >
              Physical Sweeper (Atk/Spe)
            </button>
            <button
              onClick={() => applyPreset('special')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white text-center transition-colors"
            >
              Special Sweeper (SpA/Spe)
            </button>
            <button
              onClick={() => applyPreset('bulky')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white text-center transition-colors"
            >
              Bulky Tank (HP/Def)
            </button>
            <button
              onClick={() => applyPreset('all31')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white text-center transition-colors"
            >
              Max All 31 IVs
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-400">EV Pool Used:</span>
            <span className={`font-mono font-bold ${totalEvs > 508 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {totalEvs} / 508 EVs
            </span>
          </div>
        </div>
      </div>

      {/* Main Calculated Stats Table & Sliders */}
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Computed Battle Stats (Level {level})
          </span>
          <span className="text-xs font-normal text-slate-400">
            Total Stat Sum: <strong className="text-cyan-400 font-mono text-sm">{(Object.values(calculatedStats) as number[]).reduce((a, b) => a + b, 0)}</strong>
          </span>
        </h3>

        <div className="space-y-5">
          {statLabels.map(({ key, label, color }) => {
            const baseVal = selectedPokemon.stats[key];
            const currentIv = ivs[key];
            const currentEv = evs[key];
            const calcVal = calculatedStats[key];

            const isBoosted = activeNature.increased === key;
            const isReduced = activeNature.decreased === key;

            return (
              <div key={key} className="p-3.5 rounded-xl bg-slate-950 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Stat Label & Final Calculated Value */}
                <div className="w-44 shrink-0 flex items-center justify-between md:justify-start gap-3">
                  <div className="w-24">
                    <span className={`text-xs font-bold uppercase tracking-wider ${color}`}>
                      {label}
                    </span>
                    <div className="text-[10px] text-slate-500 font-mono">Base: {baseVal}</div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black text-white font-mono">{calcVal}</span>
                    {isBoosted && <span className="text-[10px] font-bold text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded">▲</span>}
                    {isReduced && <span className="text-[10px] font-bold text-blue-400 bg-blue-500/20 px-1.5 py-0.5 rounded">▼</span>}
                  </div>
                </div>

                {/* IV Slider (0-31) */}
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-400 w-12">IV: {currentIv}</span>
                  <input
                    type="range"
                    min="0"
                    max="31"
                    value={currentIv}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setIvs(prev => ({ ...prev, [key]: val }));
                    }}
                    className="flex-1 accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-500 w-6 text-right">31</span>
                </div>

                {/* EV Slider (0-252) */}
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-400 w-14">EV: {currentEv}</span>
                  <input
                    type="range"
                    min="0"
                    max="252"
                    step="4"
                    value={currentEv}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setEvs(prev => ({ ...prev, [key]: val }));
                    }}
                    className="flex-1 accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-slate-500 w-8 text-right">252</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
