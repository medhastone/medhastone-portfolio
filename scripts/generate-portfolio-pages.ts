import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

const PORTFOLIO_PROJECTS = {
  parkdock: {
    id: 'parkdock',
    title: 'ParkDock',
    category: 'Utility & Automotive',
    heroText: 'The ultimate co-pilot for your daily commute and vehicle management.',
    image: '/parkdock.jpg',
    description: 'Your everyday driver companion - Smart vehicle management, parking tools, calculators, and a driving dashboard.',
    techStack: ['React', 'Geolocation API', 'IndexedDB', 'Framer Motion'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.aistudio.parkdock.a1b2c3d4e5',
    color: '#3B82F6'
  },
  medijourney: {
    id: 'medijourney',
    title: 'Medi Journey',
    category: 'Health & Wellness',
    heroText: 'A comprehensive, offline-first health tracking application.',
    image: '/medi.jpg',
    description: 'A highly secure, offline-first personal medical assistant designed to track vitals, medications, and health timelines with Gemini AI integration.',
    techStack: ['Room Database', 'Health Connect', 'Gemini AI API', 'Google Drive Sync'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.medijourney',
    color: '#14B8A6'
  },
  brainmaze: {
    id: 'brainmaze',
    title: 'Brain Maze Master',
    category: 'Puzzle & Cognitive Game',
    heroText: 'Elevating cognitive training through beautiful, gamified puzzles.',
    image: '/brainmaze.jpg',
    description: 'Gamified cognitive puzzle experience featuring custom 2D geometric silhouettes and fluid kinetic animations.',
    techStack: ['HTML5 Canvas', 'WebGL', 'Howler.js', 'React Engine'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.brainmaze.master',
    color: '#6366F1'
  },
  rojgarbahi: {
    id: 'rojgarbahi',
    title: 'RojgarBahi',
    category: 'Finance & Utility',
    heroText: 'Digitizing the traditional ledger for the modern workforce.',
    image: '/rojgar logo.jpg',
    description: 'Robust business utility for workforce management and high-frequency daily ledger tracking tailored for small businesses.',
    techStack: ['TypeScript', 'React', 'Local Storage', 'PDF-lib'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.aistudio.rojgarbahi.finance',
    color: '#A855F7'
  },
  pdfzero: {
    id: 'pdfzero',
    title: 'PDFZero',
    category: 'Privacy & Utility Tool',
    heroText: 'Zero-knowledge, browser-based PDF processing and manipulation.',
    image: '/pdfzero.jpg',
    description: 'Client-side PDF utility that processes documents locally on your device with zero data transmission to external servers.',
    techStack: ['PDF.js', 'WebAssembly', 'Service Workers', 'React'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.pdfzero',
    color: '#F43F5E'
  },
  lexibrain: {
    id: 'lexibrain',
    title: 'LexiBrain: Find Hidden Words',
    category: 'Word Puzzle & Brain Training',
    heroText: 'Offline word search game meets an interactive Vocabulary Vault with native audio pronunciation.',
    image: '/lexibrain.svg',
    description: 'Dynamic procedural word search puzzle game featuring the Vocabulary Vault, Free Dictionary definitions, native Android TTS pronunciation, cozy themes, and 100% offline Room DB privacy.',
    techStack: ['Android Kotlin', 'Room DB', 'Native TTS Engine', 'Material Design 3'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.lexibrain.hiddenwords',
    color: '#8B5CF6'
  }
};

function generateParkDockHtml(): string {
  const pageUrl = "https://zentova.in/parkdock";
  const imageUrl = "https://zentova.in/parkdock.jpg";
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.aistudio.parkdock.a1b2c3d4e5";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "ParkDock - Smart Parking Memory & Driver Utility",
      "operatingSystem": "Android 8.0+",
      "applicationCategory": "Auto & Vehicles",
      "applicationSubCategory": "Parking & Vehicle Management",
      "description": "Never forget where you parked again. ParkDock is the all-in-one smart parking locator, live walking compass, digital glovebox vault, and fuel expense tracker for Android.",
      "image": imageUrl,
      "url": pageUrl,
      "downloadUrl": playStoreUrl,
      "installUrl": playStoreUrl,
      "fileSize": "14MB",
      "softwareVersion": "2.4.0",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "2480",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "One-Tap Smart Parking Memory with Multi-Level Floor & Pillar tagging",
        "Live Compass & Walking Radar Return Navigation",
        "Parking Meter Countdown Timer with Fine-Saver alerts",
        "Encrypted Digital Glovebox with biometric app lock",
        "Driver Expense & Real Fuel Mileage Analytics",
        "Offline Map Caching for underground parking basements",
        "Truck Axle & Gross Vehicle Weight Calculator"
      ],
      "author": {
        "@type": "Organization",
        "name": "Medhastone Automotive Software Labs",
        "url": "https://zentova.in/"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does ParkDock find my car if I am parked in an underground basement with no GPS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ParkDock is purpose-built for GPS-denied environments like basement parking lots and multi-level garages. In addition to pinning your last-known GPS coordinates at the entrance, ParkDock enables one-tap indoor tagging: record the building name, exact floor level, pillar code (e.g., Pillar C-14), and snap an instant photo of nearby markers. Furthermore, ParkDock's built-in offline map caching and step-by-step breadcrumb tracking operate 100% locally without requiring internet access."
          }
        },
        {
          "@type": "Question",
          "name": "Is my vehicle information and document vault stored safely on ParkDock?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your privacy is absolute. ParkDock strictly adheres to a zero-telemetry, zero-cloud architecture. All GPS coordinates, vehicle registration details, driving expenses, and document images (Driver's License, RC Book, Insurance) are encrypted and stored locally on your physical device using AES-256 standards. ParkDock does not upload, sell, or analyze your location data."
          }
        },
        {
          "@type": "Question",
          "name": "How does the Parking Meter Timer prevent expensive parking fines?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When you park in a metered bay or time-restricted zone, enter the allowed parking duration. ParkDock sets a high-priority background countdown timer that sends proactive notification alerts before your time runs out (customizable at 15-minute, 10-minute, and 5-minute intervals). The app also displays a real-time 'Fines Avoided' metric to celebrate every dollar saved."
          }
        },
        {
          "@type": "Question",
          "name": "Can I manage multiple vehicles such as a family car, a motorcycle, and an EV in ParkDock?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! ParkDock's 'My Vehicles' Garage allows unlimited vehicle profiles. You can add sedans, SUVs, motorcycles, scooters, commercial trucks, or electric vehicles (EVs). Each vehicle maintains its own nickname, license plate number, fuel/power type, parking history, and maintenance log."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://zentova.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": "https://zentova.in/#portfolio"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "ParkDock",
          "item": pageUrl
        }
      ]
    }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ParkDock: Smart Parking, Car Locator & Digital Glovebox App for Android</title>
  <meta name="description" content="Never forget where you parked again. ParkDock is the #1 smart parking app, offline car locator, digital vehicle glovebox, and driver expense tracker for Android. Works in underground basements with zero internet." />
  <meta name="keywords" content="smart parking app, find my parked car, car locator android, never forget where you parked, parking meter timer app, digital vehicle glovebox, driver expense tracker, offline parking map, multi-level parking locator, parking spot reminder, vehicle maintenance tracker, car parking memory app, fuel mileage calculator android, underground parking tracker, find my car without internet" />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="Medhastone" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="Never Forget Where You Parked: ParkDock for Android" />
  <meta property="og:description" content="One-tap parking memory, live walking compass, encrypted digital glovebox, and driver fuel expense analytics. Download free on Google Play." />
  <meta property="og:image" content="${imageUrl}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@Medhastone" />
  <meta name="twitter:url" content="${pageUrl}" />
  <meta name="twitter:title" content="ParkDock: Ultimate Smart Parking & Driver Utility App" />
  <meta name="twitter:description" content="Never forget where you parked again. Download ParkDock on Google Play." />
  <meta name="twitter:image" content="${imageUrl}" />

  <link rel="icon" type="image/jpeg" href="/parkdock.jpg" />
  <link rel="stylesheet" href="/static.css" />
  <style>
    body {
      background-color: #07090e;
      color: #f1f5f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>

  ${schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`).join('\n  ')}
</head>
<body class="min-h-screen bg-[#07090e] text-slate-100 selection:bg-blue-500/30 selection:text-white">
  <div id="root">
    <!-- Server-rendered SEO & Visual Shell for instant crawler indexing -->
    <header class="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
          <span class="font-bold tracking-widest text-xs uppercase">&larr; Back to Portfolio</span>
        </a>
        <div class="flex items-center gap-3">
          <img src="/parkdock.jpg" alt="ParkDock App Icon" class="w-10 h-10 rounded-xl object-cover ring-1 ring-blue-500/40" />
          <span class="font-black text-lg tracking-wider text-white">PARKDOCK PRO</span>
        </div>
        <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25">
          Get on Google Play
        </a>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div class="max-w-3xl mb-12">
        <div class="inline-block px-3.5 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          ★ 4.9 RATED ON GOOGLE PLAY // ULTIMATE DRIVER UTILITY
        </div>
        <h1 class="text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Never Forget Where You Parked Again.
        </h1>
        <p class="text-xl text-slate-300 leading-relaxed font-normal mb-8">
          Meet <strong>ParkDock</strong>: The all-in-one smart parking locator, live walking compass, encrypted digital glovebox vault, and fuel expense tracker for Android. Works in underground basements, multi-level garages, and airport lots with zero internet required.
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="inline-block hover:scale-105 transition-transform">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" class="h-14" />
          </a>
        </div>
      </div>

      <!-- Feature Highlights -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">1. One-Tap Parking Memory</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Instant GPS Pinning, Indoor Multi-Level Floor & Pillar IDs, Photo Attachments, and Multi-Vehicle selection.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">2. Live Radar & Walking Compass</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Real-time directional compass heading, straight-line distance radar, and OpenStreetMap pedestrian return directions.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">3. Parking Meter Timer</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Proactive expiry alerts, countdown notifications, and fine-saver metrics to prevent expensive parking tickets.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">4. Encrypted Digital Glovebox</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Local AES-256 biometric storage for Driver's License, RC Book, Insurance Policy, and PUC certificates.</p>
        </div>
      </div>
    </main>
  </div>

  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}

function generateBrainMazeHtml(): string {
  const pageUrl = "https://zentova.in/brainmaze";
  const imageUrl = "https://zentova.in/brainmaze.jpg";
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.brainmaze.master";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Brain Maze Master: Offline Maze Puzzle Game & Brain IQ Training",
      "operatingSystem": "Android 8.0+",
      "applicationCategory": "GameApplication",
      "applicationSubCategory": "Puzzle & Brain Games",
      "description": "Master 1,000+ hand-tailored and procedurally balanced labyrinths. Featuring 18+ artistic geometric & silhouette shapes, 20+ collectible heroes with superpowers, a scientific Brain IQ test engine, and 100% offline autonomy for Android.",
      "image": imageUrl,
      "url": pageUrl,
      "downloadUrl": playStoreUrl,
      "installUrl": playStoreUrl,
      "fileSize": "22MB",
      "softwareVersion": "3.2.0",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "4820",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "1,000 Progressive Levels across 5 Difficulty Tiers (Easy to Master)",
        "18+ Artistic Geometric & Silhouette Maze Shapes (Rockets, Hearts, Stars, Castles, Cats, etc.)",
        "Dedicated Brain IQ Test Engine with Algorithmic Graph Benchmarking",
        "20+ Collectible Heroes Across 6 Rarity Tiers with Active Skills & Powers",
        "Lush Visual Themes & Fluid Kinetic Trail Renderers (Neon Glow, Living Vine)",
        "Secret Vaults & Mystery Chests with Hidden Key Exploration",
        "Daily Rewards & 6-Slice Prize Spinner Lucky Wheel",
        "Dynamic ExoPlayer Multi-Track Audio & Multi-Level Tactile Haptics (100% Offline)"
      ],
      "author": {
        "@type": "Organization",
        "name": "Medhastone Mobile Gaming & Cognitive Neuroscience Lab",
        "url": "https://zentova.in/"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I play Brain Maze Master completely offline without Wi-Fi or mobile data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, 100%! Brain Maze Master was engineered specifically for offline autonomy. All 1,000 progressive levels, 18+ silhouette shapes, 20+ collectible heroes, and audio tracks are stored locally on your device. It requires zero internet connection, zero mobile data, and zero Wi-Fi, making it the ideal puzzle companion for long airplane flights, underground subway commutes, and off-grid relaxation."
          }
        },
        {
          "@type": "Question",
          "name": "How does the dedicated Brain IQ Test Engine work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Brain IQ Test Mode benchmarks your real-time performance against optimal mathematical path algorithms (such as Dijkstra and A* search). It analyzes your total moves taken relative to the shortest possible path, penalizes unnecessary backtracking, and factors in your solve time against target baselines to award 1 to 3 IQ Stars, bonus Diamonds, and log your Personal Best IQ score."
          }
        },
        {
          "@type": "Question",
          "name": "What makes Brain Maze Master different from standard square maze games?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standard maze games generate repetitive, square-grid labyrinths that quickly become monotonous. Brain Maze Master features over 18 artistic silhouettes—including Rockets, Hearts, Stars, Castles, Cats, Trees, and Butterflies. Furthermore, it incorporates 20+ collectible heroes (with active skills like speed boosts, wall-smashing, and optimal path reveals), mystery treasure vaults, and custom trail renderers like Neon Glow and Living Vine."
          }
        },
        {
          "@type": "Question",
          "name": "Are the 20+ heroes unlockable for free through gameplay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Every single hero across all 6 rarity tiers (from Starter Web Slinger to Divine Godzilla / Speedster) can be earned completely through regular gameplay. Players earn coins and rare diamonds by completing levels, discovering secret vault keys, maintaining daily login streaks, and spinning the daily Lucky Wheel."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://zentova.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": "https://zentova.in/#portfolio"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Brain Maze Master",
          "item": pageUrl
        }
      ]
    }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Brain Maze Master: #1 Offline Maze Puzzle Game & Brain IQ Training</title>
  <meta name="description" content="Play the #1 offline maze puzzle game for Android! Conquer 1,000+ labyrinth levels across 18+ artistic silhouette shapes (Rockets, Cats, Stars), unlock 20+ heroes with powers, and test your spatial IQ without Wi-Fi." />
  <meta name="keywords" content="offline maze puzzle games, brain maze game, maze escape puzzle android, best offline logic puzzle games, iq test maze game, free offline maze games without wifi, labyrinth puzzle game with heroes and powers, brain training maze puzzle with custom shapes, relaxing maze game for adults and kids, best maze escape game with 1000 levels, offline brain games for long flights and commutes" />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="game" />
  <meta property="og:site_name" content="Medhastone" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="Conquer 1,000+ Labyrinths: Brain Maze Master for Android" />
  <meta property="og:description" content="1,000 progressive levels, 18+ silhouette shapes, 20+ collectible heroes, and an algorithmic Brain IQ Test Engine. Zero Wi-Fi required. Download free on Google Play." />
  <meta property="og:image" content="${imageUrl}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@Medhastone" />
  <meta name="twitter:url" content="${pageUrl}" />
  <meta name="twitter:title" content="Brain Maze Master: The Ultimate Offline Logic Puzzle Game" />
  <meta name="twitter:description" content="1,000+ labyrinth levels with custom shapes and superpowers. Download free on Google Play." />
  <meta name="twitter:image" content="${imageUrl}" />

  <link rel="icon" type="image/jpeg" href="/brainmaze.jpg" />
  <link rel="stylesheet" href="/static.css" />
  <style>
    body {
      background-color: #07090e;
      color: #f1f5f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>

  ${schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`).join('\n  ')}
</head>
<body class="min-h-screen bg-[#07090e] text-slate-100 selection:bg-indigo-500/30 selection:text-white">
  <div id="root">
    <!-- Server-rendered SEO & Visual Shell for instant crawler indexing -->
    <header class="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
          <span class="font-bold tracking-widest text-xs uppercase">&larr; Back to Portfolio</span>
        </a>
        <div class="flex items-center gap-3">
          <img src="/brainmaze.jpg" alt="Brain Maze Master App Icon" class="w-10 h-10 rounded-xl object-cover ring-1 ring-indigo-500/40" />
          <span class="font-black text-lg tracking-wider text-white">BRAIN MAZE MASTER</span>
        </div>
        <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25">
          Get on Google Play
        </a>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div class="max-w-3xl mb-12">
        <div class="inline-block px-3.5 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
          ★ 4.9 RATED ON GOOGLE PLAY // 1,000 LEVELS // 100% OFFLINE
        </div>
        <h1 class="text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Conquer 1,000+ Labyrinths. Elevate Your Spatial IQ.
        </h1>
        <p class="text-xl text-slate-300 leading-relaxed font-normal mb-8">
          Meet <strong>Brain Maze Master</strong>: The premier offline maze puzzle game, brain training escape challenge, and logic labyrinth for Android. Features 18+ artistic silhouette shapes (Rockets, Cats, Castles, Hearts), 20+ collectible heroes with superpowers, and zero Wi-Fi required.
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="inline-block hover:scale-105 transition-transform">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" class="h-14" />
          </a>
        </div>
      </div>

      <!-- Feature Highlights -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">1. 1,000 Levels & 5 Tiers</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Easy, Medium, Hard, Expert, and Master modes built for casual relaxation up to puzzle veteran mastery.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">2. 18+ Silhouette Shapes</h2>
          <p class="text-xs text-slate-300 leading-relaxed">No more boring squares. Navigate through Rockets, Hearts, Stars, Castles, Cats, Butterflies, and Trees.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">3. Brain IQ Test Engine</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Mathematical graph algorithm benchmarking evaluates moves, solve times, and spatial reasoning in real time.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">4. 20+ Hero Champions</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Unlockable heroes across 6 rarity tiers featuring active powers like wall-smash, speed bursts, and mistake shields.</p>
        </div>
      </div>
    </main>
  </div>

  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}

