const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/engine.js', 'utf8');

code = code.replace(
    /let targetVx = 0;\s*if \(keys\.ArrowLeft \|\| keys\.a\) targetVx = -10 \* this\.handle \* this\.handleMod;\s*if \(keys\.ArrowRight \|\| keys\.d\) targetVx = 10 \* this\.handle \* this\.handleMod;\s*this\.vx \+= \(targetVx - this\.vx\) \* 0\.1;/g,
    `let targetVx = 0;
        if (keys.ArrowLeft || keys.KeyA || keys.a) targetVx = -150 * this.handle * this.handleMod;
        if (keys.ArrowRight || keys.KeyD || keys.d) targetVx = 150 * this.handle * this.handleMod;
        
        this.vx += (targetVx - this.vx) * 0.2; // Snappier steering response`
);

fs.writeFileSync('public/games/racing-2d/js/engine.js', code);

// Also fix game.js to add e.preventDefault() to touch events so scrolling doesn't interrupt the game
let gameCode = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');
gameCode = gameCode.replace(
    /handleTouch\(e, isDown\) {/g,
    `handleTouch(e, isDown) {
        if(e.cancelable) e.preventDefault();`
);

// Map KeyA and KeyD explicitly in keydown in game.js, although engine.js now checks keys.KeyA
gameCode = gameCode.replace(
    /this\.canvas\.addEventListener\('touchstart', e => this\.handleTouch\(e, true\)\);/g,
    `this.canvas.addEventListener('touchstart', e => this.handleTouch(e, true), {passive: false});`
);
gameCode = gameCode.replace(
    /this\.canvas\.addEventListener\('touchend', e => this\.handleTouch\(e, false\)\);/g,
    `this.canvas.addEventListener('touchend', e => this.handleTouch(e, false), {passive: false});`
);

fs.writeFileSync('public/games/racing-2d/js/game.js', gameCode);
