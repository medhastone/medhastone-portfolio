const fs = require('fs');

// --- 1. Modify engine.js ---
let engine = fs.readFileSync('public/games/racing-2d/js/engine.js', 'utf8');
engine = engine.replace(
    /\/\/ Lateral movement[\s\S]*?\/\/ Boundaries/g,
    `// Lateral movement handled by PlayerController\n\n        // Boundaries`
);
fs.writeFileSync('public/games/racing-2d/js/engine.js', engine);

// --- 2. Modify game.js ---
let game = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

const controllerClass = `class PlayerController {
    constructor(game, lanes = 4) {
        this.game = game;
        this.lanes = lanes;
        this.bound = false;
        this.bindInputs();
    }

    bindInputs() {
        if (this.bound) return;
        this.bound = true;

        window.addEventListener('keydown', e => {
            if (!this.game.isRunning || this.game.isPaused || this.game.isCrashed) return;
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                this.changeLane(-1);
            }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                this.changeLane(1);
            }
        });

        const bindBtn = (id, dir) => {
            const btn = document.getElementById(id);
            if (!btn) return;
            const tap = (e) => {
                if (e.cancelable) e.preventDefault();
                if (!this.game.isRunning || this.game.isPaused || this.game.isCrashed) return;
                this.changeLane(dir);
                btn.classList.add('active');
                setTimeout(() => btn.classList.remove('active'), 100);
            };
            btn.addEventListener('touchstart', tap, {passive: false});
            btn.addEventListener('mousedown', tap);
        };
        bindBtn('btn-left', -1);
        bindBtn('btn-right', 1);

        // Mobile tap zones
        if (this.game.canvas) {
            this.game.canvas.addEventListener('touchstart', (e) => {
                if (e.cancelable) e.preventDefault();
                if (!this.game.isRunning || this.game.isPaused || this.game.isCrashed) return;
                
                const touch = e.changedTouches[0];
                if (!touch) return;
                
                const rect = this.game.canvas.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                if (x < rect.width / 2) {
                    this.changeLane(-1);
                } else {
                    this.changeLane(1);
                }
            }, {passive: false});
        }
    }

    changeLane(dir) {
        const p = this.game.player;
        if (!p) return;
        
        if (p.lane === undefined) p.lane = 1;
        
        p.lane += dir;
        if (p.lane < 0) p.lane = 0;
        if (p.lane >= this.lanes) p.lane = this.lanes - 1;
    }

    update(dt) {
        const p = this.game.player;
        if (!p) return;
        
        if (p.lane === undefined) p.lane = 1;
        
        const canvasWidth = this.game.canvas.width;
        const roadW = canvasWidth * 0.8; 
        const roadX = (canvasWidth - roadW) / 2;
        const laneWidth = roadW / this.lanes;
        
        const targetX = roadX + (p.lane * laneWidth) + (laneWidth / 2) - (p.width / 2);
        
        // Smoothly interpolate to the exact lane center
        p.x += (targetX - p.x) * 15 * dt * p.handleMod;
    }
}

`;

game = controllerClass + game;

// Add instantiation
game = game.replace(/this\.player = null;/g, `this.player = null;\n        this.controller = new PlayerController(this);`);

// Reset lane on start
game = game.replace(/this\.difficulty = 1;/g, `this.difficulty = 1;\n        if(this.player) this.player.lane = 1;`);

// Clean up original input bindings for left/right
game = game.replace(/if \(e\.key === 'ArrowLeft' \|\| e\.key === 'a'\) this\.keys\['ArrowLeft'\] = true;\n/g, '');
game = game.replace(/if \(e\.key === 'ArrowRight' \|\| e\.key === 'd'\) this\.keys\['ArrowRight'\] = true;\n/g, '');
game = game.replace(/if \(e\.key === 'ArrowLeft' \|\| e\.key === 'a'\) this\.keys\['ArrowLeft'\] = false;\n/g, '');
game = game.replace(/if \(e\.key === 'ArrowRight' \|\| e\.key === 'd'\) this\.keys\['ArrowRight'\] = false;\n/g, '');

game = game.replace(/bindBtn\('btn-left', 'ArrowLeft'\);\n/g, '');
game = game.replace(/bindBtn\('btn-right', 'ArrowRight'\);\n/g, '');

// Prevent double binding by removing handleTouch which had left/right logic, or just leaving it since it resets keys but wait - handleTouch was specifically setting keys. Let's remove handleTouch entirely as PlayerController handles tap zones.
game = game.replace(/this\.canvas\.addEventListener\('touchstart', e => this\.handleTouch\(e, true\), \{passive: false\}\);\n/g, '');
game = game.replace(/this\.canvas\.addEventListener\('touchend', e => this\.handleTouch\(e, false\), \{passive: false\}\);\n/g, '');

// Actually, I should remove handleTouch function completely.
game = game.replace(/    handleTouch\(e, isDown\) \{[\s\S]*?\}\n\n    start/g, '    start');

// Inject controller.update into Game.update
game = game.replace(/this\.player\.update\(this\.keys, this\.canvas\.width, dt\);/g, `this.controller.update(dt);\n            this.player.update(this.keys, this.canvas.width, dt);`);


fs.writeFileSync('public/games/racing-2d/js/game.js', game);
