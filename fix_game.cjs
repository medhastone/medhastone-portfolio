const fs = require('fs');
let code = fs.readFileSync('public/games/chess-ai/js/game.js', 'utf8');

// Revert constructor mistake
code = code.replace(
`        this.time = { w: 600, b: 600 };
        document.getElementById('timer-top').style.display = 'block';
        document.getElementById('timer-bottom').style.display = 'block';
        this.isPuzzleMode = false; // 10 minutes`,
`        this.time = { w: 600, b: 600 };`
);

// Add to start()
code = code.replace(
`        this.time = { w: 600, b: 600 };
        
        this.board.setPlayerColor`,
`        this.time = { w: 600, b: 600 };
        document.getElementById('timer-top').style.display = 'flex';
        document.getElementById('timer-bottom').style.display = 'flex';
        this.isPuzzleMode = false;
        
        this.board.setPlayerColor`
);

fs.writeFileSync('public/games/chess-ai/js/game.js', code);
