import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Zap, 
  ShieldCheck, 
  Compass, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { PokemonType, TYPE_COLORS } from '../../data/pokemonData';

export type PokemonToolId = 'generator' | 'compare' | 'favorites' | 'quiz' | 'nicknames' | 'ivcalc' | 'nuzlocke';

interface ToolSeoData {
  toolId: PokemonToolId;
  urlPath: string;
  pageTitle: string;
  metaH1: string;
  metaSubtitle: string;
  keyHighlights: { title: string; desc: string }[];
  guideParagraphs: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
  relatedTools: { id: PokemonToolId; label: string; path: string; desc: string }[];
}

export const POKEMON_TOOLS_SEO_DATA: Record<PokemonToolId, ToolSeoData> = {
  generator: {
    toolId: 'generator',
    urlPath: '/random-pokemon-generator',
    pageTitle: 'Random Pokémon Generator (Gens 1-9) | Competitive Team Builder & Shiny Picker',
    metaH1: 'Random Pokémon Generator & Competitive Team Builder',
    metaSubtitle: 'Generate balanced battle squads with a competitive pokemon team generator. Roll all generations random pokemon 1-9 with legendary filters, shiny variants, audio cries, and Pokémon Showdown export.',
    keyHighlights: [
      { title: 'All Generations Random Pokémon 1–9', desc: 'Roll Pokémon from Kanto to Paldea including Scarlet & Violet DLC and starter evolutions with our complete all generations random pokemon 1-9 database.' },
      { title: 'Competitive Pokémon Team Generator', desc: 'Assemble tournament-viable rosters. Filter by Basic or Fully Evolved species, single or dual typing, and toggle Legendary or Paradox species.' },
      { title: 'Random Pokémon Picker with Shiny Variants', desc: 'Test your luck with authentic shiny odds, toggle full shiny rosters, and enjoy authentic Web Audio cries for every species.' },
      { title: 'Showdown Exporter & Synergy Matrix', desc: 'Export tournament-ready text pastes directly into Pokémon Showdown and evaluate team defensive coverage in real time.' }
    ],
    guideParagraphs: [
      {
        heading: 'How Does This Random Pokémon Generator Work?',
        body: 'Whether you are drafting a battle roster with friends or brainstorming an unexpected squad, this random pokemon generator leverages a cryptographic Fisher-Yates shuffle algorithm across the entire official Pokédex. Acting as a flexible pokemon team builder, you can set custom team sizes from 1 to 6 Pokémon, choose your desired generation range, and lock key team members in place while re-rolling the rest of your squad.'
      },
      {
        heading: 'Versatile Random Pokémon Picker with Shiny Variants & Audio Cries',
        body: 'Looking to add rare flair to your team? Our random pokemon picker with shiny capabilities gives you full control over alternate colorations. Toggle 1/512 or 1/4096 authentic odds, turn individual team slots shiny with a single tap, and listen to authentic battle cries synthesized through the browser Web Audio API before locking in your picks.'
      },
      {
        heading: 'Integrated Pokémon Showdown Team Exporter',
        body: 'Ready to test your lineup on the competitive ladder? The built-in pokemon showdown team exporter generates a complete, tournament-compliant text paste for your squad. Each export comes populated with standard competitive natures, optimal EV spreads, held battle items, and signature move pools that you can copy or download to paste directly into the Pokémon Showdown teambuilder.'
      },
      {
        heading: 'Dynamic Pokémon Weakness Synergy Calculator & Type Matrix',
        body: 'Great teams require airtight defensive balance. The real-time pokemon weakness synergy calculator updates beneath your active roster, calculating cumulative 4x, 2x, 1x, 0.5x, 0.25x, and 0x immunities across all 18 elemental types. Spotting shared weaknesses—such as overlapping vulnerabilities to Ice or Ground—lets you make strategic substitutions before jumping into battle.'
      },
      {
        heading: 'Full Dex Coverage for All Generations Random Pokémon 1-9',
        body: 'Explore the complete history of Pokémon battles. Our database covers all generations random pokemon 1-9, spanning the original Kanto 151 through Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, and the newest Paldea species, including regional forms, Paradox Pokémon, and Ultra Beasts.'
      },
      {
        heading: 'Nuzlocke Random Starter Generator & Challenge Playthroughs',
        body: 'Embarking on a hardcore challenge run? Use our stage and regional filters as a nuzlocke random starter generator to pick your initial partner or generate route-by-route encounters that comply with classic Nuzlocke species clauses and Gym Leader level caps.'
      }
    ],
    faqs: [
      {
        q: 'How does this competitive pokemon team generator balance battle rosters?',
        a: 'You can exclude Legendaries, Mythicals, Ultra Beasts, and Paradox Pokémon to generate balanced competitive tiers, or toggle fully-evolved filters to ensure all team members possess viable Base Stat Totals (BST).'
      },
      {
        q: 'Can I use this as a nuzlocke random starter generator?',
        a: 'Yes! Select a team size of 1 and set the evolution stage filter to "Basic only" to roll a random starter companion for your next Nuzlocke challenge run.'
      },
      {
        q: 'How do I export my team using the pokemon showdown team exporter?',
        a: 'Click the "Export to Showdown" button above the lineup. A modal will display formatted competitive sets ready to be copied or downloaded directly into Pokémon Showdown.'
      },
      {
        q: 'Does the pokemon weakness synergy calculator consider dual typings?',
        a: 'Yes, the synergy calculator multiplies both type defensive interactions for dual-type Pokémon, accurately reporting quad weaknesses (4x) and quad resistances (0.25x) as well as type immunities.'
      },
      {
        q: 'How do I export my team as an image?',
        a: 'Click the "Download Team Image" button. Our rendering engine converts your active lineup into a high-resolution PNG card complete with sprites, typing badges, and base stat bars.'
      }
    ],
    relatedTools: [
      { id: 'compare', label: 'Compare Pokémon', path: '/pokemon-compare', desc: 'Compare base stats, type advantages, and battle outcomes side-by-side.' },
      { id: 'favorites', label: 'Favorite Tournament', path: '/pokemon-favorite-tournament', desc: 'Rank your personal Top 10 Pokémon through 1v1 bracket elimination.' },
      { id: 'ivcalc', label: 'IV & Stat Calculator', path: '/pokemon-iv-calculator', desc: 'Calculate exact HP and battle stats at any level with custom IVs and EVs.' }
    ]
  },

  compare: {
    toolId: 'compare',
    urlPath: '/pokemon-compare',
    pageTitle: 'Compare Pokémon (Head-to-Head) | Base Stats, Type Matchups & Battle Simulator',
    metaH1: 'Compare Pokémon: Head-to-Head Battle & Stat Comparator',
    metaSubtitle: 'Side-by-side analysis of any two Pokémon species. Compare Base Stat Totals (BST), speed tiers, STAB type advantages, and battle simulations.',
    keyHighlights: [
      { title: 'Interactive Dual Stat Radar', desc: 'Visual side-by-side comparison bars for HP, Attack, Defense, Sp. Atk, Sp. Def, and Speed.' },
      { title: 'Offensive & Defensive Matchup Analysis', desc: 'Real-time calculation of STAB damage multipliers between both Pokémon types.' },
      { title: 'Speed Tier Check', desc: 'Identifies who strikes first and has priority turn advantage in competitive battles.' },
      { title: 'Cry Playback & Official Artwork', desc: 'Listen to cries and view high-resolution official Pokémon artwork for both combatants.' }
    ],
    guideParagraphs: [
      {
        heading: 'Why Compare Pokémon Head-to-Head?',
        body: 'Whether you are drafting a VGC competitive squad or deciding on a final team member for a mainline gym battle, comparing Pokémon side-by-side reveals hidden advantages. While a Pokémon may have a higher Base Stat Total (BST), its defensive type combination or low speed tier might make it vulnerable to high-speed glass cannons.'
      },
      {
        heading: 'Understanding Stat Differences & Speed Advantage',
        body: 'Our tool calculates the exact numerical difference across all 6 core statistics. Speed is especially critical in competitive play: whichever Pokémon hits first often secures a knockout before defensive stats can absorb sustained damage.'
      },
      {
        heading: 'Type Advantage & STAB Calculation',
        body: 'The engine cross-references the 18x18 official Pokémon type chart to determine whether Combatant A or Combatant B lands super-effective (2x / 4x) Same-Type Attack Bonus (STAB) hits, or if one species resists the other completely.'
      }
    ],
    faqs: [
      {
        q: 'How are the battle outcome predictions calculated?',
        a: 'Predictions combine speed tier dominance (first-turn initiative), offensive STAB type multipliers, and relative Base Stat Totals (BST) to determine which Pokémon holds the statistical advantage.'
      },
      {
        q: 'Can I compare Pokémon from different generations?',
        a: 'Yes! You can compare any Pokémon across Gens 1 through 9, such as Gengar (Gen 1) vs Dragapult (Gen 8) or Mewtwo vs Koraidon.'
      },
      {
        q: 'Does this tool account for Mega Evolutions or regional forms?',
        a: 'Our database contains comprehensive data for official mainline Pokédex entries, with continuous updates for regional variants.'
      }
    ],
    relatedTools: [
      { id: 'ivcalc', label: 'IV & Stat Calculator', path: '/pokemon-iv-calculator', desc: 'Calculate exact battle stats taking into account natures, IVs, and EVs.' },
      { id: 'generator', label: 'Team Generator', path: '/random-pokemon-generator', desc: 'Build a full 6-Pokémon randomized competitive battle team.' },
      { id: 'favorites', label: 'Favorite Tournament', path: '/pokemon-favorite-tournament', desc: 'Vote between pairs of Pokémon to pick your definitive favorite.' }
    ]
  },

  favorites: {
    toolId: 'favorites',
    urlPath: '/pokemon-favorite-tournament',
    pageTitle: 'Pokémon Favorite Picker Tournament | 1v1 Elimination Bracket & Top 10 Ranker',
    metaH1: 'Pokémon Favorite Picker & Elimination Tournament',
    metaSubtitle: 'Find and rank your personal Top 10 favorite Pokémon through head-to-head 1v1 match-ups. Filter by generation and elemental type.',
    keyHighlights: [
      { title: '1v1 Elimination Bracket', desc: 'Continuous pairwise comparisons eliminate choice paralysis and rank your true favorites.' },
      { title: 'Generation & Type Presets', desc: 'Run tournaments for specific generations (e.g. Gen 1 Kanto only) or favorite types (e.g. Dragon types).' },
      { title: 'Top 10 Podium Display', desc: 'Generates an Olympic-style champion podium and Top 10 ranked leaderboard upon completion.' },
      { title: 'One-Click Results Sharing', desc: 'Share your ranked results with friends or copy your top favorites with typing badges.' }
    ],
    guideParagraphs: [
      {
        heading: 'How the Favorite Pokémon Picker Works',
        body: 'Choosing among over 1,000 Pokémon is nearly impossible with a flat list. Our tournament engine uses an elimination bracket: you are presented with two Pokémon at a time. Click your favorite, and the winner advances while the runner-up is sorted into lower tier brackets. In just a few quick rounds, the algorithm calculates your definitive Top 10 roster.'
      },
      {
        heading: 'Customizing Your Tournament Pool',
        body: 'Want to discover your favorite starter Pokémon or determine the best Legendary in Kanto? Filter the competitor pool by Generation 1 through 9, or select specific elemental types like Ghost, Dragon, or Steel before starting the bracket.'
      },
      {
        heading: 'Sharing Your Personal Pokémon Leaderboard',
        body: 'When your tournament concludes, celebratory confetti marks your #1 champion. You can copy a clean text breakdown of your Top 10 favorites to paste on Twitter, Discord, Reddit, or forums.'
      }
    ],
    faqs: [
      {
        q: 'How many rounds does a tournament take?',
        a: 'Depending on your selected pool size, a standard quick tournament takes 12 to 24 pairwise choices and completes in under 2 minutes.'
      },
      {
        q: 'Can I listen to Pokémon cries while voting?',
        a: 'Yes! Every contender card in the tournament features a "Play Cry" button so you can hear their authentic battle cry before voting.'
      },
      {
        q: 'Is my tournament result saved?',
        a: 'Your final leaderboard remains on screen until you choose to start a new tournament, and you can copy your ranking anytime.'
      }
    ],
    relatedTools: [
      { id: 'quiz', label: "Who's That Pokémon?", path: '/whos-that-pokemon', desc: 'Test your Pokédex knowledge in the classic silhouette trivia mini-game.' },
      { id: 'compare', label: 'Compare Pokémon', path: '/pokemon-compare', desc: 'Compare stats and combat viability between any two Pokémon.' },
      { id: 'nicknames', label: 'Nickname Generator', path: '/pokemon-nickname-generator', desc: 'Generate creative, badass, and cute nicknames for your favorite Pokémon.' }
    ]
  },

  quiz: {
    toolId: 'quiz',
    urlPath: '/whos-that-pokemon',
    pageTitle: "Who's That Pokémon? Trivia Mini-Game | Silhouette Quiz & Sound Cries",
    metaH1: "Who's That Pokémon? Interactive Silhouette Quiz Game",
    metaSubtitle: "The classic anime Pokédex trivia mini-game! Guess the mystery Pokémon silhouette with score streaks, audio cries, and generation filters.",
    keyHighlights: [
      { title: 'Authentic Silhouette Graphics', desc: 'Pitch-black mystery shadows reveal in full color upon guessing correctly.' },
      { title: 'Real Cry Hints & Audio Fanfare', desc: 'Listen to the Pokémon cry as an audio clue before submitting your answer.' },
      { title: 'Streak Counters & Scoring', desc: 'Build consecutive correct streaks to earn multiplier points and set high scores.' },
      { title: 'Gen 1–9 Difficulty Filters', desc: 'Play with classic Gen 1 Kanto Pokémon or challenge yourself with all 9 generations.' }
    ],
    guideParagraphs: [
      {
        heading: "Relive the Classic Pokémon Commercial Break Game",
        body: "Inspired by the iconic commercial break segments from the Pokémon animated series, 'Who's That Pokémon?' challenges your visual memory. A silhouette is cast against a retro stadium backdrop—your task is to identify which Pokémon is hiding in the shadows."
      },
      {
        heading: 'Strategic Hints: Audio Cry & Typing',
        body: "Stuck on a tricky round? Click the audio cry hint button to play the official cry synthesized through your browser's Web Audio engine, or reveal the mystery Pokémon's generation and base stat total for a helpful clue."
      },
      {
        heading: 'Level Up Your Pokédex Recognition',
        body: "Switching from Gen 1 to Gen 9 forces trainers to test their knowledge of newer Paldean species, Paradox forms, and evolved lines. Try reaching a streak of 20 without missing a single round!"
      }
    ],
    faqs: [
      {
        q: 'Does the game play the official Pokémon cry?',
        a: "Yes! You can listen to the mystery Pokémon's cry as a hint, and hear it play again on the victory reveal screen."
      },
      {
        q: 'Can I restrict the quiz to just Kanto (Gen 1)?',
        a: 'Yes, use the generation selector buttons above the quiz screen to choose any combination of Gens 1 through 9.'
      },
      {
        q: 'Is there a penalty for wrong answers?',
        a: 'Wrong answers break your consecutive answer streak, but your total score is preserved so you can keep playing.'
      }
    ],
    relatedTools: [
      { id: 'favorites', label: 'Favorite Tournament', path: '/pokemon-favorite-tournament', desc: 'Rank your favorite Pokémon in head-to-head bracket voting.' },
      { id: 'generator', label: 'Random Team Generator', path: '/random-pokemon-generator', desc: 'Generate random squads with advanced competitive filters.' },
      { id: 'nicknames', label: 'Nickname Generator', path: '/pokemon-nickname-generator', desc: 'Find unique and funny nicknames for your Pokémon.' }
    ]
  },

  nicknames: {
    toolId: 'nicknames',
    urlPath: '/pokemon-nickname-generator',
    pageTitle: 'Pokémon Nickname Generator | Fierce, Cute, Anime & Mythological Names',
    metaH1: 'Pokémon Nickname Generator & Name Suggestions',
    metaSubtitle: 'Discover clever, badass, cute, and mythological nicknames tailored to your Pokémon typing, lore, and battle personality.',
    keyHighlights: [
      { title: '4 Curated Nickname Styles', desc: 'Fierce/Battle, Cute/Whimsical, Anime/Pop Culture, and Mythological/Elemental.' },
      { title: 'Species & Type Thematic Lore', desc: 'Name recommendations rooted in Japanese mythology, elemental phenomena, and anime.' },
      { title: 'One-Click Copying', desc: 'Copy any generated nickname to your clipboard with a single click.' },
      { title: 'Audio Cry Integration', desc: 'Play your Pokémon battle cry while exploring the best matching nicknames.' }
    ],
    guideParagraphs: [
      {
        heading: 'Why Give Your Pokémon a Unique Nickname?',
        body: "Naming your Pokémon builds a personal connection throughout your journey across Kanto, Sinnoh, or Paldea. In competitive VGC and Nuzlocke runs, creative nicknames bring character to your team, intimidate ladder opponents, and honor fallen companions."
      },
      {
        heading: 'Categorized by Flavor & Archetype',
        body: "Our nickname generator curates names into four distinct personality archetypes: 'Fierce & Battle' for menacing powerhouses like Tyranitar and Garchomp; 'Cute & Whimsical' for cuddly favorites like Eevee and Togepi; 'Anime & Pop Culture' with references to Dragon Ball, Bleach, and Marvel; and 'Mythological & Elemental' drawing from Greek, Norse, and Shinto folklore."
      },
      {
        heading: 'Instant Search & Auto-Suggestions',
        body: "Search for any Pokémon by name or Pokédex number to immediately load tailored name recommendations along with typing cards, base stat totals, and official artwork."
      }
    ],
    faqs: [
      {
        q: 'Are these nicknames within the 12-character game limit?',
        a: 'Yes! Mainline Pokémon games (Gen 6+) enforce a 12-character nickname limit. All our suggestions adhere to this constraint.'
      },
      {
        q: 'Can I generate names for custom Nuzlocke rules?',
        a: 'Yes! Nuzlocke rules require every caught Pokémon to be nicknamed. Use this tool whenever you capture a new route encounter.'
      },
      {
        q: 'How do I suggest more nicknames?',
        a: 'Our database is continuously updated with community suggestions and trending pop culture references.'
      }
    ],
    relatedTools: [
      { id: 'nuzlocke', label: 'Nuzlocke Tracker', path: '/pokemon-nuzlocke-tracker', desc: 'Track route encounters, rule clauses, and gym caps for your Nuzlocke run.' },
      { id: 'generator', label: 'Team Generator', path: '/random-pokemon-generator', desc: 'Roll a random team and give each teammate a customized nickname.' },
      { id: 'ivcalc', label: 'IV & Stat Calculator', path: '/pokemon-iv-calculator', desc: 'Tune your nicknamed Pokémon competitive stats and effort values.' }
    ]
  },

  ivcalc: {
    toolId: 'ivcalc',
    urlPath: '/pokemon-iv-calculator',
    pageTitle: 'Pokémon IV & Stat Calculator (Gens 3-9) | Battle Stats, Nature & EV Formula',
    metaH1: 'Pokémon IV & EV Stat Calculator (Generations 3–9)',
    metaSubtitle: 'Calculate exact battle statistics at any level. Adjust Base Stats, Individual Values (IVs 0-31), Effort Values (EVs 0-252), and Nature modifiers.',
    keyHighlights: [
      { title: 'Official Formula Implementation', desc: 'Accurate Gen 3–9 mathematical formulas for HP and standard combat stats.' },
      { title: 'Interactive Nature Multipliers', desc: 'All 25 official natures with automatic +10% boosted and -10% hindered stat recalculations.' },
      { title: 'EV & IV Sliders (0–31 & 0–252)', desc: 'Intuitive sliders and number inputs with 510 total EV budget tracking.' },
      { title: 'Level Selection (1–100)', desc: 'Test stats at Level 50 (VGC / Battle Tower) or Level 100 (Maxed competitive battles).' }
    ],
    guideParagraphs: [
      {
        heading: 'How Pokémon Stats are Calculated (Official Formula)',
        body: 'In Generations 3 through 9, actual battle stats are derived from four inputs: Base Stats, Individual Values (IVs ranging from 0 to 31), Effort Values (EVs ranging from 0 to 252), and the Pokémon Nature multiplier. HP uses a unique formula: Floor(((2 * Base + IV + Floor(EV / 4)) * Level) / 100) + Level + 10 (except Shedinja which is locked to 1 HP).'
      },
      {
        heading: 'Level 50 VGC vs Level 100 Mainline Standards',
        body: 'Official Pokémon VGC tournaments and the Battle Tower automatically scale Pokémon to Level 50. At Level 50, every 8 EVs grant 1 additional stat point (the first 4 EVs give +1 point). Our calculator allows you to toggle instantly between Level 50 and Level 100 to optimize your spreads.'
      },
      {
        heading: 'Nature Modifiers Explained',
        body: 'Neutral natures (Hardy, Docile, Serious, Bashful, Quirky) leave stats unaffected. All other 20 natures increase one non-HP stat by 10% (1.1x) while reducing another non-HP stat by 10% (0.9x). Selecting a nature dynamically updates the affected stat labels.'
      }
    ],
    faqs: [
      {
        q: 'What is the maximum EV limit per stat and per Pokémon?',
        a: 'A Pokémon can have up to 252 EVs in a single stat, and a total pool of 510 EVs across all six stats.'
      },
      {
        q: 'What are Perfect 6IV Pokémon?',
        a: 'A "6IV" Pokémon has an IV of 31 in all six attributes (HP, Atk, Def, Sp. Atk, Sp. Def, Spe). Clicking "Max All IVs (31)" sets this instantly.'
      },
      {
        q: 'Does this calculator work for Shedinja?',
        a: 'Yes, Shedinja is hardcoded to 1 HP according to official game mechanics, while other stats calculate normally.'
      }
    ],
    relatedTools: [
      { id: 'compare', label: 'Compare Pokémon', path: '/pokemon-compare', desc: 'See how two Pokémon stats stack up in head-to-head combat.' },
      { id: 'generator', label: 'Team Generator', path: '/random-pokemon-generator', desc: 'Assemble a team and export to Pokémon Showdown with ideal IV spreads.' },
      { id: 'nicknames', label: 'Nickname Generator', path: '/pokemon-nickname-generator', desc: 'Give your competitive Pokémon an iconic, tournament-ready nickname.' }
    ]
  },

  nuzlocke: {
    toolId: 'nuzlocke',
    urlPath: '/pokemon-nuzlocke-tracker',
    pageTitle: 'Pokémon Nuzlocke Tracker & Route Encounter Roller | Gym Level Caps & Rules',
    metaH1: 'Pokémon Nuzlocke Challenge Companion & Route Tracker',
    metaSubtitle: 'Manage your Nuzlocke playthrough. Roll randomized encounters route-by-route, track team member survival status, and verify Gym Leader level caps.',
    keyHighlights: [
      { title: 'Regional Route Checklists', desc: 'Pre-loaded route tables for Kanto (Gen 1/3/7), Johto (Gen 2/4), Hoenn (Gen 3/6), and beyond.' },
      { title: 'Nuzlocke Rule Clauses', desc: 'Supports First Encounter only, Dupes/Species Clause, Shiny Clause, and Permadeath rules.' },
      { title: 'Status Tracking (Caught/Dead/Boxed)', desc: 'Color-coded state badges keep your Graveyard and Active Team organized.' },
      { title: 'Gym Leader Level Caps', desc: 'Clear level thresholds prevent accidental over-leveling in Hardcore Nuzlocke runs.' }
    ],
    guideParagraphs: [
      {
        heading: 'What is the Pokémon Nuzlocke Challenge?',
        body: "The Nuzlocke Challenge is a set of community rules designed to make Pokémon games more strategic and emotionally resonant. The core rules are: 1) You may only catch the first wild Pokémon encountered in each new area. 2) If a Pokémon faints, it is considered dead and must be permanently boxed or released. 3) You must nickname all captured Pokémon."
      },
      {
        heading: 'Adhering to the Dupes / Species Clause',
        body: "Our Route Encounter Roller respects the classic Dupes Clause: if you roll a Pokémon or evolution line you already own, the tool allows you to reroll for a fresh encounter without burning the route."
      },
      {
        heading: 'Hardcore Nuzlocke Rules & Level Caps',
        body: "In Hardcore Nuzlockes, players cannot use items in battle (like Potions) and must set battle style to 'Set'. Crucially, you must not exceed the level of the upcoming Gym Leader's ace Pokémon. Consult the gym guide in this tool before entering each gym battle."
      }
    ],
    faqs: [
      {
        q: 'Does my Nuzlocke progress save if I close the tab?',
        a: 'Yes, your captured routes, status badges, and custom notes are stored in browser localStorage.'
      },
      {
        q: 'What should I do if my route encounter flees or faints?',
        a: 'Under standard Nuzlocke rules, if the first Pokémon faints or escapes, you receive no catch for that route. Mark the route status as "Fainted/Missed".'
      },
      {
        q: 'Can I listen to cries of my route encounters?',
        a: 'Yes! Every encounter card features a cry button to hear your newly caught teammate or memorialize a fallen partner.'
      }
    ],
    relatedTools: [
      { id: 'nicknames', label: 'Nickname Generator', path: '/pokemon-nickname-generator', desc: 'Find creative and heartfelt nicknames for every caught route encounter.' },
      { id: 'generator', label: 'Random Team Generator', path: '/random-pokemon-generator', desc: 'Practice team building or roll a randomized starter roster.' },
      { id: 'compare', label: 'Compare Pokémon', path: '/pokemon-compare', desc: 'Compare your squad options against upcoming Gym Leader aces.' }
    ]
  }
};

