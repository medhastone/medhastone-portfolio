const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

code = code.replace(
    /for\(let i=0; i<30; i\+\+\) this\.particles\.push\(new Particle\(p\.x \+ p\.width\/2, p\.y, '#ef4444'\)\);\s*this\.draw\(\); \/\/ draw particles once before freezing\s*setTimeout\(\(\) => this\.endGame\(\), 1000\);\s*this\.isRunning = false;\s*return;/g,
    `if (!this.isCrashed) {
                    this.isCrashed = true;
                    for(let i=0; i<30; i++) this.particles.push(new Particle(p.x + p.width/2, p.y, '#ef4444'));
                    setTimeout(() => this.endGame(), 1500);
                }
                return;`
);

// We need to make sure the game still updates and draws particles when crashed, but car stops.
// In update:
code = code.replace(
    /this\.player\.update\(this\.keys, this\.canvas\.width, dt\);/g,
    `if (!this.isCrashed) {
            this.player.update(this.keys, this.canvas.width, dt);
        } else {
            this.player.speed *= 0.9; // decelerate
        }`
);

// Initialize isCrashed
code = code.replace(
    /this\.distance = 0;\s*this\.coinsCollected = 0;/g,
    `this.distance = 0;
        this.coinsCollected = 0;
        this.isCrashed = false;`
);

fs.writeFileSync('public/games/racing-2d/js/game.js', code);
