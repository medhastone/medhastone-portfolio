const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const audio = {
    playTone: (freq, type, duration, vol=0.1, sweep=false) => {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        if(sweep) {
            osc.frequency.exponentialRampToValueAtTime(freq/2, audioCtx.currentTime + duration);
        }
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    },
    
    flap: () => audio.playTone(300, 'sine', 0.2, 0.1, true),
    coin: () => {
        audio.playTone(800, 'sine', 0.1, 0.05);
        setTimeout(() => audio.playTone(1200, 'sine', 0.2, 0.05), 100);
    },
    hit: () => {
        audio.playTone(150, 'sawtooth', 0.3, 0.2, true);
        setTimeout(() => audio.playTone(100, 'square', 0.4, 0.3, true), 100);
    },
    score: () => audio.playTone(600, 'square', 0.1, 0.05),
    powerup: () => {
        audio.playTone(400, 'sine', 0.2, 0.1);
        setTimeout(() => audio.playTone(600, 'sine', 0.2, 0.1), 100);
        setTimeout(() => audio.playTone(800, 'sine', 0.4, 0.1), 200);
    }
};
