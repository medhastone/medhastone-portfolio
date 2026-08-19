import { motion } from 'motion/react';

// Array of 16 placeholder games
const gamesList = [
  { id: 'wordverse', title: 'WordVerse', category: 'Brain', icon: 'sort_by_alpha', color: 'from-violet-500 to-fuchsia-700' },
  { id: 'neon-snake', title: 'Neon Snake', category: 'Arcade', icon: 'gesture', color: 'from-green-500 to-emerald-700' },
  { id: 'space-shooter', title: 'Space Shooter', category: 'Action', icon: 'rocket_launch', color: 'from-blue-500 to-indigo-700' },
  { id: 'tic-tac-toe', title: 'Tic Tac Toe Pro', category: 'Strategy', icon: 'grid_3x3', color: 'from-purple-500 to-fuchsia-700' },
  { id: 'word-puzzle', title: 'Word Puzzle', category: 'Brain', icon: 'sort_by_alpha', color: 'from-yellow-500 to-orange-700' },
  { id: 'math-genius', title: 'Math Genius', category: 'Educational', icon: 'calculate', color: 'from-cyan-500 to-blue-700' },
  { id: 'block-stack', title: 'Block Stack', category: 'Arcade', icon: 'layers', color: 'from-red-500 to-rose-700' },
  { id: 'memory-match', title: 'Memory Match', category: 'Brain', icon: 'psychology', color: 'from-pink-500 to-rose-700' },
  { id: 'color-dash', title: 'Color Dash', category: 'Action', icon: 'palette', color: 'from-indigo-500 to-purple-700' },
  { id: 'pong-classic', title: 'Pong Classic', category: 'Sports', icon: 'sports_tennis', color: 'from-slate-500 to-gray-700' },
  { id: 'typing-speed', title: 'Typing Speed', category: 'Educational', icon: 'keyboard', color: 'from-teal-500 to-emerald-700' },
  { id: 'mine-sweeper', title: 'Mine Sweeper', category: 'Strategy', icon: 'sports_esports', color: 'from-orange-500 to-red-700' },
  { id: 'flappy-bird', title: 'Flappy Clone', category: 'Arcade', icon: 'flight', color: 'from-sky-500 to-blue-700' },
  { id: 'sudoku-master', title: 'Sudoku Master', category: 'Brain', icon: 'apps', color: 'from-violet-500 to-purple-700' },
  { id: 'chess-ai', title: 'Chess vs AI', category: 'Strategy', icon: 'chess', color: 'from-stone-500 to-neutral-700' },
  { id: 'racing-2d', title: '2D Racing', category: 'Action', icon: 'sports_motorsports', color: 'from-red-600 to-orange-700' },
  { id: 'bubble-pop', title: 'Bubble Pop', category: 'Casual', icon: 'radio_button_unchecked', color: 'from-fuchsia-500 to-pink-700' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

export default function GamesHub() {
  return (
    <div className="pt-32 pb-xl px-gutter max-w-container-max mx-auto w-full relative z-10 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-xl"
      >
        <h1 className="text-display-md text-on-surface mb-sm tracking-tight">Play Games</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Enjoy our collection of high-performance HTML5 games. Play instantly in your browser—no downloads required.
        </p>
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-md shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg"
      >
        {gamesList.map((game) => (
          <motion.a
            href={`#game/${game.id}`}
            key={game.id}
            variants={itemVariants}
            className="glass-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 group block relative border-white/5 hover:border-primary/50 hover:shadow-[0_10px_40px_-10px_rgba(129,140,248,0.3)] cursor-pointer"
          >
            {/* Game Thumbnail / Gradient Placeholder */}
            <div className={`w-full h-40 bg-gradient-to-br ${game.color} relative overflow-hidden flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              <span className="material-symbols-outlined text-[64px] text-white/80 group-hover:scale-125 transition-transform duration-500 drop-shadow-lg z-10">
                {game.icon}
              </span>
            </div>
            
            <div className="p-md relative">
              <div className="absolute -top-4 right-4 bg-surface-container border border-white/10 text-xs px-2 py-1 rounded-full text-on-surface-variant uppercase tracking-wider backdrop-blur-md">
                {game.category}
              </div>
              <h3 className="text-title-lg font-bold text-on-surface group-hover:text-primary transition-colors">{game.title}</h3>
              <div className="mt-sm flex items-center gap-2 text-primary font-medium text-sm">
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                Play Now
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
