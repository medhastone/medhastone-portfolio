const fs = require('fs');
let game = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

// 1. Remove the PlayerController instantiation from start() to avoid duplicate listeners!
game = game.replace(/this\.isCrashed = false;\s*this\.controller = new PlayerController\(this\);/g, `this.isCrashed = false;`);

// 2. Add back the button bindings in PlayerController
const newBindInputs = `bindInputs() {
        // Only bind once
        if (this.bound) return;
        this.bound = true;
        
        window.addEventListener('keydown', e => {
            if (!this.game.isRunning || this.game.isPaused || this.game.isCrashed) return;
            if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && !this.leftPressed) {
                this.leftPressed = true;
                this.changeLane(-1);
            }
            if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && !this.rightPressed) {
                this.rightPressed = true;
                this.changeLane(1);
            }
        });
        
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.leftPressed = false;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.rightPressed = false;
        });

        // Mobile tap zones (Canvas)
        if (this.game.canvas) {
            this.game.canvas.addEventListener('touchstart', (e) => {
                if(e.cancelable) e.preventDefault();
                if (!this.game.isRunning || this.game.isPaused || this.game.isCrashed) return;
                
                const touch = e.changedTouches[0];
                if (!touch) return;
                
                if (touch.clientX < window.innerWidth / 2) {
                    this.changeLane(-1);
                } else {
                    this.changeLane(1);
                }
            }, {passive: false});
        }
        
        // On-screen buttons
        const bindBtn = (id, change) => {
            const btn = document.getElementById(id);
            if(!btn) return;
            const tap = (e) => {
                if(e.cancelable) e.preventDefault();
                if (!this.game.isRunning || this.game.isPaused || this.game.isCrashed) return;
                this.changeLane(change);
                btn.classList.add('active');
                setTimeout(() => btn.classList.remove('active'), 100);
            };
            btn.addEventListener('touchstart', tap, {passive: false});
            btn.addEventListener('mousedown', tap);
        };
        bindBtn('btn-left', -1);
        bindBtn('btn-right', 1);
    }`;

game = game.replace(/bindInputs\(\) \{[\s\S]*?changeLane\(dir\) \{/g, newBindInputs + "\n\n    changeLane(dir) {");

// Clean up my console.log debug statement in changeLane
game = game.replace(/console\.log\("changeLane called with", dir, "current lane:", this\.game\.player \? this\.game\.player\.lane : "none"\);/g, '');

fs.writeFileSync('public/games/racing-2d/js/game.js', game);
