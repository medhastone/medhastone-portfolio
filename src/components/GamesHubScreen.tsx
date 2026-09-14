import { 
  Search, 
  ArrowLeft, 
  Gamepad2, 
  Brain, 
  Zap, 
  Keyboard, 
  ShieldCheck, 
  Smartphone, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Flame, 
  Sparkles,
  BookOpen,
  Trophy,
  Target,
  Laptop,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Layers
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { playButton } from '../game/audio';

export interface GameItem {
  id: string;
  title: string;
  category: 'arcade' | 'puzzle' | 'casual' | 'words';
  categoryName: string;
  plays: string;
  path: string;
  color: string;
  icon: string;
  isNative?: boolean;
  tag: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  avgTime: string;
}

export const GAMES: GameItem[] = [
  { 
    id: "bubble-mania", 
    title: "Bubble Pop Mania", 
    category: "casual",
    categoryName: "Casual & Reflex",
    plays: "520k", 
    path: "#bubble-mania", 
    color: "from-indigo-500 to-purple-800", 
    icon: "🫧", 
    isNative: true,
    tag: "Popular",
    description: "Aim, match 3, and pop colorful bubbles in this addictive classic bubble shooter arcade puzzle.",
    difficulty: "Easy",
    avgTime: "3-5 mins"
  },
  { 
    id: "chess-ai", 
    title: "Chess AI Master", 
    category: "puzzle",
    categoryName: "Brain & Strategy",
    plays: "210k", 
    path: "/games/chess-ai/index.html", 
    color: "from-slate-600 to-slate-800", 
    icon: "♟️",
    tag: "Strategy",
    description: "Play free online chess against computer AI bots. Test opening moves, calculate tactics, and master endgames.",
    difficulty: "Challenging",
    avgTime: "10-20 mins"
  },
  { 
    id: "neon-snake", 
    title: "Neon Snake Retro", 
    category: "arcade",
    categoryName: "Retro & Arcade",
    plays: "112k", 
    path: "/games/neon-snake/index.html", 
    color: "from-lime-400 to-green-500", 
    icon: "🐍",
    tag: "Retro",
    description: "The classic retro Nokia snake game rebuilt with glowing neon aesthetics and precision responsive controls.",
    difficulty: "Medium",
    avgTime: "3-8 mins"
  },
  { 
    id: "minesweeper", 
    title: "Minesweeper Classic", 
    category: "puzzle",
    categoryName: "Brain & Strategy",
    plays: "78k", 
    path: "/games/minesweeper/index.html", 
    color: "from-gray-500 to-gray-700", 
    icon: "💣",
    tag: "Logic",
    description: "Classic retro desktop minesweeper puzzle. Use logic deduction to flag hidden mines without triggering a blast.",
    difficulty: "Medium",
    avgTime: "5-10 mins"
  },
  { 
    id: "sudoku-master", 
    title: "Sudoku Master", 
    category: "puzzle",
    categoryName: "Brain & Strategy",
    plays: "40k", 
    path: "/games/sudoku-master/index.html", 
    color: "from-sky-400 to-blue-600", 
    icon: "📝",
    tag: "Brain",
    description: "Daily brain-training number logic puzzle. Solve 9x9 grids with clean digit inputs and smart hint assists.",
    difficulty: "Challenging",
    avgTime: "10-15 mins"
  },
  { 
    id: "flappy-bird", 
    title: "Flappy Bird Tap", 
    category: "arcade",
    categoryName: "Retro & Arcade",
    plays: "340k", 
    path: "/games/flappy-bird/index.html", 
    color: "from-yellow-400 to-orange-500", 
    icon: "🐦",
    tag: "Trending",
    description: "Test your timing, patience, and reflexes flying through pipe obstacles in this viral tap reflex arcade challenge.",
    difficulty: "Challenging",
    avgTime: "2-4 mins"
  },
  { 
    id: "space-shooter", 
    title: "Space Shooter Galaxy", 
    category: "arcade",
    categoryName: "Retro & Arcade",
    plays: "200k", 
    path: "/games/space-shooter/index.html", 
    color: "from-violet-600 to-purple-900", 
    icon: "🚀",
    tag: "Action",
    description: "Fast-paced retro space galaxy invader arcade. Dodge hostile laser fire and blast waves of alien starships.",
    difficulty: "Medium",
    avgTime: "5-8 mins"
  },
  { 
    id: "racing-2d", 
    title: "Racing 2D Highway", 
    category: "arcade",
    categoryName: "Retro & Arcade",
    plays: "150k", 
    path: "/games/racing-2d/index.html", 
    color: "from-red-500 to-rose-700", 
    icon: "🏎️",
    tag: "Speed",
    description: "High-octane top-down pixel highway traffic racer. Overtake cars, collect boosts, and push top velocity.",
    difficulty: "Medium",
    avgTime: "3-6 mins"
  },
  { 
    id: "arrow-scape", 
    title: "Arrow Scape Dodge", 
    category: "arcade",
    categoryName: "Retro & Arcade",
    plays: "120k", 
    path: "/games/arrow-scape/index.html", 
    color: "from-blue-500 to-indigo-600", 
    icon: "🏹",
    tag: "Arcade",
    description: "High-speed arrow reflex runner. Navigate narrow labyrinth corridors and dodge dynamic kinetic barriers.",
    difficulty: "Challenging",
    avgTime: "2-5 mins"
  },
  { 
    id: "block-stack", 
    title: "Block Stack Tower", 
    category: "casual",
    categoryName: "Casual & Reflex",
    plays: "89k", 
    path: "/games/block-stack/index.html", 
    color: "from-orange-500 to-red-500", 
    icon: "🧱",
    tag: "Timing",
    description: "Precision timing tower stacking game. Drop sliding blocks to build the tallest skyscraper without overhang slices.",
    difficulty: "Easy",
    avgTime: "3-5 mins"
  },
  { 
    id: "pong-classic", 
    title: "Pong Classic 1972", 
    category: "arcade",
    categoryName: "Retro & Arcade",
    plays: "67k", 
    path: "/games/pong-classic/index.html", 
    color: "from-zinc-700 to-black", 
    icon: "🏓",
    tag: "Classic",
    description: "The timeless vintage video table tennis duel. Defend your goal and deflect high-speed rallies past the computer paddle.",
    difficulty: "Easy",
    avgTime: "3-6 mins"
  },
  { 
    id: "typing-speed", 
    title: "Typing Speed Test", 
    category: "words",
    categoryName: "Words & Typing",
    plays: "15k", 
    path: "/games/typing-speed/index.html", 
    color: "from-fuchsia-500 to-pink-600", 
    icon: "⌨️",
    tag: "Skill",
    description: "Test and train your Words Per Minute (WPM) typing speed with real-time accuracy percentages and keystroke metrics.",
    difficulty: "Medium",
    avgTime: "1-3 mins"
  },
  { 
    id: "wordverse", 
    title: "Wordverse Vocabulary", 
    category: "words",
    categoryName: "Words & Typing",
    plays: "90k", 
    path: "/games/wordverse/index.html", 
    color: "from-amber-400 to-orange-500", 
    icon: "📚",
    tag: "Words",
    description: "Challenging anagram and vocabulary search puzzle. Connect letters to discover hidden words and expand vocabulary.",
    difficulty: "Medium",
    avgTime: "5-10 mins"
  },
  { 
    id: "memory-match", 
    title: "Memory Match Cards", 
    category: "puzzle",
    categoryName: "Brain & Strategy",
    plays: "56k", 
    path: "/games/memory-match/index.html", 
    color: "from-pink-400 to-rose-500", 
    icon: "🧠",
    tag: "Memory",
    description: "Visual memory and pattern recognition card flip game. Train visual recall and concentration across escalating grid sizes.",
    difficulty: "Easy",
    avgTime: "3-5 mins"
  },
  { 
    id: "mathgenius", 
    title: "Math Genius Quiz", 
    category: "puzzle",
    categoryName: "Brain & Strategy",
    plays: "22k", 
    path: "/games/mathgenius/index.html", 
    color: "from-indigo-500 to-blue-600", 
    icon: "🔢",
    tag: "Math",
    description: "Speed arithmetic calculation game. Answer rapid addition, subtraction, multiplication, and division problems under time pressure.",
    difficulty: "Medium",
    avgTime: "2-5 mins"
  },
  { 
    id: "tic-tac-toe", 
    title: "Tic Tac Toe AI", 
    category: "casual",
    categoryName: "Casual & Reflex",
    plays: "34k", 
    path: "/games/tic-tac-toe/index.html", 
    color: "from-teal-400 to-emerald-500", 
    icon: "❌",
    tag: "Casual",
    description: "The classic Xs and Os noughts-and-crosses casual board game. Play against an intelligent minimax AI opponent.",
    difficulty: "Easy",
    avgTime: "1-2 mins"
  },
  { 
    id: "color-dash", 
    title: "Color Dash Match", 
    category: "casual",
    categoryName: "Casual & Reflex",
    plays: "12k", 
    path: "/games/color-dash/index.html", 
    color: "from-green-400 to-emerald-600", 
    icon: "🎨",
    tag: "Casual",
    description: "Fast-paced color reaction game. Tap to match shifting color gates before the timer depletes.",
    difficulty: "Easy",
    avgTime: "2-4 mins"
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Games', icon: Gamepad2 },
  { id: 'arcade', label: 'Retro & Arcade', icon: Zap },
  { id: 'puzzle', label: 'Brain & Strategy', icon: Brain },
  { id: 'casual', label: 'Casual & Reflex', icon: Sparkles },
  { id: 'words', label: 'Words & Typing', icon: Keyboard },
];

const FAQS = [
  {
    q: "What are the best free online games to play when bored?",
    a: "When you are bored and looking for instant fun without a lengthy setup, our top picks are: Flappy Bird Tap (high adrenaline reflex challenge), Neon Snake (timeless retro classic), Bubble Pop Mania (relaxing visual puzzle), and Chess AI Master (strategic deep dive). All can be started with a single click and have zero load time."
  },
  {
    q: "Can I play these browser games on school Chromebooks or office PCs?",
    a: "Yes! All games on Medhastone are lightweight, client-side HTML5 web applications delivered over clean, secure HTTPS. They do not require executable installer files (.exe / .apk), admin permissions, or external plugins, making them fully compatible with school Chromebooks, enterprise laptops, and low-spec computers."
  },
  {
    q: "Are these online games genuinely free without hidden downloads or in-app purchases?",
    a: "Yes, 100% free. Every single game is complete and unlocked. You will never encounter paywalls, energy limiters, or paid coins. Everything runs locally in your web browser hardware canvas."
  },
  {
    q: "Do I need to sign up or create an account to play?",
    a: "No registration, password, or email is required. You can jump directly in as a guest. Your game scores, personal high records, and settings are saved automatically in your browser's local cache."
  },
  {
    q: "How can I improve my typing speed with the Typing Speed Test game?",
    a: "Our Typing Speed Test evaluates both Words Per Minute (WPM) and accuracy in real-time. To improve your score: focus on maintaining 95%+ accuracy before trying to type faster, keep your fingers positioned on the home row keys (ASDF - JKL;), and practice 2 to 3 rounds daily to build muscle memory."
  },
  {
    q: "What is the secret strategy to win at Minesweeper Classic?",
    a: "The most important technique is identifying the 1-2-1 and 1-2-2-1 corner logic rules. If you see a '1' touching an edge where only one unopened square exists, that square is guaranteed to be a mine. Right-click (or long-tap on mobile) to flag it, and use logical deduction rather than random guessing."
  },
  {
    q: "Do these browser games support touchscreens on iPhone and Android?",
    a: "Yes. Every game is built with mobile-first responsive touch gestures, virtual on-screen controls, and fluid scaling so you can play smoothly in Safari, Chrome, Samsung Internet, and Firefox on iOS and Android smartphones and tablets."
  }
];

const STRATEGY_GUIDES = [
  {
    title: "Chess AI: Winning Opening Strategies for Beginners",
    game: "Chess AI Master",
    tips: [
      "Control the central 4 squares (d4, d5, e4, e5) with pawns and minor pieces in the first 5 moves.",
      "Develop your knights before bishops to prepare flexible defensive and offensive outposts.",
      "Castle your king early (usually Kingside O-O) to tuck your king safely behind pawns and activate your rook."
    ]
  },
  {
    title: "Minesweeper Classic: Mastering the 1-2-1 Number Pattern",
    game: "Minesweeper Classic",
    tips: [
      "When a '1-2-1' appears along a flat unopened wall, the mines are always hidden under the two '1's, while the space under the '2' is completely safe.",
      "Always clear the corners first once safe numbers are revealed to open large clusters of empty squares.",
      "Never guess on 50/50 splits until you have exhausted all other numbered deductions across the entire board."
    ]
  },
  {
    title: "Neon Snake Retro: Outer Wall Coiling & Space Management",
    game: "Neon Snake Retro",
    tips: [
      "Avoid cutting straight through the center of the grid once your snake exceeds 20 segments in length.",
      "Adopt an S-shaped serpentine pattern along the perimeter to maintain maximum maneuverable open area.",
      "Never trap your head between your tail and the wall; always leave an escape corridor at least two blocks wide."
    ]
  },
  {
    title: "Sudoku Master: Elimination & Naked Singles Technique",
    game: "Sudoku Master",
    tips: [
      "Scan each 3x3 block against row and column intersections to spot cells that only have one possible candidate digit (Naked Single).",
      "Look for rows or columns that already contain 6 or 7 digits; these are the easiest spots to finish quickly.",
      "Use pencil marks or mental notes for 2-candidate pairs to immediately eliminate possibilities elsewhere in the block."
    ]
  }
];

interface Props {
  onPlayGame: (path: string, title: string) => void;
}

export default function GamesHubScreen({ onPlayGame }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic SEO meta tags, title & JSON-LD schema injection
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Play Free Online Browser Games (No Download) – Instant Web Games | Medhastone";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content', 
        'Play 17+ free online browser games with no download, no signup, and instant loading. Enjoy classic retro arcade games, chess against AI, neon snake, minesweeper, sudoku, and casual mini-games on PC, Chromebook, and mobile.'
      );
    }

    // JSON-LD Schema: CollectionPage + FAQPage
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'play-games-schema';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://zentova.in/play-games#webpage",
          "url": "https://zentova.in/play-games",
          "name": "Play Free Online Browser Games - Medhastone Games Hub",
          "description": "Play 17+ free online browser games with no download or signup. Includes Chess AI, Neon Snake, Sudoku, Minesweeper, and Retro Arcade classics.",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://zentova.in/#website",
            "url": "https://zentova.in/",
            "name": "Medhastone"
          },
          "hasPart": GAMES.map((g, idx) => ({
            "@type": "VideoGame",
            "position": idx + 1,
            "name": g.title,
            "description": g.description,
            "genre": g.categoryName,
            "playMode": "SinglePlayer",
            "applicationCategory": "Game",
            "operatingSystem": "Any web browser",
            "url": `https://zentova.in/play-games#${g.id}`
          }))
        },
        {
          "@type": "FAQPage",
          "@id": "https://zentova.in/play-games#faq",
          "mainEntity": FAQS.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        }
      ]
    });
    document.head.appendChild(schemaScript);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
      const existing = document.getElementById('play-games-schema');
      if (existing) existing.remove();
    };
  }, []);

  const filtered = useMemo(() => {
    return GAMES.filter(g => {
      const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase()) ||
                            g.description.toLowerCase().includes(search.toLowerCase()) ||
                            g.categoryName.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || g.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="absolute inset-0 bg-[#0a0a0f] text-white flex flex-col z-50 overflow-y-auto">
      
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { 
              playButton(); 
              window.history.pushState(null, '', '/'); 
              window.dispatchEvent(new PopStateEvent('popstate')); 
            }}
            className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all text-sm font-medium border border-white/5"
            aria-label="Back to Homepage"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-sm shadow-lg shadow-blue-500/20">
              M
            </div>
            <span className="font-bold text-base tracking-wider text-white">MEDHASTONE <span className="text-blue-400 text-xs font-normal">GAMES</span></span>
          </div>
        </div>

        {/* Quick Nav Anchors */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-white/60">
          <a href="#games-catalog" className="hover:text-white transition-colors">Games Catalog</a>
          <a href="#boredom-busters" className="hover:text-white transition-colors">Boredom Busters</a>
          <a href="#strategy-tips" className="hover:text-white transition-colors">Strategy Guides</a>
          <a href="#platform-guide" className="hover:text-white transition-colors">Chromebook &amp; PC</a>
          <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          17 Free Instant Games
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* SEO Hero Header */}
        <section className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} /> Instant Play • Zero Downloads • 100% Free
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4">
            Play Free Online Browser Games <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              No Download &amp; No Signup
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            Jump into 17+ high-performance HTML5 browser games. Enjoy retro arcade classics, chess against AI, minesweeper, sudoku brain puzzles, speed typing tests, and casual mini-games instantly on PC, Chromebook, and mobile without download or registration.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mt-6 text-center">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="font-bold text-lg text-white">100% Free</div>
              <div className="text-[11px] text-white/50">No In-App Purchases</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="font-bold text-lg text-white">0 MB</div>
              <div className="text-[11px] text-white/50">No App Downloads</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="font-bold text-lg text-white">No Signup</div>
              <div className="text-[11px] text-white/50">Instant Guest Play</div>
            </div>
          </div>
        </section>

        {/* Search & Category Filter Bar */}
        <div id="games-catalog" className="mb-8 space-y-4 pt-4">
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search free games (e.g., Chess, Snake, Sudoku, Arcade, Typing)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/[0.05] hover:bg-white/[0.07] focus:bg-white/[0.08] border border-white/10 focus:border-blue-500/50 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playButton();
                    setSelectedCategory(cat.id);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105' 
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Games Grid Section */}
        <section aria-label="Games Catalog" className="mb-16">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Gamepad2 className="text-blue-400" size={20} />
              <span>Available Instant Games</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/60 ml-2">
                {filtered.length}
              </span>
            </h2>
            <span className="text-xs text-white/40">Click any card to play instantly</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <p className="text-white/60 mb-2">No games found matching "{search}".</p>
              <button 
                onClick={() => { setSearch(''); setSelectedCategory('all'); }}
                className="text-sm font-bold text-blue-400 hover:underline"
              >
                View all games
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(game => (
                <article 
                  key={game.id} 
                  id={game.id}
                  className="group relative flex flex-col bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-blue-500/30 rounded-2xl p-4 transition-all duration-200 cursor-pointer overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
                  onClick={() => { 
                    playButton(); 
                    window.history.pushState(null, '', `/play-games/${game.id}`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                >
                  {/* Visual Header / Thumbnail */}
                  <div className={`aspect-[16/10] rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-5xl shadow-inner mb-3.5 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                    <div className="absolute inset-0 bg-black/15 mix-blend-overlay"></div>
                    <span className="drop-shadow-md select-none">{game.icon}</span>
                    
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-bold text-white/90 uppercase tracking-wider border border-white/10">
                      {game.tag}
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-bold text-white/80 border border-white/10">
                      <Flame size={12} className="text-amber-400" />
                      <span>{game.plays} plays</span>
                    </div>

                    <div className="absolute inset-0 bg-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <div className="w-12 h-12 rounded-full bg-white text-blue-950 flex items-center justify-center font-bold shadow-xl shadow-black/40 scale-90 group-hover:scale-100 transition-transform">
                        <Play size={20} className="ml-1 fill-blue-950" />
                      </div>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                          {game.categoryName}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          No Download
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors mb-1.5">
                        {game.title}
                      </h3>
                      <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-3">
                        {game.description}
                      </p>

                      <div className="flex items-center gap-2 mb-3 text-[11px] text-white/40">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {game.avgTime}
                        </span>
                        <span>•</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px]">
                          {game.difficulty}
                        </span>
                      </div>
                    </div>

                    <button 
                      className="w-full mt-auto py-2 rounded-xl bg-white/5 group-hover:bg-blue-600 text-white/80 group-hover:text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 border border-white/5 group-hover:border-blue-500"
                    >
                      <Play size={14} className="fill-current" />
                      <span>Play Instantly</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Section: Games to Play When Bored (Targeting High-Volume Queries) */}
        <section id="boredom-busters" className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <Flame size={14} /> Boredom Busters Guide
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Best Free Online Games to Play When Bored
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Stuck waiting, taking a study break, or feeling bored during downtime? Here is our curated guide of the best quick web games based on how much time you have and your current mood:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">⚡</span>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">2-Minute Break</span>
                </div>
                <h3 className="font-bold text-white text-base mb-1">Quick Reflex Thrills</h3>
                <p className="text-xs text-white/60 leading-relaxed mb-3">
                  Fast, intense games that start in 1 second. Test your reflexes without long tutorials.
                </p>
                <ul className="text-xs text-blue-400 space-y-1 font-medium mb-4">
                  <li>• Flappy Bird Tap</li>
                  <li>• Arrow Scape Dodge</li>
                  <li>• Block Stack Tower</li>
                </ul>
              </div>
              <button 
                onClick={() => { 
                  playButton();
                  window.history.pushState(null, '', '/play-games/flappy-bird');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="text-xs font-bold text-white bg-white/10 hover:bg-blue-600 py-1.5 px-3 rounded-lg transition-colors text-center"
              >
                Play Flappy Bird
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">🧠</span>
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">5-Minute Reset</span>
                </div>
                <h3 className="font-bold text-white text-base mb-1">Brain &amp; Focus Puzzles</h3>
                <p className="text-xs text-white/60 leading-relaxed mb-3">
                  Stimulate your mind and clear mental fatigue with relaxing logic challenges.
                </p>
                <ul className="text-xs text-blue-400 space-y-1 font-medium mb-4">
                  <li>• Sudoku Master</li>
                  <li>• Minesweeper Classic</li>
                  <li>• Memory Match Cards</li>
                </ul>
              </div>
              <button 
                onClick={() => { 
                  playButton();
                  window.history.pushState(null, '', '/play-games/minesweeper');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="text-xs font-bold text-white bg-white/10 hover:bg-blue-600 py-1.5 px-3 rounded-lg transition-colors text-center"
              >
                Play Minesweeper
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">🕹️</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Nostalgic Fun</span>
                </div>
                <h3 className="font-bold text-white text-base mb-1">Retro Arcade Classics</h3>
                <p className="text-xs text-white/60 leading-relaxed mb-3">
                  Rediscover the timeless 1980s and 1990s retro games that defined video game history.
                </p>
                <ul className="text-xs text-blue-400 space-y-1 font-medium mb-4">
                  <li>• Neon Snake Retro</li>
                  <li>• Pong Classic 1972</li>
                  <li>• Space Shooter Galaxy</li>
                </ul>
              </div>
              <button 
                onClick={() => { 
                  playButton();
                  window.history.pushState(null, '', '/play-games/neon-snake');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="text-xs font-bold text-white bg-white/10 hover:bg-blue-600 py-1.5 px-3 rounded-lg transition-colors text-center"
              >
                Play Neon Snake
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">🏆</span>
                  <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Skill Booster</span>
                </div>
                <h3 className="font-bold text-white text-base mb-1">Typing &amp; Strategy</h3>
                <p className="text-xs text-white/60 leading-relaxed mb-3">
                  Level up your typing Words Per Minute (WPM) or test tactics against a master chess engine.
                </p>
                <ul className="text-xs text-blue-400 space-y-1 font-medium mb-4">
                  <li>• Typing Speed Test</li>
                  <li>• Chess AI Master</li>
                  <li>• Wordverse Vocabulary</li>
                </ul>
              </div>
              <button 
                onClick={() => { 
                  playButton();
                  window.history.pushState(null, '', '/play-games/chess-ai');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="text-xs font-bold text-white bg-white/10 hover:bg-blue-600 py-1.5 px-3 rounded-lg transition-colors text-center"
              >
                Play Chess AI
              </button>
            </div>
          </div>
        </section>

        {/* Section: Pro Strategy Guides (Targeting "How-To" Search Queries) */}
        <section id="strategy-tips" className="mb-16">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <BookOpen size={14} /> Pro Gamer Strategy Guides
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Tips &amp; Strategies to Win at Classic Web Games
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Want to set new personal bests and beat computer AI opponents? Master these time-tested tactical rules:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STRATEGY_GUIDES.map((guide, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Target size={18} className="text-blue-400 shrink-0" />
                    <span>{guide.title}</span>
                  </h3>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider shrink-0 bg-white/5 px-2 py-0.5 rounded">
                    {guide.game}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {guide.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Chromebook & Low-End PC Optimization Guide (Targeting Unblocked/School Queries) */}
        <section id="platform-guide" className="mb-16 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <Laptop size={14} /> Hardware &amp; Chromebook Compatibility
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Unblocked Browser Games for Chromebook, PC &amp; Mobile
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Why do Medhastone browser games run so smoothly on low-powered school Chromebooks, workplace laptops, and older phones?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-white/70 mb-8">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <Cpu size={16} className="text-blue-400" />
                <span>Ultra-Low RAM Footprint</span>
              </div>
              <p className="leading-relaxed text-white/60">
                While modern desktop titles consume 8GB to 16GB of RAM, our pure HTML5 Canvas games use less than 35MB of memory, ensuring zero browser freezing or tab crashes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Zero Admin Rights Needed</span>
              </div>
              <p className="leading-relaxed text-white/60">
                No .exe or .msi file downloads required. Since everything executes in standard web sandbox environments, you can play on school or managed enterprise devices without restricted permission warnings.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <Zap size={16} className="text-amber-400" />
                <span>No Flash Player Required</span>
              </div>
              <p className="leading-relaxed text-white/60">
                All vintage titles have been modernized with native JavaScript, CSS3 animations, and WebGL rendering—replacing obsolete Adobe Flash with safe, future-proof web technology.
              </p>
            </div>
          </div>

          {/* Browser Games vs App Downloads Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-white/5 text-white/80 font-bold border-b border-white/10">
                  <th className="p-3.5">Feature</th>
                  <th className="p-3.5 text-blue-400">Medhastone Instant Web Games</th>
                  <th className="p-3.5 text-white/50">App Store / Play Store Downloads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3.5 font-semibold text-white">Storage Space Required</td>
                  <td className="p-3.5 text-emerald-400 font-bold">0 MB (Zero disk space)</td>
                  <td className="p-3.5">500 MB – 2 GB per game</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Installation Time</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Instant (&lt; 1 second)</td>
                  <td className="p-3.5">3 – 10 minutes downloading</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Device Permissions</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Zero (No camera/contacts/location)</td>
                  <td className="p-3.5">Often requests invasive permissions</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Cross-Device Play</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Any browser (Windows, Mac, ChromeOS, iOS, Android)</td>
                  <td className="p-3.5">Restricted to specific OS</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Account Creation</td>
                  <td className="p-3.5 text-emerald-400 font-bold">None (Play as guest immediately)</td>
                  <td className="p-3.5">Mandatory email / social sign-in</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep-Dive Categories Section for Long-Tail SEO */}
        <section className="mb-16 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-2xl font-bold text-white mb-1">
              Explore Popular Free Browser Game Genres
            </h2>
            <p className="text-sm text-white/60">
              Discover your next favorite game across our diverse HTML5 game categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-white/70">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Brain className="text-blue-400" size={18} />
                <h3>Brain Puzzles &amp; Strategy Games</h3>
              </div>
              <p className="text-xs leading-relaxed text-white/60">
                Exercise your memory, logic, and cognitive skills with <strong>Chess AI Master</strong>, <strong>Sudoku Master</strong>, <strong>Minesweeper Classic</strong>, and <strong>Math Genius</strong>. Ideal for players looking to sharpen their focus during short mental breaks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Zap className="text-purple-400" size={18} />
                <h3>Retro Arcade &amp; Classic Video Games</h3>
              </div>
              <p className="text-xs leading-relaxed text-white/60">
                Relive the golden era of arcade gaming with <strong>Neon Snake</strong>, <strong>Pong Classic 1972</strong>, <strong>Space Shooter Galaxy</strong>, and <strong>Flappy Bird Tap</strong>. Experience classic gameplay with contemporary 60 FPS graphics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Sparkles className="text-amber-400" size={18} />
                <h3>Casual Reflex &amp; Timing Mini-Games</h3>
              </div>
              <p className="text-xs leading-relaxed text-white/60">
                Simple mechanics, addictive gameplay, and instant fun. Enjoy <strong>Bubble Pop Mania</strong>, <strong>Block Stack Tower</strong>, <strong>Color Dash Match</strong>, and <strong>Arrow Scape</strong> anytime without tutorials or complicated setup.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Keyboard className="text-emerald-400" size={18} />
                <h3>Typing Tests &amp; Vocabulary Word Puzzles</h3>
              </div>
              <p className="text-xs leading-relaxed text-white/60">
                Test your keyboard speed with our real-time <strong>Typing Speed Test</strong> (WPM &amp; accuracy score) or challenge your vocabulary with <strong>Wordverse</strong> anagram puzzles.
              </p>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions (FAQ) Section */}
        <section id="faqs" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/60 uppercase tracking-widest mb-3">
              <HelpCircle size={14} /> Questions &amp; Answers
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => {
                      playButton();
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white/90 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 p-1 rounded-lg bg-white/5 text-white/60">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/40 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white/70">Medhastone</span>
            <span>•</span>
            <span>Instant HTML5 Web Games (No Download)</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/lexibrain/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="mailto:medhastone@gmail.com" className="hover:text-white transition-colors">Contact Support</a>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Medhastone. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
