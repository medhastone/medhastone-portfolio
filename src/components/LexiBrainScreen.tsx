import React, { useState, useEffect, useRef } from 'react';
import {
  Brain,
  Search,
  Sparkles,
  Volume2,
  BookOpen,
  ShieldCheck,
  Star,
  Download,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Check,
  Trophy,
  Shuffle,
  Eye,
  Wand2,
  Copy,
  CheckCheck,
  Palette,
  MapPin,
  Compass,
  Bookmark,
  Layers,
  Heart,
  HelpCircle,
  ExternalLink,
  WifiOff,
  Flame,
  Lightbulb,
  Zap,
  Sliders,
  BookMarked,
  Share2
} from 'lucide-react';

interface LexiBrainScreenProps {
  onBack: () => void;
}

// Sample words for Vocabulary Vault
interface VocabCard {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb';
  syllables: number;
  definition: string;
  example: string;
  etymology: string;
  category: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

const VOCAB_DATABASE: VocabCard[] = [
  {
    id: 'lexicon',
    word: 'Lexicon',
    phonetic: '/ˈlɛk.sɪ.kɒn/',
    partOfSpeech: 'noun',
    syllables: 3,
    definition: 'The vocabulary of a person, language, or branch of knowledge; a complete mental inventory of words.',
    example: 'Solving daily word puzzles gradually expands your working English lexicon.',
    etymology: 'Ancient Greek λεξικόν (lexikón, "book of words")',
    category: 'Literature & Language',
    difficulty: 4
  },
  {
    id: 'serendipity',
    word: 'Serendipity',
    phonetic: '/ˌsɛr.ənˈdɪp.ɪ.ti/',
    partOfSpeech: 'noun',
    syllables: 5,
    definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
    example: 'She experienced pure serendipity when she spotted the hidden diagonal word by accident.',
    etymology: 'Coined by Horace Walpole in 1754 from the Persian fairy tale "The Three Princes of Serendip"',
    category: 'Literature & Arts',
    difficulty: 4
  },
  {
    id: 'ephemeral',
    word: 'Ephemeral',
    phonetic: '/ɪˈfɛm.ər.əl/',
    partOfSpeech: 'adjective',
    syllables: 4,
    definition: 'Lasting for a very short time; transient, momentary, or fleeting.',
    example: 'Morning mist creates an ephemeral beauty over the autumn mountain trails.',
    etymology: 'Greek ἐφήμερος (ephēmeros, "lasting only one day")',
    category: 'Science & Nature',
    difficulty: 5
  },
  {
    id: 'cognition',
    word: 'Cognition',
    phonetic: '/kɒɡˈnɪʃ.ən/',
    partOfSpeech: 'noun',
    syllables: 3,
    definition: 'The mental action or process of acquiring knowledge and understanding through thought, experience, and the senses.',
    example: 'Engaging in spatial word search puzzles stimulates neuroplasticity and cognitive retention.',
    etymology: 'Latin cognitio ("knowledge, learning, examination")',
    category: 'Brain & Science',
    difficulty: 3
  },
  {
    id: 'resilience',
    word: 'Resilience',
    phonetic: '/rɪˈzɪl.jəns/',
    partOfSpeech: 'noun',
    syllables: 3,
    definition: 'The capacity to recover quickly from difficulties; psychological or material toughness.',
    example: 'Tackling 10x10 master word grids trains patience, focus, and mental resilience.',
    etymology: 'Latin resilire ("to spring back, rebound")',
    category: 'Mindset & Psychology',
    difficulty: 3
  },
  {
    id: 'mnemonics',
    word: 'Mnemonic',
    phonetic: '/nɪˈmɒn.ɪk/',
    partOfSpeech: 'noun',
    syllables: 3,
    definition: 'A system or device such as a pattern of letters, ideas, or associations that assists in remembering something.',
    example: 'LexiBrain’s interactive flashcards serve as effective visual mnemonics for rare words.',
    etymology: 'Ancient Greek μνημονικός (mnēmonikos, "pertaining to memory")',
    category: 'Education & Memory',
    difficulty: 4
  }
];

// Interactive Board Theme Options
type ThemeKey = 'midnight' | 'classic' | 'cozy' | 'neon';

interface ThemeConfig {
  id: ThemeKey;
  name: string;
  tagline: string;
  bgClass: string;
  boardBg: string;
  cardTitle: string;
  cardText: string;
  cardSubtext: string;
  cardMuted: string;
  cardBorder: string;
  badgeBg: string;
  subContainerBg: string;
  wordItemBg: string;
  wordItemText: string;
  wordItemFoundBg: string;
  wordItemFoundText: string;
  buttonBg: string;
  progressBg: string;
  progressFill: string;
  gridContainer: string;
  cellBg: string;
  cellBorder: string;
  cellText: string;
  activeCellBg: string;
  activeCellText: string;
  foundCellBg: string;
  foundCellText: string;
  accentColor: string;
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  midnight: {
    id: 'midnight',
    name: 'Midnight Dark',
    tagline: 'OLED-friendly dark palette designed to protect eyesight during late-night play',
    bgClass: 'bg-[#07090e]',
    boardBg: 'bg-[#0f1422] border-violet-500/20 shadow-2xl shadow-violet-950/40 text-white',
    cardTitle: 'text-white',
    cardText: 'text-white/80',
    cardSubtext: 'text-white/60',
    cardMuted: 'text-white/40',
    cardBorder: 'border-white/10',
    badgeBg: 'bg-white/10 text-white/90 border-white/10',
    subContainerBg: 'bg-white/[0.04] border-white/10 text-white/80',
    wordItemBg: 'bg-white/5 border-white/10',
    wordItemText: 'text-white/80',
    wordItemFoundBg: 'bg-emerald-500/20 border-emerald-500/40',
    wordItemFoundText: 'text-emerald-300 font-bold',
    buttonBg: 'bg-white/10 hover:bg-white/15 border-white/10 text-white',
    progressBg: 'bg-white/10',
    progressFill: 'bg-gradient-to-r from-violet-500 to-emerald-400',
    gridContainer: 'bg-black/30 border-white/10 shadow-inner',
    cellBg: 'bg-[#151c30] hover:bg-[#1f2a48]',
    cellBorder: 'border-white/10',
    cellText: 'text-white',
    activeCellBg: 'bg-violet-600 shadow-lg shadow-violet-500/50',
    activeCellText: 'text-white font-black',
    foundCellBg: 'bg-emerald-500/20 border-emerald-500/40',
    foundCellText: 'text-emerald-300 font-bold',
    accentColor: '#8b5cf6'
  },
  classic: {
    id: 'classic',
    name: 'Classic Light',
    tagline: 'High-contrast, reading-optimized layout with crisp typography and clean lines',
    bgClass: 'bg-slate-900',
    boardBg: 'bg-slate-100 border-slate-300 shadow-2xl shadow-black/60 text-slate-900',
    cardTitle: 'text-slate-900 font-black',
    cardText: 'text-slate-700 font-medium',
    cardSubtext: 'text-slate-600',
    cardMuted: 'text-slate-500',
    cardBorder: 'border-slate-300',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-300 font-bold',
    subContainerBg: 'bg-white border-slate-300 text-slate-800 shadow-sm',
    wordItemBg: 'bg-white border-slate-200 shadow-sm',
    wordItemText: 'text-slate-800 font-bold',
    wordItemFoundBg: 'bg-emerald-100 border-emerald-400 shadow-sm',
    wordItemFoundText: 'text-emerald-950 font-black',
    buttonBg: 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-sm',
    progressBg: 'bg-slate-300',
    progressFill: 'bg-gradient-to-r from-blue-600 to-teal-500',
    gridContainer: 'bg-slate-200/90 border-slate-300 shadow-inner',
    cellBg: 'bg-white hover:bg-slate-50 shadow-sm',
    cellBorder: 'border-slate-300',
    cellText: 'text-slate-900 font-bold',
    activeCellBg: 'bg-blue-600 shadow-lg shadow-blue-500/40',
    activeCellText: 'text-white font-black',
    foundCellBg: 'bg-teal-100 border-teal-500',
    foundCellText: 'text-teal-950 font-black',
    accentColor: '#2563eb'
  },
  cozy: {
    id: 'cozy',
    name: 'Cozy Wood & Paper',
    tagline: 'Warm parchment tones and tactile hues for a deeply relaxing, bookish atmosphere',
    bgClass: 'bg-[#18130e]',
    boardBg: 'bg-[#292017] border-amber-800/40 shadow-2xl shadow-amber-950/50 text-amber-100',
    cardTitle: 'text-amber-100 font-black',
    cardText: 'text-amber-200/90 font-medium',
    cardSubtext: 'text-amber-300/70',
    cardMuted: 'text-amber-400/50',
    cardBorder: 'border-amber-700/30',
    badgeBg: 'bg-amber-900/50 text-amber-200 border-amber-700/40 font-bold',
    subContainerBg: 'bg-[#1e1710] border-amber-800/30 text-amber-100 shadow-sm',
    wordItemBg: 'bg-[#1e1710] border-amber-800/30',
    wordItemText: 'text-amber-100 font-bold',
    wordItemFoundBg: 'bg-amber-900/70 border-amber-500/60',
    wordItemFoundText: 'text-amber-300 font-bold',
    buttonBg: 'bg-amber-900/40 hover:bg-amber-900/60 border-amber-700/40 text-amber-100',
    progressBg: 'bg-amber-950',
    progressFill: 'bg-gradient-to-r from-amber-500 to-yellow-400',
    gridContainer: 'bg-[#160f09] border-amber-900/40 shadow-inner',
    cellBg: 'bg-[#3b2d1f] hover:bg-[#4d3b2a]',
    cellBorder: 'border-amber-700/30',
    cellText: 'text-amber-100 font-bold',
    activeCellBg: 'bg-amber-600 shadow-lg shadow-amber-600/50',
    activeCellText: 'text-white font-black',
    foundCellBg: 'bg-amber-900/60 border-amber-500/60',
    foundCellText: 'text-amber-300 font-bold',
    accentColor: '#d97706'
  },
  neon: {
    id: 'neon',
    name: 'Neon Pulse',
    tagline: 'Vibrant jewel tones, luminous trails, and high-energy electric highlights',
    bgClass: 'bg-[#05030d]',
    boardBg: 'bg-[#0e0724] border-fuchsia-500/30 shadow-2xl shadow-fuchsia-950/60 text-fuchsia-100',
    cardTitle: 'text-fuchsia-100 font-black',
    cardText: 'text-fuchsia-200/90 font-medium',
    cardSubtext: 'text-fuchsia-300/70',
    cardMuted: 'text-fuchsia-400/50',
    cardBorder: 'border-fuchsia-500/20',
    badgeBg: 'bg-fuchsia-950/70 text-fuchsia-200 border-fuchsia-500/30 font-bold',
    subContainerBg: 'bg-[#160b33] border-fuchsia-500/20 text-fuchsia-100 shadow-sm',
    wordItemBg: 'bg-[#160b33] border-fuchsia-500/20',
    wordItemText: 'text-fuchsia-100 font-bold',
    wordItemFoundBg: 'bg-cyan-500/25 border-cyan-400/60',
    wordItemFoundText: 'text-cyan-300 font-bold',
    buttonBg: 'bg-fuchsia-950/60 hover:bg-fuchsia-900/60 border-fuchsia-500/30 text-fuchsia-100',
    progressBg: 'bg-fuchsia-950',
    progressFill: 'bg-gradient-to-r from-fuchsia-500 to-cyan-400',
    gridContainer: 'bg-[#080318] border-fuchsia-500/20 shadow-inner',
    cellBg: 'bg-[#1a0f3d] hover:bg-[#27175c]',
    cellBorder: 'border-fuchsia-500/20',
    cellText: 'text-fuchsia-100 font-bold',
    activeCellBg: 'bg-fuchsia-600 shadow-lg shadow-fuchsia-500/60',
    activeCellText: 'text-white font-black',
    foundCellBg: 'bg-cyan-500/20 border-cyan-400/50',
    foundCellText: 'text-cyan-300 font-bold',
    accentColor: '#d946ef'
  }
};

// Target Word & Coordinate Schema
interface TargetWord {
  word: string;
  coords: { r: number; c: number }[];
  hint: string;
}

interface LevelData {
  id: number;
  name: string;
  badge: string;
  gridSize: string;
  grid: string[][];
  targetWords: TargetWord[];
}

const PUZZLE_LEVELS: LevelData[] = [
  {
    id: 1,
    name: 'Level 01: Cognitive Basics',
    badge: '6x6 Grid • Novice',
    gridSize: '6x6',
    grid: [
      ['B', 'R', 'A', 'I', 'N', 'X'],
      ['W', 'O', 'R', 'D', 'S', 'P'],
      ['V', 'A', 'U', 'L', 'T', 'U'],
      ['C', 'O', 'Z', 'Y', 'M', 'Z'],
      ['Q', 'U', 'I', 'E', 'T', 'Z'],
      ['S', 'O', 'L', 'V', 'E', 'L']
    ],
    targetWords: [
      { word: 'BRAIN', coords: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 0, c: 3 }, { r: 0, c: 4 }], hint: 'The cognitive powerhouse inside your head' },
      { word: 'WORDS', coords: [{ r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 }], hint: 'Units of language that form your vocabulary' },
      { word: 'VAULT', coords: [{ r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }], hint: 'LexiBrain’s personal lexicon storage' },
      { word: 'COZY', coords: [{ r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }], hint: 'Comfortable, warm, and relaxing aesthetic feel' },
      { word: 'QUIET', coords: [{ r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }], hint: 'Distraction-free offline focus' },
      { word: 'SOLVE', coords: [{ r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }], hint: 'Crack the pattern and find hidden letters' }
    ]
  },
  {
    id: 2,
    name: 'Level 02: Synapse Explorer',
    badge: '7x7 Grid • Intermediate',
    gridSize: '7x7',
    grid: [
      ['S', 'Y', 'N', 'A', 'P', 'S', 'E'],
      ['M', 'N', 'E', 'U', 'R', 'O', 'N'],
      ['E', 'T', 'K', 'P', 'W', 'X', 'A'],
      ['M', 'L', 'O', 'G', 'I', 'C', 'L'],
      ['O', 'B', 'D', 'R', 'E', 'K', 'P'],
      ['R', 'F', 'O', 'C', 'U', 'S', 'H'],
      ['Y', 'Z', 'Q', 'W', 'V', 'J', 'A']
    ],
    targetWords: [
      { word: 'SYNAPSE', coords: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 0, c: 3 }, { r: 0, c: 4 }, { r: 0, c: 5 }, { r: 0, c: 6 }], hint: 'Neural junction transferring impulses' },
      { word: 'NEURON', coords: [{ r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 }, { r: 1, c: 5 }, { r: 1, c: 6 }], hint: 'Electrically excitable brain cell' },
      { word: 'MEMORY', coords: [{ r: 1, c: 0 }, { r: 2, c: 0 }, { r: 3, c: 0 }, { r: 4, c: 0 }, { r: 5, c: 0 }, { r: 6, c: 0 }], hint: 'Retention of encoded cognitive data' },
      { word: 'LOGIC', coords: [{ r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 3, c: 5 }], hint: 'Systematic reasoning and deduction' },
      { word: 'FOCUS', coords: [{ r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 }], hint: 'Centering attention on a single task' },
      { word: 'ALPHA', coords: [{ r: 2, c: 6 }, { r: 3, c: 6 }, { r: 4, c: 6 }, { r: 5, c: 6 }, { r: 6, c: 6 }], hint: 'Relaxed, calm brainwave frequency state' }
    ]
  },
  {
    id: 3,
    name: 'Level 03: Lexical Mastermind',
    badge: '8x8 Grid • Advanced',
    gridSize: '8x8',
    grid: [
      ['L', 'E', 'X', 'I', 'C', 'O', 'N', 'X'],
      ['W', 'I', 'S', 'D', 'O', 'M', 'B', 'K'],
      ['F', 'L', 'U', 'E', 'N', 'C', 'Y', 'T'],
      ['A', 'C', 'U', 'M', 'E', 'N', 'P', 'R'],
      ['G', 'E', 'N', 'I', 'U', 'S', 'M', 'L'],
      ['M', 'E', 'N', 'T', 'A', 'L', 'I', 'Z'],
      ['N', 'E', 'U', 'R', 'A', 'L', 'O', 'Q'],
      ['K', 'P', 'U', 'Z', 'Z', 'L', 'E', 'S']
    ],
    targetWords: [
      { word: 'LEXICON', coords: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 0, c: 3 }, { r: 0, c: 4 }, { r: 0, c: 5 }, { r: 0, c: 6 }], hint: 'A complete inventory of vocabulary' },
      { word: 'WISDOM', coords: [{ r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 4 }, { r: 1, c: 5 }], hint: 'Deep understanding and good judgment' },
      { word: 'FLUENCY', coords: [{ r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 }, { r: 2, c: 6 }], hint: 'Effortless articulation in language' },
      { word: 'ACUMEN', coords: [{ r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 3, c: 5 }], hint: 'Sharpness of mind and keen discernment' },
      { word: 'GENIUS', coords: [{ r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 }], hint: 'Exceptional intellectual or creative power' },
      { word: 'MENTAL', coords: [{ r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 }], hint: 'Relating to cognitive and intellectual faculties' },
      { word: 'NEURAL', coords: [{ r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 }], hint: 'Pertaining to nervous system pathways' },
      { word: 'PUZZLE', coords: [{ r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 }, { r: 7, c: 6 }], hint: 'A problem designed to test ingenuity' }
    ]
  }
];

