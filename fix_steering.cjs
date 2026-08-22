const fs = require('fs');

let engine = fs.readFileSync('public/games/racing-2d/js/engine.js', 'utf8');

engine = engine.replace(
    /if \(keys\.ArrowLeft \|\| keys\.a \|\| keys\.A\) targetVx = - \(this\.handle \* this\.handleMod\);/g,
    `if (keys.ArrowLeft || keys.a || keys.A || keys.ArrowLeft === true) targetVx = - (this.handle * this.handleMod * 150);`
);

engine = engine.replace(
    /if \(keys\.ArrowRight \|\| keys\.d \|\| keys\.D\) targetVx = \(this\.handle \* this\.handleMod\);/g,
    `if (keys.ArrowRight || keys.d || keys.D || keys.ArrowRight === true) targetVx = (this.handle * this.handleMod * 150);`
);

fs.writeFileSync('public/games/racing-2d/js/engine.js', engine);
