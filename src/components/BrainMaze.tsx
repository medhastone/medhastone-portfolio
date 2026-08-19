import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function BrainMaze() {
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
      icon: 'extension',
      title: 'Handcrafted Puzzles',
      desc: 'Hundreds of creative maze puzzles with increasing difficulty from Easy to Master.'
    },
    {
      icon: 'sports_esports',
      title: 'Fun Characters',
      desc: 'Unlock new hero characters, unique puzzle themes, and customize your experience.'
    },
    {
      icon: 'redeem',
      title: 'Rewards & Progression',
      desc: 'Earn coins, diamonds, keys, daily rewards, and spin the lucky wheel.'
    },
    {
      icon: 'lightbulb',
      title: 'Helpful Tools',
      desc: 'Use the hint system for difficult puzzles, plus undo & reset options to perfect your moves.'
    },
    {
      icon: 'emoji_events',
      title: 'Achievements',
      desc: 'Complete levels to earn stars, achievements, and progress through the game.'
    },
    {
      icon: 'music_note',
      title: 'Relaxing Audio',
      desc: 'Enjoy smooth gameplay with relaxing background music and satisfying sound effects.'
    }
  ];

  const privacyItems = [
    {
      icon: 'person_off',
      title: 'No Account Required',
      desc: 'Core gameplay is fully accessible instantly without needing to create an account.'
    },
    {
      icon: 'ad_units',
      title: 'Optional Ads',
      desc: 'Ads help support development, but rewarded ads for extra items are always optional.'
    },
    {
      icon: 'notifications',
      title: 'Notifications',
      desc: 'Used only for game-related reminders if you explicitly choose to enable them.'
    },
    {
      icon: 'shield',
      title: 'Privacy Focused',
      desc: 'Designed to provide an enjoyable, secure experience while respecting your choices.'
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
        <motion.div variants={itemVariants} className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(251,146,60,0.3)] border border-white/10 shrink-0 bg-surface-container flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-tertiary/20 to-transparent"></div>
          <img src="/brainmaze.jpg" alt="Brain Maze Master Logo" className="w-full h-full object-cover relative z-10" />
        </motion.div>
        
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div variants={itemVariants} className="flex gap-sm mb-md">
            <span className="px-sm py-xs rounded bg-tertiary/10 text-tertiary text-label-mono text-[11px] border border-tertiary/30">GAME</span>
            <span className="px-sm py-xs rounded bg-surface-container-high/50 text-on-surface text-label-mono text-[11px] border border-outline-variant">ANDROID</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-display-lg-mobile md:text-display-lg text-on-surface mb-sm tracking-tight">
            Brain Maze Master
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="text-headline-md text-tertiary mb-md tracking-wide">
            Logic Puzzle Game
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mb-lg">
            A fun and engaging puzzle game designed to challenge your logical thinking, concentration, and problem-solving skills. Guide your hero through creative mazes and enjoy satisfying gameplay at your own pace.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center md:items-start gap-md mt-sm">
             <a href="https://play.google.com/store/apps/details?id=com.brainmaze.master" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(251,146,60,0.3)]">
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-16 w-auto md:-ml-3" />
             </a>
             <a href="mailto:medhastone@gmail.com" className="h-[44px] px-lg mt-2 bg-surface-container border border-outline-variant text-on-surface font-bold rounded-full hover:border-tertiary/50 hover:text-tertiary hover:shadow-[0_0_15px_rgba(251,146,60,0.15)] transition-all flex items-center justify-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                SUPPORT
             </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Mission & Purpose */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="mb-xl text-center max-w-4xl mx-auto"
      >
        <motion.h3 variants={itemVariants} className="text-headline-lg text-on-surface mb-md tracking-tight">Our Mission</motion.h3>
        <motion.p variants={itemVariants} className="text-body-lg text-on-surface-variant leading-relaxed">
          Create enjoyable puzzle experiences that encourage logical thinking and strategic planning. We strive to deliver smooth, relaxing, and rewarding gameplay for players of all ages, continuously improving based on your feedback.
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
          <h2 className="text-headline-lg text-on-surface mb-sm tracking-tight">Game Features</h2>
          <div className="w-24 h-1 bg-tertiary mx-auto rounded-full opacity-50"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="glass-card p-lg hover:border-tertiary/50 hover:shadow-[0_0_30px_rgba(251,146,60,0.15)] transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-tertiary/10 border border-tertiary/20 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-tertiary text-[28px]">{feature.icon}</span>
              </div>
              <h4 className="text-headline-md text-on-surface mb-sm text-[20px]">{feature.title}</h4>
              <p className="text-body-md text-on-surface-variant">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Privacy Section */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="mb-xl glass-card p-xl bg-surface-container/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <motion.div variants={itemVariants} className="text-center mb-xl relative z-10">
          <h2 className="text-headline-lg text-on-surface mb-sm tracking-tight">Privacy & Player Experience</h2>
          <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">Your privacy matters. Brain Maze Master is designed to provide an enjoyable experience while respecting your choices.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg relative z-10">
          {privacyItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="flex gap-md p-md bg-surface-container/40 rounded-2xl border border-outline-variant/50">
              <div className="mt-xs">
                <span className="material-symbols-outlined text-primary text-[24px]">{item.icon}</span>
              </div>
              <div>
                <h4 className="text-headline-md text-on-surface text-[18px] mb-xs">{item.title}</h4>
                <p className="text-body-md text-on-surface-variant text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
