import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Grid, 
  List, 
  Sparkles, 
  Zap, 
  Plus, 
  Eye, 
  Check, 
  ChevronDown, 
  Layers, 
  Volume2, 
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { 
  Pokemon, 
  PokemonType, 
  TYPE_COLORS, 
  getShinyArtworkUrl 
} from '../../data/pokemonData';
import PokemonCryButton from './PokemonCryButton';

interface PokemonGenerationListProps {
  pokemonList: Pokemon[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectPokemonForDetails: (pokemon: Pokemon) => void;
  onAddPokemonToTeam?: (pokemon: Pokemon) => void;
  teamIds?: number[];
  showShinyArt?: boolean;
}

export default function PokemonGenerationList({
  pokemonList,
  searchQuery,
  onSearchChange,
  onSelectPokemonForDetails,
  onAddPokemonToTeam,
  teamIds = [],
  showShinyArt = false
}: PokemonGenerationListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [displayCount, setDisplayCount] = useState<number>(36);
  const [addedPokemonId, setAddedPokemonId] = useState<number | null>(null);

  // Filter list strictly in real-time based on searchQuery
  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return pokemonList;

    // Extract raw numbers if user typed #025 or 25
    const cleanNum = q.replace(/[^0-9]/g, '');
    const cleanName = q.replace(/^#/, '');

    return pokemonList.filter(p => {
      // 1. Name match (case-insensitive substring)
      if (p.name.toLowerCase().includes(cleanName)) return true;

      // 2. ID exact or padded match (#025, 25, 0025)
      const idStr = p.id.toString();
      const paddedId = idStr.padStart(4, '0');
      const paddedThree = idStr.padStart(3, '0');

      if (
        idStr === cleanNum || 
        paddedId === cleanNum || 
        paddedThree === cleanNum ||
        idStr === cleanName ||
        paddedId === cleanName ||
        paddedThree === cleanName
      ) {
        return true;
      }

      // 3. If numeric query is 2+ digits, also match partial ID
      if (cleanNum.length >= 2 && idStr.includes(cleanNum)) {
        return true;
      }

      // 4. Type name match (e.g. typing "fire" or "dragon")
      if (p.types.some(t => t.toLowerCase() === cleanName)) {
        return true;
      }

      return false;
    });
  }, [pokemonList, searchQuery]);

  // Reset pagination when search query or source list changes
  React.useEffect(() => {
    setDisplayCount(36);
  }, [searchQuery, pokemonList]);

  const visibleList = useMemo(() => {
    return filteredList.slice(0, displayCount);
  }, [filteredList, displayCount]);

