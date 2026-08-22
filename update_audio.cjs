const fs = require('fs');
let code = fs.readFileSync('src/game/audio.ts', 'utf8');

if (!code.includes('isSoundEnabled')) {
    code = "let isSoundEnabled = true;\nexport const setSoundEnabled = (v: boolean) => { isSoundEnabled = v; };\n" + code;
    
    // Add check to all play functions
    code = code.replace(/if \(\!audioCtx\) return;/g, "if (!audioCtx || !isSoundEnabled) return;");
    
    fs.writeFileSync('src/game/audio.ts', code);
}
