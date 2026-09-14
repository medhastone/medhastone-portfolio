import React, { useState, useEffect } from 'react';
import {
  FileText,
  Shield,
  ShieldCheck,
  Lock,
  EyeOff,
  Stamp,
  Layers,
  FileSpreadsheet,
  Camera,
  Wand2,
  Sparkles,
  Download,
  ArrowLeft,
  Check,
  CheckCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sliders,
  Scissors,
  Minimize2,
  Maximize2,
  Printer,
  FileCode,
  Fingerprint,
  Trash2,
  Sun,
  Contrast,
  FileUp,
  Zap,
  HelpCircle,
  WifiOff,
  AlertTriangle,
  RotateCw,
  Eye,
  FileCheck,
  Share2
} from 'lucide-react';

interface PdfZeroScreenProps {
  onBack: () => void;
}

type DemoToolKey = 'id-masker' | 'watermark' | 'compressor' | 'exif-stripper' | 'id-stitcher' | 'nup-layout';

export default function PdfZeroScreen({ onBack }: PdfZeroScreenProps) {
  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pdfzero";

  // State
  const [activeDemoTool, setActiveDemoTool] = useState<DemoToolKey>('id-masker');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

  // ID Masker Demo State
  const [maskAadhaar, setMaskAadhaar] = useState<boolean>(true);
  const [maskSSN, setMaskSSN] = useState<boolean>(true);
  const [maskMethod, setMaskMethod] = useState<'redact' | 'blur' | 'hash'>('redact');

  // Watermark Demo State
  const [watermarkText, setWatermarkText] = useState<string>('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(30);
  const [watermarkAngle, setWatermarkAngle] = useState<number>(-45);
  const [watermarkColor, setWatermarkColor] = useState<string>('#ef4444');

  // Compressor Demo State
  const [compressionLevel, setCompressionLevel] = useState<number>(75);
  const originalSizeMB = 18.6;
  const compressedSizeMB = (originalSizeMB * (1 - (compressionLevel * 0.85) / 100)).toFixed(1);
  const savedPercent = Math.round((1 - parseFloat(compressedSizeMB) / originalSizeMB) * 100);

  // EXIF Stripper State
  const [exifCleaned, setExifCleaned] = useState<boolean>(false);

  // N-Up State
  const [pagesPerSheet, setPagesPerSheet] = useState<2 | 4 | 8>(2);

  // Dynamic Title & Canonical Tag for SEO
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "PDFZero - Zero Cloud Uploads | 100% Offline Universal PDF Toolkit for Android";

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = "https://zentova.in/pdfzero";

    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.title = "Medhastone | High-Performance App Development & Engineering Studio";
      if (canonical) canonical.href = "https://zentova.in/";
    };
  }, []);

  // FAQs Data
  const FAQS = [
    {
      q: "How does PDFZero guarantee that my files never leave my phone?",
      a: "Unlike web-based converters (like Smallpdf or iLovePDF) that upload files to remote third-party servers, PDFZero executes all PDF parsing, image conversions, OCR text extraction, and cryptographic encryption 100% locally on your device hardware using standalone compiled WebAssembly and native C++/Rust PDF binaries. You can put your phone into Airplane Mode, turn off Wi-Fi and mobile data, and all 25+ PDF tools will work with zero latency and absolute confidentiality."
    },
    {
      q: "What is the Govt ID Masker and which documents does it support?",
      a: "The Govt ID Masker is a specialized privacy tool that automatically detects and masks sensitive national identity numbers—such as Indian Aadhaar (masking the first 8 digits to leave only XXXX-XXXX-1234), US Social Security Numbers (SSN), Driving Licenses, PAN cards, and National Passport IDs. It prevents identity theft before you email or share digital copies with hotels, rental agencies, employers, or telecom providers."
    },
    {
      q: "How does the Anti-Leak Watermarking feature protect documents?",
      a: "Anti-Leak Watermarking burns permanent diagonal or repeating text stamps across all PDF pages (such as 'CONFIDENTIAL', 'FOR BANK LOAN VERIFICATION ONLY', or custom timestamps with recipient name). Because the watermark is flattened directly into the PDF vector stream, it cannot be easily selected or deleted by standard PDF viewers."
    },
    {
      q: "What is Bates Stamping and why is it useful for legal and corporate teams?",
      a: "Bates Stamping is an industry-standard legal numbering protocol that applies sequential identifiers, case prefixes, and automated timestamps across hundreds of pages (e.g., 'CASE-2026-DOC-0001', 'CASE-2026-DOC-0002'). Lawyers, paralegals, accountants, and auditors use PDFZero to index evidence bundles 100% offline without exposing confidential court discovery documents to the cloud."
    },
    {
      q: "Can PDFZero convert PDFs into developer formats like LaTeX (.tex) and Markdown (.md)?",
      a: "Yes! In addition to standard PDF to Word (.docx) and Image (JPG/PNG/WEBP) conversions, PDFZero features offline developer export engines. It extracts structured headings, tables, mathematical formulae, and code blocks directly into clean LaTeX (.tex) equations or Markdown (.md) documents ready for GitHub, Obsidian, or VS Code."
    },
    {
      q: "How does the Offline OCR (Optical Character Recognition) engine work?",
      a: "PDFZero includes an embedded lightweight Tesseract-based OCR engine optimized for mobile processors. It processes scanned book pages, paper receipts, and invoice photos completely on-device, turning unselectable raster scans into copyable, searchable, and highlightable PDF documents without sending your photos to external cloud vision APIs."
    },
    {
      q: "Is there any file size limit or daily conversion quota?",
      a: "No. Because all computation happens on your phone's processor rather than costly cloud servers, PDFZero has zero artificial file size limits, zero daily usage quotas, and no 'wait 60 minutes or pay' subscription traps. You can compress, merge, and edit 500MB+ document archives completely free."
    },
    {
      q: "How does PDFZero comply with Google Play Developer Policies and data safety standards?",
      a: "PDFZero adheres strictly to Google Play Data Safety requirements. It collects zero user documents, photos, or biometric credentials. Device permissions (Storage, Camera) are requested on-demand only for picking or scanning files. Any third-party advertising (via Google AdMob) operates strictly within Google Play Developer Program policies and never accesses document data."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-rose-500/30 selection:text-white font-sans">
      
      {/* Top Sticky Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/80 hover:text-white flex items-center gap-2 group"
              title="Return to Medhastone Portfolio"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Portfolio</span>
            </button>
            <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2.5">
              <img
                src="/pdfzero.jpg"
                alt="PDFZero Official App Icon"
                className="w-9 h-9 rounded-xl object-cover shadow-lg shadow-rose-500/30 border border-white/15 shrink-0"
              />
              <span className="font-black text-sm tracking-tight text-white hidden md:inline">PDFZero</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Zero Cloud Uploads</span>
            </div>
            <a
              href="/pdfzero/privacy-policy"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Privacy Policy</span>
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install Free</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-28 pb-36 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Hero Section */}
        <section className="mb-20 pt-6">
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
              100% Offline Universal PDF Toolkit
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Zero Cloud Uploads
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Govt ID Masker &amp; Redaction
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
              4.9 ★ Android Utility
            </span>
            <a
              href="/pdfzero/privacy-policy"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-white/5 hover:bg-white/10 text-rose-300 hover:text-white border border-white/10 transition-colors"
            >
              <ShieldCheck className="w-3 h-3 text-rose-400" />
              <span>Privacy Policy</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
                Why Upload Sensitive PDFs to the Cloud? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300">
                  Process Everything 100% Offline with PDFZero
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal mb-8">
                Most free online PDF tools require uploading your confidential bank statements, tax returns, national IDs, and contracts to external servers. <strong className="text-white font-bold">PDFZero processes everything locally on your device</strong> with zero cloud uploads, zero telemetry harvesting, and zero subscription paywalls.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-[1.02]"
                >
                  <Download className="w-5 h-5" />
                  <span>Get PDFZero on Google Play</span>
                </a>
                <a
                  href="#interactive-simulator"
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all"
                >
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  <span>Try Tool Simulator</span>
                </a>
                <a
                  href="/pdfzero/privacy-policy"
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Privacy Policy</span>
                </a>
              </div>
            </div>

            {/* App Card Visual Showcase */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-6 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-2xl shadow-2xl shadow-rose-950/50 max-w-xs w-full text-center group hover:border-rose-500/40 transition-all">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                  100% On-Device Engine
                </div>

                <div className="relative mx-auto w-32 h-32 mb-4 mt-2 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-rose-500/30 to-transparent shadow-2xl shadow-rose-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                  <img
                    src="/pdfzero.jpg"
                    alt="PDFZero App Icon"
                    className="w-full h-full object-cover rounded-xl shadow-inner border border-white/10"
                  />
                </div>

                <h3 className="font-black text-lg text-white mb-1">PDFZero Android</h3>
                <p className="text-xs text-rose-300 font-medium mb-4">com.pdfzero • Universal PDF Toolkit</p>

                <div className="grid grid-cols-2 gap-2 text-left text-xs mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Cloud Sync</div>
                    <div className="font-bold text-emerald-400 flex items-center gap-1">
                      <WifiOff className="w-3 h-3" /> ZERO (0%)
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-slate-400 text-[10px] uppercase font-bold">Speed</div>
                    <div className="font-bold text-rose-300">Instant Local</div>
                  </div>
                </div>

                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-white/10"
                >
                  <span>Google Play Store</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
              <div className="text-3xl font-black text-rose-400 mb-1">100%</div>
              <div className="text-xs font-bold uppercase text-slate-300">Offline Processing</div>
              <div className="text-xs text-slate-500 mt-1">Zero Cloud Uploads</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
              <div className="text-3xl font-black text-emerald-400 mb-1">25+</div>
              <div className="text-xs font-bold uppercase text-slate-300">Universal Tools</div>
              <div className="text-xs text-slate-500 mt-1">Security, Edit, Scan, Convert</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
              <div className="text-3xl font-black text-amber-400 mb-1">Govt ID</div>
              <div className="text-xs font-bold uppercase text-slate-300">Auto Masker</div>
              <div className="text-xs text-slate-500 mt-1">Aadhaar, SSN &amp; Tax IDs</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
              <div className="text-3xl font-black text-purple-400 mb-1">Unlimited</div>
              <div className="text-xs font-bold uppercase text-slate-300">File Conversions</div>
              <div className="text-xs text-slate-500 mt-1">No Paywalls or Hourly Limits</div>
            </div>
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE TOOL SIMULATOR */}
        <section id="interactive-simulator" className="mb-24 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Live Interactive Simulator
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Experience Offline PDF Security in Action
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Test drive PDFZero’s most popular security and formatting tools right in your browser. All interactions simulate our real on-device Android engine.
            </p>
          </div>

          {/* Interactive Tool Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { key: 'id-masker', label: 'Govt ID Masker', icon: EyeOff },
              { key: 'watermark', label: 'Anti-Leak Watermark', icon: Stamp },
              { key: 'compressor', label: 'PDF Compressor', icon: Minimize2 },
              { key: 'exif-stripper', label: 'EXIF Metadata Stripper', icon: Shield },
              { key: 'id-stitcher', label: 'ID Card Stitcher', icon: Layers },
              { key: 'nup-layout', label: 'N-Up Multi Page Printing', icon: Printer }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeDemoTool === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveDemoTool(tab.key as DemoToolKey)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/30'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tool Demonstration Box */}
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0b0e17] border border-white/10 shadow-2xl max-w-5xl mx-auto">
            
            {/* TOOL 1: GOVT ID MASKER */}
            {activeDemoTool === 'id-masker' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-md bg-rose-500/20 text-rose-300 text-xs font-bold uppercase">
                      Privacy &amp; Compliance Tool
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                      Govt ID &amp; Document Masker
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mt-2">
                      Sharing unmasked ID cards with hotels, employers, or rental agencies exposes you to identity theft. PDFZero redacts sensitive digits with a single tap.
                    </p>
                  </div>

                  <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Mask Aadhaar Card (First 8 Digits)</span>
                      <button
                        onClick={() => setMaskAadhaar(!maskAadhaar)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${maskAadhaar ? 'bg-rose-600' : 'bg-white/20'}`}
                      >
                        <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${maskAadhaar ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Mask SSN / National Tax ID</span>
                      <button
                        onClick={() => setMaskSSN(!maskSSN)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${maskSSN ? 'bg-rose-600' : 'bg-white/20'}`}
                      >
                        <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${maskSSN ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Redaction Style</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['redact', 'blur', 'hash'] as const).map(style => (
                          <button
                            key={style}
                            onClick={() => setMaskMethod(style)}
                            className={`py-2 px-3 rounded-lg text-xs font-bold capitalize transition-all ${
                              maskMethod === style
                                ? 'bg-rose-600 text-white'
                                : 'bg-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            {style === 'redact' ? 'Blackout' : style === 'blur' ? 'Pixel Blur' : 'Hash X'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated ID Card Document */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 border border-white/20 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-rose-400" />
                        <span className="font-black text-xs uppercase tracking-wider text-white">National Identity Card</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">VERIFIED</span>
                    </div>

                    <div className="flex gap-4 items-center mb-5">
                      <div className="w-20 h-24 rounded-xl bg-slate-800 border border-white/10 flex flex-col items-center justify-center text-slate-400 text-xs">
                        <Camera className="w-6 h-6 mb-1 text-slate-500" />
                        <span>PHOTO</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="text-slate-400 text-[10px]">FULL LEGAL NAME</div>
                        <div className="font-bold text-white text-sm">RAHUL V. SHARMA</div>
                        <div className="text-slate-400 text-[10px] pt-1">DATE OF BIRTH</div>
                        <div className="font-semibold text-slate-300">14/08/1992</div>
                      </div>
                    </div>

                    {/* Masked ID Number Display */}
                    <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-center mb-3">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Aadhaar / National ID No.</div>
                      <div className="font-mono text-base font-black tracking-widest">
                        {maskAadhaar ? (
                          maskMethod === 'redact' ? (
                            <span className="text-white">
                              <span className="bg-black text-black px-2 py-0.5 rounded border border-rose-500/40 select-none">████-████</span>-9801
                            </span>
                          ) : maskMethod === 'blur' ? (
                            <span className="text-white">
                              <span className="filter blur-sm select-none">8472-1940</span>-9801
                            </span>
                          ) : (
                            <span className="text-rose-400">XXXX-XXXX-9801</span>
                          )
                        ) : (
                          <span className="text-amber-300">8472-1940-9801</span>
                        )}
                      </div>
                    </div>

                    {/* SSN / Tax Masking Display */}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-center">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Tax / SSN Reference</div>
                      <div className="font-mono text-sm font-bold">
                        {maskSSN ? (
                          <span className="text-rose-300">XXX-XX-4912</span>
                        ) : (
                          <span className="text-slate-300">482-99-4912</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <span className="text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> 100% Safe to Share for Verification
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOOL 2: ANTI-LEAK WATERMARK */}
            {activeDemoTool === 'watermark' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase">
                      Document Deterrent
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                      Anti-Leak Dynamic Watermarking
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mt-2">
                      Prevent unauthorized re-use or leaking of contracts, pitch decks, and financial statements with burned-in vector watermarks.
                    </p>
                  </div>

                  <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Watermark Text</label>
                      <input
                        type="text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-bold text-sm focus:outline-none focus:border-rose-500"
                        placeholder="e.g., CONFIDENTIAL"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {['CONFIDENTIAL', 'FOR BANK ONLY', 'DO NOT SHARE'].map(preset => (
                        <button
                          key={preset}
                          onClick={() => setWatermarkText(preset)}
                          className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-bold text-slate-300 truncate"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Opacity: {watermarkOpacity}%</span>
                        <span>Angle: {watermarkAngle}&deg;</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        value={watermarkOpacity}
                        onChange={(e) => setWatermarkOpacity(parseInt(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-slate-400 block mb-2">Watermark Color</label>
                      <div className="flex gap-3">
                        {[
                          { name: 'Red', color: '#ef4444' },
                          { name: 'Amber', color: '#f59e0b' },
                          { name: 'Blue', color: '#3b82f6' },
                          { name: 'Slate', color: '#94a3b8' }
                        ].map(c => (
                          <button
                            key={c.color}
                            onClick={() => setWatermarkColor(c.color)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                              watermarkColor === c.color ? 'border-white bg-white/20 text-white' : 'border-white/10 text-slate-400'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                            <span>{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Watermarked Document Preview */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm rounded-2xl bg-white text-slate-900 p-6 shadow-2xl relative overflow-hidden aspect-[1/1.3] flex flex-col justify-between select-none">
                    
                    {/* The Dynamic Watermark Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <span
                        className="font-black tracking-widest whitespace-nowrap text-3xl sm:text-4xl uppercase border-4 border-dashed px-4 py-2 rounded-2xl"
                        style={{
                          color: watermarkColor,
                          borderColor: watermarkColor,
                          opacity: watermarkOpacity / 100,
                          transform: `rotate(${watermarkAngle}deg)`
                        }}
                      >
                        {watermarkText || 'WATERMARK'}
                      </span>
                    </div>

                    {/* Simulated Contract Text */}
                    <div className="space-y-3 opacity-70">
                      <div className="flex justify-between items-center border-b pb-2">
                        <div className="font-bold text-xs">MUTUAL NON-DISCLOSURE AGREEMENT</div>
                        <div className="text-[10px] text-slate-500">PAGE 1 OF 4</div>
                      </div>
                      <div className="space-y-1.5 text-[9px] text-slate-600 leading-normal">
                        <p>This Mutual Non-Disclosure Agreement is entered into on 14th August 2026 by and between the Disclosing Party and the Recipient.</p>
                        <p>1. <strong>Confidential Information:</strong> All technical specifications, business plans, and financial reports disclosed hereunder shall remain strictly private.</p>
                        <p>2. <strong>Non-Circumvention:</strong> Neither party shall use proprietary secrets without prior written authorization.</p>
                        <p>3. <strong>Governing Law:</strong> Governed by relevant federal commerce jurisdictions.</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[9px] text-slate-400">
                      <span>BATES # CONF-00819</span>
                      <span>PROTECTED BY PDFZERO OFFLINE</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOOL 3: PDF COMPRESSOR */}
            {activeDemoTool === 'compressor' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase">
                      Efficiency &amp; Email Ready
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                      Lossless &amp; Strong PDF Compressor
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mt-2">
                      Shrink massive scanned PDFs, academic thesis files, and tax audits by up to 80% with live quality preview. Never worry about email attachment limits again.
                    </p>
                  </div>

                  <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>Compression Strength</span>
                        <span className="text-rose-400 font-bold">{compressionLevel}% Quality Optimization</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="95"
                        value={compressionLevel}
                        onChange={(e) => setCompressionLevel(parseInt(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>Light (Lossless)</span>
                        <span>Balanced (Recommended)</span>
                        <span>Maximum Shrink</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {[
                        { label: 'Low (Lossless)', val: 30 },
                        { label: 'Medium (Balanced)', val: 65 },
                        { label: 'High (Email Max)', val: 85 }
                      ].map(p => (
                        <button
                          key={p.val}
                          onClick={() => setCompressionLevel(p.val)}
                          className={`py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                            compressionLevel === p.val ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compression Comparison Card */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm rounded-2xl bg-[#101626] p-6 border border-white/15 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold uppercase text-slate-400">Live Compression Preview</span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                        {savedPercent}% SMALLER
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-slate-400 text-xs font-bold mb-1">ORIGINAL SIZE</div>
                        <div className="text-2xl font-black text-slate-300">{originalSizeMB} MB</div>
                        <div className="text-[10px] text-slate-500 mt-1">Too big for email (25MB cap)</div>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/60 to-pink-950/60 border border-rose-500/30 text-center">
                        <div className="text-rose-300 text-xs font-bold mb-1">COMPRESSED</div>
                        <div className="text-2xl font-black text-white">{compressedSizeMB} MB</div>
                        <div className="text-[10px] text-emerald-400 mt-1">✓ Instant WhatsApp / Email</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex items-center justify-between">
                        <span>Vector Text Clarity:</span>
                        <span className="font-bold text-white">100% Crisp &amp; Searchable</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Processing Location:</span>
                        <span className="font-bold text-emerald-400">100% On-Device CPU</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Cloud Upload Time:</span>
                        <span className="font-bold text-slate-400">0.00 Seconds</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOOL 4: EXIF METADATA STRIPPER */}
            {activeDemoTool === 'exif-stripper' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-md bg-purple-500/20 text-purple-300 text-xs font-bold uppercase">
                      Anti-Tracking Security
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                      EXIF Metadata Cleaner
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mt-2">
                      When you take photos of documents, your camera embeds secret GPS coordinates, device serial numbers, and exact home timestamps. PDFZero purges all metadata before converting to PDF.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <button
                      onClick={() => setExifCleaned(!exifCleaned)}
                      className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        exifCleaned ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-rose-600 hover:bg-rose-500 text-white'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{exifCleaned ? 'Metadata Stripped Clean (Click to Toggle)' : 'Click to Strip EXIF Metadata'}</span>
                    </button>
                    <p className="text-xs text-slate-400 text-center">
                      Simulates PDFZero's automatic EXIF scrubbing during image-to-PDF compilation.
                    </p>
                  </div>
                </div>

                {/* Metadata Inspector Card */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm rounded-2xl bg-[#101626] p-6 border border-white/15 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <span className="text-xs font-bold uppercase text-slate-300">File Metadata Inspector</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${exifCleaned ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {exifCleaned ? 'SANITIZED' : 'LEAK RISK'}
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex justify-between items-center">
                        <span className="text-slate-400">GPS Location:</span>
                        <span className={exifCleaned ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                          {exifCleaned ? '[PURGED / ZERO GPS]' : '28.6139° N, 77.2090° E'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex justify-between items-center">
                        <span className="text-slate-400">Camera Device:</span>
                        <span className={exifCleaned ? 'text-emerald-400' : 'text-amber-300'}>
                          {exifCleaned ? '[ANONYMIZED]' : 'Samsung SM-S928B (Galaxy S24)'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex justify-between items-center">
                        <span className="text-slate-400">Creation Timestamp:</span>
                        <span className={exifCleaned ? 'text-emerald-400' : 'text-slate-200'}>
                          {exifCleaned ? 'UTC Standard' : '2026:08:14 16:42:19'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex justify-between items-center">
                        <span className="text-slate-400">Lens / Focal Info:</span>
                        <span className={exifCleaned ? 'text-emerald-400' : 'text-slate-300'}>
                          {exifCleaned ? '[REMOVED]' : 'f/1.7 1/120s ISO 64'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOOL 5: ID CARD STITCHER */}
            {activeDemoTool === 'id-stitcher' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold uppercase">
                      Smart Camera Scan
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                      ID Card Front &amp; Back Stitcher
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mt-2">
                      Scan both the front and rear of your Driver's License or ID card, and PDFZero automatically crops, aligns, and stitches them onto a single printable A4 page.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                      <Check className="w-4 h-4" /> Auto Perspective &amp; Glare Correction
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                      <Check className="w-4 h-4" /> Standard 1:1 Scale A4 Printing Layout
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                      <Check className="w-4 h-4" /> Background Cleanup &amp; Shadow Removal
                    </div>
                  </div>
                </div>

                {/* Stitched A4 Sheet Preview */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-xs rounded-2xl bg-white text-slate-900 p-6 shadow-2xl aspect-[1/1.4] flex flex-col justify-between border-2 border-slate-300">
                    <div className="text-center border-b pb-2">
                      <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">A4 PRINTABLE SHEET (1:1 SCALE)</div>
                    </div>

                    <div className="space-y-4 my-auto">
                      {/* Front ID */}
                      <div className="p-3 rounded-xl bg-slate-100 border border-slate-300 text-center">
                        <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">FRONT SIDE</span>
                        <div className="h-12 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-600">
                          [ID PHOTO &amp; NAME DETAILS]
                        </div>
                      </div>

                      {/* Back ID */}
                      <div className="p-3 rounded-xl bg-slate-100 border border-slate-300 text-center">
                        <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">BACK SIDE</span>
                        <div className="h-12 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-600">
                          [BARCODE &amp; ADDRESS VERIFICATION]
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-[9px] text-slate-400 border-t pt-2">
                      STITCHED 100% OFFLINE VIA PDFZERO
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOOL 6: N-UP MULTI-PAGE PRINTING */}
            {activeDemoTool === 'nup-layout' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase">
                      Paper &amp; Ink Saver
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                      N-Up Multi-Page Layout Printing
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mt-2">
                      Condense 2, 4, or 8 presentation slides or document pages onto a single sheet. Save up to 75% on paper and printer ink.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <label className="text-xs font-bold uppercase text-slate-400 block">Pages Per Sheet</label>
                    <div className="grid grid-cols-3 gap-3">
                      {([2, 4, 8] as const).map(num => (
                        <button
                          key={num}
                          onClick={() => setPagesPerSheet(num)}
                          className={`py-2.5 px-4 rounded-xl font-bold text-sm transition-all ${
                            pagesPerSheet === num
                              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {num}-Up ({num} Pages)
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* N-Up Preview */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-xs rounded-2xl bg-white text-slate-900 p-5 shadow-2xl aspect-[1/1.4] flex flex-col justify-between border-2 border-slate-300">
                    <div className="text-center text-[10px] font-bold text-slate-500 uppercase border-b pb-1">
                      {pagesPerSheet}-UP COMPOSITE SHEET
                    </div>

                    <div className={`grid gap-2 my-auto ${pagesPerSheet === 2 ? 'grid-rows-2' : pagesPerSheet === 4 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-2 grid-rows-4'}`}>
                      {Array.from({ length: pagesPerSheet }).map((_, i) => (
                        <div key={i} className="p-2 rounded bg-slate-100 border border-slate-300 text-center flex flex-col justify-center items-center h-16">
                          <span className="text-[9px] font-black text-slate-600">PAGE {i + 1}</span>
                          <span className="text-[7px] text-slate-400">Document Text &amp; Charts</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center text-[9px] text-slate-400 border-t pt-1">
                      SAVES {pagesPerSheet === 2 ? '50%' : pagesPerSheet === 4 ? '75%' : '87%'} PAPER
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* SECTION 2: 4-PILLAR FEATURE MATRIX */}
        <section className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Layers className="w-3.5 h-3.5" />
              Complete 25+ Feature Breakdown
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Everything You Need in One Private App
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              No more switching between 5 different websites. PDFZero unifies legal security, daily editing, AI scanning, and universal format conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Pillar A: Privacy, Security & Compliance */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-rose-950/20 to-transparent border border-rose-500/20 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">A. Privacy, Security &amp; Compliance</h3>
              <p className="text-slate-400 text-xs mb-6">Designed for legal teams, privacy advocates, and sensitive financial records.</p>
              
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Govt ID Masker:</strong> Auto-detects and masks Aadhaar, SSN, PAN, and National ID numbers before sharing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Anti-Leak Watermarking:</strong> Burn custom "CONFIDENTIAL", recipient name, or timestamp watermarks across all pages.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Permanent PDF Redaction:</strong> Irreversibly blackout confidential numbers, trade secrets, or client addresses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Bates Legal Stamping:</strong> Sequential case numbering and court exhibits (e.g., CASE-001) for legal discovery.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>AES-256 PDF Encryption:</strong> Set robust passwords or unlock authorized password-protected PDF files.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>EXIF Metadata Cleaner:</strong> Strip hidden camera GPS coordinates and timestamps before converting images to PDF.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Biometric App Lock:</strong> Protect your local PDF repository with Fingerprint and Face ID authentication.</span>
                </li>
              </ul>
            </div>

            {/* Pillar B: Core PDF Editing & Organization */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-950/20 to-transparent border border-blue-500/20 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">B. Core PDF Editing &amp; Organization</h3>
              <p className="text-slate-400 text-xs mb-6">High-performance document manipulation without upload delays.</p>
              
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>PDF Merge &amp; Split:</strong> Combine dozens of PDFs into one master report or extract specific custom page ranges.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Lossless PDF Compressor:</strong> Shrink large files by 50–85% with live quality sliders and instant preview.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Visual Page Organizer:</strong> Drag-and-drop to reorder, rotate 90/180/270°, delete, or duplicate individual pages.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Annotator &amp; Digital Signatures:</strong> Draw handwritten signatures, add sticky notes, and crop pages on the fly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>PDF Form Flattening:</strong> Lock interactive form fields and signatures permanently to prevent post-signature tampering.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>N-Up Multi-Page Printing:</strong> Fit 2, 4, or 8 pages onto a single sheet to reduce paper usage.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Grayscale Converter:</strong> Convert color PDFs into clean monochrome black-and-white to save expensive printer ink.</span>
                </li>
              </ul>
            </div>

            {/* Pillar C: AI Camera Scanner & Image Utilities */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-amber-950/20 to-transparent border border-amber-500/20 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">C. AI Camera Scanner &amp; Image Utilities</h3>
              <p className="text-slate-400 text-xs mb-6">Turn physical receipts, ID cards, and whiteboards into professional PDFs.</p>
              
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>AI Document Edge Scanner:</strong> Auto-detects paper borders, flattens skew angles, and sharpens text clarity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>ID Card Stitcher:</strong> Scans front and back of physical ID cards and aligns them perfectly on one A4 sheet.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Shadow &amp; Glare Remover:</strong> Eliminates phone shadows and harsh office lighting reflections from documents.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>AI Background Remover:</strong> Isolates signatures and official stamps with transparent backgrounds.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Handwritten Notes Enhancer:</strong> Whitens yellowish notepad paper and boosts contrast for student notes.</span>
                </li>
              </ul>
            </div>

            {/* Pillar D: Universal Conversions (100% Offline) */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-950/20 to-transparent border border-purple-500/20 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                <FileCode className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">D. Universal Conversions (100% Offline)</h3>
              <p className="text-slate-400 text-xs mb-6">Seamless conversions without internet dependency or data limits.</p>
              
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Image to PDF / PDF to Image:</strong> High-res batch conversion of JPG, PNG, WEBP, and TIFF files.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Word to PDF &amp; PDF to Word:</strong> Convert .docx files into printable PDFs or extract clean editable text.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>PDF to LaTeX (.tex) &amp; Markdown (.md):</strong> Developer export engine for GitHub READMEs, Obsidian, and research papers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Offline OCR Text Recognition:</strong> Turn unselectable scanned images into searchable and copyable text.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* SECTION 3: HEAD-TO-HEAD COMPARISON TABLE */}
        <section className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              PDFZero vs. Cloud PDF Converters
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Why thousands of professionals are abandoning web upload tools for 100% on-device processing.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 shadow-2xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#0d1220]">
                  <th className="p-5 font-black text-white">Comparison Criteria</th>
                  <th className="p-5 font-black text-rose-400 bg-rose-950/30 border-x border-rose-500/20">
                    PDFZero (100% Offline)
                  </th>
                  <th className="p-5 font-black text-slate-400">
                    Online Cloud Tools (Smallpdf, iLovePDF, etc.)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-[#090d18]">
                <tr>
                  <td className="p-5 font-bold text-white">Cloud Upload Required?</td>
                  <td className="p-5 font-black text-emerald-400 bg-rose-950/20 border-x border-rose-500/20">
                    NEVER (0% Uploads)
                  </td>
                  <td className="p-5 text-rose-400">
                    MANDATORY (Uploaded to remote servers)
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-white">Bank Statement &amp; ID Privacy</td>
                  <td className="p-5 font-bold text-emerald-400 bg-rose-950/20 border-x border-rose-500/20">
                    100% Confidential on Phone
                  </td>
                  <td className="p-5 text-slate-400">
                    Third-party server risk &amp; data broker retention
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-white">Works in Airplane Mode / Offline?</td>
                  <td className="p-5 font-bold text-emerald-400 bg-rose-950/20 border-x border-rose-500/20">
                    YES (Full 25+ tools work with zero internet)
                  </td>
                  <td className="p-5 text-slate-400">
                    NO (Fails without active Wi-Fi / mobile data)
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-white">Govt ID Masker (Aadhaar/SSN)</td>
                  <td className="p-5 font-bold text-emerald-400 bg-rose-950/20 border-x border-rose-500/20">
                    Built-in One-Tap Masker
                  </td>
                  <td className="p-5 text-slate-400">
                    Not available in standard tools
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-white">File Size &amp; Hourly Limits</td>
                  <td className="p-5 font-bold text-emerald-400 bg-rose-950/20 border-x border-rose-500/20">
                    UNLIMITED (No hourly quotas)
                  </td>
                  <td className="p-5 text-slate-400">
                    Capped at 2 files/hour or 15MB file limit
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-white">Conversion Speed</td>
                  <td className="p-5 font-bold text-emerald-400 bg-rose-950/20 border-x border-rose-500/20">
                    Instant (Zero upload/download bandwidth wait)
                  </td>
                  <td className="p-5 text-slate-400">
                    Slow (Minutes spent uploading &amp; downloading)
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-white">Developer Export (LaTeX / Markdown)</td>
                  <td className="p-5 font-bold text-emerald-400 bg-rose-950/20 border-x border-rose-500/20">
                    Included 100% Offline
                  </td>
                  <td className="p-5 text-slate-400">
                    Rare / Locked behind enterprise tier
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: SEO ARTICLE & PROMOTION KIT */}
        <section className="mb-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 max-w-4xl mx-auto">
            
            {/* Article Meta Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="font-bold text-white uppercase tracking-wider">Productivity &amp; Security Editorial</span>
              </div>
              <div>7 Min Read • High Search Intent Article</div>
            </div>

            {/* Article Titles */}
            <div className="mb-8">
              <div className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-2">Selected Feature Guide</div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug mb-4">
                Why You Need a Secure PDF Editor with No Cloud Upload on Android
              </h2>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400 italic">
                <span>Core Focus:</span>
                <span className="text-rose-300">Complete guide to private PDF editing, Govt ID masking, offline merging, and document security.</span>
              </div>
            </div>

            {/* Article Body Content */}
            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                Every day, millions of smartphone users convert bank statements, tax audits, employment contracts, and scans of national passports using free online web converters. What most people do not realize is that when you tap "Convert" on a cloud-hosted tool, <strong className="text-white">your confidential document is transmitted to a remote server</strong> located thousands of miles away.
              </p>

              <h3 className="text-xl font-bold text-white pt-2">
                The Need for a Private PDF Editor App for Android
              </h3>
              <p>
                Transmitting unencrypted personal documents over public Wi-Fi or third-party web servers introduces severe risks, from identity theft and unmasked national ID data scraping to corporate NDA violations. By choosing a dedicated <strong className="text-white">secure PDF editor with no cloud upload</strong>, you retain 100% control over your files. PDFZero acts as a truly <strong className="text-white">private PDF editor app for Android</strong>, executing all rendering, parsing, and cryptographic operations purely on local CPU hardware.
              </p>

              <h3 className="text-xl font-bold text-white pt-3">
                How to Mask Aadhaar Card Number in PDF &amp; Redact Sensitive Data
              </h3>
              <p>
                If you are looking for <strong className="text-white">how to mask Aadhaar card number in PDF</strong> or searching for a dependable <strong className="text-white">app to hide confidential text in PDF</strong> files, PDFZero makes privacy effortless. With our intelligent Govt ID Masker, you can automatically black out the first 8 digits of Indian Aadhaar numbers or US Social Security Numbers (SSN) before emailing copies to hotels, landlords, or service providers.
              </p>
              <p>
                Additionally, when converting photos taken with your smartphone camera, PDFZero allows you to immediately <strong className="text-white">remove EXIF metadata from PDF images</strong>—stripping hidden GPS coordinates, device serial numbers, and home timestamps before sharing.
              </p>

              <h3 className="text-xl font-bold text-white pt-3">
                Offline PDF Merger App for Android with Built-in Compression
              </h3>
              <p>
                Whether you need a fast <strong className="text-white">offline PDF merger app for Android</strong> to combine multiple receipts and reports into a single file, or an efficient <strong className="text-white">offline PDF compressor for Android</strong> that reduces file sizes by 50% to 85% for WhatsApp and email, PDFZero works seamlessly with zero internet connection.
              </p>

              <h3 className="text-xl font-bold text-white pt-3">
                Legal Bates Stamping, ID Stitching &amp; Academic LaTeX Exports
              </h3>
              <p>
                PDFZero is designed with specialized tools for lawyers, students, and engineers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-300">
                <li>
                  <strong className="text-white">Legal Discovery:</strong> Execute sequential <strong className="text-white">offline PDF Bates stamping on Android</strong> with customized case prefixes, date stamps, and numbering across hundreds of court exhibits.
                </li>
                <li>
                  <strong className="text-white">Smart ID Scanning:</strong> Easily <strong className="text-white">stitch front and back ID card on one page app</strong> layout, cropping and aligning both sides of your Driver's License onto a single printable A4 sheet.
                </li>
                <li>
                  <strong className="text-white">Developer &amp; Math Workflows:</strong> Seamlessly <strong className="text-white">convert PDF to LaTeX offline app</strong> mode to extract formulas and structured text into clean <code className="text-rose-300 font-mono text-xs">.tex</code> and Markdown formats without sending research data to external APIs.
                </li>
              </ul>

              <h3 className="text-xl font-bold text-white pt-4">
                How to Edit and Protect Your PDFs Privately in 3 Easy Steps:
              </h3>
              <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0">1</div>
                  <div>
                    <strong className="text-white">Select Your Tool:</strong> Open PDFZero and choose from 25+ offline utilities (Govt ID Masker, Watermark, Merge, Compress, OCR, or LaTeX converter).
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0">2</div>
                  <div>
                    <strong className="text-white">Choose Your Local File:</strong> Select documents or images from your device storage or capture photos with the AI Camera Scanner.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0">3</div>
                  <div>
                    <strong className="text-white">Instant Local Save:</strong> Tap process and save the finished PDF directly to your device. No cloud upload, no waiting, 100% confidential.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: FAQS ACCORDION */}
        <section className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Technical &amp; Privacy Questions Answered
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Everything you need to know about offline processing, ID card masking, OCR scanning, and Google Play compliance.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-bold text-white text-base sm:text-lg">
                      {faq.q}
                    </span>
                    <div className="p-1 rounded-full bg-white/5 shrink-0 text-white/70">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 6: FINAL CTA BANNER */}
        <section className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-rose-950/50 via-pink-950/40 to-slate-900/50 border border-rose-500/30 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-rose-400/30 mx-auto mb-6 shadow-2xl shadow-rose-950/50 p-1 bg-gradient-to-b from-rose-500/30 to-transparent">
              <img
                src="/pdfzero.jpg"
                alt="PDFZero App Icon"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Take Back Your Document Privacy
            </h2>
            
            <p className="text-slate-300 text-base sm:text-xl leading-relaxed mb-8">
              Join thousands of professionals, lawyers, and students editing PDFs securely on Android. 100% offline, zero cloud uploads, and unlimited conversions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-white/90 font-black text-sm shadow-2xl shadow-white/20 transition-all hover:scale-105"
              >
                <Download className="w-5 h-5 text-rose-600" />
                <span>Install PDFZero Free on Google Play</span>
              </a>
              <a
                href="/pdfzero/privacy-policy"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>View Privacy Policy</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Persistent Floating Bottom Bar on Mobile/Desktop */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-t border-white/10 px-4 py-3.5 animate-fadeIn">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/pdfzero.jpg"
                alt="PDFZero Icon"
                className="w-10 h-10 rounded-xl object-cover shadow-md border border-white/15 shrink-0"
              />
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-white">PDFZero: Universal Offline Toolkit</div>
                <div className="text-xs text-slate-400">Zero Cloud Uploads • Govt ID Masker • 4.9 ★ Android</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/pdfzero/privacy-policy"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>Privacy Policy</span>
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get on Google Play</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 bg-[#07090e] text-xs text-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 Medhastone. All rights reserved. PDFZero (com.pdfzero).
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="hover:text-white transition-colors">Portfolio</button>
            <a href="/play-games" className="hover:text-white transition-colors">Free Web Games</a>
            <a href="/pdfzero/privacy-policy" className="text-rose-400 font-bold hover:text-rose-300 transition-colors">Privacy Policy</a>
            <a href="mailto:medhastone@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
