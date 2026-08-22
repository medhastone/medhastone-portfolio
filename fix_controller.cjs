const fs = require('fs');

// 1. Update engine.js
let engine = fs.readFileSync('public/games/racing-2d/js/engine.js', 'utf8');
engine = engine.replace(
    /let targetVx = 0;[\s\S]*?this\.x \+= this\.vx;/g,
    `// Lateral movement is now handled by PlayerController`
);
fs.writeFileSync('public/games/racing-2d/js/engine.js', engine);


// 2. Update game.js
let game = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

const controllerClass = `class PlayerController {
    constructor(game) {
        this.game = game;
        this.lanes = 4;
        this.currentLane = 1;
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
    }
    
    changeLane(dir) {
        this.currentLane += dir;
        if (this.currentLane < 0) this.currentLane = 0;
        if (this.currentLane >= this.lanes) this.currentLane = this.lanes - 1;
    }
    
    update(player, canvasWidth, dt) {
        if (!player) return;
        
        const roadW = canvasWidth * 0.8;
        const roadX = (canvasWidth - roadW) / 2;
        const laneWidth = roadW / this.lanes;
        
        const targetX = roadX + (this.currentLane * laneWidth) + (laneWidth / 2) - (player.width / 2);
        
        // Smoothly interpolate to the exact lane center
        player.x += (targetX - player.x) * 15 * dt * player.handleMod;
    }
    
    checkCollisions(game) {
        const p = game.player;
        const margin = 5;
        
        for (let t of game.traffic) {
            if (p.x < t.x + t.width - margin &&
                p.x + p.width > t.x + margin &&
                p.y < t.y + t.height - margin &&
                p.height + p.y > t.y + margin) {
                
                if (!game.isCrashed) {
                    game.isCrashed = true;
                    p.speed = 0; // Add a collision detection loop that stops the player if they hit a traffic object
                    if(window.audio) window.audio.crash();
                    for(let i=0; i<30; i++) game.particles.push(new Particle(p.x + p.width/2, p.y, '#ef4444'));
                    setTimeout(() => game.endGame(), 1500);
                }
                return;
            }
        }
    }
}

class Game {`;

// Insert the class at the top
game = game.replace(/class Game \{/g, controllerClass);

// Initialize controller in constructor
game = game.replace(/this\.isCrashed = false;/g, `this.isCrashed = false;
        this.controller = new PlayerController(this);`);

// Reset currentLane on start
game = game.replace(/this\.difficulty = 1;/g, `this.difficulty = 1;
        if(this.controller) this.controller.currentLane = 1;`);

// Clean up old key listeners in Game constructor so they don't fight
// The user already bound keys there. We'll leave the general up/down/gas/brake.
game = game.replace(/window\.addEventListener\('keydown', e => this\.keys\[e\.code\] = true\);/g, `
        window.addEventListener('keydown', e => { 
            // only track specific keys in this.keys so ArrowLeft doesn't get stuck
            if(['ArrowUp','ArrowDown','w','s','KeyW','KeyS','Space'].includes(e.key) || e.code === 'Space') {
                this.keys[e.code] = true; 
            }
        });`);

game = game.replace(/window\.addEventListener\('keyup', e => this\.keys\[e\.code\] = false\);/g, `
        window.addEventListener('keyup', e => { 
            if(this.keys[e.code]) this.keys[e.code] = false; 
        });`);

// Update update loop to use PlayerController
game = game.replace(
    /this\.checkCollisions\(\);/g,
    `this.controller.checkCollisions(this);
        // Original collectible collision check
        for (let c of this.collectibles) {
            if (c.active && this.player.x < c.x + c.width &&
                this.player.x + this.player.width > c.x &&
                this.player.y < c.y + c.height &&
                this.player.height + this.player.y > c.y) {
                c.active = false;
                if (c.type === 'coin') {
                    this.coinsCollected++;
                    if(window.audio) window.audio.coin();
                    this.score += 10;
                    for(let i=0; i<10; i++) this.particles.push(new Particle(c.x + c.width/2, c.y + c.height/2, '#fbbf24'));
                }
            }
        }`
);

// Call controller update
game = game.replace(
    /if \(\!this\.isCrashed\) \{/g,
    `if (!this.isCrashed) {
            this.controller.update(this.player, this.canvas.width, dt);`
);

// Remove the old collision method
game = game.replace(/checkCollisions\(\) \{[\s\S]*?\}    spawnEntities\(\) \{/g, `spawnEntities() {`);

// Remove old bindBtn for left/right from Game constructor, since it's now in PlayerController
game = game.replace(/bindBtn\('btn-left', 'ArrowLeft'\);\s*bindBtn\('btn-right', 'ArrowRight'\);/g, '');

fs.writeFileSync('public/games/racing-2d/js/game.js', game);
