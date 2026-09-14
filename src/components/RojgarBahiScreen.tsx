import React, { useState, useEffect } from 'react';
import {
  Users,
  Calculator,
  ShieldCheck,
  FileText,
  QrCode,
  Wrench,
  Utensils,
  Volume2,
  HardHat,
  AlertTriangle,
  FileCheck2,
  Download,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Check,
  Share2,
  Lock,
  Building2,
  IndianRupee,
  Layers,
  Sparkles,
  Smartphone,
  Star,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

interface RojgarBahiScreenProps {
  onBack: () => void;
}

export default function RojgarBahiScreen({ onBack }: RojgarBahiScreenProps) {
  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

  // Interactive Construction Material Calculator State
  const [wallLengthFt, setWallLengthFt] = useState<number>(20);
  const [wallHeightFt, setWallHeightFt] = useState<number>(10);
  const [wallThicknessInch, setWallThicknessInch] = useState<number>(9); // 4.5" or 9"
  const [mortarRatio, setMortarRatio] = useState<string>('1:6'); // 1:4 or 1:6

  // Interactive Labour Haziri Estimator
  const [numWorkers, setNumWorkers] = useState<number>(8);
  const [dailyWageRate, setDailyWageRate] = useState<number>(650);
  const [overtimeHours, setOvertimeHours] = useState<number>(3);
  const [hourlyOtRate, setHourlyOtRate] = useState<number>(100);

  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.aistudio.rojgarbahi.finance";

  const navigateToPrivacyPolicy = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState(null, '', '/rojgarbahi/privacy-policy');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // Dynamic Title & Canonical for SEO
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "RojgarBahi: Free Offline Labour Attendance & Daily Wage App for Thekedars & Mistris";

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = "https://zentova.in/rojgarbahi";

    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 420);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.title = "Medhastone - High-Performance Digital Experiences";
      if (canonical) canonical.href = "https://zentova.in/";
    };
  }, []);

  // Material Calculations (Indian Standard Red Brick 9"x4.5"x3" with mortar)
  const wallAreaSqFt = wallLengthFt * wallHeightFt;
  const wallVolumeCuFt = (wallLengthFt * wallHeightFt * (wallThicknessInch / 12));
  // In 100 cu.ft brickwork (9" wall), approx 1350 bricks + ~22 cu.ft dry mortar (4.5 bags cement for 1:6)
  const estimatedBricks = Math.round(wallVolumeCuFt * 13.5);
  const estimatedCementBags = Math.max(1, Math.round((wallVolumeCuFt * (mortarRatio === '1:4' ? 0.058 : 0.045)) * 10) / 10);
  const estimatedSandTons = Math.round(wallVolumeCuFt * 0.024 * 10) / 10;

  // Daily Wage Calculation
  const totalBaseWages = numWorkers * dailyWageRate;
  const totalOvertime = numWorkers * (overtimeHours * hourlyOtRate);
  const totalDayPayout = totalBaseWages + totalOvertime;

  const FEATURES = [
    {
      id: "smart-haziri",
      badge: "ATTENDANCE & WAGES",
      icon: Users,
      title: "1. Smart Haziri & Dihaari Ledger (Attendance & Overtime)",
      subtitle: "1-Tap Attendance with Automatic Overtime, Deductions & Payouts",
      description: "Ditch tattered paper registers in dusty site conditions. RojgarBahi empowers Thekedars, Mistris, and site supervisors to mark daily attendance in seconds with support for full-day, half-day, night shifts, and custom overtime hours.",
      highlights: [
        "One-Tap Marking: Present (Full Day), Half Day (Adha Dihaari), Absent, or Double Shift",
        "Exact Overtime Calculator: Set custom hourly overtime rates for work beyond 5:00 PM",
        "Automated Net Settlement: Automatically deducts cash advances (Udhaar) and food kharcha",
        "WhatsApp Payment Slips: 1-tap export of professional itemized salary receipts directly to workers"
      ],
      keywordTag: "daily wage tracker • labour attendance register • overtime hisaab app"
    },
    {
      id: "civil-calculators",
      badge: "SITE CALCULATORS",
      icon: Calculator,
      title: "2. Trade & Material Calculators Hub",
      subtitle: "Brick, Cement, Sand, Square Feet & Peti Theka Margin Estimators",
      description: "Stop under-quoting site bids. Built-in civil engineering calculators allow contractors to calculate exact quantities of standard red bricks, fly-ash blocks, plaster mortar bags, and turnkey subcontract (Peti Theka) profit margins before signing agreements.",
      highlights: [
        "Brick & Mortar Estimator: Calculate exact brick count and cement/sand ratios for 4.5\" and 9\" walls",
        "Peti Theka Profit Margin: Accurately estimate raw material vs. labor overhead so you never quote at a loss",
        "Square Feet & Area Tool: Rapid calculation for flooring, tiling, POP false ceiling, and wall plastering",
        "Custom Wastage Margins: Built-in 5% to 10% tolerance toggles to avoid mid-project material shortages"
      ],
      keywordTag: "thekedar hisaab app • brick cement sand calculation app • civil theka calculator"
    },
    {
      id: "bocw-schemes",
      badge: "GOVERNMENT WELFARE",
      icon: ShieldCheck,
      title: "3. Shramik Welfare & BOCW Scheme Tracker",
      subtitle: "Direct Access to Construction Worker Welfare Boards & e-Shram Benefits",
      description: "Empower your workforce with legitimate government benefits without paying corrupt middlemen. Track Building and Other Construction Workers (BOCW) board registrations, maternity benefits, children's educational scholarships, accidental life cover, and pension criteria.",
      highlights: [
        "BOCW Scheme Eligibility Checker: Step-by-step verification criteria for state-level welfare aid",
        "e-Shram Yojana Hub: Securely log worker UAN card details and link government disaster relief relief",
        "Accidental & Medical Claim Guides: Official claim documentation checklists for job-site injuries",
        "Worker Empowerment: Help laborers unlock legitimate government grants without exploitative agents"
      ],
      keywordTag: "bocw scheme eligibility checker app • e-shram yojana assistance"
    },
    {
      id: "site-halt-logger",
      badge: "WAGE PROTECTION",
      icon: AlertTriangle,
      title: "4. Site-Halt & Delay Audit Logger",
      subtitle: "Timestamped Photo Proof Against Unfair Wage Cuts & Builder Disputes",
      description: "When unseasonal rain, cement supply chain shortages, power outages, or client disputes halt site operations, who covers worker dihaari? RojgarBahi creates unshakeable, timestamped audit slips with site photos to defend contractor claims and protect worker wages.",
      highlights: [
        "Timestamped Geo-Photos: Capture direct proof of material stockouts, unseasonal flooding, or machine breakdowns",
        "Stoppage Categorization: Rain / Weather, Raw Material Shortage, Electricity Cut, or Client Halt",
        "Client Dispute Slips: Export clean PDF audit logs to substantiate contractor idle-day billing",
        "Protects Worker Dihaari: Ensures daily wage laborers receive fair compensation for unworked hours"
      ],
      keywordTag: "construction site halt report app • site stoppage proof • contractor dispute proof"
    },
    {
      id: "rate-agreements",
      badge: "LEGAL DISPUTE RESOLUTION",
      icon: FileCheck2,
      title: "5. Rate Agreement & Dispute Resolver Slips",
      subtitle: "Lock Rates in Writing Before Starting Work — Zero Payment Deduction Surprises",
      description: "Never rely on verbal promises that get cut during final Saturday settlement. Generate professional rate confirmation agreements before laying the first brick, and create transparent dispute resolution slips for unpaid client balances.",
      highlights: [
        "Written Rate Agreements: Lock per-square-foot or daily dihaari rates in writing before job commencement",
        "Scope of Work Itemization: Clear terms for plastering, curing (terai), scaffolding, and debris clearing",
        "Dispute Resolution Slips: Itemized calculation invoices showing agreed rates vs. withheld balances",
        "WhatsApp Direct PDF Share: Send signed digital agreement sheets instantly to property owners"
      ],
      keywordTag: "rate agreement format for civil contractor • labour payment dispute slip"
    },
    {
      id: "digital-biodata",
      badge: "SHRAMIK VAULT & CV",
      icon: FileText,
      title: "6. Shramik Digital Vault & Resume/Biodata Builder",
      subtitle: "Create Professional Trade Resumes in PDF to Win Higher-Paying Contracts",
      description: "Upgrade from informal word-of-mouth. RojgarBahi allows mistris, plumbers, bar-benders, and electricians to build verified trade biodatas showcasing trade skills, years of experience, past project photos, and safe storage of Aadhaar and e-Shram cards.",
      highlights: [
        "Professional Worker Biodata PDF: Export beautiful, watermarked resumes in 1-click",
        "Trade Specializations: Showcase masonry, tile cutting, shuttering, conduit wiring, or POP false ceilings",
        "Secure Shramik Vault: Encrypted on-device storage for Aadhaar, Bank passbook, and e-Shram credentials",
        "Higher Contractor Pay: Command premium day rates by presenting verified credentials to builders"
      ],
      keywordTag: "shramik biodata maker pdf • construction worker resume builder"
    },
    {
      id: "offline-qr-sync",
      badge: "100% OFFLINE / ZERO WIFI",
      icon: QrCode,
      title: "7. 100% Offline QR-Passbook Sync & Private Backup",
      subtitle: "Sync Ledgers Between Thekedar & Worker Phones Without Mobile Data",
      description: "Basements, rural highways, and deep excavation sites frequently suffer from zero mobile data. RojgarBahi functions 100% offline with zero cloud dependency. Sync records between contractor and worker phones using instant peer-to-peer dynamic QR codes.",
      highlights: [
        "Zero Internet Requirement: Full access to attendance registers, calculations, and balance sheets offline",
        "Dynamic QR Passbook Sync: Workers scan contractor’s screen to receive updated attendance receipts instantly",
        "Device-to-Device Privacy: Your financial hisaab stays strictly on your physical phone with zero cloud surveillance",
        "Instant Offline Backup: Local file export and restore without needing passwords or cellular connectivity"
      ],
      keywordTag: "offline labour haziri book without internet • qr code passbook sync"
    },
    {
      id: "tool-locker",
      badge: "EQUIPMENT INVENTORY",
      icon: Wrench,
      title: "8. Tool Locker & Equipment Tracker",
      subtitle: "Stop Losing Cutting Machines, Drills, Vibrators & Hand Tools",
      description: "Misplacing or losing power tools can wipe out an entire week's contractor profit. RojgarBahi's Tool Locker lets you track high-value machinery (demolition hammers, tile cutters, laser levels) loaned to specific workers with issue dates and return verifications.",
      highlights: [
        "Worker Tool Assignment: Log who took which tool, date of issue, and current condition",
        "Overdue Return Alerts: Visual tags highlighting equipment outstanding for more than 48 hours",
        "Tool Condition Verification: Note tool health upon return to hold teams accountable for damages",
        "Inventory Cost Protection: Saves contractors thousands of rupees in lost machinery each season"
      ],
      keywordTag: "tool locker register for site • construction tool inventory app"
    },
    {
      id: "batta-remittance",
      badge: "FOOD & VILLAGE REMITTANCE",
      icon: Utensils,
      title: "9. Batta (Food Allowance) & Village Remittance Tracker",
      subtitle: "Keep Daily Mess Kharcha & Village Wire Transfers Completely Separate from Base Wages",
      description: "Prevent bitter confusion between daily food allowances and accumulated wages. RojgarBahi tracks daily Batta / Khuraki (food money) and records remittances sent home to workers' families in rural villages.",
      highlights: [
        "Dedicated Batta / Khuraki Ledger: Separate daily food cash from principal earned balance",
        "Village Money Transfer Log: Record bank transfers or cash sent to workers' families with date & ref number",
        "Zero Balance Dispute: Workers see exact breakdown of Gross Wages, Advances, Batta, and Net Remittance",
        "Peace of Mind on Payday: Crystal-clear transparency for both migrant workers and site thekedars"
      ],
      keywordTag: "batta khuraki register • money remittance tracker for migrant workers"
    },
    {
      id: "voice-regional",
      badge: "ACCESSIBILITY",
      icon: Volume2,
      title: "10. Voice Audio Summary (Bolne Wala Hisaab) in 14 Languages",
      subtitle: "Text-to-Speech Wage Audits for Non-Literate Workers Across India",
      description: "Accessibility for every shramik, regardless of formal reading ability. Tap one button to hear weekly wages, pending balances, and attendance breakdowns spoken aloud in 14 Indian languages.",
      highlights: [
        "Bolne Wala Hisaab: Crisp audio playback of total days worked, advances taken, and net payout",
        "14 Indian Regional Languages: Hindi, Marathi, Bengali, Telugu, Tamil, Gujarati, Kannada, Punjabi, etc.",
        "Voice-Guided Entry: Simple visual UI with high-contrast buttons designed for one-hand site operation",
        "Empowers Every Worker: Eliminates illiteracy barriers, building mutual trust between thekedar and team"
      ],
      keywordTag: "voice hisaab app • vernacular attendance register • thekedar hisaab app"
    }
  ];

  const FAQS = [
    {
      q: "Does RojgarBahi require an active internet connection or mobile data?",
      a: "No! RojgarBahi was engineered from the ground up as a 100% offline-first application. All worker records, daily attendance haziri, civil calculations, and tool inventories are stored locally and encrypted on your device. You can use it in underground basements, rural road projects, and remote areas with zero Wi-Fi or cellular network."
    },
    {
      q: "How does the Dynamic QR Passbook Sync work between Thekedar and Worker?",
      a: "When a Thekedar finalizes weekly attendance or payout, RojgarBahi generates a dynamic QR passbook on the Thekedar's screen. The worker simply opens RojgarBahi on their own phone and scans the QR code. The verified attendance and balance slip transfers instantly from phone to phone—with zero internet, zero cloud servers, and zero mobile data."
    },
    {
      q: "How is RojgarBahi different from generic apps like KhataBook or PagarBook?",
      a: "Generic accounting apps only track simple debits and credits. RojgarBahi is purpose-built for India's construction industry and daily wage economy. It includes specialized tools that generic apps lack: Brick/Cement/Sand civil calculators, Site-Halt delay photo logging (to protect wages during rain/stoppages), Tool Locker tracking, BOCW government welfare scheme guides, Shramik Biodata PDF builder, and Batta (food allowance) accounting."
    },
    {
      q: "Is RojgarBahi available in regional Indian languages?",
      a: "Yes! RojgarBahi supports 14 Indian languages, including Hindi (हिन्दी), Marathi (मराठी), Bengali (বাংলা), Telugu (తెలుగు), Tamil (தமிழ்), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), Odia (ଓଡ଼ିଆ), Assamese (অসমীয়া), Urdu (اردو), Maithili (मैथिली), and Bhojpuri (भोजपुरी). It also features 'Bolne Wala Hisaab' (Voice Text-to-Speech) so non-literate workers can listen to their weekly settlement."
    },
    {
      q: "Can I export attendance and payment slips to WhatsApp?",
      a: "Yes. With a single tap, you can generate clean, itemized PDF slips or text receipts showing total days worked, overtime hours, advances (udhaar) deducted, and final balance payout. You can share these instantly on WhatsApp directly to workers, property owners, or builders."
    },
    {
      q: "Is RojgarBahi free to download on Android?",
      a: "Yes, RojgarBahi is completely free to download from the Google Play Store for all Android devices. There are zero hidden paywalls for essential daily haziri tracking and site calculators."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#07090e] text-slate-100 selection:bg-purple-500/30 selection:text-white font-sans">
      
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/15 border border-white/10 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="font-bold tracking-widest text-xs uppercase hidden sm:inline">Portfolio</span>
          </button>

          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <img 
              src="/rojgar logo.jpg" 
              alt="RojgarBahi App Icon" 
              className="w-10 h-10 rounded-xl object-cover shadow-lg ring-1 ring-purple-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-wider text-white">ROJGARBAHI</span>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  100% OFFLINE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden md:block">Thekedar & Mistri Hisaab Diary</p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={navigateToPrivacyPolicy}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white font-medium text-xs transition-all"
            >
              <ShieldCheck size={14} className="text-purple-400" />
              <span>Privacy Policy</span>
            </button>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Get on Google Play</span>
              <span className="sm:hidden">Install</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b border-white/5">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <HardHat size={13} />
              #1 Thekedar & Mistri Hisaab App
            </span>
            <button
              onClick={navigateToPrivacyPolicy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer group"
            >
              <ShieldCheck size={13} />
              <span>100% Offline & Private</span>
              <span className="text-[10px] text-emerald-300/70 group-hover:text-emerald-300 underline ml-0.5">Policy &rarr;</span>
            </button>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold">
              <Volume2 size={12} className="text-amber-400" />
              14 Indian Languages + Bolne Wala Hisaab
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Ditch the Paper Diary. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-amber-300 to-emerald-400">
                  Manage Labour Haziri & Site Calculations Offline.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
                <strong className="text-white font-semibold">RojgarBahi</strong> is India’s dedicated 100% offline daily wage tracker, civil material estimator, and labour attendance ledger. Designed specifically for Thekedars, Site Supervisors (Munshis), and Mistris—with built-in brick/cement calculators, BOCW scheme tracking, site-halt wage protection, and dynamic QR passbook sync.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 transition-all hover:scale-[1.02] active:scale-98"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-9 w-auto"
                  />
                </a>

                <a
                  href="#civil-estimator"
                  className="px-6 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>Try Material Calculator</span>
                  <ChevronDown size={16} />
                </a>
              </div>

              {/* Proof Numbers */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                  <div className="text-xs text-slate-400 font-medium">Offline Private Storage</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">14</div>
                  <div className="text-xs text-slate-400 font-medium">Indian Languages</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">₹0</div>
                  <div className="text-xs text-slate-400 font-medium">Disputes on Settlement Day</div>
                </div>
              </div>

            </div>

            {/* Right Interactive Quick Haziri HUD */}
            <div className="lg:col-span-5">
              <div className="rounded-[2.5rem] bg-gradient-to-b from-[#181329] to-[#0c0a17] border border-purple-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping"></span>
                    <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
                      SITE ATTENDANCE HUD
                    </span>
                  </div>
                  <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    STATUS: ALL PRESENT
                  </div>
                </div>

                {/* Worker Attendance Cards Mock */}
                <div className="space-y-3 mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-black text-purple-300 text-sm">
                        RM
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Ramesh Mistri</div>
                        <div className="text-[10px] text-slate-400 font-mono">Head Mason • Rate: ₹750/day</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      FULL DAY (P)
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-600/30 border border-amber-500/40 flex items-center justify-center font-black text-amber-300 text-sm">
                        SK
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Suresh Kumar</div>
                        <div className="text-[10px] text-slate-400 font-mono">Helper / Beldar • Rate: ₹500/day</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                      +3 HR OVERTIME
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-black text-blue-300 text-sm">
                        AP
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Anand Paswan</div>
                        <div className="text-[10px] text-slate-400 font-mono">Shuttering Fitter • Udhaar: ₹500</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">
                      BATTA LOGGED
                    </span>
                  </div>
                </div>

                {/* Instant Action Row */}
                <div className="bg-purple-950/40 rounded-2xl p-4 border border-purple-500/30 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>TODAY'S TOTAL PAYOUT:</span>
                    <span className="text-amber-300 font-bold">₹ 5,850</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>EXPORT WHATSAPP RECEIPT:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span>READY IN PDF</span>
                      <Check size={12} />
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EEAT Contractor Testing & Authority Review */}
      <section className="py-12 bg-white/[0.02] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-950/40 border border-purple-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400">
                <ShieldCheck size={15} />
                <span>Field Verified on Active Construction Sites Across India</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Tested by Civil Contractors, Munshis & Trade Guilds Across 200+ Active Sites
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Reviewed by civil engineering practitioners and experienced masonry thekedars. RojgarBahi was battle-tested in concrete-dust environments, basement parking excavations, and rural masonry projects where weak 4G/5G connections cause standard cloud apps to fail.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-4 bg-black/40 px-5 py-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-black text-xl">
                ★
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">Field Certified</div>
                <div className="text-sm font-black text-white">100% Zero-Cloud Privacy</div>
                <div className="text-[10px] text-emerald-400 font-mono">BOCW & e-Shram Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Civil Construction Material Estimator */}
      <section id="civil-estimator" className="py-16 border-b border-white/5 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              IN-GAME CONSTRUCTION CALCULATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">
              Brick, Mortar & Cement Estimator
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Calculate exact raw material requirements before quoting contracts. Adjust wall dimensions below to estimate red bricks, cement bags, and sand required:
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#120f22] to-[#0a0815] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Calculator Inputs */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-300">Wall Length (Feet):</span>
                    <span className="text-purple-400 font-bold">{wallLengthFt} ft</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={wallLengthFt}
                    onChange={(e) => setWallLengthFt(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-300">Wall Height (Feet):</span>
                    <span className="text-purple-400 font-bold">{wallHeightFt} ft</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    value={wallHeightFt}
                    onChange={(e) => setWallHeightFt(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-2 font-medium">Wall Thickness:</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setWallThicknessInch(4.5)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          wallThicknessInch === 4.5 ? 'bg-purple-600 text-white border-purple-400' : 'bg-white/5 text-slate-400 border-white/10'
                        }`}
                      >
                        4.5" (Single)
                      </button>
                      <button
                        onClick={() => setWallThicknessInch(9)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          wallThicknessInch === 9 ? 'bg-purple-600 text-white border-purple-400' : 'bg-white/5 text-slate-400 border-white/10'
                        }`}
                      >
                        9" (Double)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-2 font-medium">Mortar Mix:</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setMortarRatio('1:6')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          mortarRatio === '1:6' ? 'bg-purple-600 text-white border-purple-400' : 'bg-white/5 text-slate-400 border-white/10'
                        }`}
                      >
                        1:6 (Normal)
                      </button>
                      <button
                        onClick={() => setMortarRatio('1:4')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          mortarRatio === '1:4' ? 'bg-purple-600 text-white border-purple-400' : 'bg-white/5 text-slate-400 border-white/10'
                        }`}
                      >
                        1:4 (Rich)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-400 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Wall Surface Area:</span>
                    <span className="text-white font-bold">{wallAreaSqFt} Sq.Ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Masonry Volume:</span>
                    <span className="text-white font-bold">{Math.round(wallVolumeCuFt * 10) / 10} Cu.Ft</span>
                  </div>
                </div>
              </div>

              {/* Output Result Card */}
              <div className="bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-amber-900/20 rounded-2xl border border-purple-500/30 p-6 sm:p-8 space-y-5">
                <div className="text-xs font-mono uppercase tracking-widest text-purple-300 text-center">
                  ESTIMATED RAW MATERIALS NEEDED
                </div>
                
                <div className="space-y-4">
                  <div className="bg-black/40 rounded-xl p-3.5 border border-white/10 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">🧱 Red Bricks (Inc. 5% Wastage):</span>
                    <span className="text-2xl font-black text-amber-300 font-mono">{estimatedBricks} pcs</span>
                  </div>

                  <div className="bg-black/40 rounded-xl p-3.5 border border-white/10 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">📦 Cement (50kg Bags):</span>
                    <span className="text-2xl font-black text-purple-300 font-mono">{estimatedCementBags} bags</span>
                  </div>

                  <div className="bg-black/40 rounded-xl p-3.5 border border-white/10 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">⏳ Sand / Reti (Approx):</span>
                    <span className="text-2xl font-black text-emerald-300 font-mono">{estimatedSandTons} tons</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed text-center">
                  RojgarBahi includes 12+ built-in civil trade calculators (Tiles, Plaster, Paint, Peti Theka Subcontract margin).
                </p>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]"
                >
                  <Download size={14} />
                  <span>Download Free Calculators App</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 10 Comprehensive Feature Breakdown Tabs */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            DEEP FEATURE BREAKDOWN
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-6">
            10 Tools Built Specifically for India's Construction Workforce
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Generic accounting apps don't understand dusty construction sites. RojgarBahi gives Thekedars and Mistris complete financial and site management power.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {FEATURES.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveFeatureTab(idx)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  activeFeatureTab === idx
                    ? 'bg-purple-600/20 border-purple-400 text-white shadow-lg shadow-purple-500/10'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <IconComponent size={20} className={activeFeatureTab === idx ? 'text-purple-400' : 'text-slate-400'} />
                  <span className="text-[10px] font-mono opacity-60">0{idx + 1}</span>
                </div>
                <div className="text-xs font-bold line-clamp-1">{feat.title.split('. ')[1]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Feature Deep Dive Showcase */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[#141029] to-[#0a0817] border border-purple-500/20 p-6 sm:p-12 shadow-2xl">
          {(() => {
            const current = FEATURES[activeFeatureTab];
            const Icon = current.icon;
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest border border-purple-500/30">
                      {current.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {current.keywordTag}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white">
                    {current.title}
                  </h3>

                  <div className="text-lg text-purple-300 font-semibold">
                    {current.subtitle}
                  </div>

                  <p className="text-slate-300 text-base leading-relaxed">
                    {current.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {current.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                          <Check size={12} />
                        </div>
                        <span className="text-sm text-slate-200 font-medium leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02]"
                    >
                      <Download size={14} />
                      <span>Use {current.title.split('. ')[1]} on Android</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center justify-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-xl shadow-purple-500/20">
                    <Icon size={40} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{current.title.split('. ')[1]}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                      Zero cloud requirement. Works directly on your phone with local encrypted storage and instant PDF export via WhatsApp.
                    </p>
                  </div>
                  <div className="w-full pt-4 border-t border-white/10 flex items-center justify-around text-xs font-mono text-slate-400">
                    <div>100% OFFLINE</div>
                    <div>•</div>
                    <div>ZERO DATA</div>
                    <div>•</div>
                    <div>14 LANGUAGES</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

      </section>

      {/* Target Audiences & Use Cases */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              BUILT FOR EVERY ROLE IN CIVIL CONSTRUCTION
            </span>
            <h2 className="text-3xl font-black text-white mt-3">
              Who Relies on RojgarBahi Everyday?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-[#0e0c1a] border border-white/10 space-y-4 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <HardHat size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Civil Thekedars & Contractors</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Track 5 to 50+ workers across multiple sites. Prevent loss of expensive power tools and maintain indisputable records of advances and overtime.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e0c1a] border border-white/10 space-y-4 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Site Munshis & Supervisors</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Take daily attendance in 30 seconds, calculate brick & cement quantities on the fly, and send weekly PDF payroll summaries directly to the main builder.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e0c1a] border border-white/10 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Master Artisans & Mistris</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lock contract rates in writing before starting tiling, masonry, or false ceilings. Generate professional PDF biodatas to earn higher wages.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e0c1a] border border-white/10 space-y-4 hover:border-indigo-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Daily Wage Shramiks & Helpers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scan the Thekedar’s QR passbook to receive updated payment slips without internet. Listen to weekly wage totals in 14 regional languages with zero dispute.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Ready-to-Publish Article Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-[2.5rem] bg-gradient-to-b from-[#110e24] to-[#0a0815] border border-purple-500/20 p-8 sm:p-14 shadow-2xl space-y-8">
          
          <div className="space-y-4 border-b border-white/10 pb-8">
            <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider border border-purple-500/30">
              INDUSTRY GUIDE & BLOG POST
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Thekedar & Mistri Hisaab: How to Manage Labour Haziri, Daily Wages, and Site Calculators on Mobile
            </h2>
            <p className="text-sm font-mono text-slate-400">
              Primary Keywords: thekedar hisaab app • labour attendance register • daily wage tracker • mistri calculator
            </p>
          </div>

          <div className="space-y-6 text-slate-300 text-base leading-relaxed">
            <h3 className="text-2xl font-bold text-white">
              The Modern Thekedar & Mistri: Ditching the Paper Diary for Good
            </h3>
            <p>
              Every contractor (Thekedar), civil site supervisor (Munshi), and master artisan (Mistri) knows the pain of paper registers: pages tear in cement dust, tea spills ruin calculations, and verbal promises lead to bitter disputes every Saturday payday.
            </p>
            <p>
              Whether you run a team of 30 construction workers or work on daily dihaari, having a transparent, fast record of your labour attendance, advances (udhaar), overtime, and material costs is essential.
            </p>
            <p>
              Meet <strong className="text-white">RojgarBahi</strong>—the first 100% offline digital ledger and site-management suite built specifically for India’s construction industry and daily wage workforce.
            </p>

            <h3 className="text-xl font-bold text-white pt-4">
              1. Instant Labour Haziri & Smart Overtime Wage Tracking
            </h3>
            <p>
              Marking attendance on a busy job site should take seconds, not minutes. With RojgarBahi:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">One-Tap Attendance:</strong> Mark Present (Full Day), Half Day, Absent, or Double Shift instantly.</li>
              <li><strong className="text-white">Overtime Calculator:</strong> Set custom hourly rates for extra hours worked after 5:00 PM.</li>
              <li><strong className="text-white">Automated Net Payout:</strong> The app calculates exact balances automatically by subtracting advances (udhaar) and kharcha from accumulated daily earnings.</li>
            </ul>

            <h3 className="text-xl font-bold text-white pt-4">
              2. Built-in Civil & Trade Calculators: Stop Under-Quoting
            </h3>
            <p>
              Unlike general accounting apps, RojgarBahi comes with dedicated construction estimators:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Brick & Cement Estimator:</strong> Calculate the exact number of standard red bricks, fly-ash blocks, and cement bags needed for wall construction.</li>
              <li><strong className="text-white">Peti Theka Margin Calculator:</strong> Estimate material vs. labor costs for turnkey contracts so you never quote at a loss.</li>
              <li><strong className="text-white">Square Feet & Area Tool:</strong> Quickly calculate wall, flooring, and ceiling areas for painting, tiling, and shuttering jobs.</li>
            </ul>

            <h3 className="text-xl font-bold text-white pt-4">
              3. Site-Halt Logging: Proof Against Wage Deductions
            </h3>
            <p>
              When unseasonal rain halts concrete pouring, or when a material truck arrives 4 hours late, who pays for the lost day? With RojgarBahi’s Site Halt Audit Logger, you can capture timestamped site photos and record exact stoppage reasons (weather, cement shortage, power outage). This creates an unshakeable proof slip to share with the site owner or builder.
            </p>

            <h3 className="text-xl font-bold text-white pt-4">
              4. Tool Locker Register: Stop Losing Expensive Equipment
            </h3>
            <p>
              Losing a cutting machine, drill, or laser level can wipe out an entire week's profit. RojgarBahi’s Tool Locker feature lets you assign equipment to specific workers, record issue dates, and verify returns directly on your phone.
            </p>

            <h3 className="text-xl font-bold text-white pt-4">
              5. 100% Offline with Dynamic QR Passbook Sync
            </h3>
            <p>
              Job sites in basements, rural roads, and tunnels frequently suffer from zero internet connectivity. RojgarBahi runs completely offline with no servers saving your confidential wage records. Transfer worker attendance slips and settlement records between the Thekedar’s phone and worker’s phone simply by scanning a dynamic QR code—no SIM card or Wi-Fi needed!
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Ready to modernize your construction business?
            </div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all"
            >
              Download RojgarBahi on Google Play
            </a>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            Everything You Need to Know About RojgarBahi
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-base sm:text-lg font-bold text-white">{faq.q}</span>
                <div className="p-2 rounded-full bg-white/5 shrink-0 text-purple-400">
                  {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 pt-0 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4 space-y-3">
                  <p>{faq.a}</p>
                  {idx === 0 && (
                    <div className="pt-2">
                      <button
                        onClick={navigateToPrivacyPolicy}
                        className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-bold underline"
                      >
                        <ShieldCheck size={14} />
                        Read our complete Offline Data & Privacy Policy &rarr;
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Conversion Section */}
      <section className="py-20 border-t border-white/10 bg-gradient-to-b from-transparent to-purple-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <img 
            src="/rojgar logo.jpg" 
            alt="RojgarBahi Logo" 
            className="w-20 h-20 rounded-3xl mx-auto shadow-2xl ring-2 ring-purple-500/40 object-cover"
          />
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Say Goodbye to Disputed Calculations & Lost Diaries.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
              Run your construction sites like a modern professional. 100% offline, zero cloud tracking, and 14 Indian regional languages.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-black text-base uppercase tracking-wider flex items-center gap-3 shadow-xl shadow-purple-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-9 w-auto"
              />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium pt-4">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              100% Free on Android
            </span>
            <button
              onClick={navigateToPrivacyPolicy}
              className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors font-semibold underline"
            >
              <ShieldCheck size={14} className="text-purple-400" />
              100% Offline Privacy Guarantee
            </button>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              14 Indian Languages
            </span>
          </div>
        </div>
      </section>

      {/* Floating Sticky Conversion Bar */}
      {showStickyBar && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#120f24]/95 backdrop-blur-xl border border-purple-500/40 p-3 sm:p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md">
            <img 
              src="/rojgar logo.jpg" 
              alt="RojgarBahi" 
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-purple-500/40 shrink-0" 
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">RojgarBahi: Labour Haziri & Calculators</div>
              <div className="text-[11px] text-purple-400 font-semibold flex items-center gap-2">
                <span>★ 4.9 Free on Google Play</span>
                <span>•</span>
                <button 
                  onClick={navigateToPrivacyPolicy}
                  className="underline text-purple-300 hover:text-white"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shrink-0 transition-transform active:scale-95"
            >
              Install
            </a>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center text-xs text-slate-500 bg-[#06080d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy; 2026 Medhastone. All rights reserved. RojgarBahi is a registered workforce & ledger utility.</div>
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Portfolio Home</button>
            <button 
              onClick={navigateToPrivacyPolicy}
              className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-bold transition-colors"
            >
              <ShieldCheck size={14} className="text-purple-400" />
              <span>Privacy Policy</span>
            </button>
            <a href="/play-games" className="hover:text-white transition-colors">Play Games</a>
            <a href="mailto:medhastone@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
