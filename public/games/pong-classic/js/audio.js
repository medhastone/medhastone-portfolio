class AudioSystem {
    constructor() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        this.enabled = true;
    }
    
    playTone(freq, type, duration, vol=0.1) {
        if (!this.enabled || this.ctx.state === 'suspended') return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }
    
    playPaddleHit() { this.playTone(600, 'square', 0.1, 0.05); }
    playWallHit() { this.playTone(400, 'square', 0.1, 0.05); }
    playScore() { 
        this.playTone(800, 'sine', 0.1, 0.1); 
        setTimeout(() => this.playTone(1200, 'sine', 0.3, 0.1), 100);
    }
    playPowerup() {
        this.playTone(400, 'sine', 0.1, 0.1);
        setTimeout(() => this.playTone(600, 'sine', 0.1, 0.1), 100);
        setTimeout(() => this.playTone(800, 'sine', 0.2, 0.1), 200);
    }
    resume() {
        if(this.ctx.state === 'suspended') this.ctx.resume();
    }
}
const audio = new AudioSystem();
