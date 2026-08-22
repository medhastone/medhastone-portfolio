const fs = require('fs');

// 1. Restore engine.js
let engine = fs.readFileSync('public/games/racing-2d/js/engine.js', 'utf8');

engine = engine.replace(
    /\/\/ Lateral movement\s*\/\/ Lateral movement is now handled by PlayerController/g,
    `// Lateral movement
        let targetVx = 0;
        if (keys.ArrowLeft || keys.a || keys.A) targetVx = - (this.handle * this.handleMod);
        if (keys.ArrowRight || keys.d || keys.D) targetVx = (this.handle * this.handleMod);
        this.vx += (targetVx - this.vx) * 0.2;
        this.x += this.vx;`
);

fs.writeFileSync('public/games/racing-2d/js/engine.js', engine);

// 2. Remove PlayerController from game.js
let game = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

// Remove PlayerController definition
game = game.replace(/class PlayerController \{[\s\S]*?\}\n\nclass Game \{/g, 'class Game {');

// Remove controller instantiation
game = game.replace(/this\.controller = new PlayerController\(this\);/g, '');

// Restore original checkCollisions method
const oldCheckCollisions = `    checkCollisions() {
        const p = this.player;
        const margin = 5;
        
        // Traffic
        for (let t of this.traffic) {
            if (p.x < t.x + t.width - margin &&
                p.x + p.width > t.x + margin &&
                p.y < t.y + t.height - margin &&
                p.height + p.y > t.y + margin) {
                // Crash
                if (!this.isCrashed) {
                    this.isCrashed = true;
                    if(window.audio) window.audio.crash();
                    for(let i=0; i<30; i++) this.particles.push(new Particle(p.x + p.width/2, p.y, '#ef4444'));
                    setTimeout(() => this.endGame(), 1500);
                }
                return;
            }
        }
        
        // Collectibles
        for (let c of this.collectibles) {
            if (c.active && p.x < c.x + c.width &&
                p.x + p.width > c.x &&
                p.y < c.y + c.height &&
                p.height + p.y > c.y) {
                c.active = false;
                if (c.type === 'coin') {
                    this.coinsCollected++;
                    if(window.audio) window.audio.coin();
                    this.score += 10;
                    for(let i=0; i<10; i++) this.particles.push(new Particle(c.x + c.width/2, c.y + c.height/2, '#fbbf24'));
                }
            }
        }
    }`;

game = game.replace(/    stop\(\) \{\s*this\.isRunning = false;\s*\}/g, `    stop() {
        this.isRunning = false;
    }

${oldCheckCollisions}`);

// Remove checkCollisions from loop update
game = game.replace(/this\.controller\.checkCollisions\(this\);[\s\S]*?for \(let c of this\.collectibles\) \{[\s\S]*?c\.active = false;[\s\S]*?this\.coinsCollected\+\+;[\s\S]*?if\(window\.audio\) window\.audio\.coin\(\);[\s\S]*?this\.score \+= 10;[\s\S]*?for\(let i=0; i<10; i\+\+\) this\.particles\.push\(new Particle\(c\.x \+ c\.width\/2, c\.y \+ c\.height\/2, '#fbbf24'\)\);[\s\S]*?\}[\s\S]*?\}[\s\S]*?\}/g, 'this.checkCollisions();');

// Restore manual inputs in game.js constructor
const origInputs = `        window.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft' || e.key === 'a') this.keys['ArrowLeft'] = true;
            if (e.key === 'ArrowRight' || e.key === 'd') this.keys['ArrowRight'] = true;
            if (e.key === 'ArrowUp' || e.key === 'w') this.keys['ArrowUp'] = true;
            if (e.key === 'ArrowDown' || e.key === 's') this.keys['ArrowDown'] = true;
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowLeft' || e.key === 'a') this.keys['ArrowLeft'] = false;
            if (e.key === 'ArrowRight' || e.key === 'd') this.keys['ArrowRight'] = false;
            if (e.key === 'ArrowUp' || e.key === 'w') this.keys['ArrowUp'] = false;
            if (e.key === 'ArrowDown' || e.key === 's') this.keys['ArrowDown'] = false;
        });
        
        // Touch controls
        this.canvas.addEventListener('touchstart', e => this.handleTouch(e, true), {passive: false});
        this.canvas.addEventListener('touchend', e => this.handleTouch(e, false), {passive: false});
        
        // On-screen Mobile Controls
        const bindBtn = (id, key) => {
            const btn = document.getElementById(id);
            if(!btn) return;
            const down = (e) => { if(e.cancelable) e.preventDefault(); this.keys[key] = true; btn.classList.add('active'); };
            const up = (e) => { if(e.cancelable) e.preventDefault(); this.keys[key] = false; btn.classList.remove('active'); };
            btn.addEventListener('touchstart', down, {passive: false});
            btn.addEventListener('touchend', up, {passive: false});
            btn.addEventListener('mousedown', down);
            btn.addEventListener('mouseup', up);
            btn.addEventListener('mouseleave', up);
        };
        bindBtn('btn-left', 'ArrowLeft');
        bindBtn('btn-right', 'ArrowRight');
        bindBtn('btn-gas', 'Gas');
        bindBtn('btn-brake', 'Brake');`;

// Let's replace the whole input block in constructor
game = game.replace(/\/\/ Inputs[\s\S]*?bindBtn\('btn-brake', 'Brake'\);/g, `// Inputs\n${origInputs}`);

// Update update loop to remove this.controller.update
game = game.replace(/this\.controller\.update\(this\.player, this\.canvas\.width, dt\);\s*this\.player\.update\(this\.keys, this\.canvas\.width, dt\);/g, `this.player.update(this.keys, this.canvas.width, dt);`);

// Clean up this.player.lane
game = game.replace(/if\(this\.player\) this\.player\.lane = 1;/g, '');

fs.writeFileSync('public/games/racing-2d/js/game.js', game);
