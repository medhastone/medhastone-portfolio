import React, { useState, useEffect, useMemo } from 'react';
import { 
  HelpCircle, 
  RotateCw, 
  Trophy, 
  Flame, 
  Sparkles, 
  Volume2, 
  Eye, 
  Lightbulb,
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Pokemon, TYPE_COLORS, fisherYatesShuffle } from '../../data/pokemonData';
import PokemonCryButton from './PokemonCryButton';

interface WhosThatPokemonGameProps {
  pokemonList: Pokemon[];
}

export default function WhosThatPokemonGame({ pokemonList }: WhosThatPokemonGameProps) {
  const [targetPokemon, setTargetPokemon] = useState<Pokemon | null>(null);
  const [options, setOptions] = useState<Pokemon[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('whos_that_pokemon_best') || '0', 10);
    } catch {
      return 0;
    }
  });

  // Hint states
  const [showGenHint, setShowGenHint] = useState(false);
  const [showTypeHint, setShowTypeHint] = useState(false);
  const [showBstHint, setShowBstHint] = useState(false);

  // Sound synthesis for victory or mistake
  const playSound = (isWin: boolean) => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (isWin) {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch {
      // Audio not supported
    }
  };

  // Start a new round
  const startNewRound = () => {
    if (pokemonList.length < 4) return;

    // Pick random target
    const targetIdx = Math.floor(Math.random() * pokemonList.length);
    const target = pokemonList[targetIdx];

    // Pick 3 random distractors
    const others = pokemonList.filter(p => p.id !== target.id);
    const shuffledOthers = fisherYatesShuffle(others).slice(0, 3);
    const roundOptions = fisherYatesShuffle([target, ...shuffledOthers]);

    setTargetPokemon(target);
    setOptions(roundOptions);
    setSelectedAnswer(null);
    setIsRevealed(false);
    setShowGenHint(false);
    setShowTypeHint(false);
    setShowBstHint(false);
  };

  useEffect(() => {
    if (pokemonList.length > 0 && !targetPokemon) {
      startNewRound();
    }
  }, [pokemonList]);

  const handleSelectOption = (chosenPokemon: Pokemon) => {
    if (isRevealed || !targetPokemon) return;

    setSelectedAnswer(chosenPokemon.id);
    setIsRevealed(true);

    if (chosenPokemon.id === targetPokemon.id) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highScore) {
        setHighScore(newStreak);
        localStorage.setItem('whos_that_pokemon_best', newStreak.toString());
      }
      playSound(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setStreak(0);
      playSound(false);
    }
  };

  if (!targetPokemon) return null;

  const isCorrect = selectedAnswer === targetPokemon.id;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header with Streak Counters */}
      <div className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            Who's That Pokémon?
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Can you recognize the Pokémon from its dark silhouette? Test your Pokédex mastery!
          </p>
        </div>

        {/* Score Badges */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-amber-300/80 uppercase font-bold">Streak</div>
              <div className="text-base font-black text-amber-400 font-mono leading-none">{streak}</div>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-[10px] text-purple-300/80 uppercase font-bold">Best Record</div>
              <div className="text-base font-black text-purple-400 font-mono leading-none">{highScore}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Silhouette Arena */}
      <div className="max-w-2xl mx-auto bg-slate-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-6">
          <img
            src={targetPokemon.officialArtworkUrl}
            alt="Who's that Pokemon?"
            crossOrigin="anonymous"
            className={`w-full h-full object-contain transition-all duration-700 ${
              isRevealed
                ? 'filter-none scale-100 drop-shadow-2xl'
                : 'brightness-0 contrast-200 opacity-90 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] scale-95'
            }`}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = targetPokemon.spriteUrl; }}
          />

          {!isRevealed && (
            <div className="absolute bottom-2 px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 text-[11px] font-mono font-bold text-slate-400">
              #{targetPokemon.id.toString().padStart(4, '0')}
            </div>
          )}
        </div>

        {/* Revealed Pokémon Info Banner */}
        {isRevealed && (
          <div className="text-center space-y-2 mb-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-center gap-2">
              {isCorrect ? (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Correct! It's {targetPokemon.name}!
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 font-bold text-xs flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> It was {targetPokemon.name}!
                </span>
              )}
            </div>

            <h3 className="text-2xl font-black text-white">{targetPokemon.name}</h3>

            <div className="flex items-center justify-center gap-2">
              {targetPokemon.types.map(t => (
                <span 
                  key={t}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase text-white"
                  style={{ backgroundColor: TYPE_COLORS[t].bg }}
                >
                  {t}
                </span>
              ))}
              <span className="text-xs text-slate-400 font-mono">Gen {targetPokemon.gen} • {targetPokemon.stats.total} BST</span>
            </div>

            <div className="pt-3 flex justify-center">
              <PokemonCryButton pokemonId={targetPokemon.id} pokemonName={targetPokemon.name} variant="pill" />
            </div>
          </div>
        )}

        {/* Hints Bar (available before reveal) */}
        {!isRevealed && (
          <div className="w-full mb-6 p-3 rounded-xl bg-slate-950 border border-white/5 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mr-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Need a hint?
            </span>

            <button
              onClick={() => setShowGenHint(true)}
              disabled={showGenHint}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                showGenHint 
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' 
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 border-white/10'
              }`}
            >
              {showGenHint ? `Gen ${targetPokemon.gen}` : 'Show Gen'}
            </button>

            <button
              onClick={() => setShowTypeHint(true)}
              disabled={showTypeHint}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                showTypeHint 
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' 
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 border-white/10'
              }`}
            >
              {showTypeHint ? `Type: ${targetPokemon.types[0].toUpperCase()}` : 'Show Type'}
            </button>

            <button
              onClick={() => setShowBstHint(true)}
              disabled={showBstHint}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                showBstHint 
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' 
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 border-white/10'
              }`}
            >
              {showBstHint ? `${targetPokemon.stats.total} BST` : 'Show BST'}
            </button>

            {/* Audio Cry Hint */}
            <div className="inline-flex">
              <PokemonCryButton pokemonId={targetPokemon.id} pokemonName="Mystery Pokémon" variant="compact" />
            </div>
          </div>
        )}

        {/* 4 Multiple Choice Options */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map(option => {
            const isTarget = option.id === targetPokemon.id;
            const isChosen = selectedAnswer === option.id;

            let buttonClass = 'bg-slate-950 hover:bg-slate-800 border-white/10 text-slate-200 hover:text-white';
            if (isRevealed) {
              if (isTarget) {
                buttonClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-black shadow-lg shadow-emerald-500/10';
              } else if (isChosen && !isTarget) {
                buttonClass = 'bg-rose-500/20 border-rose-500 text-rose-300 line-through opacity-70';
              } else {
                buttonClass = 'bg-slate-950/40 border-white/5 text-slate-600 opacity-40';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                disabled={isRevealed}
                className={`w-full p-4 rounded-xl border font-bold text-sm flex items-center justify-between transition-all cursor-pointer ${buttonClass}`}
              >
                <span>{option.name}</span>
                {isRevealed && isTarget && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isRevealed && isChosen && !isTarget && <XCircle className="w-4 h-4 text-rose-400" />}
              </button>
            );
          })}
        </div>

        {/* Next Round Button */}
        {isRevealed && (
          <button
            onClick={startNewRound}
            className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-red-600/20 transition-all hover:scale-105"
          >
            <span>Next Mystery Pokémon</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
