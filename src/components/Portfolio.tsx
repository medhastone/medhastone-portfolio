import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
};

export default function Portfolio() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative py-xl px-gutter max-w-container-max mx-auto w-full z-10" 
      id="portfolio"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] z-[-1] pointer-events-none"></div>
      
      <motion.div variants={itemVariants} className="flex items-end justify-between mb-xl">
        <div>
          <h2 className="text-headline-lg text-on-surface mb-xs tracking-wide">Featured Deployments</h2>
          <p className="text-label-mono text-on-surface-variant uppercase tracking-widest opacity-70">Architecture // Engineering // UX</p>
        </div>
        <div className="hidden md:flex gap-xs">
          <span className="w-2 h-2 rounded-full bg-primary/20"></span>
          <span className="w-2 h-2 rounded-full bg-primary/50"></span>
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]"></span>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] md:auto-rows-[380px] gap-md">
        
        {/* ParkDock */}
        <motion.div variants={itemVariants} className="md:col-span-8 relative rounded-2xl overflow-hidden group glass-card hover:border-primary/50 hover:shadow-[0_0_40px_rgba(129,140,248,0.3)] transition-all duration-300">
          <a href="#parkdock" className="absolute inset-0 z-30" aria-label="View ParkDock details"></a>
          <div className="absolute inset-0 bg-gradient-to-tr from-surface-container/80 to-background"></div>
          <div className="relative h-full flex flex-col justify-end p-lg z-10">
            <div className="flex justify-between items-start mb-auto mt-sm">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10 group-hover:scale-105 transition-transform duration-500 bg-surface-container">
                <img src="/parkdock.jpg" alt="ParkDock" className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-sm">
                <span className="px-sm py-xs rounded bg-surface-container-high/50 text-secondary text-label-mono text-[11px] border border-secondary/30 backdrop-blur-md">OFFLINE-FIRST</span>
                <span className="px-sm py-xs rounded bg-surface-container-high/50 text-primary text-label-mono text-[11px] border border-primary/30 backdrop-blur-md">UTILITY</span>
              </div>
            </div>
            <h3 className="text-display-lg-mobile text-on-surface mb-sm tracking-wide">ParkDock</h3>
            <p className="text-body-md text-on-surface-variant max-w-[400px]">Your everyday driver companion - Smart vehicle management, parking tools, calculators, and a driving dashboard.</p>
          </div>
        </motion.div>

        {/* Brain Maze Master */}
        <motion.div variants={itemVariants} className="md:col-span-4 relative rounded-2xl overflow-hidden group glass-card hover:border-primary/50 hover:shadow-[0_0_40px_rgba(129,140,248,0.3)] transition-all duration-300">
          <a href="#brainmaze" className="absolute inset-0 z-30" aria-label="View Brain Maze Master details"></a>
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container/50 to-background"></div>
          <div className="relative h-full flex flex-col justify-end p-md z-10">
            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10 group-hover:scale-110 transition-transform duration-500 mb-auto bg-surface-container">
              <img src="/brainmaze.jpg" alt="Brain Maze Master" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-headline-md text-on-surface mb-xs mt-lg tracking-wide">Brain Maze Master</h3>
            <p className="text-body-md text-on-surface-variant text-sm">Puzzle game - Gamified cognitive puzzle experience featuring custom 2D geometric silhouettes and fluid kinetic animations.</p>
          </div>
        </motion.div>

        {/* Medi Journey */}
        <motion.div variants={itemVariants} className="md:col-span-4 relative rounded-2xl overflow-hidden group glass-card hover:border-primary/50 hover:shadow-[0_0_40px_rgba(129,140,248,0.3)] transition-all duration-300">
          <a href="#medijourney" className="absolute inset-0 z-30" aria-label="View Medi Journey details"></a>
          <div className="absolute top-0 right-0 p-md opacity-70 group-hover:opacity-100 transition-opacity z-20">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-white/10 group-hover:-translate-y-1 transition-transform duration-500 bg-surface-container">
              <img src="/medi.jpg" alt="Medi Journey" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="relative h-full flex flex-col justify-between p-md z-10">
            <div className="flex flex-wrap gap-xs">
              <span className="px-sm py-xs rounded bg-surface-container/50 border border-outline-variant text-on-surface text-label-mono text-[11px]">HEALTH</span>
              <span className="px-sm py-xs rounded bg-surface-container/50 border border-outline-variant text-on-surface text-label-mono text-[11px]">ANALYTICS</span>
            </div>
            <div>
              <h3 className="text-headline-md text-on-surface mb-xs mt-xl tracking-wide relative z-10">Medi Journey</h3>
              <p className="text-body-md text-on-surface-variant text-sm relative z-10">Medication and vitals tracker app - Personalized medical tracking assistant with secure local data storage and visual timeline reporting.</p>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 w-full h-32 text-secondary/10" preserveAspectRatio="none" viewBox="0 0 100 30">
            <path d="M0 30 L0 15 Q10 10 20 20 T40 15 T60 25 T80 10 T100 18 L100 30 Z" fill="currentColor"></path>
          </svg>
        </motion.div>

        {/* RojgarBahi */}
        <motion.div variants={itemVariants} className="md:col-span-4 relative rounded-2xl overflow-hidden group glass-card hover:border-primary/50 hover:shadow-[0_0_40px_rgba(129,140,248,0.3)] transition-all duration-300">
          <a href="#rojgarbahi" className="absolute inset-0 z-30" aria-label="View RojgarBahi details"></a>
          <div className="absolute top-0 right-0 p-md opacity-70 group-hover:opacity-100 transition-opacity z-20">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-white/10 group-hover:-translate-y-1 transition-transform duration-500 bg-surface-container">
              <img src="/rojgar%20logo.jpg" alt="RojgarBahi" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="relative h-full flex flex-col justify-between p-md z-10">
            <div className="flex flex-wrap gap-xs">
              <span className="px-sm py-xs rounded bg-primary/10 border border-primary/20 text-primary text-label-mono text-[11px]">UTILITY</span>
              <span className="px-sm py-xs rounded bg-surface-container/50 border border-outline-variant text-on-surface text-label-mono text-[11px]">FINANCE</span>
            </div>
            <div>
              <h3 className="text-headline-md text-on-surface mb-xs mt-xl tracking-wide relative z-10">RojgarBahi</h3>
              <p className="text-body-md text-on-surface-variant text-sm relative z-10">Workers financial manager app - Robust business utility for workforce management and high-frequency daily ledger tracking.</p>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 w-full h-32 text-primary/10" preserveAspectRatio="none" viewBox="0 0 100 30">
            <path d="M0 30 L0 15 Q10 10 20 20 T40 15 T60 25 T80 10 T100 18 L100 30 Z" fill="currentColor"></path>
          </svg>
        </motion.div>

        {/* PDFZero */}
        <motion.div variants={itemVariants} className="md:col-span-4 relative rounded-2xl overflow-hidden group glass-card hover:border-error/50 hover:shadow-[0_0_40px_rgba(248,113,113,0.3)] transition-all duration-300">
          <a href="#pdfzero" className="absolute inset-0 z-30" aria-label="View PDFZero details"></a>
          <div className="absolute top-0 right-0 p-md opacity-70 group-hover:opacity-100 transition-opacity z-20">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-white/10 group-hover:-translate-y-1 transition-transform duration-500 bg-surface-container">
              <img src="/pdfzero.jpg" alt="PDFZero" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="relative h-full flex flex-col justify-between p-md z-10">
            <div className="flex flex-wrap gap-xs">
              <span className="px-sm py-xs rounded bg-surface-container/50 border border-outline-variant text-on-surface text-label-mono text-[11px]">UTILITY</span>
              <span className="px-sm py-xs rounded bg-surface-container/50 border border-outline-variant text-on-surface text-label-mono text-[11px]">OFFLINE</span>
            </div>
            <div>
              <h3 className="text-headline-md text-on-surface mb-xs mt-xl tracking-wide relative z-10">PDFZero</h3>
              <p className="text-body-md text-on-surface-variant text-sm relative z-10">PDF related solution app - Zero-knowledge, privacy-focused PDF utility. All processing executes locally on device.</p>
            </div>
          </div>
          <svg className="absolute bottom-0 left-0 w-full h-32 text-error/10" preserveAspectRatio="none" viewBox="0 0 100 30">
            <path d="M0 30 L0 15 Q10 10 20 20 T40 15 T60 25 T80 10 T100 18 L100 30 Z" fill="currentColor"></path>
          </svg>
        </motion.div>

      </motion.div>
    </motion.section>
  );
}
