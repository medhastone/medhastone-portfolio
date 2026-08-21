import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Note: We are no longer preventing default.
    // The form will do a standard HTML POST request to FormSubmit.co
    // This is required for the FIRST submission to reliably trigger the activation process.
    setStatus('submitting');
    
    // We let the browser handle the actual submission naturally to https://formsubmit.co/medhastone@gmail.com
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className="relative py-xl px-gutter max-w-[1000px] mx-auto w-full mb-xl z-10" 
      id="contact"
    >
      <div className="glass-card rounded-3xl p-lg md:p-xl relative overflow-hidden border-primary/20">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
        
        {status === 'success' ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-xl">
            <span className="material-symbols-outlined text-[48px] text-secondary mb-sm drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">check_circle</span>
            <h3 className="text-headline-md text-on-surface tracking-wide mb-xs">Message Sent Successfully</h3>
            <p className="text-body-md text-on-surface-variant">Thank you for reaching out! We've received your message and will get back to you shortly.</p>
          </motion.div>
        ) : (
          <div className="flex flex-col md:flex-row gap-xl">
            
            {/* Left Column: Contact Info */}
            <div className="flex-1">
              <h2 className="text-display-lg-mobile text-on-surface tracking-tight mb-sm">Let's Connect</h2>
              <p className="text-body-md text-on-surface-variant mb-lg leading-relaxed">
                Whether you have a question about our apps, feedback for improvement, or a business inquiry, we're always ready to listen. At MedhaStone, your input helps us build better, more reliable tools.
              </p>
              
              <div className="flex flex-col gap-md">
                <a href="mailto:medhastone@gmail.com" className="flex items-center gap-md group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-[24px]">mail</span>
                  </div>
                  <div>
                    <p className="text-label-mono text-on-surface-variant text-[11px] tracking-widest mb-xs">EMAIL US DIRECTLY</p>
                    <p className="text-body-lg text-on-surface group-hover:text-primary transition-colors font-medium">medhastone@gmail.com</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-[24px]">schedule</span>
                  </div>
                  <div>
                    <p className="text-label-mono text-on-surface-variant text-[11px] tracking-widest mb-xs">RESPONSE TIME</p>
                    <p className="text-body-md text-on-surface font-medium">Usually within 24-48 hours</p>
                  </div>
                </div>

                <a href="https://www.linkedin.com/in/medhastone" target="_blank" rel="noopener noreferrer" className="flex items-center gap-md group mt-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/GAMING" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-label-mono text-on-surface-variant text-[11px] tracking-widest mb-xs">LINKEDIN</p>
                    <p className="text-body-lg text-on-surface group-hover:text-primary transition-colors font-medium">Connect professionally</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex-[1.2] bg-surface-container/30 p-lg rounded-2xl border border-white/5">
              <form action="https://formsubmit.co/medhastone@gmail.com" method="POST" className="flex flex-col gap-md" onSubmit={handleSubmit}>
                {/* Hidden input to redirect back to website after submission */}
                <input type="hidden" name="_next" value="https://zentova.in" />
                <input type="hidden" name="_captcha" value="false" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                  <div className="relative group">
                    <input className="w-full bg-background/80 border border-outline-variant text-on-surface text-body-md px-sm pt-md pb-sm focus:border-primary focus:shadow-[0_0_15px_rgba(129,140,248,0.2)] outline-none transition-all rounded-lg peer placeholder-transparent backdrop-blur-sm" id="name" name="name" placeholder="Name" required type="text" />
                    <label className="absolute left-sm top-sm text-xs text-on-surface-variant peer-focus:text-primary transition-colors" htmlFor="name">Your Name</label>
                  </div>
                  <div className="relative group">
                    <input className="w-full bg-background/80 border border-outline-variant text-on-surface text-body-md px-sm pt-md pb-sm focus:border-primary focus:shadow-[0_0_15px_rgba(129,140,248,0.2)] outline-none transition-all rounded-lg peer placeholder-transparent backdrop-blur-sm" id="email" name="email" placeholder="Email" required type="email" />
                    <label className="absolute left-sm top-sm text-xs text-on-surface-variant peer-focus:text-primary transition-colors" htmlFor="email">Email Address</label>
                  </div>
                </div>
                
                <div className="relative group">
                  <select className="w-full bg-background/80 border border-outline-variant text-on-surface text-body-md px-sm pt-md pb-sm focus:border-primary focus:shadow-[0_0_15px_rgba(129,140,248,0.2)] outline-none transition-all rounded-lg appearance-none peer backdrop-blur-sm" id="type" name="type" required defaultValue="">
                    <option disabled hidden value=""></option>
                    <option value="support">App Support & Help</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="business">Business Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                  <label className="absolute left-sm top-sm text-xs text-on-surface-variant peer-focus:text-primary transition-colors" htmlFor="type">Inquiry Type</label>
                  <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant group-focus-within:text-primary">expand_more</span>
                </div>
                
                <div className="relative group">
                  <textarea className="w-full bg-background/80 border border-outline-variant text-on-surface text-body-md px-sm pt-md pb-sm focus:border-primary focus:shadow-[0_0_15px_rgba(129,140,248,0.2)] outline-none transition-all rounded-lg resize-none peer placeholder-transparent backdrop-blur-sm" id="message" name="message" placeholder="Message" required rows={4}></textarea>
                  <label className="absolute left-sm top-sm text-xs text-on-surface-variant peer-focus:text-primary transition-colors" htmlFor="message">Your Message</label>
                </div>
                
                <div className="mt-xs">
                  <button 
                    className="w-full group relative px-xl py-[14px] bg-primary text-on-primary rounded-xl font-medium overflow-hidden shadow-[0_0_20px_rgba(129,140,248,0.3)] hover:shadow-[0_0_30px_rgba(129,140,248,0.5)] hover:bg-primary-container transition-all duration-300 flex items-center justify-center" 
                    type="submit"
                    disabled={status === 'submitting'}
                  >
                    <span className="relative z-10 flex items-center gap-sm">
                      {status === 'submitting' ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">send</span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
