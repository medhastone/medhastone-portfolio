const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/engine.js', 'utf8');

// Replace forward speed logic
code = code.replace(
    /let targetSpeed = this\.baseSpeed \* this\.speedMod;/g,
    `let targetSpeed = 0;
        if (keys.ArrowUp || keys.KeyW || keys.w || keys.Gas) {
            targetSpeed = this.baseSpeed * this.speedMod;
        } else if (keys.ArrowDown || keys.KeyS || keys.s || keys.Brake) {
            targetSpeed = - (this.baseSpeed * 0.5); // Brake
        }`
);

// If Nitro is pressed but no gas is pressed, does nitro still propel? Yes.
code = code.replace(
    /if \(\(keys\.Space \|\| keys\.Nitro\) && this\.nitro > 0\) {/g,
    `if ((keys.Space || keys.Nitro) && this.nitro > 0 && targetSpeed >= 0) {`
);
code = code.replace(
    /targetSpeed \*= 1\.5;/g,
    `targetSpeed = (this.baseSpeed * this.speedMod) * 1.5;`
);

fs.writeFileSync('public/games/racing-2d/js/engine.js', code);
