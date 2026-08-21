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
            // Ignore
        }
    }

    playClick() { this.playTone(600, 'sine', 0.1, 0.2); }
    playGrab() { this.playTone(300, 'triangle', 0.1, 0.3); }
    playDrop() { this.playTone(200, 'sine', 0.15, 0.4); }
    playInvalid() {
        this.playTone(150, 'sawtooth', 0.15, 0.3);
        setTimeout(() => this.playTone(100, 'sawtooth', 0.15, 0.3), 100);
    }
    playClear(comboCount = 1) {
        const baseFreq = 400 + (comboCount * 100);
        this.playTone(baseFreq, 'square', 0.2, 0.3);
        setTimeout(() => this.playTone(baseFreq * 1.5, 'sine', 0.3, 0.4), 100);
        if(comboCount > 1) {
            setTimeout(() => this.playTone(baseFreq * 2, 'sine', 0.4, 0.5), 200);
        }
    }
    playGameOver() {
        this.playTone(300, 'sawtooth', 0.3, 0.4);
        setTimeout(() => this.playTone(250, 'sawtooth', 0.4, 0.4), 250);
        setTimeout(() => this.playTone(200, 'sawtooth', 0.6, 0.4), 600);
    }
}
