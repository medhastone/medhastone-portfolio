const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const audio = {
    playTone: (freq, type, duration, vol=0.1) => {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    },
    
    reveal: () => audio.playTone(300, 'sine', 0.05, 0.05),
    flag: () => audio.playTone(600, 'square', 0.1, 0.05),
    unflag: () => audio.playTone(400, 'square', 0.1, 0.05),
    explosion: () => {
        audio.playTone(100, 'sawtooth', 0.5, 0.2);
        setTimeout(() => audio.playTone(50, 'square', 0.4, 0.3), 50);
    },
    win: () => {
        audio.playTone(400, 'sine', 0.1, 0.1);
        setTimeout(() => audio.playTone(600, 'sine', 0.1, 0.1), 100);
        setTimeout(() => audio.playTone(800, 'sine', 0.3, 0.1), 200);
    },
    chord: () => audio.playTone(500, 'sine', 0.1, 0.05)
};
