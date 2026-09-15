import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Dices, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Flame, 
  Skull, 
  Award,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Pokemon, GENERATIONS, TYPE_COLORS, fisherYatesShuffle } from '../../data/pokemonData';

interface NuzlockeChallengeToolProps {
  pokemonList: Pokemon[];
}

export default function NuzlockeChallengeTool({ pokemonList }: NuzlockeChallengeToolProps) {
  const [selectedGen, setSelectedGen] = useState<number>(1);
  const [starter, setStarter] = useState<Pokemon | null>(null);

  // Encounter list
  interface Encounter {
    id: string;
    route: string;
    pokemon: Pokemon | null;
    status: 'pending' | 'caught' | 'fainted' | 'skipped';
  }

  const defaultRoutesByGen: Record<number, string[]> = {
    1: ['Route 1', 'Route 22', 'Route 2', 'Viridian Forest', 'Route 3', 'Mt. Moon', 'Route 4', 'Route 24', 'Route 25', 'Route 5', 'Route 6', 'Diglett Cave'],
    2: ['Route 29', 'Route 30', 'Route 31', 'Dark Cave', 'Route 32', 'Union Cave', 'Route 33', 'Slowpoke Well', 'Ilex Forest', 'Route 34', 'National Park', 'Route 35'],
    3: ['Route 101', 'Route 102', 'Route 103', 'Route 104', 'Petalburg Woods', 'Route 116', 'Rusturf Tunnel', 'Dewford Town', 'Granite Cave', 'Route 109', 'Route 110', 'Slateport Beach'],
    4: ['Route 201', 'Lake Verity', 'Route 202', 'Route 203', 'Oreburgh Gate', 'Oreburgh Mine', 'Route 204', 'Ravaged Path', 'Floaroma Meadow', 'Route 205', 'Valley Windworks', 'Eterna Forest'],
    5: ['Route 1', 'Route 2', 'Dreamyard', 'Route 3', 'Wellspring Cave', 'Pinwheel Forest', 'Castelia City', 'Route 4', 'Desert Resort', 'Relic Castle', 'Route 5', 'Cold Storage'],
    6: ['Route 2', 'Santalune Forest', 'Route 3', 'Route 4', 'Route 5', 'Route 6', 'Route 7', 'Connecting Cave', 'Route 8', 'Ambrette Town', 'Glittering Cave', 'Cyllage City'],
    7: ['Route 1', 'Hau\'oli Outskirts', 'Trainer School', 'Hau\'oli City', 'Route 2', 'Hau\'oli Cemetery', 'Verdant Cavern', 'Route 3', 'Melemele Meadow', 'Seaward Cave', 'Ten Carat Hill', 'Route 4'],
    8: ['Route 1', 'Route 2', 'Rolling Fields', 'Dappled Grove', 'West Lake Axewell', 'Route 3', 'Galar Mine', 'Route 4', 'Turffield', 'Route 5', 'Hulbury', 'Galar Mine No. 2'],
    9: ['Poco Path', 'Inlet Grotto', 'South Province Area 1', 'South Province Area 2', 'South Province Area 3', 'South Province Area 4', 'West Province Area 1', 'Asado Desert', 'East Province Area 1', 'East Province Area 2', 'Tagtree Thicket', 'Casseroya Lake'],
  };

  // Gym level caps by gen
  const gymCapsByGen: Record<number, { gym: string; cap: number; leader: string }[]> = {
    1: [
      { gym: 'Boulder Badge (Brock)', cap: 14, leader: 'Geodude / Onix' },
      { gym: 'Cascade Badge (Misty)', cap: 21, leader: 'Staryu / Starmie' },
      { gym: 'Thunder Badge (Lt. Surge)', cap: 24, leader: 'Raichu' },
      { gym: 'Rainbow Badge (Erika)', cap: 29, leader: 'Vileplume' },
      { gym: 'Soul Badge (Koga)', cap: 43, leader: 'Weezing' },
      { gym: 'Marsh Badge (Sabrina)', cap: 43, leader: 'Alakazam' },
      { gym: 'Volcano Badge (Blaine)', cap: 47, leader: 'Arcanine' },
      { gym: 'Earth Badge (Giovanni)', cap: 50, leader: 'Rhydon' },
      { gym: 'Elite Four & Champion', cap: 65, leader: 'Champion' },
    ],
    2: [
      { gym: 'Zephyr Badge (Falkner)', cap: 9, leader: 'Pidgeotto' },
      { gym: 'Hive Badge (Bugsy)', cap: 16, leader: 'Scyther' },
      { gym: 'Plain Badge (Whitney)', cap: 20, leader: 'Miltank' },
      { gym: 'Fog Badge (Morty)', cap: 25, leader: 'Gengar' },
      { gym: 'Storm Badge (Chuck)', cap: 30, leader: 'Poliwrath' },
      { gym: 'Mineral Badge (Jasmine)', cap: 35, leader: 'Steelix' },
      { gym: 'Glacier Badge (Pryce)', cap: 34, leader: 'Piloswine' },
      { gym: 'Rising Badge (Clair)', cap: 40, leader: 'Kingdra' },
      { gym: 'Champion Lance', cap: 50, leader: 'Dragonite' },
    ],
    3: [
      { gym: 'Stone Badge (Roxanne)', cap: 15, leader: 'Nosepass' },
      { gym: 'Knuckle Badge (Brawly)', cap: 19, leader: 'Makuhita' },
      { gym: 'Dynamo Badge (Wattson)', cap: 24, leader: 'Manectric' },
      { gym: 'Heat Badge (Flannery)', cap: 29, leader: 'Torkoal' },
      { gym: 'Balance Badge (Norman)', cap: 31, leader: 'Slaking' },
      { gym: 'Feather Badge (Winona)', cap: 33, leader: 'Altaria' },
      { gym: 'Mind Badge (Tate & Liza)', cap: 42, leader: 'Lunatone / Solrock' },
      { gym: 'Rain Badge (Wallace/Juan)', cap: 43, leader: 'Kingdra' },
      { gym: 'Champion Steven', cap: 58, leader: 'Metagross' },
    ],
    4: [
      { gym: 'Coal Badge (Roark)', cap: 14, leader: 'Cranidos' },
      { gym: 'Forest Badge (Gardenia)', cap: 22, leader: 'Roserade' },
      { gym: 'Cobble Badge (Maylene)', cap: 30, leader: 'Lucario' },
      { gym: 'Fen Badge (Wake)', cap: 30, leader: 'Floatzel' },
      { gym: 'Relic Badge (Fantina)', cap: 36, leader: 'Mismagius' },
      { gym: 'Mine Badge (Byron)', cap: 41, leader: 'Bastiodon' },
      { gym: 'Icicle Badge (Candice)', cap: 44, leader: 'Froslass' },
      { gym: 'Beacon Badge (Volkner)', cap: 50, leader: 'Electivire' },
      { gym: 'Champion Cynthia', cap: 66, leader: 'Garchomp' },
    ],
    5: [
      { gym: 'Trio Badge (Cilan/Chili/Cress)', cap: 14, leader: 'Elemental Monkeys' },
      { gym: 'Basic Badge (Lenora)', cap: 20, leader: 'Watchog' },
      { gym: 'Insect Badge (Burgh)', cap: 23, leader: 'Leavanny' },
      { gym: 'Bolt Badge (Elesa)', cap: 27, leader: 'Zebstrika' },
      { gym: 'Quake Badge (Clay)', cap: 31, leader: 'Excadrill' },
      { gym: 'Jet Badge (Skyla)', cap: 35, leader: 'Swanna' },
      { gym: 'Freeze Badge (Brycen)', cap: 39, leader: 'Beartic' },
      { gym: 'Legend Badge (Drayden/Iris)', cap: 43, leader: 'Haxorus' },
      { gym: 'Champion Alder / Ghetsis', cap: 54, leader: 'Hydreigon' },
    ],
    6: [
      { gym: 'Bug Badge (Viola)', cap: 12, leader: 'Vivillon' },
      { gym: 'Cliff Badge (Grant)', cap: 25, leader: 'Tyrunt' },
      { gym: 'Rumble Badge (Korrina)', cap: 32, leader: 'Hawlucha' },
      { gym: 'Plant Badge (Ramos)', cap: 34, leader: 'Gogoat' },
      { gym: 'Voltage Badge (Clemont)', cap: 37, leader: 'Heliolisk' },
      { gym: 'Fairy Badge (Valerie)', cap: 42, leader: 'Sylveon' },
      { gym: 'Psychic Badge (Olympia)', cap: 48, leader: 'Meowstic' },
      { gym: 'Iceberg Badge (Wulfric)', cap: 59, leader: 'Avalugg' },
      { gym: 'Champion Diantha', cap: 68, leader: 'Mega Gardevoir' },
    ],
    7: [
      { gym: 'Ilima Normal Trial', cap: 12, leader: 'Totem Gumshoos/Raticate' },
      { gym: 'Lana Water Trial', cap: 20, leader: 'Totem Wishiwashi/Araquanid' },
      { gym: 'Kiawe Fire Trial', cap: 22, leader: 'Totem Salazzle/Marowak' },
      { gym: 'Mallow Grass Trial', cap: 24, leader: 'Totem Lurantis' },
      { gym: 'Sophocles Electric Trial', cap: 29, leader: 'Totem Vikavolt/Togedemaru' },
      { gym: 'Acerola Ghost Trial', cap: 33, leader: 'Totem Mimikyu' },
      { gym: 'Mina Fairy Trial', cap: 55, leader: 'Totem Ribombee' },
      { gym: 'Champion Kukui / Hau', cap: 60, leader: 'Decidueye/Incineroar/Primarina' },
    ],
    8: [
      { gym: 'Grass Gym (Milo)', cap: 20, leader: 'Eldegoss' },
      { gym: 'Water Gym (Nessa)', cap: 24, leader: 'Drednaw' },
      { gym: 'Fire Gym (Kabu)', cap: 27, leader: 'Centiskorch' },
      { gym: 'Fighting/Ghost (Bea/Allister)', cap: 36, leader: 'Machamp / Gengar' },
      { gym: 'Fairy Gym (Opal)', cap: 38, leader: 'Alcremie' },
      { gym: 'Rock/Ice (Gordie/Melony)', cap: 42, leader: 'Coalossal / Lapras' },
      { gym: 'Dark Gym (Piers)', cap: 46, leader: 'Obstagoon' },
      { gym: 'Dragon Gym (Raihan)', cap: 48, leader: 'Duraludon' },
      { gym: 'Champion Leon', cap: 65, leader: 'Charizard' },
    ],
    9: [
      { gym: 'Bug Gym (Katy)', cap: 15, leader: 'Teddiursa' },
      { gym: 'Grass Gym (Brassius)', cap: 17, leader: 'Sudowoodo' },
      { gym: 'Electric Gym (Iono)', cap: 24, leader: 'Mismagius' },
      { gym: 'Water Gym (Kofu)', cap: 30, leader: 'Crabominable' },
      { gym: 'Normal Gym (Larry)', cap: 36, leader: 'Staraptor' },
      { gym: 'Ghost Gym (Ryme)', cap: 42, leader: 'Toxtricity' },
      { gym: 'Psychic Gym (Tulip)', cap: 45, leader: 'Florges' },
      { gym: 'Ice Gym (Grusha)', cap: 48, leader: 'Altaria' },
      { gym: 'Top Champion Geeta', cap: 62, leader: 'Glimmora' },
    ]
  };

  // Active encounters
  const [encounters, setEncounters] = useState<Encounter[]>(() => {
    const routes = defaultRoutesByGen[1];
    return routes.map((r, i) => ({
      id: `enc-${i}`,
      route: r,
      pokemon: null,
      status: 'pending'
    }));
  });

  // Switch generation routes
  const handleGenChange = (gen: number) => {
    setSelectedGen(gen);
    const routes = defaultRoutesByGen[gen] || defaultRoutesByGen[1];
    setEncounters(routes.map((r, i) => ({
      id: `enc-${gen}-${i}`,
      route: r,
      pokemon: null,
      status: 'pending'
    })));
    setStarter(null);
  };

  // Roll Starter Pokémon (Standard or Random)
  const handleRollStarter = () => {
    const genPokemon = pokemonList.filter(p => p.gen === selectedGen && !p.isLegendary && !p.isMythical);
    if (genPokemon.length === 0) return;
    const picked = genPokemon[Math.floor(Math.random() * genPokemon.length)];
    setStarter(picked);
  };

  // Roll random encounter for a specific route
  const handleRollEncounter = (encId: string) => {
    const genPokemon = pokemonList.filter(p => p.gen === selectedGen && !p.isLegendary && !p.isMythical);
    if (genPokemon.length === 0) return;
    const picked = genPokemon[Math.floor(Math.random() * genPokemon.length)];

    setEncounters(prev => prev.map(enc => {
      if (enc.id === encId) {
        return { ...enc, pokemon: picked, status: 'caught' };
      }
      return enc;
    }));
  };

  const handleStatusChange = (encId: string, status: Encounter['status']) => {
    setEncounters(prev => prev.map(enc => {
      if (enc.id === encId) {
        return { ...enc, status };
      }
      return enc;
    }));
  };

  const statsCount = useMemo(() => {
    const caught = encounters.filter(e => e.status === 'caught').length;
    const fainted = encounters.filter(e => e.status === 'fainted').length;
    return { caught, fainted };
  }, [encounters]);

  const currentCaps = gymCapsByGen[selectedGen] || gymCapsByGen[1];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900/80 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Nuzlocke & Challenge Run Tracker
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Route encounter generator, permadeath tracker, and official Gym Leader level caps for all 9 generations.
          </p>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-emerald-300/80 uppercase font-bold">Alive Team</div>
              <div className="text-base font-black text-emerald-400 font-mono leading-none">{statsCount.caught}</div>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2">
            <Skull className="w-4 h-4 text-rose-400" />
            <div>
              <div className="text-[10px] text-rose-300/80 uppercase font-bold">Fainted (Dead)</div>
              <div className="text-base font-black text-rose-400 font-mono leading-none">{statsCount.fainted}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Generation Switcher */}
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Select Region / Game Generation
        </label>
        <div className="flex flex-wrap gap-2">
          {GENERATIONS.map(g => (
            <button
              key={g.id}
              onClick={() => handleGenChange(g.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedGen === g.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'bg-slate-950 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              Gen {g.id} ({g.region})
            </button>
          ))}
        </div>
      </div>

      {/* Starter Roll Card */}
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Nuzlocke Starter Companion
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Roll a randomized partner or conventional starter for your Gen {selectedGen} journey.
          </p>
        </div>

        {starter ? (
          <div className="flex items-center gap-4 bg-slate-950 border border-white/10 rounded-xl p-3 pr-5">
            <img 
              src={starter.officialArtworkUrl} 
              alt={starter.name} 
              crossOrigin="anonymous" 
              className="w-14 h-14 object-contain"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = starter.spriteUrl; }}
            />
            <div>
              <div className="font-bold text-white text-sm">{starter.name}</div>
              <div className="flex gap-1 mt-1">
                {starter.types.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded text-[9px] font-bold uppercase text-white" style={{ backgroundColor: TYPE_COLORS[t].bg }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={handleRollStarter}
              className="ml-2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              title="Reroll starter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleRollStarter}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
          >
            <Dices className="w-4 h-4" />
            <span>Roll Starter Pokémon</span>
          </button>
        )}
      </div>

      {/* Two Column Grid: Route Encounters (Left) + Gym Level Caps (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Encounters (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Dices className="w-4 h-4 text-indigo-400" />
              First Route Encounters
            </h3>
            <span className="text-xs text-slate-400">{encounters.length} Locations</span>
          </div>

          <div className="space-y-2.5">
            {encounters.map(enc => (
              <div
                key={enc.id}
                className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between gap-3 hover:border-white/15 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-300 min-w-28">{enc.route}</span>
                  
                  {enc.pokemon ? (
                    <div className="flex items-center gap-2">
                      <img src={enc.pokemon.spriteUrl} alt={enc.pokemon.name} className="w-8 h-8 object-contain" />
                      <span className={`text-xs font-bold ${enc.status === 'fainted' ? 'line-through text-rose-400' : 'text-white'}`}>
                        {enc.pokemon.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-600 italic">No encounter rolled yet</span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {!enc.pokemon ? (
                    <button
                      onClick={() => handleRollEncounter(enc.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3 h-3" /> Roll Encounter
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleStatusChange(enc.id, 'caught')}
                        className={`px-2 py-1 rounded text-[10px] font-bold ${enc.status === 'caught' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400'}`}
                      >
                        Alive
                      </button>
                      <button
                        onClick={() => handleStatusChange(enc.id, 'fainted')}
                        className={`px-2 py-1 rounded text-[10px] font-bold ${enc.status === 'fainted' ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-400'}`}
                      >
                        Dead
                      </button>
                      <button
                        onClick={() => handleRollEncounter(enc.id)}
                        className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400"
                        title="Reroll"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gym Level Caps (1 Col) */}
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Level Cap Limits
            </h3>
            <span className="text-xs text-slate-400">Strict Rules</span>
          </div>

          <div className="space-y-2.5">
            {currentCaps.map((c, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white">{c.gym}</div>
                  <div className="text-[10px] text-slate-400">{c.leader}</div>
                </div>

                <div className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-black text-xs">
                  Lv. {c.cap}
                </div>
              </div>
            ))}
          </div>

          {/* Standard Rules Checklist */}
          <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-400">
            <div className="font-bold text-slate-300">Standard Nuzlocke Rules:</div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
              <li>Only catch the first Pokémon in each route.</li>
              <li>Fainted Pokémon are considered dead and permanently boxed.</li>
              <li>Must nickname every caught Pokémon.</li>
              <li>Cannot exceed the next Gym Leader's ace level.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
