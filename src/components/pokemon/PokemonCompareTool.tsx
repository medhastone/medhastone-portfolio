import React, { useState, useMemo } from 'react';
import { 
  Swords, 
  Sparkles, 
  ArrowRightLeft, 
  Trophy, 
  Zap, 
  Shield, 
  Search, 
  Dices,
  Info,
  Check
} from 'lucide-react';
import { 
  Pokemon, 
  PokemonType, 
  TYPE_COLORS, 
  getDefensiveMultiplier, 
  getShinyArtworkUrl 
} from '../../data/pokemonData';
import PokemonCryButton from './PokemonCryButton';

interface PokemonCompareToolProps {
  pokemonList: Pokemon[];
}

export default function PokemonCompareTool({ pokemonList }: PokemonCompareToolProps) {
  // Select two pokemon (defaults to Charizard & Blastoise, or Lucario & Garchomp)
  const defaultPoke1 = pokemonList.find(p => p.id === 6) || pokemonList[0];
  const defaultPoke2 = pokemonList.find(p => p.id === 9) || pokemonList[1] || pokemonList[0];

  const [pokeA, setPokeA] = useState<Pokemon>(defaultPoke1);
  const [pokeB, setPokeB] = useState<Pokemon>(defaultPoke2);

  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [isDropdownAOpen, setIsDropdownAOpen] = useState(false);
  const [isDropdownBOpen, setIsDropdownBOpen] = useState(false);

  const [shinyA, setShinyA] = useState(false);
  const [shinyB, setShinyB] = useState(false);

  // Search filtered lists
  const filteredListA = useMemo(() => {
    if (!searchA.trim()) return pokemonList.slice(0, 50);
    const q = searchA.toLowerCase();
    return pokemonList.filter(p => p.name.toLowerCase().includes(q) || p.id.toString() === q).slice(0, 50);
  }, [pokemonList, searchA]);

  const filteredListB = useMemo(() => {
    if (!searchB.trim()) return pokemonList.slice(0, 50);
    const q = searchB.toLowerCase();
    return pokemonList.filter(p => p.name.toLowerCase().includes(q) || p.id.toString() === q).slice(0, 50);
  }, [pokemonList, searchB]);

  // Randomize matchup
  const handleRandomize = () => {
    if (pokemonList.length < 2) return;
    const idx1 = Math.floor(Math.random() * pokemonList.length);
    let idx2 = Math.floor(Math.random() * pokemonList.length);
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * pokemonList.length);
    }
    setPokeA(pokemonList[idx1]);
    setPokeB(pokemonList[idx2]);
  };

  // Swap Pokémon A and B
  const handleSwap = () => {
    const temp = pokeA;
    setPokeA(pokeB);
    setPokeB(temp);
    const tempShiny = shinyA;
    setShinyA(shinyB);
    setShinyB(tempShiny);
  };

  // Head to Head Type Effectiveness
  // Max effectiveness of A's types against B
  const aHitsB = useMemo(() => {
    return Math.max(...pokeA.types.map(t => getDefensiveMultiplier(pokeB.types, t)));
  }, [pokeA, pokeB]);

  // Max effectiveness of B's types against A
  const bHitsA = useMemo(() => {
    return Math.max(...pokeB.types.map(t => getDefensiveMultiplier(pokeA.types, t)));
  }, [pokeA, pokeB]);

  // Stat comparisons
  const statsList: { key: keyof Pokemon['stats']; label: string; maxVal: number }[] = [
    { key: 'hp', label: 'HP', maxVal: 255 },
    { key: 'attack', label: 'Attack', maxVal: 190 },
    { key: 'defense', label: 'Defense', maxVal: 250 },
    { key: 'spAtk', label: 'Sp. Attack', maxVal: 194 },
    { key: 'spDef', label: 'Sp. Defense', maxVal: 250 },
    { key: 'speed', label: 'Speed', maxVal: 200 },
  ];

  // Battle simulator calculation
  const bstDiff = pokeA.stats.total - pokeB.stats.total;
  const speedWinner = pokeA.stats.speed > pokeB.stats.speed ? 'A' : pokeA.stats.speed < pokeB.stats.speed ? 'B' : 'Tie';
  const typeAdvantage = aHitsB > bHitsA ? 'A' : bHitsA > aHitsB ? 'B' : 'Neutral';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-white/10 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Swords className="w-5 h-5 text-red-400" />
            Pokémon Battle & Stat Comparator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Compare base stats, type advantages, and battle projections between any two Pokémon.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSwap}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
            title="Swap Pokémon"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Swap</span>
          </button>
          <button
            onClick={handleRandomize}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all hover:scale-105"
          >
            <Dices className="w-4 h-4" />
            <span>Random Matchup</span>
          </button>
        </div>
      </div>

      {/* Selectors & Cards Matchup Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* VS Badge in Center */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-950 border-2 border-red-500 items-center justify-center font-black text-red-400 text-sm shadow-xl">
          VS
        </div>

        {/* Combatant A */}
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            {/* Search / Select Dropdown A */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Pokémon 1 (Left)
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Selected: ${pokeA.name} (#${pokeA.id})`}
                  value={searchA}
                  onChange={(e) => {
                    setSearchA(e.target.value);
                    setIsDropdownAOpen(true);
                  }}
                  onFocus={() => setIsDropdownAOpen(true)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500/60"
                />
              </div>

              {isDropdownAOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 max-h-56 overflow-y-auto bg-slate-950 border border-white/10 rounded-xl shadow-2xl z-30 divide-y divide-white/5">
                  {filteredListA.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPokeA(p);
                        setIsDropdownAOpen(false);
                        setSearchA('');
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-white/10 flex items-center justify-between text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">#{p.id} • Gen {p.gen}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Visual Display A */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs font-mono text-slate-400">#{pokeA.id.toString().padStart(4, '0')}</span>
                <h3 className="text-2xl font-black text-white">{pokeA.name}</h3>
                <div className="flex gap-1.5 mt-2">
                  {pokeA.types.map(t => (
                    <span 
                      key={t}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: TYPE_COLORS[t].bg }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <PokemonCryButton pokemonId={pokeA.id} pokemonName={pokeA.name} variant="pill" />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={shinyA ? getShinyArtworkUrl(pokeA.id) : pokeA.officialArtworkUrl}
                  alt={pokeA.name}
                  crossOrigin="anonymous"
                  className="w-32 h-32 object-contain filter drop-shadow-lg transition-transform hover:scale-105"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = pokeA.spriteUrl; }}
                />
                <button
                  onClick={() => setShinyA(!shinyA)}
                  className={`mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all ${
                    shinyA ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-white/5 text-slate-400 border-white/10'
                  }`}
                >
                  ★ {shinyA ? 'Shiny' : 'Regular'}
                </button>
              </div>
            </div>
          </div>

            {/* BST Counter A */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Base Stat Total</span>
            <span className={`text-xl font-black font-mono ${bstDiff > 0 ? 'text-emerald-400' : bstDiff < 0 ? 'text-slate-400' : 'text-white'}`}>
              {pokeA.stats.total} BST
              {bstDiff > 0 && <span className="text-xs ml-1.5 text-emerald-400 font-bold">(+{bstDiff})</span>}
            </span>
          </div>
        </div>

        {/* Combatant B */}
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            {/* Search / Select Dropdown B */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Pokémon 2 (Right)
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Selected: ${pokeB.name} (#${pokeB.id})`}
                  value={searchB}
                  onChange={(e) => {
                    setSearchB(e.target.value);
                    setIsDropdownBOpen(true);
                  }}
                  onFocus={() => setIsDropdownBOpen(true)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500/60"
                />
              </div>

              {isDropdownBOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 max-h-56 overflow-y-auto bg-slate-950 border border-white/10 rounded-xl shadow-2xl z-30 divide-y divide-white/5">
                  {filteredListB.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPokeB(p);
                        setIsDropdownBOpen(false);
                        setSearchB('');
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-white/10 flex items-center justify-between text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">#{p.id} • Gen {p.gen}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Visual Display B */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs font-mono text-slate-400">#{pokeB.id.toString().padStart(4, '0')}</span>
                <h3 className="text-2xl font-black text-white">{pokeB.name}</h3>
                <div className="flex gap-1.5 mt-2">
                  {pokeB.types.map(t => (
                    <span 
                      key={t}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: TYPE_COLORS[t].bg }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <PokemonCryButton pokemonId={pokeB.id} pokemonName={pokeB.name} variant="pill" />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={shinyB ? getShinyArtworkUrl(pokeB.id) : pokeB.officialArtworkUrl}
                  alt={pokeB.name}
                  crossOrigin="anonymous"
                  className="w-32 h-32 object-contain filter drop-shadow-lg transition-transform hover:scale-105"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = pokeB.spriteUrl; }}
                />
                <button
                  onClick={() => setShinyB(!shinyB)}
                  className={`mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all ${
                    shinyB ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-white/5 text-slate-400 border-white/10'
                  }`}
                >
                  ★ {shinyB ? 'Shiny' : 'Regular'}
                </button>
              </div>
            </div>
          </div>

          {/* BST Counter B */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Base Stat Total</span>
            <span className={`text-xl font-black font-mono ${bstDiff < 0 ? 'text-emerald-400' : bstDiff > 0 ? 'text-slate-400' : 'text-white'}`}>
              {pokeB.stats.total} BST
              {bstDiff < 0 && <span className="text-xs ml-1.5 text-emerald-400 font-bold">(+{-bstDiff})</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Head-to-Head Battle Forecast Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-blue-950/40 border border-white/10">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Head-to-Head Battle Simulation & Advantages
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Attack Effectiveness */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
            <div className="text-slate-400 font-medium mb-1">Type Matchup</div>
            <div className="flex items-center justify-between font-mono">
              <span className="text-white font-bold">{pokeA.name}: <span className={aHitsB > 1 ? 'text-emerald-400' : aHitsB < 1 ? 'text-rose-400' : 'text-slate-300'}>{aHitsB}x</span></span>
              <span className="text-white font-bold">{pokeB.name}: <span className={bHitsA > 1 ? 'text-emerald-400' : bHitsA < 1 ? 'text-rose-400' : 'text-slate-300'}>{bHitsA}x</span></span>
            </div>
            <div className="mt-1.5 text-[11px] text-slate-400">
              {typeAdvantage === 'A' ? `${pokeA.name} deals higher super-effective damage!` : typeAdvantage === 'B' ? `${pokeB.name} deals higher super-effective damage!` : 'Even type matchup.'}
            </div>
          </div>

          {/* Speed Advantage */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5">
            <div className="text-slate-400 font-medium mb-1">Turn Initiative (Speed)</div>
            <div className="flex items-center justify-between font-mono">
              <span className={`font-bold ${speedWinner === 'A' ? 'text-cyan-400' : 'text-slate-400'}`}>{pokeA.stats.speed} Spe</span>
              <span className={`font-bold ${speedWinner === 'B' ? 'text-cyan-400' : 'text-slate-400'}`}>{pokeB.stats.speed} Spe</span>
            </div>
            <div className="mt-1.5 text-[11px] text-slate-400">
              {speedWinner === 'A' ? `${pokeA.name} moves first (+${pokeA.stats.speed - pokeB.stats.speed} Speed)` : speedWinner === 'B' ? `${pokeB.name} moves first (+${pokeB.stats.speed - pokeA.stats.speed} Speed)` : 'Identical Speed tie!'}
            </div>
          </div>

          {/* Overall Prediction */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col justify-center">
            <div className="text-slate-400 font-medium mb-1">Battle Projection</div>
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              <span>
                {typeAdvantage === 'A' || (typeAdvantage === 'Neutral' && bstDiff > 0)
                  ? `${pokeA.name} favored`
                  : typeAdvantage === 'B' || (typeAdvantage === 'Neutral' && bstDiff < 0)
                  ? `${pokeB.name} favored`
                  : 'Very close battle!'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Based on speed tier, BST, and STAB typing.</div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Stat Breakdown Bars */}
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          Base Stat Comparison Meters
        </h3>

        <div className="space-y-4">
          {statsList.map(({ key, label, maxVal }) => {
            const valA = pokeA.stats[key];
            const valB = pokeB.stats[key];
            const pctA = Math.min(100, Math.round((valA / maxVal) * 100));
            const pctB = Math.min(100, Math.round((valB / maxVal) * 100));
            const diff = valA - valB;

            return (
              <div key={key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-bold w-10 text-left ${diff > 0 ? 'text-emerald-400 font-black' : 'text-slate-300'}`}>
                      {valA}
                    </span>
                    {diff > 0 && <span className="text-[10px] text-emerald-400 font-mono">(+{diff})</span>}
                  </div>

                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                    {label}
                  </span>

                  <div className="flex items-center gap-2">
                    {diff < 0 && <span className="text-[10px] text-emerald-400 font-mono">(+{-diff})</span>}
                    <span className={`font-mono font-bold w-10 text-right ${diff < 0 ? 'text-emerald-400 font-black' : 'text-slate-300'}`}>
                      {valB}
                    </span>
                  </div>
                </div>

                {/* Split Dual Meter */}
                <div className="grid grid-cols-2 gap-2 h-3">
                  {/* Meter A (Fills right to left or left to right) */}
                  <div className="bg-slate-950 rounded-full overflow-hidden flex justify-end">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${diff > 0 ? 'bg-gradient-to-r from-red-500 to-emerald-400' : 'bg-red-500/60'}`}
                      style={{ width: `${pctA}%` }}
                    />
                  </div>

                  {/* Meter B */}
                  <div className="bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${diff < 0 ? 'bg-gradient-to-r from-blue-500 to-emerald-400' : 'bg-blue-500/60'}`}
                      style={{ width: `${pctB}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
