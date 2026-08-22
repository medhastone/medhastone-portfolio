import { ChevronDown, Smartphone, Monitor, WifiOff, PenTool, Star, Mail, Clock, Linkedin, Instagram, Play, ArrowUp, ArrowRight } from 'lucide-react';
import { playButton } from '../game/audio';

export default function LandingScreen() {
  const FAQS = [
    {q: "What platforms do you develop apps for?", a: "We specialize in Flutter, which allows us to compile natively to Android, iOS, Web, Windows, macOS, and Linux from a single codebase."},
    {q: "How does your pricing model work?", a: "We offer fixed-bid pricing for well-defined scopes and time-and-materials for ongoing agile development. Contact us for a precise quote based on your requirements."},
    {q: "How long does it typically take to build an application?", a: "A standard enterprise application takes 3-4 months from concept to launch, though complex WebGL or heavy offline-sync requirements may extend timelines."},
    {q: "Do you provide ongoing support and maintenance?", a: "Yes, we offer flexible SLA-based maintenance contracts to ensure your application remains updated, secure, and performant post-launch."},
    {q: "Can you integrate with our existing backend or APIs?", a: "Absolutely. We routinely architect frontend systems that seamlessly consume RESTful APIs, GraphQL endpoints, and real-time WebSockets from legacy or modern backends."}
  ];

  return (
    <div className="w-full min-h-screen bg-[#0a0a0f] text-white font-sans overflow-y-auto overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">M</div>
            <span className="font-bold text-xl tracking-wider text-white">MEDHASTONE</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold text-white/60 tracking-widest uppercase">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#play-games" onClick={() => playButton()} className="hover:text-white transition-colors">Play Games</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"></div>
           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col md:flex-row items-center">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4 text-blue-400 font-bold tracking-widest text-xs uppercase">
              <div className="w-8 h-[2px] bg-blue-400"></div>
              MEDHASTONE APP STUDIO
            </div>
            <h1 className="text-5xl md:text-[5.5rem] font-black text-white leading-[1.1] tracking-tight">
              Transforming Ideas into <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Powerful & Scalable
              </span> <br/>
              Software Solutions
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              We specialize in crafting practical, offline-first mobile applications and resilient web platforms that solve real-world problems.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#contact" className="px-8 py-4 rounded-full border border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 text-white font-semibold flex items-center gap-3 transition-all text-sm uppercase tracking-wider">
                START A PROJECT <ArrowRight size={18}/>
              </a>
              <a href="#portfolio" className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 text-white font-semibold transition-all text-sm uppercase tracking-wider">
                EXPLORE PORTFOLIO
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block w-[500px] h-[500px] relative pointer-events-none opacity-60">
             <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_20s_linear_infinite]" style={{ transform: 'rotateX(60deg) rotateY(20deg)'}}></div>
             <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-[spin_15s_linear_infinite]" style={{ transform: 'rotateX(20deg) rotateY(60deg)'}}></div>
             <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-[spin_25s_linear_infinite]" style={{ transform: 'rotateX(80deg) rotateY(80deg)'}}></div>
             <div className="absolute inset-0 rounded-full border border-blue-400/10 animate-[spin_30s_linear_infinite]" style={{ transform: 'rotateX(40deg) rotateY(40deg)'}}></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full blur-[4px]"></div>
          </div>
          
          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 rotate-90 origin-right items-center gap-4 text-white/30 tracking-widest text-[10px] uppercase font-bold">
            <div className="w-12 h-[1px] bg-white/30"></div>
            DISCOVER OUR WORK
          </div>
        </div>
      </div>

      {/* Featured Deployments */}
      <div id="portfolio" className="py-32 bg-[#0a0a0f] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-white mb-3 tracking-tight">Featured Deployments</h2>
            <div className="text-blue-400 font-bold tracking-widest text-[11px] uppercase">
              ARCHITECTURE // ENGINEERING // UX
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="#parkdock"  className="lg:col-span-2 rounded-[2rem] bg-gradient-to-br from-[#131B3A] to-[#0D1226] border border-blue-500/20 p-10 flex flex-col justify-between group hover:border-blue-400/50 transition-all cursor-pointer block">
              <div className="flex justify-between items-start mb-12">
                <img src="/parkdock.jpg" alt="ParkDock" className="w-16 h-16 rounded-2xl object-cover shadow-2xl ring-1 ring-white/10" />
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full border border-blue-400/30 bg-blue-500/10 text-[10px] font-bold text-blue-300 uppercase tracking-wider">OFFLINE-FIRST</span>
                  <span className="px-3 py-1 rounded-full border border-blue-400/30 bg-blue-500/10 text-[10px] font-bold text-blue-300 uppercase tracking-wider">UTILITY</span>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-3">ParkDock</h3>
                <p className="text-blue-100/60 leading-relaxed">Your everyday driver companion - Smart vehicle management, parking tools, calculators, and a driving dashboard.</p>
              </div>
            </a>

            <a href="#brainmaze"  className="rounded-[2rem] bg-gradient-to-br from-[#1A1F35] to-[#111424] border border-indigo-500/20 p-10 flex flex-col justify-between group hover:border-indigo-400/50 transition-all cursor-pointer block">
              <div className="mb-12">
                <img src="/brainmaze.jpg" alt="Brain Maze Master" className="w-16 h-16 rounded-2xl object-cover shadow-2xl ring-1 ring-white/10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Brain Maze Master</h3>
                <p className="text-indigo-100/60 text-sm leading-relaxed">Puzzle game - Gamified cognitive puzzle experience featuring custom 2D geometric silhouettes and fluid kinetic animations.</p>
              </div>
            </a>
            
            <a href="#medijourney"  className="rounded-[2rem] bg-gradient-to-br from-[#0F292E] to-[#0A1A1D] border border-teal-500/20 p-8 flex flex-col justify-between group hover:border-teal-400/50 transition-all cursor-pointer block">
               <div className="flex justify-between items-start mb-12">
                <img src="/medi.jpg" alt="Medi Journey" className="w-12 h-12 rounded-xl object-cover shadow-lg ring-1 ring-white/10" />
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full border border-teal-400/30 bg-teal-500/10 text-[9px] font-bold text-teal-300 uppercase tracking-wider">HEALTH</span>
                  <span className="px-3 py-1 rounded-full border border-teal-400/30 bg-teal-500/10 text-[9px] font-bold text-teal-300 uppercase tracking-wider">ANALYTICS</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Medi Journey</h3>
                <p className="text-teal-100/60 text-sm leading-relaxed">Medication and vitals tracker app - Personalized medical tracking assistant with secure local data storage and visual timeline reporting.</p>
              </div>
            </a>
            
            <a href="#rojgarbahi"  className="rounded-[2rem] bg-gradient-to-br from-[#261531] to-[#180D1F] border border-purple-500/20 p-8 flex flex-col justify-between group hover:border-purple-400/50 transition-all cursor-pointer block">
              <div className="flex justify-between items-start mb-12">
                <img src="/rojgar logo.jpg" alt="RojgarBahi" className="w-12 h-12 rounded-xl object-cover shadow-lg ring-1 ring-white/10" />
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full border border-purple-400/30 bg-purple-500/10 text-[9px] font-bold text-purple-300 uppercase tracking-wider">UTILITY</span>
                  <span className="px-3 py-1 rounded-full border border-purple-400/30 bg-purple-500/10 text-[9px] font-bold text-purple-300 uppercase tracking-wider">FINANCE</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">RojgarBahi</h3>
                <p className="text-purple-100/60 text-sm leading-relaxed">Workers financial manager app - Robust business utility for workforce management and high-frequency daily ledger tracking.</p>
              </div>
            </a>
            
            <a href="#pdfzero"  className="rounded-[2rem] bg-gradient-to-br from-[#331119] to-[#1C090D] border border-rose-500/20 p-8 flex flex-col justify-between group hover:border-rose-400/50 transition-all cursor-pointer block">
              <div className="flex justify-between items-start mb-12">
                <img src="/pdfzero.jpg" alt="PDFZero" className="w-12 h-12 rounded-xl object-cover shadow-lg ring-1 ring-white/10" />
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full border border-rose-400/30 bg-rose-500/10 text-[9px] font-bold text-rose-300 uppercase tracking-wider">UTILITY</span>
                  <span className="px-3 py-1 rounded-full border border-rose-400/30 bg-rose-500/10 text-[9px] font-bold text-rose-300 uppercase tracking-wider">OFFLINE</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">PDFZero</h3>
                <p className="text-rose-100/60 text-sm leading-relaxed">PDF related solution app - Zero-knowledge, privacy-focused PDF utility. All processing executes locally on device.</p>
              </div>
            </a>

          </div>
        </div>
      </div>

      {/* Core Capabilities */}
      <div id="services" className="py-32 bg-[#0a0a0f] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white tracking-tight">Core Capabilities</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-[2rem] bg-[#111116] border border-white/5 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                <Smartphone size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Cross-Platform Apps</h3>
              <p className="text-white/50 text-sm leading-relaxed">High-fidelity native experiences for Android and iOS engineered from a single performant Flutter codebase.</p>
            </div>

            <div className="p-8 rounded-[2rem] bg-[#111116] border border-white/5 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                <Monitor size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">WebGL Web Apps</h3>
              <p className="text-white/50 text-sm leading-relaxed">Immersive, hardware-accelerated web experiences utilizing Three.js and custom shader pipelines.</p>
            </div>

            <div className="p-8 rounded-[2rem] bg-[#111116] border border-white/5 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <WifiOff size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Offline-First Design</h3>
              <p className="text-white/50 text-sm leading-relaxed">Resilient system architectures leveraging SQLite and Room for uninterrupted operation in low-connectivity zones.</p>
            </div>

            <div className="p-8 rounded-[2rem] bg-[#111116] border border-white/5 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
                <PenTool size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">UX Prototyping</h3>
              <p className="text-white/50 text-sm leading-relaxed">Meticulous interface design adhering to Material Design 3 and modern Human Interface Guidelines.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Success Stories */}
      <div className="py-32 bg-[#0a0a0f] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Client Success Stories</h2>
          <p className="text-white/50 mb-16 max-w-2xl mx-auto">Hear what our partners have to say about our development process, performance, and final deliverables.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-8 rounded-[2rem] bg-[#111116] border border-white/5 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-white/5 text-9xl font-serif">"</div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-white text-sm">AR</div>
                <div>
                  <div className="font-bold text-white text-sm">Aman Rajput</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold mt-1">Founder, TechGrow Solutions</div>
                </div>
              </div>
              <div className="flex text-amber-400 mb-4 gap-1 relative z-10">
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
              </div>
              <p className="text-white/70 text-sm leading-relaxed italic relative z-10">
                "Medhastone transformed our workflow. The custom app they built handles offline sync flawlessly, allowing our field team to work without interruptions. Highly recommended for complex solutions!"
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-[#111116] border border-white/5 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-white/5 text-9xl font-serif">"</div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-white text-sm">SG</div>
                <div>
                  <div className="font-bold text-white text-sm">Sneha Gupta</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold mt-1">Product Manager, ElevateX</div>
                </div>
              </div>
              <div className="flex text-amber-400 mb-4 gap-1 relative z-10">
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
              </div>
              <p className="text-white/70 text-sm leading-relaxed italic relative z-10">
                "Their expertise in Flutter means we got high-performance Android, iOS, and Web apps from a single codebase. It saved us significant time and budget without sacrificing quality."
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-[#111116] border border-white/5 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-white/5 text-9xl font-serif">"</div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center font-bold text-white text-sm">RV</div>
                <div>
                  <div className="font-bold text-white text-sm">Rahul Verma</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold mt-1">CEO, Nexa Retail</div>
                </div>
              </div>
              <div className="flex text-amber-400 mb-4 gap-1 relative z-10">
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
                <Star size={14} fill="currentColor"/>
              </div>
              <p className="text-white/70 text-sm leading-relaxed italic relative z-10">
                "A highly professional team. The UI/UX of our new dashboard is outstanding, and they delivered the entire project well ahead of schedule. Truly high-performance digital experiences."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 bg-[#0a0a0f] relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group rounded-[1.5rem] bg-[#111116] border border-white/5 overflow-hidden transition-all">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white outline-none list-none text-sm md:text-base hover:bg-white/[0.02]">
                  {faq.q}
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 ml-4 group-open:bg-blue-500/20 group-open:text-blue-400 transition-colors">
                    <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
                  </div>
                </summary>
                <div className="px-6 pb-6 text-white/50 leading-relaxed text-sm border-t border-white/5 pt-4 bg-[#111116]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-32 bg-[#0a0a0f] relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/10 rounded-[3rem] border border-white/10 p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-16 shadow-2xl shadow-indigo-900/20">
            
            <div>
              <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Let's Connect</h2>
              <p className="text-white/60 mb-12 leading-relaxed text-sm">
                Whether you have a question about our apps, feedback for improvement, or a business inquiry, we're always ready to listen. At MedhaStone, your input helps us build better, more reliable tools.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">EMAIL US DIRECTLY</div>
                    <div className="text-white font-bold text-sm">medhastone@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">RESPONSE TIME</div>
                    <div className="text-white font-bold text-sm">Usually within 24-48 hours</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Linkedin size={18} className="text-white/80" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">LINKEDIN</div>
                    <div className="text-white font-bold text-sm">Connect professionally</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0f] rounded-3xl p-8 border border-white/5 shadow-xl">
              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                     <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Your Name</label>
                     <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-colors" />
                   </div>
                   <div className="space-y-1.5">
                     <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Email Address</label>
                     <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-colors" />
                   </div>
                </div>
                
                <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Inquiry Type</label>
                   <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-colors appearance-none">
                     <option className="bg-[#0a0a0f]">App Development</option>
                     <option className="bg-[#0a0a0f]">Web Development</option>
                     <option className="bg-[#0a0a0f]">General Inquiry</option>
                   </select>
                </div>
                
                <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Your Message</label>
                   <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-colors resize-none"></textarea>
                </div>
                
                <button className="w-full py-4 rounded-xl bg-white hover:bg-gray-200 text-black font-bold flex items-center justify-center gap-2 transition-colors mt-2 text-sm">
                  Send Message <ArrowRight size={16} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#050508] pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white">M</div>
                <span className="font-bold text-xl tracking-wider text-white">MEDHASTONE</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-md font-medium">
                Medhastone is a specialized software engineering studio focused on developing high-performance, cross-platform applications and immersive WebGL experiences. We combine rigorous technical architecture with meticulous interface design to deliver resilient, enterprise-grade digital products.
              </p>
            </div>
            <div className="flex justify-start md:justify-end gap-16">
              <div>
                 <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6">SOCIAL</div>
                 <div className="space-y-4">
                   <a href="#" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm font-semibold">
                     <Instagram size={16}/> Instagram
                   </a>
                   <a href="#" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm font-semibold">
                     <Linkedin size={16}/> LinkedIn
                   </a>
                   <a href="#" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm font-semibold">
                     <Play size={16} fill="currentColor"/> Google Play
                   </a>
                 </div>
              </div>
              <div className="hidden md:block">
                 <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest">
                   <ArrowUp size={14}/> Back to top
                 </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-[10px] font-bold text-white/30 tracking-widest uppercase">
            <div>© 2026 MEDHASTONE. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
              <a href="#" className="hover:text-white transition-colors">TERMS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
