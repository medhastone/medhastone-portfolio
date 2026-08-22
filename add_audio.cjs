const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

code = code.replace(
    /this\.coinsCollected\+\+;/g,
    `this.coinsCollected++;
                    if(window.audio) window.audio.coin();`
);

code = code.replace(
    /this\.isCrashed = true;/g,
    `this.isCrashed = true;
                    if(window.audio) window.audio.crash();`
);

code = code.replace(
    /this\.isNitro = true;/g,
    `if(!this.isNitro && window.audio) window.audio.nitro();
            this.isNitro = true;`
);

fs.writeFileSync('public/games/racing-2d/js/game.js', code);
