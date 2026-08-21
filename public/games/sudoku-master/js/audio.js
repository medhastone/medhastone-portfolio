const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const audio = {
    playTone: (freq, type, duration, vol=0.1) => {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    },
    
    click: () => audio.playTone(400, 'sine', 0.1, 0.05),
    place: () => audio.playTone(600, 'sine', 0.2, 0.1),
    error: () => {
        audio.playTone(150, 'sawtooth', 0.3, 0.1);
        setTimeout(() => audio.playTone(100, 'square', 0.4, 0.1), 100);
    },
    hint: () => {
        audio.playTone(800, 'sine', 0.1, 0.05);
        setTimeout(() => audio.playTone(1200, 'sine', 0.3, 0.1), 100);
    },
    win: () => {
        [400, 500, 600, 800, 1200].forEach((freq, i) => {
            setTimeout(() => audio.playTone(freq, 'sine', 0.3, 0.1), i * 150);
        });
    },
    lose: () => {
        [300, 250, 200, 150].forEach((freq, i) => {
            setTimeout(() => audio.playTone(freq, 'sawtooth', 0.4, 0.1), i * 200);
        });
    }
};
