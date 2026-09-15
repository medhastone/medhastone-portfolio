import { Pokemon, LEGENDARY_AND_MYTHICAL_IDS, getArtworkUrl, getSpriteUrl } from './pokemonData';

// Fallback curated dataset covering Gens 1-9 for instant zero-network offline loading
export const FALLBACK_POKEMON_LIST: Pokemon[] = [
  // Gen 1 (Kanto)
  { id: 1, name: 'Bulbasaur', types: ['grass', 'poison'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 45, attack: 49, defense: 49, spAtk: 65, spDef: 65, speed: 45, total: 318 }, spriteUrl: getSpriteUrl(1), officialArtworkUrl: getArtworkUrl(1) },
  { id: 4, name: 'Charmander', types: ['fire'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 39, attack: 52, defense: 43, spAtk: 60, spDef: 50, speed: 65, total: 309 }, spriteUrl: getSpriteUrl(4), officialArtworkUrl: getArtworkUrl(4) },
  { id: 6, name: 'Charizard', types: ['fire', 'flying'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 78, attack: 84, defense: 78, spAtk: 109, spDef: 85, speed: 100, total: 534 }, spriteUrl: getSpriteUrl(6), officialArtworkUrl: getArtworkUrl(6) },
  { id: 7, name: 'Squirtle', types: ['water'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 44, attack: 48, defense: 65, spAtk: 50, spDef: 64, speed: 43, total: 314 }, spriteUrl: getSpriteUrl(7), officialArtworkUrl: getArtworkUrl(7) },
  { id: 9, name: 'Blastoise', types: ['water'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 79, attack: 83, defense: 100, spAtk: 85, spDef: 105, speed: 78, total: 530 }, spriteUrl: getSpriteUrl(9), officialArtworkUrl: getArtworkUrl(9) },
  { id: 25, name: 'Pikachu', types: ['electric'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 35, attack: 55, defense: 40, spAtk: 50, spDef: 50, speed: 90, total: 320 }, spriteUrl: getSpriteUrl(25), officialArtworkUrl: getArtworkUrl(25) },
  { id: 59, name: 'Arcanine', types: ['fire'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 90, attack: 110, defense: 80, spAtk: 100, spDef: 80, speed: 95, total: 555 }, spriteUrl: getSpriteUrl(59), officialArtworkUrl: getArtworkUrl(59) },
  { id: 94, name: 'Gengar', types: ['ghost', 'poison'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 60, attack: 65, defense: 60, spAtk: 130, spDef: 75, speed: 110, total: 500 }, spriteUrl: getSpriteUrl(94), officialArtworkUrl: getArtworkUrl(94) },
  { id: 130, name: 'Gyarados', types: ['water', 'flying'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 95, attack: 125, defense: 79, spAtk: 60, spDef: 100, speed: 81, total: 540 }, spriteUrl: getSpriteUrl(130), officialArtworkUrl: getArtworkUrl(130) },
  { id: 131, name: 'Lapras', types: ['water', 'ice'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 130, attack: 85, defense: 80, spAtk: 85, spDef: 95, speed: 60, total: 535 }, spriteUrl: getSpriteUrl(131), officialArtworkUrl: getArtworkUrl(131) },
  { id: 133, name: 'Eevee', types: ['normal'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 55, attack: 55, defense: 50, spAtk: 45, spDef: 65, speed: 55, total: 325 }, spriteUrl: getSpriteUrl(133), officialArtworkUrl: getArtworkUrl(133) },
  { id: 143, name: 'Snorlax', types: ['normal'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 160, attack: 110, defense: 65, spAtk: 65, spDef: 110, speed: 30, total: 540 }, spriteUrl: getSpriteUrl(143), officialArtworkUrl: getArtworkUrl(143) },
  { id: 149, name: 'Dragonite', types: ['dragon', 'flying'], gen: 1, isLegendary: false, isMythical: false, stats: { hp: 91, attack: 134, defense: 95, spAtk: 100, spDef: 100, speed: 80, total: 600 }, spriteUrl: getSpriteUrl(149), officialArtworkUrl: getArtworkUrl(149) },
  { id: 150, name: 'Mewtwo', types: ['psychic'], gen: 1, isLegendary: true, isMythical: false, stats: { hp: 106, attack: 110, defense: 90, spAtk: 154, spDef: 90, speed: 130, total: 680 }, spriteUrl: getSpriteUrl(150), officialArtworkUrl: getArtworkUrl(150) },
  { id: 151, name: 'Mew', types: ['psychic'], gen: 1, isLegendary: false, isMythical: true, stats: { hp: 100, attack: 100, defense: 100, spAtk: 100, spDef: 100, speed: 100, total: 600 }, spriteUrl: getSpriteUrl(151), officialArtworkUrl: getArtworkUrl(151) },

  // Gen 2 (Johto)
  { id: 155, name: 'Cyndaquil', types: ['fire'], gen: 2, isLegendary: false, isMythical: false, stats: { hp: 39, attack: 52, defense: 43, spAtk: 60, spDef: 50, speed: 65, total: 309 }, spriteUrl: getSpriteUrl(155), officialArtworkUrl: getArtworkUrl(155) },
  { id: 157, name: 'Typhlosion', types: ['fire'], gen: 2, isLegendary: false, isMythical: false, stats: { hp: 78, attack: 84, defense: 78, spAtk: 109, spDef: 85, speed: 100, total: 534 }, spriteUrl: getSpriteUrl(157), officialArtworkUrl: getArtworkUrl(157) },
  { id: 158, name: 'Totodile', types: ['water'], gen: 2, isLegendary: false, isMythical: false, stats: { hp: 50, attack: 65, defense: 64, spAtk: 44, spDef: 48, speed: 43, total: 314 }, spriteUrl: getSpriteUrl(158), officialArtworkUrl: getArtworkUrl(158) },
  { id: 160, name: 'Feraligatr', types: ['water'], gen: 2, isLegendary: false, isMythical: false, stats: { hp: 85, attack: 105, defense: 100, spAtk: 79, spDef: 83, speed: 78, total: 530 }, spriteUrl: getSpriteUrl(160), officialArtworkUrl: getArtworkUrl(160) },
  { id: 196, name: 'Espeon', types: ['psychic'], gen: 2, isLegendary: false, isMythical: false, stats: { hp: 65, attack: 65, defense: 60, spAtk: 130, spDef: 95, speed: 110, total: 525 }, spriteUrl: getSpriteUrl(196), officialArtworkUrl: getArtworkUrl(196) },
  { id: 197, name: 'Umbreon', types: ['dark'], gen: 2, isLegendary: false, isMythical: false, stats: { hp: 95, attack: 65, defense: 110, spAtk: 60, spDef: 130, speed: 65, total: 525 }, spriteUrl: getSpriteUrl(197), officialArtworkUrl: getArtworkUrl(197) },
  { id: 212, name: 'Scizor', types: ['bug', 'steel'], gen: 2, isLegendary: false, isMythical: false, stats: { hp: 70, attack: 130, defense: 100, spAtk: 55, spDef: 80, speed: 65, total: 500 }, spriteUrl: getSpriteUrl(212), officialArtworkUrl: getArtworkUrl(212) },
  { id: 248, name: 'Tyranitar', types: ['rock', 'dark'], gen: 2, isLegendary: false, isMythical: false, stats: { hp: 100, attack: 134, defense: 110, spAtk: 95, spDef: 100, speed: 61, total: 600 }, spriteUrl: getSpriteUrl(248), officialArtworkUrl: getArtworkUrl(248) },
  { id: 249, name: 'Lugia', types: ['psychic', 'flying'], gen: 2, isLegendary: true, isMythical: false, stats: { hp: 106, attack: 90, defense: 130, spAtk: 90, spDef: 154, speed: 110, total: 680 }, spriteUrl: getSpriteUrl(249), officialArtworkUrl: getArtworkUrl(249) },
  { id: 250, name: 'Ho-Oh', types: ['fire', 'flying'], gen: 2, isLegendary: true, isMythical: false, stats: { hp: 106, attack: 130, defense: 90, spAtk: 110, spDef: 154, speed: 90, total: 680 }, spriteUrl: getSpriteUrl(250), officialArtworkUrl: getArtworkUrl(250) },

  // Gen 3 (Hoenn)
  { id: 254, name: 'Sceptile', types: ['grass'], gen: 3, isLegendary: false, isMythical: false, stats: { hp: 70, attack: 85, defense: 65, spAtk: 105, spDef: 85, speed: 120, total: 530 }, spriteUrl: getSpriteUrl(254), officialArtworkUrl: getArtworkUrl(254) },
  { id: 257, name: 'Blaziken', types: ['fire', 'fighting'], gen: 3, isLegendary: false, isMythical: false, stats: { hp: 80, attack: 120, defense: 70, spAtk: 110, spDef: 70, speed: 80, total: 530 }, spriteUrl: getSpriteUrl(257), officialArtworkUrl: getArtworkUrl(257) },
  { id: 260, name: 'Swampert', types: ['water', 'ground'], gen: 3, isLegendary: false, isMythical: false, stats: { hp: 100, attack: 110, defense: 90, spAtk: 85, spDef: 90, speed: 60, total: 535 }, spriteUrl: getSpriteUrl(260), officialArtworkUrl: getArtworkUrl(260) },
  { id: 282, name: 'Gardevoir', types: ['psychic', 'fairy'], gen: 3, isLegendary: false, isMythical: false, stats: { hp: 68, attack: 65, defense: 65, spAtk: 125, spDef: 115, speed: 80, total: 518 }, spriteUrl: getSpriteUrl(282), officialArtworkUrl: getArtworkUrl(282) },
  { id: 373, name: 'Salamence', types: ['dragon', 'flying'], gen: 3, isLegendary: false, isMythical: false, stats: { hp: 95, attack: 135, defense: 80, spAtk: 110, spDef: 80, speed: 100, total: 600 }, spriteUrl: getSpriteUrl(373), officialArtworkUrl: getArtworkUrl(373) },
  { id: 376, name: 'Metagross', types: ['steel', 'psychic'], gen: 3, isLegendary: false, isMythical: false, stats: { hp: 80, attack: 135, defense: 130, spAtk: 95, spDef: 90, speed: 70, total: 600 }, spriteUrl: getSpriteUrl(376), officialArtworkUrl: getArtworkUrl(376) },
  { id: 382, name: 'Kyogre', types: ['water'], gen: 3, isLegendary: true, isMythical: false, stats: { hp: 100, attack: 100, defense: 90, spAtk: 150, spDef: 140, speed: 90, total: 670 }, spriteUrl: getSpriteUrl(382), officialArtworkUrl: getArtworkUrl(382) },
  { id: 383, name: 'Groudon', types: ['ground'], gen: 3, isLegendary: true, isMythical: false, stats: { hp: 100, attack: 150, defense: 140, spAtk: 100, spDef: 90, speed: 90, total: 670 }, spriteUrl: getSpriteUrl(383), officialArtworkUrl: getArtworkUrl(383) },
  { id: 384, name: 'Rayquaza', types: ['dragon', 'flying'], gen: 3, isLegendary: true, isMythical: false, stats: { hp: 105, attack: 150, defense: 90, spAtk: 150, spDef: 90, speed: 95, total: 680 }, spriteUrl: getSpriteUrl(384), officialArtworkUrl: getArtworkUrl(384) },

  // Gen 4 (Sinnoh)
  { id: 389, name: 'Torterra', types: ['grass', 'ground'], gen: 4, isLegendary: false, isMythical: false, stats: { hp: 95, attack: 109, defense: 105, spAtk: 75, spDef: 85, speed: 56, total: 525 }, spriteUrl: getSpriteUrl(389), officialArtworkUrl: getArtworkUrl(389) },
  { id: 392, name: 'Infernape', types: ['fire', 'fighting'], gen: 4, isLegendary: false, isMythical: false, stats: { hp: 76, attack: 104, defense: 71, spAtk: 104, spDef: 71, speed: 108, total: 534 }, spriteUrl: getSpriteUrl(392), officialArtworkUrl: getArtworkUrl(392) },
  { id: 395, name: 'Empoleon', types: ['water', 'steel'], gen: 4, isLegendary: false, isMythical: false, stats: { hp: 84, attack: 86, defense: 88, spAtk: 111, spDef: 101, speed: 60, total: 530 }, spriteUrl: getSpriteUrl(395), officialArtworkUrl: getArtworkUrl(395) },
  { id: 448, name: 'Lucario', types: ['fighting', 'steel'], gen: 4, isLegendary: false, isMythical: false, stats: { hp: 70, attack: 110, defense: 70, spAtk: 115, spDef: 70, speed: 90, total: 525 }, spriteUrl: getSpriteUrl(448), officialArtworkUrl: getArtworkUrl(448) },
  { id: 445, name: 'Garchomp', types: ['dragon', 'ground'], gen: 4, isLegendary: false, isMythical: false, stats: { hp: 108, attack: 130, defense: 95, spAtk: 80, spDef: 85, speed: 102, total: 600 }, spriteUrl: getSpriteUrl(445), officialArtworkUrl: getArtworkUrl(445) },
  { id: 470, name: 'Leafeon', types: ['grass'], gen: 4, isLegendary: false, isMythical: false, stats: { hp: 65, attack: 110, defense: 130, spAtk: 60, spDef: 65, speed: 95, total: 525 }, spriteUrl: getSpriteUrl(470), officialArtworkUrl: getArtworkUrl(470) },
  { id: 471, name: 'Glaceon', types: ['ice'], gen: 4, isLegendary: false, isMythical: false, stats: { hp: 65, attack: 60, defense: 110, spAtk: 130, spDef: 95, speed: 65, total: 525 }, spriteUrl: getSpriteUrl(471), officialArtworkUrl: getArtworkUrl(471) },
  { id: 483, name: 'Dialga', types: ['steel', 'dragon'], gen: 4, isLegendary: true, isMythical: false, stats: { hp: 100, attack: 120, defense: 120, spAtk: 150, spDef: 100, speed: 90, total: 680 }, spriteUrl: getSpriteUrl(483), officialArtworkUrl: getArtworkUrl(483) },
  { id: 484, name: 'Palkia', types: ['water', 'dragon'], gen: 4, isLegendary: true, isMythical: false, stats: { hp: 90, attack: 120, defense: 100, spAtk: 150, spDef: 120, speed: 100, total: 680 }, spriteUrl: getSpriteUrl(484), officialArtworkUrl: getArtworkUrl(484) },
  { id: 487, name: 'Giratina', types: ['ghost', 'dragon'], gen: 4, isLegendary: true, isMythical: false, stats: { hp: 150, attack: 100, defense: 120, spAtk: 100, spDef: 120, speed: 90, total: 680 }, spriteUrl: getSpriteUrl(487), officialArtworkUrl: getArtworkUrl(487) },
  { id: 493, name: 'Arceus', types: ['normal'], gen: 4, isLegendary: false, isMythical: true, stats: { hp: 120, attack: 120, defense: 120, spAtk: 120, spDef: 120, speed: 120, total: 720 }, spriteUrl: getSpriteUrl(493), officialArtworkUrl: getArtworkUrl(493) },

  // Gen 5 (Unova)
  { id: 497, name: 'Serperior', types: ['grass'], gen: 5, isLegendary: false, isMythical: false, stats: { hp: 75, attack: 75, defense: 95, spAtk: 75, spDef: 95, speed: 113, total: 528 }, spriteUrl: getSpriteUrl(497), officialArtworkUrl: getArtworkUrl(497) },
  { id: 500, name: 'Emboar', types: ['fire', 'fighting'], gen: 5, isLegendary: false, isMythical: false, stats: { hp: 110, attack: 123, defense: 65, spAtk: 100, spDef: 65, speed: 65, total: 528 }, spriteUrl: getSpriteUrl(500), officialArtworkUrl: getArtworkUrl(500) },
  { id: 503, name: 'Samurott', types: ['water'], gen: 5, isLegendary: false, isMythical: false, stats: { hp: 95, attack: 100, defense: 85, spAtk: 108, spDef: 70, speed: 70, total: 528 }, spriteUrl: getSpriteUrl(503), officialArtworkUrl: getArtworkUrl(503) },
  { id: 571, name: 'Zoroark', types: ['dark'], gen: 5, isLegendary: false, isMythical: false, stats: { hp: 60, attack: 105, defense: 60, spAtk: 120, spDef: 60, speed: 105, total: 510 }, spriteUrl: getSpriteUrl(571), officialArtworkUrl: getArtworkUrl(571) },
  { id: 609, name: 'Chandelure', types: ['ghost', 'fire'], gen: 5, isLegendary: false, isMythical: false, stats: { hp: 60, attack: 55, defense: 90, spAtk: 145, spDef: 90, speed: 80, total: 520 }, spriteUrl: getSpriteUrl(609), officialArtworkUrl: getArtworkUrl(609) },
  { id: 635, name: 'Hydreigon', types: ['dark', 'dragon'], gen: 5, isLegendary: false, isMythical: false, stats: { hp: 92, attack: 105, defense: 90, spAtk: 125, spDef: 90, speed: 98, total: 600 }, spriteUrl: getSpriteUrl(635), officialArtworkUrl: getArtworkUrl(635) },
  { id: 643, name: 'Reshiram', types: ['dragon', 'fire'], gen: 5, isLegendary: true, isMythical: false, stats: { hp: 100, attack: 120, defense: 100, spAtk: 150, spDef: 120, speed: 90, total: 680 }, spriteUrl: getSpriteUrl(643), officialArtworkUrl: getArtworkUrl(643) },
  { id: 644, name: 'Zekrom', types: ['dragon', 'electric'], gen: 5, isLegendary: true, isMythical: false, stats: { hp: 100, attack: 150, defense: 120, spAtk: 120, spDef: 100, speed: 90, total: 680 }, spriteUrl: getSpriteUrl(644), officialArtworkUrl: getArtworkUrl(644) },

  // Gen 6 (Kalos)
  { id: 658, name: 'Greninja', types: ['water', 'dark'], gen: 6, isLegendary: false, isMythical: false, stats: { hp: 72, attack: 95, defense: 67, spAtk: 103, spDef: 71, speed: 122, total: 530 }, spriteUrl: getSpriteUrl(658), officialArtworkUrl: getArtworkUrl(658) },
  { id: 655, name: 'Delphox', types: ['fire', 'psychic'], gen: 6, isLegendary: false, isMythical: false, stats: { hp: 75, attack: 69, defense: 72, spAtk: 114, spDef: 100, speed: 104, total: 534 }, spriteUrl: getSpriteUrl(655), officialArtworkUrl: getArtworkUrl(655) },
  { id: 652, name: 'Chesnaught', types: ['grass', 'fighting'], gen: 6, isLegendary: false, isMythical: false, stats: { hp: 88, attack: 107, defense: 122, spAtk: 74, spDef: 75, speed: 64, total: 530 }, spriteUrl: getSpriteUrl(652), officialArtworkUrl: getArtworkUrl(652) },
  { id: 700, name: 'Sylveon', types: ['fairy'], gen: 6, isLegendary: false, isMythical: false, stats: { hp: 95, attack: 65, defense: 65, spAtk: 110, spDef: 130, speed: 60, total: 525 }, spriteUrl: getSpriteUrl(700), officialArtworkUrl: getArtworkUrl(700) },
  { id: 706, name: 'Goodra', types: ['dragon'], gen: 6, isLegendary: false, isMythical: false, stats: { hp: 90, attack: 100, defense: 70, spAtk: 110, spDef: 150, speed: 80, total: 600 }, spriteUrl: getSpriteUrl(706), officialArtworkUrl: getArtworkUrl(706) },
  { id: 716, name: 'Xerneas', types: ['fairy'], gen: 6, isLegendary: true, isMythical: false, stats: { hp: 126, attack: 131, defense: 95, spAtk: 131, spDef: 98, speed: 99, total: 680 }, spriteUrl: getSpriteUrl(716), officialArtworkUrl: getArtworkUrl(716) },
  { id: 717, name: 'Yveltal', types: ['dark', 'flying'], gen: 6, isLegendary: true, isMythical: false, stats: { hp: 126, attack: 131, defense: 95, spAtk: 131, spDef: 98, speed: 99, total: 680 }, spriteUrl: getSpriteUrl(717), officialArtworkUrl: getArtworkUrl(717) },

  // Gen 7 (Alola)
  { id: 724, name: 'Decidueye', types: ['grass', 'ghost'], gen: 7, isLegendary: false, isMythical: false, stats: { hp: 78, attack: 107, defense: 75, spAtk: 100, spDef: 100, speed: 70, total: 530 }, spriteUrl: getSpriteUrl(724), officialArtworkUrl: getArtworkUrl(724) },
  { id: 727, name: 'Incineroar', types: ['fire', 'dark'], gen: 7, isLegendary: false, isMythical: false, stats: { hp: 95, attack: 115, defense: 90, spAtk: 80, spDef: 90, speed: 60, total: 530 }, spriteUrl: getSpriteUrl(727), officialArtworkUrl: getArtworkUrl(727) },
  { id: 730, name: 'Primarina', types: ['water', 'fairy'], gen: 7, isLegendary: false, isMythical: false, stats: { hp: 80, attack: 74, defense: 74, spAtk: 126, spDef: 116, speed: 60, total: 530 }, spriteUrl: getSpriteUrl(730), officialArtworkUrl: getArtworkUrl(730) },
  { id: 778, name: 'Mimikyu', types: ['ghost', 'fairy'], gen: 7, isLegendary: false, isMythical: false, stats: { hp: 55, attack: 90, defense: 80, spAtk: 50, spDef: 105, speed: 96, total: 476 }, spriteUrl: getSpriteUrl(778), officialArtworkUrl: getArtworkUrl(778) },
  { id: 784, name: 'Kommo-o', types: ['dragon', 'fighting'], gen: 7, isLegendary: false, isMythical: false, stats: { hp: 75, attack: 110, defense: 125, spAtk: 100, spDef: 105, speed: 85, total: 600 }, spriteUrl: getSpriteUrl(784), officialArtworkUrl: getArtworkUrl(784) },
  { id: 791, name: 'Solgaleo', types: ['psychic', 'steel'], gen: 7, isLegendary: true, isMythical: false, stats: { hp: 137, attack: 137, defense: 107, spAtk: 113, spDef: 89, speed: 97, total: 680 }, spriteUrl: getSpriteUrl(791), officialArtworkUrl: getArtworkUrl(791) },
  { id: 792, name: 'Lunala', types: ['psychic', 'ghost'], gen: 7, isLegendary: true, isMythical: false, stats: { hp: 137, attack: 113, defense: 89, spAtk: 137, spDef: 107, speed: 97, total: 680 }, spriteUrl: getSpriteUrl(792), officialArtworkUrl: getArtworkUrl(792) },

  // Gen 8 (Galar)
  { id: 812, name: 'Rillaboom', types: ['grass'], gen: 8, isLegendary: false, isMythical: false, stats: { hp: 100, attack: 125, defense: 90, spAtk: 60, spDef: 70, speed: 85, total: 530 }, spriteUrl: getSpriteUrl(812), officialArtworkUrl: getArtworkUrl(812) },
  { id: 815, name: 'Cinderace', types: ['fire'], gen: 8, isLegendary: false, isMythical: false, stats: { hp: 80, attack: 116, defense: 75, spAtk: 65, spDef: 75, speed: 119, total: 530 }, spriteUrl: getSpriteUrl(815), officialArtworkUrl: getArtworkUrl(815) },
  { id: 818, name: 'Inteleon', types: ['water'], gen: 8, isLegendary: false, isMythical: false, stats: { hp: 70, attack: 85, defense: 65, spAtk: 125, spDef: 65, speed: 120, total: 530 }, spriteUrl: getSpriteUrl(818), officialArtworkUrl: getArtworkUrl(818) },
  { id: 887, name: 'Dragapult', types: ['dragon', 'ghost'], gen: 8, isLegendary: false, isMythical: false, stats: { hp: 88, attack: 120, defense: 75, spAtk: 100, spDef: 75, speed: 142, total: 600 }, spriteUrl: getSpriteUrl(887), officialArtworkUrl: getArtworkUrl(887) },
  { id: 888, name: 'Zacian', types: ['fairy', 'steel'], gen: 8, isLegendary: true, isMythical: false, stats: { hp: 92, attack: 170, defense: 115, spAtk: 80, spDef: 115, speed: 148, total: 720 }, spriteUrl: getSpriteUrl(888), officialArtworkUrl: getArtworkUrl(888) },
  { id: 889, name: 'Zamazenta', types: ['fighting', 'steel'], gen: 8, isLegendary: true, isMythical: false, stats: { hp: 92, attack: 130, defense: 145, spAtk: 80, spDef: 145, speed: 128, total: 720 }, spriteUrl: getSpriteUrl(889), officialArtworkUrl: getArtworkUrl(889) },

  // Gen 9 (Paldea)
  { id: 908, name: 'Meowscarada', types: ['grass', 'dark'], gen: 9, isLegendary: false, isMythical: false, stats: { hp: 76, attack: 110, defense: 70, spAtk: 81, spDef: 70, speed: 123, total: 530 }, spriteUrl: getSpriteUrl(908), officialArtworkUrl: getArtworkUrl(908) },
  { id: 911, name: 'Skeledirge', types: ['fire', 'ghost'], gen: 9, isLegendary: false, isMythical: false, stats: { hp: 104, attack: 75, defense: 100, spAtk: 110, spDef: 75, speed: 66, total: 530 }, spriteUrl: getSpriteUrl(911), officialArtworkUrl: getArtworkUrl(911) },
  { id: 914, name: 'Quaquaval', types: ['water', 'fighting'], gen: 9, isLegendary: false, isMythical: false, stats: { hp: 85, attack: 120, defense: 80, spAtk: 85, spDef: 75, speed: 85, total: 530 }, spriteUrl: getSpriteUrl(914), officialArtworkUrl: getArtworkUrl(914) },
  { id: 937, name: 'Ceruledge', types: ['fire', 'ghost'], gen: 9, isLegendary: false, isMythical: false, stats: { hp: 75, attack: 125, defense: 80, spAtk: 60, spDef: 100, speed: 85, total: 525 }, spriteUrl: getSpriteUrl(937), officialArtworkUrl: getArtworkUrl(937) },
  { id: 936, name: 'Armarouge', types: ['fire', 'psychic'], gen: 9, isLegendary: false, isMythical: false, stats: { hp: 85, attack: 60, defense: 100, spAtk: 125, spDef: 80, speed: 75, total: 525 }, spriteUrl: getSpriteUrl(936), officialArtworkUrl: getArtworkUrl(936) },
  { id: 959, name: 'Tinkaton', types: ['fairy', 'steel'], gen: 9, isLegendary: false, isMythical: false, stats: { hp: 85, attack: 75, defense: 77, spAtk: 70, spDef: 105, speed: 94, total: 506 }, spriteUrl: getSpriteUrl(959), officialArtworkUrl: getArtworkUrl(959) },
  { id: 987, name: 'Flutter Mane', types: ['ghost', 'fairy'], gen: 9, isLegendary: false, isMythical: false, stats: { hp: 55, attack: 55, defense: 55, spAtk: 135, spDef: 135, speed: 135, total: 570 }, spriteUrl: getSpriteUrl(987), officialArtworkUrl: getArtworkUrl(987) },
  { id: 1007, name: 'Koraidon', types: ['fighting', 'dragon'], gen: 9, isLegendary: true, isMythical: false, stats: { hp: 100, attack: 135, defense: 115, spAtk: 85, spDef: 100, speed: 135, total: 670 }, spriteUrl: getSpriteUrl(1007), officialArtworkUrl: getArtworkUrl(1007) },
  { id: 1008, name: 'Miraidon', types: ['electric', 'dragon'], gen: 9, isLegendary: true, isMythical: false, stats: { hp: 100, attack: 85, defense: 100, spAtk: 135, spDef: 115, speed: 135, total: 670 }, spriteUrl: getSpriteUrl(1008), officialArtworkUrl: getArtworkUrl(1008) }
];

