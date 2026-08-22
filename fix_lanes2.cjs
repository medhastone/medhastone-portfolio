const fs = require('fs');

let game = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

const updatedController = `class PlayerController {
    constructor(game, lanes = 3) {
        this.game = game;
        this.lanes = lanes;
        this.bound = false;
        this.laneCoordinates = [0, 0, 0];
        this.bindInputs();
    }

    calculateLanes() {
        if (!this.game.canvas) return;
        const canvasWidth = this.game.canvas.width;
        const roadW = canvasWidth * 0.8; 
        const roadX = (canvasWidth - roadW) / 2;
        const laneWidth = roadW / this.lanes;
        
        for (let i = 0; i < this.lanes; i++) {
            this.laneCoordinates[i] = roadX + (i * laneWidth) + (laneWidth / 2);
        }
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
        
        this.updatePosition();
    }
    
    updatePosition() {
        const p = this.game.player;
        if (!p) return;
        this.calculateLanes();
        if (p.lane === undefined) p.lane = 1;
        p.x = this.laneCoordinates[p.lane] - (p.width / 2);
    }

    update(dt) {
        // Enforce boundaries each frame to prevent any drift and handle resize
        this.updatePosition();
    }
}
`;

game = game.replace(/class PlayerController \{[\s\S]*?    \}\n\n    update\(dt\) \{[\s\S]*?    \}\n\}/g, updatedController.trim());

fs.writeFileSync('public/games/racing-2d/js/game.js', game);
