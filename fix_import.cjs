const fs = require('fs');
let code = fs.readFileSync('src/game/GameEngine.ts', 'utf8');

code = code.replace(
    /BUBBLE_DIAMETER \} from '\.\/types';/g,
    `BUBBLE_DIAMETER, ROW_HEIGHT } from './types';`
);

fs.writeFileSync('src/game/GameEngine.ts', code);
