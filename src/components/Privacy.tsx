import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function Privacy() {
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
          <span className="material-symbols-outlined text-primary text-[32px]">shield_lock</span>
          <h1 className="text-display-lg-mobile md:text-headline-lg text-on-surface tracking-tight">Privacy Policy</h1>
        </div>
        
        <div className="space-y-md text-body-md text-on-surface-variant leading-relaxed">
          <p className="text-label-mono text-primary/80 tracking-widest uppercase text-xs mb-lg">Last updated: August 2026</p>
          
          <h2 className="text-headline-md text-on-surface mt-lg mb-xs">1. Data Minimization & Collection</h2>
          <p>
            At Medhastone, we prioritize the security and privacy of our users. We adhere to a strict zero-knowledge, offline-first philosophy for all local operations. We only collect the minimal amount of data necessary to facilitate communication through our contact forms or strictly optional telemetry for diagnostic purposes.
          </p>

          <h2 className="text-headline-md text-on-surface mt-lg mb-xs">2. Use of Information</h2>
          <p>
            Any information submitted via our deployment inquiry system (Name, Email, Mission Scope) is transmitted securely and is used exclusively for project evaluation and client communication. We do not sell, distribute, or broker your technical or personal data to third-party entities under any circumstances.
          </p>

          <h2 className="text-headline-md text-on-surface mt-lg mb-xs">3. Local Storage & Offline-First</h2>
          <p>
            Many of our developed products (e.g., PDFZero, Medi Journey) operate entirely offline. This means your data remains securely encrypted on your local device and is never transmitted to our servers.
          </p>

          <h2 className="text-headline-md text-on-surface mt-lg mb-xs">4. Contact Us</h2>
          <p>
            If you have questions or concerns regarding our privacy practices or data handling, please initiate a connection through our contact form on the main dashboard.
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
