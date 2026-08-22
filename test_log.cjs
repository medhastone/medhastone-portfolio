const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

code = code.replace(
    /changeLane\(dir\) \{/g,
    `changeLane(dir) {
        console.log("changeLane called with", dir, "current lane:", this.game.player ? this.game.player.lane : "none");`
);

fs.writeFileSync('public/games/racing-2d/js/game.js', code);
