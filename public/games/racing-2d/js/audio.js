class AudioManager {
    constructor() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
    }
    
    playTone(freq, type, duration, vol=0.1) {
        if(this.ctx.state === 'suspended') this.ctx.resume();
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
    
    coin() {
        this.playTone(800, 'sine', 0.1, 0.1);
        setTimeout(() => this.playTone(1200, 'sine', 0.2, 0.1), 100);
    }
    
    crash() {
        this.playTone(100, 'sawtooth', 0.5, 0.3);
        // Noise burst
        const bufferSize = this.ctx.sampleRate * 0.5;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
        noise.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();
    }
    
    nitro() {
        this.playTone(200, 'square', 0.5, 0.1);
        setTimeout(() => this.playTone(300, 'square', 0.5, 0.1), 100);
    }
    
    click() {
        this.playTone(400, 'sine', 0.1, 0.1);
    }
}
window.audio = new AudioManager();
