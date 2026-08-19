import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <div className="h-20 max-w-container-max mx-auto px-gutter flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <img 
            alt="Medhastone Brand Logo" 
            className="h-10 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLs8Pbam4ew8t9A1ruwh3ef0gCx8FIRLXHnqtH2XqJIf1Ax7s0cuTjWrqcPh52M-avpQv0lVfHXOm_c-wxlhvUW-T8Knz__gOcCY1K92g9xqWj0Mb73gc7-2usHDQxoL5jtvs9-k-hHnnlywr9BDnsh7OREgBAmBqEitEZcVUmpJ8P8gpoPdWPnm7m0hgAwmimNlHxneTls9tTjJweoi_4pfXwdQ5pU8O-YArZ5sGZuHLXFJ44wVIHM96g"
          />
          <span className="text-headline-md text-on-surface tracking-wide">Medhastone</span>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-lg">
          <a aria-current="page" className="transition-all text-primary font-bold tracking-widest text-label-caps" href="#home">HOME</a>
          <a className="text-label-caps text-on-surface-variant hover:text-primary transition-all tracking-widest" href="#play-games">PLAY GAMES</a>
          <a className="text-label-caps text-on-surface-variant hover:text-primary transition-all tracking-widest" href="#portfolio">PORTFOLIO</a>
          <a className="text-label-caps text-on-surface-variant hover:text-primary transition-all tracking-widest" href="#services">SERVICES</a>
          <a className="text-label-caps text-on-surface-variant hover:text-primary transition-all tracking-widest" href="#contact">CONTACT</a>
        </nav>

        <div className="flex items-center gap-base">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex items-center justify-center p-2 text-on-surface"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-container/95 backdrop-blur-xl border-b border-outline-variant overflow-hidden"
          >
            <nav className="flex flex-col p-gutter py-md gap-md">
              <a onClick={() => setIsMenuOpen(false)} aria-current="page" className="transition-all text-primary font-bold tracking-widest text-label-caps" href="#home">HOME</a>
              <a onClick={() => setIsMenuOpen(false)} className="text-label-caps text-on-surface hover:text-primary transition-all tracking-widest" href="#play-games">PLAY GAMES</a>
              <a onClick={() => setIsMenuOpen(false)} className="text-label-caps text-on-surface hover:text-primary transition-all tracking-widest" href="#portfolio">PORTFOLIO</a>
              <a onClick={() => setIsMenuOpen(false)} className="text-label-caps text-on-surface hover:text-primary transition-all tracking-widest" href="#services">SERVICES</a>
              <a onClick={() => setIsMenuOpen(false)} className="text-label-caps text-on-surface hover:text-primary transition-all tracking-widest" href="#contact">CONTACT</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
