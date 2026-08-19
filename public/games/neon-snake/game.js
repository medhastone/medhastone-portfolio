/**
 * NEON SNAKE - Cyber Arcade Engine
 * Standalone HTML5 Game
 */

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d', { alpha: false }); // Optimize performance

// UI Elements
const ui = {
    menu: document.getElementById('menu-screen'),
    hud: document.getElementById('hud'),
    pause: document.getElementById('pause-screen'),
    gameOver: document.getElementById('game-over-screen'),
    settings: document.getElementById('settings-screen'),
    mobileControls: document.getElementById('mobile-controls'),
    
    // Texts
    score: document.getElementById('hud-score'),
    bestScore: document.getElementById('hud-best'),
    menuBest: document.getElementById('menu-high-score'),
    goScore: document.getElementById('go-score'),
    goCombo: document.getElementById('go-combo'),
    goEnergy: document.getElementById('go-energy'),
    goTime: document.getElementById('go-time'),
    newRecord: document.getElementById('new-record-alert'),
    
    // Combo
    comboContainer: document.getElementById('combo-container'),
    comboText: document.getElementById('combo-text'),
    comboBar: document.getElementById('combo-bar'),
    
    // Buttons
    btnPlay: document.getElementById('btn-play'),
    btnSettings: document.getElementById('btn-settings'),
    btnPause: document.getElementById('btn-pause'),
    btnFs: document.getElementById('btn-fs'),
    btnResume: document.getElementById('btn-resume'),
    btnQuit: document.getElementById('btn-quit'),
    btnRestart: document.getElementById('btn-restart'),
    btnMenu: document.getElementById('btn-menu'),
    btnCloseSettings: document.getElementById('btn-close-settings'),
    
    // Toggles
    toggleSfx: document.getElementById('toggle-sfx'),
    toggleVfx: document.getElementById('toggle-vfx'),
    toggleControls: document.getElementById('toggle-controls')
};

// Game Configuration
const CONFIG = {
    gridSize: 25,
    initialSpeed: 150, // ms per move
    minSpeed: 60,
    speedDecrement: 2,
    colors: {
        bg: '#050510',
        grid: 'rgba(0, 243, 255, 0.05)',
        snakeHead: '#fff',
        snakeBody: '#00f3ff',
        food: '#bc13fe',
        danger: '#ff007f'
    }
};

// Game State
const STATE = {
    MENU: 0,
    PLAYING: 1,
    PAUSED: 2,
    GAMEOVER: 3
};

let currentState = STATE.MENU;
let lastTime = 0;
let moveAccumulator = 0;
let animationId;

// Player Data
let snake = [];
let direction = { x: 1, y: 0 };
let inputQueue = [];
let food = { x: 0, y: 0, type: 'normal' };
let particles = [];

// Stats
let score = 0;
let highScore = localStorage.getItem('neonSnakeHighScore') || 0;
let combo = 1;
let comboTimer = 0;
let energyCollected = 0;
let startTime = 0;
let survivalTime = 0;
let currentSpeed = CONFIG.initialSpeed;

// Settings
let settings = {
    sfx: true,
    vfx: true,
    showControls: false // Auto-detected later
};

// Audio System (Procedural Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const playSound = (type) => {
    if (!settings.sfx || audioCtx.state === 'suspended') return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    const now = audioCtx.currentTime;
    
    switch(type) {
        case 'eat':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
            break;
        case 'gameover':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
            break;
        case 'click':
            osc.type = 'square';
            osc.frequency.setValueAtTime(600, now);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
            break;
    }
};

// Resize Handling
const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- CORE SYSTEMS ---

function initGame() {
    // Reset Stats
    score = 0;
    combo = 1;
    comboTimer = 0;
    energyCollected = 0;
    currentSpeed = CONFIG.initialSpeed;
    startTime = Date.now();
    
    ui.score.innerText = score;
    ui.bestScore.innerText = highScore;
    
    // Initialize Snake in middle
    const startX = Math.floor((canvas.width / 2) / CONFIG.gridSize);
    const startY = Math.floor((canvas.height / 2) / CONFIG.gridSize);
    
    snake = [
        { x: startX, y: startY },
        { x: startX - 1, y: startY },
        { x: startX - 2, y: startY }
    ];
    
    direction = { x: 1, y: 0 };
    inputQueue = [];
    particles = [];
    
    spawnFood();
    changeState(STATE.PLAYING);
}

