import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScrollToTopFAB() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-surface/50 border border-outline-variant text-primary shadow-[0_0_20px_rgba(129,140,248,0.2)] hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_30px_rgba(129,140,248,0.4)] backdrop-blur-md transition-all cursor-pointer flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
