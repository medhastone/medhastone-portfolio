const fs = require('fs');
let code = fs.readFileSync('src/components/HomeScreen.tsx', 'utf8');

code = code.replace(
    /import \{ initAudio \} from '\.\.\/game\/audio';/,
    "import { initAudio, playButton } from '../game/audio';"
);

code = code.replace(
    /onClick=\{\(\) => \{ initAudio\(\); onPlay\(\); \}\}/,
    `onClick={() => { initAudio(); playButton(); onPlay(); }}`
);

// also for the other buttons if we want them to click, though they don't do anything right now
code = code.replace(
    /<button className="flex flex-col items-center/g,
    `<button onClick={() => playButton()} className="flex flex-col items-center`
);

fs.writeFileSync('src/components/HomeScreen.tsx', code);
