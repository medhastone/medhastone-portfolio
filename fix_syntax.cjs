const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

code = code.replace(
    /handleTouch\(e, isDown\) \{\s*\/\/ Prevent default scrolling on canvas\s*if\(e\.cancelable\) e\.preventDefault\(\);\s*\}\s*if \(touch\.clientX < this\.canvas\.width \/ 2\) \{\s*this\.keys\['ArrowLeft'\] = isDown;\s*\} else \{\s*this\.keys\['ArrowRight'\] = isDown;\s*\}\s*\}/g,
    `handleTouch(e, isDown) {
        // Prevent default scrolling on canvas
        if(e.cancelable) e.preventDefault();
    }`
);

fs.writeFileSync('public/games/racing-2d/js/game.js', code);
