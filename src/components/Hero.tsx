import { motion } from 'motion/react';
import ThreeJSBackground from './ThreeJSBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

export default function Hero() {
  return (
    <section id="home" className="relative flex flex-col justify-center min-h-[90vh] px-gutter max-w-container-max mx-auto w-full pt-20">
      <div className="absolute inset-0 z-[-1] overflow-hidden rounded-b-[2rem] mask-gradient-bottom">
        <ThreeJSBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-lg items-end justify-between w-full mt-xl">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col max-w-[800px] z-10">
          <motion.div variants={itemVariants} className="flex items-center gap-sm mb-md opacity-90">
            <span className="w-10 h-[2px] bg-primary shadow-[0_0_8px_var(--color-primary)]"></span>
            <span className="text-label-mono text-primary uppercase tracking-widest">MedhaStone App Studio</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-display-lg-mobile md:text-display-lg text-on-surface tracking-tighter mb-md leading-[1.1] md:leading-[1.05] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Transforming Ideas into <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container drop-shadow-[0_0_10px_var(--color-primary)]">Powerful & Scalable</span><br className="hidden md:block"/>
            <span className="md:hidden"> </span>Software Solutions
          </motion.h1>
          <motion.p variants={itemVariants} className="text-body-md md:text-body-lg text-on-surface-variant max-w-[600px] mb-lg leading-relaxed shadow-sm">
            We specialize in crafting practical, offline-first mobile applications and resilient web platforms that solve real-world problems.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap items-center gap-md w-full sm:w-auto">
            <button 
              className="group relative w-full sm:w-auto px-lg py-sm bg-primary/20 text-primary border border-primary rounded-full text-label-caps overflow-hidden shadow-[0_0_20px_var(--color-primary)] hover:shadow-[0_0_30px_var(--color-primary)] hover:bg-primary hover:text-on-primary transition-all duration-300" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
            >
              <span className="relative z-10 flex justify-center items-center gap-sm tracking-wider">
                START A PROJECT
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
            <button 
              className="px-lg py-sm w-full sm:w-auto glass-card text-on-surface rounded-full text-label-caps hover:bg-surface-container-high/50 hover:text-primary transition-colors duration-300 flex justify-center items-center gap-sm tracking-wider" 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({behavior: 'smooth'})}
            >
              EXPLORE PORTFOLIO
            </button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="hidden md:flex flex-col items-end gap-sm z-10 pb-lg">
          <p className="text-label-mono text-on-surface-variant [writing-mode:vertical-rl] rotate-180 opacity-60 tracking-widest">DISCOVER OUR WORK</p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
        </motion.div>
      </div>
    </section>
  );
}