function spawnFood() {
    const maxX = Math.floor(canvas.width / CONFIG.gridSize) - 1;
    const maxY = Math.floor(canvas.height / CONFIG.gridSize) - 1;
    
    let valid = false;
    while (!valid) {
        food.x = Math.floor(Math.random() * (maxX - 2)) + 1;
        food.y = Math.floor(Math.random() * (maxY - 2)) + 1;
        
        valid = true;
        for (let segment of snake) {
            if (segment.x === food.x && segment.y === food.y) {
                valid = false;
                break;
            }
        }
    }
}

function createParticles(x, y, color, count) {
    if (!settings.vfx) return;
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x * CONFIG.gridSize + CONFIG.gridSize/2,
            y: y * CONFIG.gridSize + CONFIG.gridSize/2,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 1.0,
            color: color
        });
    }
}

function update(dt) {
    if (currentState !== STATE.PLAYING) return;

    // Combo Drain
    if (combo > 1) {
        comboTimer -= dt;
        if (comboTimer <= 0) {
            combo = 1;
            ui.comboContainer.classList.add('hidden');
        } else {
            ui.comboBar.style.transform = `scaleX(${comboTimer / 5})`;
        }
    }

    moveAccumulator += dt * 1000;
    
    if (moveAccumulator >= currentSpeed) {
        moveAccumulator = 0;
        moveSnake();
    }
    
    // Update Particles
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2;
        if (p.life <= 0) particles.splice(i, 1);
    }
}

function moveSnake() {
    if (inputQueue.length > 0) {
        direction = inputQueue.shift();
    }
    
    const head = { 
        x: snake[0].x + direction.x, 
        y: snake[0].y + direction.y 
    };
    
    // Wall Collision (Wrap around logic for cyberpunk feel, or instant death. Let's do instant death for arcade challenge)
    const maxX = Math.floor(canvas.width / CONFIG.gridSize);
    const maxY = Math.floor(canvas.height / CONFIG.gridSize);
    
    if (head.x < 0 || head.x >= maxX || head.y < 0 || head.y >= maxY || checkSelfCollision(head)) {
        gameOver();
        return;
    }
    
    snake.unshift(head);
    
    // Check Food Collection
    if (head.x === food.x && head.y === food.y) {
        playSound('eat');
        createParticles(food.x, food.y, CONFIG.colors.food, 15);
        
        energyCollected++;
        score += 10 * combo;
        ui.score.innerText = score;
        
        // Increase Combo
        combo = Math.min(combo + 1, 10);
        comboTimer = 5; // 5 seconds to get next
        if (combo > 1) {
            ui.comboContainer.classList.remove('hidden');
            ui.comboText.innerText = `x${combo} COMBO!`;
        }
        
        // Increase Speed
        currentSpeed = Math.max(CONFIG.minSpeed, currentSpeed - CONFIG.speedDecrement);
        
        spawnFood();
    } else {
        snake.pop(); // Remove tail if not eaten
    }
}

function checkSelfCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

function gameOver() {
    playSound('gameover');
    createParticles(snake[0].x, snake[0].y, CONFIG.colors.danger, 50);
    
    survivalTime = Math.floor((Date.now() - startTime) / 1000);
    const mins = Math.floor(survivalTime / 60);
    const secs = (survivalTime % 60).toString().padStart(2, '0');
    
    ui.goScore.innerText = score;
    ui.goCombo.innerText = `x${combo}`;
    ui.goEnergy.innerText = energyCollected;
    ui.goTime.innerText = `${mins}:${secs}`;
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('neonSnakeHighScore', highScore);
        ui.newRecord.classList.remove('hidden');
    } else {
        ui.newRecord.classList.add('hidden');
    }
    
    changeState(STATE.GAMEOVER);
}

// --- RENDER SYSTEM ---

