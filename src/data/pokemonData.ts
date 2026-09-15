export type PokemonType = 
  | 'normal' | 'fire' | 'water' | 'grass' | 'electric' | 'ice' 
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' 
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
  total: number;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  gen: number;
  isLegendary: boolean;
  isMythical: boolean;
  isUltraBeast?: boolean;
  isParadox?: boolean;
  isBaby?: boolean;
  stage?: 'unevolved' | 'middle' | 'final' | 'single';
  stats: PokemonStats;
  spriteUrl: string;
  officialArtworkUrl: string;
  height?: number; // decimeters
  weight?: number; // hectograms
}

export const TYPE_COLORS: Record<PokemonType, { bg: string; text: string; border: string; badge: string; glow: string }> = {
  normal: { bg: '#A8A77A', text: '#FFFFFF', border: '#C6C59A', badge: 'bg-[#A8A77A]', glow: 'rgba(168, 167, 122, 0.4)' },
  fire: { bg: '#EE8130', text: '#FFFFFF', border: '#F4A261', badge: 'bg-[#EE8130]', glow: 'rgba(238, 129, 48, 0.5)' },
  water: { bg: '#6390F0', text: '#FFFFFF', border: '#85A8F4', badge: 'bg-[#6390F0]', glow: 'rgba(99, 144, 240, 0.5)' },
  grass: { bg: '#7AC74C', text: '#FFFFFF', border: '#9BD576', badge: 'bg-[#7AC74C]', glow: 'rgba(122, 199, 76, 0.5)' },
  electric: { bg: '#F7D02C', text: '#000000', border: '#F9DC5C', badge: 'bg-[#F7D02C] text-slate-950', glow: 'rgba(247, 208, 44, 0.5)' },
  ice: { bg: '#96D9D6', text: '#000000', border: '#B4E5E3', badge: 'bg-[#96D9D6] text-slate-950', glow: 'rgba(150, 217, 214, 0.5)' },
  fighting: { bg: '#C22E28', text: '#FFFFFF', border: '#D9524D', badge: 'bg-[#C22E28]', glow: 'rgba(194, 46, 40, 0.5)' },
  poison: { bg: '#A33EA1', text: '#FFFFFF', border: '#C15FC0', badge: 'bg-[#A33EA1]', glow: 'rgba(163, 62, 161, 0.5)' },
  ground: { bg: '#E2BF65', text: '#000000', border: '#E9CE87', badge: 'bg-[#E2BF65] text-slate-950', glow: 'rgba(226, 191, 101, 0.5)' },
  flying: { bg: '#A890F0', text: '#FFFFFF', border: '#C0ADF4', badge: 'bg-[#A890F0]', glow: 'rgba(168, 144, 240, 0.5)' },
  psychic: { bg: '#F95587', text: '#FFFFFF', border: '#FA7DA3', badge: 'bg-[#F95587]', glow: 'rgba(249, 85, 135, 0.5)' },
  bug: { bg: '#A6B91A', text: '#FFFFFF', border: '#C3D23D', badge: 'bg-[#A6B91A]', glow: 'rgba(166, 185, 26, 0.5)' },
  rock: { bg: '#B6A136', text: '#FFFFFF', border: '#CFC05B', badge: 'bg-[#B6A136]', glow: 'rgba(182, 161, 54, 0.5)' },
  ghost: { bg: '#735797', text: '#FFFFFF', border: '#9276B6', badge: 'bg-[#735797]', glow: 'rgba(115, 87, 151, 0.5)' },
  dragon: { bg: '#6F35FC', text: '#FFFFFF', border: '#9061FE', badge: 'bg-[#6F35FC]', glow: 'rgba(111, 53, 252, 0.5)' },
  dark: { bg: '#705848', text: '#FFFFFF', border: '#8E7361', badge: 'bg-[#705848]', glow: 'rgba(112, 88, 72, 0.5)' },
  steel: { bg: '#B7B7CE', text: '#000000', border: '#CDCDDE', badge: 'bg-[#B7B7CE] text-slate-950', glow: 'rgba(183, 183, 206, 0.5)' },
  fairy: { bg: '#D685AD', text: '#FFFFFF', border: '#E2A2C3', badge: 'bg-[#D685AD]', glow: 'rgba(214, 133, 173, 0.5)' },
};

export const GENERATIONS = [
  { id: 1, name: 'Gen 1', region: 'Kanto', range: [1, 151] as [number, number] },
  { id: 2, name: 'Gen 2', region: 'Johto', range: [152, 251] as [number, number] },
  { id: 3, name: 'Gen 3', region: 'Hoenn', range: [252, 386] as [number, number] },
  { id: 4, name: 'Gen 4', region: 'Sinnoh', range: [387, 493] as [number, number] },
  { id: 5, name: 'Gen 5', region: 'Unova', range: [494, 649] as [number, number] },
  { id: 6, name: 'Gen 6', region: 'Kalos', range: [650, 721] as [number, number] },
  { id: 7, name: 'Gen 7', region: 'Alola', range: [722, 809] as [number, number] },
  { id: 8, name: 'Gen 8', region: 'Galar', range: [810, 905] as [number, number] },
  { id: 9, name: 'Gen 9', region: 'Paldea', range: [906, 1025] as [number, number] },
];