function generateRojgarBahiHtml(): string {
  const pageUrl = "https://zentova.in/rojgarbahi";
  const imageUrl = "https://zentova.in/rojgar%20logo.jpg";
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.aistudio.rojgarbahi.finance";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "RojgarBahi: Free Offline Labour Attendance, Wage & Construction Calculator App",
      "operatingSystem": "Android 8.0+",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Workforce & Site Accounting",
      "description": "The #1 offline-first labour attendance register, daily wage tracker, and construction material estimator for Indian Thekedars, Munshis, and Mistris. Includes Brick/Cement calculators, BOCW scheme assistance, Site-Halt wage protection, and 14 Indian languages.",
      "image": imageUrl,
      "url": pageUrl,
      "downloadUrl": playStoreUrl,
      "installUrl": playStoreUrl,
      "fileSize": "16MB",
      "softwareVersion": "3.1.0",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "3940",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "featureList": [
        "1-Tap Smart Haziri & Dihaari Ledger with Overtime and Advance Deductions",
        "Civil Trade Calculators Hub (Brick, Cement, Sand, Plaster, Peti Theka Profit Margin)",
        "BOCW Government Welfare Scheme Tracker & e-Shram Yojana Hub",
        "Site-Halt & Delay Audit Logger with timestamped geo-photo evidence",
        "Written Rate Agreement format and Payment Dispute Resolution slips",
        "Shramik Digital Vault & PDF Resume/Biodata builder for higher daily rates",
        "100% Offline Dynamic QR-Passbook sync between Thekedar and Worker phones",
        "Tool Locker & Equipment Inventory tracker to prevent loss of power tools",
        "Batta (Food allowance) and Village Remittance ledger",
        "Bolne Wala Hisaab (Voice Audio Summary) in 14 Indian regional languages"
      ],
      "author": {
        "@type": "Organization",
        "name": "Medhastone Construction Workforce Technologies",
        "url": "https://zentova.in/"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does RojgarBahi require an active internet connection or mobile data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No! RojgarBahi was engineered from the ground up as a 100% offline-first application. All worker records, daily attendance haziri, civil calculations, and tool inventories are stored locally and encrypted on your device. You can use it in underground basements, rural road projects, and remote areas with zero Wi-Fi or cellular network."
          }
        },
        {
          "@type": "Question",
          "name": "How does the Dynamic QR Passbook Sync work between Thekedar and Worker?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When a Thekedar finalizes weekly attendance or payout, RojgarBahi generates a dynamic QR passbook on the Thekedar's screen. The worker simply opens RojgarBahi on their own phone and scans the QR code. The verified attendance and balance slip transfers instantly from phone to phone—with zero internet, zero cloud servers, and zero mobile data."
          }
        },
        {
          "@type": "Question",
          "name": "How is RojgarBahi different from generic apps like KhataBook or PagarBook?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generic accounting apps only track simple debits and credits. RojgarBahi is purpose-built for India's construction industry and daily wage economy. It includes specialized tools that generic apps lack: Brick/Cement/Sand civil calculators, Site-Halt delay photo logging (to protect wages during rain/stoppages), Tool Locker tracking, BOCW government welfare scheme guides, Shramik Biodata PDF builder, and Batta (food allowance) accounting."
          }
        },
        {
          "@type": "Question",
          "name": "Is RojgarBahi available in regional Indian languages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! RojgarBahi supports 14 Indian languages, including Hindi, Marathi, Bengali, Telugu, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, Urdu, Maithili, and Bhojpuri. It also features 'Bolne Wala Hisaab' (Voice Text-to-Speech) so non-literate workers can listen to their weekly settlement."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://zentova.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": "https://zentova.in/#portfolio"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "RojgarBahi",
          "item": pageUrl
        }
      ]
    }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RojgarBahi: Free Offline Labour Attendance & Daily Wage App for Thekedars</title>
  <meta name="description" content="Manage labour attendance (haziri), daily wages, overtime, advances, and construction civil calculators 100% offline. Built for Indian Thekedars, Munshis & Mistris in 14 regional languages." />
  <meta name="keywords" content="labour attendance app, thekedar hisaab app, pagar book app, hisaab kitab app, daily wage tracker, overtime calculator app, construction calculator, mistri calculator app, brick cement sand calculation app, offline labour haziri book without internet, shramik biodata maker pdf, construction site halt report app, bocw scheme eligibility checker app, daily wage slip generator whatsapp, tool locker register for site" />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="Medhastone" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="RojgarBahi: Digital Ledger for Thekedars & Construction Workforce" />
  <meta property="og:description" content="1-tap labour attendance, civil brick/cement calculators, BOCW scheme tracker, and 100% offline QR passbook sync. Download free on Google Play." />
  <meta property="og:image" content="${imageUrl}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@Medhastone" />
  <meta name="twitter:url" content="${pageUrl}" />
  <meta name="twitter:title" content="RojgarBahi: Labour Attendance & Construction Hisaab App" />
  <meta name="twitter:description" content="Ditch the paper diary. Manage labour haziri, daily wages, and civil calculators offline." />
  <meta name="twitter:image" content="${imageUrl}" />

  <link rel="icon" type="image/jpeg" href="/rojgar logo.jpg" />
  <link rel="stylesheet" href="/static.css" />
  <style>
    body {
      background-color: #07090e;
      color: #f1f5f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>

  ${schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`).join('\n  ')}
</head>
<body class="min-h-screen bg-[#07090e] text-slate-100 selection:bg-purple-500/30 selection:text-white">
  <div id="root">
    <!-- Server-rendered SEO & Visual Shell for instant crawler indexing -->
    <header class="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
          <span class="font-bold tracking-widest text-xs uppercase">&larr; Back to Portfolio</span>
        </a>
        <div class="flex items-center gap-3">
          <img src="/rojgar logo.jpg" alt="RojgarBahi App Icon" class="w-10 h-10 rounded-xl object-cover ring-1 ring-purple-500/40" />
          <span class="font-black text-lg tracking-wider text-white">ROJGARBAHI</span>
        </div>
        <div class="flex items-center gap-3">
          <a href="/rojgarbahi/privacy-policy" class="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs transition-all">
            Privacy Policy
          </a>
          <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25">
            Get on Google Play
          </a>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div class="max-w-3xl mb-12">
        <div class="inline-block px-3.5 py-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
          ★ 4.9 RATED ON GOOGLE PLAY // #1 THEKEDAR & MISTRI HISAAB // 100% OFFLINE
        </div>
        <h1 class="text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Ditch the Paper Diary. Manage Labour Haziri & Site Calculations Offline.
        </h1>
        <p class="text-xl text-slate-300 leading-relaxed font-normal mb-8">
          Meet <strong>RojgarBahi</strong>: India's dedicated 100% offline daily wage tracker, civil material estimator, and labour attendance ledger for Thekedars, Site Supervisors (Munshis), and Mistris. Includes Brick/Cement calculators, BOCW scheme tracking, site-halt wage protection, and 14 Indian languages.
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="inline-block hover:scale-105 transition-transform">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" class="h-14" />
          </a>
          <a href="/rojgarbahi/privacy-policy" class="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all flex items-center gap-2">
            <span>Privacy Policy</span>
          </a>
        </div>
      </div>

      <!-- Feature Highlights -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">1. Smart Haziri & Dihaari</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Mark attendance in seconds, auto-calculate overtime and advance deductions, and share payment slips on WhatsApp.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">2. Civil Material Calculators</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Calculate exact counts of Bricks, Cement bags, Sand tonnage, and Peti Theka profit margins before quoting contracts.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">3. Site-Halt Wage Protection</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Capture timestamped geo-photo proof of rain, material shortages, or power cuts to defend worker wages and claims.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">4. 100% Offline QR Sync</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Sync worker attendance slips between phones via dynamic QR code with zero mobile data, zero Wi-Fi, and total privacy.</p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-10 text-center text-xs text-slate-500 bg-[#06080d]">
      <div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; 2026 Medhastone. All rights reserved. RojgarBahi is a registered workforce & ledger utility.</div>
        <div class="flex items-center gap-6">
          <a href="/" class="hover:text-white transition-colors">Portfolio Home</a>
          <a href="/rojgarbahi/privacy-policy" class="text-purple-400 hover:text-purple-300 font-bold transition-colors">Privacy Policy</a>
          <a href="/play-games" class="hover:text-white transition-colors">Play Games</a>
          <a href="mailto:medhastone@gmail.com" class="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  </div>

  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}

function generateLexiBrainHtml(): string {
  const pageUrl = "https://zentova.in/lexibrain";
  const imageUrl = "https://zentova.in/lexibrain.svg";
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.lexibrain.hiddenwords";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "LexiBrain: Find Hidden Words - Offline Word Search Game & Vocabulary Builder",
      "operatingSystem": "Android 8.0+",
      "applicationCategory": "WordGame",
      "applicationSubCategory": "Educational Word Search & Vocabulary Brain Puzzle",
      "description": "Discover LexiBrain: Hidden Words - the premier offline word search game for Android. Featuring 500+ progressive puzzles, the revolutionary Vocabulary Vault with live Free Dictionary definitions, native Android TTS audio pronunciation, cozy board themes, and 100% offline Room DB privacy.",
      "image": imageUrl,
      "url": pageUrl,
      "downloadUrl": playStoreUrl,
      "installUrl": playStoreUrl,
      "fileSize": "22MB",
      "softwareVersion": "1.3.0",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1940",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "100% Offline Word Search Playable without Wi-Fi or cellular data",
        "Interactive Vocabulary Vault with Free Dictionary definitions and etymology",
        "Native Android Text-To-Speech (TTS) audio pronunciation for every discovered word",
        "Procedural 8-Way Matrix Grid Engine scaling from 5x5 warm-ups to 10x10 master puzzles",
        "Material 3 Aesthetic Themes: Midnight Dark OLED, Classic Light, Cozy Wood, and Neon Pulse",
        "Accessible 48dp touch targets and dynamic font scaling for seniors and adult puzzle lovers",
        "8 Thematic Curated Chapters across 500+ winding journey nodes with 3-star scoring",
        "Zero tracking, zero mandatory logins, and encrypted local Room Database storage"
      ],
      "author": {
        "@type": "Organization",
        "name": "Medhastone",
        "url": "https://zentova.in/"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is LexiBrain playable 100% offline without Wi-Fi or mobile data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. LexiBrain is engineered offline-first. All 500+ level matrices, procedural generation algorithms, and cached dictionary entries run locally on your device in an encrypted Room Database. You can play smoothly in airplane mode or in remote areas with zero network connectivity."
          }
        },
        {
          "@type": "Question",
          "name": "How does the Vocabulary Vault work with live definitions and pronunciation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike standard word searches that discard words once circled, LexiBrain saves every completed term into your personal Vocabulary Vault. Tapping any word opens an interactive memory flashcard displaying its phonetic IPA, part of speech, definition, contextual sentence, etymology, and native Android Text-to-Speech audio pronunciation."
          }
        },
        {
          "@type": "Question",
          "name": "Is LexiBrain suitable for seniors and non-native English language learners?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. LexiBrain follows strict Material Design 3 accessibility standards, featuring large 48dp touch targets to prevent mis-swipes, high-contrast typography to reduce eye strain, and support for Android system-wide font scaling. ESL learners use it to expand their vocabulary while listening to natural American/British pronunciation."
          }
        },
        {
          "@type": "Question",
          "name": "Are there invasive paywalls or forced ad subscriptions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. LexiBrain offers distraction-free play with zero mandatory paywalls or subscriptions. Hints and assists can be earned through gameplay streaks or via completely optional rewarded videos."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://zentova.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": "https://zentova.in/#portfolio"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "LexiBrain: Find Hidden Words",
          "item": pageUrl
        }
      ]
    }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LexiBrain: Find Hidden Words - Offline Word Search Game &amp; Vocabulary Builder</title>
  <meta name="description" content="Discover LexiBrain: Hidden Words (com.lexibrain.hiddenwords). The premier offline word search game for Android featuring the Vocabulary Vault, Free Dictionary definitions, native audio pronunciation, cozy themes, and 500+ progressive puzzles. Zero Wi-Fi needed." />
  <meta name="keywords" content="offline word search game, word search with definitions, vocabulary brain puzzle, relaxing word puzzle for adults, hidden words puzzle game, word finder with pronunciation, daily word puzzle offline, free word search puzzle no wifi, best word search game for seniors and adults, learn english words puzzle game, offline vocabulary builder app, interactive word memory cards, cozy word puzzle aesthetic board, classic word search with hints and powerups" />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="game" />
  <meta property="og:site_name" content="Medhastone" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="LexiBrain: Find Hidden Words - Offline Word Search &amp; Vocabulary Vault" />
  <meta property="og:description" content="Looking for a relaxing offline word search game? Discover LexiBrain: 500+ procedural levels, interactive memory cards, native TTS pronunciation, and 100% offline Room DB privacy." />
  <meta property="og:image" content="${imageUrl}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@Medhastone" />
  <meta name="twitter:url" content="${pageUrl}" />
  <meta name="twitter:title" content="LexiBrain: Find Hidden Words (com.lexibrain.hiddenwords)" />
  <meta name="twitter:description" content="The offline word search game that builds your vocabulary with live definitions and spoken audio pronunciation. Download free on Google Play." />
  <meta name="twitter:image" content="${imageUrl}" />

  <link rel="icon" type="image/svg+xml" href="/lexibrain.svg" />
  <link rel="stylesheet" href="/static.css" />
  <style>
    body {
      background-color: #07090e;
      color: #f1f5f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>

  ${schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`).join('\n  ')}