function draw() {
    // Clear Background
    ctx.fillStyle = CONFIG.colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (settings.vfx) {
        // Draw Grid
        ctx.strokeStyle = CONFIG.colors.grid;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += CONFIG.gridSize) {
            ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height);
        }
        for (let y = 0; y < canvas.height; y += CONFIG.gridSize) {
            ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);
        }
        ctx.stroke();
    }

    if (currentState === STATE.PLAYING || currentState === STATE.PAUSED || currentState === STATE.GAMEOVER) {
        // Draw Food (Glowing Orb)
        const fx = food.x * CONFIG.gridSize + CONFIG.gridSize/2;
        const fy = food.y * CONFIG.gridSize + CONFIG.gridSize/2;
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(fx, fy, CONFIG.gridSize/3, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        if (settings.vfx) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = CONFIG.colors.food;
        }
        ctx.fill();
        ctx.restore();

        // Draw Snake
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Draw Body (Trail)
        if (snake.length > 1) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(snake[0].x * CONFIG.gridSize + CONFIG.gridSize/2, snake[0].y * CONFIG.gridSize + CONFIG.gridSize/2);
            for (let i = 1; i < snake.length; i++) {
                ctx.lineTo(snake[i].x * CONFIG.gridSize + CONFIG.gridSize/2, snake[i].y * CONFIG.gridSize + CONFIG.gridSize/2);
            }
            ctx.strokeStyle = CONFIG.colors.snakeBody;
            ctx.lineWidth = CONFIG.gridSize * 0.6;
            if (settings.vfx) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = CONFIG.colors.snakeBody;
            }
            ctx.stroke();
            ctx.restore();
        }

        // Draw Head
        if (snake.length > 0 && currentState !== STATE.GAMEOVER) {
            const hx = snake[0].x * CONFIG.gridSize + CONFIG.gridSize/2;
            const hy = snake[0].y * CONFIG.gridSize + CONFIG.gridSize/2;
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(hx, hy, CONFIG.gridSize * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = CONFIG.colors.snakeHead;
            if (settings.vfx) {
                ctx.shadowBlur = 20;
                ctx.shadowColor = CONFIG.colors.snakeBody;
            }
            ctx.fill();
            ctx.restore();
        }

        // Draw Particles
        if (settings.vfx) {
            for (let p of particles) {
                ctx.save();
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
    }
}

// --- GAME LOOP ---

function gameLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    update(dt);
    draw();

    animationId = requestAnimationFrame(gameLoop);
}

// --- UI & STATE MANAGEMENT ---

function changeState(newState) {
    currentState = newState;
    
    // Hide all UI
    ui.menu.classList.add('hidden');
    ui.hud.classList.add('hidden');
    ui.pause.classList.add('hidden');
    ui.gameOver.classList.add('hidden');
    ui.settings.classList.add('hidden');
    ui.mobileControls.classList.add('hidden');
    
    switch(newState) {
        case STATE.MENU:
            ui.menuBest.innerText = highScore;
            ui.menu.classList.remove('hidden');
            // Resume Audio Context if suspended (Browser policy)
            if (audioCtx.state === 'suspended') audioCtx.resume();
            break;
        case STATE.PLAYING:
            ui.hud.classList.remove('hidden');
            if (settings.showControls || isMobileDevice()) {
                ui.mobileControls.classList.remove('hidden');
            }
            break;
        case STATE.PAUSED:
            ui.pause.classList.remove('hidden');
            break;
        case STATE.GAMEOVER:
            ui.gameOver.classList.remove('hidden');
            break;
    }
}

// --- INPUT HANDLING ---

function handleInput(key) {
    if (currentState !== STATE.PLAYING) return;
    
    let lastDir = inputQueue.length > 0 ? inputQueue[inputQueue.length - 1] : direction;
    let newDir = null;

    switch(key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
        case 'UP':
            if (lastDir.y === 0) newDir = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
        case 'DOWN':
            if (lastDir.y === 0) newDir = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
        case 'LEFT':
            if (lastDir.x === 0) newDir = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
        case 'RIGHT':
            if (lastDir.x === 0) newDir = { x: 1, y: 0 };
            break;
    }
    
    if (newDir && inputQueue.length < 3) {
        inputQueue.push(newDir);
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (currentState === STATE.PLAYING) changeState(STATE.PAUSED);
        else if (currentState === STATE.PAUSED) changeState(STATE.PLAYING);
    } else {
        handleInput(e.key);
    }
});

