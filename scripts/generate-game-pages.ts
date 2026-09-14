import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GAMES_DETAILED_DATA } from '../src/data/gamesContent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public/play-games');

for (const [gameId, game] of Object.entries(GAMES_DETAILED_DATA)) {
  const gameDir = path.join(publicDir, gameId);
  if (!fs.existsSync(gameDir)) {
    fs.mkdirSync(gameDir, { recursive: true });
  }

  const pageUrl = `https://zentova.in/play-games/${game.id}`;
  
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
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
            "name": "Play games",
            "item": "https://zentova.in/play-games"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": game.title,
            "item": pageUrl
          }
        ]
      },
      {
        "@type": "VideoGame",
        "@id": `${pageUrl}#game`,
        "name": game.title,
        "description": game.metaDescription,
        "genre": game.categoryName,
        "playMode": "SinglePlayer",
        "applicationCategory": "Game",
        "operatingSystem": "Any modern web browser (HTML5, WebGL)",
        "url": pageUrl,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": game.votes.replace(',', '')
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": game.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${game.title} - Play Free Online (No Download) | Medhastone</title>
  <meta name="description" content="${game.metaDescription.replace(/"/g, '&quot;')}" />
  <meta name="keywords" content="${(game.searchedKeywords || []).join(', ')}" />
  <link rel="canonical" href="${pageUrl}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="${game.title} - Play Free Online | Medhastone" />
  <meta property="og:description" content="${game.metaDescription.replace(/"/g, '&quot;')}" />
  <meta property="og:image" content="https://zentova.in/medi.jpg" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${game.title} - Play Free Online | Medhastone" />
  <meta name="twitter:description" content="${game.metaDescription.replace(/"/g, '&quot;')}" />
  <meta name="twitter:image" content="https://zentova.in/medi.jpg" />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background-color: #0a0a0f;
      color: #ffffff;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    details summary::-webkit-details-marker { display: none; }
  </style>

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
  ${JSON.stringify(schemaGraph, null, 2)}
  </script>