</head>
<body class="min-h-screen bg-[#07090e] text-slate-100 selection:bg-violet-500/30 selection:text-white">
  <div id="root">
    <!-- Server-rendered SEO & Visual Shell for Googlebot indexing -->
    <header class="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
          <span class="font-bold tracking-widest text-xs uppercase">&larr; Back to Portfolio</span>
        </a>
        <div class="flex items-center gap-4">
          <span class="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            100% Offline Capable
          </span>
          <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all">
            Get on Google Play
          </a>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-6 pt-12 pb-24">
      <div class="mb-12">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">
          com.lexibrain.hiddenwords • Offline Word Search Game
        </div>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
          Looking for a Relaxing Offline Word Search Game? Discover <span class="text-violet-400">LexiBrain: Hidden Words</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
          LexiBrain combines classic procedural word search puzzles with an interactive Vocabulary Vault. Enjoy live dictionary definitions, native Text-To-Speech (TTS) audio pronunciation, cozy themes, and 100% offline Room DB privacy without Wi-Fi.
        </p>

        <div class="flex flex-wrap items-center gap-4">
          <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black text-sm shadow-xl shadow-violet-600/30 hover:scale-105 transition-all">
            Install LexiBrain Free on Google Play
          </a>
          <a href="/lexibrain/privacy-policy" class="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all">
            Privacy Policy
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <div class="text-3xl font-black text-violet-400 mb-1">500+</div>
          <div class="text-xs font-bold uppercase text-slate-300">Procedural Grids</div>
          <div class="text-xs text-slate-500 mt-1">5x5 to 10x10 Master Matrices</div>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <div class="text-3xl font-black text-emerald-400 mb-1">100%</div>
          <div class="text-xs font-bold uppercase text-slate-300">Offline Playable</div>
          <div class="text-xs text-slate-500 mt-1">Zero Wi-Fi / Airplane Mode</div>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <div class="text-3xl font-black text-blue-400 mb-1">Native TTS</div>
          <div class="text-xs font-bold uppercase text-slate-300">Spoken Audio</div>
          <div class="text-xs text-slate-500 mt-1">Android TextToSpeech Engine</div>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <div class="text-3xl font-black text-amber-400 mb-1">Room DB</div>
          <div class="text-xs font-bold uppercase text-slate-300">Private Storage</div>
          <div class="text-xs text-slate-500 mt-1">Zero tracking / COPPA Safe</div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">1. Procedural Matrix Engine</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Dynamic 8-way word placement (horizontal, vertical, diagonal, and reverse) with fluid touch selection and haptic confirmation.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">2. The Vocabulary Vault</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Turns completed puzzles into interactive study cards with Free Dictionary definitions, phonetic IPA, etymology, and TTS audio pronunciation.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">3. Cozy Aesthetic Themes</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Built on Material 3 with 4 calibrated palettes: Midnight OLED Dark, Classic Light, Cozy Wood / Paper Craft, and Neon Pulse.</p>
        </div>
      </div>
    </main>
  </div>

  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}


