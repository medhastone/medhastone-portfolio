class UI {
    constructor() {
        this.screens = document.querySelectorAll('.screen');
        this.boardEl = document.getElementById('sudoku-board');
        this.stats = this.loadStats();
        this.themes = [
            { id: 'dark', name: 'Dark Void', class: 'theme-dark', color: '#0f172a' },
            { id: 'light', name: 'Clean Light', class: 'theme-light', color: '#f1f5f9' },
            { id: 'zen', name: 'Zen Garden', class: 'theme-zen', color: '#e2e8f0' }
        ];
        
        this.bindEvents();
        this.updateMenuStats();
        this.applyTheme(this.stats.theme || 'dark');
    }

    switchScreen(id) {
        this.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        audio.click();
    }

    bindEvents() {
        // Main Menu
        document.getElementById('btn-quickplay').addEventListener('click', () => this.switchScreen('screen-difficulty'));
        document.getElementById('btn-daily').addEventListener('click', () => { window.game.start('hard'); this.switchScreen('screen-game'); });
        document.getElementById('btn-stats').addEventListener('click', () => { this.renderStats(); this.switchScreen('screen-stats'); });
        document.getElementById('btn-themes').addEventListener('click', () => { this.renderThemes(); this.switchScreen('screen-themes'); });

        // Difficulty
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const diff = e.currentTarget.dataset.diff;
                window.game.start(diff);
                this.switchScreen('screen-game');
            });
        });

        // Game Header
        document.getElementById('btn-game-back').addEventListener('click', () => {
            if(confirm('Quit current game? Progress will be lost.')) this.switchScreen('screen-main');
        });

        // Numpad & Tools
        document.querySelectorAll('.num-btn').forEach(btn => {
            btn.addEventListener('click', (e) => window.game.inputNumber(parseInt(e.target.dataset.num)));
        });
        
        document.getElementById('btn-erase').addEventListener('click', () => window.game.erase());
        document.getElementById('btn-undo').addEventListener('click', () => window.game.undo());
        document.getElementById('btn-notes').addEventListener('click', () => window.game.toggleNotes());
        document.getElementById('btn-hint').addEventListener('click', () => window.game.useHint());

        // Result
        document.getElementById('btn-newgame').addEventListener('click', () => this.switchScreen('screen-difficulty'));

        // Back buttons
        document.querySelectorAll('.btn-back').forEach(btn => {
            btn.addEventListener('click', () => this.switchScreen('screen-main'));
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if(document.getElementById('screen-game').classList.contains('active')) {
                if(e.key >= '1' && e.key <= '9') window.game.inputNumber(parseInt(e.key));
                if(e.key === 'Backspace' || e.key === 'Delete') window.game.erase();
                if(e.key === 'n' || e.key === 'N') window.game.toggleNotes();
                if(e.key === 'h' || e.key === 'H') window.game.useHint();
                
                // Arrows for navigation
                if(window.game.selectedCell) {
                    let {r, c} = window.game.selectedCell;
                    if(e.key === 'ArrowUp') r = Math.max(0, r-1);
                    if(e.key === 'ArrowDown') r = Math.min(8, r+1);
                    if(e.key === 'ArrowLeft') c = Math.max(0, c-1);
                    if(e.key === 'ArrowRight') c = Math.min(8, c+1);
                    if(r !== window.game.selectedCell.r || c !== window.game.selectedCell.c) {
                        window.game.selectCell(r, c);
                        audio.click(); // soft nav sound
                    }
                }
            }
        });
    }

    renderBoard(boardData) {
        this.boardEl.innerHTML = '';
        for(let r=0; r<9; r++) {
            for(let c=0; c<9; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if(c === 2 || c === 5) cell.classList.add('border-r');
                if(r === 2 || r === 5) cell.classList.add('border-b');
                
                cell.dataset.r = r;
                cell.dataset.c = c;
                
                if(boardData[r][c] !== 0) {
                    cell.innerText = boardData[r][c];
                    cell.classList.add('given');
                }
                
                cell.addEventListener('click', () => {
                    window.game.selectCell(r, c);
                    audio.click();
                });
                
                this.boardEl.appendChild(cell);
            }
        }
        document.getElementById('game-difficulty').innerText = window.game.difficulty;
    }

    renderCell(r, c, val, notesSet, isError=false) {
        const cell = document.querySelector(`[data-r="${r}"][data-c="${c}"]`);
        if(!cell) return;
        
        if(cell.classList.contains('given')) return;
        
        cell.className = cell.className.replace(/input|error/g, '').trim();
        
        if(val !== 0) {
            cell.innerHTML = val;
            cell.classList.add('input');
            if(isError) cell.classList.add('error');
        } else if(notesSet && notesSet.size > 0) {
            let html = '<div class="notes-grid">';
            for(let i=1; i<=9; i++) {
                html += `<div class="note">${notesSet.has(i) ? i : ''}</div>`;
            }
            html += '</div>';
            cell.innerHTML = html;
        } else {
            cell.innerHTML = '';
        }
    }

    highlightCells(r, c, val) {
        document.querySelectorAll('.cell').forEach(el => {
            el.classList.remove('selected', 'highlight', 'related');
            const tr = parseInt(el.dataset.r);
            const tc = parseInt(el.dataset.c);
            
            if(tr === r && tc === c) {
                el.classList.add('selected');
            } else if (val !== 0 && el.innerText == val && !el.querySelector('.notes-grid')) {
                el.classList.add('highlight');
            } else if (tr === r || tc === c || (Math.floor(tr/3) === Math.floor(r/3) && Math.floor(tc/3) === Math.floor(c/3))) {
                el.classList.add('related');
            }
        });
    }

    setNotesMode(isOn) {
        const btn = document.getElementById('btn-notes');
        if(isOn) btn.classList.add('active');
        else btn.classList.remove('active');
    }

    updateStats(mistakes, hints, score) {
        document.getElementById('mistake-count').innerText = mistakes;
        document.getElementById('hint-count').innerText = hints;
        document.getElementById('game-score').innerText = score;
        
        if(mistakes > 0) {
            document.getElementById('mistake-count').classList.add('text-red');
        } else {
            document.getElementById('mistake-count').classList.remove('text-red');
        }
    }

    updateTimer(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        document.getElementById('game-timer').innerText = `${m}:${s}`;
    }

    updateNumpadState(counts) {
        document.querySelectorAll('.num-btn').forEach(btn => {
            const num = parseInt(btn.dataset.num);
            if(counts[num] >= 9) btn.classList.add('completed');
            else btn.classList.remove('completed');
        });
    }

    showResult(isWin, diff, time, mistakes, score) {
        const title = document.getElementById('result-title');
        title.innerText = isWin ? 'PUZZLE SOLVED!' : 'GAME OVER';
        title.className = isWin ? 'text-blue' : 'text-red';
        
        document.getElementById('res-diff').innerText = diff.toUpperCase();
        
        const m = Math.floor(time / 60).toString().padStart(2, '0');
        const s = (time % 60).toString().padStart(2, '0');
        document.getElementById('res-time').innerText = `${m}:${s}`;
        
        document.getElementById('res-mistakes').innerText = `${mistakes}/3`;
        
        let xp = isWin ? (score + (3-mistakes)*50) : 10;
        let coins = isWin ? 20 + (3-mistakes)*10 : 0;
        
        document.getElementById('res-xp').innerText = xp;
        document.getElementById('res-coins').innerText = coins;
        
        // Save stats
        this.stats.played++;
        if(isWin) {
            this.stats.won++;
            this.stats.xp += xp;
            this.stats.coins += coins;
            if(!this.stats.bestTime || time < this.stats.bestTime) this.stats.bestTime = time;
        }
        this.saveStats();
        this.updateMenuStats();
        
        this.switchScreen('screen-result');
    }

    loadStats() {
        const def = { played: 0, won: 0, xp: 0, coins: 0, bestTime: null, theme: 'dark' };
        try {
            return JSON.parse(localStorage.getItem('sudokuX_stats')) || def;
        } catch(e) { return def; }
    }

    saveStats() {
        localStorage.setItem('sudokuX_stats', JSON.stringify(this.stats));
    }

    updateMenuStats() {
        document.getElementById('menu-coins').innerText = this.stats.coins;
        document.getElementById('menu-xp').innerText = this.stats.xp;
    }

    renderStats() {
        document.getElementById('stat-played').innerText = this.stats.played;
        document.getElementById('stat-won').innerText = this.stats.won;
        const wr = this.stats.played > 0 ? Math.round((this.stats.won / this.stats.played)*100) : 0;
        document.getElementById('stat-winrate').innerText = `${wr}%`;
        
        if(this.stats.bestTime) {
            const m = Math.floor(this.stats.bestTime / 60).toString().padStart(2, '0');
            const s = (this.stats.bestTime % 60).toString().padStart(2, '0');
            document.getElementById('stat-best').innerText = `${m}:${s}`;
        }
    }

    renderThemes() {
        const grid = document.getElementById('theme-grid');
        grid.innerHTML = '';
        this.themes.forEach(t => {
            const el = document.createElement('div');
            el.className = `theme-card ${this.stats.theme === t.id ? 'active' : ''}`;
            el.innerHTML = `
                <div class="theme-preview" style="background-color: ${t.color}"></div>
                <div class="theme-name">${t.name}</div>
            `;
            el.addEventListener('click', () => {
                this.applyTheme(t.id);
                this.renderThemes();
            });
            grid.appendChild(el);
        });
    }

    applyTheme(id) {
        const theme = this.themes.find(t => t.id === id) || this.themes[0];
        document.body.className = theme.class;
        this.stats.theme = id;
        this.saveStats();
        if(window.particles) window.particles.setTheme(id);
    }
}
