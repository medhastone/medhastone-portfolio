const fs = require('fs');

let game = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

const newMethods = `
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
                    p.speed = 0; // Collision detection loop stops the player
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

game = game.replace(/    update\(player, canvasWidth, dt\) \{[\s\S]*?\}\n\}\n\nclass Game \{/g, newMethods);

fs.writeFileSync('public/games/racing-2d/js/game.js', game);
