import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  RotateCw, 
  Search, 
  Dices,
  Flame,
  Heart,
  Smile,
  Crown
} from 'lucide-react';
import { Pokemon, TYPE_COLORS } from '../../data/pokemonData';
import PokemonCryButton from './PokemonCryButton';

interface PokemonNicknameToolProps {
  pokemonList: Pokemon[];
}

export default function PokemonNicknameTool({ pokemonList }: PokemonNicknameToolProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>(() => {
    return pokemonList.find(p => p.id === 6) || pokemonList[0];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [seed, setSeed] = useState(1);

  // Search filtered
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return pokemonList.slice(0, 30);
    const q = searchQuery.toLowerCase();
    return pokemonList.filter(p => p.name.toLowerCase().includes(q) || p.id.toString() === q).slice(0, 30);
  }, [pokemonList, searchQuery]);

  const handleRandom = () => {
    if (pokemonList.length === 0) return;
    const randomIdx = Math.floor(Math.random() * pokemonList.length);
    setSelectedPokemon(pokemonList[randomIdx]);
    setSeed(prev => prev + 1);
  };

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1800);
  };

  // Generate thematic nicknames dynamically based on name, types, gen, and stats
  const nicknameCategories = useMemo(() => {
    const p = selectedPokemon;
    const name = p.name;
    const type1 = p.types[0];
    const type2 = p.types[1];

    // Thematic pools
    const typePrefixes: Record<string, string[]> = {
      fire: ['Ignis', 'Blaze', 'Cinder', 'Pyro', 'Vulkan', 'Solaris', 'Flicker', 'Ember', 'Ashen', 'Magma'],
      water: ['Triton', 'Aqua', 'Cascade', 'Nami', 'Poseidon', 'Hydra', 'Tsunami', 'Vapor', 'Marina', 'Nautilus'],
      grass: ['Bramble', 'Verdant', 'Flora', 'Sprout', 'Oakley', 'Sylvan', 'Mossy', 'Clover', 'Yggdrasil', 'Willow'],
      electric: ['Volt', 'Tesla', 'Jolt', 'Raijin', 'Sparky', 'Ampere', 'Dynamo', 'Blitz', 'Thunderbolt', 'Surge'],
      ice: ['Frost', 'Glacier', 'Blizzard', 'Yukiko', 'Boreas', 'Arctic', 'Chill', 'Kori', 'Subzero', 'Permafrost'],
      fighting: ['Titan', 'Knuckles', 'Brawler', 'Striker', 'Rocky', 'Bruiser', 'Champion', 'Pugilist', 'Vanguard', 'Ajax'],
      poison: ['Venom', 'Toxin', 'Viper', 'Belladonna', 'Arsenic', 'Blight', 'Miasma', 'Hazard', 'Sludge', 'Corrosion'],
      ground: ['Terra', 'Quake', 'Dune', 'Gaea', 'Bedrock', 'Dusty', 'Sediment', 'Strata', 'Grit', 'Pangaea'],
      flying: ['Zephyr', 'Aero', 'Valkyrie', 'Tempest', 'Skye', 'Gale', 'Falcon', 'Hermes', 'Nimbus', 'Stratosphere'],
      psychic: ['Oracle', 'Mindbender', 'Mirage', 'Zenith', 'Nebula', 'Psion', 'Illusion', 'Cosmo', 'Enigma', 'Psyche'],
      bug: ['Stinger', 'Chitin', 'Mantis', 'Scarab', 'Critter', 'Thorax', 'Goliath', 'Hexapod', 'Weevil', 'Pupa'],
      rock: ['Boulder', 'Onyx', 'Granite', 'Basalt', 'Crag', 'Obsidian', 'Monolith', 'Flint', 'Slate', 'Pebbles'],
      ghost: ['Specter', 'Phantom', 'Wraith', 'Banshee', 'Eclipse', 'Shadow', 'Spook', 'Ghoul', 'Poltergeist', 'Haunt'],
      dragon: ['Wyvern', 'Draco', 'Fafnir', 'Leviathan', 'Ouroboros', 'Ryu', 'Shenron', 'Bahamut', 'Drakon', 'Smaug'],
      dark: ['Nocturne', 'Reaper', 'Vesper', 'Midnight', 'Grimm', 'Nyx', 'Abyss', 'Rogue', 'Raven', 'Umbra'],
      steel: ['Aegis', 'Cobalt', 'Titanium', 'Ferrum', 'Armor', 'Anvil', 'Sterling', 'Valyrian', 'Bastion', 'Chrome'],
      fairy: ['Pixie', 'Oberon', 'Titania', 'Stardust', 'Twinkle', 'Glimmer', 'Charm', 'Aurora', 'Celeste', 'Fable'],
      normal: ['Buddy', 'Scout', 'Champion', 'Bandit', 'Jasper', 'Ranger', 'Oliver', 'Milo', 'Lucky', 'Charlie'],
    };

    const fierceList = [
      `${name.slice(0, 4)}rex`,
      typePrefixes[type1]?.[0] || 'Omega',
      `${typePrefixes[type1]?.[1] || 'Vanguard'} King`,
      'Apex Predator',
      'Dominator',
      `${name.slice(0, 3)}strike`
    ];

    const cuteList = [
      `${name.slice(0, 4)}y`,
      'Mochi',
      'Boba',
      'Pip',
      `${typePrefixes[type1]?.[6] || 'Bean'}y`,
      'Squishy',
      'Pudding'
    ];

    const punnyList = [
      `Sir ${name}lot`,
      `${name}zilla`,
      `Not-${name}`,
      `Whoosh`,
      `Sherlock ${name.slice(0, 4)}`,
      `Lord of the Types`
    ];

    const mythList = [
      typePrefixes[type1]?.[4] || 'Ares',
      'Ragnarok',
      'Valkyrie',
      'Prometheus',
      'Chronos',
      'Archangel'
    ];

    const animeList = [
      `${name.slice(0, 3)}-chan`,
      'Kage',
      'Ryuusei',
      'Shinobi',
      'Senshi',
      'Akira'
    ];

    return [
      { id: 'fierce', title: 'Badass & Fierce', icon: Flame, color: 'text-red-400', names: fierceList },
      { id: 'cute', title: 'Cute & Whimsical', icon: Heart, color: 'text-pink-400', names: cuteList },
      { id: 'punny', title: 'Clever & Punny', icon: Smile, color: 'text-amber-400', names: punnyList },
      { id: 'myth', title: 'Mythological & Epic', icon: Crown, color: 'text-indigo-400', names: mythList },
      { id: 'anime', title: 'Japanese & Anime', icon: Sparkles, color: 'text-purple-400', names: animeList },
    ];
  }, [selectedPokemon, seed]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Pokémon Thematic Nickname Generator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Generate creative, badass, cute, and witty nicknames customized for your Pokémon.
          </p>
        </div>

        <button
          onClick={handleRandom}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all hover:scale-105 self-start sm:self-auto"
        >
          <Dices className="w-4 h-4" />
          <span>Random Pokémon</span>
        </button>
      </div>

      {/* Target Pokémon Search and Card */}
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-80 relative">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Select Pokémon
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500/60"
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
        </div>

        {/* Selected Pokemon Display */}
        <div className="flex items-center gap-5">
          <img
            src={selectedPokemon.officialArtworkUrl}
            alt={selectedPokemon.name}
            crossOrigin="anonymous"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-xl"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = selectedPokemon.spriteUrl; }}
          />

          <div>
            <span className="text-xs font-mono text-slate-400">#{selectedPokemon.id.toString().padStart(4, '0')}</span>
            <h3 className="text-2xl font-black text-white">{selectedPokemon.name}</h3>
            <div className="flex gap-1.5 mt-1.5">
              {selectedPokemon.types.map(t => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white"
                  style={{ backgroundColor: TYPE_COLORS[t].bg }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-2.5">
              <PokemonCryButton pokemonId={selectedPokemon.id} pokemonName={selectedPokemon.name} variant="pill" />
            </div>
          </div>
        </div>

        <button
          onClick={() => setSeed(prev => prev + 1)}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
        >
          <RotateCw className="w-4 h-4" />
          <span>Reroll Nicknames</span>
        </button>
      </div>

      {/* Nickname Category Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nicknameCategories.map(cat => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className="bg-slate-900/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon className={`w-4 h-4 ${cat.color}`} />
                  <h4 className="text-sm font-bold text-white">{cat.title}</h4>
                </div>

                <div className="space-y-2">
                  {cat.names.map((nick, idx) => {
                    const isCopied = copiedName === nick;
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between hover:border-white/20 transition-all group"
                      >
                        <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                          {nick}
                        </span>

                        <button
                          onClick={() => handleCopy(nick)}
                          className={`p-1.5 rounded-lg border text-[11px] flex items-center gap-1 transition-all ${
                            isCopied
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                              : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border-white/10'
                          }`}
                          title="Copy Nickname"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
