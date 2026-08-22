const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

// In checkCollisions, spawn particles on coin collection
code = code.replace(
    /this\.coinsCollected\+\+;\s*this\.score \+= 10;/g,
    `this.coinsCollected++;
                    this.score += 10;
                    for(let i=0; i<10; i++) this.particles.push(new Particle(c.x + c.width/2, c.y + c.height/2, '#fbbf24'));`
);

// In update, update particles
code = code.replace(
    /for \(let c of this\.collectibles\) c\.update\(this\.player\.speed\);/g,
    `for (let c of this.collectibles) c.update(this.player.speed);
        for (let p of this.particles) p.update();
        this.particles = this.particles.filter(p => p.life > 0);`
);

// In draw, draw particles
code = code.replace(
    /this\.player\.draw\(this\.ctx\);/g,
    `this.player.draw(this.ctx);
        for (let p of this.particles) p.draw(this.ctx);`
);

fs.writeFileSync('public/games/racing-2d/js/game.js', code);
