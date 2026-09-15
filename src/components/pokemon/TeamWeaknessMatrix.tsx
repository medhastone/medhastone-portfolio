import React from 'react';
import { Shield, Zap, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { PokemonType, ALL_TYPES, TYPE_COLORS, getDefensiveMultiplier, Pokemon } from '../../data/pokemonData';

interface TeamWeaknessMatrixProps {
  team: { pokemon: Pokemon; isShiny: boolean }[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function TeamWeaknessMatrix({ team, isOpen, onToggle }: TeamWeaknessMatrixProps) {
  if (team.length === 0) return null;

  // Calculate defense coverage against all 18 types
  const analysis = ALL_TYPES.map(attackType => {
    let weakCount = 0; // takes > 1x
    let quadWeakCount = 0; // takes >= 4x
    let resistCount = 0; // takes < 1x
    let immuneCount = 0; // takes 0x

    team.forEach(({ pokemon }) => {
      const mult = getDefensiveMultiplier(pokemon.types, attackType);
      if (mult >= 4) {
        quadWeakCount++;
        weakCount++;
      } else if (mult > 1) {
        weakCount++;
      } else if (mult === 0) {
        immuneCount++;
      } else if (mult < 1) {
        resistCount++;
      }
    });

    const netScore = resistCount + (immuneCount * 1.5) - weakCount - (quadWeakCount * 1.5);

    return {
      type: attackType,
      weakCount,
      quadWeakCount,
      resistCount,
      immuneCount,
      netScore
    };
  });

  // Calculate team offensive coverage (how many types team hits for 2x super effective)
  const offensiveCoverage = ALL_TYPES.filter(defType => {
    return team.some(({ pokemon }) => {
      return pokemon.types.some(offType => {
        return getDefensiveMultiplier([defType], offType) > 1;
      });
    });
  });

  // Team stat averages
  const avgStats = {
    hp: Math.round(team.reduce((acc, m) => acc + m.pokemon.stats.hp, 0) / team.length),
    atk: Math.round(team.reduce((acc, m) => acc + m.pokemon.stats.attack, 0) / team.length),
    def: Math.round(team.reduce((acc, m) => acc + m.pokemon.stats.defense, 0) / team.length),
    spa: Math.round(team.reduce((acc, m) => acc + m.pokemon.stats.spAtk, 0) / team.length),
    spd: Math.round(team.reduce((acc, m) => acc + m.pokemon.stats.spDef, 0) / team.length),
    spe: Math.round(team.reduce((acc, m) => acc + m.pokemon.stats.speed, 0) / team.length),
    total: Math.round(team.reduce((acc, m) => acc + m.pokemon.stats.total, 0) / team.length),
  };

  // Critical weaknesses (2 or more pokemon weak to this type)
  const criticalThreats = analysis.filter(a => a.weakCount >= 3);

  return (
    <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-5 mb-8 shadow-xl backdrop-blur-md">
      <div 
        onClick={onToggle}
        className="flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              Team Type Synergy & Weakness Analysis
              <span className="text-xs font-normal text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                {team.length} Pokémon
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Offensive coverage: <span className="text-emerald-400 font-semibold">{offensiveCoverage.length}/18 types</span> • Average BST: <span className="text-amber-400 font-semibold">{avgStats.total}</span>
            </p>
          </div>
        </div>

        <button 
          className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 text-slate-400 group-hover:text-white transition-colors"
          aria-label={isOpen ? 'Collapse analysis' : 'Expand analysis'}
        >
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-6 pt-5 border-t border-white/10 space-y-6">
          {/* Critical Threats Warning Banner */}
          {criticalThreats.length > 0 ? (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3.5 flex items-center gap-3 text-xs text-rose-300">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <span className="font-bold">Team Vulnerability Alert: </span>
                Your party has 3+ Pokémon weak against:{' '}
                {criticalThreats.map(t => (
                  <span key={t.type} className="inline-block mx-1 px-2 py-0.5 rounded font-mono font-bold bg-rose-500/20 text-rose-200 uppercase text-[10px]">
                    {t.type} ({t.weakCount} weak)
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 flex items-center gap-3 text-xs text-emerald-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Balanced Defenses:</strong> No single attack type is super effective against 3 or more of your active team members!</span>
            </div>
          )}

          {/* Type Defense Breakdown Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                Defensive Matchups (All 18 Types)
              </h4>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Resists</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400"></span> Weak</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Immune</span>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-2">
              {analysis.map(({ type, weakCount, quadWeakCount, resistCount, immuneCount }) => {
                const color = TYPE_COLORS[type];
                return (
                  <div 
                    key={type}
                    className="p-2 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col items-center text-center transition-all hover:border-white/20"
                  >
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight text-white mb-1.5 w-full block truncate"
                      style={{ backgroundColor: color.bg }}
                    >
                      {type}
                    </span>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono">
                      {resistCount > 0 && (
                        <span className="text-emerald-400 font-bold" title={`${resistCount} resistant`}>
                          +{resistCount}
                        </span>
                      )}
                      {immuneCount > 0 && (
                        <span className="text-purple-400 font-bold" title={`${immuneCount} immune`}>
                          ★{immuneCount}
                        </span>
                      )}
                      {weakCount > 0 && (
                        <span className={`font-bold ${quadWeakCount > 0 ? 'text-rose-400 font-black' : 'text-amber-400'}`} title={`${weakCount} weak (${quadWeakCount} 4x weak)`}>
                          -{weakCount}
                        </span>
                      )}
                      {resistCount === 0 && immuneCount === 0 && weakCount === 0 && (
                        <span className="text-slate-600">0</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Offensive Coverage Bar & Team Stat Averages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Offensive Coverage */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Super-Effective Attack Coverage ({offensiveCoverage.length}/18)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {ALL_TYPES.map(type => {
                  const covered = offensiveCoverage.includes(type);
                  return (
                    <span
                      key={type}
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                        covered
                          ? 'text-white shadow-sm'
                          : 'bg-slate-800 text-slate-600 opacity-40 line-through'
                      }`}
                      style={{ backgroundColor: covered ? TYPE_COLORS[type].bg : undefined }}
                    >
                      {type}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Team Stat Averages */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Average Team Stat Spread (BST: {avgStats.total})
              </h4>
              <div className="grid grid-cols-6 gap-2 text-center text-xs">
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-[10px] text-slate-400">HP</div>
                  <div className="font-bold text-white font-mono">{avgStats.hp}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-[10px] text-slate-400">ATK</div>
                  <div className="font-bold text-red-400 font-mono">{avgStats.atk}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-[10px] text-slate-400">DEF</div>
                  <div className="font-bold text-blue-400 font-mono">{avgStats.def}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-[10px] text-slate-400">SPA</div>
                  <div className="font-bold text-amber-400 font-mono">{avgStats.spa}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-[10px] text-slate-400">SPD</div>
                  <div className="font-bold text-green-400 font-mono">{avgStats.spd}</div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-[10px] text-slate-400">SPE</div>
                  <div className="font-bold text-cyan-400 font-mono">{avgStats.spe}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
