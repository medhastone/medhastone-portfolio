const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const audio = {
    playTone: (freq, type, duration, vol=0.1) => {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    },
    
    playNoise: (duration, vol=0.1) => {
        if(audioCtx.state === 'suspended') audioCtx.resume();
        const bufferSize = audioCtx.sampleRate * duration;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for(let i=0; i<bufferSize; i++) data[i] = Math.random() * 2 - 1;
        
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const gain = audioCtx.createGain();
        
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        
        noise.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start();
    },

    move: () => audio.playTone(150, 'sine', 0.1, 0.2),
    capture: () => {
        audio.playNoise(0.1, 0.2);
        audio.playTone(100, 'square', 0.1, 0.1);
    },
    check: () => {
        audio.playTone(600, 'triangle', 0.2, 0.2);
        setTimeout(() => audio.playTone(800, 'triangle', 0.3, 0.2), 100);
    },
    win: () => {
        [400, 500, 600, 800, 1000].forEach((freq, i) => {
            setTimeout(() => audio.playTone(freq, 'sine', 0.3, 0.2), i * 150);
        });
    },
    lose: () => {
        [300, 250, 200, 150].forEach((freq, i) => {
            setTimeout(() => audio.playTone(freq, 'sawtooth', 0.4, 0.2), i * 200);
        });
    },
    click: () => audio.playTone(400, 'sine', 0.1, 0.05)
};
