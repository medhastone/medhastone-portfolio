const fs = require('fs');
let code = fs.readFileSync('src/game/GameEngine.ts', 'utf8');

// Add shots since pop to class properties
code = code.replace(
    /score: number = 0;/g,
    `score: number = 0;\n  shotsSincePop: number = 0;`
);

// Track shots
code = code.replace(
    /this\.state = 'SHOOTING';/g,
    `this.state = 'SHOOTING';\n    this.shotsSincePop++;`
);

// Reset shots and drop ceiling
code = code.replace(
    /if \(matches\.length >= 3\) \{/g,
    `if (matches.length >= 3) {
          this.shotsSincePop = 0;`
);

// Drop ceiling if 5 shots without pop
const dropLogic = `
        if (matches.length < 3 && this.shotsSincePop >= 5) {
            this.shotsSincePop = 0;
            this.grid.dropOffset += ROW_HEIGHT;
            
            // Move all bubbles down visually
            for (let r = 0; r < this.grid.rows; r++) {
                for (let c = 0; c < this.grid.cols; c++) {
                    const b = this.grid.cells[r][c];
                    if (b) {
                        b.y += ROW_HEIGHT;
                    }
                }
            }
        }
`;
code = code.replace(
    /setTimeout\(\(\) => this\.checkWinLose\(\), 300\);/g,
    `${dropLogic}
        setTimeout(() => this.checkWinLose(), 300);`
);

fs.writeFileSync('src/game/GameEngine.ts', code);
