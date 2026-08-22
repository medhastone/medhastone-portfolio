const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

code = code.replace(/this\.canvas\.addEventListener\('touchstart', e => this\.handleTouch\(e, true\), \{passive: false\}\);\s*this\.canvas\.addEventListener\('touchend', e => this\.handleTouch\(e, false\), \{passive: false\}\);/g, '');

fs.writeFileSync('public/games/racing-2d/js/game.js', code);
