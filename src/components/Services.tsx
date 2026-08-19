import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
};

export default function Services() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative py-xl px-gutter max-w-container-max mx-auto w-full z-10 mt-lg" 
      id="services"
    >
      <motion.div variants={itemVariants} className="text-center mb-xl">
        <h2 className="text-headline-lg text-on-surface mb-xs tracking-wide">Core Capabilities</h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-md shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
      </motion.div>
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        
        <motion.div variants={itemVariants} className="glass-card p-lg rounded-2xl hover:border-primary/50 hover:shadow-[0_10px_40px_-10px_rgba(129,140,248,0.3)] transition-all duration-300 group hover:-translate-y-2">
          <div className="relative w-16 h-16 mb-md flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-md group-hover:bg-primary/30 transition-colors"></div>
            <span className="material-symbols-outlined text-primary text-[32px] relative z-10 drop-shadow-[0_0_8px_var(--color-primary)]">devices</span>
          </div>
          <h4 className="text-headline-md text-on-surface mb-sm text-lg tracking-wide">Cross-Platform Apps</h4>
          <p className="text-body-md text-on-surface-variant text-sm">High-fidelity native experiences for Android and iOS engineered from a single performant Flutter codebase.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-lg rounded-2xl hover:border-secondary/50 hover:shadow-[0_10px_40px_-10px_rgba(52,211,153,0.3)] transition-all duration-300 group hover:-translate-y-2">
          <div className="relative w-16 h-16 mb-md flex items-center justify-center">
            <div className="absolute inset-0 bg-secondary/10 rounded-full blur-md group-hover:bg-secondary/30 transition-colors"></div>
            <span className="material-symbols-outlined text-secondary text-[32px] relative z-10 drop-shadow-[0_0_8px_var(--color-secondary)]">view_in_ar</span>
          </div>
          <h4 className="text-headline-md text-on-surface mb-sm text-lg tracking-wide">WebGL Web Apps</h4>
          <p className="text-body-md text-on-surface-variant text-sm">Immersive, hardware-accelerated web experiences utilizing Three.js and custom shader pipelines.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-lg rounded-2xl hover:border-tertiary/50 hover:shadow-[0_10px_40px_-10px_rgba(251,146,60,0.3)] transition-all duration-300 group hover:-translate-y-2">
          <div className="relative w-16 h-16 mb-md flex items-center justify-center">
            <div className="absolute inset-0 bg-tertiary/10 rounded-full blur-md group-hover:bg-tertiary/30 transition-colors"></div>
            <span className="material-symbols-outlined text-tertiary text-[32px] relative z-10 drop-shadow-[0_0_8px_var(--color-tertiary)]">sync_disabled</span>
          </div>
          <h4 className="text-headline-md text-on-surface mb-sm text-lg tracking-wide">Offline-First Design</h4>
          <p className="text-body-md text-on-surface-variant text-sm">Resilient system architectures leveraging SQLite and Room for uninterrupted operation in low-connectivity zones.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-lg rounded-2xl hover:border-primary-fixed/50 hover:shadow-[0_10px_40px_-10px_rgba(224,231,255,0.3)] transition-all duration-300 group hover:-translate-y-2">
          <div className="relative w-16 h-16 mb-md flex items-center justify-center">
            <div className="absolute inset-0 bg-primary-fixed/10 rounded-full blur-md group-hover:bg-primary-fixed/30 transition-colors"></div>
            <span className="material-symbols-outlined text-primary-fixed text-[32px] relative z-10 drop-shadow-[0_0_8px_var(--color-primary-fixed)]">design_services</span>
          </div>
          <h4 className="text-headline-md text-on-surface mb-sm text-lg tracking-wide">UX Prototyping</h4>
          <p className="text-body-md text-on-surface-variant text-sm">Meticulous interface design adhering to Material Design 3 and modern Human Interface Guidelines.</p>
        </motion.div>

      </motion.div>
    </motion.section>
  );
}
