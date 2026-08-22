const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

code = code.replace(
    /changeLane\(dir\) \{/g,
    `changeLane(dir) {
        console.log("Lane changing by", dir);`
);
fs.writeFileSync('public/games/racing-2d/js/game.js', code);
