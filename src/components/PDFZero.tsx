import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function PDFZero() {
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
      icon: 'description',
      title: 'Powerful PDF Tools',
      desc: 'Merge, split, compress, resize, crop, and edit PDFs. Extract text, add page numbers, and add watermarks instantly.'
    },
    {
      icon: 'lock',
      title: 'Security & Passwords',
      desc: 'Protect your PDFs with secure passwords, or unlock supported password-protected documents locally.'
    },
    {
      icon: 'document_scanner',
      title: 'Smart Scanner',
      desc: 'Turn your phone into a document scanner with automatic edge detection, ID scanning, QR scanning, and on-device OCR.'
    },
    {
      icon: 'transform',
      title: 'Format Conversion',
      desc: 'Convert PDF to images, Word, LaTeX, or Markdown. Convert images to PDF effortlessly.'
    },
    {
      icon: 'imagesmode',
      title: 'Image Tools',
      desc: 'Resize, compress, and cleanup images. Remove backgrounds to prepare photos for document insertion.'
    },
    {
      icon: 'print',
      title: 'Print & Layout',
      desc: 'Utilize advanced N-Up printing configurations, grayscale conversions, and PDF flattening.'
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
        <motion.div variants={itemVariants} className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(248,113,113,0.3)] border border-white/10 shrink-0 bg-surface-container flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-error/20 to-transparent"></div>
          <img src="/pdfzero.jpg" alt="PDFZero Logo" className="w-full h-full object-cover relative z-10" />
        </motion.div>
        
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div variants={itemVariants} className="flex gap-sm mb-md">
            <span className="px-sm py-xs rounded bg-error/10 text-error text-label-mono text-[11px] border border-error/30">UTILITY</span>
            <span className="px-sm py-xs rounded bg-surface-container-high/50 text-on-surface text-label-mono text-[11px] border border-outline-variant">OFFLINE</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-display-lg-mobile md:text-display-lg text-on-surface mb-sm tracking-tight">
            PDFZero
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="text-headline-md text-error mb-md tracking-wide">
            Fast. Private. On-Device.
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-body-lg text-on-surface-variant max-w-3xl leading-relaxed mb-lg">
            An offline document and PDF utility designed to help you scan, create, edit, organize, and manage documents directly on your device without routine cloud uploads.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center md:items-start gap-md mt-sm">
             <a href="https://play.google.com/store/apps/details?id=com.pdfzero" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(248,113,113,0.3)]">
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-16 w-auto md:-ml-3" />
             </a>
             <a href="mailto:medhastone@gmail.com" className="h-[44px] px-lg mt-2 bg-surface-container border border-outline-variant text-on-surface font-bold rounded-full hover:border-error/50 hover:text-error hover:shadow-[0_0_15px_rgba(248,113,113,0.15)] transition-all flex items-center justify-center gap-sm">
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
        <motion.h3 variants={itemVariants} className="text-headline-lg text-on-surface mb-md tracking-tight">Privacy-Focused Design</motion.h3>
        <motion.p variants={itemVariants} className="text-body-lg text-on-surface-variant leading-relaxed">
          PDFZero is designed with an <strong>offline-first approach</strong>. Document processing takes place directly on your device rather than requiring documents to be uploaded to a cloud server. Your documents remain strictly under your control.
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
          <h2 className="text-headline-lg text-on-surface mb-sm tracking-tight">Simple & Efficient Tools</h2>
          <div className="w-24 h-1 bg-error mx-auto rounded-full opacity-50"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="glass-card p-lg hover:border-error/50 hover:shadow-[0_0_30px_rgba(248,113,113,0.15)] transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-error/10 border border-error/20 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-error text-[28px]">{feature.icon}</span>
              </div>
              <h4 className="text-headline-md text-on-surface mb-sm text-[20px]">{feature.title}</h4>
              <p className="text-body-md text-on-surface-variant">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Warning/Disclaimer section */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card p-lg border-surface-container-high bg-surface-container/30 text-center max-w-4xl mx-auto relative overflow-hidden mb-xl"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-error/50 to-transparent"></div>
        <motion.span variants={itemVariants} className="material-symbols-outlined text-error text-[40px] mb-sm drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]">info</motion.span>
        <motion.h4 variants={itemVariants} className="text-headline-md text-on-surface mb-sm">Important Information</motion.h4>
        <motion.p variants={itemVariants} className="text-body-md text-on-surface-variant">
          Advanced features like OCR, document detection, and file conversion may depend on file types and device capabilities. Users are responsible for maintaining backups of important documents and verifying the results of automated processing.
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
        <motion.p variants={itemVariants} className="text-display-lg-mobile text-error tracking-tight font-bold opacity-80">
          Scan. Create. Convert. Manage.
        </motion.p>
      </motion.div>

    </div>
  );
}
