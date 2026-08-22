const fs = require('fs');
let code = fs.readFileSync('src/components/GameScreen.tsx', 'utf8');

code = "import { playButton } from '../game/audio';\n" + code;
code = code.replace(
    /onClick=\{onQuit\}/,
    `onClick={() => { playButton(); onQuit(); }}`
);

fs.writeFileSync('src/components/GameScreen.tsx', code);
