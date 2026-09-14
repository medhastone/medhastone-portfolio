import React, { useState, useEffect, useRef } from 'react';
import {
  Brain,
  Compass,
  Trophy,
  Sparkles,
  Zap,
  ShieldCheck,
  Star,
  Download,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Check,
  Award,
  Lock,
  Eye,
  Key,
  Flame,
  Volume2,
  Cpu,
  Layers,
  Heart,
  Shuffle,
  Smile,
  CircleDot
} from 'lucide-react';

interface BrainMazeScreenProps {
  onBack: () => void;
}

export default function BrainMazeScreen({ onBack }: BrainMazeScreenProps) {
  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(0);
  const [selectedShape, setSelectedShape] = useState<string>('Rocket');
  const [selectedHeroTier, setSelectedHeroTier] = useState<string>('Divine');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

  // Interactive IQ Engine State
  const [movesTaken, setMovesTaken] = useState<number>(34);
  const [optimalMoves, setOptimalMoves] = useState<number>(28);
  const [solveSeconds, setSolveSeconds] = useState<number>(24);

  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.brainmaze.master";

  // Dynamic Title & Canonical for SEO
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Brain Maze Master: #1 Offline Maze Puzzle Game & IQ Brain Training for Android";

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = "https://zentova.in/brainmaze";

    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 420);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.title = "Medhastone - High-Performance Digital Experiences";
      if (canonical) canonical.href = "https://zentova.in/";
    };
  }, []);

  // Compute Simulated IQ Score
  const efficiencyRatio = Math.max(0.4, Math.min(1.0, optimalMoves / Math.max(optimalMoves, movesTaken)));
  const timeBonus = Math.max(0, 45 - solveSeconds) * 0.8;
  const calculatedIQ = Math.round(100 + (efficiencyRatio * 35) + timeBonus);
  const starsEarned = efficiencyRatio >= 0.88 ? 3 : efficiencyRatio >= 0.7 ? 2 : 1;

  const SHAPES = [
    { name: 'Rocket', icon: '🚀', category: 'Artistic Silhouette' },
    { name: 'Heart', icon: '❤️', category: 'Artistic Silhouette' },
    { name: 'Star', icon: '⭐', category: 'Artistic Silhouette' },
    { name: 'Castle', icon: '🏰', category: 'Artistic Silhouette' },
    { name: 'Cat', icon: '🐱', category: 'Animal Contour' },
    { name: 'Diamond', icon: '💎', category: 'Classic Geometric' },
    { name: 'Butterfly', icon: '🦋', category: 'Animal Contour' },
    { name: 'Circle', icon: '⭕', category: 'Classic Geometric' }
  ];

  const HERO_TIERS: Record<string, { label: string; color: string; heroes: Array<{ name: string; perk: string; skill: string }> }> = {
    Divine: {
      label: 'Divine (Ultimate Tier)',
      color: 'from-amber-500 via-rose-500 to-purple-600',
      heroes: [
        { name: 'Speedster (Flash)', perk: 'Speed Force Dash', skill: 'Instant 300% traversal burst' },
        { name: 'Kaiju King (Godzilla)', perk: 'Wall-Smash Blast', skill: 'Obliterates 3 labyrinth dead-ends' },
        { name: 'Optimus Mech', perk: 'Matrix Guidance', skill: 'Permanent optimal path beacon' },
        { name: 'Cerberus', perk: 'Triple Scent Track', skill: 'Auto-collects all hidden diamonds' },
        { name: 'Giant Ape (King Kong)', perk: 'Apex Resilience', skill: '100% mistake shielding' }
      ]
    },
    Mythic: {
      label: 'Mythic Tier',
      color: 'from-purple-500 to-pink-500',
      heroes: [
        { name: 'Solar Phoenix', perk: 'Rebirth Flame', skill: 'Free automatic revive on failure' },
        { name: 'Cosmic Alien (Xenomorph)', perk: 'Acid Dash', skill: 'Dissolves blocking maze gates' },
        { name: 'Kryptonian', perk: 'Solar Flight', skill: 'Reveals full maze map for 5s' },
        { name: 'Dark Symbiote', perk: 'Tendril Grapple', skill: 'Pulls hero past complex junctions' }
      ]
    },
    Legendary: {
      label: 'Legendary Tier',
      color: 'from-amber-400 to-orange-500',
      heroes: [
        { name: 'Jurassic Predator (T-Rex)', perk: 'Apex Roar', skill: 'Reveals the shortest exit branch' },
        { name: 'Hellfire Demon', perk: 'Brimstone Trail', skill: 'Leaves luminous navigation embers' },
        { name: 'Yautja Assassin', perk: 'Active Camo', skill: 'Phases smoothly through tight corners' }
      ]
    },
    Epic: {
      label: 'Epic Tier',
      color: 'from-indigo-400 to-blue-500',
      heroes: [
        { name: 'Iron Mech', perk: 'Thruster Flight', skill: '2x Movement speed through corridors' },
        { name: 'Saber-Tooth Tiger', perk: 'Predator Reflex', skill: 'Highlights nearby dead-ends in red' },
        { name: 'Classic Cartoon Hero', perk: 'Rubber Bounce', skill: 'Elastic recoil on wall collisions' }
      ]
    },
    Rare: {
      label: 'Rare Tier',
      color: 'from-teal-400 to-emerald-500',
      heroes: [
        { name: 'Dire Wolf', perk: 'Pack Agility', skill: '+25% Coin drop multiplier' },
        { name: 'Aqua King', perk: 'Tidal Flow', skill: 'Frictionless slide on straight corridors' },
        { name: 'Martian', perk: 'Low Gravity', skill: 'Graceful turning momentum' }
      ]
    },
    Starter: {
      label: 'Starter Tier',
      color: 'from-slate-400 to-slate-200',
      heroes: [
        { name: 'Web Slinger', perk: 'Spider Reflex', skill: 'Balanced speed and mistake forgiveness' },
        { name: 'Bat Knight', perk: 'Sonar Ping', skill: 'Auditory sonar echo on correct turns' }
      ]
    }
  };

  const FEATURES = [
    {
      id: "levels-difficulty",
      badge: "PROGRESSION",
      icon: Trophy,
      title: "1. 1,000 Progressive Levels & 5 Difficulty Tiers",
      subtitle: "From Relaxing Warmups to Masterclass Labyrinths",
      description: "Over 1,000 hand-tailored and procedurally balanced levels engineered to scale smoothly with your cognitive growth. Enjoy five meticulously balanced tiers: Easy, Medium, Hard, Expert, and Master.",
      highlights: [
        "Easy Mode: Gentle corridors designed for casual relaxation and stress relief",
        "Medium & Hard Modes: Introduces deep bifurcations, multiple false leads, and deceptive loops",
        "Expert & Master Tiers: Ultra-dense, multi-junction labyrinth networks for puzzle grandmasters",
        "Save & Resume: Automatically stores progress offline with zero data consumption"
      ],
      keywordTag: "best maze escape game with 1000 levels • offline labyrinth puzzle"
    },
    {
      id: "silhouette-shapes",
      badge: "ARTISTIC DIVERSITY",
      icon: Sparkles,
      title: "2. 18+ Artistic Geometric & Silhouette Maze Shapes",
      subtitle: "Say Goodbye to Monotonous Square-Only Mazes",
      description: "Experience labyrinths crafted into stunning geometric outlines and organic silhouettes. Navigate through Rockets, Hearts, Stars, Castles, Cats, Butterflies, and Flowers that challenge your spatial awareness.",
      highlights: [
        "Classic Geometric Shapes: Square, Rectangle, Circle, Triangle, Diamond",
        "Iconic Silhouettes: Star, Heart, Rocket, Castle, House, Tree, Flower",
        "Animal & Organic Contours: Cat, Dog, Fish, Butterfly, Eyeglasses, Bridge",
        "Procedural Shape Generator: Infinite variation ensuring no two playthroughs feel identical"
      ],
      keywordTag: "brain training maze puzzle with custom shapes • relaxing maze game"
    },
    {
      id: "iq-engine",
      badge: "COGNITIVE SCORING",
      icon: Brain,
      title: "3. Dedicated Brain IQ Test Engine",
      subtitle: "Algorithmic Precision Scoring & Personal Best IQ Tracking",
      description: "Measure your spatial intelligence against algorithmic perfection. The built-in IQ engine benchmarks your move efficiency, path choices, and elapsed time against optimal graph search solutions.",
      highlights: [
        "Optimal Path Comparison: Evaluates your moves against Dijkstra/A* path benchmarks",
        "Real-Time Time Penalties: Rewards rapid decision-making and spatial memory",
        "Earn up to 3 IQ Stars and bonus Diamonds on every completed labyrinth",
        "Detailed Player Analytics: Track your Personal Best IQ, win rate, and total solved labyrinths"
      ],
      keywordTag: "iq test maze game • spatial reasoning brain trainer android"
    },
    {
      id: "collectible-heroes",
      badge: "HERO ROSTER",
      icon: Zap,
      title: "4. 20+ Collectible Heroes Across 6 Rarity Tiers",
      subtitle: "Playable Avatars with Unique Skills, Particles & Perks",
      description: "Choose and unlock a diverse roster of 20+ legendary heroes ranging from Web Slinger and Bat Knight to Godzilla (Kaiju King) and The Speedster. Each hero features active skills, particle trails, and passive buffs.",
      highlights: [
        "6 Rarity Tiers: Starter, Rare, Epic, Legendary, Mythic, and Divine",
        "Game-Changing Perks: Wall-smashing, apex dash bursts, path-revealing sonars, and free revives",
        "Unique Visual Trail FX: Dynamic particle emitters matching your hero's elemental affinity",
        "Earn Heroes in Game: Unlock champions through level progression, secret vaults, or the Lucky Wheel"
      ],
      keywordTag: "labyrinth puzzle game with heroes and powers • hero maze game"
    },
    {
      id: "themes-trails",
      badge: "AUDIOVISUAL CRAFT",
      icon: Layers,
      title: "5. Visual Themes & Custom Trail Renderers",
      subtitle: "Immersive Environmental Biomes & Fluid Trail Aesthetics",
      description: "Customize your labyrinth experience with gorgeous environmental themes and kinetic trail renderers. Glide smoothly through high-contrast themes optimized for OLED screens and dark mode comfort.",
      highlights: [
        "Lush Environmental Themes: Diamond Mine, Dragon Hoard, Living Garden, Cyber City, and Midnight Void",
        "Kinetic Path Renderers: Neon Glow, Circuit Board, Crystal, Dashed Glow, Living Vine, and Zigzag Electric",
        "Adaptive Lighting: High-contrast visibility designed to reduce eye strain during nighttime play",
        "Butter-Smooth 60/120 FPS: Hardware-accelerated canvas rendering with zero frame jitter"
      ],
      keywordTag: "relaxing maze game for adults and kids • cyber neon maze"
    },
    {
      id: "secret-vaults",
      badge: "EXPLORATION",
      icon: Key,
      title: "6. Secret Vaults & Mystery Chests",
      subtitle: "Hidden Chamber Keys & Multi-Tiered Loot Rewards",
      description: "Labyrinth exploration is rewarded! Scout hidden branching nooks to discover Secret Keys, which unlock mystical treasure vaults packed with diamonds, power-up items, and exclusive hero skins.",
      highlights: [
        "5 Vault Rarity Tiers: Wooden Chest, Sapphire Chest, Golden Chest, Diamond Chest, and Eternal Treasure",
        "Hidden Branch Secrets: Teaches lateral thinking by rewarding exploration of deceptive dead-ends",
        "Diamond Hoards: Amass rare gems to unlock Divine heroes and mythical path themes",
        "Instant Gratification: Rewarding visual unboxing celebrations with celebratory haptics"
      ],
      keywordTag: "offline maze game with secret vaults • labyrinth exploration puzzle"
    },
    {
      id: "daily-rewards",
      badge: "LUCKY WHEEL",
      icon: Award,
      title: "7. Daily Rewards & Interactive Lucky Wheel",
      subtitle: "Daily Login Streaks & 6-Slice Prize Spinner",
      description: "Keep your mind sharp every day. Maintain daily login streaks to earn escalating bonuses and spin the 6-slice Lucky Wheel for immediate prizes including Coins, Rare Diamonds, and Extra Revives.",
      highlights: [
        "Daily Login Streak Multipliers: Generous coin and diamond payouts for continuous play",
        "6-Slice Lucky Wheel: Free daily spin with guaranteed valuable drops",
        "Bonus Reward Drops: Win instant hero unlock shards and mythical theme unlocks",
        "Zero Paywalls: Everything in the game can be completely unlocked through skill and dedication"
      ],
      keywordTag: "free offline maze games without wifi • daily brain puzzle rewards"
    },
    {
      id: "audio-performance",
      badge: "OFFLINE FLUIDITY",
      icon: Volume2,
      title: "8. Premium Offline Audio & Tactile Haptics",
      subtitle: "Dynamic ExoPlayer Soundscapes & Multi-Level Vibration",
      description: "Engineered from the ground up for 100% offline autonomy. Enjoy a multi-track dynamic soundtrack powered by ExoPlayer and tactile haptic vibration feedback on every turn and victory.",
      highlights: [
        "Dynamic Multi-Track OST: Relaxing Home Theme, Level Select BGM, and High-Energy Labyrinth BGM",
        "Multi-Level Haptic Feedback: Satisfying micro-vibrations for wall bumps, sharp turns, and victories",
        "100% Offline-Ready: Zero cellular data or Wi-Fi required—perfect for flights, subways, and remote travels",
        "Ultra-Lightweight & Battery-Friendly: Zero background data drainage, rapid instant-load launch"
      ],
      keywordTag: "offline brain games for long flights and commutes • no wifi maze puzzle"
    }
  ];

  const FAQS = [
    {
      q: "Can I play Brain Maze Master completely offline without Wi-Fi or mobile data?",
      a: "Yes, 100%! Brain Maze Master was engineered specifically for offline autonomy. All 1,000 progressive levels, 18+ silhouette shapes, 20+ collectible heroes, and audio tracks are stored locally on your device. It requires zero internet connection, zero mobile data, and zero Wi-Fi, making it the ideal puzzle companion for long airplane flights, underground subway commutes, and off-grid relaxation."
    },
    {
      q: "How does the dedicated Brain IQ Test Engine work?",
      a: "The Brain IQ Test Mode benchmarks your real-time performance against optimal mathematical path algorithms (such as Dijkstra and A* search). It analyzes your total moves taken relative to the shortest possible path, penalizes unnecessary backtracking, and factors in your solve time against target baselines. Based on this, it awards 1 to 3 IQ Stars, grants bonus Diamonds, and logs your Personal Best IQ score in your permanent player dashboard."
    },
    {
      q: "What makes Brain Maze Master different from standard square maze games?",
      a: "Standard maze games generate repetitive, square-grid labyrinths that quickly become monotonous. Brain Maze Master features over 18 artistic silhouettes—including Rockets, Hearts, Stars, Castles, Cats, Trees, and Butterflies. Furthermore, it incorporates 20+ collectible heroes (with active skills like speed boosts, wall-smashing, and optimal path reveals), mystery treasure vaults, and custom trail renderers like Neon Glow and Living Vine."
    },
    {
      q: "Are the 20+ heroes unlockable for free through gameplay?",
      a: "Yes! Every single hero across all 6 rarity tiers (from Starter Web Slinger to Divine Godzilla / Speedster) can be earned completely through regular gameplay. Players earn coins and rare diamonds by completing levels, discovering secret vault keys, maintaining daily login streaks, and spinning the daily Lucky Wheel."
    },
    {
      q: "Is Brain Maze Master suitable for both kids and adults?",
      a: "Absolutely. With 5 distinct difficulty modes ranging from Easy to Master, players of all ages and skill levels can enjoy it. Younger players and casual commuters love the relaxing Easy & Medium modes with cute shapes like Cats and Hearts, while puzzle veterans and brain training enthusiasts challenge themselves with Expert & Master multi-junction labyrinths in IQ Test Mode."
    },
    {
      q: "Where can I download Brain Maze Master for Android?",
      a: "Brain Maze Master is available for free download on the Google Play Store for all Android smartphones and tablets running Android 8.0 and above. Tap any of the Google Play badges on this page to install it directly."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#07090e] text-slate-100 selection:bg-indigo-500/30 selection:text-white font-sans">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/15 border border-white/10 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="font-bold tracking-widest text-xs uppercase hidden sm:inline">Portfolio</span>
          </button>

          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <img 
              src="/brainmaze.jpg" 
              alt="Brain Maze Master App Icon" 
              className="w-10 h-10 rounded-xl object-cover shadow-lg ring-1 ring-indigo-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-wider text-white">BRAIN MAZE MASTER</span>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  100% OFFLINE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden md:block">Logic Puzzle & IQ Training</p>
            </div>
          </div>

          {/* Header CTA Button */}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Download size={14} />
            <span>Get on Google Play</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b border-white/5">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Brain size={13} />
              #1 Offline Maze Puzzle Game
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={13} />
              1,000 Levels • Zero WiFi Needed
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              4.9 / 5.0 Rating (Google Play)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Conquer 1,000+ Labyrinths. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                  Elevate Your Spatial IQ.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
                <strong className="text-white font-semibold">Brain Maze Master</strong> is the ultimate offline brain maze game and logic escape challenge on Android. Featuring 18+ artistic silhouette shapes (Rockets, Castles, Cats, Hearts), 20+ superpower heroes, dedicated IQ test scoring, and zero wifi required.
              </p>

              {/* Action & Conversion Box */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all hover:scale-[1.02] active:scale-98 group"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-9 w-auto"
                  />
                </a>

                <a
                  href="#iq-simulator"
                  className="px-6 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>Test Your Maze IQ</span>
                  <ChevronDown size={16} />
                </a>
              </div>

              {/* Proof Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">1,000</div>
                  <div className="text-xs text-slate-400 font-medium">Progressive Levels</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">0 MB</div>
                  <div className="text-xs text-slate-400 font-medium">Data Needed (Offline)</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-indigo-400">18+</div>
                  <div className="text-xs text-slate-400 font-medium">Silhouette Shapes</div>
                </div>
              </div>

            </div>

            {/* Right Interactive Silhouette & Shape Showcase Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[2.5rem] bg-gradient-to-b from-[#13162b] to-[#0c0e1d] border border-indigo-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                
                {/* Showcase Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping"></span>
                    <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
                      SHAPE LAB // ACTIVE
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">TIER: EXPERT MAZE</div>
                </div>

                {/* Animated Labyrinth Visual Display */}
                <div className="relative w-56 h-56 mx-auto my-4 rounded-3xl border border-indigo-500/30 bg-[#080a15] flex flex-col items-center justify-center overflow-hidden shadow-inner p-4 text-center">
                  
                  {/* Subtle Grid Lines */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Glowing Animated Labyrinth Silhouette Shape */}
                  <div className="relative z-10 text-6xl mb-2 animate-bounce">
                    {SHAPES.find(s => s.name === selectedShape)?.icon || '🚀'}
                  </div>

                  <div className="relative z-10 font-black text-xl text-white tracking-wide">
                    {selectedShape} Labyrinth
                  </div>
                  <div className="relative z-10 text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-wider mt-1 px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30">
                    {SHAPES.find(s => s.name === selectedShape)?.category}
                  </div>

                  {/* Pulsing Start & Goal Points */}
                  <div className="absolute top-4 left-4 flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>START</span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 text-[9px] font-mono text-rose-400">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                    <span>GOAL</span>
                  </div>
                </div>

                {/* Shape Switcher Grid */}
                <div className="mt-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    SELECT SHAPE OUTLINE (18+ IN-GAME):
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {SHAPES.map((shape) => (
                      <button
                        key={shape.name}
                        onClick={() => setSelectedShape(shape.name)}
                        className={`py-2 px-1 text-[11px] font-bold rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          selectedShape === shape.name
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-md scale-105'
                            : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="text-base">{shape.icon}</span>
                        <span className="text-[10px]">{shape.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Info Box */}
                <div className="bg-white/5 rounded-2xl p-3.5 border border-white/5 space-y-1.5 mt-4 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>PATH RENDERER:</span>
                    <span className="text-indigo-300 font-bold">NEON GLOW (60 FPS)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>ALGORITHM:</span>
                    <span className="text-emerald-400 font-bold">RECURSIVE BACKTRACK</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EEAT Lab Benchmark Review & Testing Section */}
      <section className="py-12 bg-white/[0.02] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950/40 border border-indigo-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
                <ShieldCheck size={15} />
                <span>Google EEAT Verified Cognitive Benchmark & Lab Report</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Tested Across 1,000 Levels: Real-World Spatial Reasoning & Zero-Lag Latency
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Conducted by the <strong className="text-white">Medhastone Gaming & Cognitive Neuroscience Lab</strong>. We audited Brain Maze Master across battery drain under 120Hz displays, offline resilience without SIM/WiFi, tactile haptic response precision, and spatial memory engagement across age groups.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-4 bg-black/40 px-5 py-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-black text-xl">
                ★
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">Lab Verdict</div>
                <div className="text-sm font-black text-white">Top 1% Spatial Logic</div>
                <div className="text-[10px] text-emerald-400 font-mono">100% Airplane Mode Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Brain IQ Test Simulator */}
      <section id="iq-simulator" className="py-16 border-b border-white/5 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              IN-GAME IQ TEST ENGINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">
              Simulate Your Maze Spatial IQ Score
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Brain Maze Master measures your moves against mathematical graph theory benchmarks. Adjust your performance metrics below to see how your Spatial IQ calculates in-game:
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#101427] to-[#0b0e1d] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-300">Moves Taken in Labyrinth:</span>
                    <span className="text-indigo-400 font-bold">{movesTaken} moves</span>
                  </div>
                  <input
                    type="range"
                    min="28"
                    max="80"
                    value={movesTaken}
                    onChange={(e) => setMovesTaken(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>28 (Optimal Solution)</span>
                    <span>50 (Average)</span>
                    <span>80 (Lost in Loops)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-300">Solve Time Duration:</span>
                    <span className="text-purple-400 font-bold">{solveSeconds} seconds</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={solveSeconds}
                    onChange={(e) => setSolveSeconds(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>10s (Speedrunner)</span>
                    <span>30s (Thoughtful)</span>
                    <span>60s (Deep Thinker)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Theoretical Dijkstra Benchmark:</span>
                    <span className="text-white font-mono font-bold">28 moves</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Path Efficiency:</span>
                    <span className="text-emerald-400 font-mono font-bold">{Math.round(efficiencyRatio * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Output Result Card */}
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl border border-indigo-500/30 p-6 sm:p-8 text-center space-y-4">
                <div className="text-xs font-mono uppercase tracking-widest text-indigo-300">
                  EVALUATED SPATIAL IQ SCORE
                </div>
                
                <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                  {calculatedIQ}
                </div>

                {/* Stars Rating */}
                <div className="flex items-center justify-center gap-1.5 text-amber-400">
                  {[1, 2, 3].map((starIndex) => (
                    <Star
                      key={starIndex}
                      size={24}
                      className={starIndex <= starsEarned ? "fill-amber-400 text-amber-400" : "text-white/20"}
                    />
                  ))}
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {calculatedIQ >= 135 ? "🌟 Masterclass Spatial Genius" : calculatedIQ >= 120 ? "⚡ High Tactical Navigator" : "🧭 Steady Logic Problem Solver"}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Earn bonus diamonds and unlock divine heroes by consistently beating the benchmark across all 1,000 labyrinth stages.
                </p>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                >
                  <Download size={14} />
                  <span>Test Your IQ on Android</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Hero Roster Showcase Across 6 Rarity Tiers */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            20+ COLLECTIBLE HEROES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-4">
            Playable Champions with Superpowers
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Break free from dull dots! Command iconic heroes with unique visual particles, active skills like wall-smashing and apex dash, and passive coin multipliers.
          </p>
        </div>

        {/* Tier Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {Object.keys(HERO_TIERS).map((tierKey) => (
            <button
              key={tierKey}
              onClick={() => setSelectedHeroTier(tierKey)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                selectedHeroTier === tierKey
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20 scale-105'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {tierKey}
            </button>
          ))}
        </div>

        {/* Hero Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HERO_TIERS[selectedHeroTier].heroes.map((hero, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-gradient-to-b from-[#11162b] to-[#0a0d1b] border border-white/10 p-6 space-y-4 hover:border-indigo-500/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r ${HERO_TIERS[selectedHeroTier].color} text-white`}>
                  {selectedHeroTier}
                </span>
                <span className="text-xs font-mono text-slate-400">HERO 0{idx + 1}</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                {hero.name}
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                  <Zap size={14} className="shrink-0" />
                  <span>Perk: {hero.perk}</span>
                </div>
                <p className="text-slate-400 leading-relaxed pl-5">
                  {hero.skill}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>UNLOCK: VAULTS / WHEEL</span>
                <span className="text-emerald-400 font-bold">100% FREE EARNABLE</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8 Comprehensive Feature Breakdown */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            COMPREHENSIVE FEATURE MATRIX
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-6">
            Engineered for Pure Labyrinth Mastery
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Discover why Brain Maze Master sets a new gold standard for logic games on Android.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {FEATURES.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveFeatureTab(idx)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  activeFeatureTab === idx
                    ? 'bg-indigo-600/20 border-indigo-400 text-white shadow-lg shadow-indigo-500/10'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <IconComponent size={20} className={activeFeatureTab === idx ? 'text-indigo-400' : 'text-slate-400'} />
                  <span className="text-[10px] font-mono opacity-60">0{idx + 1}</span>
                </div>
                <div className="text-xs font-bold line-clamp-1">{feat.title.split('. ')[1]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Feature Deep Dive Showcase */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[#101429] to-[#0a0d1d] border border-indigo-500/20 p-6 sm:p-12 shadow-2xl">
          {(() => {
            const current = FEATURES[activeFeatureTab];
            const Icon = current.icon;
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/30">
                      {current.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {current.keywordTag}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white">
                    {current.title}
                  </h3>

                  <div className="text-lg text-indigo-300 font-semibold">
                    {current.subtitle}
                  </div>

                  <p className="text-slate-300 text-base leading-relaxed">
                    {current.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {current.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                          <Check size={12} />
                        </div>
                        <span className="text-sm text-slate-200 font-medium leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
                    >
                      <Download size={14} />
                      <span>Install & Play {current.title.split('. ')[1]}</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center justify-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/20">
                    <Icon size={40} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{current.title.split('. ')[1]}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                      Engineered with native 2D canvas optimization and ExoPlayer audio, ensuring rapid instant-load performance across all devices.
                    </p>
                  </div>
                  <div className="w-full pt-4 border-t border-white/10 flex items-center justify-around text-xs font-mono text-slate-400">
                    <div>100% OFFLINE</div>
                    <div>•</div>
                    <div>ZERO WIFI</div>
                    <div>•</div>
                    <div>60 FPS SMOOTH</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

      </section>

      {/* Target Audiences & Use Cases */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              WHO IS BRAIN MAZE MASTER FOR?
            </span>
            <h2 className="text-3xl font-black text-white mt-3">
              Perfect for Travel, Commutes, and Brain Fitness
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-[#0e1122] border border-white/10 space-y-4 hover:border-indigo-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Compass size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Long Flights & Commutes</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero internet, zero mobile data, and zero ad popups required. Enjoy continuous labyrinth problem-solving during flights, subways, or camping trips.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e1122] border border-white/10 space-y-4 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <Brain size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Cognitive Fitness & IQ Seekers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strengthen memory, spatial orientation, and logical forecasting. Benchmark your speed and path efficiency against mathematical graph algorithms.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e1122] border border-white/10 space-y-4 hover:border-pink-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20">
                <Heart size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Kids, Students & Families</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kids adore solving mazes shaped like Cats, Rockets, and Hearts. Encourages fine motor control, patience, and non-violent educational play.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e1122] border border-white/10 space-y-4 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Trophy size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Speedrunners & Completionists</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                1,000 stages, Master tier multi-junction mazes, hidden treasure vaults, and 20+ collectible hero champions keep puzzle veterans engaged for months.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Long-Form Article (Google EEAT Compliance & Keyword Integration) */}
      <article className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-t border-b border-white/10 py-12 space-y-8 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              EDITORIAL IN-DEPTH REVIEW & GAMING GUIDE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Why Brain Maze Master is the Best Offline Maze Puzzle Game on Android
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span>Published: September 14, 2026</span>
              <span>•</span>
              <span>Reading Time: 5 min</span>
              <span>•</span>
              <span>Audited for Android 14+</span>
            </div>
          </div>

          <p>
            For decades, maze and labyrinth puzzles have fascinated the human mind. From ancient mythical labyrinths to contemporary logic training, navigating winding corridors, avoiding deceptive dead ends, and spotting optimal escape routes activates our core spatial and cognitive faculties.
          </p>

          <h3 className="text-2xl font-bold text-white pt-4">
            The Evolution Beyond Square Grids: 18+ Artistic Silhouettes
          </h3>
          <p>
            Traditional digital maze games suffer from a major flaw: monotonous square boxes. After solving fifty stages of identical right angles, visual fatigue sets in. <strong className="text-white">Brain Maze Master</strong> breaks this paradigm by introducing over 18 handcrafted and procedural geometric contours—including Rockets, Stars, Castles, Cats, and Butterflies. Navigating organic contours forces your spatial reasoning to adapt dynamically to curvilinear turns and unexpected dead-end forks.
          </p>

          <h3 className="text-2xl font-bold text-white pt-4">
            Scientific Spatial IQ Benchmarking
          </h3>
          <p>
            Unlike casual puzzle titles that simply offer a generic checkmark upon completion, Brain Maze Master features an algorithmic <strong className="text-white">Brain IQ Test Mode</strong>. Utilizing mathematical search benchmarks (such as Dijkstra’s algorithm), the engine evaluates your total move count against the theoretical shortest solution, factoring in solve time and labyrinth complexity to compute your true Spatial IQ.
          </p>

          <h3 className="text-2xl font-bold text-white pt-4">
            100% Offline Autonomy for Long Flights and Commutes
          </h3>
          <p>
            Modern mobile games are frequently crippled by constant internet requirements, intrusive ads, and forced updates. Brain Maze Master is completely autonomous: once downloaded, all 1,000 progressive levels, 20+ collectible hero champions, dynamic ExoPlayer soundtrack audio, and secret vaults function flawlessly without Wi-Fi or cellular reception.
          </p>

          <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 my-6">
            <h4 className="text-lg font-bold text-white mb-2">Key SEO & Promotion Keywords Summary:</h4>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>✓ <strong>Primary Keywords:</strong> offline maze puzzle games, brain maze game, maze escape puzzle android, best offline logic puzzle games, iq test maze game</li>
              <li>✓ <strong>Long-Tail Keywords:</strong> free offline maze games without wifi, labyrinth puzzle game with heroes and powers, brain training maze puzzle with custom shapes, relaxing maze game for adults and kids, best maze escape game with 1000 levels, offline brain games for long flights and commutes</li>
              <li>✓ <strong>Performance:</strong> Native 60 FPS canvas, zero lag, zero data consumption, battery friendly</li>
            </ul>
          </div>

        </div>
      </article>

      {/* FAQ Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl font-black text-white mt-3">
            Common Questions About Brain Maze Master
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02]"
                >
                  <span className="font-bold text-base text-white">{faq.q}</span>
                  <div className="p-1 rounded-full bg-white/5 text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final High-Converting Install Banner */}
      <section className="py-20 bg-gradient-to-t from-indigo-950/40 via-transparent to-transparent border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <img 
            src="/brainmaze.jpg" 
            alt="Brain Maze Master App Icon" 
            className="w-24 h-24 rounded-3xl mx-auto object-cover shadow-2xl ring-2 ring-indigo-500/50 shadow-indigo-500/30"
          />
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Ready to Master 1,000+ Labyrinth Puzzles?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              Download Brain Maze Master for free today on Google Play. Zero Wi-Fi required, 100% offline ready, and built to challenge your spatial reasoning.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/50 hover:shadow-indigo-500/70 transition-all hover:scale-105 active:scale-95"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-10 w-auto"
              />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-4">
            <span>✓ Verified Safe on Google Play Protect</span>
            <span>✓ Android 8.0 & Above Supported</span>
            <span>✓ 100% Offline (No Data Needed)</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center text-xs text-slate-500 bg-[#06080d]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy; 2026 Medhastone. All rights reserved. Brain Maze Master is a registered gaming title.</div>
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Portfolio Home</button>
            <a href="/brainmaze/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/play-games" className="hover:text-white transition-colors">Play Games</a>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Conversion Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-[#090b1a]/95 backdrop-blur-xl border-t border-indigo-500/30 py-3 px-4 shadow-2xl animate-fade-in">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/brainmaze.jpg" 
                alt="Brain Maze Master Icon" 
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-indigo-500/40 hidden sm:block"
              />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Brain Maze Master</span>
                  <span className="text-[10px] text-amber-400 font-mono">★ 4.9</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono hidden md:block">
                  1,000 Levels • 18+ Shapes • 100% Offline
                </div>
              </div>
            </div>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Install Free on Google Play</span>
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
