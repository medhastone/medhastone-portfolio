import { Search, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { playButton } from '../game/audio';

const GAMES = [
  { id: "bubble-mania", title: "Bubble Pop Mania", plays: "520k", path: "#bubble-mania", color: "from-indigo-500 to-purple-800", icon: "🫧", isNative: true },
  { id: "arrow-scape", title: "Arrow Scape", plays: "120k", path: "/games/arrow-scape/index.html", color: "from-blue-500 to-indigo-600", icon: "🏹" },
  { id: "block-stack", title: "Block Stack", plays: "89k", path: "/games/block-stack/index.html", color: "from-orange-500 to-red-500", icon: "🧱" },
  { id: "chess-ai", title: "Chess AI", plays: "210k", path: "/games/chess-ai/index.html", color: "from-slate-600 to-slate-800", icon: "♟️" },
  { id: "color-dash", title: "Color Dash", plays: "12k", path: "/games/color-dash/index.html", color: "from-green-400 to-emerald-600", icon: "🎨" },
  { id: "flappy-bird", title: "Flappy Bird", plays: "340k", path: "/games/flappy-bird/index.html", color: "from-yellow-400 to-orange-500", icon: "🐦" },
  { id: "mathgenius", title: "Math Genius", plays: "22k", path: "/games/mathgenius/index.html", color: "from-indigo-500 to-blue-600", icon: "🔢" },
  { id: "memory-match", title: "Memory Match", plays: "56k", path: "/games/memory-match/index.html", color: "from-pink-400 to-rose-500", icon: "🧠" },
  { id: "minesweeper", title: "Minesweeper", plays: "78k", path: "/games/minesweeper/index.html", color: "from-gray-500 to-gray-700", icon: "💣" },
  { id: "neon-snake", title: "Neon Snake", plays: "112k", path: "/games/neon-snake/index.html", color: "from-lime-400 to-green-500", icon: "🐍" },
  { id: "pong-classic", title: "Pong Classic", plays: "67k", path: "/games/pong-classic/index.html", color: "from-zinc-700 to-black", icon: "🏓" },
  { id: "racing-2d", title: "Racing 2D", plays: "150k", path: "/games/racing-2d/index.html", color: "from-red-500 to-rose-700", icon: "🏎️" },
  { id: "space-shooter", title: "Space Shooter", plays: "200k", path: "/games/space-shooter/index.html", color: "from-violet-600 to-purple-900", icon: "🚀" },
  { id: "sudoku-master", title: "Sudoku Master", plays: "40k", path: "/games/sudoku-master/index.html", color: "from-sky-400 to-blue-600", icon: "📝" },
  { id: "tic-tac-toe", title: "Tic Tac Toe", plays: "34k", path: "/games/tic-tac-toe/index.html", color: "from-teal-400 to-emerald-500", icon: "❌" },
  { id: "typing-speed", title: "Typing Speed", plays: "15k", path: "/games/typing-speed/index.html", color: "from-fuchsia-500 to-pink-600", icon: "⌨️" },
  { id: "wordverse", title: "Wordverse", plays: "90k", path: "/games/wordverse/index.html", color: "from-amber-400 to-orange-500", icon: "📚" }
];

interface Props {
  onPlayGame: (path: string, title: string) => void;
}

export default function GamesHubScreen({ onPlayGame }: Props) {
  const [search, setSearch] = useState('');

  const filtered = GAMES.filter(g => g.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="absolute inset-0 bg-[#0f0f0f] text-white flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 p-4 border-b border-white/10 bg-[#0f0f0f] shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { playButton(); window.location.hash = ''; }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors shrink-0"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-sm shadow-lg">
              M
            </div>
            <span className="font-bold text-lg tracking-wide text-white">MEDHASTONE</span>
          </div>
        </div>
        <div className="flex-1 w-full bg-white/10 rounded-full flex items-center px-4 py-2 border border-white/10">
          <Search size={20} className="text-white/50 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search games portfolio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/50 text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pb-20 max-w-[1600px] mx-auto">
          {filtered.map(game => (
            <div 
              key={game.id} 
              className="flex flex-col group cursor-pointer"
              onClick={() => { 
                playButton(); 
                if (game.isNative) {
                  window.location.hash = game.path;
                } else {
                  onPlayGame(game.path, game.title); 
                }
              }}
            >
              <div className={`aspect-video rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-4xl shadow-lg mb-2 group-hover:scale-105 transition-transform duration-200 border border-white/10 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                {game.icon}
              </div>
              <div className="flex justify-between items-start px-1">
                <div>
                  <h3 className="font-bold text-sm md:text-base leading-tight text-white/90 group-hover:text-white line-clamp-2 mb-1">{game.title}</h3>
                  <p className="text-xs text-white/50">{game.plays} plays</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
