const fs = require('fs');
let code = fs.readFileSync('src/game/GameEngine.ts', 'utf8');

code = "import { playPop, playWin, playLose } from './audio';\n" + code;

code = code.replace(
    /this\.addScore\(10\);/g,
    `this.addScore(10);\n            playPop();`
);

code = code.replace(
    /this\.callbacks\.onWin\(\);/g,
    `playWin();\n      this.callbacks.onWin();`
);

code = code.replace(
    /this\.callbacks\.onLose\(\);/g,
    `playLose();\n       this.callbacks.onLose();`
);

fs.writeFileSync('src/game/GameEngine.ts', code);