// Helper to compute straight line path from start to end cell in 8 directions
function computeLineCells(start: { r: number; c: number }, end: { r: number; c: number }, maxR: number, maxC: number): { r: number; c: number }[] {
  const dr = end.r - start.r;
  const dc = end.c - start.c;
  
  if (dr === 0 && dc === 0) {
    return [start];
  }

  const absDr = Math.abs(dr);
  const absDc = Math.abs(dc);

  let stepR = 0;
  let stepC = 0;
  let steps = 0;

  if (dr === 0) {
    stepR = 0;
    stepC = Math.sign(dc);
    steps = absDc;
  } else if (dc === 0) {
    stepR = Math.sign(dr);
    stepC = 0;
    steps = absDr;
  } else if (absDr === absDc) {
    stepR = Math.sign(dr);
    stepC = Math.sign(dc);
    steps = absDr;
  } else {
    // Snap to dominant direction
    if (absDr > 2 * absDc) {
      stepR = Math.sign(dr);
      stepC = 0;
      steps = absDr;
    } else if (absDc > 2 * absDr) {
      stepR = 0;
      stepC = Math.sign(dc);
      steps = absDc;
    } else {
      stepR = Math.sign(dr);
      stepC = Math.sign(dc);
      steps = Math.max(absDr, absDc);
    }
  }

  const cells: { r: number; c: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const r = start.r + i * stepR;
    const c = start.c + i * stepC;
    if (r >= 0 && r < maxR && c >= 0 && c < maxC) {
      cells.push({ r, c });
    }
  }
  return cells;
}