</head>
<body class="min-h-screen bg-[#0a0a0f] text-white selection:bg-blue-500 selection:text-white">
  <div id="root">
    <!-- Static Fallback Content for Search Crawlers and Immediate Visual Render -->
    <header class="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <a href="/play-games" class="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all text-sm font-medium border border-white/5">
          &larr; <span class="hidden sm:inline">All Games</span>
        </a>
        <a href="/" class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-xs">M</div>
          <span class="font-bold text-sm tracking-wider text-white">MEDHASTONE <span class="text-blue-400 text-xs font-normal">GAMES</span></span>
        </a>
      </div>
      <div class="flex items-center gap-2">
        <a href="/play-games" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all">Browse 17+ Games</a>
      </div>
    </header>

    <main class="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
      <!-- Breadcrumb Navigation -->
      <nav aria-label="Breadcrumb" class="mb-6 flex items-center gap-2 text-xs text-white/60 flex-wrap">
        <a href="/" class="hover:text-white transition-colors">Home</a>
        <span class="text-white/30">&gt;</span>
        <a href="/play-games" class="hover:text-white transition-colors font-medium">Play games</a>
        <span class="text-white/30">&gt;</span>
        <span class="text-blue-400 font-bold" aria-current="page">${game.title}</span>
      </nav>

      <!-- Game Title Header -->
      <section class="mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                ${game.categoryName}
              </span>
              <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Instant Play • No Download
              </span>
              <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white/5 text-white/60">
                ${game.difficulty}
              </span>
            </div>
            <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
              ${game.title}
            </h1>
            <p class="text-xs sm:text-sm text-white/60 mt-1">
              ${game.tagline}
            </p>
          </div>
          <div class="flex items-center gap-3 bg-white/[0.03] border border-white/5 px-3.5 py-2 rounded-2xl">
            <div class="text-amber-400 font-bold text-sm">&starf; 4.9 <span class="text-[10px] text-white/40">(${game.votes})</span></div>
            <span class="text-white/20">|</span>
            <div class="text-xs text-white/60 font-semibold">&bull; ${game.plays} plays</div>
          </div>
        </div>
      </section>

      <!-- Interactive Game Viewport -->
      <section class="mb-10 rounded-3xl bg-[#0e0e17] border border-white/10 shadow-2xl overflow-hidden relative flex flex-col" style="min-height: 520px;">
        <div class="bg-[#12121e] border-b border-white/5 px-4 py-2.5 flex items-center justify-between text-xs text-white/70">
          <div class="flex items-center gap-2 font-medium">
            <span class="text-base">${game.icon}</span>
            <span class="font-bold text-white">${game.title}</span>
            <span class="text-[10px] text-white/40 hidden sm:inline">&bull; 60 FPS HTML5</span>
          </div>
          <a href="${game.isNative ? '/play-games/bubble-mania' : game.path}" class="px-3 py-1 bg-blue-600 rounded-lg text-white font-bold text-xs">Open Full Screen</a>
        </div>
        <div class="flex-1 w-full relative bg-black flex items-center justify-center overflow-hidden" style="min-height: 480px;">
          ${game.isNative ? `
            <div class="w-full h-full bg-gradient-to-br ${game.color} flex flex-col items-center justify-center p-6 text-center">
              <div class="text-7xl mb-4 animate-bounce">🫧</div>
              <h2 class="text-3xl font-black text-white mb-2">Bubble Pop Mania</h2>
              <p class="text-sm text-white/80 max-w-md mb-6">Match 3 colorful bubbles, trigger power-up cascades, and beat the high score!</p>
              <button onclick="window.location.reload()" class="px-8 py-3.5 rounded-2xl bg-white text-indigo-950 font-black text-base shadow-2xl hover:scale-105 transition-all">START PLAYING NOW</button>
            </div>
          ` : `
            <iframe src="${game.path}" title="${game.title}" class="w-full h-full absolute inset-0 border-0" allow="autoplay; fullscreen; keyboard" sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-downloads"></iframe>
          `}
        </div>
      </section>

      <!-- Overview -->
      <section class="mb-12 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5">
        <h2 class="text-xl sm:text-2xl font-bold text-white mb-4">About ${game.title}</h2>
        <div class="space-y-4 text-sm text-white/70 leading-relaxed">
          ${game.overview.map(p => `<p>${p}</p>`).join('\n          ')}
        </div>
      </section>

      <!-- Controls & How to Play -->
      <section class="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
          <h3 class="text-lg font-bold text-white mb-4">Game Controls</h3>
          <div class="space-y-4 text-xs text-white/70">
            <div>
              <h4 class="font-bold text-blue-400 uppercase tracking-wider mb-2">Desktop (PC / Mac / Chromebook)</h4>
              <ul class="space-y-1.5">
                ${game.controls.desktop.map(c => `<li>&bull; ${c}</li>`).join('\n                ')}
              </ul>
            </div>
            <div class="border-t border-white/5 pt-3">
              <h4 class="font-bold text-emerald-400 uppercase tracking-wider mb-2">Mobile & Tablet Touchscreen</h4>
              <ul class="space-y-1.5">
                ${game.controls.mobile.map(c => `<li>&bull; ${c}</li>`).join('\n                ')}
              </ul>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
          <h3 class="text-lg font-bold text-white mb-4">How to Play & Rules</h3>
          <ol class="space-y-3 text-xs text-white/70">
            ${game.howToPlay.map((step, idx) => `
              <li class="flex items-start gap-2.5">
                <span class="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 text-[10px]">${idx + 1}</span>
                <span class="leading-relaxed">${step}</span>
              </li>
            `).join('')}
          </ol>
        </div>
      </section>

      <!-- Pro Strategies -->
      <section class="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
        <h2 class="text-xl sm:text-2xl font-bold text-white mb-2">Pro Tips &amp; High Score Strategies for ${game.title}</h2>
        <p class="text-xs sm:text-sm text-white/60 mb-6">Field-tested advice to boost your score and master every round:</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${game.proStrategies.map(tip => `
            <div class="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-white/70 leading-relaxed">
              <span class="text-emerald-400 font-bold">&check;</span> ${tip}
            </div>
          `).join('')}
        </div>
      </section>

      <!-- FAQs -->
      <section class="mb-12">
        <h2 class="text-xl sm:text-2xl font-bold text-white text-center mb-6">${game.title} Frequently Asked Questions</h2>
        <div class="max-w-3xl mx-auto space-y-3">
          ${game.faqs.map(faq => `
            <details class="rounded-2xl bg-white/[0.02] border border-white/5 p-4 text-xs text-white/70 leading-relaxed cursor-pointer">
              <summary class="font-bold text-sm text-white flex justify-between items-center select-none">
                <span>${faq.q}</span>
                <span class="text-blue-400 text-base font-bold">+</span>
              </summary>
              <p class="mt-3 text-white/60 border-t border-white/5 pt-3">${faq.a}</p>
            </details>
          `).join('')}
        </div>
      </section>
    </main>

    <footer class="border-t border-white/5 py-8 text-center text-xs text-white/40 bg-[#0a0a0f]">
      <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; 2026 Medhastone. All rights reserved.</div>
        <div class="flex items-center gap-6">
          <a href="/" class="hover:text-white">Home</a>
          <a href="/play-games" class="hover:text-white">Play Games</a>
          <a href="/lexibrain/privacy-policy" class="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  </div>

  <!-- Client-side React Hydration for interactive features -->
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(gameDir, 'index.html'), html, 'utf-8');
  console.log(`Generated public/play-games/${gameId}/index.html`);
}

console.log('All 18 single game pages successfully generated!');
