const fs = require('fs');
let code = fs.readFileSync('src/components/HomeScreen.tsx', 'utf8');

code = code.replace(
    /onClick=\{\(\) => \{ playButton\(\); window.history.back\(\); \}\}/,
    `onClick={() => { playButton(); window.location.href = '/play-games'; }}`
);

fs.writeFileSync('src/components/HomeScreen.tsx', code);
