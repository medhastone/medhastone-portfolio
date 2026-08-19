import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function RojgarBahi() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const features = [
    {
      icon: 'account_balance_wallet',
      title: 'Wage & Payment',
      desc: 'Calculate wages, track advances, and manage payments. Handle full days, half days, overtime, and daily wages automatically.'
    },
    {
      icon: 'calendar_month',
      title: 'Attendance Tracking',
      desc: 'Record worker attendance using a visual calendar. Easily track full days, half days, absences, and overtime shifts.'
    },
    {
      icon: 'receipt_long',
      title: 'Payment Slips',
      desc: 'Create easy-to-understand wage and payment records with total payable amounts and gross wages calculated automatically.'
    },
    {
      icon: 'engineering',
      title: 'Worker Management',
      desc: 'Add and organize multiple workers from one place. Ideal for construction, mechanics, painters, carpenters, and small teams.'
    },
    {
      icon: 'construction',
      title: 'Tools & Calculators',
      desc: 'Includes practical calculators like Peti Theka Margin, Sathi Udhaar, Overtime & Wage Calculator, Square Feet, and Bricks & Cement Estimators.'
    },
    {
      icon: 'book',
      title: 'Kamai & Work Records',
      desc: 'Keep earning information organized. Track total earnings, pending payments, advances, and review historical work summaries.'
    }
  ];

  return (
    <div className="relative pt-24 pb-xl px-gutter max-w-container-max mx-auto w-full z-10">
      
      {/* Header Section */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="flex flex-col md:flex-row items-center md:items-start gap-xl mb-xl glass-card p-xl"
      >
        <motion.div variants={itemVariants} className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(129,140,248,0.3)] border border-white/10 shrink-0 bg-surface-container flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
          <img src="/rojgar%20logo.jpg" alt="RojgarBahi Logo" className="w-full h-full object-cover relative z-10" />
        </motion.div>
        
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div variants={itemVariants} className="flex gap-sm mb-md">
            <span className="px-sm py-xs rounded bg-primary/10 text-primary text-label-mono text-[11px] border border-primary/30">FINANCE</span>
            <span className="px-sm py-xs rounded bg-surface-container-high/50 text-on-surface text-label-mono text-[11px] border border-outline-variant">OFFLINE</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-display-lg-mobile md:text-display-lg text-on-surface mb-sm tracking-tight">
            RojgarBahi
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="text-headline-md text-primary mb-md tracking-wide">
            काम का हिसाब, आसान तरीके से।
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mb-lg">
            An offline-first wage, attendance, payment, and work-management application. Built especially for daily-wage workers, contractors, site supervisors, and small work teams.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center md:items-start gap-md mt-sm">
             <a href="https://play.google.com/store/apps/details?id=com.rojgarbahi" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(129,140,248,0.3)]">
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-16 w-auto md:-ml-3" />
             </a>
             <a href="mailto:medhastone@gmail.com" className="h-[44px] px-lg mt-2 bg-surface-container border border-outline-variant text-on-surface font-bold rounded-full hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_rgba(129,140,248,0.15)] transition-all flex items-center justify-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                SUPPORT
             </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Purpose */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="mb-xl text-center max-w-4xl mx-auto"
      >
        <motion.h3 variants={itemVariants} className="text-headline-lg text-on-surface mb-md tracking-tight">Designed for Real-World Work</motion.h3>
        <motion.p variants={itemVariants} className="text-body-lg text-on-surface-variant leading-relaxed">
          RojgarBahi is designed with practical use in mind, supporting both Hindi and English terminology. With large controls, visual status indicators, and offline capability, it makes keeping everyday earning records easy even at remote work sites.
        </motion.p>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="mb-xl"
      >
        <motion.div variants={itemVariants} className="text-center mb-xl">
          <h2 className="text-headline-lg text-on-surface mb-sm tracking-tight">Core Features</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="glass-card p-lg hover:border-primary/50 hover:shadow-[0_0_30px_rgba(129,140,248,0.15)] transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-[28px]">{feature.icon}</span>
              </div>
              <h4 className="text-headline-md text-on-surface mb-sm text-[20px]">{feature.title}</h4>
              <p className="text-body-md text-on-surface-variant">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Legal/Info Section */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card p-lg border-surface-container-high bg-surface-container/30 text-center max-w-4xl mx-auto relative overflow-hidden mb-xl"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <motion.span variants={itemVariants} className="material-symbols-outlined text-primary text-[40px] mb-sm drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]">info</motion.span>
        <motion.h4 variants={itemVariants} className="text-headline-md text-on-surface mb-sm">Important Information</motion.h4>
        <motion.p variants={itemVariants} className="text-body-md text-on-surface-variant">
          RojgarBahi is a record-keeping and calculation tool. Wage, payment, and estimation results should always be verified before making financial decisions. The app does not replace professional accounting, legal, employment, or financial advice.
        </motion.p>
      </motion.div>

      {/* Footer Tagline */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="text-center py-xl"
      >
        <motion.p variants={itemVariants} className="text-display-lg-mobile text-primary tracking-tight font-bold opacity-80 mb-sm">
          काम का हिसाब रखें। कमाई समझें। रिकॉर्ड संभालें।
        </motion.p>
        <motion.p variants={itemVariants} className="text-headline-md text-on-surface-variant">
          RojgarBahi — आपके काम और कमाई का आसान हिसाब।
        </motion.p>
      </motion.div>

    </div>
  );
}