  const handleAdd = (p: Pokemon, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddPokemonToTeam) {
      onAddPokemonToTeam(p);
      setAddedPokemonId(p.id);
      setTimeout(() => setAddedPokemonId(null), 1400);
    }
  };

  const quickSearchShortcuts = [
    { label: '#025 Pikachu', query: '25' },
    { label: '#006 Charizard', query: '6' },
    { label: '#094 Gengar', query: '94' },
    { label: '#133 Eevee', query: '133' },
    { label: '#150 Mewtwo', query: '150' },
    { label: '#448 Lucario', query: '448' },
  ];

  return (
    <div className="bg-gradient-to-b from-[#0f1424] via-[#0b0f1a] to-[#070a12] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
      
      {/* Header with Title and Real-Time Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-black uppercase tracking-wider text-rose-400">
              Pokémon Generation List &amp; Pokédex Directory
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Search across <strong className="text-white font-bold">{pokemonList.length}</strong> Pokémon in current generation pool by species name or National Pokédex #ID.
          </p>
        </div>

        {/* View Layout Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
            }`}
            title="Grid Card View"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode('compact')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'compact'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
            }`}
            title="Compact List View"
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compact</span>
          </button>
        </div>
      </div>

      {/* Real-Time Search Input Box */}
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-rose-400" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Real-time search by name or ID (e.g. 'Pikachu', '#025', 'Charizard', '150', 'Dragon')..."
            className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-[#12182b] border border-white/15 text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all shadow-inner"
          />

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-white/5 text-slate-400 border border-white/5">
              {filteredList.length}
            </span>
          </div>
        </div>

        {/* Quick Search Tags / Shortcuts */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Quick Find:
          </span>
          {quickSearchShortcuts.map((chip) => (
            <button
              key={chip.label}
              onClick={() => onSearchChange(chip.query)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-500/20 text-[11px] font-medium text-slate-300 hover:text-rose-300 border border-white/5 transition-all"
            >
              {chip.label}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-[11px] font-bold text-rose-300 border border-rose-500/20 transition-all ml-auto"
            >
              Reset Search
            </button>
          )}
        </div>
      </div>

      {/* Zero Results Feedback */}
      {filteredList.length === 0 && (
        <div className="py-12 px-4 rounded-2xl bg-white/5 border border-white/5 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">No Pokémon Found</h4>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            No Pokémon in the active pool match <strong className="text-rose-400">"{searchQuery}"</strong>. Try searching by number (e.g. 25), checking spelling, or enabling more generations in the controls above.
          </p>
          <button
            onClick={() => onSearchChange('')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors"
          >
            Clear Search Filter
          </button>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && filteredList.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {visibleList.map((pokemon) => {
            const primaryType = pokemon.types[0];
            const typeColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;
            const artworkSrc = showShinyArt ? getShinyArtworkUrl(pokemon.id) : pokemon.officialArtworkUrl;
            const isInTeam = teamIds.includes(pokemon.id);
            const isJustAdded = addedPokemonId === pokemon.id;

            return (
              <div
                key={pokemon.id}
                onClick={() => onSelectPokemonForDetails(pokemon)}
                className={`relative rounded-2xl border transition-all duration-200 p-3 flex flex-col justify-between group cursor-pointer bg-gradient-to-b from-[#12182c] to-[#0d1222] border-white/10 hover:border-rose-500/50 hover:scale-[1.02] shadow-lg ${
                  isInTeam ? 'ring-2 ring-emerald-500/40' : ''
                }`}
              >
                {/* Top ID and Cry Icon */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-mono text-[10px] font-bold text-slate-400">
                    #{pokemon.id.toString().padStart(4, '0')}
                  </span>
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <PokemonCryButton
                      pokemonId={pokemon.id}
                      pokemonName={pokemon.name}
                      variant="icon"
                    />
                  </div>
                </div>

                {/* Sprite / Artwork Thumbnail */}
                <div className="relative py-2 flex items-center justify-center">
                  <img
                    src={artworkSrc}
                    alt={pokemon.name}
                    crossOrigin="anonymous"
                    loading="lazy"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = pokemon.spriteUrl;
                    }}
                  />
                </div>

                {/* Name & Type Badges */}
                <div className="text-center space-y-1">
                  <div className="text-xs font-bold text-white truncate group-hover:text-rose-300 transition-colors">
                    {pokemon.name}
                  </div>

                  <div className="flex items-center justify-center gap-1">
                    {pokemon.types.map(t => {
                      const tc = TYPE_COLORS[t] || TYPE_COLORS.normal;
                      return (
                        <span
                          key={t}
                          className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${tc.badge} text-white`}
                        >
                          {t}
                        </span>
                      );
                    })}
                  </div>

                  <div className="text-[10px] font-mono text-amber-400/90 pt-0.5">
                    {pokemon.stats.total} BST
                  </div>
                </div>

                {/* Quick Add Button */}
                {onAddPokemonToTeam && (
                  <button
                    onClick={(e) => handleAdd(pokemon, e)}
                    className={`mt-2 w-full py-1.5 px-2 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                      isJustAdded
                        ? 'bg-emerald-500 text-white'
                        : isInTeam
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/5 hover:bg-rose-600 text-slate-300 hover:text-white border border-white/10 hover:border-transparent'
                    }`}
                    title="Add to active battle team"
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3 h-3 text-white" />
                        <span>Added!</span>
                      </>
                    ) : isInTeam ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>In Team</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Add to Team</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* COMPACT LIST VIEW */}
      {viewMode === 'compact' && filteredList.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">#ID</th>
                <th className="py-2.5 px-3">Pokémon</th>
                <th className="py-2.5 px-3">Types</th>
                <th className="py-2.5 px-2 text-center">HP</th>
                <th className="py-2.5 px-2 text-center">ATK</th>
                <th className="py-2.5 px-2 text-center">DEF</th>
                <th className="py-2.5 px-2 text-center">SPD</th>
                <th className="py-2.5 px-3 text-right">BST</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {visibleList.map((pokemon) => {
                const isInTeam = teamIds.includes(pokemon.id);
                const isJustAdded = addedPokemonId === pokemon.id;

                return (
                  <tr 
                    key={pokemon.id}
                    onClick={() => onSelectPokemonForDetails(pokemon)}
                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-400">
                      #{pokemon.id.toString().padStart(4, '0')}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <img 
                          src={pokemon.spriteUrl} 
                          alt={pokemon.name} 
                          className="w-7 h-7 object-contain"
                          loading="lazy" 
                        />
                        <span className="font-bold text-white group-hover:text-rose-300 transition-colors">
                          {pokemon.name}
                        </span>
                        {pokemon.isLegendary && (
                          <span className="text-[9px] font-extrabold uppercase px-1 rounded bg-amber-500/20 text-amber-300">
                            Leg
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1">
                        {pokemon.types.map(t => {
                          const tc = TYPE_COLORS[t] || TYPE_COLORS.normal;
                          return (
                            <span 
                              key={t}
                              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${tc.badge} text-white`}
                            >
                              {t}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono text-emerald-400">{pokemon.stats.hp}</td>
                    <td className="py-2.5 px-2 text-center font-mono text-rose-400">{pokemon.stats.attack}</td>
                    <td className="py-2.5 px-2 text-center font-mono text-blue-400">{pokemon.stats.defense}</td>
                    <td className="py-2.5 px-2 text-center font-mono text-amber-400">{pokemon.stats.speed}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400">
                      {pokemon.stats.total}
                    </td>
                    <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <PokemonCryButton
                          pokemonId={pokemon.id}
                          pokemonName={pokemon.name}
                          variant="icon"
                        />
                        {onAddPokemonToTeam && (
                          <button
                            onClick={(e) => handleAdd(pokemon, e)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                              isJustAdded
                                ? 'bg-emerald-500 text-white'
                                : isInTeam
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-white/10 hover:bg-rose-600 text-white'
                            }`}
                            title="Add to team"
                          >
                            {isJustAdded ? 'Added!' : isInTeam ? 'In Team' : '+ Add'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination / Load More Footer */}
      {filteredList.length > displayCount && (
        <div className="pt-4 border-t border-white/10 text-center">
          <button
            onClick={() => setDisplayCount(prev => prev + 36)}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs inline-flex items-center gap-2 transition-colors"
          >
            <span>Load More Pokémon ({displayCount} of {filteredList.length} shown)</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