function generatePdfZeroHtml(): string {
  const pageUrl = "https://zentova.in/pdfzero";
  const imageUrl = "https://zentova.in/pdfzero.jpg";
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.pdfzero";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PDFZero - 100% Offline Universal PDF Toolkit & Security Suite",
      "operatingSystem": "Android 8.0+",
      "applicationCategory": "ProductivityApplication",
      "applicationSubCategory": "PDF Editor, Scanner, Converter & Redaction Security Suite",
      "description": "Zero Cloud Uploads. PDFZero processes 100% of your PDFs, scanned IDs, bank statements, and tax records locally on your device. Features Govt ID Masker (Aadhaar/SSN), Anti-Leak Watermarks, Bates Stamping, PDF Compression, AI Camera Scanner, Offline OCR, and LaTeX/Markdown conversion.",
      "image": imageUrl,
      "url": pageUrl,
      "downloadUrl": playStoreUrl,
      "installUrl": playStoreUrl,
      "fileSize": "16MB",
      "softwareVersion": "2.1.0",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "2180",
        "bestRating": "5",
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "100% Offline PDF Processing with zero remote cloud server uploads",
        "Govt ID Masker: Auto-redacts Aadhaar, SSN, and National ID numbers",
        "Anti-Leak Watermarking: Burn custom, date-stamped watermarks across all pages",
        "Lossless & Strong PDF Compressor with live preview (50–85% size reduction)",
        "Bates Stamping: Sequential legal case numbering for court discovery",
        "AI Document Camera Scanner with auto-edge detection and shadow removal",
        "ID Card Stitcher: Aligns front and back of IDs onto a single A4 sheet",
        "Offline OCR: Converts unselectable scans into copyable, searchable text",
        "Universal Conversions: Image to PDF, PDF to Word, and Developer exports to LaTeX (.tex) & Markdown (.md)",
        "EXIF Metadata Cleaner: Purges hidden GPS coordinates and camera serials"
      ],
      "author": {
        "@type": "Organization",
        "name": "Medhastone",
        "url": "https://zentova.in/"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does PDFZero guarantee that my files never leave my phone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike web-based converters that upload documents to remote servers, PDFZero executes all PDF parsing, image conversions, OCR text extraction, and encryption 100% locally on your device hardware using standalone compiled WebAssembly and native C++ PDF binaries. All 25+ tools work seamlessly in Airplane Mode with zero internet connectivity."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Govt ID Masker and which documents does it support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Govt ID Masker automatically detects and masks sensitive identity numbers—including Indian Aadhaar (masking the first 8 digits), US Social Security Numbers (SSN), Driving Licenses, and National Passports—preventing identity theft before you share documents with third parties."
          }
        },
        {
          "@type": "Question",
          "name": "Does PDFZero impose file size limits or daily conversion caps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Because all computation occurs on your local processor rather than cloud infrastructure, PDFZero has zero artificial file size limits, zero hourly quotas, and no subscription paywalls."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://zentova.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": "https://zentova.in/#portfolio"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "PDFZero: 100% Offline Universal PDF Toolkit",
          "item": pageUrl
        }
      ]
    }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PDFZero: 100% Offline Universal PDF Toolkit | Zero Cloud Uploads</title>
  <meta name="description" content="Edit, merge, compress, redact, scan, and convert PDFs 100% offline on Android. Includes Govt ID Masker (Aadhaar/SSN), Anti-Leak Watermarking, Bates Stamping, Offline OCR, and LaTeX export." />
  <meta name="keywords" content="offline pdf merger app android, secure pdf editor no cloud upload, how to edit pdf without uploading to server, offline pdf compressor for android, private pdf editor app android, how to mask aadhaar card number in pdf, offline pdf bates stamping android, app to hide confidential text in pdf, remove exif metadata from pdf images, auto redact sensitive info in pdf android, stitch front and back id card on one page app, convert pdf to latex offline app, convert scanned handwritten notes to clear pdf, print 2 pages per sheet pdf android, remove shadow from document photo app" />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <!-- Open Graph -->
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="Medhastone" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="PDFZero - 100% Offline Universal PDF Toolkit (Zero Cloud Uploads)" />
  <meta property="og:description" content="Stop uploading sensitive bank statements and IDs to the cloud. Process, compress, redact, and convert PDFs 100% locally on Android." />
  <meta property="og:image" content="${imageUrl}" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@Medhastone" />
  <meta name="twitter:url" content="${pageUrl}" />
  <meta name="twitter:title" content="PDFZero: 100% Offline Universal PDF Toolkit" />
  <meta name="twitter:description" content="Zero Cloud Uploads. 25+ offline PDF tools: Govt ID Masker, Watermarking, Compressor, and OCR." />
  <meta name="twitter:image" content="${imageUrl}" />

  <link rel="icon" type="image/jpeg" href="/pdfzero.jpg" />
  <link rel="stylesheet" href="/static.css" />
  <style>
    body {
      background-color: #07090e;
      color: #f1f5f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>

  ${schemas.map(s => `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`).join('\n  ')}
</head>
<body class="min-h-screen bg-[#07090e] text-slate-100 selection:bg-rose-500/30 selection:text-white">
  <div id="root">
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
          <span class="font-bold tracking-widest text-xs uppercase">&larr; Back to Portfolio</span>
        </a>
        <div class="flex items-center gap-3">
          <img src="/pdfzero.jpg" alt="PDFZero Icon" class="w-8 h-8 rounded-lg object-cover border border-white/15 shadow-sm" />
          <span class="font-bold text-sm text-white hidden sm:inline">PDFZero</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            Zero Cloud Uploads
          </span>
          <a href="/pdfzero/privacy-policy" class="text-xs font-bold text-slate-300 hover:text-white transition-colors hidden sm:inline">
            Privacy Policy
          </a>
          <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all">
            Get on Google Play
          </a>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-6 pt-12 pb-24">
      <div class="mb-12 flex flex-col md:flex-row items-start md:items-center gap-6">
        <img src="/pdfzero.jpg" alt="PDFZero Official App Icon" class="w-24 h-24 md:w-28 md:h-28 rounded-3xl object-cover shadow-2xl border border-white/15 shrink-0" />
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-3">
            com.pdfzero • 100% Offline Universal PDF Toolkit
          </div>
          <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Why Upload Sensitive PDFs Online? Discover <span class="text-rose-400">PDFZero</span>
          </h1>
          <p class="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
            Most online converters require uploading your bank statements, tax records, IDs, and contracts to external servers. PDFZero processes everything 100% locally on your device with zero cloud uploads, zero data leak risks, and zero subscription paywalls.
          </p>

          <div class="flex flex-wrap items-center gap-4">
            <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black text-sm shadow-xl shadow-rose-600/30 hover:scale-105 transition-all">
              Install PDFZero Free on Google Play
            </a>
            <a href="/pdfzero/privacy-policy" class="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <div class="text-3xl font-black text-rose-400 mb-1">100%</div>
          <div class="text-xs font-bold uppercase text-slate-300">Offline Processing</div>
          <div class="text-xs text-slate-500 mt-1">Zero Cloud Uploads</div>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <div class="text-3xl font-black text-emerald-400 mb-1">25+</div>
          <div class="text-xs font-bold uppercase text-slate-300">Universal Tools</div>
          <div class="text-xs text-slate-500 mt-1">Security, Edit, Scan, Convert</div>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <div class="text-3xl font-black text-amber-400 mb-1">Govt ID</div>
          <div class="text-xs font-bold uppercase text-slate-300">Auto Masker</div>
          <div class="text-xs text-slate-500 mt-1">Aadhaar, SSN &amp; Tax IDs</div>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <div class="text-3xl font-black text-purple-400 mb-1">Unlimited</div>
          <div class="text-xs font-bold uppercase text-slate-300">File Conversions</div>
          <div class="text-xs text-slate-500 mt-1">No Paywalls or Hourly Limits</div>
        </div>
      </div>

      <!-- 4-Pillar Features -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">A. Privacy &amp; Security Tools</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Govt ID Masker (Aadhaar/SSN), Anti-Leak Watermarks, Permanent PDF Redaction, Bates Legal Stamping, AES-256 Encryption, and EXIF Metadata Stripping.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">B. Core PDF Editing &amp; Organization</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Fast PDF Merge &amp; Split, 50–85% Lossless PDF Compressor, Drag-and-drop Page Organizer, Digital Signatures, N-Up Printing, and Grayscale Ink Saver.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">C. AI Camera Scanner &amp; Utilities</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Edge Detection Document Scanner, ID Card Front &amp; Back Stitcher onto A4, Shadow &amp; Glare Remover, AI Background Remover, and Handwritten Notes Enhancer.</p>
        </div>
        <div class="p-6 rounded-2xl bg-[#0e1322] border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">D. Universal Conversions (100% Offline)</h2>
          <p class="text-xs text-slate-300 leading-relaxed">Image to PDF &amp; PDF to Image, Word to PDF (.docx), Developer Exports to LaTeX (.tex) &amp; Markdown (.md), and On-Device OCR Text Extraction.</p>
        </div>
      </div>

      <!-- Natural Editorial Guide Section with Inlined Keywords -->
      <div class="p-8 md:p-12 rounded-3xl bg-[#0c101c] border border-white/10 mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4">
          Editorial &amp; Feature Guide
        </div>
        <h2 class="text-2xl md:text-3xl font-black text-white mb-6">
          Why You Need a Secure PDF Editor with No Cloud Upload on Android
        </h2>

        <div class="space-y-6 text-sm text-slate-300 leading-relaxed">
          <p>
            When processing sensitive bank statements, tax audits, employment contracts, and scans of national passports, privacy should never be an afterthought. Choosing a dedicated <strong class="text-white">secure PDF editor with no cloud upload</strong> ensures that confidential data never leaves your smartphone. PDFZero operates as a fully on-device <strong class="text-white">private PDF editor app for Android</strong>, running all operations using local WebAssembly and compiled native binaries.
          </p>

          <h3 class="text-lg font-bold text-white pt-2">How to Mask Aadhaar Card Number in PDF &amp; Redact Sensitive Data</h3>
          <p>
            If you need to know <strong class="text-white">how to mask Aadhaar card number in PDF</strong> or want a reliable <strong class="text-white">app to hide confidential text in PDF</strong> documents, PDFZero provides one-tap automated redaction for national IDs. It blocks out the first 8 digits of Aadhaar or US SSNs while preserving formatting. Furthermore, you can instantly <strong class="text-white">remove EXIF metadata from PDF images</strong> to purge embedded GPS locations and camera serial numbers before sharing.
          </p>

          <h3 class="text-lg font-bold text-white pt-2">Offline PDF Merger App for Android &amp; Fast Compressor</h3>
          <p>
            As a versatile <strong class="text-white">offline PDF merger app for Android</strong>, PDFZero combines multiple scans, receipts, or notes into one structured document. Its high-efficiency <strong class="text-white">offline PDF compressor for Android</strong> reduces file sizes by up to 85% for swift WhatsApp or email sharing without blurriness.
          </p>

          <h3 class="text-lg font-bold text-white pt-2">Legal Discovery, ID Stitching &amp; Academic LaTeX Exports</h3>
          <p>
            Legal teams benefit from robust <strong class="text-white">offline PDF Bates stamping on Android</strong> for sequential case numbering across hundreds of trial exhibits. Students and researchers can easily <strong class="text-white">stitch front and back ID card on one page app</strong> layout for printing, or use our specialized tool to <strong class="text-white">convert PDF to LaTeX offline app</strong> mode for equations and academic documents.
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-10 bg-[#07090e] text-xs text-white/40">
      <div class="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; 2026 Medhastone. All rights reserved. PDFZero (com.pdfzero).</div>
        <div class="flex items-center gap-6">
          <a href="/" class="hover:text-white">Portfolio Home</a>
          <a href="/pdfzero/privacy-policy" class="text-rose-400 font-bold hover:text-rose-300">Privacy Policy</a>
          <a href="/play-games" class="hover:text-white">Play Games</a>
          <a href="mailto:medhastone@gmail.com" class="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>

  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}

function generatePrivacyPolicyHtml(id: string, proj: any): string {
  const pageUrl = `https://zentova.in/${id}/privacy-policy`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Privacy Policy - ${proj.title}</title>
  <meta name="description" content="Privacy Policy for ${proj.title}." />
  <link rel="canonical" href="${pageUrl}" />
  <link rel="icon" type="image/jpeg" href="${proj.image}" />
  <link rel="stylesheet" href="/static.css" />
</head>
<body class="bg-[#07090e] text-white">
  <div id="root">
    <div class="flex items-center justify-center min-h-screen bg-[#07090e] text-white p-8">
      <div class="max-w-2xl text-center">
        <h1 class="text-3xl font-bold mb-4">Privacy Policy - ${proj.title}</h1>
        <p class="text-white/60">Loading privacy policy...</p>
      </div>
    </div>
  </div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}


for (const [id, proj] of Object.entries(PORTFOLIO_PROJECTS)) {
  const targetDir = path.join(publicDir, id);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const privacyDir = path.join(targetDir, 'privacy-policy');
  if (!fs.existsSync(privacyDir)) {
    fs.mkdirSync(privacyDir, { recursive: true });
  }
  fs.writeFileSync(path.join(privacyDir, 'index.html'), generatePrivacyPolicyHtml(id, proj), 'utf-8');


  if (id === 'parkdock') {
    fs.writeFileSync(path.join(targetDir, 'index.html'), generateParkDockHtml(), 'utf-8');
    console.log(`Generated high-converting EEAT public/parkdock/index.html`);
    continue;
  }

  if (id === 'brainmaze') {
    fs.writeFileSync(path.join(targetDir, 'index.html'), generateBrainMazeHtml(), 'utf-8');
    console.log(`Generated high-converting EEAT public/brainmaze/index.html`);
    continue;
  }

  if (id === 'rojgarbahi') {
    fs.writeFileSync(path.join(targetDir, 'index.html'), generateRojgarBahiHtml(), 'utf-8');
    console.log(`Generated high-converting EEAT public/rojgarbahi/index.html`);
    continue;
  }

  if (id === 'lexibrain') {
    fs.writeFileSync(path.join(targetDir, 'index.html'), generateLexiBrainHtml(), 'utf-8');
    console.log(`Generated high-converting EEAT public/lexibrain/index.html`);
    continue;
  }

  if (id === 'pdfzero') {
    fs.writeFileSync(path.join(targetDir, 'index.html'), generatePdfZeroHtml(), 'utf-8');
    console.log(`Generated high-converting EEAT public/pdfzero/index.html`);
    continue;
  }

  const pageUrl = `https://zentova.in/${id}`;
  const imageUrl = `https://zentova.in${proj.image}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": proj.title,
    "operatingSystem": "Android, Web",
    "applicationCategory": proj.category,
    "description": proj.description,
    "image": imageUrl,
    "url": pageUrl,
    "author": {
      "@type": "Organization",
      "name": "Medhastone",
      "url": "https://zentova.in/"
    }
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${proj.title} - Medhastone Portfolio</title>
  <meta name="description" content="${proj.description.replace(/"/g, '&quot;')}" />
  <link rel="canonical" href="${pageUrl}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="${proj.title} - Medhastone Portfolio" />
  <meta property="og:description" content="${proj.description.replace(/"/g, '&quot;')}" />
  <meta property="og:image" content="${imageUrl}" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${pageUrl}" />
  <meta name="twitter:title" content="${proj.title} - Medhastone Portfolio" />
  <meta name="twitter:description" content="${proj.description.replace(/"/g, '&quot;')}" />
  <meta name="twitter:image" content="${imageUrl}" />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="stylesheet" href="/static.css" />
  <style>
    body {
      background-color: #0a0a0f;
      color: #ffffff;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>

  <script type="application/ld+json">
  ${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body class="min-h-screen bg-[#0a0a0f] text-white selection:bg-white/20">
  <div id="root">
    <header class="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
          <div class="p-2 rounded-full bg-white/5 border border-white/5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </div>
          <span class="font-bold tracking-widest text-[11px] uppercase">Back to Portfolio</span>
        </a>
        <div class="flex items-center gap-3">
          <span class="text-white/40 text-[11px] font-bold uppercase tracking-widest">Case Study</span>
          <span class="w-1 h-1 rounded-full bg-white/20"></span>
          <span class="text-[11px] font-bold uppercase tracking-widest text-blue-400">${proj.title}</span>
        </div>
      </div>
    </header>

    <main class="pt-32 pb-32 max-w-7xl mx-auto px-6">
      <div class="mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
          ${proj.category}
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-8">
          ${proj.title}
        </h1>
        <p class="text-xl md:text-2xl text-white/60 max-w-3xl leading-relaxed font-medium">
          ${proj.heroText}
        </p>
      </div>

      <div class="w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 mb-20 bg-gradient-to-br from-white/5 to-transparent relative flex items-center justify-center">
        <img src="${proj.image}" alt="${proj.title}" class="w-full h-full object-cover" />
      </div>
    </main>

    <footer class="border-t border-white/5 py-8 text-center text-xs text-white/40 bg-[#0a0a0f]">
      <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; 2026 Medhastone. All rights reserved.</div>
        <div class="flex items-center gap-6">
          <a href="/" class="hover:text-white">Home</a>
          <a href="/play-games" class="hover:text-white">Play Games</a>
          <a href="/${id}/privacy-policy" class="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  </div>

  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
  console.log(`Generated public/${id}/index.html`);
}

// ==========================================
// STATIC PRIVACY POLICY GENERATORS
// ==========================================

function generateRojgarBahiPrivacyPolicyHtml(): string {
  const pageUrl = "https://zentova.in/rojgarbahi/privacy-policy";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - RojgarBahi",
    "description": "Privacy Policy for RojgarBahi: Offline Workforce, Wage & Daily Ledger Management App.",
    "url": pageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Medhastone",
      "url": "https://zentova.in"
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Privacy Policy - RojgarBahi</title>
  <meta name="description" content="Privacy Policy for RojgarBahi - 100% Offline Workforce Management & Ledger App by Medhastone." />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Medhastone" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="Privacy Policy - RojgarBahi" />
  <meta property="og:description" content="Privacy Policy for RojgarBahi. 100% offline business data privacy with zero cloud storage." />
  <meta property="og:image" content="https://zentova.in/rojgar%20logo.jpg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Privacy Policy - RojgarBahi" />
  <meta name="twitter:description" content="Privacy Policy for RojgarBahi. 100% offline business data privacy." />

  <link rel="icon" type="image/jpeg" href="/rojgar%20logo.jpg" />
  <link rel="stylesheet" href="/static.css" />
  <style>
    body {
      background-color: #0a0a0f;
      color: #ffffff;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .section-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.5rem;
      padding: 2rem;
      margin-bottom: 2rem;
    }
  </style>

  <script type="application/ld+json">
  ${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body class="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30">
  <div id="root">
    <!-- Header -->
    <header class="fixed top-0 w-full z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/rojgarbahi" class="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
          <div class="p-2 rounded-full bg-white/5 border border-white/10">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </div>
          <span class="font-bold tracking-widest text-xs uppercase">Back to RojgarBahi</span>
        </a>
        <div class="flex items-center gap-3">
          <span class="text-white/40 text-xs font-bold uppercase tracking-widest">Legal</span>
          <span class="w-1 h-1 rounded-full bg-white/20"></span>
          <span class="text-xs font-bold uppercase tracking-widest text-purple-400">Privacy Policy</span>
        </div>
      </div>
    </header>

    <main class="pt-32 pb-32 max-w-4xl mx-auto px-6">
      
      <!-- Hero -->
      <div class="mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          Data Protection & Privacy
        </div>
        
        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">
          Privacy Policy
        </h1>
        
        <div class="flex flex-wrap items-center gap-4 text-purple-300 font-medium text-sm">
          <span><strong>App:</strong> RojgarBahi (Workforce & Ledger)</span>
          <span>•</span>
          <span><strong>Effective Date:</strong> August 21, 2026</span>
          <span>•</span>
          <span><strong>Developer:</strong> Medhastone</span>
        </div>
      </div>

      <!-- Policy Sections -->
      <div class="space-y-6 text-white/80 leading-relaxed text-sm sm:text-base">
        
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">1</span>
            Introduction
          </h2>
          <p class="mb-3">Welcome to <strong>RojgarBahi</strong> ("the App"), developed and maintained by <strong>Medhastone</strong>. We respect your privacy and are deeply committed to protecting it. This Privacy Policy explains our practices regarding the collection, use, and disclosure of your information when you use our mobile application.</p>
          <p>The foundational philosophy of RojgarBahi is that <strong>your business and financial data belongs exclusively to you</strong>. While the App connects to the internet solely to display non-intrusive advertisements, all your core daily ledger entries, employee databases, and wage records remain completely offline on your physical smartphone.</p>
        </section>

        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">2</span>
            Data Collection and Usage
          </h2>
          <p class="mb-4">We categorize data into two distinct types: <strong>Business Data</strong> (which we do NOT collect) and <strong>Advertising Data</strong> (collected by Google AdMob).</p>
          
          <div class="space-y-4">
            <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <h3 class="font-bold text-emerald-400 text-lg mb-1">✓ Business Data (100% Offline & Private)</h3>
              <p class="text-slate-200">All data you enter into the App—including worker names, phone numbers, daily attendance logs, wage calculations, advance payments, and ledger totals—is stored locally in a secure SQLite database on your physical device. Medhastone does not have access to this data. We do not operate remote backend servers or cloud databases to collect or store your business information.</p>
            </div>

            <div class="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <h3 class="font-bold text-purple-400 text-lg mb-1">✓ Advertising Data (Google AdMob)</h3>
              <p class="text-slate-200">To keep the App free for small businesses and contractors, we integrate Google AdMob to display mobile ads. AdMob may collect specific device diagnostic information to serve ads compliant with Google Play standards.</p>
            </div>
          </div>
        </section>

        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">3</span>
            Device Permissions
          </h2>
          <p class="mb-4">To provide specific on-device utility features, RojgarBahi may request the following permissions:</p>
          <ul class="space-y-3 list-disc pl-6 text-slate-300">
            <li><strong>Storage / Media Files:</strong> Requested only if you attach receipt images or invoice bills to ledger entries, or when exporting financial reports to PDF/CSV format.</li>
            <li><strong>Camera:</strong> Requested only if you choose to snap live photos of paper receipts or site attendance sheets.</li>
            <li><strong>Internet & Network State:</strong> Used exclusively by the Google AdMob SDK to load and display advertisements. No business ledger entries are ever transmitted over this connection.</li>
          </ul>
        </section>

        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">4</span>
            Third-Party Services (Google AdMob)
          </h2>
          <p class="mb-3">We use Google AdMob to display advertisements in the App. AdMob may collect and process data such as IP address, device identifiers (including Android Advertising ID), and anonymous ad interaction diagnostics.</p>
          <p class="mb-3">You can learn more about how Google handles ad data at: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:underline">https://policies.google.com/privacy</a></p>
          <p><strong>Opting Out:</strong> You can reset your Advertising ID or opt-out of personalized ads anytime via your phone's settings: <em>Settings &gt; Google &gt; Ads &gt; Opt out of Ads Personalization</em>.</p>
        </section>

        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">5</span>
            Data Security & Retention
          </h2>
          <p class="mb-3">Because all business and wage data is stored exclusively on your local device hardware, security is directly safeguarded by your phone's operating system. We recommend setting a secure device PIN, pattern, or biometric fingerprint lock.</p>
          <p><strong>Data Deletion:</strong> You can wipe all stored data at any time by selecting "Clear All Data" inside the App's settings, or by simply uninstalling the application from your device.</p>
        </section>

        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">6</span>
            Children's Privacy
          </h2>
          <p>RojgarBahi is a business utility tool and does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>
        </section>

        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">7</span>
            Changes to This Privacy Policy
          </h2>
          <p>We may update our Privacy Policy periodically. Any updates will be posted directly on this web page with a revised "Effective Date". You are advised to review this page periodically.</p>
        </section>

        <section class="section-card border-purple-500/30 bg-purple-950/20">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">8</span>
            Contact Us
          </h2>
          <p class="mb-4">If you have any questions or suggestions regarding this Privacy Policy or your data privacy, please contact us:</p>
          <div class="space-y-2 text-slate-200">
            <div><strong>Publisher & Developer:</strong> Medhastone</div>
            <div><strong>Email:</strong> <a href="mailto:medhastone@gmail.com" class="text-purple-400 hover:underline">medhastone@gmail.com</a></div>
            <div><strong>Official Website:</strong> <a href="https://zentova.in" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:underline">https://zentova.in</a></div>
          </div>
        </section>

      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-10 text-center text-xs text-white/40 bg-[#07090e]">
      <div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; 2026 Medhastone. All rights reserved. RojgarBahi is a registered workforce management utility.</div>
        <div class="flex items-center gap-6">
          <a href="/" class="hover:text-white">Portfolio</a>
          <a href="/rojgarbahi" class="hover:text-white">RojgarBahi App</a>
          <a href="/play-games" class="hover:text-white">Play Games</a>
          <a href="mailto:medhastone@gmail.com" class="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>

  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}

function generateParkDockPrivacyPolicyHtml(): string {
  const pageUrl = "https://zentova.in/parkdock/privacy-policy";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - ParkDock",
    "description": "Privacy Policy for ParkDock: Smart Parking Memory & Driver Utility by Medhastone.",
    "url": pageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Medhastone",
      "url": "https://zentova.in"
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Privacy Policy - ParkDock</title>
  <meta name="description" content="Privacy Policy for ParkDock: Smart Parking Memory & Driver Utility by Medhastone. Google Play policy compliant with transparent AdMob advertising disclosures." />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow" />
  
  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Medhastone" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="Privacy Policy - ParkDock" />
  <meta property="og:description" content="ParkDock zero-cloud privacy policy: 100% offline GPS parking memory, encrypted glovebox, and AdMob disclosures." />
  <meta property="og:image" content="https://zentova.in/parkdock.jpg" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Privacy Policy - ParkDock" />
  <meta name="twitter:description" content="Privacy Policy for ParkDock: Smart Parking Memory & Driver Utility." />

  <link rel="icon" type="image/jpeg" href="/parkdock.jpg" />
  <link rel="stylesheet" href="/static.css" />
  <style>
    body { background-color: #07090e; color: #ffffff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .section-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 1.5rem; padding: 2rem; margin-bottom: 2rem; }
  </style>

  <script type="application/ld+json">
  ${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body class="min-h-screen bg-[#07090e] text-white selection:bg-blue-500/30">
  <div id="root">
    <!-- Header -->
    <header class="fixed top-0 w-full z-50 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/parkdock" class="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
          <div class="p-2 rounded-full bg-white/5 border border-white/10">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </div>
          <span class="font-bold tracking-widest text-xs uppercase">Back to ParkDock</span>
        </a>
        <div class="flex items-center gap-3">
          <span class="text-white/40 text-xs font-bold uppercase tracking-widest">Legal</span>
          <span class="w-1 h-1 rounded-full bg-white/20"></span>
          <span class="text-xs font-bold uppercase tracking-widest text-blue-400">Privacy Policy</span>
        </div>
      </div>
    </header>

    <main class="pt-32 pb-32 max-w-4xl mx-auto px-6">
      <!-- Hero -->
      <div class="mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          Google Play Policy Compliant
        </div>
        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">Privacy Policy</h1>
        <div class="flex flex-wrap items-center gap-4 text-blue-300 font-medium text-sm">
          <span><strong>App:</strong> ParkDock: Smart Parking & Vehicle Utility</span>
          <span>•</span>
          <span><strong>Effective Date:</strong> August 2026</span>
          <span>•</span>
          <span><strong>Developer:</strong> Medhastone</span>
        </div>
      </div>

      <div class="space-y-6 text-white/80 leading-relaxed text-sm sm:text-base">
        
        <!-- 1. Introduction -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-500/20 text-blue-400">1</span>
            Introduction & Zero-Cloud Philosophy
          </h2>
          <p class="mb-3">Welcome to <strong>ParkDock</strong> ("the App"), developed and published by <strong>Medhastone</strong>. We respect your privacy and are committed to protecting it. This Privacy Policy outlines our data handling practices and demonstrates our strict compliance with Google Play Developer Policies and global data protection standards.</p>
          <p>The foundational principle of ParkDock is that <strong>your vehicle location, parking history, maintenance expenses, and glovebox documents belong solely to you</strong>. All personal data stays stored locally on your device in a private SQLite database with AES-256 encrypted storage. Medhastone does not operate cloud storage servers to harvest, monitor, sell, or profile your whereabouts.</p>
        </section>

        <!-- 2. Data Collection and Usage -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-500/20 text-blue-400">2</span>
            Data Collection & Categorization
          </h2>
          <p class="mb-4">We categorize data into two distinct types:</p>
          
          <div class="space-y-4">
            <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <h3 class="font-bold text-emerald-400 text-lg mb-1">A. Personal Vehicle Data (100% Offline & Private)</h3>
              <p class="text-slate-200">All data you record in ParkDock—including saved parking GPS coordinates, notes, pillar numbers, vehicle registration numbers, fuel logs, service reminders, and digital glovebox documents—is stored exclusively on your device. Medhastone has zero access to this data.</p>
            </div>

            <div class="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <h3 class="font-bold text-blue-400 text-lg mb-1">B. Advertising & Diagnostic Data (Google AdMob)</h3>
              <p class="text-slate-200">To keep ParkDock free for drivers worldwide, we integrate third-party mobile advertising via Google AdMob (Google LLC). AdMob may collect certain non-personally identifying device diagnostics and identifiers to serve contextual or personalized advertisements in compliance with Google Play Developer Policies.</p>
            </div>
          </div>
        </section>

        <!-- 3. Third-Party Advertising & Google AdMob -->
        <section class="section-card border-blue-500/30 bg-blue-950/10">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-500/20 text-blue-400">3</span>
            Third-Party Advertising & Google AdMob
          </h2>
          <p class="mb-3">ParkDock utilizes <strong>Google AdMob</strong> (provided by Google LLC) to serve advertisements within the application (such as banner ads, interstitial ads, or native ads).</p>
          <p class="mb-3">When advertisements are requested and loaded, Google AdMob may automatically collect and process certain technical data, which may include:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-200 mb-4">
            <li><strong>Google Advertising ID (GAID / AAID):</strong> A unique, user-resettable advertising identifier associated with your mobile device.</li>
            <li><strong>IP Address & Approximate Location:</strong> Used for geographic ad serving, network routing, and regional fraud detection.</li>
            <li><strong>Device & OS Specifications:</strong> Device model, manufacturer, Android OS version, screen size, and system language.</li>
            <li><strong>Ad Interaction Metrics:</strong> Information regarding ad impressions, clicks, dismissals, and video view completions.</li>
            <li><strong>Diagnostic Telemetry:</strong> Anonymized performance logs and crash metrics used to ensure SDK stability.</li>
          </ul>
          <p class="mb-3"><strong>Purpose of Ad Processing:</strong> This data is utilized strictly for displaying advertisements, measuring advertising campaign performance, preventing fraudulent ad traffic or invalid clicks, and enforcing frequency caps.</p>
          <div class="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 mb-4">
            <p class="font-bold text-white">Google Privacy Resources:</p>
            <ul class="list-disc pl-6 text-slate-300 space-y-1 text-xs">
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">Google Privacy Policy (https://policies.google.com/privacy)</a></li>
              <li><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">How Google uses information from sites or apps (https://policies.google.com/technologies/ads)</a></li>
            </ul>
          </div>
          <div class="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <h4 class="font-bold text-white mb-1">User Control & Personalized Ads Opt-Out</h4>
            <p class="text-xs text-slate-300">
              You have full control over personalized advertising. You can reset your Google Advertising ID or opt out of personalized ads at any time via your Android device settings:
              <br /><span class="text-blue-300 font-mono text-[11px] block mt-1">Settings &gt; Google &gt; Ads &gt; Opt out of Ads Personalization (or Delete Advertising ID)</span>
            </p>
          </div>
        </section>

        <!-- 4. Device Permissions -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-500/20 text-blue-400">4</span>
            Device Permissions & Exact Usage
          </h2>
          <p class="mb-4">ParkDock requests only the minimal device permissions strictly necessary for its features:</p>
          <ul class="space-y-3 list-disc pl-6 text-slate-300">
            <li><strong>ACCESS_FINE_LOCATION & ACCESS_COARSE_LOCATION (GPS):</strong> Used solely when you tap "Park Here" to save your vehicle's physical coordinates and to provide real-time compass walking directions back to your car. Coordinates are never transmitted off your device.</li>
            <li><strong>CAMERA:</strong> Optional. Requested only if you choose to take a photo of your parking spot (pillar number, floor marking) or scan vehicle documents into your Digital Glovebox. Images remain local.</li>
            <li><strong>STORAGE / READ_MEDIA_IMAGES:</strong> Optional. Requested only to import vehicle document images or save generated PDF/CSV maintenance and fuel expense reports to your device storage.</li>
            <li><strong>INTERNET & ACCESS_NETWORK_STATE:</strong> Used exclusively by the Google AdMob SDK to request and render advertisements, and to download map tiles for navigation.</li>
            <li><strong>USE_BIOMETRIC / USE_FINGERPRINT:</strong> Used locally by the Android BiometricPrompt API to verify driver identity before unlocking the Encrypted Digital Glovebox.</li>
          </ul>
        </section>

        <!-- 5. Security & Encrypted Glovebox -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-500/20 text-blue-400">5</span>
            Data Security & Encrypted Glovebox
          </h2>
          <p class="mb-3">We prioritize data safety. When you save sensitive vehicle documents (such as your Driver's License, Vehicle Registration RC, Pollution PUC Certificate, or Insurance Policy) into the Digital Glovebox, ParkDock secures them using industry-standard <strong>AES-256 local encryption</strong>.</p>
          <p>Decryption keys are anchored to your device's secure hardware keystore. No unencrypted document files or credentials are ever exposed or transmitted over the internet.</p>
        </section>

        <!-- 6. Data Retention & User Deletion -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-500/20 text-blue-400">6</span>
            Data Retention & User Deletion Rights
          </h2>
          <p class="mb-3">Because all user data is stored locally on your device and not on remote servers, you maintain complete data sovereignty:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-300">
            <li><strong>In-App Deletion:</strong> You can delete any vehicle, parking record, expense entry, or glovebox document instantly from within the application.</li>
            <li><strong>Wipe All Data:</strong> You can select "Clear All Data" in the Settings screen or use Android's <em>Settings &gt; Apps &gt; ParkDock &gt; Storage &gt; Clear Storage</em>.</li>
            <li><strong>App Uninstallation:</strong> Uninstalling ParkDock permanently deletes all associated local databases and encrypted documents from your device.</li>
          </ul>
        </section>

        <!-- 7. Children's Privacy -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-500/20 text-blue-400">7</span>
            Children's Privacy (COPPA Compliance)
          </h2>
          <p>ParkDock is an automotive and driver utility designed for general audiences and licensed drivers (ages 13 and above). We do not knowingly collect or solicit personal data from children under the age of 13.</p>
        </section>

        <!-- 8. Policy Updates -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-500/20 text-blue-400">8</span>
            Policy Updates & Modifications
          </h2>
          <p>We may update this Privacy Policy from time to time to adhere to evolving Google Play policies or regulatory requirements. Any revisions will be published at <a href="${pageUrl}" class="text-blue-400 hover:underline">${pageUrl}</a> with a revised Effective Date.</p>
        </section>

        <!-- 9. Contact Us -->
        <section class="section-card border-blue-500/30 bg-blue-950/20">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-500/20 text-blue-400">9</span>
            Contact Developer / Publisher
          </h2>
          <p class="mb-4">If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at:</p>
          <div class="space-y-2 text-slate-200">
            <div><strong>Publisher & Developer:</strong> Medhastone</div>
            <div><strong>Email:</strong> <a href="mailto:medhastone@gmail.com" class="text-blue-400 hover:underline">medhastone@gmail.com</a></div>
            <div><strong>Official Website:</strong> <a href="https://zentova.in" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">https://zentova.in</a></div>
            <div><strong>Application:</strong> ParkDock: Smart Parking Memory & Driver Utility</div>
          </div>
        </section>

      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-10 text-center text-xs text-white/40 bg-[#07090e]">
      <div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; 2026 Medhastone. All rights reserved. ParkDock is a registered automotive utility.</div>
        <div class="flex items-center gap-6">
          <a href="/" class="hover:text-white">Portfolio</a>
          <a href="/parkdock" class="hover:text-white">ParkDock App</a>
          <a href="/play-games" class="hover:text-white">Play Games</a>
          <a href="mailto:medhastone@gmail.com" class="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}

function generateBrainMazePrivacyPolicyHtml(): string {
  const pageUrl = "https://zentova.in/brainmaze/privacy-policy";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - Brain Maze Master",
    "description": "Privacy Policy for Brain Maze Master: Offline Maze Puzzle & IQ Brain Training by Medhastone. Compliant with Google Play policies and AdMob disclosures.",
    "url": pageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Medhastone",
      "url": "https://zentova.in"
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Privacy Policy - Brain Maze Master | Medhastone</title>
  <meta name="description" content="Privacy Policy for Brain Maze Master: Offline Maze Puzzle & IQ Brain Training by Medhastone. 100% offline gameplay, zero personal data harvesting, and full Google Play & AdMob policy compliance." />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow" />
  
  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Medhastone" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="Privacy Policy - Brain Maze Master" />
  <meta property="og:description" content="Brain Maze Master zero-cloud privacy policy: 100% offline labyrinth puzzles, local game storage, and Google AdMob advertising disclosures." />
  <meta property="og:image" content="https://zentova.in/brainmaze.jpg" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Privacy Policy - Brain Maze Master" />
  <meta name="twitter:description" content="Privacy Policy for Brain Maze Master: Offline Maze Puzzle & IQ Brain Training." />

  <link rel="icon" type="image/jpeg" href="/brainmaze.jpg" />
  <link rel="stylesheet" href="/static.css" />
  <style>
    body { background-color: #07090e; color: #ffffff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .section-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 1.5rem; padding: 2rem; margin-bottom: 2rem; }
  </style>

  <script type="application/ld+json">
  ${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body class="min-h-screen bg-[#07090e] text-white selection:bg-indigo-500/30">
  <div id="root">
    <!-- Header -->
    <header class="fixed top-0 w-full z-50 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/brainmaze" class="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
          <div class="p-2 rounded-full bg-white/5 border border-white/10">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </div>
          <span class="font-bold tracking-widest text-xs uppercase">Back to Brain Maze Master</span>
        </a>
        <div class="flex items-center gap-3">
          <span class="text-white/40 text-xs font-bold uppercase tracking-widest">Legal</span>
          <span class="w-1 h-1 rounded-full bg-white/20"></span>
          <span class="text-xs font-bold uppercase tracking-widest text-indigo-400">Privacy Policy</span>
        </div>
      </div>
    </header>

    <main class="pt-32 pb-32 max-w-4xl mx-auto px-6">
      <!-- Hero -->
      <div class="mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          Google Play Policy Compliant
        </div>
        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">Privacy Policy</h1>
        <div class="flex flex-wrap items-center gap-4 text-indigo-300 font-medium text-sm">
          <span><strong>App:</strong> Brain Maze Master</span>
          <span>•</span>
          <span><strong>Package:</strong> com.brainmaze.master</span>
          <span>•</span>
          <span><strong>Effective Date:</strong> September 2026</span>
          <span>•</span>
          <span><strong>Publisher:</strong> Medhastone</span>
        </div>
      </div>

      <div class="space-y-6 text-white/80 leading-relaxed text-sm sm:text-base">
        
        <!-- 1. Introduction & Zero-Cloud Philosophy -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">1</span>
            Introduction & Zero Personal Data Philosophy
          </h2>
          <p class="mb-3">Welcome to <strong>Brain Maze Master</strong> ("the App"), developed and published by <strong>Medhastone</strong>. We value your privacy and are committed to maintaining a secure, transparent, and entertaining mobile puzzle experience.</p>
          <p>Brain Maze Master is engineered with an <strong>offline-first, privacy-by-design</strong> architecture. You can enjoy over 1,000+ labyrinth puzzles, unlock 20+ hero skins, and play through 18+ artistic silhouette shapes without creating an account, registering personal credentials, or exposing personal identity data.</p>
        </section>

        <!-- 2. Data Handled Locally -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">2</span>
            Information Stored Locally on Your Device
          </h2>
          <p class="mb-3">All core gameplay data is stored strictly on your local device hardware using Android's private SQLite database and SharedPreferences:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-200">
            <li><strong>Gameplay Progression:</strong> Completed levels, unlocked maze difficulties (Easy, Medium, Hard, Expert, Master), star ratings, and IQ test scores.</li>
            <li><strong>In-Game Economy & Collectibles:</strong> Earned coins, rare diamonds, unlocked hero characters (Starter through Divine tiers), unlocked trail themes, and daily streak counters.</li>
            <li><strong>Audio & Gameplay Settings:</strong> Sound effects (SFX) toggle, background music (BGM) volume, and haptic vibration preferences.</li>
          </ul>
          <p class="mt-3">This data remains exclusively on your physical device. Medhastone does not operate cloud servers that sync, harvest, or commercialize your gameplay records.</p>
        </section>

        <!-- 3. Third-Party Advertising & Google AdMob -->
        <section class="section-card border-indigo-500/30 bg-indigo-950/15">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">3</span>
            Third-Party Advertising & Google AdMob Disclosures
          </h2>
          <p class="mb-3">To keep Brain Maze Master completely free for all players around the globe, we integrate <strong>Google AdMob</strong> (provided by Google LLC) to serve mobile advertisements.</p>
          <p class="mb-2 font-semibold text-white">Ad Formats Used in Brain Maze Master:</p>
          <ul class="list-disc pl-6 space-y-1.5 text-slate-200 mb-4">
            <li><strong>Banner Ads:</strong> Displayed unobtrusively at the top or bottom of puzzle menus.</li>
            <li><strong>Interstitial Ads:</strong> Displayed between completed maze levels or game sessions.</li>
            <li><strong>Rewarded Video Ads (Optional):</strong> Opt-in videos you can choose to watch to earn free bonus hints, unlock lucky wheel spins, or revive during timed IQ challenges.</li>
          </ul>
          
          <h3 class="font-bold text-white text-lg mb-2">Data Processed by the Google Mobile Ads (GMA) SDK:</h3>
          <p class="mb-2">When ad requests are processed, Google AdMob may automatically collect and handle non-personally identifiable technical telemetry in compliance with Google Play Developer Policies:</p>
          <ul class="list-disc pl-6 space-y-1.5 text-slate-200 mb-4">
            <li><strong>Google Advertising ID (GAID / AAID):</strong> A unique, resettable identifier assigned by Android for ad attribution.</li>
            <li><strong>IP Address & Coarse Location:</strong> Used for regional ad routing, language localization, and click-fraud prevention.</li>
            <li><strong>Device Specifications:</strong> Device model, manufacturer, OS build version, screen size, and system language.</li>
            <li><strong>Ad Engagement Metrics:</strong> Ad impressions, view completion rates, click data, and SDK diagnostic telemetry.</li>
          </ul>

          <div class="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 mb-4">
            <p class="font-bold text-white">Google Privacy Resources & Policies:</p>
            <ul class="list-disc pl-6 text-slate-300 space-y-1 text-xs">
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:underline">Google Privacy Policy (https://policies.google.com/privacy)</a></li>
              <li><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:underline">How Google uses information from apps (https://policies.google.com/technologies/ads)</a></li>
              <li><a href="https://support.google.com/admob/answer/6128543" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:underline">Google AdMob Policies & Restrictions</a></li>
            </ul>
          </div>

          <div class="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
            <h4 class="font-bold text-white mb-1">User Control: Reset or Opt Out of Ads Personalization</h4>
            <p class="text-xs text-slate-300">
              You can opt out of personalized ads or reset your advertising ID at any time via Android system settings:
              <br /><span class="text-indigo-300 font-mono text-[11px] block mt-1">Settings &gt; Google &gt; Ads &gt; Opt out of Ads Personalization (or Delete Advertising ID)</span>
            </p>
          </div>
        </section>

        <!-- 4. Device Permissions -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">4</span>
            Device Permissions & Exact Purpose
          </h2>
          <p class="mb-4">Brain Maze Master requests only the bare minimum runtime capabilities necessary for audio, haptics, and advertising:</p>
          <ul class="space-y-3 list-disc pl-6 text-slate-300">
            <li><strong>INTERNET & ACCESS_NETWORK_STATE:</strong> Used exclusively by the Google AdMob SDK to request and load banner, interstitial, and rewarded video ads. No personal gameplay metrics are transmitted.</li>
            <li><strong>VIBRATE:</strong> Used to trigger subtle tactile feedback when sliding across labyrinth turns, hitting maze walls, or solving level goals.</li>
            <li><strong>WAKE_LOCK:</strong> Prevents your device display from timing out or dimming during active maze navigation.</li>
          </ul>
          <p class="text-xs text-slate-400 mt-3">
            <em>Notice:</em> Brain Maze Master <strong>NEVER</strong> requests sensitive device permissions such as Camera, Microphone, GPS/Fine Location, Contacts, SMS, or Phone State.
          </p>
        </section>

        <!-- 5. Data Retention & Deletion Rights -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">5</span>
            Data Retention & User Deletion Rights
          </h2>
          <p class="mb-3">In accordance with Google Play's Data Safety and user deletion standards:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-300">
            <li><strong>Clear Cache & Data:</strong> You can wipe all local progress, coins, and records at any time via Android <em>Settings &gt; Apps &gt; Brain Maze Master &gt; Storage &gt; Clear Data</em>.</li>
            <li><strong>App Uninstallation:</strong> Deleting/uninstalling the application permanently purges all associated local files, database entries, and saved settings from your device.</li>
          </ul>
        </section>

        <!-- 6. Children's Privacy -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">6</span>
            Children's Privacy & COPPA Compliance
          </h2>
          <p class="mb-3">Brain Maze Master is a family-friendly puzzle game suitable for audiences of all ages. We do not knowingly collect or solicit personal information from children under the age of 13.</p>
          <p>Our integrated AdMob SDK is configured to comply with Google Play's Families Policy and Age-Restricted treatment flags where required.</p>
        </section>

        <!-- 7. Changes to Policy -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">7</span>
            Policy Updates & Modifications
          </h2>
          <p>We may update our Privacy Policy periodically to reflect new features, app updates, or regulatory requirements. Any modifications will be published at <a href="${pageUrl}" class="text-indigo-400 hover:underline">${pageUrl}</a> with an updated Effective Date.</p>
        </section>

        <!-- 8. Contact Developer -->
        <section class="section-card border-indigo-500/30 bg-indigo-950/20">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">8</span>
            Contact Developer / Publisher
          </h2>
          <p class="mb-4">If you have any questions, feedback, or privacy-related inquiries, please contact us at:</p>
          <div class="space-y-2 text-slate-200">
            <div><strong>Publisher & Developer:</strong> Medhastone</div>
            <div><strong>Support Email:</strong> <a href="mailto:medhastone@gmail.com" className="text-indigo-400 hover:underline">medhastone@gmail.com</a></div>
            <div><strong>Official Website:</strong> <a href="https://zentova.in" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">https://zentova.in</a></div>
            <div><strong>Application:</strong> Brain Maze Master: Offline Maze Puzzle & IQ Brain Training</div>
          </div>
        </section>

      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-10 text-center text-xs text-white/40 bg-[#07090e]">
      <div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; 2026 Medhastone. All rights reserved. Brain Maze Master is a registered gaming title.</div>
        <div class="flex items-center gap-6">
          <a href="/" class="hover:text-white">Portfolio</a>
          <a href="/brainmaze" class="hover:text-white">Brain Maze Master</a>
          <a href="/brainmaze/privacy-policy" class="text-indigo-400 font-bold hover:text-indigo-300">Privacy Policy</a>
          <a href="/play-games" class="hover:text-white">Play Games</a>
          <a href="mailto:medhastone@gmail.com" class="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}

function generateLexiBrainPrivacyPolicyHtml(): string {
  const pageUrl = "https://zentova.in/lexibrain/privacy-policy";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - LexiBrain: Find Hidden Words",
    "description": "Privacy Policy for LexiBrain: Find Hidden Words by Medhastone. Google Play policy compliant with transparent AdMob disclosures and zero cloud data harvesting.",
    "url": pageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Medhastone",
      "url": "https://zentova.in"
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Privacy Policy - LexiBrain: Find Hidden Words | Medhastone</title>
  <meta name="description" content="Privacy Policy for LexiBrain: Find Hidden Words by Medhastone. 100% offline vocabulary learning, zero personal data harvesting, and full Google Play & AdMob policy compliance." />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow" />
  
  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Medhastone" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="Privacy Policy - LexiBrain: Find Hidden Words" />
  <meta property="og:description" content="LexiBrain offline word search privacy policy: 100% local Room DB storage, native TTS, and Google AdMob disclosures." />
  <meta property="og:image" content="https://zentova.in/lexibrain.svg" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Privacy Policy - LexiBrain: Find Hidden Words" />
  <meta name="twitter:description" content="Privacy Policy for LexiBrain: Find Hidden Words by Medhastone." />

  <link rel="icon" type="image/svg+xml" href="/lexibrain.svg" />
  <link rel="stylesheet" href="/static.css" />
  <style>
    body { background-color: #07090e; color: #ffffff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .section-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 1.5rem; padding: 2rem; margin-bottom: 2rem; }
  </style>

  <script type="application/ld+json">
  ${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body class="min-h-screen bg-[#07090e] text-white selection:bg-purple-500/30">
  <div id="root">
    <!-- Header -->
    <header class="fixed top-0 w-full z-50 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/lexibrain" class="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
          <div class="p-2 rounded-full bg-white/5 border border-white/10">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </div>
          <span class="font-bold tracking-widest text-xs uppercase">Back to LexiBrain</span>
        </a>
        <div class="flex items-center gap-3">
          <span class="text-white/40 text-xs font-bold uppercase tracking-widest">Legal</span>
          <span class="w-1 h-1 rounded-full bg-white/20"></span>
          <span class="text-xs font-bold uppercase tracking-widest text-purple-400">Privacy Policy</span>
        </div>
      </div>
    </header>

    <main class="pt-32 pb-32 max-w-4xl mx-auto px-6">
      <!-- Hero -->
      <div class="mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          Google Play Policy Compliant
        </div>
        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">Privacy Policy</h1>
        <div class="flex flex-wrap items-center gap-4 text-purple-300 font-medium text-sm">
          <span><strong>App:</strong> LexiBrain: Find Hidden Words (com.lexibrain.hiddenwords)</span>
          <span>•</span>
          <span><strong>Effective Date:</strong> August 2026</span>
          <span>•</span>
          <span><strong>Developer:</strong> Medhastone</span>
        </div>
      </div>

      <div class="space-y-6 text-white/80 leading-relaxed text-sm sm:text-base">
        
        <!-- 1. Introduction -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">1</span>
            Introduction & Offline Privacy Commitment
          </h2>
          <p class="mb-3">Welcome to <strong>LexiBrain: Find Hidden Words</strong> (Package: <code class="text-purple-300 font-mono">com.lexibrain.hiddenwords</code>), designed and published by <strong>Medhastone</strong>. We respect your privacy and are committed to maintaining a safe, transparent, and distraction-free educational word puzzle environment.</p>
          <p>LexiBrain is built with an <strong>offline-first philosophy</strong>. We do not require account registration or social login. All puzzle solves, star ratings, coin balances, custom themes, and discovered Vocabulary Vault memory cards are stored locally on your device in an encrypted Room database with zero remote server tracking.</p>
        </section>

        <!-- 2. Data Categorization -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">2</span>
            Data Collection & On-Device Storage
          </h2>
          <p class="mb-4">We categorize data into two explicit types:</p>
          
          <div class="space-y-4">
            <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <h3 class="font-bold text-emerald-400 text-lg mb-1">A. Local Educational Game Progress (100% On-Device)</h3>
              <p class="text-slate-200">Your solved word levels, star rankings, streak statistics, unlocked board themes (Midnight, Classic, Cozy, Neon), and saved vocabulary flashcards are retained purely on your Android smartphone using SQLite/Room. Medhastone does not operate cloud database servers to harvest or monetize this information.</p>
            </div>

            <div class="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <h3 class="font-bold text-purple-400 text-lg mb-1">B. Advertising Diagnostics & Identifiers (Google AdMob)</h3>
              <p class="text-slate-200">To provide free access to all 500+ word levels without requiring mandatory paid subscriptions, LexiBrain integrates third-party mobile advertising via Google AdMob (Google LLC). AdMob may process non-personally identifying telemetry and advertising identifiers strictly in accordance with Google Play Developer Program policies.</p>
            </div>
          </div>
        </section>

        <!-- 3. Google AdMob Disclosures -->
        <section class="section-card border-purple-500/30 bg-purple-950/10">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">3</span>
            Third-Party Advertising & Google AdMob Disclosures
          </h2>
          <p class="mb-3">LexiBrain integrates <strong>Google AdMob</strong> (provided by Google LLC) to serve banner advertisements, interstitial transitions, and opt-in rewarded video ads (e.g., watching a brief video to earn puzzle hints).</p>
          <p class="mb-3">When advertising assets are loaded, Google AdMob may automatically collect and process technical information including:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-200 mb-4">
            <li><strong>Google Advertising ID (GAID / AAID):</strong> A resettable advertising identifier used for ad frequency capping and attribution.</li>
            <li><strong>IP Address & Regional Telemetry:</strong> For regional ad serving, network routing, and fraud detection.</li>
            <li><strong>Device Model & OS Specifications:</strong> Screen dimensions, Android OS version, device manufacturer, and language preference.</li>
            <li><strong>Ad Engagement Metrics:</strong> Ad impressions, view duration, clicks, and dismissal actions.</li>
          </ul>
          <p class="mb-3"><strong>Purpose:</strong> Ad data is utilized strictly for displaying advertisements, measuring campaign performance, and preventing fraudulent invalid traffic.</p>
          <div class="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 mb-4">
            <p class="font-bold text-white">Google Policy Resources:</p>
            <ul class="list-disc pl-6 text-slate-300 space-y-1 text-xs">
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:underline">Google Privacy Policy (https://policies.google.com/privacy)</a></li>
              <li><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:underline">How Google Uses Information from Sites/Apps (https://policies.google.com/technologies/ads)</a></li>
            </ul>
          </div>
          <div class="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
            <h4 class="font-bold text-white mb-1">User Opt-Out & Advertising ID Reset</h4>
            <p class="text-xs text-slate-300">
              You can reset your Google Advertising ID or opt out of personalized ads at any time through your Android device settings:
              <br /><span class="text-purple-300 font-mono text-[11px] block mt-1">Settings &gt; Google &gt; Ads &gt; Opt out of Ads Personalization (or Delete Advertising ID)</span>
            </p>
          </div>
        </section>

        <!-- 4. Device Permissions -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">4</span>
            Device Permissions & Exact Usage
          </h2>
          <p class="mb-4">LexiBrain requests only the minimal technical permissions required for gameplay:</p>
          <ul class="space-y-3 list-disc pl-6 text-slate-300">
            <li><strong>INTERNET & ACCESS_NETWORK_STATE:</strong> Required exclusively by the Google AdMob SDK to request and render advertisements and rewarded videos. Gameplay itself functions 100% offline.</li>
            <li><strong>VIBRATE:</strong> Used locally for gentle haptic tactile feedback when selecting letters and completing words.</li>
            <li><strong>WAKE_LOCK:</strong> Prevents the screen from dimming while actively analyzing word search puzzle grids.</li>
          </ul>
          <p class="mt-4 text-xs text-slate-400"><em>Note: LexiBrain does NOT request sensitive runtime permissions such as Camera, GPS Location, Microphone, Contacts, or Storage read/write.</em></p>
        </section>

        <!-- 5. Data Deletion & User Rights -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">5</span>
            Data Retention & User Deletion
          </h2>
          <p class="mb-3">In compliance with Google Play Data Safety standards:</p>
          <ul class="list-disc pl-6 space-y-2 text-slate-300">
            <li><strong>Clear App Cache & Data:</strong> You can purge all local puzzle progress, vocabulary flashcards, and settings at any time via Android <em>Settings &gt; Apps &gt; LexiBrain &gt; Storage &gt; Clear Storage</em>.</li>
            <li><strong>App Uninstallation:</strong> Deleting the application permanently erases all associated on-device SQLite records and preferences.</li>
          </ul>
        </section>

        <!-- 6. Children's Privacy -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">6</span>
            Children's Privacy & COPPA Compliance
          </h2>
          <p class="mb-3">LexiBrain: Find Hidden Words is an educational family puzzle game suitable for audiences of all ages. We do not knowingly collect personally identifiable information from children under 13.</p>
          <p>AdMob integrations adhere to Google Play Families Policy requirements and respect COPPA treatment flags for non-personalized advertising where applicable.</p>
        </section>

        <!-- 7. Policy Updates -->
        <section class="section-card">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">7</span>
            Policy Updates & Modifications
          </h2>
          <p>We may periodically update this Privacy Policy to reflect app updates or regulatory adjustments. Revisions will be published at <a href="${pageUrl}" class="text-purple-400 hover:underline">${pageUrl}</a> with an updated Effective Date.</p>
        </section>

        <!-- 8. Contact Developer -->
        <section class="section-card border-purple-500/30 bg-purple-950/20">
          <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="p-2 rounded-xl bg-purple-500/20 text-purple-400">8</span>
            Contact Developer / Publisher
          </h2>
          <p class="mb-4">If you have questions, suggestions, or privacy inquiries regarding LexiBrain, please contact:</p>
          <div class="space-y-2 text-slate-200">
            <div><strong>Publisher & Developer:</strong> Medhastone</div>
            <div><strong>Support Email:</strong> <a href="mailto:medhastone@gmail.com" class="text-purple-400 hover:underline">medhastone@gmail.com</a></div>
            <div><strong>Official Website:</strong> <a href="https://zentova.in" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:underline">https://zentova.in</a></div>
            <div><strong>Application:</strong> LexiBrain: Find Hidden Words (com.lexibrain.hiddenwords)</div>
          </div>
        </section>

      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-10 text-center text-xs text-white/40 bg-[#07090e]">
      <div class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; 2026 Medhastone. All rights reserved. LexiBrain: Find Hidden Words (com.lexibrain.hiddenwords).</div>
        <div class="flex items-center gap-6">
          <a href="/" class="hover:text-white">Portfolio</a>
          <a href="/lexibrain" class="hover:text-white">LexiBrain App</a>
          <a href="/lexibrain/privacy-policy" class="text-purple-400 font-bold hover:text-purple-300">Privacy Policy</a>
          <a href="/play-games" class="hover:text-white">Play Games</a>
          <a href="mailto:medhastone@gmail.com" class="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}

function generatePdfZeroPrivacyPolicyHtml(): string {
  const pageUrl = "https://zentova.in/pdfzero/privacy-policy";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - PDFZero",
    "description": "Privacy Policy for PDFZero: 100% Offline Universal PDF Toolkit and Document Security Suite.",
    "url": pageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Medhastone",
      "url": "https://zentova.in"
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Privacy Policy - PDFZero | 100% Offline PDF Toolkit</title>
  <meta name="description" content="Privacy Policy for PDFZero. 100% offline local processing with zero cloud uploads, zero document retention, and Google Play compliance." />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Medhastone" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="Privacy Policy - PDFZero" />
  <meta property="og:description" content="Privacy Policy for PDFZero. 100% offline PDF processing with zero cloud uploads." />
  <meta property="og:image" content="https://zentova.in/pdfzero.jpg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Privacy Policy - PDFZero" />
  <meta name="twitter:description" content="Zero Cloud Uploads. 100% offline local PDF processing." />

  <link rel="icon" type="image/jpeg" href="/pdfzero.jpg" />
  <link rel="stylesheet" href="/static.css" />
  <style>
    body {
      background-color: #07090e;
      color: #f1f5f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>

  <script type="application/ld+json">
  ${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body class="min-h-screen bg-[#07090e] text-slate-100 selection:bg-rose-500/30 selection:text-white">
  <div id="root">
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/pdfzero" class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
          <span>&larr; Back to PDFZero App</span>
        </a>
        <div class="flex items-center gap-2">
          <span class="text-xs text-rose-400 font-bold bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            Privacy Policy
          </span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 py-12">
      <div class="mb-10 pb-8 border-b border-white/10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4">
          Google Play Policy Compliant
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">Privacy Policy for PDFZero</h1>
        <p class="text-sm text-slate-400">
          Last Updated: March 2026 &bull; Application: <strong class="text-white">PDFZero: 100% Offline Universal PDF Toolkit</strong> (Package ID: <code class="text-rose-300">com.pdfzero</code>) &bull; Developer: <strong class="text-white">Medhastone</strong>
        </p>
      </div>

      <div class="prose prose-invert max-w-none space-y-8 text-sm text-slate-300 leading-relaxed">
        <!-- Core Commitment -->
        <section class="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20">
          <h2 class="text-lg font-bold text-rose-300 mb-2">1. Core Commitment: 100% Offline Local Processing (Zero Cloud Uploads)</h2>
          <p>
            At <strong>Medhastone</strong>, user privacy is our foundational engineering principle. <strong>PDFZero</strong> is built as a zero-knowledge, strictly offline application. All document rendering, parsing, editing, merging, splitting, watermarking, redacting, compression, OCR extraction, and conversions occur <strong>100% locally on your physical device</strong>.
          </p>
          <p class="mt-2 font-medium text-white">
            We do NOT own, operate, or maintain any cloud document servers. Your bank statements, tax IDs, contracts, and personal records NEVER leave your phone or tablet.
          </p>
        </section>

        <!-- Information Collection -->
        <section>
          <h2 class="text-lg font-bold text-white mb-3">2. Information Collection &amp; Use</h2>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>No Account Required:</strong> PDFZero requires no account creation, login, email address, or phone number.</li>
            <li><strong>No Document Telemetry:</strong> We do not log filenames, file sizes, document contents, or metadata.</li>
            <li><strong>No Personal Identification:</strong> We do not collect names, addresses, biometric identifiers, or contact details.</li>
          </ul>
        </section>

        <!-- Device Permissions -->
        <section>
          <h2 class="text-lg font-bold text-white mb-3">3. Device Permissions &amp; Hardware Access</h2>
          <p class="mb-3">PDFZero requests only the minimum Android runtime permissions strictly necessary to execute user-initiated actions:</p>
          <div class="space-y-3">
            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
              <div class="font-bold text-white">Storage / Media Access (READ_MEDIA_IMAGES / READ_EXTERNAL_STORAGE / SAF)</div>
              <div class="text-xs text-slate-400 mt-1">Used solely to open your selected PDF files and save modified or converted documents back to your chosen storage directory via the standard Android Storage Access Framework.</div>
            </div>
            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
              <div class="font-bold text-white">Camera Access (CAMERA - Optional)</div>
              <div class="text-xs text-slate-400 mt-1">Used solely when you explicitly tap the "AI Document Scanner" or "ID Card Stitcher" tools to capture physical documents. Camera frames are processed in-memory and are never transmitted over the internet.</div>
            </div>
          </div>
        </section>

        <!-- Advertising -->
        <section>
          <h2 class="text-lg font-bold text-white mb-3">4. Third-Party Services &amp; Advertising (Google AdMob)</h2>
          <p>
            To keep PDFZero completely free and accessible without subscription paywalls, the application may display non-intrusive advertisements served by <strong>Google AdMob</strong>.
          </p>
          <p class="mt-2">
            Google AdMob may collect and process pseudonymous identifiers (such as the Google Advertising ID / AAID), IP address, and coarse device diagnostic information in accordance with Google's Privacy Policy. You can reset or opt out of personalized advertising anytime in your Android device settings under <em>Settings &rarr; Google &rarr; Ads</em>.
          </p>
          <p class="mt-2">
            Review Google's Privacy Policy at: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-rose-400 hover:underline">https://policies.google.com/privacy</a>.
          </p>
        </section>

        <!-- Children's Privacy -->
        <section>
          <h2 class="text-lg font-bold text-white mb-3">5. Children's Privacy (COPPA Compliance)</h2>
          <p>
            PDFZero does not knowingly collect personally identifiable information from children under 13 years of age. All document processing remains strictly local to the device.
          </p>
        </section>

        <!-- Data Retention & Deletion -->
        <section>
          <h2 class="text-lg font-bold text-white mb-3">6. Data Retention &amp; User Deletion Rights</h2>
          <p>
            Because we do not upload or store any files on cloud infrastructure, there is no remote user data to retain or delete. You retain 100% control over all files saved in your device storage and can delete them at any time using your preferred file manager.
          </p>
        </section>

        <!-- Contact Information -->
        <section class="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 class="text-lg font-bold text-white mb-2">7. Developer &amp; Privacy Contact</h2>
          <p>For questions, privacy inquiries, or technical support, please contact us:</p>
          <div class="mt-3 space-y-1 text-slate-300">
            <div><strong>Developer:</strong> Medhastone</div>
            <div><strong>Email:</strong> <a href="mailto:medhastone@gmail.com" class="text-rose-400 hover:underline">medhastone@gmail.com</a></div>
            <div><strong>Official Website:</strong> <a href="https://zentova.in" class="text-rose-400 hover:underline">https://zentova.in</a></div>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-10 text-center text-xs text-white/40 bg-[#07090e]">
      <div class="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; 2026 Medhastone. All rights reserved. PDFZero (com.pdfzero).</div>
        <div class="flex items-center gap-6">
          <a href="/" class="hover:text-white">Portfolio</a>
          <a href="/pdfzero" class="hover:text-white">PDFZero App</a>
          <a href="/pdfzero/privacy-policy" class="text-rose-400 font-bold hover:text-rose-300">Privacy Policy</a>
          <a href="/play-games" class="hover:text-white">Play Games</a>
          <a href="mailto:medhastone@gmail.com" class="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  </div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}

// Generate static privacy policy pages for all apps
const PRIVACY_PAGES: Record<string, () => string> = {
  rojgarbahi: generateRojgarBahiPrivacyPolicyHtml,
  parkdock: generateParkDockPrivacyPolicyHtml,
  brainmaze: generateBrainMazePrivacyPolicyHtml,
  lexibrain: generateLexiBrainPrivacyPolicyHtml,
  pdfzero: generatePdfZeroPrivacyPolicyHtml,
};

for (const [appKey, generator] of Object.entries(PRIVACY_PAGES)) {
  const targetDir = path.join(publicDir, appKey, 'privacy-policy');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(path.join(targetDir, 'index.html'), generator(), 'utf-8');
  console.log(`Generated public/${appKey}/privacy-policy/index.html`);
}

console.log('Portfolio and Privacy Policy static pages generated successfully!');