// Helper to calculate Generation by national ID
export function getGenById(id: number): number {
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  if (id <= 493) return 4;
  if (id <= 649) return 5;
  if (id <= 721) return 6;
  if (id <= 809) return 7;
  if (id <= 905) return 8;
  return 9;
}

// LocalStorage cache key for PokéAPI dynamic list
const POKE_CACHE_KEY = 'pokemon_master_db_v2';

// Async loader to fetch full PokeAPI index (up to 1025) and store in localStorage
export async function loadFullPokemonDatabase(): Promise<Pokemon[]> {
  try {
    const cached = localStorage.getItem(POKE_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 300) {
        return parsed;
      }
    }
    
    // Return fallback immediately if no cache to avoid the hanging issue
    // We can populate cache in the background
    fetchAndCacheDb();
    
    return FALLBACK_POKEMON_LIST;
  } catch (err) {
    console.warn('PokéAPI fetch failed, falling back to offline database:', err);
    return FALLBACK_POKEMON_LIST;
  }
}

async function fetchAndCacheDb() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
    if (!response.ok) return;

    const data = await response.json();
    const results: { name: string; url: string }[] = data.results || [];

    const masterList: Pokemon[] = results.map((item, idx) => {
      const id = idx + 1;
      const name = item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/-/g, ' ');
      const gen = getGenById(id);
      const isLeg = LEGENDARY_AND_MYTHICAL_IDS.has(id);
      
      const fallback = FALLBACK_POKEMON_LIST.find(p => p.id === id);

      return {
        id,
        name,
        types: fallback ? fallback.types : ['normal'],
        gen,
        isLegendary: isLeg,
        isMythical: isLeg,
        stats: fallback ? fallback.stats : { hp: 70, attack: 70, defense: 70, spAtk: 70, spDef: 70, speed: 70, total: 420 },
        spriteUrl: getSpriteUrl(id),
        officialArtworkUrl: getArtworkUrl(id)
      };
    });

    localStorage.setItem(POKE_CACHE_KEY, JSON.stringify(masterList));
  } catch (e) {
    // ignore background cache failures
  }
}
