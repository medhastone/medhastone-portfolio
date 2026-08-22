const fs = require('fs');
let code = fs.readFileSync('public/games/chess-ai/js/ui.js', 'utf8');

// Replace btn-puzzles listener
code = code.replace(
    /document\.getElementById\('btn-puzzles'\)\.addEventListener\('click'.*?\}\);/s,
    `document.getElementById('btn-puzzles').addEventListener('click', () => { this.renderPuzzles(); this.switchScreen('screen-puzzles'); });`
);

// Add renderPuzzles method
const renderPuzzlesCode = `
    renderPuzzles() {
        const list = document.getElementById('puzzle-list');
        list.innerHTML = '';
        window.CHESS_PUZZLES.forEach(p => {
            const el = document.createElement('div');
            el.className = 'puzzle-card';
            el.style.padding = '15px';
            el.style.background = 'rgba(255,255,255,0.1)';
            el.style.borderRadius = '10px';
            el.style.cursor = 'pointer';
            el.style.border = '1px solid rgba(255,255,255,0.2)';
            
            el.innerHTML = \`
                <div style="font-weight: bold; margin-bottom: 5px;">\${p.title}</div>
                <div style="font-size: 0.9em; opacity: 0.8;">\${p.description}</div>
            \`;
            
            el.addEventListener('click', () => {
                window.game.startPuzzle(p);
                this.switchScreen('screen-game');
            });
            
            // Hover effects
            el.addEventListener('mouseenter', () => el.style.background = 'rgba(255,255,255,0.2)');
            el.addEventListener('mouseleave', () => el.style.background = 'rgba(255,255,255,0.1)');
            
            list.appendChild(el);
        });
    }
`;

// Insert renderPuzzles before renderStats
code = code.replace(/renderStats\(\) \{/, renderPuzzlesCode + '\n    renderStats() {');

fs.writeFileSync('public/games/chess-ai/js/ui.js', code);
