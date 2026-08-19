import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[800px] mx-auto px-gutter py-xl z-10 relative mb-xl"
    >
      <div className="glass-card p-lg md:p-xl rounded-3xl border-primary/20">
        <div className="flex items-center gap-sm mb-lg">
          <span className="material-symbols-outlined text-primary text-[32px]">gavel</span>
          <h1 className="text-display-lg-mobile md:text-headline-lg text-on-surface tracking-tight">Terms of Service</h1>
        </div>
        
        <div className="space-y-md text-body-md text-on-surface-variant leading-relaxed">
          <p className="text-label-mono text-primary/80 tracking-widest uppercase text-xs mb-lg">Last updated: August 2026</p>
          
          <h2 className="text-headline-md text-on-surface mt-lg mb-xs">1. Acceptance of Terms</h2>
          <p>
            By accessing or utilizing Medhastone's development services, software products, or consultation interfaces, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from utilizing our systems.
          </p>

          <h2 className="text-headline-md text-on-surface mt-lg mb-xs">2. Intellectual Property Rights</h2>
          <p>
            Unless explicitly stated in a bespoke deployment contract, all underlying architectures, WebGL shaders, frameworks, and structural code provided in demonstrations remain the intellectual property of Medhastone. Client-specific deliverables are transferred upon full project execution and settlement.
          </p>

          <h2 className="text-headline-md text-on-surface mt-lg mb-xs">3. Disclaimer of Warranties</h2>
          <p>
            Our open-source and demonstrative tools are provided on an "AS IS" and "AS AVAILABLE" basis. Medhastone makes no warranties, expressed or implied, regarding the uninterrupted operation of these specific public instances.
          </p>

          <h2 className="text-headline-md text-on-surface mt-lg mb-xs">4. Limitation of Liability</h2>
          <p>
            In no event shall Medhastone or its engineers be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our software products or consultation systems.
          </p>
        </div>

        <div className="mt-xl pt-lg border-t border-outline-variant/30 flex justify-center">
          <a href="#home" className="px-lg py-sm glass-card text-on-surface rounded-full text-label-caps hover:bg-primary/20 hover:text-primary transition-all duration-300 flex items-center gap-sm tracking-wider">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            RETURN TO DASHBOARD
          </a>
        </div>
      </div>
    </motion.div>
  );
}
