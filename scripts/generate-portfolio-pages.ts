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
    title: 'LexiBrain: Hidden Words',
    category: 'Word Puzzle & Education',
    heroText: 'Expand vocabulary and challenge your mind with immersive word searches.',
    image: '/brainmaze.jpg',
    description: 'Mind-bending word search & vocabulary challenge game with progressive levels, offline-first Room DB, and fluid animations.',
    techStack: ['Android Kotlin', 'Room DB', 'Jetpack Compose', 'Material 3'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.medhastone.lexibrain',
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
  <script src="https://cdn.tailwindcss.com"></script>
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
  <script src="https://cdn.tailwindcss.com"></script>
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
  <script src="https://cdn.tailwindcss.com"></script>
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
        <a href="${playStoreUrl}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25">
          Get on Google Play
        </a>
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
  <script src="https://cdn.tailwindcss.com"></script>
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

console.log('Portfolio static pages generated successfully!');
