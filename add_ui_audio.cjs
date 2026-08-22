const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/ui.js', 'utf8');

code = code.replace(
    /this\.switchScreen\(/g,
    `if(window.audio) window.audio.click();
        this.switchScreen(`
);

fs.writeFileSync('public/games/racing-2d/js/ui.js', code);
