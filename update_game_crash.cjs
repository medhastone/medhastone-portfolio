const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

code = code.replace(
    /this\.endGame\(\);\s*return;/g,
    `for(let i=0; i<30; i++) this.particles.push(new Particle(p.x + p.width/2, p.y, '#ef4444'));
                this.draw(); // draw particles once before freezing
                setTimeout(() => this.endGame(), 1000);
                this.isRunning = false;
                return;`
);

fs.writeFileSync('public/games/racing-2d/js/game.js', code);
