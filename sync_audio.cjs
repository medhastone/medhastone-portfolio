const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('setSoundEnabled')) {
    code = "import { setSoundEnabled } from './game/audio';\n" + code;
    
    code = code.replace(
        /const \[stats, setStats\] = useState<PlayerStats>\(loadStats\(\)\);/,
        `const [stats, setStats] = useState<PlayerStats>(() => {\n    const s = loadStats();\n    setSoundEnabled(s.soundEnabled);\n    return s;\n  });`
    );
    
    fs.writeFileSync('src/App.tsx', code);
}