// Click anywhere to ensure iframe has focus
window.addEventListener('click', () => {
    window.focus();
});

// Touch swipe logic
let touchStartX = 0;
let touchStartY = 0;
window.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, {passive: false});

window.addEventListener('touchend', e => {
    // If clicking a button, ignore swipe
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    
    if (currentState !== STATE.PLAYING) return;
    
    let touchEndX = e.changedTouches[0].screenX;
    let touchEndY = e.changedTouches[0].screenY;
    
    let dx = touchEndX - touchStartX;
    let dy = touchEndY - touchStartY;
    
    if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > 30) { // Threshold
            if (dx > 0) handleInput('RIGHT');
            else handleInput('LEFT');
        }
    } else {
        if (Math.abs(dy) > 30) {
            if (dy > 0) handleInput('DOWN');
            else handleInput('UP');
        }
    }
}, {passive: false});

// Prevent scrolling on mobile
document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });

// Mobile D-Pad Events
const bindTouch = (id, dir) => {
    const btn = document.getElementById(id);
    const handler = (e) => {
        e.preventDefault(); // prevent double firing
        handleInput(dir);
    };
    btn.addEventListener('touchstart', handler, {passive: false});
    btn.addEventListener('mousedown', handler);
};
bindTouch('btn-up', 'UP');
bindTouch('btn-down', 'DOWN');
bindTouch('btn-left', 'LEFT');
bindTouch('btn-right', 'RIGHT');

// --- BUTTON LISTENERS ---

const addBtnListener = (elem, cb) => {
    elem.addEventListener('click', () => {
        playSound('click');
        cb();
    });
};

addBtnListener(ui.btnPlay, () => initGame());
addBtnListener(ui.btnSettings, () => {
    ui.menu.classList.add('hidden');
    ui.settings.classList.remove('hidden');
});
addBtnListener(ui.btnCloseSettings, () => {
    ui.settings.classList.add('hidden');
    changeState(STATE.MENU);
});
addBtnListener(ui.btnPause, () => changeState(STATE.PAUSED));
addBtnListener(ui.btnFs, () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => console.log(e));
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
});
addBtnListener(ui.btnResume, () => changeState(STATE.PLAYING));
addBtnListener(ui.btnQuit, () => changeState(STATE.MENU));
addBtnListener(ui.btnRestart, () => initGame());
addBtnListener(ui.btnMenu, () => changeState(STATE.MENU));

// Toggles
addBtnListener(ui.toggleSfx, () => {
    settings.sfx = !settings.sfx;
    ui.toggleSfx.innerText = settings.sfx ? 'ON' : 'OFF';
    ui.toggleSfx.className = settings.sfx ? 'toggle-btn active' : 'toggle-btn';
});
addBtnListener(ui.toggleVfx, () => {
    settings.vfx = !settings.vfx;
    ui.toggleVfx.innerText = settings.vfx ? 'HIGH' : 'LOW';
    ui.toggleVfx.className = settings.vfx ? 'toggle-btn active' : 'toggle-btn';
});
addBtnListener(ui.toggleControls, () => {
    settings.showControls = !settings.showControls;
    ui.toggleControls.innerText = settings.showControls ? 'ON' : 'OFF';
    ui.toggleControls.className = settings.showControls ? 'toggle-btn active' : 'toggle-btn';
    
    if (currentState === STATE.PLAYING) {
        if (settings.showControls) ui.mobileControls.classList.remove('hidden');
        else ui.mobileControls.classList.add('hidden');
    }
});

// Helper
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Init
settings.showControls = isMobileDevice();
ui.toggleControls.innerText = settings.showControls ? 'ON' : 'OFF';
ui.toggleControls.className = settings.showControls ? 'toggle-btn active' : 'toggle-btn';

// Start engine
requestAnimationFrame(gameLoop);
changeState(STATE.MENU);
