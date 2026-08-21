export class AudioController {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    this.ctx = new AudioContext();
                }
            } catch (e) {
                console.warn("Web Audio API not supported", e);
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            try {
                this.ctx.resume().catch(e => console.warn("Audio resume blocked", e));
            } catch(e) {}
        }
    }

    playTone(frequency, type = 'sine', duration = 0.15, vol = 0.5) {
        try {
            this.init();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

            osc.connect(gainNode);
            gainNode.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime);
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.warn("Audio playback error:", e);
        }
    }

    playSelect() { this.playTone(600, 'sine', 0.1, 0.4); }
    playDrop() { this.playTone(400, 'sine', 0.1, 0.5); }
    playRemove() { this.playTone(300, 'triangle', 0.1, 0.4); }
    playCorrect() { 
        this.playTone(500, 'sine', 0.1, 0.3);
        setTimeout(() => this.playTone(800, 'sine', 0.15, 0.4), 80);
    }
    playError() {
        this.playTone(150, 'sawtooth', 0.2, 0.4);
        setTimeout(() => this.playTone(100, 'sawtooth', 0.2, 0.4), 150);
    }
    playWin() {
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((f, i) => setTimeout(() => this.playTone(f, 'sine', 0.3, 0.4), i * 150));
    }
}