// Lightweight Audio Synthesizer for Tactile Feedback
class GameAudio {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    return this.ctx;
  }

  playSlideTick() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio fallback
    }
  }

  playWordSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.3);
      });
    } catch {
      // Audio fallback
    }
  }

  playLevelComplete() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const melody = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      melody.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.4);
      });
    } catch {
      // Audio fallback
    }
  }
}

const gameAudio = new GameAudio();

export default function LexiBrainScreen({ onBack }: LexiBrainScreenProps) {
  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.lexibrain.hiddenwords";

  // State
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('midnight');
  const [activeLevelIdx, setActiveLevelIdx] = useState<number>(0);
  const [selectedVocab, setSelectedVocab] = useState<VocabCard>(VOCAB_DATABASE[0]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copiedWord, setCopiedWord] = useState<boolean>(false);
  
  // Active Level Data
  const currentLevel = PUZZLE_LEVELS[activeLevelIdx];
  const [foundWords, setFoundWords] = useState<string[]>(['BRAIN']);
  
  // Drag / Slider Selection State
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ r: number; c: number } | null>(null);
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [levelClearCelebration, setLevelClearCelebration] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);

  const theme = THEMES[currentTheme];

  // Dynamic Title & Canonical Tag for SEO
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "LexiBrain: Find Hidden Words - Offline Word Search Game & Vocabulary Builder";

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = "https://zentova.in/lexibrain";

    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.title = "Medhastone | High-Performance App Development & Engineering Studio";
      if (canonical) canonical.href = "https://zentova.in/";
    };
  }, []);

  // Global Pointer Up listener to release drag selection smoothly anywhere
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDragging) {
        validateSelectionAndRelease();
      }
    };
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('touchend', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('touchend', handleGlobalPointerUp);
    };
  }, [isDragging, selectedCells, foundWords, currentLevel]);

  // Audio Pronunciation via Browser Native SpeechSynthesis
  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech is not supported in this browser.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedWord(true);
    setTimeout(() => setCopiedWord(false), 2000);
  };

  // Change Active Level Handler
  const handleSelectLevel = (idx: number) => {
    setActiveLevelIdx(idx);
    const newLvl = PUZZLE_LEVELS[idx];
    // Seed with first word or empty
    const initialFound = idx === 0 ? ['BRAIN'] : [];
    setFoundWords(initialFound);
    setSelectedCells([]);
    setIsDragging(false);
    setDragStart(null);
    setLevelClearCelebration(false);
    setActiveHint(null);
  };

  // Drag / Slide Pointer Handlers
  const handlePointerDownCell = (r: number, c: number, e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ r, c });
    setSelectedCells([{ r, c }]);
    gameAudio.playSlideTick();
  };

  const handlePointerEnterCell = (r: number, c: number) => {
    if (!isDragging || !dragStart) return;
    const line = computeLineCells(dragStart, { r, c }, currentLevel.grid.length, currentLevel.grid[0].length);
    if (line.length !== selectedCells.length) {
      gameAudio.playSlideTick();
    }
    setSelectedCells(line);
  };

  // Mobile Touch Move handler for smooth sliding selection
  const handleGridTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStart) return;
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement) {
      const rowAttr = targetElement.getAttribute('data-row');
      const colAttr = targetElement.getAttribute('data-col');
      if (rowAttr !== null && colAttr !== null) {
        const r = parseInt(rowAttr, 10);
        const c = parseInt(colAttr, 10);
        const line = computeLineCells(dragStart, { r, c }, currentLevel.grid.length, currentLevel.grid[0].length);
        if (line.length !== selectedCells.length) {
          gameAudio.playSlideTick();
        }
        setSelectedCells(line);
      }
    }
  };

  // Word selection validation upon release
  const validateSelectionAndRelease = () => {
    if (selectedCells.length === 0) {
      setIsDragging(false);
      setDragStart(null);
      return;
    }

    const spelledForward = selectedCells.map(cell => currentLevel.grid[cell.r][cell.c]).join('');
    const spelledBackward = [...selectedCells].reverse().map(cell => currentLevel.grid[cell.r][cell.c]).join('');

    let match: TargetWord | undefined;

    currentLevel.targetWords.forEach(tw => {
      if (!foundWords.includes(tw.word)) {
        if (tw.word === spelledForward || tw.word === spelledBackward) {
          match = tw;
        }
      }
    });

    if (match) {
      const newFound = [...foundWords, match.word];
      setFoundWords(newFound);
      gameAudio.playWordSuccess();
      setActiveHint(`🎉 Outstanding! Found "${match.word}"!`);
      
      // Auto synchronize with vocabulary vault if word exists in dictionary
      const vocabMatch = VOCAB_DATABASE.find(v => v.word.toUpperCase() === match?.word.toUpperCase());
      if (vocabMatch) {
        setSelectedVocab(vocabMatch);
      }

      if (newFound.length === currentLevel.targetWords.length) {
        setLevelClearCelebration(true);
        gameAudio.playLevelComplete();
      }

      setTimeout(() => {
        setSelectedCells([]);
        setActiveHint(null);
      }, 400);
    } else {
      // Clear selection with small delay
      setTimeout(() => {
        setSelectedCells([]);
      }, 200);
    }

    setIsDragging(false);
    setDragStart(null);
  };

  // Accessible click fallback for users who prefer tap
  const handleCellClick = (r: number, c: number) => {
    // If user is just tapping instead of sliding
    if (selectedCells.length === 1 && selectedCells[0].r === r && selectedCells[0].c === c) {
      setSelectedCells([]);
      return;
    }
    
    if (selectedCells.length > 0) {
      const line = computeLineCells(selectedCells[0], { r, c }, currentLevel.grid.length, currentLevel.grid[0].length);
      setSelectedCells(line);
      const spelledForward = line.map(cell => currentLevel.grid[cell.r][cell.c]).join('');
      const spelledBackward = [...line].reverse().map(cell => currentLevel.grid[cell.r][cell.c]).join('');
      
      let match: TargetWord | undefined;
      currentLevel.targetWords.forEach(tw => {
        if (!foundWords.includes(tw.word) && (tw.word === spelledForward || tw.word === spelledBackward)) {
          match = tw;
        }
      });

      if (match) {
        const newFound = [...foundWords, match.word];
        setFoundWords(newFound);
        gameAudio.playWordSuccess();
        setActiveHint(`🎉 Found "${match.word}"!`);
        setTimeout(() => setSelectedCells([]), 400);
      } else {
        setTimeout(() => setSelectedCells([]), 600);
      }
    } else {
      setSelectedCells([{ r, c }]);
    }
  };

  const useHintReveal = () => {
    const unfound = currentLevel.targetWords.filter(w => !foundWords.includes(w.word));
    if (unfound.length > 0) {
      const target = unfound[0];
      setSelectedCells([target.coords[0]]);
      setActiveHint(`🔍 Hint: First letter of "${target.word}" is '${target.word[0]}' at Row ${target.coords[0].r + 1}, Col ${target.coords[0].c + 1}.`);
      gameAudio.playSlideTick();
    } else {
      setActiveHint("🌟 All words discovered on this board!");
    }
  };

  const useMagicWand = () => {
    const unfound = currentLevel.targetWords.filter(w => !foundWords.includes(w.word));
    if (unfound.length > 0) {
      const target = unfound[0];
      const newFound = [...foundWords, target.word];
      setFoundWords(newFound);
      gameAudio.playWordSuccess();
      setActiveHint(`✨ Magic Wand uncovered "${target.word}"!`);
      if (newFound.length === currentLevel.targetWords.length) {
        setLevelClearCelebration(true);
        gameAudio.playLevelComplete();
      }
      setTimeout(() => setActiveHint(null), 3000);
    }
  };

  const resetMiniGame = () => {
    setFoundWords(activeLevelIdx === 0 ? ['BRAIN'] : []);
    setSelectedCells([]);
    setIsDragging(false);
    setDragStart(null);
    setLevelClearCelebration(false);
    setActiveHint(null);
  };

  // The spelled string currently being dragged/selected
  const currentlySpelled = selectedCells.map(c => currentLevel.grid[c.r]?.[c.c] || '').join('');

  // Thematic Chapters Data
  const CHAPTERS = [
    { id: 1, name: "Wildlife & Nature", levels: 30, icon: "🐾", words: ["Jaguar", "Savannah", "Canopy", "Nocturnal"], desc: "Traverse biodiversity biomes, forest ecosystems, and aquatic habitats." },
    { id: 2, name: "Culinary & Flavors", levels: 40, icon: "🍳", words: ["Umami", "Gourmet", "Saffron", "Caramelize"], desc: "From artisanal spices to French pastry techniques and Michelin gastrology." },
    { id: 3, name: "World Geography", levels: 45, icon: "🗺️", words: ["Archipelago", "Peninsula", "Fjord", "Equator"], desc: "Navigate continental topologies, remote islands, and oceanic trenches." },
    { id: 4, name: "Science & Physics", levels: 50, icon: "🔬", words: ["Quantum", "Relativity", "Enzyme", "Entropy"], desc: "Subatomic phenomena, chemical catalysis, and genetic sequencing." },
    { id: 5, name: "Classic Literature", levels: 50, icon: "📚", words: ["Metaphor", "Soliloquy", "Odyssey", "Renaissance"], desc: "Timeless anthologies, rhetorical figures of speech, and Victorian classics." },
    { id: 6, name: "Ancient Architecture", levels: 50, icon: "🏛️", words: ["Aqueduct", "Colonnade", "Pantheon", "Obelisk"], desc: "Structural masterworks of Greco-Roman, Byzantine, and Mesoamerican eras." },
    { id: 7, name: "Cosmos & Space", levels: 60, icon: "🚀", words: ["Nebula", "Exoplanet", "Supernova", "Pulsar"], desc: "Deep space astrophysics, black hole event horizons, and stellar nurseries." },
    { id: 8, name: "World Mythology", levels: 60, icon: "⚡", words: ["Pantheon", "Chimera", "Valkyrie", "Elysium"], desc: "Legends, deities, and heroic epic cycles across global folklore." }
  ];

  // FAQ Data
  const FAQS = [
    {
      q: "Is LexiBrain 100% playable offline without Wi-Fi or mobile data?",
      a: "Yes, absolutely. LexiBrain is designed offline-first from the ground up. All level layouts, procedural puzzle generation engines, and a rich dictionary cache are stored locally on your Android device in an encrypted Room Database. You can play smoothly on flights (Airplane Mode), subways, remote cabins, or when conserving cellular data with zero interruptions."
    },
    {
      q: "How does the Vocabulary Vault differ from standard word search games?",
      a: "Generic word search games discard words the instant you circle them. LexiBrain transforms every completed puzzle into a personal language vault. Tapping any discovered word opens an interactive flashcard featuring clear definitions, parts of speech, syllable counts, etymological origins, practical usage sentences, and native audio pronunciation via Android's Text-to-Speech engine."
    },
    {
      q: "How does the Text-to-Speech (TTS) pronunciation engine work?",
      a: "LexiBrain interfaces directly with the native Android TextToSpeech engine installed on your smartphone. It does not stream audio files from external servers, meaning pronunciation works instantly even when completely disconnected from the internet. You can listen to natural American or British English accents directly from the card."
    },
    {
      q: "Are there invasive ads, paywalls, or forced subscriptions?",
      a: "No. LexiBrain respects your cognitive flow. There are no mandatory paywalls, subscription traps, or forced full-screen video interruptions mid-puzzle. Hints and power-ups can be earned naturally through gameplay streaks or via completely optional rewarded video views. All core levels and features are 100% free."
    },
    {
      q: "Is LexiBrain suitable for seniors, adults, and non-native English learners?",
      a: "Yes. The UI complies with strict Material Design 3 accessibility standards: generous 48dp touch targets prevent accidental swipes, high-contrast typography reduces eye fatigue, and the app fully respects Android's system font scaling. Seniors appreciate the relaxed, timer-free play, while ESL students use it as a powerful, non-intimidating vocabulary builder."
    },
    {
      q: "How is user privacy protected?",
      a: "LexiBrain collects zero personally identifiable information (PII). There is no compulsory social login, no account registration, and no tracking of personal communications. Puzzle progress, star ratings, and custom settings remain encrypted locally on your device in compliance with Google Play Store families and COPPA regulations."
    },
    {
      q: "What visual board themes are available?",
      a: "LexiBrain includes 4 carefully calibrated aesthetic board palettes: Midnight Dark (OLED-black with luminous jewel trails), Classic Light (reading-optimized paper and ink contrast), Cozy Wood / Paper Craft (relaxing warm amber parchment tones), and Neon Pulse (high-energy cyber glow)."
    },
    {
      q: "Can I copy definitions or share words to external study tools like Anki?",
      a: "Yes. Every word memory card in the Vocabulary Vault features a single-tap 'Copy to Clipboard' action. You can instantly export definitions, phonetics, and sample sentences into note-taking apps, language flashcards (Anki, Quizlet), or study journals."
    }
  ];

  return (
    <div className={`min-h-screen ${theme.bgClass} text-white selection:bg-violet-500/30 font-sans transition-colors duration-500`}>
      
      {/* Top Sticky Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/80 hover:text-white flex items-center gap-2 group"
              title="Return to Medhastone Portfolio"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Portfolio</span>
            </button>
            <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2.5">
              <img
                src="/lexibrain.svg"
                alt="LexiBrain: Find Hidden Words App Icon"
                className="w-9 h-9 rounded-xl shadow-lg shadow-violet-500/30 object-cover border border-white/10"
              />
              <span className="font-black text-sm tracking-tight text-white hidden md:inline">LexiBrain</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <WifiOff className="w-3.5 h-3.5" />
              <span>100% Offline Capable</span>
            </div>
            <a
              href="/lexibrain/privacy-policy"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
              <span>Privacy Policy</span>
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30 transition-all hover:scale-[1.02]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install Free</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-28 pb-36 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Hero Section */}
        <section className="mb-20 pt-6">
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20">
              Offline Word Search Game
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Vocabulary Brain Puzzle
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              No Wi-Fi Needed
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
              4.9 ★ Android
            </span>
            <a
              href="/lexibrain/privacy-policy"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-white/5 hover:bg-white/10 text-violet-300 hover:text-white border border-white/10 transition-colors"
            >
              <ShieldCheck className="w-3 h-3 text-violet-400" />
              <span>Privacy Policy</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
                Looking for a Relaxing <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400">Offline Word Search</span> Game?
              </h1>

              <p className="text-lg sm:text-xl text-white/70 max-w-3xl leading-relaxed font-normal mb-8">
                Discover <strong className="text-white font-bold">LexiBrain: Hidden Words</strong> — where classic procedural word finding puzzles meet an interactive <strong className="text-violet-300 font-semibold">Vocabulary Vault</strong> with native audio pronunciation, live definitions, and zero-compromise offline privacy.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-violet-600/30 transition-all hover:scale-[1.02]"
                >
                  <Download className="w-5 h-5" />
                  <span>Get LexiBrain on Google Play</span>
                </a>
                <a
                  href="#interactive-simulator"
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all"
                >
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span>Try Simulator</span>
                </a>
                <a
                  href="#vocabulary-vault"
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Vocabulary Vault</span>
                </a>
              </div>
            </div>

            {/* Official App Icon Showcase Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-6 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-2xl shadow-2xl shadow-violet-950/50 max-w-xs w-full text-center group hover:border-violet-500/40 transition-all">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                  Official Android App
                </div>

                <div className="relative mx-auto w-36 h-36 mb-4 mt-2 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-white/20 to-transparent shadow-2xl shadow-violet-500/20 group-hover:scale-105 transition-transform">
                  <img
                    src="/lexibrain.svg"
                    alt="LexiBrain: Find Hidden Words App Icon"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="font-black text-lg text-white mb-0.5">LexiBrain: Hidden Words</div>
                <div className="text-[11px] font-mono text-violet-300/80 mb-3 break-all">com.lexibrain.hiddenwords</div>

                <div className="flex items-center justify-center gap-3 py-2 px-3 rounded-xl bg-black/40 border border-white/5 text-xs mb-4">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.9</span>
                  </div>
                  <span className="text-white/20">•</span>
                  <span className="text-emerald-400 font-semibold">100% Free</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/60">Android 8.0+</span>
                </div>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download on Play Store</span>
                </a>
              </div>
            </div>
          </div>

          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-violet-400 mb-1">500+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/90">Procedural Levels</div>
              <div className="text-xs text-white/50 mt-1">Adaptive 5x5 to 10x10 grids</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">100%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/90">Offline Playable</div>
              <div className="text-xs text-white/50 mt-1">Zero data / Airplane mode</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1">Native TTS</div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/90">Audio Pronunciation</div>
              <div className="text-xs text-white/50 mt-1">English spoken out loud</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">Room DB</div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/90">Private Encryption</div>
              <div className="text-xs text-white/50 mt-1">100% local on-device progress</div>
            </div>
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE WORD SEARCH SIMULATOR & THEME SWITCHER */}
        <section id="interactive-simulator" className="mb-24 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-violet-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Live Word Search Laboratory
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Try the Procedural Word Search Grid Engine
              </h2>
              <p className="text-white/60 text-sm sm:text-base mt-2 max-w-2xl">
                Experience the tactile fluid slider drag mechanics, instant phonetic validation, and dynamic aesthetic themes in your browser right now.
              </p>
            </div>

            {/* Theme Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-bold text-white/40 uppercase px-2">Theme:</span>
              {(Object.keys(THEMES) as ThemeKey[]).map(key => (
                <button
                  key={key}
                  onClick={() => setCurrentTheme(key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentTheme === key
                      ? 'bg-white text-slate-900 shadow-md scale-105'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {THEMES[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Simulator Card with Fully Themed Typography & Layout */}
          <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-500 ${theme.boardBg}`}>
            
            {/* Level Selector Slider / Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-current/10 mb-8">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.cardMuted}`}>Select Grid Level:</span>
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/10 dark:bg-white/5 border border-current/10">
                  {PUZZLE_LEVELS.map((lvl, idx) => (
                    <button
                      key={lvl.id}
                      onClick={() => handleSelectLevel(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeLevelIdx === idx
                          ? `${theme.activeCellBg} ${theme.activeCellText} shadow-md`
                          : `${theme.cardText} opacity-70 hover:opacity-100 hover:bg-black/5`
                      }`}
                    >
                      {lvl.gridSize} • Lvl {lvl.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Selection Gesture Indicator Pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold bg-violet-500/10 border-violet-500/30 text-violet-400">
                <Sliders className="w-3.5 h-3.5" />
                <span>Slide / Drag across letters to select words</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Playable Interactive Grid */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="w-full max-w-md">
                  
                  {/* Grid Toolbar & Status Header */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className={`text-xs font-black tracking-wider uppercase ${theme.cardTitle}`}>
                        {currentLevel.name}
                      </span>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${theme.badgeBg}`}>
                      {currentLevel.badge}
                    </span>
                  </div>

                  {/* Active Real-Time Slider Selection Display Bar */}
                  <div className="mb-3 min-h-[38px] flex items-center justify-center">
                    {isDragging && currentlySpelled ? (
                      <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 animate-pulse text-xs font-black tracking-widest uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Selecting:</span>
                        <span className="font-mono bg-black/30 px-2 py-0.5 rounded tracking-widest text-sm text-yellow-300">
                          {currentlySpelled}
                        </span>
                      </div>
                    ) : (
                      <div className={`text-[11px] font-medium tracking-wide ${theme.cardMuted} flex items-center gap-1.5`}>
                        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Drag finger or mouse in 8 directions (horizontal, vertical, diagonal)</span>
                      </div>
                    )}
                  </div>

                  {/* Interactive Letter Grid Container (Supports Pointer Down + Enter + Touch Sliding) */}
                  <div
                    onContextMenu={(e) => e.preventDefault()}
                    onTouchMove={handleGridTouchMove}
                    className={`grid gap-2 sm:gap-2.5 p-3.5 rounded-2xl border transition-all select-none ${theme.gridContainer}`}
                    style={{
                      touchAction: 'none',
                      gridTemplateColumns: `repeat(${currentLevel.grid[0].length}, minmax(0, 1fr))`
                    }}
                  >
                    {currentLevel.grid.map((row, rIdx) =>
                      row.map((letter, cIdx) => {
                        const isSelected = selectedCells.some(cell => cell.r === rIdx && cell.c === cIdx);
                        const isPartOfFoundWord = currentLevel.targetWords.some(tw =>
                          foundWords.includes(tw.word) && tw.coords.some(coord => coord.r === rIdx && coord.c === cIdx)
                        );

                        return (
                          <div
                            key={`${rIdx}-${cIdx}`}
                            data-row={rIdx}
                            data-col={cIdx}
                            onPointerDown={(e) => handlePointerDownCell(rIdx, cIdx, e)}
                            onPointerEnter={() => handlePointerEnterCell(rIdx, cIdx)}
                            onClick={() => handleCellClick(rIdx, cIdx)}
                            className={`aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl font-black select-none cursor-pointer transition-all duration-150 border active:scale-95 ${
                              isSelected
                                ? `${theme.activeCellBg} ${theme.activeCellText} scale-105 z-10 ring-2 ring-white/50`
                                : isPartOfFoundWord
                                ? `${theme.foundCellBg} ${theme.foundCellText}`
                                : `${theme.cellBg} ${theme.cellBorder} ${theme.cellText}`
                            }`}
                          >
                            {letter}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Assist / Power-Up Toolbar */}
                  <div className="flex items-center justify-between gap-2 mt-4">
                    <button
                      onClick={useHintReveal}
                      className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${theme.buttonBg}`}
                      title="Reveal first letter hint"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Reveal Letter</span>
                    </button>
                    <button
                      onClick={useMagicWand}
                      className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${theme.buttonBg}`}
                      title="Magic wand solve"
                    >
                      <Wand2 className="w-3.5 h-3.5 text-violet-400" />
                      <span>Magic Wand</span>
                    </button>
                    <button
                      onClick={resetMiniGame}
                      className={`py-2.5 px-3.5 rounded-xl border text-xs font-bold flex items-center justify-center transition-all ${theme.buttonBg}`}
                      title="Reset current puzzle board"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Active Hint Feedback Toast */}
                  {activeHint && (
                    <div className={`mt-3 p-3 rounded-xl border text-xs text-center font-bold animate-fadeIn ${theme.subContainerBg}`}>
                      {activeHint}
                    </div>
                  )}

                  {/* Level Clear Celebration Dialog */}
                  {levelClearCelebration && (
                    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-600/30 to-teal-600/20 border border-emerald-500/40 text-center animate-fadeIn">
                      <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <Star className="w-5 h-5 fill-amber-400" />
                        <Star className="w-4 h-4 fill-amber-400" />
                      </div>
                      <div className="font-black text-sm text-emerald-300">Level Mastered! 100% Discovered</div>
                      <div className={`text-xs mt-1 ${theme.cardText}`}>
                        All vocabulary terms added to your on-device Room DB Vault.
                      </div>
                      {activeLevelIdx < PUZZLE_LEVELS.length - 1 && (
                        <button
                          onClick={() => handleSelectLevel(activeLevelIdx + 1)}
                          className="mt-3 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-all"
                        >
                          Advance to Level {activeLevelIdx + 2} →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Target Words Checklist & Live Stats */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-sm font-black uppercase tracking-wider ${theme.cardTitle}`}>
                      Target Words ({foundWords.length}/{currentLevel.targetWords.length})
                    </h3>
                    <span className="text-xs font-black text-violet-500 dark:text-violet-400">
                      {Math.round((foundWords.length / currentLevel.targetWords.length) * 100)}% Complete
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className={`w-full h-2 rounded-full overflow-hidden mb-4 ${theme.progressBg}`}>
                    <div
                      className={`h-full transition-all duration-500 ${theme.progressFill}`}
                      style={{ width: `${(foundWords.length / currentLevel.targetWords.length) * 100}%` }}
                    ></div>
                  </div>

                  {/* Target Word Checklist Pills */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {currentLevel.targetWords.map(item => {
                      const isFound = foundWords.includes(item.word);
                      return (
                        <div
                          key={item.word}
                          onClick={() => {
                            const match = VOCAB_DATABASE.find(v => v.word.toUpperCase() === item.word.toUpperCase());
                            if (match) setSelectedVocab(match);
                          }}
                          className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                            isFound
                              ? `${theme.wordItemFoundBg} ${theme.wordItemFoundText}`
                              : `${theme.wordItemBg} ${theme.wordItemText}`
                          }`}
                          title={`Click to preview definition of ${item.word}`}
                        >
                          <div className="flex flex-col min-w-0 pr-1">
                            <span className={`font-black text-sm tracking-wider ${isFound ? 'line-through opacity-85' : ''}`}>
                              {item.word}
                            </span>
                            <span className={`text-[10px] mt-0.5 truncate max-w-[130px] ${theme.cardMuted}`}>
                              {item.hint}
                            </span>
                          </div>
                          {isFound ? (
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-current opacity-30 shrink-0"></span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Engine Architecture Note */}
                <div className={`p-4 rounded-2xl border text-xs space-y-2 ${theme.subContainerBg}`}>
                  <div className={`flex items-center gap-2 font-bold ${theme.cardTitle}`}>
                    <Sliders className="w-4 h-4 text-violet-500" />
                    <span>Engine: Multi-Directional Vector Slider</span>
                  </div>
                  <p className={`leading-relaxed ${theme.cardSubtext}`}>
                    LexiBrain’s procedural matrix places words horizontally, vertically, diagonally, and reversed. Drag seamlessly with mouse or touch gestures.
                  </p>
                </div>

                {/* Quick Pronunciation Test of Discovered Words */}
                {foundWords.length > 0 && (
                  <div className={`p-4 rounded-2xl border ${theme.subContainerBg}`}>
                    <div className={`text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center justify-between ${theme.cardTitle}`}>
                      <span>Discovered Words Audio:</span>
                      <span className="text-[10px] text-emerald-500 font-semibold">Native TTS</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {foundWords.map(w => (
                        <button
                          key={w}
                          onClick={() => speakWord(w)}
                          className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${theme.buttonBg}`}
                          title={`Listen to pronunciation of ${w}`}
                        >
                          <Volume2 className="w-3 h-3 text-violet-500" />
                          <span>{w}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: THE VOCABULARY VAULT & INTERACTIVE MEMORY CARDS */}
        <section id="vocabulary-vault" className="mb-24 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Core Differentiator & USP
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              The Vocabulary Vault &amp; Memory Cards
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              Generic word puzzles throw words away once you circle them. LexiBrain immortalizes them. Every discovered word becomes an interactive study card with native English audio pronunciation and etymology.
            </p>
          </div>

          {/* Interactive Memory Card Demonstration */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Word Selection Drawer / List (Left 5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white/50">Select Discovered Word:</span>
                <span className="text-xs text-emerald-400 font-semibold">Offline Room DB Cached</span>
              </div>
              
              {VOCAB_DATABASE.map(v => {
                const isSelected = selectedVocab.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVocab(v)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-violet-600/20 border-violet-500/50 shadow-lg shadow-violet-900/30 translate-x-1'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black ${
                        isSelected ? 'bg-violet-500 text-white' : 'bg-white/10 text-white/80'
                      }`}>
                        {v.word[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{v.word}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                            {v.partOfSpeech}
                          </span>
                        </div>
                        <div className="text-xs text-white/50 font-mono mt-0.5">{v.phonetic}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {Array.from({ length: v.difficulty }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Flashcard Viewer (Right 7 Cols) */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121629] to-[#0c0f1c] border border-violet-500/30 shadow-2xl shadow-violet-950/50 relative overflow-hidden">
                
                {/* Top Card Bar */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider">
                      {selectedVocab.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/60 text-xs font-semibold">
                      {selectedVocab.syllables} Syllables
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(`${selectedVocab.word} (${selectedVocab.phonetic}) - ${selectedVocab.definition}`)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-xs flex items-center gap-1.5"
                      title="Copy definition"
                    >
                      {copiedWord ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span className="hidden sm:inline">{copiedWord ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Word Header + Pronunciation Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-baseline gap-3">
                      {selectedVocab.word}
                      <span className="text-lg sm:text-xl font-normal font-mono text-violet-400">
                        {selectedVocab.phonetic}
                      </span>
                    </h3>
                    <div className="text-xs uppercase font-bold tracking-widest text-white/40 mt-1">
                      Part of Speech: <span className="text-white/80">{selectedVocab.partOfSpeech}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => speakWord(selectedVocab.word)}
                    disabled={isSpeaking}
                    className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-black transition-all ${
                      isSpeaking
                        ? 'bg-emerald-500 text-white animate-pulse'
                        : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/30 hover:scale-105'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isSpeaking ? 'Speaking...' : 'Listen Pronunciation'}</span>
                  </button>
                </div>

                {/* Definition Box */}
                <div className="mb-6 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-xs uppercase font-bold tracking-wider text-white/40 mb-2">Meaning &amp; Definition</div>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                    {selectedVocab.definition}
                  </p>
                </div>

                {/* Example Sentence */}
                <div className="mb-6 p-5 rounded-2xl bg-violet-500/10 border border-violet-500/20">
                  <div className="text-xs uppercase font-bold tracking-wider text-violet-400 mb-1.5 flex items-center gap-1.5">
                    <BookMarked className="w-3.5 h-3.5" />
                    Practical Usage in Context
                  </div>
                  <p className="text-white/80 text-sm sm:text-base italic leading-relaxed">
                    "{selectedVocab.example}"
                  </p>
                </div>

                {/* Etymology & Offline Indicator */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/50">
                  <div>
                    <strong className="text-white/70">Origin / Etymology:</strong> {selectedVocab.etymology}
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Free Dictionary API + Offline Fallback</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: THEMATIC CHAPTERS & JOURNEY MAP */}
        <section className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5" />
              Level Progression &amp; The Journey Map
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              8 Thematic Chapters across 500+ Nodes
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              Embark on a winding cognitive adventure with progressive difficulty, milestone chests, and 3-star rating calculations based on speed and hint conservation.
            </p>
          </div>

          {/* Chapter Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
            {CHAPTERS.map((ch, idx) => {
              const isSelected = selectedChapter === idx;
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapter(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-violet-600/30 to-indigo-600/20 border-violet-500 shadow-xl shadow-violet-950/40 scale-[1.02]'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/10'
                  }`}
                >
                  <div className="text-2xl mb-2">{ch.icon}</div>
                  <div className="text-xs text-white/50 font-bold uppercase">Chapter 0{ch.id}</div>
                  <div className="text-sm font-black text-white truncate">{ch.name}</div>
                  <div className="text-xs text-violet-400 font-semibold mt-1">{ch.levels} Levels</div>
                </button>
              );
            })}
          </div>

          {/* Active Chapter Details Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{CHAPTERS[selectedChapter].icon}</span>
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      Chapter 0{CHAPTERS[selectedChapter].id}: {CHAPTERS[selectedChapter].name}
                    </h3>
                    <p className="text-sm text-white/60 mt-0.5">
                      {CHAPTERS[selectedChapter].desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-white/40 uppercase font-bold">Reward Chests</div>
                  <div className="text-sm font-black text-amber-400">3 Milestones</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/40 uppercase font-bold">Max Stars</div>
                  <div className="text-sm font-black text-white">{CHAPTERS[selectedChapter].levels * 3} ★</div>
                </div>
              </div>
            </div>

            {/* Featured Vocabulary Samples */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                Sample Vocabulary Unlocked in This Chapter:
              </div>
              <div className="flex flex-wrap gap-2.5">
                {CHAPTERS[selectedChapter].words.map(w => (
                  <span
                    key={w}
                    className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-sm font-bold text-violet-300"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: EXHAUSTIVE 6-PILLAR ARCHITECTURAL BREAKDOWN */}
        <section className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Layers className="w-3.5 h-3.5" />
              Engine Architecture &amp; Gameplay Features
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Engineered with Mathematical Precision
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              Explore the 6 core engineering pillars that power LexiBrain: from procedural matrix generators to zero-tracking Room DB security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-violet-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-1">Pillar 01</div>
                <h3 className="text-xl font-black text-white mb-3">
                  Core Puzzle Mechanics &amp; Grid Engine
                </h3>
                <ul className="text-sm text-white/70 space-y-2.5 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span><strong>Dynamic Procedural Matrix:</strong> 8-way word placement (horizontal, vertical, diagonal, and reverse).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span><strong>Fluid Touch Selection:</strong> Drag-and-connect letter trails with haptic pulse confirmation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span><strong>Adaptive Grid Scaling:</strong> Begins at accessible 5x5 matrices and scales dynamically up to 10x10.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Pillar 02</div>
                <h3 className="text-xl font-black text-white mb-3">
                  The Vocabulary Vault &amp; Memory Cards
                </h3>
                <ul className="text-sm text-white/70 space-y-2.5 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Free Dictionary API:</strong> Real definitions, parts of speech, and sample sentences.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Rich In-Memory Fallback:</strong> Pre-cached dictionary entries guarantee offline study.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Native Android TTS:</strong> Instant audio pronunciation without server streaming.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                  <Wand2 className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">Pillar 03</div>
                <h3 className="text-xl font-black text-white mb-3">
                  Power-Ups, Hints &amp; Assist Tools
                </h3>
                <ul className="text-sm text-white/70 space-y-2.5 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Magnifying Glass:</strong> Illuminates the starting letter of any unfound word.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Magic Wand:</strong> Instantly highlights and solves a tricky intersecting word.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Grid Perspective Shuffle:</strong> Rotates the matrix to relieve visual fatigue without lost progress.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-fuchsia-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-5">
                  <Palette className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 mb-1">Pillar 04</div>
                <h3 className="text-xl font-black text-white mb-3">
                  Visual Aesthetics &amp; Cozy Themes
                </h3>
                <ul className="text-sm text-white/70 space-y-2.5 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                    <span><strong>Material 3 Dynamics:</strong> Centralized design token system with seamless light/dark palettes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                    <span><strong>4 Aesthetic Palettes:</strong> Classic Light, Midnight OLED Dark, Cozy Wood, and Neon Pulse.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                    <span><strong>Senior-Friendly Accessibility:</strong> Minimum 48dp touch targets and dynamic font scaling.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 5 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Pillar 05</div>
                <h3 className="text-xl font-black text-white mb-3">
                  Level Progression &amp; Journey Map
                </h3>
                <ul className="text-sm text-white/70 space-y-2.5 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>8 Curated Thematic Chapters:</strong> From Biology to Astronomy and World Mythology.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>Winding Node Path:</strong> Visual path with unlocked and completed milestones.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>3-Star Performance Rating:</strong> Evaluated based on search speed and hint restraint.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 6 */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-teal-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">Pillar 06</div>
                <h3 className="text-xl font-black text-white mb-3">
                  Privacy &amp; Offline-First Architecture
                </h3>
                <ul className="text-sm text-white/70 space-y-2.5 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>100% Offline Capable:</strong> Playable anywhere without cellular reception or Wi-Fi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>Zero Mandatory Accounts:</strong> Instant guest play with zero signup barriers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span><strong>Encrypted Room Database:</strong> All saved progress stays strictly on the client hardware.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: SEO KEYWORD RESEARCH STRATEGY TABLE */}
        <section className="mb-24">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-violet-400 mb-2">
                <Search className="w-3.5 h-3.5" />
                SEO Search Authority &amp; Intent Strategy
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                High Search Volume &amp; Low Keyword Difficulty (KD) Matrix
              </h2>
              <p className="text-white/60 text-sm sm:text-base mt-2">
                Targeting high-intent searchers looking for relaxing offline games, vocabulary builders, brain training, and senior-friendly word puzzles.
              </p>
            </div>

            {/* Keyword Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs font-bold uppercase tracking-wider">
                    <th className="pb-4 pr-6">Target Keyword</th>
                    <th className="pb-4 pr-6">Search Intent</th>
                    <th className="pb-4 pr-6">KD Tier</th>
                    <th className="pb-4">Strategic Section &amp; Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  <tr>
                    <td className="py-3.5 pr-6 font-bold text-violet-300">offline word search game</td>
                    <td className="py-3.5 pr-6"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold">Commercial / Install</span></td>
                    <td className="py-3.5 pr-6 font-semibold text-emerald-400">Low (Sweet Spot)</td>
                    <td className="py-3.5 text-white/60">H1, Meta Title, App Description, Introduction</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-6 font-bold text-violet-300">word search with definitions</td>
                    <td className="py-3.5 pr-6"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-semibold">Informational / Ed</span></td>
                    <td className="py-3.5 pr-6 font-semibold text-emerald-400">Low KD</td>
                    <td className="py-3.5 text-white/60">Vocabulary Vault, Flashcard Architecture</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-6 font-bold text-violet-300">vocabulary brain puzzle</td>
                    <td className="py-3.5 pr-6"><span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-xs font-semibold">Educational / Health</span></td>
                    <td className="py-3.5 pr-6 font-semibold text-emerald-400">Low KD</td>
                    <td className="py-3.5 text-white/60">Cognitive Health, Neuroplasticity Benefits</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-6 font-bold text-violet-300">relaxing word puzzle for adults</td>
                    <td className="py-3.5 pr-6"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-semibold">Casual / Lifestyle</span></td>
                    <td className="py-3.5 pr-6 font-semibold text-emerald-400">Low KD</td>
                    <td className="py-3.5 text-white/60">Aesthetic Themes, Stress Relief, Calming Play</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-6 font-bold text-violet-300">word finder with pronunciation</td>
                    <td className="py-3.5 pr-6"><span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 text-xs font-semibold">Language Learning</span></td>
                    <td className="py-3.5 pr-6 font-semibold text-emerald-400">Very Low KD</td>
                    <td className="py-3.5 text-white/60">Text-To-Speech (TTS) Native Audio Pronunciation</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-6 font-bold text-violet-300">daily word puzzle offline</td>
                    <td className="py-3.5 pr-6"><span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 text-xs font-semibold">Habit / Retention</span></td>
                    <td className="py-3.5 pr-6 font-semibold text-emerald-400">Low KD</td>
                    <td className="py-3.5 text-white/60">Daily Streaks, Milestone Chests, Chapter Map</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Long-Tail Keywords Cloud */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                Target Long-Tail Query Targets:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "free word search puzzle no wifi",
                  "best word search game for seniors and adults",
                  "learn english words puzzle game",
                  "offline vocabulary builder app",
                  "interactive word memory cards",
                  "cozy word puzzle aesthetic board",
                  "classic word search with hints and powerups"
                ].map(term => (
                  <span key={term} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70">
                    {term}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 6: READY-TO-PUBLISH SEO ARTICLE & COPY */}
        <section className="mb-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 max-w-4xl mx-auto">
            
            {/* Article Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                <span className="font-bold text-white uppercase tracking-wider">SEO Article &amp; Store Description</span>
              </div>
              <div>6 Min Read • High Search Intent Copy</div>
            </div>

            {/* Article Headings */}
            <div className="mb-8">
              <div className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">Selected Feature Article</div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug mb-4">
                Looking for a Relaxing Offline Word Search Game? Discover LexiBrain: Hidden Words
              </h2>
              <div className="flex flex-wrap gap-2 text-xs text-white/60 italic">
                <span>Alternative Headlines:</span>
                <span className="text-violet-300">"How LexiBrain Combines Classic Word Puzzles with Real Vocabulary Brain Training"</span> • 
                <span className="text-violet-300">"LexiBrain Review: The Offline Word Search with Live Definitions and Pronunciation"</span>
              </div>
            </div>

            {/* Article Body Content */}
            <div className="space-y-6 text-white/80 leading-relaxed text-sm sm:text-base">
              <p>
                In an era dominated by high-stress mobile notifications and intrusive advertisements, finding a genuine moment of quiet focus has become a luxury. While classic word search puzzles have long offered a therapeutic escape, most modern mobile iterations suffer from the same fatal flaws: mandatory internet requirements, battery-draining telemetry, and disposable gameplay that leaves no lasting cognitive benefit.
              </p>

              <p>
                <strong className="text-white">LexiBrain: Hidden Words</strong> (available on the <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">Google Play Store</a>) redefines the genre. Engineered from the ground up as an offline-first cognitive sanctuary, it pairs high-precision procedural grid mechanics with a revolutionary <strong>Vocabulary Vault</strong> that transforms casual puzzle solving into deep linguistic mastery.
              </p>

              <h3 className="text-xl font-bold text-white pt-4">
                Beyond Generic Grids: The Power of Contextual Word Learning
              </h3>
              <p>
                The fundamental flaw of traditional word finders is that words evaporate the second they are circled. Players find words like <em>"Archipelago"</em> or <em>"Soliloquy"</em> without absorbing their real linguistic significance.
              </p>
              <p>
                LexiBrain bridges this gap with its integrated <strong>Vocabulary Vault &amp; Memory Cards</strong>. Each time a level concludes, every discovered word is cataloged into an interactive flashcard library. Tapping a card opens a rich reference interface complete with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li><strong>Clear, Authoritative Definitions:</strong> Powered by the Free Dictionary API with comprehensive in-memory offline fallbacks.</li>
                <li><strong>Native Audio Pronunciation:</strong> Utilizing Android’s built-in TextToSpeech engine to vocalize proper American and British accents without consuming mobile data.</li>
                <li><strong>Parts of Speech &amp; Etymology:</strong> Clear grammatical tagging (Noun, Verb, Adjective) and historical root origins.</li>
                <li><strong>Single-Tap Clipboard Export:</strong> Seamlessly copy terms and definitions directly into Anki decks or digital study notes.</li>
              </ul>

              <h3 className="text-xl font-bold text-white pt-4">
                Relaxing Aesthetics: Midnight OLED, Classic Paper &amp; Cozy Warmth
              </h3>
              <p>
                Screen fatigue is real. That is why LexiBrain discards eye-searing neon banners in favor of Material Design 3 calibrated colorways. Whether you prefer the soothing, battery-saving depths of <em>Midnight Dark</em> during late-night wind-downs, the crisp readability of <em>Classic Light</em>, or the warm bookish nostalgia of <em>Cozy Wood / Paper Craft</em>, LexiBrain tailors its sensory presentation to your environment.
              </p>

              <h3 className="text-xl font-bold text-white pt-4">
                Zero Logins, Zero Telemetry: Total Offline Freedom
              </h3>
              <p>
                True relaxation requires peace of mind. LexiBrain enforces a strict zero-tracking policy. All 500+ progressive puzzles, milestone stars, and vocabulary collections are preserved locally inside an encrypted on-device Room Database. Whether you are on a transatlantic flight in Airplane Mode or commuting through a subway tunnel with zero signal, LexiBrain opens instantly and plays flawlessly.
              </p>
            </div>

            {/* Article Footer CTA */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-white/50">
                Package Name: <code className="text-violet-300 font-mono">com.lexibrain.hiddenwords</code>
              </div>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download LexiBrain on Google Play</span>
              </a>
            </div>

          </div>
        </section>

        {/* SECTION 7: INTERACTIVE FAQ ACCORDION */}
        <section className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Player &amp; Technical Discovery FAQs
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">
              Everything you need to know about offline gameplay, dictionary caching, accessibility features, and privacy compliance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-bold text-white text-base sm:text-lg">
                      {faq.q}
                    </span>
                    <div className="p-1 rounded-full bg-white/5 shrink-0 text-white/70">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-white/70 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 8: FINAL CTA BANNER */}
        <section className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-violet-900/50 via-indigo-900/40 to-purple-900/50 border border-violet-500/30 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-violet-600/30 border border-violet-400/30 flex items-center justify-center text-violet-300 mx-auto mb-6 shadow-xl shadow-violet-950/50">
              <Brain className="w-8 h-8" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Start Expanding Your Vocabulary Today
            </h2>
            
            <p className="text-white/80 text-base sm:text-xl leading-relaxed mb-8">
              Join thousands of word lovers, seniors, and language students relaxing with LexiBrain. 100% offline, zero subscriptions, and an infinite lexicon to explore.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-white/90 font-black text-sm shadow-2xl shadow-white/20 transition-all hover:scale-105"
              >
                <Download className="w-5 h-5 text-violet-600" />
                <span>Install LexiBrain Free on Google Play</span>
              </a>
              <a
                href="/lexibrain/privacy-policy"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>View Privacy Policy</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Persistent Floating Bottom Bar on Mobile/Desktop */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-t border-white/10 px-4 py-3.5 animate-fadeIn">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-white">LexiBrain: Find Hidden Words</div>
                <div className="text-xs text-white/50">4.9 ★ • Offline Word Search &amp; Vocabulary Builder</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/lexibrain/privacy-policy"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                <span>Privacy Policy</span>
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get on Google Play</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 bg-[#07090e] text-xs text-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 Medhastone. All rights reserved. LexiBrain: Hidden Words (com.lexibrain.hiddenwords).
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Portfolio</button>
            <a href="/play-games" className="hover:text-white transition-colors">Free Web Games</a>
            <a href="/lexibrain/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="mailto:medhastone@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
