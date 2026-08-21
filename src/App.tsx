/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ShaderBackground from './components/ShaderBackground';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTopFAB from './components/ScrollToTopFAB';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import MediJourney from './components/MediJourney';
import BrainMaze from './components/BrainMaze';
import ParkDock from './components/ParkDock';
import PDFZero from './components/PDFZero';
import RojgarBahi from './components/RojgarBahi';
import RojgarBahiPrivacy from './components/RojgarBahiPrivacy';
import GamesHub from './components/GamesHub';
import GamePlayer from './components/GamePlayer';
import MediJourneyPrivacy from './components/MediJourneyPrivacy';
import MediJourneyTerms from './components/MediJourneyTerms';
import MediJourneyContact from './components/MediJourneyContact';

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setRoute(hash);
      const cleanHash = hash.replace(/^#\/?/, '#').replace(/\/$/, '');
      
      // Handle smooth scrolling back to sections when returning from a subpage
      // Don't scroll if it's a dedicated page route
      if (
        cleanHash && 
        cleanHash !== '#privacy' && 
        cleanHash !== '#terms' && 
        cleanHash !== '#medijourney' &&
        cleanHash !== '#medijourney/privacy-policy' &&
        cleanHash !== '#medijourney/terms-of-service' &&
        cleanHash !== '#medijourney/contact-us' && 
        cleanHash !== '#brainmaze' && 
        cleanHash !== '#parkdock' && 
        cleanHash !== '#pdfzero' && 
        cleanHash !== '#rojgarbahi' &&
        cleanHash !== '#rojgarbahi/privacy-policy' &&
        cleanHash !== '#play-games' &&
        !cleanHash.startsWith('#game/')
      ) {
        setTimeout(() => {
          const el = document.querySelector(cleanHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    const cleanRoute = route.replace(/^#\/?/, '#').replace(/\/$/, '');
    if (cleanRoute === '#privacy') return <Privacy />;
    if (cleanRoute === '#terms') return <Terms />;
    if (cleanRoute === '#medijourney') return <MediJourney />;
    if (cleanRoute === '#medijourney/privacy-policy') return <MediJourneyPrivacy />;
    if (cleanRoute === '#medijourney/terms-of-service') return <MediJourneyTerms />;
    if (cleanRoute === '#medijourney/contact-us') return <MediJourneyContact />;

    if (cleanRoute === '#brainmaze') return <BrainMaze />;
    if (cleanRoute === '#parkdock') return <ParkDock />;
    if (cleanRoute === '#pdfzero') return <PDFZero />;
    if (cleanRoute === '#rojgarbahi') return <RojgarBahi />;
    if (cleanRoute === '#rojgarbahi/privacy-policy') return <RojgarBahiPrivacy />;
    if (cleanRoute === '#play-games') return <GamesHub />;
    
    return (
      <div className="flex flex-col w-full relative overflow-x-hidden">
        <ShaderBackground />
        <Hero />
        <Portfolio />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </div>
    );
  };

  const cleanGlobalRoute = route.replace(/^#\/?/, '#').replace(/\/$/, '');
  if (cleanGlobalRoute.startsWith('#game/')) {
    return <GamePlayer route={route} />;
  }

  return (
    <div className="bg-background font-body-md text-on-surface select-none relative min-h-screen flex flex-col">
      <ScrollProgress />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 blur-[120px] rounded-full z-0 pointer-events-none fixed"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[150px] rounded-full z-0 pointer-events-none fixed"></div>
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] bg-blue-500/20 blur-[100px] rounded-full z-0 pointer-events-none fixed"></div>
      
      <div className="fixed inset-0 scanlines z-0 pointer-events-none"></div>
      <Navbar />
      
      <main className="w-full pt-20 bg-transparent relative z-10 flex-1">
        {renderContent()}
      </main>
      
      <Footer />
      <ScrollToTopFAB />
    </div>
  );
}
