import React, { useState, useMemo, useEffect } from 'react';
import { 
  Smartphone, 
  Monitor, 
  WifiOff, 
  PenTool, 
  Star, 
  Mail, 
  Clock, 
  Linkedin, 
  Instagram, 
  Play, 
  ArrowUp, 
  ArrowRight, 
  Menu, 
  X, 
  Check, 
  Shield, 
  Zap, 
  Database, 
  Cpu, 
  Search, 
  Layers, 
  RefreshCw, 
  Wifi, 
  ExternalLink, 
  HardHat, 
  Car, 
  Brain, 
  Activity, 
  FileText, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  ChevronDown, 
  Sliders, 
  Lock, 
  Terminal,
  Calculator,
  Compass,
  Code2
} from 'lucide-react';
import { playButton } from '../game/audio';

// Portfolio Project Interface
interface ProjectItem {
  id: string;
  title: string;
  category: 'offline' | 'utility' | 'workforce' | 'health' | 'gaming';
  categoryLabel: string;
  badge: string;
  gradient: string;
  borderHover: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  techStack: string[];
  metrics: string;
  hasPlayStore?: boolean;
}

export default function LandingScreen() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic Title & Canonical for Home Page
  useEffect(() => {
    document.title = "Medhastone | High-Performance App Development & Offline-First Engineering Studio";
  }, []);

  const navigateToProject = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    playButton();
    window.history.pushState(null, '', `/${projectId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // -------------------------------------------------------------
  // INTERACTIVE FEATURE 1: Offline-First Architecture Simulator
  // -------------------------------------------------------------
  const [networkOnline, setNetworkOnline] = useState<boolean>(true);
  const [simStep, setSimStep] = useState<number>(0);
  const [simLog, setSimLog] = useState<string[]>([
    "System initialized. Local SQLite cache ready.",
    "Network adapter connected to 5G gateway.",
    "Deterministic replication queue standing by."
  ]);
  const [simIsRunning, setSimIsRunning] = useState<boolean>(false);

  const toggleNetworkStatus = () => {
    playButton();
    const nextState = !networkOnline;
    setNetworkOnline(nextState);
    setSimLog(prev => [
      `[NETWORK] Gateway status toggled: ${nextState ? 'ONLINE (5G / Low Latency)' : 'OFFLINE (Airplane / Tunnel / Zero Signal)'}`,
      ...prev.slice(0, 5)
    ]);
  };

  const triggerSimulationWrite = () => {
    playButton();
    setSimIsRunning(true);
    setSimStep(prev => prev + 1);

    if (networkOnline) {
      setTimeout(() => {
        setSimLog(prev => [
          `[SUCCESS] Medhastone Engine: Local write in 1.4ms -> Background Cloud Delta replicated in 48ms.`,
          `[LEGACY CLOUD] Remote HTTP POST 200 OK after 290ms latency.`,
          ...prev.slice(0, 5)
        ]);
        setSimIsRunning(false);
      }, 400);
    } else {
      setTimeout(() => {
        setSimLog(prev => [
          `[MEDHASTONE OFFLINE-FIRST] Instant local write in 1.1ms to SQLite. Optimistic UI updated with 0 dropped frames. Mutation queued to encrypted WAL.`,
          `[LEGACY CLOUD COMPARISON] ❌ HTTP 504 Request Failed (ERR_INTERNET_DISCONNECTED). Screen blocked by infinite spinner! Data lost.`,
          ...prev.slice(0, 5)
        ]);
        setSimIsRunning(false);
      }, 350);
    }
  };

  // -------------------------------------------------------------
  // INTERACTIVE FEATURE 2: Portfolio Filters & Search
  // -------------------------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const PORTFOLIO: ProjectItem[] = [
    {
      id: 'parkdock',
      title: 'ParkDock',
      category: 'utility',
      categoryLabel: 'Vehicle & Mobility',
      badge: 'OFFLINE-FIRST MOBILITY',
      gradient: 'from-[#131B3A] to-[#0D1226]',
      borderHover: 'hover:border-blue-400/60',
      image: '/parkdock.jpg',
      shortDesc: 'Smart vehicle management, parking memory, and automotive maintenance dashboard.',
      fullDesc: 'Engineered for seamless offline tracking of parking coordinates, fuel efficiency algorithms, and vehicle service intervals with zero cloud dependency.',
      techStack: ['Flutter', 'SQLite', 'Geofencing', 'Room', 'Material 3'],
      metrics: '100% Offline • Zero Telemetry Leak',
      hasPlayStore: true
    },
    {
      id: 'rojgarbahi',
      title: 'RojgarBahi',
      category: 'workforce',
      categoryLabel: 'Workforce & Civil',
      badge: '#1 THEKEDAR HISAAB',
      gradient: 'from-[#241334] to-[#12091A]',
      borderHover: 'hover:border-purple-400/60',
      image: '/rojgar logo.jpg',
      shortDesc: 'Labour attendance haziri ledger, 12+ civil trade calculators, and BOCW welfare tracker.',
      fullDesc: 'Custom offline-first daily wage ledger designed for Indian civil contractors, site munshis, and mistris. Includes Dynamic QR peer-to-peer passbook sync and 14 regional languages.',
      techStack: ['Flutter', 'Encrypted SQLite', '14 Indian Languages', 'Dynamic QR Sync', 'TTS Engine'],
      metrics: '14 Languages • 100% Offline Sync',
      hasPlayStore: true
    },
    {
      id: 'brainmaze',
      title: 'Brain Maze Master',
      category: 'gaming',
      categoryLabel: 'Cognitive WebGL',
      badge: 'KINETIC 2D/3D ENGINE',
      gradient: 'from-[#1A1F35] to-[#111424]',
      borderHover: 'hover:border-indigo-400/60',
      image: '/brainmaze.jpg',
      shortDesc: 'Gamified cognitive spatial puzzle experience featuring procedural geometric labyrinths.',
      fullDesc: 'Hardware-accelerated labyrinth engine built with custom particle dynamics, responsive touch haptics, and progressive procedural spatial challenges.',
      techStack: ['HTML5 Canvas', 'WebGL', 'Physics Engine', 'Spatial Algorithms'],
      metrics: '60 FPS Target • Zero Jitter',
      hasPlayStore: true
    },
    {
      id: 'medijourney',
      title: 'Medi Journey',
      category: 'health',
      categoryLabel: 'Digital Health',
      badge: 'HIPAA-ALIGNED VAULT',
      gradient: 'from-[#0F292E] to-[#0A1A1D]',
      borderHover: 'hover:border-teal-400/60',
      image: '/medi.jpg',
      shortDesc: 'Personalized medical tracking assistant with encrypted local data storage and adherence analytics.',
      fullDesc: 'Patient-centric medical log for chronic therapies, physiological vitals graphing, and emergency prescription cards stored securely in an on-device encrypted database.',
      techStack: ['Flutter', 'AES-256 Vault', 'Data Visualizers', 'Local Reminders'],
      metrics: 'Zero-Knowledge • Local Encrypted',
      hasPlayStore: true
    },
    {
      id: 'pdfzero',
      title: 'PDFZero',
      category: 'utility',
      categoryLabel: 'Document Privacy',
      badge: 'ZERO-KNOWLEDGE UTILITY',
      gradient: 'from-[#331119] to-[#1C090D]',
      borderHover: 'hover:border-rose-400/60',
      image: '/pdfzero.jpg',
      shortDesc: 'Zero-knowledge, privacy-focused PDF manipulation engine running entirely on-device.',
      fullDesc: 'Fast client-side PDF merging, compression, and encryption using WebAssembly with zero server-side transmission or document uploads.',
      techStack: ['WebAssembly', 'TypeScript', 'Client-Side PDF Engine', 'Zero Server Upload'],
      metrics: '0-Byte Server Upload • Instant Processing',
      hasPlayStore: false
    },
    {
      id: 'lexibrain',
      title: 'LexiBrain: Find Hidden Words',
      category: 'gaming',
      categoryLabel: 'Word Puzzle & Education',
      badge: '#1 VOCABULARY SEARCH',
      gradient: 'from-[#1e1b4b] to-[#0f172a]',
      borderHover: 'hover:border-violet-400/60',
      image: '/lexibrain.svg',
      shortDesc: 'Offline procedural word search puzzle game meets interactive Vocabulary Vault with native TTS audio pronunciation.',
      fullDesc: 'Find hidden words across 500+ procedural grids, unlock Free Dictionary definitions, listen to native Android spoken pronunciation, and explore cozy themes with 100% offline Room DB privacy.',
      techStack: ['Android Kotlin', 'Room DB', 'Native TTS Engine', 'Material Design 3'],
      metrics: '500+ Grids • 100% Offline TTS',
      hasPlayStore: true
    }
  ];

  const filteredPortfolio = useMemo(() => {
    return PORTFOLIO.filter(item => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesQuery = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // -------------------------------------------------------------
  // INTERACTIVE FEATURE 3: Project Architecture & Cost Estimator
  // -------------------------------------------------------------
  const [calcPlatform, setCalcPlatform] = useState<'mobile' | 'web' | 'cross'>('cross');
  const [calcOffline, setCalcOffline] = useState<'strict' | 'hybrid' | 'cloud'>('hybrid');
  const [calcModules, setCalcModules] = useState<string[]>(['auth', 'storage']);
  const [calcTier, setCalcTier] = useState<'enterprise' | 'startup'>('enterprise');

  const toggleCalcModule = (mod: string) => {
    playButton();
    setCalcModules(prev => 
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };

  const calculatedEstimate = useMemo(() => {
    let weeksMin = 4;
    let weeksMax = 8;
    let stackName = "Flutter + SQLite + TypeScript Web API";

    if (calcPlatform === 'mobile') {
      weeksMin += 2;
      weeksMax += 3;
      stackName = "Flutter Native (Android/iOS) + Room/SQLite";
    } else if (calcPlatform === 'web') {
      weeksMin += 1;
      weeksMax += 2;
      stackName = "React 18 + Vite + Tailwind + IndexedDB";
    } else {
      weeksMin += 3;
      weeksMax += 5;
      stackName = "Unified Flutter + Web Assembly + WebGL Canvas";
    }

    if (calcOffline === 'strict') {
      weeksMin += 2;
      weeksMax += 3;
      stackName += " + Zero-Cloud Encrypted Vault";
    } else if (calcOffline === 'hybrid') {
      weeksMin += 3;
      weeksMax += 4;
      stackName += " + CRDT Background Sync Engine";
    }

    weeksMin += calcModules.length * 1;
    weeksMax += calcModules.length * 1.5;

    return {
      weeks: `${weeksMin} - ${Math.round(weeksMax)} Weeks`,
      architecture: stackName,
      slaSupport: calcTier === 'enterprise' ? '24/7 Dedicated Tier-1 SLA' : 'Standard Agile Support'
    };
  }, [calcPlatform, calcOffline, calcModules, calcTier]);

  // Fill in contact form with precalculated spec
  const prefillInquiry = () => {
    playButton();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
    const msgInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    if (msgInput) {
      msgInput.value = `Hello Medhastone Team,\n\nI configured an engineering project with the following requirements:\n- Platform: ${calcPlatform.toUpperCase()}\n- Sync Strategy: ${calcOffline.toUpperCase()} OFFLINE-FIRST\n- Selected Modules: ${calcModules.join(', ')}\n- Recommended Blueprint: ${calculatedEstimate.architecture}\n- Estimated Window: ${calculatedEstimate.weeks}\n\nLet's schedule a technical discovery consultation to discuss our specifications and timeline.`;
    }
  };

  // -------------------------------------------------------------
  // INTERACTIVE FEATURE 4: FAQ Accordion with Search & Categories
  // -------------------------------------------------------------
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const ALL_FAQS = [
    {
      category: 'architecture',
      q: "What makes 'Offline-First' architecture fundamentally superior to standard cloud apps?",
      a: "Traditional cloud apps treat network connectivity as a guaranteed precondition. When users enter subways, construction sites, basements, or flights, standard cloud apps freeze with spinners and lose unsaved user data. Medhastone's Offline-First architecture treats local device storage (SQLite/Room/IndexedDB) as the primary source of truth. Every transaction commits in under 2ms locally with zero frame latency, then replicates asynchronously to cloud clusters via deterministic delta synchronization when connectivity is available."
    },
    {
      category: 'tech',
      q: "Why do you specialize in Flutter for mobile and multi-platform apps?",
      a: "Flutter compiles directly to native ARM machine code on Android and iOS and runs with Impeller and Skia graphics engines. This eliminates the JavaScript bridge latency inherent in frameworks like React Native, delivering locked 60 FPS and 120 FPS render pipelines. A unified codebase ensures mathematical UI parity across Android, iOS, Web, and Desktop while reducing long-term maintenance overhead by up to 50%."
    },
    {
      category: 'security',
      q: "How does Medhastone protect sensitive user data and ensure zero-knowledge privacy?",
      a: "For applications like MediJourney and PDFZero, we implement zero-knowledge architectures. Documents and health records are processed strictly within the device's sandbox using WebAssembly and AES-256-GCM hardware encryption. No raw data, telemetry, or file contents are ever transmitted to third-party cloud analytics or unvetted servers."
    },
    {
      category: 'process',
      q: "How does your pricing model and delivery engagement work?",
      a: "We offer transparent milestone-based fixed contracts for clearly defined technical scopes, as well as agile dedicated engineering pods for evolving enterprise software. Each sprint includes automated integration testing, architecture documentation, and production build handovers."
    },
    {
      category: 'process',
      q: "What is your typical project delivery timeline from kickoff to app store launch?",
      a: "Standard enterprise mobile utilities typically ship in 6 to 12 weeks. High-throughput offline engines and custom WebGL hardware-accelerated interfaces range between 10 and 16 weeks, encompassing rigorous automated QA, end-to-end load testing, and complete Google Play / Apple App Store approval assistance."
    },
    {
      category: 'tech',
      q: "Can you integrate with our legacy enterprise databases and third-party APIs?",
      a: "Yes. We routinely architect high-resilience API adapters that interface with legacy SQL databases, SAP, Salesforce, custom GraphQL schemas, and WebSocket streaming servers, ensuring clean separation of concerns and deterministic local caching."
    }
  ];

  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter(f => {
      const matchesCat = faqCategory === 'all' || f.category === faqCategory;
      const matchesQuery = 
        f.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
        f.a.toLowerCase().includes(faqSearch.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [faqCategory, faqSearch]);

  return (
    <div className="w-full min-h-screen bg-[#07090e] text-slate-100 font-sans overflow-y-auto overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      
      {/* Top Professional Sticky Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <span className="font-black text-lg tracking-wider text-white">MEDHASTONE</span>
              <span className="block text-[9px] font-mono tracking-widest text-blue-400 uppercase -mt-0.5">SOFTWARE STUDIO</span>
            </div>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-300 tracking-wider uppercase">
            <a href="#lab" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <Zap size={13} className="text-blue-400" />
              <span>Architecture Lab</span>
            </a>
            <a href="#portfolio" className="hover:text-blue-400 transition-colors">Deployments</a>
            <a href="#estimator" className="hover:text-blue-400 transition-colors">Scope Estimator</a>
            <a href="#capabilities" className="hover:text-blue-400 transition-colors">Engineering</a>
            <a 
              href="/play-games" 
              onClick={(e) => { 
                e.preventDefault(); 
                playButton(); 
                window.history.pushState(null, '', '/play-games'); 
                window.dispatchEvent(new PopStateEvent('popstate')); 
              }} 
              className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <Play size={11} fill="currentColor" />
              <span>Games Hub</span>
            </a>
            <a href="#contact" className="px-5 py-2.5 rounded-full bg-white text-black font-extrabold hover:bg-slate-200 transition-all hover:scale-105 shadow-md shadow-white/10">
              Start a Project
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-[#0a0d15]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-5 text-sm font-bold text-slate-200 tracking-wider uppercase shadow-2xl">
            <a href="#lab" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <Zap size={16} className="text-blue-400" /> Architecture Lab
            </a>
            <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors">Deployments</a>
            <a href="#estimator" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors">Scope Estimator</a>
            <a href="#capabilities" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors">Engineering Pillars</a>
            <a 
              href="/play-games" 
              onClick={(e) => { 
                e.preventDefault(); 
                playButton(); 
                setIsMobileMenuOpen(false); 
                window.history.pushState(null, '', '/play-games'); 
                window.dispatchEvent(new PopStateEvent('popstate')); 
              }} 
              className="text-blue-400 flex items-center gap-2"
            >
              <Play size={14} fill="currentColor" /> WebGL & Canvas Games
            </a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 py-3 rounded-xl bg-blue-600 text-center text-white font-extrabold">
              Start Discovery Consultation
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden border-b border-white/5">
        {/* Optical Background Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
          
          {/* Top Status Capsule */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>OFFLINE-FIRST MOBILE SYSTEMS // RESILIENT WEB PLATFORMS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                  Resilient Offline-First
                </span> <br />
                Mobile & Web Software.
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
                Medhastone is an elite engineering studio architecting fault-tolerant mobile apps and high-throughput web systems. We specialize in zero-cloud dependency, local-first database sync, cross-platform Flutter compilation, and hardware-accelerated interfaces.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a 
                  href="#estimator" 
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center gap-3 transition-all text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-blue-600/25 hover:scale-[1.02] active:scale-95"
                >
                  <Sliders size={16} />
                  <span>Estimate Project Scope</span>
                </a>

                <a 
                  href="#portfolio" 
                  className="px-7 py-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Explore Deployments</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Authority Benchmarks Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">0 ms</div>
                  <div className="text-xs text-slate-400 font-medium">Offline Write Latency</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">120 FPS</div>
                  <div className="text-xs text-slate-400 font-medium">Native Hardware Target</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
                  <div className="text-xs text-slate-400 font-medium">Zero-Knowledge Privacy</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">4.9 ★</div>
                  <div className="text-xs text-slate-400 font-medium">Play Store Rating Avg</div>
                </div>
              </div>

            </div>

            {/* Right Live Visual Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[2.5rem] bg-gradient-to-b from-[#111626] to-[#0b0e18] border border-blue-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
                      MEDHASTONE RUNTIME HUD
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    STATUS: OPERATIONAL
                  </div>
                </div>

                <div className="space-y-3.5 mb-6 text-xs font-mono">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                        <Database size={16} />
                      </div>
                      <div>
                        <div className="text-white font-bold">Local-First Storage</div>
                        <div className="text-slate-400 text-[10px]">SQLite + IndexedDB WAL</div>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold font-mono text-[11px]">&lt; 1.5ms Commit</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                        <Cpu size={16} />
                      </div>
                      <div>
                        <div className="text-white font-bold">Graphics Pipeline</div>
                        <div className="text-slate-400 text-[10px]">Impeller & Skia Canvas</div>
                      </div>
                    </div>
                    <span className="text-purple-300 font-bold font-mono text-[11px]">16.6ms Render Budget</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                        <Shield size={16} />
                      </div>
                      <div>
                        <div className="text-white font-bold">Cryptographic Sandbox</div>
                        <div className="text-slate-400 text-[10px]">Client-Side WebAssembly</div>
                      </div>
                    </div>
                    <span className="text-amber-300 font-bold font-mono text-[11px]">Zero Cloud Leak</span>
                  </div>
                </div>

                {/* Quick Lab Anchor */}
                <a
                  href="#lab"
                  className="w-full py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Zap size={14} />
                  <span>Launch Live Architecture Lab</span>
                </a>

              </div>
            </div>

          </div>

        </div>
      </header>

      {/* Tech Ecosystem Trust Strip */}
      <section className="py-8 bg-white/[0.015] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 text-xs text-slate-400 font-bold tracking-widest uppercase">
            <span className="text-white flex items-center gap-2">
              <Sparkles size={14} className="text-blue-400" />
              PRODUCTION-TESTED CORE ECOSYSTEM:
            </span>
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 opacity-70 hover:opacity-100 transition-opacity">
              <span>Flutter / Dart</span>
              <span>•</span>
              <span>React / TypeScript</span>
              <span>•</span>
              <span>WebGL / Three.js</span>
              <span>•</span>
              <span>SQLite / Room</span>
              <span>•</span>
              <span>WebAssembly (Wasm)</span>
              <span>•</span>
              <span>Tailwind CSS</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FEATURE 1: Architecture Lab Simulator */}
      <section id="lab" className="py-24 border-b border-white/5 bg-gradient-to-b from-[#07090e] via-[#0d121f] to-[#07090e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              INTERACTIVE ARCHITECTURE LAB
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-4">
              Experience the Offline-First Difference
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Test how Medhastone's Local-First database architecture behaves compared to traditional cloud-only apps during real-world signal dropouts (underground parking, construction tunnels, rural travel).
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#101626] to-[#090d16] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
            
            {/* Control HUD */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono tracking-wider">Simulated Network Environment</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-3 h-3 rounded-full ${networkOnline ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`}></span>
                  <span className="text-base font-bold text-white">
                    {networkOnline ? 'Connected: 5G / High Bandwidth' : 'Disconnected: Zero Signal (Subway / Flight)'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleNetworkStatus}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 border transition-all ${
                    networkOnline 
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20' 
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  }`}
                >
                  {networkOnline ? <WifiOff size={15} /> : <Wifi size={15} />}
                  <span>{networkOnline ? 'Simulate Signal Cut' : 'Restore Connection'}</span>
                </button>

                <button
                  onClick={triggerSimulationWrite}
                  disabled={simIsRunning}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  <RefreshCw size={14} className={simIsRunning ? 'animate-spin' : ''} />
                  <span>Execute Data Write #{simStep + 1}</span>
                </button>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* Legacy Cloud App Side */}
              <div className={`p-6 rounded-2xl border transition-all ${
                networkOnline 
                  ? 'bg-white/[0.02] border-white/10' 
                  : 'bg-rose-950/20 border-rose-500/40'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Traditional Cloud App
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                    networkOnline ? 'bg-slate-800 text-slate-300' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {networkOnline ? 'HTTP POST' : 'REQUEST TIMEOUT'}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="text-slate-300">
                    {networkOnline ? (
                      <span className="text-slate-300">Latent round-trip to remote AWS cluster: ~290ms.</span>
                    ) : (
                      <div className="space-y-1.5 text-rose-300">
                        <div className="font-bold flex items-center gap-1.5">
                          <X size={16} /> 504 Gateway Timeout
                        </div>
                        <p className="text-xs text-rose-300/80">
                          UI locked behind blocking spinner. Worker loses inputs, cannot submit invoice or haziri.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Medhastone Local-First Engine Side */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/30 to-indigo-950/20 border border-blue-500/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Zap size={14} className="text-blue-400" />
                    Medhastone Offline-First
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    &lt; 1.5ms LOCAL COMMIT
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="text-slate-200">
                    {networkOnline ? (
                      <span>Instant on-device write to SQLite/IndexedDB. Background sync queued and dispatched seamlessly.</span>
                    ) : (
                      <div className="space-y-1 text-emerald-300">
                        <div className="font-bold flex items-center gap-1.5">
                          <Check size={16} /> 100% Zero-Loss Resilience
                        </div>
                        <p className="text-xs text-slate-300">
                          Data written to encrypted local disk immediately. App runs at continuous 120 FPS. Automatically reconciles with cloud upon reconnect.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Event Console Log */}
            <div className="rounded-2xl bg-black/50 border border-white/10 p-4 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-white/10 pb-2 mb-2 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Terminal size={12} /> Real-Time Engine Event Log
                </span>
                <span>SYSTEM ACTIVE</span>
              </div>
              <div className="space-y-1">
                {simLog.map((line, idx) => (
                  <div key={idx} className="leading-relaxed opacity-90">
                    <span className="text-blue-400 mr-2">&gt;</span>
                    {line}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Flagship Production Deployments (Search & Filterable) */}
      <section id="portfolio" className="py-28 max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              PROVEN IN PRODUCTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
              Featured Deployments
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Commercial-grade mobile applications and digital platforms engineered for extreme durability, zero-knowledge privacy, and responsive UX.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:bg-white/10 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Deployments (6)' },
            { id: 'utility', label: 'Vehicle & Mobility' },
            { id: 'workforce', label: 'Workforce & Civil' },
            { id: 'gaming', label: 'Cognitive & Games' },
            { id: 'health', label: 'Health & Privacy' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playButton();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <article 
              key={item.id}
              className={`rounded-[2rem] bg-gradient-to-br ${item.gradient} border border-white/10 p-8 flex flex-col justify-between group ${item.borderHover} transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <img 
                    src={item.image} 
                    alt={`${item.title} App Icon`} 
                    className="w-16 h-16 rounded-2xl object-cover shadow-2xl ring-1 ring-white/15" 
                  />
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5 text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">
                    {item.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded-md bg-black/40 text-[10px] font-mono text-slate-300 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400 font-medium">
                  {item.metrics}
                </span>

                <a
                  href={`/${item.id}`}
                  onClick={(e) => navigateToProject(e, item.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-blue-300 uppercase tracking-wider group-hover:translate-x-1 transition-all"
                >
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredPortfolio.length === 0 && (
          <div className="text-center py-16 bg-white/[0.02] rounded-3xl border border-white/5">
            <p className="text-slate-400 text-sm">No applications found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs text-blue-400 font-bold uppercase tracking-wider hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* INTERACTIVE FEATURE 2: Project Scope & Architecture Estimator */}
      <section id="estimator" className="py-24 border-y border-white/5 bg-gradient-to-b from-[#07090e] via-[#0e121e] to-[#07090e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              INTERACTIVE PROJECT ESTIMATOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-4">
              Configure Your Technical Architecture
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Select your product parameters below to receive an immediate architectural blueprint, engineering timeline, and recommended technology stack.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#121626] to-[#090d18] rounded-3xl border border-white/10 p-6 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Config Controls */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* 1. Platform */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-3">
                    1. Target Platform Architecture
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'mobile', label: 'Mobile Native', sub: 'Android & iOS' },
                      { id: 'web', label: 'Enterprise Web', sub: 'React / Next' },
                      { id: 'cross', label: 'Unified All', sub: 'Cross-Platform' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { playButton(); setCalcPlatform(p.id as any); }}
                        className={`p-3 rounded-2xl text-left border transition-all ${
                          calcPlatform === p.id 
                            ? 'bg-blue-600/20 border-blue-400 text-white shadow-md' 
                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-xs font-bold">{p.label}</div>
                        <div className="text-[10px] text-slate-400">{p.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Sync Model */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-3">
                    2. Data Persistence & Synchronization Model
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'strict', label: '100% Offline', sub: 'Zero-Cloud Vault' },
                      { id: 'hybrid', label: 'Hybrid Sync', sub: 'CRDT Delta Sync' },
                      { id: 'cloud', label: 'Cloud-Native', sub: 'REST / GraphQL' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { playButton(); setCalcOffline(s.id as any); }}
                        className={`p-3 rounded-2xl text-left border transition-all ${
                          calcOffline === s.id 
                            ? 'bg-blue-600/20 border-blue-400 text-white shadow-md' 
                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-xs font-bold">{s.label}</div>
                        <div className="text-[10px] text-slate-400">{s.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Advanced Modules */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-3">
                    3. Specialized Functional Modules
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { id: 'auth', label: 'Encrypted Local Auth & Passkeys' },
                      { id: 'storage', label: 'SQLite / IndexedDB Local Engine' },
                      { id: 'geo', label: 'GPS / Geofencing & Sensors' },
                      { id: 'wasm', label: 'WebAssembly Document Processing' },
                      { id: 'voice', label: 'Regional Multi-Lingual Speech/TTS' },
                      { id: 'analytics', label: 'Privacy-Compliant Telemetry' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => toggleCalcModule(m.id)}
                        className={`p-3 rounded-xl text-left border text-xs font-medium flex items-center gap-2.5 transition-all ${
                          calcModules.includes(m.id)
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border ${
                          calcModules.includes(m.id) ? 'bg-emerald-500 text-black border-emerald-400 font-bold' : 'border-white/20'
                        }`}>
                          {calcModules.includes(m.id) ? '✓' : ''}
                        </div>
                        <span className="truncate">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Output Blueprint Box */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#181d33] to-[#0d1222] rounded-2xl border border-blue-500/30 p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="text-xs font-mono uppercase tracking-widest text-blue-300 text-center font-bold">
                  RECOMMENDED ARCHITECTURE BLUEPRINT
                </div>

                <div className="space-y-4">
                  <div className="bg-black/40 rounded-xl p-4 border border-white/10 space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Recommended Stack:</div>
                    <div className="text-sm font-bold text-white font-mono">{calculatedEstimate.architecture}</div>
                  </div>

                  <div className="bg-black/40 rounded-xl p-4 border border-white/10 space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Estimated Development Window:</div>
                    <div className="text-2xl font-black text-cyan-400 font-mono">{calculatedEstimate.weeks}</div>
                  </div>

                  <div className="bg-black/40 rounded-xl p-4 border border-white/10 space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Included SLA & Support:</div>
                    <div className="text-xs font-bold text-slate-300">{calculatedEstimate.slaSupport}</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={prefillInquiry}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-98"
                  >
                    <span>Prefill Inquiry with This Spec</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  Includes initial technical discovery, architectural review, milestone demo builds, and Google Play / App Store submission support.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Core Engineering Capabilities (High SEO / Technical Authority) */}
      <section id="capabilities" className="py-28 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            SYSTEM ARCHITECTURE & STANDARDS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-4">
            Core Engineering Pillars
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            We don't build disposable prototypes. We engineer resilient software systems designed for zero latency, data durability, and hardware optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-8 rounded-[2rem] bg-[#0c101d] border border-white/10 hover:border-blue-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <WifiOff size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Offline-First Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              SQLite, Room, and Drift architectures with Write-Ahead Logging (WAL). Optimistic local mutations with conflict-free background reconciliation.
            </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-[#0c101d] border border-white/10 hover:border-indigo-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Smartphone size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Cross-Platform Flutter</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Single-codebase native compilation for Android and iOS using Dart. 120 FPS Impeller graphics rendering with zero JavaScript-bridge performance hits.
            </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-[#0c101d] border border-white/10 hover:border-cyan-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Monitor size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Hardware-Accelerated WebGL</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Custom WebGL shaders, Three.js spatial simulations, and HTML5 Canvas physics engines optimized for 60 FPS in standard browser tabs.
            </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-[#0c101d] border border-white/10 hover:border-emerald-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Lock size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Zero-Knowledge Security</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Client-side WebAssembly computation and AES-256 local disk encryption ensuring personal files and medical records never touch remote cloud servers.
            </p>
          </div>

        </div>
      </section>

      {/* Client Success Stories */}
      <section className="py-24 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              COMMERCIAL VALIDATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-3">
              Client & Contractor Testimonials
            </h2>
            <p className="text-slate-400 text-sm">
              Real-world feedback from founders, product directors, and site supervisors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-[2rem] bg-[#0c101c] border border-white/10 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "Medhastone rebuilt our mobile operations app with an offline-first architecture. Our field technicians can now log complex inspections in remote subterranean sites with zero network drops. Truly world-class engineering."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
                  AR
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Aman Rajput</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">CTO, TechGrow Solutions</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-[#0c101c] border border-white/10 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "Developing across Android and iOS with Flutter cut our time-to-market in half. The animations, UI responsiveness, and offline state management are buttery smooth at 120 FPS."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-white text-xs">
                  SG
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Sneha Gupta</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">VP Product, ElevateX</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-[#0c101c] border border-white/10 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "The RojgarBahi implementation solved daily labour wage disputes across our construction projects. Having 14 Indian languages and QR code offline passbook sync works flawlessly on dusty job sites."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                  RV
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Rajesh Verma</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Managing Partner, Verma Infra</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FEATURE 3: Searchable FAQ Accordion */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            TECHNICAL DISCOVERY FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know about our engineering standards, offline syncing, and delivery cycles.
          </p>
        </div>

        {/* FAQ Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'tech', label: 'Tech Stack' },
              { id: 'security', label: 'Privacy & Security' },
              { id: 'process', label: 'Delivery & Pricing' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { playButton(); setFaqCategory(tab.id); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  faqCategory === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-60">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter FAQs..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => {
            const isOpen = expandedFaq === i;
            return (
              <div 
                key={i} 
                className="rounded-2xl bg-[#0c101c] border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => {
                    playButton();
                    setExpandedFaq(isOpen ? null : i);
                  }}
                  className="w-full flex items-center justify-between p-6 cursor-pointer font-bold text-white text-left text-sm sm:text-base hover:bg-white/[0.02] transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-blue-500/20 text-blue-400' : 'text-slate-400'}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-300 leading-relaxed text-sm border-t border-white/5 pt-4 bg-white/[0.01]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* High-Converting Contact & Project Proposal Section */}
      <section id="contact" className="py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-blue-950/40 via-[#0d1222] to-indigo-950/30 rounded-[3rem] border border-blue-500/30 p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 shadow-2xl">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/30">
              DISCOVERY & PROPOSALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Start Your Technical Discovery
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Have an enterprise app, offline-first tool, or WebGL platform in mind? Speak directly with our lead architects. We sign NDAs before discovery and deliver actionable proposals within 48 hours.
            </p>

            <div className="space-y-6 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-mono">DIRECT INBOX</div>
                  <a href="mailto:medhastone@gmail.com" className="text-white font-bold text-sm hover:underline">
                    medhastone@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-mono">RESPONSE SLA</div>
                  <div className="text-white font-bold text-sm">Under 24 Hours Guaranteed</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#07090e] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
            <form 
              className="space-y-5" 
              action="https://formsubmit.co/medhastone@gmail.com" 
              method="POST"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New Project Inquiry from Medhastone Studio!" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="e.g. David Miller"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-colors" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Work Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="david@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-colors" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Type</label>
                  <select 
                    name="project_type" 
                    className="w-full bg-[#0a0d16] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="Offline-First Mobile App">Offline-First Mobile App (Flutter)</option>
                    <option value="Enterprise Web Application">Enterprise Web Application</option>
                    <option value="WebGL / Hardware 3D Canvas">WebGL / Hardware 3D Canvas</option>
                    <option value="Architecture Audit & Consulting">Architecture Audit & Consulting</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Launch Window</label>
                  <select 
                    name="timeline" 
                    className="w-full bg-[#0a0d16] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="Immediate (Next 4-8 Weeks)">Immediate (Next 4-8 Weeks)</option>
                    <option value="Q3/Q4 Milestone (8-16 Weeks)">Q3/Q4 Milestone (8-16 Weeks)</option>
                    <option value="Exploratory Architecture Review">Exploratory Architecture Review</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Overview & Requirements</label>
                <textarea 
                  name="message" 
                  required 
                  rows={4} 
                  placeholder="Outline your application goals, offline requirements, or existing tech stack..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-colors resize-none font-sans"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 text-xs uppercase tracking-wider hover:scale-[1.01]"
              >
                <span>Send Technical Inquiry</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#05060a] pt-20 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/25">
                  M
                </div>
                <span className="font-black text-xl tracking-wider text-white">MEDHASTONE</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-lg font-normal">
                Medhastone is a specialized software engineering studio focused on developing high-performance, cross-platform mobile applications and immersive WebGL experiences. We combine rigorous technical architecture with deterministic offline data durability to deliver enterprise-grade digital products.
              </p>
              <div className="text-xs text-slate-500 font-mono">
                FLAGSHIP DEPLOYMENTS: PARKDOCK • ROJGARBAHI • BRAINMAZE • MEDIJOURNEY • PDFZERO • LEXIBRAIN
              </div>
            </div>

            <div className="md:col-span-5 flex flex-wrap justify-start md:justify-end gap-12">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-mono">PLATFORMS</div>
                <div className="space-y-2.5 text-xs font-semibold">
                  <div>
                    <a href="https://play.google.com/store/apps/developer?id=Medhastone" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                      <Play size={12} fill="currentColor" /> Google Play
                    </a>
                  </div>
                  <div>
                    <a href="/play-games" onClick={(e) => { e.preventDefault(); playButton(); window.history.pushState(null, '', '/play-games'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="text-slate-400 hover:text-white transition-colors">
                      WebGL Games Hub
                    </a>
                  </div>
                  <div>
                    <a href="mailto:medhastone@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                      medhastone@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest"
                >
                  <ArrowUp size={14} /> Back to top
                </button>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
            <div>© 2026 MEDHASTONE APP STUDIO. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="/parkdock/privacy-policy" className="hover:text-slate-300 transition-colors">PRIVACY POLICIES</a>
              <a href="#contact" className="hover:text-slate-300 transition-colors">SECURITY AUDITS</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
