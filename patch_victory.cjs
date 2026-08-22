const fs = require('fs');
let code = fs.readFileSync('src/components/VictoryScreen.tsx', 'utf8');

code = "import { playButton } from '../game/audio';\n" + code;
code = code.replace(
    /onClick=\{onContinue\}/,
    `onClick={() => { playButton(); onContinue(); }}`
);

fs.writeFileSync('src/components/VictoryScreen.tsx', code);