interface PokemonToolSeoContentProps {
  toolId: PokemonToolId;
  onNavigateTool?: (toolId: PokemonToolId) => void;
}

export default function PokemonToolSeoContent({ toolId, onNavigateTool }: PokemonToolSeoContentProps) {
  const data = POKEMON_TOOLS_SEO_DATA[toolId];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!data) return null;

  return (
    <div className="mt-16 pt-12 border-t border-white/10 space-y-12 max-w-5xl mx-auto text-slate-300">
      
      {/* 1. Key Highlights Bento Grid */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-2.5">
          <Zap className="w-6 h-6 text-amber-400" />
          <span>Key Capabilities of the {data.metaH1}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.keyHighlights.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-rose-500/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. In-Depth SEO Guide & Content Sections */}
      <div className="space-y-8">
        {data.guideParagraphs.map((section, idx) => (
          <article 
            key={idx} 
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-white/5 space-y-3"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>{section.heading}</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {section.body}
            </p>
          </article>
        ))}
      </div>

      {/* 4. Frequently Asked Questions (FAQ Accordion with Schema semantics) */}
      <div>
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-rose-400" />
          <span>Frequently Asked Questions</span>
        </h3>
        <div className="space-y-3">
          {data.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-rose-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-rose-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Interlinking Related Pokémon Tools */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <span>Explore More Pokémon Battle &amp; Strategy Tools</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.relatedTools.map(tool => (
            <a
              key={tool.id}
              href={tool.path}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateTool) {
                  onNavigateTool(tool.id);
                } else {
                  window.history.pushState(null, '', tool.path);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/40 transition-all group flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="font-bold text-white text-sm group-hover:text-rose-400 transition-colors flex items-center justify-between">
                  <span>{tool.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {tool.desc}
                </p>
              </div>
              <div className="text-[11px] font-mono text-rose-400/80 group-hover:text-rose-300">
                {tool.path}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 6. Footer Disclaimer & Canonical Reference */}
      <div className="pt-6 border-t border-white/5 text-center text-xs text-slate-500 space-y-1">
        <p>Pokémon and Pokémon character names are trademarks of Nintendo, Game Freak, and Creatures Inc.</p>
        <p>This open-source suite of fan utilities is designed for competitive play, battle strategy research, and Nuzlocke playthrough tracking.</p>
      </div>

    </div>
  );
}
