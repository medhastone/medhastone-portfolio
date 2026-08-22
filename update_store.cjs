const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

if (!code.includes('soundEnabled')) {
    code = code.replace(
        /highestScore: number;\n\}/,
        `highestScore: number;\n  soundEnabled: boolean;\n}`
    );

    code = code.replace(
        /highestScore: 0,\n\};/,
        `highestScore: 0,\n  soundEnabled: true,\n};`
    );

    fs.writeFileSync('src/store.ts', code);
}
