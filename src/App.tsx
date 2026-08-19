/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
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

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setRoute(hash);
      
      // Handle smooth scrolling back to sections when returning from a subpage
      if (hash && hash !== '#privacy' && hash !== '#terms' && hash !== '#medijourney' && hash !== '#brainmaze' && hash !== '#parkdock' && hash !== '#pdfzero' && hash !== '#rojgarbahi') {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (route === '#privacy') return <Privacy />;
    if (route === '#terms') return <Terms />;
    if (route === '#medijourney') return <MediJourney />;
    if (route === '#brainmaze') return <BrainMaze />;
    if (route === '#parkdock') return <ParkDock />;
    if (route === '#pdfzero') return <PDFZero />;
    if (route === '#rojgarbahi') return <RojgarBahi />;
    
    return (
      <div className="flex flex-col w-full relative overflow-x-hidden">
        <ShaderBackground />
        <Hero />
        <Portfolio />
        <Services />
        <Contact />
      </div>
    );
  };

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
