import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Shield, 
  Zap, 
  Swords, 
  Layers, 
  Check, 
  Plus, 
  Heart, 
  Gauge, 
  ShieldAlert 
} from 'lucide-react';
import { 
  Pokemon, 
  PokemonType, 
  TYPE_COLORS, 
  ALL_TYPES, 
  getDefensiveMultiplier, 
  getShinyArtworkUrl 
} from '../../data/pokemonData';
import PokemonCryButton from './PokemonCryButton';

interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
  onAddToTeam?: (pokemon: Pokemon) => void;
  teamSize?: number;
}

export default function PokemonDetailModal({
  pokemon,
  onClose,
  onAddToTeam,
  teamSize = 6
}: PokemonDetailModalProps) {
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  if (!pokemon) return null;

  const primaryType = pokemon.types[0];
  const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;
  const artworkSrc = isShiny ? getShinyArtworkUrl(pokemon.id) : pokemon.officialArtworkUrl;

  // Compute defensive matchups
  const defensiveMatchups = ALL_TYPES.map(attackType => {
    const multiplier = getDefensiveMultiplier(pokemon.types, attackType);
    return { type: attackType, multiplier };
  });

  const weaknesses = defensiveMatchups.filter(m => m.multiplier > 1).sort((a, b) => b.multiplier - a.multiplier);
  const resistances = defensiveMatchups.filter(m => m.multiplier < 1 && m.multiplier > 0).sort((a, b) => a.multiplier - b.multiplier);
  const immunities = defensiveMatchups.filter(m => m.multiplier === 0);

  const handleAdd = () => {
    if (onAddToTeam) {
      onAddToTeam(pokemon);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-b from-[#111728] via-[#0d1220] to-[#090d17] border border-white/10 rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 20px 50px -10px ${typeColor.glow}`
        }}
      >
        {/* Header with ID, Name and Close */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-sm font-black text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl">
              #{pokemon.id.toString().padStart(4, '0')}
            </span>
            <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 uppercase">
              Gen {pokemon.gen}
            </span>
            {pokemon.isLegendary && (
              <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                Legendary
              </span>
            )}
            {pokemon.isMythical && !pokemon.isLegendary && (
              <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                Mythical
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Area with Artwork and Sound Cry */}
        <div className="relative py-6 flex flex-col items-center justify-center text-center">
          {/* Aura background glow */}
          <div 
            className="absolute w-44 h-44 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ backgroundColor: typeColor.bg }}
          />

          <div className="relative z-10 flex items-center justify-center">
            <img
              src={artworkSrc}
              alt={pokemon.name}
              crossOrigin="anonymous"
              className="w-40 h-40 sm:w-48 sm:h-48 object-contain filter drop-shadow-2xl transition-transform hover:scale-105 duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = pokemon.spriteUrl;
              }}
            />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {pokemon.name}
            </h2>
            <button
              onClick={() => setIsShiny(!isShiny)}
              className={`p-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                isShiny 
                  ? 'bg-amber-400/20 border-amber-400/40 text-amber-300 shadow-md shadow-amber-400/20' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Toggle Shiny Artwork"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px]">{isShiny ? 'Shiny ON' : 'Shiny'}</span>
            </button>
          </div>

          {/* Elemental Types */}
          <div className="flex items-center gap-2 mt-2">
            {pokemon.types.map(t => {
              const tc = TYPE_COLORS[t] || TYPE_COLORS.normal;
              return (
                <span
                  key={t}
                  className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${tc.badge} text-white shadow-sm`}
                >
                  {t}
                </span>
              );
            })}
          </div>

          {/* Audio Cry Button */}
          <div className="mt-3">
            <PokemonCryButton
              pokemonId={pokemon.id}
              pokemonName={pokemon.name}
              variant="pill"
            />
          </div>
        </div>

        {/* Base Stats Breakdown */}
        <div className="bg-black/30 border border-white/5 rounded-2xl p-4 sm:p-5 mb-5">
          <div className="flex items-center justify-between mb-3 text-xs font-bold">
            <span className="text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Base Stat Ratings
            </span>
            <span className="text-amber-400 font-mono text-sm font-black">
              {pokemon.stats.total} BST Total
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { label: 'HP', val: pokemon.stats.hp, max: 160, color: 'bg-emerald-500', text: 'text-emerald-400' },
              { label: 'Attack', val: pokemon.stats.attack, max: 180, color: 'bg-rose-500', text: 'text-rose-400' },
              { label: 'Defense', val: pokemon.stats.defense, max: 180, color: 'bg-blue-500', text: 'text-blue-400' },
              { label: 'Sp. Atk', val: pokemon.stats.spAtk, max: 180, color: 'bg-purple-500', text: 'text-purple-400' },
              { label: 'Sp. Def', val: pokemon.stats.spDef, max: 180, color: 'bg-teal-500', text: 'text-teal-400' },
              { label: 'Speed', val: pokemon.stats.speed, max: 160, color: 'bg-amber-400', text: 'text-amber-400' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="w-16 font-bold text-slate-400 text-[11px]">{stat.label}</span>
                <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`${stat.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(100, (stat.val / stat.max) * 100)}%` }}
                  />
                </div>
                <span className={`w-10 text-right font-mono font-bold ${stat.text}`}>
                  {stat.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Type Matchups: Weaknesses & Resistances */}
        <div className="space-y-3 mb-6">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            Defensive Type Matchups
          </div>

          {/* Weaknesses */}
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="text-[11px] font-bold text-rose-300 mb-2 flex items-center gap-1">
              <span>Takes Super Effective (2x - 4x) Damage From:</span>
            </div>
            {weaknesses.length === 0 ? (
              <span className="text-xs text-slate-400">No weaknesses!</span>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {weaknesses.map(w => {
                  const tc = TYPE_COLORS[w.type] || TYPE_COLORS.normal;
                  return (
                    <span 
                      key={w.type}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${tc.badge} text-white flex items-center gap-1`}
                    >
                      <span>{w.type}</span>
                      <span className="bg-black/40 px-1 rounded text-[9px] font-mono">{w.multiplier}x</span>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Resistances & Immunities */}
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="text-[11px] font-bold text-emerald-300 mb-2">
              Resists (0.5x / 0.25x) &amp; Immunities (0x):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {immunities.map(imm => (
                <span 
                  key={imm.type}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase bg-slate-700 text-slate-200 border border-slate-600 flex items-center gap-1"
                >
                  <span>{imm.type}</span>
                  <span className="bg-emerald-500/30 text-emerald-300 px-1 rounded text-[9px] font-mono">0x IMMUNE</span>
                </span>
              ))}
              {resistances.map(r => {
                const tc = TYPE_COLORS[r.type] || TYPE_COLORS.normal;
                return (
                  <span 
                    key={r.type}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${tc.badge} text-white flex items-center gap-1`}
                  >
                    <span>{r.type}</span>
                    <span className="bg-black/40 px-1 rounded text-[9px] font-mono">{r.multiplier}x</span>
                  </span>
                );
              })}
              {resistances.length === 0 && immunities.length === 0 && (
                <span className="text-xs text-slate-400">No special resistances.</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/10">
          {onAddToTeam && (
            <button
              onClick={handleAdd}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition-all"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Added to Battle Team!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add #{pokemon.id.toString().padStart(4, '0')} to Team</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
