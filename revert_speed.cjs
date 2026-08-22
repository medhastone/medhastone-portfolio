const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/engine.js', 'utf8');

code = code.replace(
    /let targetSpeed = 0;\s*if \(keys\.ArrowUp \|\| keys\.KeyW \|\| keys\.w \|\| keys\.Gas\) \{\s*targetSpeed = this\.baseSpeed \* this\.speedMod;\s*\} else if \(keys\.ArrowDown \|\| keys\.KeyS \|\| keys\.s \|\| keys\.Brake\) \{\s*targetSpeed = - \(this\.baseSpeed \* 0\.5\); \/\/ Brake\s*\}/g,
    `let targetSpeed = this.baseSpeed * this.speedMod;
        if (keys.ArrowUp || keys.KeyW || keys.w || keys.Gas) {
            targetSpeed = (this.baseSpeed * this.speedMod) * 1.2;
        } else if (keys.ArrowDown || keys.KeyS || keys.s || keys.Brake) {
            targetSpeed = (this.baseSpeed * this.speedMod) * 0.2; // Brake
        }`
);

fs.writeFileSync('public/games/racing-2d/js/engine.js', code);
