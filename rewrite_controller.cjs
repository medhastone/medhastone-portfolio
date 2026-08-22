const fs = require('fs');

let game = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

const newController = `class PlayerController {
    constructor(game) {
        this.game = game;
        this.lanes = 4;
        this.leftPressed = false;
        this.rightPressed = false;
        
        this.bindInputs();
    }
    
    bindInputs() {
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

        // Mobile tap zones
        if (this.game.canvas) {
            this.game.canvas.addEventListener('touchstart', (e) => {
                if(e.cancelable) e.preventDefault();
                if (!this.game.isRunning || this.game.isPaused || this.game.isCrashed) return;
                
                const touch = e.changedTouches[0];
                if (!touch) return;
                
                // Left half of screen moves left, right half moves right
                if (touch.clientX < window.innerWidth / 2) {
                    this.changeLane(-1);
                } else {
                    this.changeLane(1);
                }
            }, {passive: false});
        }
    }
    
    changeLane(dir) {
        if (!this.game.player) return;
        
        // Ensure player.lane exists
        if (this.game.player.lane === undefined) {
            this.game.player.lane = 1;
        }
        
        this.game.player.lane += dir;
        if (this.game.player.lane < 0) this.game.player.lane = 0;
        if (this.game.player.lane >= this.lanes) this.game.player.lane = this.lanes - 1;
    }
    
    update(player, canvasWidth, dt) {
        if (!player) return;
        
        if (player.lane === undefined) {
            player.lane = 1;
        }
        
        const roadW = canvasWidth * 0.8;
        const roadX = (canvasWidth - roadW) / 2;
        const laneWidth = roadW / this.lanes;
        
        const targetX = roadX + (player.lane * laneWidth) + (laneWidth / 2) - (player.width / 2);
        
        // Smoothly interpolate to the exact lane center
        player.x += (targetX - player.x) * 15 * dt * player.handleMod;
    }
}

class Game {`;

game = game.replace(/class PlayerController \{[\s\S]*?\}\n\nclass Game \{/g, newController);

// Make sure player lane is initialized
game = game.replace(/this\.difficulty = 1;\s*if\(this\.controller\) this\.controller\.currentLane = 1;/g, `this.difficulty = 1;
        if(this.player) this.player.lane = 1;`);

fs.writeFileSync('public/games/racing-2d/js/game.js', game);

