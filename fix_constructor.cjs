const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

code = code.replace(
    /this\.player = null;/g,
    `this.player = null;
        this.controller = new PlayerController(this);`
);

fs.writeFileSync('public/games/racing-2d/js/game.js', code);
