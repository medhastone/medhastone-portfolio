import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Maximize2, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Star, 
  Flame, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  Sparkles,
  Gamepad2,
  Trophy,
  ExternalLink,
  Share2,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Minimize2
} from 'lucide-react';
import { GAMES_DETAILED_DATA, GameDetailContent } from '../data/gamesContent';
import { GAMES, GameItem } from './GamesHubScreen';
import { playButton } from '../game/audio';
import GameScreen from './GameScreen';

interface Props {
  gameId: string;
  onNavigateHome: () => void;
  onNavigateHub: () => void;
  onSelectGame: (id: string) => void;
}

export default function SingleGamePage({ gameId, onNavigateHome, onNavigateHub, onSelectGame }: Props) {
  const gameData: GameDetailContent | undefined = GAMES_DETAILED_DATA[gameId] || GAMES_DETAILED_DATA['bubble-mania'];
  const [isPlayingNative, setIsPlayingNative] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Sync fullscreen state
  useEffect(() => {
    const handleFs = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFs);
    return () => document.removeEventListener('fullscreenchange', handleFs);
  }, []);

  // Dynamic SEO title, canonical & JSON-LD injection
  useEffect(() => {
    if (!gameData) return;

    const originalTitle = document.title;
    document.title = `${gameData.title} - Play Free Online (No Download) | Medhastone`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute('content', gameData.metaDescription);
    }

    // Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    const originalCanonical = canonical ? canonical.getAttribute('href') : '';
    const pageUrl = `https://zentova.in/play-games/${gameData.id}`;
    if (canonical) {
      canonical.setAttribute('href', pageUrl);
    }

    // JSON-LD Structured Data: BreadcrumbList + VideoGame + FAQPage
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = `single-game-schema-${gameData.id}`;
    schemaScript.text = JSON.stringify({
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
              "name": gameData.title,
              "item": pageUrl
            }
          ]
        },
        {
          "@type": "VideoGame",
          "@id": `${pageUrl}#game`,
          "name": gameData.title,
          "description": gameData.metaDescription,
          "genre": gameData.categoryName,
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
            "reviewCount": gameData.votes.replace(',', '')
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${pageUrl}#faq`,
          "mainEntity": gameData.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        }
      ]
    });
    document.head.appendChild(schemaScript);

    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) metaDesc.setAttribute('content', originalDesc);
      if (canonical && originalCanonical) canonical.setAttribute('href', originalCanonical);
      const existing = document.getElementById(`single-game-schema-${gameData.id}`);
      if (existing) existing.remove();
    };
  }, [gameData]);

  if (!gameData) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
        <button 
          onClick={onNavigateHub}
          className="px-4 py-2 bg-blue-600 rounded-xl font-semibold"
        >
          Return to Games Hub
        </button>
      </div>
    );
  }

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    playButton();
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().catch(err => console.error(err));
    } else {
      document.exitFullscreen?.().catch(err => console.error(err));
    }
  };

  // Handle Reload
  const handleReload = () => {
    playButton();
    if (gameData.isNative) {
      setIsPlayingNative(false);
      setTimeout(() => setIsPlayingNative(true), 50);
    } else if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  // Handle Share link
  const handleShare = async () => {
    playButton();
    const url = window.location.href;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Filter 4 related games
  const relatedGames = GAMES.filter(g => g.id !== gameData.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col antialiased selection:bg-blue-500 selection:text-white">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { playButton(); onNavigateHub(); }}
            className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all text-sm font-medium border border-white/5"
            aria-label="Back to Play Games"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">All Games</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-xs">
              M
            </div>
            <span className="font-bold text-sm tracking-wider text-white">MEDHASTONE <span className="text-blue-400 text-xs font-normal">GAMES</span></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all"
            title="Share Game Link"
          >
            <Share2 size={14} />
            <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
          </button>

          <a 
            href={gameData.isNative ? '#bubble-mania' : gameData.path}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all shadow-md shadow-blue-600/20"
          >
            <ExternalLink size={14} />
            <span>New Window</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb Navigation: Home > Play games > [Game Title] */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-white/60 flex-wrap">
          <button 
            onClick={() => { playButton(); onNavigateHome(); }}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            Home
          </button>
          <ChevronRight size={14} className="text-white/30" />
          <button 
            onClick={() => { playButton(); onNavigateHub(); }}
            className="hover:text-white transition-colors font-medium"
          >
            Play games
          </button>
          <ChevronRight size={14} className="text-white/30" />
          <span className="text-blue-400 font-bold" aria-current="page">
            {gameData.title}
          </span>
        </nav>

        {/* Game Title & Metadata Card */}
        <section className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {gameData.categoryName}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Instant Play • No Download
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white/5 text-white/60">
                  {gameData.difficulty}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {gameData.title}
              </h1>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                {gameData.tagline}
              </p>
            </div>

            {/* Rating & Play Metrics */}
            <div className="flex items-center gap-3 self-start sm:self-auto bg-white/[0.03] border border-white/5 px-3.5 py-2 rounded-2xl">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star size={16} className="fill-amber-400" />
                <span className="text-sm font-bold text-white">4.9</span>
                <span className="text-[10px] text-white/40">({gameData.votes})</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-1.5 text-xs text-white/60">
                <Flame size={14} className="text-rose-400" />
                <span className="font-semibold text-white/90">{gameData.plays}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Playable Game Viewport / Container */}
        <section 
          ref={playerContainerRef}
          className={`mb-10 rounded-3xl bg-[#0e0e17] border border-white/10 shadow-2xl overflow-hidden relative flex flex-col transition-all ${
            isFullscreen ? '!mb-0 !rounded-none !border-0 h-screen w-screen !min-h-screen fixed inset-0 z-50 bg-black' : ''
          }`}
          style={{ minHeight: isFullscreen ? '100vh' : '520px' }}
        >
          {/* Game Viewport Header Toolbar */}
          <div className="bg-[#12121e] border-b border-white/5 px-4 py-2.5 flex items-center justify-between text-xs text-white/70">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-base">{gameData.icon}</span>
              <span className="font-bold text-white">{gameData.title}</span>
              <span className="text-[10px] text-white/40 hidden sm:inline">• 60 FPS HTML5</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title={isMuted ? "Unmute Game" : "Mute Game"}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              <button
                onClick={handleReload}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="Restart / Reload Game"
              >
                <RotateCcw size={15} />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title={isFullscreen ? "Exit Fullscreen Mode" : "Enter Fullscreen Mode"}
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
            </div>
          </div>

          {/* Interactive Game Canvas or Iframe */}
          <div className="flex-1 w-full relative bg-black flex items-center justify-center overflow-hidden" style={{ minHeight: '480px' }}>
            {gameData.isNative ? (
              // Native Bubble Mania Embedded Player
              <div className="w-full h-full absolute inset-0 flex flex-col">
                {isPlayingNative ? (
                  <GameScreen 
                    level={1}
                    onWin={() => setIsPlayingNative(false)}
                    onLose={() => setIsPlayingNative(false)}
                    onQuit={() => setIsPlayingNative(false)}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${gameData.color} flex flex-col items-center justify-center p-6 text-center select-none`}>
                    <div className="text-7xl mb-4 animate-bounce">🫧</div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
                      Bubble Pop Mania
                    </h2>
                    <p className="text-sm text-white/80 max-w-md mb-6 leading-relaxed">
                      Aim, match 3 colors, detonate massive bubble cascades, and rack up high scores!
                    </p>
                    <button
                      onClick={() => { playButton(); setIsPlayingNative(true); }}
                      className="flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-white text-indigo-950 font-black text-base shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                      <Play size={20} className="fill-indigo-950" />
                      <span>START PLAYING NOW</span>
                    </button>
                    <span className="text-[11px] text-white/50 mt-3">
                      Press Fullscreen icon in top right for full immersion
                    </span>
                  </div>
                )}
              </div>
            ) : (
              // Embedded HTML5 Iframe Player for all external games
              <iframe
                ref={iframeRef}
                src={gameData.path}
                title={gameData.title}
                className="w-full h-full absolute inset-0 border-0"
                allow="autoplay; fullscreen; keyboard"
                sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-downloads"
              />
            )}
          </div>

          {/* Bottom Viewport Control Hint Bar */}
          <div className="bg-[#12121e] border-t border-white/5 px-4 py-2 flex items-center justify-between text-[11px] text-white/50">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Laptop size={12} /> Keyboard &amp; Mouse</span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1"><Smartphone size={12} /> Mobile Touchscreen</span>
            </div>
            <div className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Ready to Play
            </div>
          </div>
        </section>

        {/* SECTION 1: Comprehensive Game Overview */}
        <section className="mb-12 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-blue-400" />
            <span>About {gameData.title}</span>
          </h2>
          <div className="space-y-4 text-sm text-white/70 leading-relaxed">
            {gameData.overview.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </section>

        {/* SECTION 2: How to Play & Controls */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                <Gamepad2 size={20} className="text-emerald-400" />
                <h3>Game Controls</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Laptop size={14} /> Desktop (PC / Mac / Chromebook)
                  </h4>
                  <ul className="space-y-2 text-xs text-white/70">
                    {gameData.controls.desktop.map((ctrl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span>{ctrl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Smartphone size={14} /> Mobile &amp; Tablet Touchscreen
                  </h4>
                  <ul className="space-y-2 text-xs text-white/70">
                    {gameData.controls.mobile.map((ctrl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{ctrl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* How to Play Step-by-Step */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                <Trophy size={20} className="text-amber-400" />
                <h3>Step-by-Step Gameplay Rules</h3>
              </div>
              <ol className="space-y-3 text-xs text-white/70">
                {gameData.howToPlay.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* SECTION 3: Pro Strategies & High-Score Tactics */}
        <section className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
          <div className="max-w-3xl mb-6">
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 inline-block mb-2">
              Pro Gamer Strategy Guide
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Tips &amp; High Score Strategies for {gameData.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Want to beat the computer or set a new leaderboard record? Follow these field-tested tactics:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gameData.proStrategies.map((tip, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                <p className="text-xs text-white/70 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Technical Specifications & Compatibility */}
        <section className="mb-12 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5">
          <div className="max-w-2xl mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
              <Cpu size={20} className="text-blue-400" />
              <span>Technical Specs &amp; Compatibility</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Zero installation required. Runs locally inside your web browser sandbox.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-white/40 mb-1">Storage Required</div>
              <div className="font-bold text-emerald-400 text-sm">{gameData.systemRequirements.storage}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-white/40 mb-1">RAM Consumption</div>
              <div className="font-bold text-emerald-400 text-sm">{gameData.systemRequirements.ram}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-white/40 mb-1">Average Round</div>
              <div className="font-bold text-white text-sm">{gameData.avgTime}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-white/40 mb-1">Target FPS</div>
              <div className="font-bold text-blue-400 text-sm">60 FPS Smooth</div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Frequently Asked Questions (FAQ) */}
        <section className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full border border-white/10 inline-block mb-2">
              Help &amp; Questions
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {gameData.title} Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {gameData.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => {
                      playButton();
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-white/90 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 p-1 rounded-lg bg-white/5 text-white/60">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-white/60 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 6: Related Games Carousel */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Gamepad2 size={18} className="text-blue-400" />
              <span>More Free Games to Play</span>
            </h2>
            <button 
              onClick={() => { playButton(); onNavigateHub(); }}
              className="text-xs text-blue-400 hover:underline font-semibold"
            >
              View All 17 Games &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedGames.map(game => (
              <article
                key={game.id}
                onClick={() => {
                  playButton();
                  onSelectGame(game.id);
                }}
                className="group p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`aspect-video rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl mb-3 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                    <span>{game.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                    {game.categoryName}
                  </span>
                  <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors mt-0.5 mb-1">
                    {game.title}
                  </h3>
                  <p className="text-[11px] text-white/50 line-clamp-2 mb-3">
                    {game.description}
                  </p>
                </div>
                <div className="w-full py-1.5 rounded-xl bg-white/5 group-hover:bg-blue-600 text-center font-bold text-xs text-white/80 group-hover:text-white transition-colors">
                  Play Game
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/40 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white/70">Medhastone</span>
            <span>•</span>
            <span>Play {gameData.title} Free Online</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onNavigateHome} className="hover:text-white transition-colors">Home</button>
            <button onClick={onNavigateHub} className="hover:text-white transition-colors">Play Games</button>
            <a href="/lexibrain/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="mailto:medhastone@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Medhastone. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
