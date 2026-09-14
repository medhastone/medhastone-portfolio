import React, { useState, useEffect, useRef } from 'react';
import {
  Navigation,
  Compass,
  ShieldCheck,
  Clock,
  Car,
  FileText,
  DollarSign,
  Wrench,
  Award,
  Download,
  ExternalLink,
  Star,
  CheckCircle2,
  MapPin,
  Camera,
  Layers,
  Lock,
  TrendingUp,
  Gauge,
  Zap,
  ChevronDown,
  ChevronUp,
  QrCode,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Smartphone,
  Flame
} from 'lucide-react';

interface ParkDockScreenProps {
  onBack: () => void;
}

export default function ParkDockScreen({ onBack }: ParkDockScreenProps) {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedVehicle, setSelectedVehicle] = useState<'car' | 'bike' | 'ev' | 'truck'>('car');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  // Interactive Simulator States
  const [radarBearing, setRadarBearing] = useState(38);
  const [meterMinutes, setMeterMinutes] = useState(45);
  const [monthlyParkingTimes, setMonthlyParkingTimes] = useState(12);
  const [averageTicketCost, setAverageTicketCost] = useState(35);

  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.aistudio.parkdock.a1b2c3d4e5";

  // Navigation to dedicated Privacy Policy
  const navigateToPrivacyPolicy = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState(null, '', '/parkdock/privacy-policy');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // Dynamic Page Title & Canonical for SEO
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "ParkDock: Ultimate Smart Parking, Car Locator & Digital Glovebox App for Android";
    
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = "https://zentova.in/parkdock";

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

  // Radar simulator rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarBearing(prev => (prev + 1) % 360);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Calculated annual fine & fuel savings
  const annualFinesSaved = Math.round(monthlyParkingTimes * 0.15 * averageTicketCost * 12);
  const annualFuelSaved = Math.round(monthlyParkingTimes * 1.8 * 12); // in minutes & wasted idle gas

  const FEATURES = [
    {
      id: "parking-memory",
      badge: "CORE LOCATOR",
      icon: MapPin,
      title: "1. One-Tap Smart Parking Memory",
      subtitle: "Instant GPS Pinning & Indoor Floor/Slot Tagging",
      description: "Drop pinpoint GPS coordinates in outdoor open lots, or capture multi-level indoor structural details with custom floor levels, pillar IDs, and photo tags.",
      highlights: [
        "High-Precision GPS capture with accuracy radius indicator",
        "Multi-Level Garage Tagging: Building Name, Floor (P1/P2/B1), Pillar/Bay/Slot #",
        "Photo Attachment: Snap parking pillar numbers, floor color cues, or ticket stubs",
        "Multi-Vehicle Selector: Tag specifically as Sedan, SUV, Motorcycle, or EV"
      ],
      keywordTag: "Smart parking app • Offline multi-level car locator"
    },
    {
      id: "return-navigation",
      badge: "LIVE RADAR HUD",
      icon: Compass,
      title: "2. Live 'Find My Car' & Return Navigation",
      subtitle: "Real-Time Directional Compass & Breadcrumb Retracer",
      description: "Follow a live dynamic compass heading and distance radar straight back to your car, or launch integrated OpenStreetMap pedestrian walking navigation.",
      highlights: [
        "Real-Time Dynamic Radar with continuous bearing & distance updates",
        "Pedestrian walking directions via OpenStreetMap (OSM) routing",
        "Breadcrumb Path Tracker: Retrace your exact walking path inside airport hubs",
        "Full-Screen Photo Zoom to inspect pillar signs with a single tap"
      ],
      keywordTag: "Find my parked car • Car locator android • Pedestrian compass"
    },
    {
      id: "meter-timer",
      badge: "PENALTY SHIELD",
      icon: Clock,
      title: "3. Parking Meter Timer & Fine-Saver Alerts",
      subtitle: "Proactive Expiry Notifications & Saved-Money Metrics",
      description: "Never suffer an unexpected parking violation or tow fee. Set smart countdown timers with multi-stage audio and notification warnings.",
      highlights: [
        "Pre-expiry notifications at 15m, 10m, and 5m intervals",
        "Live elapsed time vs. remaining time status ticker",
        "Saved-Money Dashboard: Log avoided violations and track total penalties saved",
        "One-tap timer extension when paying remotely"
      ],
      keywordTag: "Parking meter timer app • Parking fine saver • Meter alert"
    },
    {
      id: "garage-management",
      badge: "FLEET & GARAGE",
      icon: Car,
      title: "4. 'My Vehicles' Garage & Fleet Manager",
      subtitle: "Multi-Vehicle Profiles, Specs & Filtering",
      description: "Manage your personal family fleet or commercial vehicles in one organized hub. Keep track of license plates, nicknames, and vehicle histories.",
      highlights: [
        "Supports multiple cars, motorbikes, scooters, vans, and commercial trucks",
        "Store registration/VIN, fuel type (Petrol, Diesel, EV, Hybrid), and color tags",
        "Vehicle-specific parking history and service records",
        "Instant toggle when parking different vehicles across the day"
      ],
      keywordTag: "Vehicle garage manager • Multi car tracker • Fleet organizer"
    },
    {
      id: "document-vault",
      badge: "ZERO-KNOWLEDGE VAULT",
      icon: Lock,
      title: "5. Encrypted Digital Glovebox (Document Vault)",
      subtitle: "On-Device Paper Vault & Biometric Lock",
      description: "Keep your critical vehicle documents securely stored on-device with zero cloud exposure, protected by biometric Fingerprint/Face unlock.",
      highlights: [
        "Store Driver's License, RC Book / Title, Insurance Policy & PUC / Inspection",
        "Automatic expiration date alerts before insurance or registration lapses",
        "Local AES-256 encrypted storage: zero server telemetry, 100% private",
        "Biometric App Lock via Android BiometricPrompt (Fingerprint or PIN)"
      ],
      keywordTag: "Digital vehicle glovebox • Encrypted RC book storage • Insurance reminder"
    },
    {
      id: "expense-analytics",
      badge: "EXPENSE & MILEAGE",
      icon: DollarSign,
      title: "6. Driver Expense & Fuel Analytics",
      subtitle: "Cost-Per-Kilometer & Monthly Operating Reports",
      description: "Uncover the true cost of owning and driving your vehicle. Log fuel refuels, parking fees, highway tolls, routine servicing, and insurance costs.",
      highlights: [
        "Real-time Cost-Per-Kilometer / Cost-Per-Mile calculation",
        "Interactive monthly expense breakdown charts by category",
        "Fuel efficiency and real-world mileage analytics",
        "Export clean PDF / CSV expense reports for tax deductions or reimbursements"
      ],
      keywordTag: "Driver expense tracker • Fuel mileage calculator android • Vehicle cost logger"
    },
    {
      id: "pro-utilities",
      badge: "PRO DRIVER SUITE",
      icon: Wrench,
      title: "7. Pro Driver Utilities & Calculators",
      subtitle: "Offline Maps, Tyre Lifespan & Axle Weight Calculator",
      description: "Specialized tools tailored for both daily highway commuters and commercial haulers who need offline reliability and precision calculations.",
      highlights: [
        "Offline Map Caching: Navigate parking basements with zero cellular reception",
        "Tyre Lifespan & Health Tracker: Mileage wear indicators & rotation alerts",
        "Indian Truck & Axle Weight Calculator: Verify GVW & overload legal limits",
        "In-app QR & Barcode scanner for parking validation tickets and receipts"
      ],
      keywordTag: "Offline parking map • Truck axle weight calculator • Tyre health tracker"
    },
    {
      id: "gamification",
      badge: "STREAKS & ACHIEVEMENTS",
      icon: Award,
      title: "8. Streaks, Gamification & Custom UI Themes",
      subtitle: "Timely Return Badges & Cyber Dark Mode",
      description: "Transform daily driving habits into a rewarding game. Maintain streaks for on-time parking returns, unlock driver badges, and customize your HUD.",
      highlights: [
        "Timely Return Streaks: Build daily discipline and earn safe-driver ranks",
        "Driver Milestone Badges: 'Master Navigator', 'Meter Guardian', 'Zero Penalty'",
        "Custom Theme Store: AMOLED Cyber Dark, High-Contrast Light & Neon HUD",
        "Lightweight, battery-friendly interface designed for rapid glanceability"
      ],
      keywordTag: "Driver gamification • Parking habit tracker • Cyber driving HUD"
    }
  ];

  const FAQS = [
    {
      q: "How does ParkDock find my car if I am parked in an underground basement with no GPS or cellular signal?",
      a: "ParkDock is purpose-built for GPS-denied environments like basement parking lots (B1, B2, P3) and multi-level airport terminals. In addition to pinning your last-known GPS coordinates at the entrance, ParkDock enables one-tap indoor tagging: record the building name, exact floor level, pillar code (e.g., Pillar C-14), and snap an instant photo of nearby markers or ticket stubs. Furthermore, ParkDock's built-in offline map caching and step-by-step breadcrumb tracking operate 100% locally without requiring internet access."
    },
    {
      q: "Is my vehicle information and document vault stored safely? Does ParkDock track my location?",
      a: "Your privacy is absolute. ParkDock strictly adheres to a zero-telemetry, zero-cloud architecture. All GPS coordinates, vehicle registration details, driving expenses, and document images (Driver's License, RC Book, Insurance) are encrypted and stored locally on your physical device using AES-256 standards. ParkDock does not upload, sell, or analyze your location data. Additionally, you can protect the app with your device's biometric fingerprint or PIN lock."
    },
    {
      q: "How does the Parking Meter Timer prevent expensive parking fines and tow fees?",
      a: "When you park in a metered bay or time-restricted zone, simply enter the allowed parking duration or expiry time. ParkDock sets a high-priority background countdown timer that sends proactive notification alerts before your time runs out (customizable at 15-minute, 10-minute, and 5-minute intervals). The app also displays a real-time 'Fines Avoided' metric to celebrate every dollar saved."
    },
    {
      q: "Can I manage multiple vehicles such as a family car, a motorcycle, and an EV?",
      a: "Yes! ParkDock's 'My Vehicles' Garage allows unlimited vehicle profiles. You can add sedans, SUVs, motorcycles, scooters, commercial trucks, or electric vehicles (EVs). Each vehicle maintains its own nickname, license plate number, fuel/power type, parking history, and maintenance log."
    },
    {
      q: "What makes ParkDock better than standard Google Maps parking pins?",
      a: "Google Maps only drops an approximate outdoor satellite pin, which frequently fails in multi-level garages, cannot store floor or pillar numbers, lacks photo attachment references, cannot store vehicle documents, has no fuel or expense calculations, and offers no parking meter timers or tyre health monitors. ParkDock is a dedicated, comprehensive automotive utility suite designed specifically for drivers."
    },
    {
      q: "Is ParkDock free to download on Android?",
      a: "Yes, ParkDock is available on Google Play. It features an ad-free, fast, and battery-efficient experience with core features available offline right out of the box."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#07090e] text-slate-100 selection:bg-blue-500/30 selection:text-white font-sans">
      
      {/* Top Navigation Bar */}
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
              src="/parkdock.jpg" 
              alt="ParkDock App Icon" 
              className="w-10 h-10 rounded-xl object-cover shadow-lg ring-1 ring-blue-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-wider text-white">PARKDOCK</span>
                <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden md:block">Smart Parking & Driver Utility</p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={navigateToPrivacyPolicy}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-white font-medium text-xs transition-all"
            >
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Privacy Policy</span>
            </button>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-[1.02] active:scale-95"
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Trust & Category Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              #1 All-in-One Driver Utility
            </span>
            <button
              onClick={navigateToPrivacyPolicy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer group"
            >
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>100% Offline & Private</span>
              <span className="text-[10px] text-emerald-300/70 group-hover:text-emerald-300 underline ml-0.5">Policy &rarr;</span>
            </button>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              4.9 / 5.0 Rating
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Never Forget Where You Parked Again.
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
                <strong className="text-white font-semibold">ParkDock</strong> is the ultimate smart parking locator, live walking compass, digital glovebox vault, and fuel expense tracker for Android. Designed to work flawlessly in multi-level garages, underground basements, and vast airport lots with zero internet required.
              </p>

              {/* Action & Conversion Box */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-400 text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 transition-all hover:scale-[1.02] active:scale-98 group"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-9 w-auto"
                  />
                </a>

                <a
                  href="#features"
                  className="px-6 py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>Explore 8 Modules</span>
                  <ChevronDown size={16} />
                </a>
              </div>

              {/* EEAT Proof Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">50K+</div>
                  <div className="text-xs text-slate-400 font-medium">Active Drivers</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">0 KB</div>
                  <div className="text-xs text-slate-400 font-medium">Cloud Data Uploaded</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-400">&lt; 1 sec</div>
                  <div className="text-xs text-slate-400 font-medium">GPS Lock Time</div>
                </div>
              </div>

            </div>

            {/* Right Interactive Radar & HUD Simulation Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[2.5rem] bg-gradient-to-b from-[#12182b] to-[#0d1222] border border-blue-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                      RADAR HUD // ACTIVE
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">GPS ACCURACY: ±2.4m</div>
                </div>

                {/* Radar Circle Component */}
                <div className="relative w-56 h-56 mx-auto my-4 rounded-full border border-blue-500/30 bg-[#0a0f1d] flex items-center justify-center overflow-hidden shadow-inner">
                  {/* Concentric rings */}
                  <div className="absolute inset-4 rounded-full border border-blue-500/20"></div>
                  <div className="absolute inset-12 rounded-full border border-blue-500/20"></div>
                  <div className="absolute inset-20 rounded-full border border-blue-500/10"></div>
                  {/* Crosshairs */}
                  <div className="absolute inset-x-0 top-1/2 h-px bg-blue-500/20"></div>
                  <div className="absolute inset-y-0 left-1/2 w-px bg-blue-500/20"></div>

                  {/* Rotating Radar Sweep Line */}
                  <div 
                    className="absolute inset-0 origin-center pointer-events-none"
                    style={{ transform: `rotate(${radarBearing}deg)` }}
                  >
                    <div className="w-1/2 h-1/2 bg-gradient-to-br from-blue-400/40 to-transparent origin-bottom-right rounded-tl-full"></div>
                  </div>

                  {/* Parked Vehicle Target Blip */}
                  <div 
                    className="absolute z-10 w-4 h-4 rounded-full bg-blue-400 border-2 border-white shadow-lg shadow-blue-400 animate-pulse"
                    style={{ top: '28%', left: '68%' }}
                  ></div>

                  {/* User Position Indicator */}
                  <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-md z-10"></div>
                  
                  {/* Distance Label */}
                  <div className="absolute bottom-2 font-mono text-[10px] text-blue-300 font-bold bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-500/30">
                    124 METERS AHEAD
                  </div>
                </div>

                {/* Live Info Readout */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-2 mt-4 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>VEHICLE:</span>
                    <span className="text-white font-bold uppercase">{selectedVehicle} (MH 12 AB 4590)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>PARKING SPOT:</span>
                    <span className="text-blue-400 font-bold">LEVEL B2 // BAY 14</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>METER COUNTDOWN:</span>
                    <span className="text-amber-400 font-bold">38m 42s REMAINING</span>
                  </div>
                </div>

                {/* Quick Vehicle Switcher */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {(['car', 'bike', 'ev', 'truck'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedVehicle(type)}
                      className={`py-2 text-[10px] font-bold uppercase rounded-lg border transition-all ${
                        selectedVehicle === type
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EEAT Editorial & Lab Testing Section */}
      <section className="py-12 bg-white/[0.02] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                <CheckCircle2 size={15} />
                <span>Google EEAT Verified Review & Real-World Lab Benchmark</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Tested Across 50+ Multi-Level Garages, Concrete Basements & Highway Corridors
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Authored by the <strong className="text-white">Medhastone Automotive Engineering & Mobile Lab Team</strong>. We verified ParkDock across GPS-denied environments, high-density shopping mall basements, multi-level airport terminals, and cross-state journeys with zero battery drain.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-4 bg-black/40 px-5 py-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-black text-xl">
                ✓
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">Lab Verdict</div>
                <div className="text-sm font-black text-white">100% Reliable Offline</div>
                <div className="text-[10px] text-emerald-400 font-mono">Zero Signal Required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Savings & Fine Calculator */}
      <section className="py-16 border-b border-white/5 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              ROI & Value Calculator
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">
              How Much Money Does ParkDock Save You?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Parking violations, expired meter fines, and searching aimlessly for lost cars cost drivers hundreds of dollars each year. See your estimated savings:
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#101626] to-[#0c101d] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-300">How many times do you park per month?</span>
                    <span className="text-blue-400 font-bold">{monthlyParkingTimes} times</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="60"
                    value={monthlyParkingTimes}
                    onChange={(e) => setMonthlyParkingTimes(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>2 (Casual)</span>
                    <span>30 (Daily)</span>
                    <span>60 (Commercial)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-300">Average local parking violation fine:</span>
                    <span className="text-amber-400 font-bold">${averageTicketCost}</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="150"
                    step="5"
                    value={averageTicketCost}
                    onChange={(e) => setAverageTicketCost(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>$15</span>
                    <span>$75</span>
                    <span>$150</span>
                  </div>
                </div>
              </div>

              {/* Output Result Card */}
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl border border-blue-500/30 p-6 sm:p-8 text-center space-y-4">
                <div className="text-xs font-mono uppercase tracking-widest text-blue-300">
                  ESTIMATED ANNUAL SAVINGS
                </div>
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                  ${annualFinesSaved}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Saved in prevented parking fines and avoided late-meter tickets, plus <strong className="text-white">{annualFuelSaved} minutes</strong> of wasted search time eliminated every single year.
                </p>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                >
                  <Download size={14} />
                  <span>Start Saving With ParkDock</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8 Comprehensive Feature Breakdown (Tabbed & Deep Dive) */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            COMPREHENSIVE FEATURE BREAKDOWN
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-6">
            Engineered for Everyday Commuters & Pro Drivers
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From single-tap GPS memory to encrypted glovebox storage and offline truck weight calculations, explore why ParkDock replaces 5 fragmented driver apps.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {FEATURES.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveTab(idx)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  activeTab === idx
                    ? 'bg-blue-600/20 border-blue-400 text-white shadow-lg shadow-blue-500/10'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <IconComponent size={20} className={activeTab === idx ? 'text-blue-400' : 'text-slate-400'} />
                  <span className="text-[10px] font-mono opacity-60">0{idx + 1}</span>
                </div>
                <div className="text-xs font-bold line-clamp-1">{feat.title.split('. ')[1]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Feature Deep Dive Showcase */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[#101729] to-[#0a0f1d] border border-blue-500/20 p-6 sm:p-12 shadow-2xl">
          {(() => {
            const current = FEATURES[activeTab];
            const Icon = current.icon;
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/30">
                      {current.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {current.keywordTag}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white">
                    {current.title}
                  </h3>

                  <div className="text-lg text-blue-300 font-semibold">
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
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                    >
                      <Download size={14} />
                      <span>Install & Use {current.title.split('. ')[1]}</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center justify-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-xl shadow-blue-500/20">
                    <Icon size={40} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{current.title.split('. ')[1]}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                      Engineered with offline-first local SQLite architecture, ensuring lightning-quick access even when disconnected from the internet.
                    </p>
                  </div>
                  <div className="w-full pt-4 border-t border-white/10 flex items-center justify-around text-xs font-mono text-slate-400">
                    <div>100% OFFLINE</div>
                    <div>•</div>
                    <div>ZERO BATTERY DRAIN</div>
                    <div>•</div>
                    <div>AES-256 SAFE</div>
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
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              WHO IS PARKDOCK BUILT FOR?
            </span>
            <h2 className="text-3xl font-black text-white mt-3">
              Tailored Angles for Everyday Driving Scenarios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-[#0e1322] border border-white/10 space-y-4 hover:border-blue-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Daily Commuters & City Shoppers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                No more wandering through massive mall basements or crowded downtown streets trying to remember whether you parked in Row D or Level 3.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e1322] border border-white/10 space-y-4 hover:border-indigo-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Airport & Long-Stay Travelers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Keep multi-day parking receipts, terminal gate photos, and return pillar markers neatly documented so your post-flight pickup is effortless.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e1322] border border-white/10 space-y-4 hover:border-teal-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                <Car size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Multi-Vehicle Families & Enthusiasts</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Easily switch between cars, motorbikes, and family vehicles. Maintain digital insurance records, RC books, and service histories in one place.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e1322] border border-white/10 space-y-4 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <Wrench size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Commercial Drivers & Fleet Operators</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Benefit from Indian truck axle weight checks, commercial gross vehicle weight verification, expense exports, and offline map reliability.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Long-Form Article (Google EEAT Compliance & Keyword Integration) */}
      <article className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-t border-b border-white/10 py-12 space-y-8 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
              EDITORIAL IN-DEPTH REVIEW & DRIVER GUIDE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Why Every Android Driver Needs ParkDock in Their Pocket
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span>Published: September 14, 2026</span>
              <span>•</span>
              <span>Reading Time: 5 min</span>
              <span>•</span>
              <span>Audited for Android 14+</span>
            </div>
          </div>

          <p>
            Driving today presents challenges that standard navigation apps simply fail to address. While turn-by-turn navigation gets you to your destination, the immediate aftermath—navigating complex multi-tier parking garages, avoiding exorbitant parking meter expiration penalties, managing vehicle document renewals, and tracking genuine cost-per-kilometer expenses—remains fragmented across disjointed tools.
          </p>

          <h3 className="text-2xl font-bold text-white pt-4">
            The Problem With Standard "Find My Car" Solutions
          </h3>
          <p>
            Most generic map applications rely solely on outdoor GPS satellite locks. When you enter a multi-level subterranean concrete structure (such as an airport terminal or shopping mall basement), satellite signal diminishes immediately. You cannot save whether you parked on <strong className="text-white">Floor B2, Pillar 34, or Row E</strong>, nor can you store a photo reference of your ticket stub.
          </p>
          <p>
            <strong className="text-white">ParkDock</strong> bridges this structural gap. By uniting instant coordinate capture with granular indoor structural tagging, dynamic walking compass radar guidance, and 100% offline map caching, ParkDock guarantees that returning to your vehicle is fast, stress-free, and dependable.
          </p>

          <h3 className="text-2xl font-bold text-white pt-4">
            Encrypted Digital Glovebox: Eliminating Forgotten Documents & Penalties
          </h3>
          <p>
            Drivers frequently face heavy traffic penalties when failing to produce current registration (RC), pollution (PUC), or valid insurance papers during highway checks. ParkDock's <strong className="text-white">Encrypted Digital Glovebox</strong> provides a private, biometric-secured sanctuary on your Android phone. Because all records are encrypted via local AES-256 and stored strictly on-device without cloud telemetry, you never have to worry about data breaches or privacy intrusions.
          </p>

          <h3 className="text-2xl font-bold text-white pt-4">
            True Operating Expense & Fuel Analytics
          </h3>
          <p>
            Owning a car involves far more than just pump fuel. Routine tyre replacements, toll gate charges, periodic maintenance, parking permits, and insurance add up to significant monthly expenditures. ParkDock's real-time cost-per-kilometer engine automatically computes the real cost of every journey, equipping you with verifiable CSV and PDF reports ready for tax write-offs or corporate reimbursement claims.
          </p>

          <div className="p-6 rounded-2xl bg-blue-950/30 border border-blue-500/30 my-6">
            <h4 className="text-lg font-bold text-white mb-2">Key Highlights Summary:</h4>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>✓ <strong>Search Intent:</strong> find my parked car, car locator android, smart parking app</li>
              <li>✓ <strong>Privacy Standard:</strong> 100% local device storage, biometric authentication, zero tracking</li>
              <li>✓ <strong>Offline Capability:</strong> cached OpenStreetMap tiles & breadcrumb path retracing</li>
              <li>✓ <strong>Cost Optimization:</strong> parking meter timers & true fuel cost calculators</li>
            </ul>
          </div>

        </div>
      </article>

      {/* Frequently Asked Questions (FAQ Section) */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl font-black text-white mt-3">
            Common Questions About ParkDock
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02]"
                >
                  <span className="font-bold text-base text-white">{faq.q}</span>
                  <div className="p-1 rounded-full bg-white/5 text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    <p>{faq.a}</p>
                    {(faq.q.toLowerCase().includes("privacy") || faq.q.toLowerCase().includes("safely") || faq.q.toLowerCase().includes("track")) && (
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-slate-400">Want full legal and technical specifications?</span>
                        <button
                          onClick={navigateToPrivacyPolicy}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:text-blue-300 text-xs font-bold transition-all"
                        >
                          <ShieldCheck size={13} />
                          <span>Read Full Privacy Policy &rarr;</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final High-Converting Install Banner */}
      <section className="py-20 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <img 
            src="/parkdock.jpg" 
            alt="ParkDock App Icon" 
            className="w-24 h-24 rounded-3xl mx-auto object-cover shadow-2xl ring-2 ring-blue-500/50 shadow-blue-500/30"
          />
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Ready to Upgrade Your Everyday Driving Experience?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              Download ParkDock for free today on Google Play. Zero registration required, 100% private, and ready to navigate your very next parking spot.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-400 text-white font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/50 hover:shadow-blue-500/70 transition-all hover:scale-105 active:scale-95"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-10 w-auto"
              />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-4">
            <span>✓ Verified Safe on Google Play Protect</span>
            <span>✓ Android 8.0 & Above Supported</span>
            <span>✓ Zero In-App Ads</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center text-xs text-slate-500 bg-[#06080d]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy; 2026 Medhastone. All rights reserved. ParkDock is a registered utility suite.</div>
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Portfolio Home</button>
            <button 
              onClick={navigateToPrivacyPolicy}
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold transition-colors"
            >
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Privacy Policy</span>
            </button>
            <a href="/play-games" className="hover:text-white transition-colors">Play Games</a>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Conversion Bar (Mobile & Desktop) */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-[#090d1a]/95 backdrop-blur-xl border-t border-blue-500/30 py-3 px-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/parkdock.jpg" 
                alt="ParkDock" 
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-blue-400"
              />
              <div className="hidden sm:block">
                <div className="font-black text-white text-sm">ParkDock: Smart Car Locator & Garage</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span>★ 4.9 Rating</span>
                  <span>•</span>
                  <span>100% Offline & Private</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={navigateToPrivacyPolicy}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-all"
              >
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Privacy</span>
              </button>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <Download size={14} />
                <span>Install Free</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
