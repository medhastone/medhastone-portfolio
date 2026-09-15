import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Heart, 
  Sparkles, 
  RotateCcw, 
  Download, 
  Copy, 
  Check, 
  Filter, 
  ArrowRight,
  Flame,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pokemon, PokemonType, TYPE_COLORS, GENERATIONS, ALL_TYPES, fisherYatesShuffle } from '../../data/pokemonData';
import PokemonCryButton from './PokemonCryButton';

interface FavoritePickerToolProps {
  pokemonList: Pokemon[];
}

export default function FavoritePickerTool({ pokemonList }: FavoritePickerToolProps) {
  const [selectedGen, setSelectedGen] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<PokemonType | 'all'>('all');
  const [tournamentStarted, setTournamentStarted] = useState(false);
  const [tournamentFinished, setTournamentFinished] = useState(false);

  // Tournament state
  const [pool, setPool] = useState<Pokemon[]>([]);
  const [currentPair, setCurrentPair] = useState<[Pokemon, Pokemon] | null>(null);
  const [winnersList, setWinnersList] = useState<Pokemon[]>([]);
  const [roundNumber, setRoundNumber] = useState(1);
  const [totalRounds, setTotalRounds] = useState(15);
  const [copied, setCopied] = useState(false);

  // Candidate pool based on criteria
  const availableCandidates = useMemo(() => {
    return pokemonList.filter(p => {
      if (selectedGen !== 'all' && p.gen !== selectedGen) return false;
      if (selectedType !== 'all' && !p.types.includes(selectedType)) return false;
      return true;
    });
  }, [pokemonList, selectedGen, selectedType]);

  const handleStartTournament = () => {
    if (availableCandidates.length < 4) {
      alert('Please select a broader filter — at least 4 Pokémon are needed for the tournament!');
      return;
    }

    const shuffled = fisherYatesShuffle(availableCandidates).slice(0, 32);
    setPool(shuffled);
    setCurrentPair([shuffled[0], shuffled[1]]);
    setWinnersList([]);
    setRoundNumber(1);
    setTotalRounds(Math.min(15, Math.floor(shuffled.length / 2) + 7));
    setTournamentStarted(true);
    setTournamentFinished(false);
  };

  const handlePick = (chosen: Pokemon, loser: Pokemon) => {
    const nextWinners = [...winnersList, chosen];
    setWinnersList(nextWinners);

    if (roundNumber >= totalRounds || pool.length <= 2) {
      // Finish tournament
      setTournamentFinished(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      return;
    }

    // Pick next pair
    const remainingPool = pool.filter(p => p.id !== chosen.id && p.id !== loser.id);
    if (remainingPool.length >= 2) {
      setCurrentPair([remainingPool[0], remainingPool[1]]);
      setPool(remainingPool);
    } else {
      // Advance to next bracket from accumulated winners
      const nextBracket = fisherYatesShuffle(nextWinners);
      setCurrentPair([nextBracket[0], nextBracket[1]]);
      setPool(nextBracket);
    }

    setRoundNumber(prev => prev + 1);
  };

  const handleReset = () => {
    setTournamentStarted(false);
    setTournamentFinished(false);
    setWinnersList([]);
    setCurrentPair(null);
  };

  // Build ranked top favorites from winners
  const rankedTop = useMemo(() => {
    const counts = new Map<number, { pokemon: Pokemon; score: number }>();
    winnersList.forEach((p, idx) => {
      const existing = counts.get(p.id) || { pokemon: p, score: 0 };
      existing.score += (idx + 1);
      counts.set(p.id, existing);
    });

    return Array.from(counts.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(item => item.pokemon);
  }, [winnersList]);

  const handleExportCSV = () => {
    const csvContent = 'Rank,ID,Name,Types,Gen,BST\n' + 
      rankedTop.map((p, i) => `${i + 1},#${p.id},"${p.name}","${p.types.join('/')}",${p.gen},${p.stats.total}`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `my-favorite-pokemon-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyList = () => {
    const text = rankedTop.map((p, i) => `${i + 1}. ${p.name} (#${p.id}) - Gen ${p.gen} [${p.types.join('/')}]`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            Favorite Pokémon Picker & Tournament
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pick your favorites in head-to-head 1v1 matchups to build your ultimate personalized ranking.
          </p>
        </div>

        {tournamentStarted && (
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-colors self-start md:self-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Tournament</span>
          </button>
        )}
      </div>

      {/* Setup Screen before start */}
      {!tournamentStarted && !tournamentFinished && (
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-400" />
            Tournament Filters & Scope
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gen Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Region / Generation
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedGen('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedGen === 'all'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-slate-950 border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  All Gens
                </button>
                {GENERATIONS.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGen(g.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedGen === g.id
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-slate-950 border border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    Gen {g.id} ({g.region})
                  </button>
                ))}
              </div>
            </div>

            {/* Type Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Element Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedType === 'all'
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-slate-950 border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  All Types
                </button>
                {ALL_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all ${
                      selectedType === t
                        ? 'text-white shadow-md ring-2 ring-white/40'
                        : 'bg-slate-950 border border-white/10 text-slate-400 hover:text-white'
                    }`}
                    style={{ backgroundColor: selectedType === t ? TYPE_COLORS[t].bg : undefined }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Eligible contenders in pool: <strong className="text-white font-mono text-sm">{availableCandidates.length}</strong> Pokémon
            </div>

            <button
              onClick={handleStartTournament}
              disabled={availableCandidates.length < 4}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-600/25 transition-all hover:scale-105 disabled:opacity-50"
            >
              <Flame className="w-5 h-5 text-amber-300" />
              <span>Start Bracket Tournament</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Interactive 1v1 Battle Arena */}
      {tournamentStarted && !tournamentFinished && currentPair && (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-300">Matchup {roundNumber} of {totalRounds}</span>
                <span className="text-slate-400 font-mono">{Math.round((roundNumber / totalRounds) * 100)}% Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${(roundNumber / totalRounds) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* 1v1 Cards */}
          <div className="text-center">
            <h3 className="text-lg font-black text-white">Which Pokémon do you like better?</h3>
            <p className="text-xs text-slate-400 mt-1">Click your preferred Pokémon to advance them to the next stage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Contender 1 */}
            <button
              onClick={() => handlePick(currentPair[0], currentPair[1])}
              className="group bg-slate-900/90 hover:bg-slate-800/90 border-2 border-white/10 hover:border-rose-500/80 rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:scale-[1.02] shadow-xl hover:shadow-rose-500/10 cursor-pointer"
            >
              <span className="text-xs font-mono text-slate-400 mb-1">#{currentPair[0].id.toString().padStart(4, '0')} • Gen {currentPair[0].gen}</span>
              <h4 className="text-2xl font-black text-white group-hover:text-rose-400 transition-colors">
                {currentPair[0].name}
              </h4>

              <div className="flex gap-1.5 my-3">
                {currentPair[0].types.map(t => (
                  <span 
                    key={t}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase text-white"
                    style={{ backgroundColor: TYPE_COLORS[t].bg }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="my-1">
                <PokemonCryButton pokemonId={currentPair[0].id} pokemonName={currentPair[0].name} variant="pill" />
              </div>

              <img
                src={currentPair[0].officialArtworkUrl}
                alt={currentPair[0].name}
                crossOrigin="anonymous"
                className="w-48 h-48 object-contain filter drop-shadow-2xl my-4 group-hover:scale-110 transition-transform duration-300"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = currentPair[0].spriteUrl; }}
              />

              <div className="w-full mt-4 py-2.5 rounded-xl bg-rose-600/20 text-rose-300 border border-rose-500/40 font-bold text-xs group-hover:bg-rose-600 group-hover:text-white transition-all">
                Vote for {currentPair[0].name}
              </div>
            </button>

            {/* Contender 2 */}
            <button
              onClick={() => handlePick(currentPair[1], currentPair[0])}
              className="group bg-slate-900/90 hover:bg-slate-800/90 border-2 border-white/10 hover:border-rose-500/80 rounded-2xl p-8 flex flex-col items-center text-center transition-all hover:scale-[1.02] shadow-xl hover:shadow-rose-500/10 cursor-pointer"
            >
              <span className="text-xs font-mono text-slate-400 mb-1">#{currentPair[1].id.toString().padStart(4, '0')} • Gen {currentPair[1].gen}</span>
              <h4 className="text-2xl font-black text-white group-hover:text-rose-400 transition-colors">
                {currentPair[1].name}
              </h4>

              <div className="flex gap-1.5 my-3">
                {currentPair[1].types.map(t => (
                  <span 
                    key={t}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase text-white"
                    style={{ backgroundColor: TYPE_COLORS[t].bg }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="my-1">
                <PokemonCryButton pokemonId={currentPair[1].id} pokemonName={currentPair[1].name} variant="pill" />
              </div>

              <img
                src={currentPair[1].officialArtworkUrl}
                alt={currentPair[1].name}
                crossOrigin="anonymous"
                className="w-48 h-48 object-contain filter drop-shadow-2xl my-4 group-hover:scale-110 transition-transform duration-300"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = currentPair[1].spriteUrl; }}
              />

              <div className="w-full mt-4 py-2.5 rounded-xl bg-rose-600/20 text-rose-300 border border-rose-500/40 font-bold text-xs group-hover:bg-rose-600 group-hover:text-white transition-all">
                Vote for {currentPair[1].name}
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Tournament Results Podium */}
      {tournamentFinished && (
        <div className="bg-slate-900/95 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8 animate-in zoom-in-95 duration-300">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-2">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Your Favorite Pokémon Ranked!</h3>
            <p className="text-xs text-slate-400">Based on your head-to-head choices across {roundNumber} tournament rounds.</p>
          </div>

          {/* #1 Winner Spotlight */}
          {rankedTop[0] && (
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-b from-amber-500/20 via-slate-950 to-slate-950 border-2 border-amber-500/50 flex flex-col items-center text-center relative overflow-hidden shadow-2xl shadow-amber-500/10">
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-slate-950" /> #1 CHAMPION
              </div>

              <img
                src={rankedTop[0].officialArtworkUrl}
                alt={rankedTop[0].name}
                crossOrigin="anonymous"
                className="w-40 h-40 object-contain filter drop-shadow-2xl my-2"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = rankedTop[0].spriteUrl; }}
              />

              <h4 className="text-2xl font-black text-white mt-2">{rankedTop[0].name}</h4>
              <span className="text-xs text-slate-400 font-mono">#{rankedTop[0].id.toString().padStart(4, '0')} • Gen {rankedTop[0].gen}</span>

              <div className="flex gap-1.5 mt-2">
                {rankedTop[0].types.map(t => (
                  <span 
                    key={t}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase text-white"
                    style={{ backgroundColor: TYPE_COLORS[t].bg }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-3">
                <PokemonCryButton pokemonId={rankedTop[0].id} pokemonName={rankedTop[0].name} variant="pill" />
              </div>
            </div>
          )}

          {/* Full Top 10 List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Your Complete Top {rankedTop.length} Favorites
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rankedTop.map((p, idx) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-black font-mono text-sm ${idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-amber-600' : 'text-slate-500'}`}>
                      #{idx + 1}
                    </span>
                    <img 
                      src={p.spriteUrl} 
                      alt={p.name} 
                      className="w-10 h-10 object-contain" 
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Gen {p.gen} • {p.stats.total} BST</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {p.types.map(t => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[9px] font-bold uppercase text-white"
                          style={{ backgroundColor: TYPE_COLORS[t].bg }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <PokemonCryButton pokemonId={p.id} pokemonName={p.name} variant="icon" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Export Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/10">
            <button
              onClick={handleCopyList}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied List!' : 'Copy Ranked List'}</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export as CSV</span>
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-red-600/25"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Another Tournament</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
