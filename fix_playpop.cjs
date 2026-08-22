const fs = require('fs');
let code = fs.readFileSync('src/game/GameEngine.ts', 'utf8');

code = code.replace(
    /this\.addScore\(10\);\n            playPop\(\);\n          \}\);/g,
    `this.addScore(10);\n          });\n          playPop();`
);

fs.writeFileSync('src/game/GameEngine.ts', code);
