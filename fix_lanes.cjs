const fs = require('fs');

let game = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

// Change lanes default to 3
game = game.replace(/constructor\(game, lanes = 4\) \{/g, 'constructor(game, lanes = 3) {');

// Replace interpolation with direct assignment
game = game.replace(
    /\/\/ Smoothly interpolate to the exact lane center[\s\S]*?p\.x \+= \(targetX - p\.x\) \* 15 \* dt \* p\.handleMod;/g,
    `// Update x-coordinate immediately to snap to the lane
        p.x = targetX;`
);

fs.writeFileSync('public/games/racing-2d/js/game.js', game);
