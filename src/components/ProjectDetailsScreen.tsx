import { 
  ArrowLeft, CheckCircle2, Layout, Database, Shield, 
  Activity, Navigation, Brain, Briefcase, FileLock2, 
  Layers, Code2, ArrowRight, Play
} from 'lucide-react';
import React, { useEffect } from 'react';

export default function ProjectDetailsScreen({ id, onBack }: { id: string, onBack: () => void }) {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const projects: Record<string, any> = {
    medijourney: {
      title: "Medi Journey",
      category: "Health & Wellness",
      heroText: "A comprehensive, offline-first health tracking application.",
      image: "/medi.jpg",
      description: "A highly secure, offline-first personal medical assistant designed to track vitals, medications, and health timelines with Gemini AI integration.",
      overview: "MediJourney is a highly comprehensive, offline-first health and wellness tracking application. Built on the philosophy that your medical data belongs to you, it features robust medical management, smart medication tracking with drug interaction checkers, and extensive vitals logging—all without exposing sensitive data to the cloud.",
      challenge: "Managing complex health data—from medication schedules and potential drug interactions to specialized dietary tracking (like the DIP diet)—is overwhelming. Existing solutions often lack comprehensive integration, compromising user privacy by forcing cloud syncs or failing to aggregate data from native systems like Android Health Connect.",
      solution: "We engineered a massive, well-structured application featuring an offline-first Room Database architecture with an OfflineSyncWorker. The app includes Gemini AI integration for smart health insights, a secure Document Vault, Health Connect synchronization, and a modern glassmorphism UI—delivering a premium, private, and engaging medical assistant.",
      techStack: ["Room Database", "Health Connect", "Gemini AI API", "Google Drive Sync"],
      deliverables: ["Offline-First Architecture", "AI Integration (Gemini)", "Health Connect Sync", "Premium UI/UX Design"],
      metrics: [
        { label: "Data Privacy", value: "100%", sub: "Offline-first with local DB" },
        { label: "Features", value: "8+", sub: "Massive interconnected modules" },
        { label: "Design", value: "Modern", glassmorphism: "Smooth animations" }
      ],
      features: [
        "Smart Medication Tracker & Drug Interaction Checker",
        "Comprehensive Vitals, Sleep, Activity & Symptom Tracking",
        "Specialized DIP Diet Tracker & Meal Logging",
        "Gemini AI-Powered Health Assistant & Smart Analytics",
        "Secure Document Vault & PDF Doctor Exports",
        "Health Connect Integration & Google Drive Backup",
        "Gamified Health Quizzes, Streaks & Daily Tips",
        "Offline-First Architecture with Room Database & Worker Queue"
      ],
      color: "teal",
      icon: Activity,
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.medijourney"
    },
    parkdock: {
      title: "ParkDock",
      category: "Utility & Automotive",
      heroText: "The ultimate co-pilot for your daily commute and vehicle management.",
      image: "/parkdock.jpg",
      description: "Your everyday driver companion - Smart vehicle management, parking tools, calculators, and a driving dashboard.",
      overview: "ParkDock is a unified utility suite designed for daily drivers, automotive enthusiasts, and fleet managers. It consolidates parking management, vehicle maintenance logs, and trip calculators into one sleek, high-performance interface.",
      challenge: "Drivers frequently juggle multiple disjointed apps for parking timers, mileage tracking, and maintenance logs. Remembering where you parked in a massive lot or calculating the precise fuel cost of a road trip requires manual effort and fragmented tools.",
      solution: "We unified the driving experience into a single, cohesive dashboard. ParkDock allows users to drop precise GPS pins for parking, set expiration timers to avoid tickets, log fuel efficiency, and track maintenance schedules. Built for on-the-go usage, the interface features large touch targets and high-contrast typography for quick glances.",
      techStack: ["React", "Geolocation API", "IndexedDB", "Framer Motion"],
      deliverables: ["Product Strategy", "UX/UI Design", "PWA Development", "Motion Design"],
      metrics: [
        { label: "Load Time", value: "< 1s", sub: "Instant app launch" },
        { label: "GPS Precision", value: "High", sub: "Accurate pin drops" },
        { label: "Storage", value: "Local", sub: "No account required" }
      ],
      features: [
        "Offline Maps & Precision Parking Pin Drops",
        "Vehicle Maintenance Logging & Service Alerts",
        "Smart Parking Timer with Expiration Reminders",
        "Driving Dashboard with Speed & Heading",
        "Fuel Efficiency & Trip Cost Calculators",
        "Multi-Vehicle Garage Management"
      ],
      color: "blue",
      icon: Navigation,
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.aistudio.parkdock.a1b2c3d4e5"
    },
    brainmaze: {
      title: "Brain Maze Master",
      category: "Puzzle & Cognitive Game",
      heroText: "Elevating cognitive training through beautiful, gamified puzzles.",
      image: "/brainmaze.jpg",
      description: "Gamified cognitive puzzle experience featuring custom 2D geometric silhouettes and fluid kinetic animations.",
      overview: "Brain Maze Master is not just a game; it is a cognitive training tool disguised as an engaging puzzle experience. It challenges users with spatial reasoning, memory tests, and logic puzzles within a highly polished, aesthetic environment.",
      challenge: "Many brain-training apps feel too clinical or lack engaging gameplay loops, resulting in high drop-off rates after the first few days of use. Users need a reason to return beyond just 'improving their brain'.",
      solution: "We designed Brain Maze Master with a highly polished, gamified aesthetic. By incorporating fluid kinetic animations, satisfying haptic-style feedback, and a progressive difficulty curve, we created an experience that feels rewarding and keeps users coming back for daily mental workouts.",
      techStack: ["HTML5 Canvas", "WebGL", "Howler.js", "React Engine"],
      deliverables: ["Game Design", "Physics Engine", "Audio Engineering", "Level Design"],
      metrics: [
        { label: "Frame Rate", value: "60 FPS", sub: "Silky smooth animations" },
        { label: "Levels", value: "100+", sub: "Progressive difficulty" },
        { label: "Engagement", value: "High", sub: "Daily active retention" }
      ],
      features: [
        "Custom 2D Geometric Silhouette Puzzles",
        "Fluid Kinetic Animations & Satisfying Physics",
        "Daily Cognitive Training Challenges",
        "Adaptive Level Progression & Difficulty",
        "Detailed Performance Analytics & Stats",
        "Immersive Audio Design & Soundscapes"
      ],
      color: "indigo",
      icon: Brain,
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.brainmaze.master"
    },
    rojgarbahi: {
      title: "RojgarBahi",
      category: "Finance & Utility",
      heroText: "Digitizing the traditional ledger for the modern workforce.",
      image: "/rojgar logo.jpg",
      description: "Robust business utility for workforce management and high-frequency daily ledger tracking tailored for small businesses.",
      overview: "RojgarBahi is a specialized financial ledger designed for contractors, small business owners, and daily wage managers. It streamlines the complex task of tracking attendance, cash advances, and daily payouts in sectors that traditionally rely on paper.",
      challenge: "Unorganized sectors and small contractors heavily rely on paper ledgers ('Bahi Khata'), leading to calculation errors, disputes, and lost data. They needed a digital solution that was as fast as writing on paper but packed with modern computation.",
      solution: "We digitized the traditional ledger into a robust, mobile-friendly web application. RojgarBahi handles high-frequency daily entries, automates wage calculations based on attendance and overtime, and generates transparent digital receipts that can be instantly shared via WhatsApp.",
      techStack: ["TypeScript", "React", "Local Storage", "PDF-lib"],
      deliverables: ["B2B SaaS Design", "Workflow Automation", "Frontend Development", "Localization"],
      metrics: [
        { label: "Calculations", value: "Auto", sub: "Zero manual math" },
        { label: "Export", value: "PDF", sub: "Instant WhatsApp sharing" },
        { label: "Latency", value: "Zero", sub: "Works in low-network areas" }
      ],
      features: [
        "High-Frequency Daily Ledger Tracking",
        "Workforce Attendance & Overtime Management",
        "Advance Payment & Loan Tracking",
        "Automated Wage & Balance Calculations",
        "One-Click Data Export & PDF Reporting",
        "Multi-Language Support (English/Hindi)"
      ],
      color: "purple",
      icon: Briefcase,
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.aistudio.rojgarbahi.finance"
    },
    pdfzero: {
      title: "PDFZero",
      category: "Utility & Privacy",
      heroText: "Military-grade PDF processing, directly in your browser.",
      image: "/pdfzero.jpg",
      description: "Zero-knowledge, privacy-focused PDF utility. All processing executes locally on device without server uploads.",
      overview: "PDFZero is a powerful suite of PDF tools that operates completely in your browser. Unlike traditional online PDF editors, PDFZero never uploads your sensitive documents to a server, ensuring your private data stays private.",
      challenge: "Users frequently need to merge, split, or compress PDFs, but online tools pose a massive security risk by requiring users to upload confidential documents (like contracts or financial statements) to unknown cloud servers.",
      solution: "We leveraged WebAssembly (WASM) and modern browser APIs to process PDFs entirely client-side. With PDFZero, the user's files never leave their device. This 'zero-knowledge' architecture guarantees absolute privacy while delivering lightning-fast processing speeds that outperform cloud-based alternatives.",
      techStack: ["WebAssembly", "PDF.js", "React", "Web Workers"],
      deliverables: ["WASM Integration", "UI/UX Design", "Performance Optimization", "Security Architecture"],
      metrics: [
        { label: "Server Uploads", value: "0", sub: "Total privacy guaranteed" },
        { label: "Processing", value: "Client", sub: "Uses local CPU power" },
        { label: "Speed", value: "Instant", sub: "No upload/download wait" }
      ],
      features: [
        "Zero-Knowledge Processing (No Server Uploads)",
        "Merge, Split, and Reorder PDF Pages",
        "Local Execution for Instant Processing",
        "Absolute Privacy & Security Guarantee",
        "Compress PDF Sizes Client-Side",
        "Add Watermarks & Passwords Locally"
      ],
      color: "rose",
      icon: FileLock2,
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.pdfzero"
    }
  };

  const project = projects[id];

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white">Project not found.</div>
      </div>
    );
  }

  const bgGradients: Record<string, string> = {
    teal: "from-teal-950/40 to-slate-900 border-teal-500/20",
    blue: "from-blue-950/40 to-slate-900 border-blue-500/20",
    indigo: "from-indigo-950/40 to-slate-900 border-indigo-500/20",
    purple: "from-purple-950/40 to-slate-900 border-purple-500/20",
    rose: "from-rose-950/40 to-slate-900 border-rose-500/20"
  };

  const textColors: Record<string, string> = {
    teal: "text-teal-400",
    blue: "text-blue-400",
    indigo: "text-indigo-400",
    purple: "text-purple-400",
    rose: "text-rose-400"
  };

  const bgColors: Record<string, string> = {
    teal: "bg-teal-500/10",
    blue: "bg-blue-500/10",
    indigo: "bg-indigo-500/10",
    purple: "bg-purple-500/10",
    rose: "bg-rose-500/10"
  };

  const ProjectIcon = project.icon;

  return (
    <div className="w-full min-h-screen bg-[#0a0a0f] text-white overflow-y-auto selection:bg-white/20">
      
      {/* Dynamic Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/15 border border-white/5 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="font-bold tracking-widest text-[11px] uppercase">Back to Portfolio</span>
          </button>
          
          <div className="hidden md:flex items-center gap-3">
            <span className="text-white/40 text-[11px] font-bold uppercase tracking-widest">Case Study</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className={`text-[11px] font-bold uppercase tracking-widest ${textColors[project.color]}`}>{project.title}</span>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-32">
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 ${bgColors[project.color]} ${textColors[project.color]} text-[10px] font-bold uppercase tracking-widest`}>
                <ProjectIcon size={14} />
                {project.category}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
                {project.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-medium max-w-2xl">
                {project.heroText}
              </p>

              {project.playStoreUrl && (
                <div className="pt-6">
                  <a 
                    href={project.playStoreUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block transition-transform hover:scale-105 active:scale-95"
                  >
                    <img 
                      alt="Get it on Google Play" 
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                      className="h-14 md:h-16 object-contain"
                    />
                  </a>
                </div>
              )}
            </div>

            {/* Right Image/Logo Reveal */}
            <div className="w-full lg:w-1/3 shrink-0 flex justify-center lg:justify-end">
              <div className={`relative w-48 h-48 md:w-64 md:h-64 rounded-[3rem] p-2 bg-gradient-to-br ${bgGradients[project.color]} shadow-2xl`}>
                <div className="absolute inset-0 bg-white/5 rounded-[3rem] backdrop-blur-3xl"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="relative z-10 w-full h-full rounded-[2.5rem] object-cover shadow-2xl ring-1 ring-white/10" 
                />
              </div>
            </div>
            
          </div>
        </div>

        {/* Impact Metrics Bento Grid */}
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.metrics.map((metric: any, idx: number) => (
              <div key={idx} className={`p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-colors`}>
                <div className={`text-sm font-bold ${textColors[project.color]} uppercase tracking-widest mb-2`}>{metric.label}</div>
                <div className="text-4xl font-black text-white mb-1 tracking-tight">{metric.value}</div>
                <div className="text-white/40 text-sm font-medium">{metric.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout (Story + Tech) */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: The Story (Scrolling) */}
            <div className="lg:col-span-8 space-y-20">
              
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-2xl ${bgColors[project.color]} border border-white/5`}>
                    <Layout className={textColors[project.color]} size={24} />
                  </div>
                  <h2 className="text-3xl font-bold">Project Overview</h2>
                </div>
                <p className="text-white/60 leading-relaxed text-lg md:text-xl font-medium">
                  {project.overview}
                </p>
              </section>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-2xl ${bgColors[project.color]} border border-white/5`}>
                    <Database className={textColors[project.color]} size={24} />
                  </div>
                  <h2 className="text-3xl font-bold">The Challenge</h2>
                </div>
                <p className="text-white/60 leading-relaxed text-lg md:text-xl font-medium">
                  {project.challenge}
                </p>
              </section>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-2xl ${bgColors[project.color]} border border-white/5`}>
                    <Shield className={textColors[project.color]} size={24} />
                  </div>
                  <h2 className="text-3xl font-bold">The Solution</h2>
                </div>
                <p className="text-white/60 leading-relaxed text-lg md:text-xl font-medium">
                  {project.solution}
                </p>
              </section>
              
            </div>

            {/* Right Column: Details Sidebar (Sticky) */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
              
              {/* Deliverables */}
              <div className="p-8 rounded-[2rem] bg-[#111116] border border-white/5">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <Layers className={textColors[project.color]} size={20} />
                  Deliverables
                </h3>
                <ul className="space-y-3">
                  {project.deliverables.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-white/70 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Highlights */}
              <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#111116] to-[#0a0a0f] border border-white/5">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <Code2 className={textColors[project.color]} size={20} />
                  Key Features
                </h3>
                <ul className="space-y-4">
                  {project.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className={`shrink-0 mt-0.5 ${textColors[project.color]}`} size={18} />
                      <span className="text-white/70 text-sm leading-relaxed font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA */}
              <a 
                href="#contact"
                className={`w-full py-5 rounded-[1.5rem] bg-gradient-to-r ${bgGradients[project.color]} flex justify-center items-center gap-2 group hover:brightness-110 transition-all border border-white/10`}
              >
                <span className="font-bold tracking-wide">Request Similar Project</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Privacy Policy Link */}
              <div className="text-center pt-2">
                <a 
                  href={`#${id}/privacy-policy`}
                  className="text-white/40 hover:text-white/80 text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Privacy Policy
                </a>
              </div>

            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
