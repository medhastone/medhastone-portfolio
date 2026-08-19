import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function ParkDock() {
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
      icon: 'local_parking',
      title: 'Parking Made Simple',
      desc: 'Save your parking location, add photos and notes, keep history, and find your vehicle more easily with interactive maps.'
    },
    {
      icon: 'directions_car',
      title: 'Manage Your Vehicles',
      desc: 'Save info about your cars, motorcycles, or scooters. Organize details like registration, brand, color, fuel type, and photos.'
    },
    {
      icon: 'handyman',
      title: 'Driver Tools',
      desc: 'Access fuel and mileage tracking, expense logging, a parking timer, compass, and maintenance tools all in one app.'
    },
    {
      icon: 'traffic',
      title: 'Traffic Signs & Learning',
      desc: 'Learn about traffic signals, restriction signs, warnings, and road-safety concepts for general educational purposes.'
    },
    {
      icon: 'dashboard',
      title: 'Driving Dashboard',
      desc: 'Review parking activity, fuel records, driving expenses, maintenance logs, and personal activity trends at a glance.'
    },
    {
      icon: 'calculate',
      title: 'Driver Calculators',
      desc: 'Practical calculators for fuel costs, mileage, trip cost, travel-time estimates, and maintenance expenses.'
    },
    {
      icon: 'folder_special',
      title: 'Vehicle Documents',
      desc: 'Organize and keep references to your driving documents, vehicle registration, insurance, and maintenance records.'
    },
    {
      icon: 'mic',
      title: 'Smart Assistant',
      desc: 'Voice and text-based assistant functionality to quickly search information, find parking, or open specific driver utilities.'
    }
  ];

  const infoItems = [
    {
      icon: 'shield_lock',
      title: 'Privacy & User Choice',
      desc: 'Permissions (location, mic, camera) are only requested when needed. You have full control through your Android settings.'
    },
    {
      icon: 'ad_units',
      title: 'Advertising',
      desc: 'Ads support development and are designed to be transparent, non-disruptive, and distinct from app functionality.'
    },
    {
      icon: 'gavel',
      title: 'Important Information',
      desc: 'ParkDock is a utility. It does not replace official traffic authorities, emergency services, or professional mechanics.'
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
          <img src="/parkdock.jpg" alt="ParkDock Logo" className="w-full h-full object-cover relative z-10" />
        </motion.div>
        
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div variants={itemVariants} className="flex gap-sm mb-md">
            <span className="px-sm py-xs rounded bg-primary/10 text-primary text-label-mono text-[11px] border border-primary/30">UTILITY</span>
            <span className="px-sm py-xs rounded bg-surface-container-high/50 text-on-surface text-label-mono text-[11px] border border-outline-variant">ANDROID</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-display-lg-mobile md:text-display-lg text-on-surface mb-sm tracking-tight">
            ParkDock
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="text-headline-md text-primary mb-md tracking-wide">
            Your Everyday Driver Companion
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mb-lg">
            A practical mobile app designed to help drivers organize parking information, manage vehicle details, access useful driver tools, and learn important road-safety information — all in one place.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center md:items-start gap-md mt-sm">
             <a href="https://play.google.com/store/apps/details?id=com.aistudio.parkdock.a1b2c3d4e5" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(129,140,248,0.3)]">
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
        <motion.h3 variants={itemVariants} className="text-headline-lg text-on-surface mb-md tracking-tight">Simplicity, Convenience, Privacy</motion.h3>
        <motion.p variants={itemVariants} className="text-body-lg text-on-surface-variant leading-relaxed">
          Our goal is to keep useful driver utilities together instead of requiring multiple separate apps. 
          ParkDock is designed with a focus on an enjoyable user experience, helping you remember where you parked, tracking your vehicle's metrics, and learning the rules of the road.
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
          <h2 className="text-headline-lg text-on-surface mb-sm tracking-tight">App Features</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-50"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="glass-card p-lg hover:border-primary/50 hover:shadow-[0_0_30px_rgba(129,140,248,0.15)] transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-[28px]">{feature.icon}</span>
              </div>
              <h4 className="text-headline-md text-on-surface mb-sm text-[18px]">{feature.title}</h4>
              <p className="text-body-md text-on-surface-variant text-[15px]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Privacy, Ads, Legal */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="mb-xl glass-card p-xl bg-surface-container/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <motion.div variants={itemVariants} className="text-center mb-xl relative z-10">
          <h2 className="text-headline-lg text-on-surface mb-sm tracking-tight">Data & Transparency</h2>
          <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">We believe useful driver tools should also respect user privacy. Here's what you need to know.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg relative z-10">
          {infoItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col gap-sm p-md bg-surface-container/40 rounded-2xl border border-outline-variant/50">
              <span className="material-symbols-outlined text-on-surface mb-xs text-[28px]">{item.icon}</span>
              <h4 className="text-headline-md text-on-surface text-[18px]">{item.title}</h4>
              <p className="text-body-md text-on-surface-variant text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Tagline */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="text-center py-xl"
      >
        <motion.p variants={itemVariants} className="text-display-lg-mobile text-primary tracking-tight font-bold opacity-80">
          Park. Organize. Learn. Drive smarter.
        </motion.p>
      </motion.div>
    </div>
  );
}
