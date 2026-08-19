import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function MediJourney() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const features = [
    {
      icon: 'medication',
      title: 'Medicine Manager',
      desc: 'Create and manage medicine records including name, dosage, schedule, frequency, and notes.'
    },
    {
      icon: 'notifications_active',
      title: 'Medicine Reminder',
      desc: 'Create reminder notifications for medicines and appointments.'
    },
    {
      icon: 'monitor_heart',
      title: 'Health Tracker',
      desc: 'Track your own blood pressure, blood sugar, weight, health notes, and personal health history.'
    },
    {
      icon: 'folder_open',
      title: 'Medical Documents',
      desc: 'Store copies of prescriptions, laboratory reports, medical reports, and health documents.'
    },
    {
      icon: 'event_available',
      title: 'Appointment Manager',
      desc: 'Manage doctor appointments and medical reminders.'
    },
    {
      icon: 'timeline',
      title: 'Personal Health History',
      desc: 'Maintain a timeline of your health information for future reference.'
    }
  ];

  const privacyItems = [
    {
      icon: 'login',
      title: 'Google Sign-In',
      desc: 'Completely optional. Used only to back up your app data, restore data, and synchronize across devices if enabled.'
    },
    {
      icon: 'file_present',
      title: 'File Access',
      desc: 'Requested only when you choose to upload medical reports, prescriptions, or documents. Accesses only the files you select.'
    },
    {
      icon: 'notifications',
      title: 'Notifications',
      desc: 'Used only to send medicine, appointment, health, and document reminders. Can be disabled at any time.'
    },
    {
      icon: 'lock',
      title: 'Data & Privacy',
      desc: 'Health information is stored locally on your device by default. No account is required.'
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
        <motion.div variants={itemVariants} className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(52,211,153,0.3)] border border-white/10 shrink-0 bg-surface-container flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent"></div>
          <img src="/medi.jpg" alt="Medi Journey Logo" className="w-full h-full object-cover relative z-10" />
        </motion.div>
        
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div variants={itemVariants} className="flex gap-sm mb-md">
            <span className="px-sm py-xs rounded bg-secondary/10 text-secondary text-label-mono text-[11px] border border-secondary/30">HEALTH</span>
            <span className="px-sm py-xs rounded bg-surface-container-high/50 text-on-surface text-label-mono text-[11px] border border-outline-variant">ANDROID</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-display-lg-mobile md:text-display-lg text-on-surface mb-sm tracking-tight">
            Medi Journey
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="text-headline-md text-secondary mb-md tracking-wide">
            Personal Health Management App
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mb-lg">
            Organize, manage, and securely store your own health-related information in one place. Designed for individuals who want to manage their medicines, reminders, health records, and medical documents right from their device.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center md:items-start gap-md mt-sm">
             <a href="https://play.google.com/store/apps/details?id=com.medijourney" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-16 w-auto md:-ml-3" />
             </a>
             <a href="mailto:medhastone@gmail.com" className="h-[44px] px-lg mt-2 bg-surface-container border border-outline-variant text-on-surface font-bold rounded-full hover:border-secondary/50 hover:text-secondary hover:shadow-[0_0_15px_rgba(52,211,153,0.15)] transition-all flex items-center justify-center gap-sm">
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
        <motion.h3 variants={itemVariants} className="text-headline-lg text-on-surface mb-md tracking-tight">Purpose</motion.h3>
        <motion.p variants={itemVariants} className="text-body-lg text-on-surface-variant leading-relaxed">
          Medi Journey helps users keep their personal health information organized and easily accessible. 
          Manage medicine schedules, track records, store reports, and organize your health history with an optional backup feature.
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
          <h2 className="text-headline-lg text-on-surface mb-sm tracking-tight">Main Features</h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full opacity-50"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="glass-card p-lg hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary text-[28px]">{feature.icon}</span>
              </div>
              <h4 className="text-headline-md text-on-surface mb-sm text-[20px]">{feature.title}</h4>
              <p className="text-body-md text-on-surface-variant">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Privacy & Permissions */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="mb-xl glass-card p-xl bg-surface-container/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <motion.div variants={itemVariants} className="text-center mb-xl relative z-10">
          <h2 className="text-headline-lg text-on-surface mb-sm tracking-tight">Permissions & Privacy</h2>
          <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">We value your privacy. Here is exactly why we request certain permissions and how your data is handled.</p>
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

      {/* Disclaimer */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card p-lg border-error/20 bg-error/5 text-center max-w-4xl mx-auto relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-error/50 to-transparent"></div>
        <motion.span variants={itemVariants} className="material-symbols-outlined text-error text-[40px] mb-sm drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]">warning</motion.span>
        <motion.h4 variants={itemVariants} className="text-headline-md text-on-surface mb-sm">Medical Disclaimer</motion.h4>
        <motion.p variants={itemVariants} className="text-body-md text-on-surface-variant">
          Medi Journey is a personal health management tool. It is not a medical device and does not provide medical advice, diagnosis, treatment, or emergency medical services. Always consult a qualified healthcare professional for medical advice.
        </motion.p>
      </motion.div>

    </div>
  );
}
