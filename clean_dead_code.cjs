const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

// Remove the old checkCollisions method completely.
code = code.replace(/checkCollisions\(\) \{[\s\S]*?\}\s*spawnEntities\(\) \{/g, `spawnEntities() {`);

fs.writeFileSync('public/games/racing-2d/js/game.js', code);
