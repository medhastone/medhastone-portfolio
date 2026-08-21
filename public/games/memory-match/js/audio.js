export class AudioController {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx && this.enabled) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    this.ctx = new AudioContext();
                }
            } catch (e) {
                console.warn("Web Audio API not supported");
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
    }

    playTone(frequency, type = 'sine', duration = 0.1, vol = 0.1) {
        if (!this.ctx || !this.enabled) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = type;
            osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
            
            gain.gain.setValueAtTime(0, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch(e) {}
    }

    playClick() { this.playTone(800, 'sine', 0.1, 0.1); }
    playFlip() { this.playTone(400, 'triangle', 0.15, 0.1); }
    playMatch() { 
        this.playTone(600, 'square', 0.1, 0.1); 
        setTimeout(() => this.playTone(800, 'square', 0.2, 0.1), 100);
    }
    playError() { 
        this.playTone(200, 'sawtooth', 0.2, 0.1); 
        setTimeout(() => this.playTone(150, 'sawtooth', 0.3, 0.1), 150);
    }
    playLevelComplete() {
        this.playTone(400, 'square', 0.2, 0.1);
        setTimeout(() => this.playTone(600, 'square', 0.2, 0.1), 200);
        setTimeout(() => this.playTone(800, 'square', 0.2, 0.1), 400);
        setTimeout(() => this.playTone(1200, 'square', 0.4, 0.1), 600);
    }
    playCombo(multiplier) {
        const base = 400 + (multiplier * 100);
        this.playTone(base, 'sine', 0.2, 0.1);
        setTimeout(() => this.playTone(base * 1.5, 'sine', 0.3, 0.15), 100);
    }
}
