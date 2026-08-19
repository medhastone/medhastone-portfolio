export default function Footer() {
  return (
    <footer className="w-full bg-transparent border-t border-outline-variant/30 pt-xl pb-lg relative z-10 glass-card rounded-t-3xl mt-auto">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-xl mb-xl">
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <img 
              alt="Medhastone Brand Logo" 
              className="h-10 w-auto mb-md opacity-90 drop-shadow-[0_0_8px_rgba(142,213,255,0.5)] mx-auto md:mx-0" 
              src="https://lh3.googleusercontent.com/aida/AP1WRLs8Pbam4ew8t9A1ruwh3ef0gCx8FIRLXHnqtH2XqJIf1Ax7s0cuTjWrqcPh52M-avpQv0lVfHXOm_c-wxlhvUW-T8Knz__gOcCY1K92g9xqWj0Mb73gc7-2usHDQxoL5jtvs9-k-hHnnlywr9BDnsh7OREgBAmBqEitEZcVUmpJ8P8gpoPdWPnm7m0hgAwmimNlHxneTls9tTjJweoi_4pfXwdQ5pU8O-YArZ5sGZuHLXFJ44wVIHM96g"
            />
            <p className="text-body-md text-on-surface-variant max-w-[500px] leading-relaxed mx-auto md:mx-0">
              Medhastone is a specialized software engineering studio focused on developing high-performance, cross-platform applications and immersive WebGL experiences. We combine rigorous technical architecture with meticulous interface design to deliver resilient, enterprise-grade digital products.
            </p>
          </div>
          <div className="flex flex-col gap-sm items-center md:items-start">
            <h4 className="text-label-caps text-on-surface mb-base tracking-widest">SOCIAL</h4>
            <a className="flex items-center gap-base text-on-surface-variant hover:text-primary hover:drop-shadow-[0_0_8px_rgba(142,213,255,0.8)] transition-all" href="https://www.instagram.com/krchandan566?igsh=MXZzaDFta2VwMTNqdQ==" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              <span className="text-body-md">Instagram</span>
            </a>
            <a className="flex items-center gap-base text-on-surface-variant hover:text-primary hover:drop-shadow-[0_0_8px_rgba(142,213,255,0.8)] transition-all" href="https://www.linkedin.com/in/medhastone" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-[18px]">link</span>
              <span className="text-body-md">LinkedIn</span>
            </a>
            <a className="flex items-center gap-base text-on-surface-variant hover:text-primary hover:drop-shadow-[0_0_8px_rgba(142,213,255,0.8)] transition-all" href="https://play.google.com/store/apps/details?id=com.aistudio.parkdock.a1b2c3d4e5" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span className="text-body-md">Google Play</span>
            </a>
          </div>
          <div className="flex flex-col gap-sm items-center md:items-end">
            <button 
              className="flex items-center gap-base p-sm bg-surface-container/50 border border-outline-variant rounded-xl hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(142,213,255,0.3)] transition-all backdrop-blur-sm" 
              onClick={() => window.scrollTo(0,0)}
            >
              <span className="material-symbols-outlined">arrow_upward</span>
              <span className="text-label-caps tracking-widest">BACK TO TOP</span>
            </button>
          </div>
        </div>
        <div className="pt-md border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-md">
          <p className="text-label-mono text-on-surface-variant tracking-widest text-center md:text-left">© 2026 MEDHASTONE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-lg">
            <a className="text-label-mono text-on-surface-variant hover:text-primary transition-colors tracking-widest" href="#privacy">PRIVACY</a>
            <a className="text-label-mono text-on-surface-variant hover:text-primary transition-colors tracking-widest" href="#terms">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