export const ALL_TYPES: PokemonType[] = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

// List of Legendary & Mythical IDs across Gens 1-9
export const LEGENDARY_AND_MYTHICAL_IDS = new Set([
  // Gen 1
  144, 145, 146, 150, 151,
  // Gen 2
  243, 244, 245, 249, 250, 251,
  // Gen 3
  377, 378, 379, 380, 381, 382, 383, 384, 385, 386,
  // Gen 4
  480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493,
  // Gen 5
  638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649,
  // Gen 6
  716, 717, 718, 719, 720, 721,
  // Gen 7
  772, 773, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809,
  // Gen 8
  888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 905,
  // Gen 9
  999, 1000, 1001, 1002, 1003, 1004, 1007, 1008, 1014, 1015, 1016, 1017, 1024, 1025
]);

// Ultra Beasts (Gen 7)
export const ULTRA_BEAST_IDS = new Set([
  793, 794, 795, 796, 797, 798, 799, 803, 804, 805, 806
]);

// Paradox Pokémon (Gen 9)
export const PARADOX_IDS = new Set([
  984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995,
  1005, 1006, 1007, 1008, 1009, 1010, 1020, 1021, 1022, 1023
]);

// Baby Pokémon
export const BABY_IDS = new Set([
  172, 173, 174, 175, 236, 238, 239, 240, 298, 360, 406, 433, 438, 439, 440, 446, 447, 458, 848
]);

// 18x18 Official Pokémon Type Effectiveness Chart (Attacker -> Defender)
// Returns multiplier: 2 (super effective), 0.5 (not very effective), 0 (no effect), 1 (regular)
export const TYPE_CHART: Record<PokemonType, Partial<Record<PokemonType, number>>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, steel: 0.5, dark: 0 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
};

// Calculate defensive multiplier against an attack type
export function getDefensiveMultiplier(defenderTypes: PokemonType[], attackType: PokemonType): number {
  let multiplier = 1;
  for (const defType of defenderTypes) {
    const chart = TYPE_CHART[attackType];
    if (chart && chart[defType] !== undefined) {
      multiplier *= chart[defType]!;
    }
  }
  return multiplier;
}

// 25 Official Competitive Natures
export interface PokemonNature {
  name: string;
  increased: keyof PokemonStats | null;
  decreased: keyof PokemonStats | null;
  description: string;
}

export const NATURES: PokemonNature[] = [
  { name: 'Hardy', increased: null, decreased: null, description: 'Neutral' },
  { name: 'Lonely', increased: 'attack', decreased: 'defense', description: '+Attack, -Defense' },
  { name: 'Brave', increased: 'attack', decreased: 'speed', description: '+Attack, -Speed' },
  { name: 'Adamant', increased: 'attack', decreased: 'spAtk', description: '+Attack, -Sp. Atk' },
  { name: 'Naughty', increased: 'attack', decreased: 'spDef', description: '+Attack, -Sp. Def' },
  { name: 'Bold', increased: 'defense', decreased: 'attack', description: '+Defense, -Attack' },
  { name: 'Docile', increased: null, decreased: null, description: 'Neutral' },
  { name: 'Relaxed', increased: 'defense', decreased: 'speed', description: '+Defense, -Speed' },
  { name: 'Impish', increased: 'defense', decreased: 'spAtk', description: '+Defense, -Sp. Atk' },
  { name: 'Lax', increased: 'defense', decreased: 'spDef', description: '+Defense, -Sp. Def' },
  { name: 'Timid', increased: 'speed', decreased: 'attack', description: '+Speed, -Attack' },
  { name: 'Hasty', increased: 'speed', decreased: 'defense', description: '+Speed, -Defense' },
  { name: 'Serious', increased: null, decreased: null, description: 'Neutral' },
  { name: 'Jolly', increased: 'speed', decreased: 'spAtk', description: '+Speed, -Sp. Atk' },
  { name: 'Naive', increased: 'speed', decreased: 'spDef', description: '+Speed, -Sp. Def' },
  { name: 'Modest', increased: 'spAtk', decreased: 'attack', description: '+Sp. Atk, -Attack' },
  { name: 'Mild', increased: 'spAtk', decreased: 'defense', description: '+Sp. Atk, -Defense' },
  { name: 'Quiet', increased: 'spAtk', decreased: 'speed', description: '+Sp. Atk, -Speed' },
  { name: 'Bashful', increased: null, decreased: null, description: 'Neutral' },
  { name: 'Rash', increased: 'spAtk', decreased: 'spDef', description: '+Sp. Atk, -Sp. Def' },
  { name: 'Calm', increased: 'spDef', decreased: 'attack', description: '+Sp. Def, -Attack' },
  { name: 'Gentle', increased: 'spDef', decreased: 'defense', description: '+Sp. Def, -Defense' },
  { name: 'Sassy', increased: 'spDef', decreased: 'speed', description: '+Sp. Def, -Speed' },
  { name: 'Careful', increased: 'spDef', decreased: 'spAtk', description: '+Sp. Def, -Sp. Atk' },
  { name: 'Quirky', increased: null, decreased: null, description: 'Neutral' },
];

export function getArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function getShinyArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;
}

// Fisher-Yates Shuffle implementation for deterministic random team generation
export function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
