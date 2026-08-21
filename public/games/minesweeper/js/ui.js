class UI {
    constructor() {
        this.screens = document.querySelectorAll('.screen');
        this.stats = this.loadStats();
        this.applyTheme(localStorage.getItem('minesweeper_theme') || 'dark-glass');
        
        this.currentMode = { cols: 9, rows: 9, mines: 10 };
        this.game = new Game(this);
        
        this.bindEvents();
    }

    switchScreen(id) {
        this.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        if(id !== 'screen-game') {
            audio.chord();
        }
    }

    bindEvents() {
        document.getElementById('btn-play').addEventListener('click', () => this.switchScreen('screen-modes'));
        document.getElementById('btn-stats').addEventListener('click', () => {
            this.renderStats();
            this.switchScreen('screen-stats');
        });
        document.getElementById('btn-custom').addEventListener('click', () => this.switchScreen('screen-custom'));
        
        document.querySelectorAll('.btn-back, #btn-menu-return, #btn-quit').forEach(btn => {
            btn.addEventListener('click', () => this.switchScreen('screen-main'));
        });

        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.currentMode = {
                    cols: parseInt(e.currentTarget.dataset.cols),
                    rows: parseInt(e.currentTarget.dataset.rows),
                    mines: parseInt(e.currentTarget.dataset.mines)
                };
                this.switchScreen('screen-game');
                this.game.start(this.currentMode.cols, this.currentMode.rows, this.currentMode.mines);
            });
        });
        
        document.getElementById('btn-restart-game').addEventListener('click', () => {
            this.game.start(this.currentMode.cols, this.currentMode.rows, this.currentMode.mines);
        });

        document.getElementById('btn-rematch').addEventListener('click', () => {
            this.switchScreen('screen-game');
            this.game.start(this.currentMode.cols, this.currentMode.rows, this.currentMode.mines);
        });

        // Theme switching
        document.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const theme = e.currentTarget.dataset.theme;
                this.applyTheme(theme);
                
                document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                audio.reveal();
            });
        });
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('minesweeper_theme', theme);
        
        const activeCard = document.querySelector(`.theme-card[data-theme="${theme}"]`);
        if(activeCard) {
            document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
            activeCard.classList.add('active');
        }
    }

    loadStats() {
        const defaultStats = { xp: 0, level: 1, games: 0, wins: 0, flags: 0 };
        try {
            const saved = localStorage.getItem('minesweeper_stats');
            return saved ? JSON.parse(saved) : defaultStats;
        } catch(e) { return defaultStats; }
    }

    saveStats() {
        localStorage.setItem('minesweeper_stats', JSON.stringify(this.stats));
    }

    getRankName(level) {
        if(level < 5) return 'ROOKIE';
        if(level < 10) return 'SCOUT';
        if(level < 20) return 'EXPLORER';
        if(level < 35) return 'DETECTIVE';
        if(level < 50) return 'MINE HUNTER';
        return 'PUZZLE MASTER';
    }

    renderStats() {
        const nextXp = this.stats.level * 1000;
        document.getElementById('stat-level').innerText = this.stats.level;
        document.getElementById('stat-rank-name').innerText = this.getRankName(this.stats.level);
        document.getElementById('stat-xp-current').innerText = this.stats.xp;
        document.getElementById('stat-xp-next').innerText = nextXp;
        document.getElementById('stat-xp-bar').style.width = `${Math.min(100, (this.stats.xp / nextXp) * 100)}%`;
        
        document.getElementById('stat-games').innerText = this.stats.games;
        document.getElementById('stat-wins').innerText = this.stats.wins;
        
        let winRate = this.stats.games > 0 ? Math.round((this.stats.wins / this.stats.games) * 100) : 0;
        document.getElementById('stat-winrate').innerText = winRate + '%';
        document.getElementById('stat-flags').innerText = this.stats.flags;
    }

    showResult(isWin, time, cols, rows) {
        this.switchScreen('screen-result');
        
        document.getElementById('result-title').innerText = isWin ? 'VICTORY!' : 'GAME OVER';
        document.getElementById('result-title').style.color = isWin ? 'var(--success)' : 'var(--error)';
        
        document.getElementById('result-time').innerText = time + 's';
        
        this.stats.games++;
        this.stats.flags += this.game.flags;
        
        let xpEarned = 0;
        if (isWin) {
            this.stats.wins++;
            // Calculate XP based on board size and time
            let baseXP = cols * rows;
            let timeBonus = Math.max(0, 300 - time);
            xpEarned = baseXP + timeBonus;
        } else {
            xpEarned = Math.floor(this.game.revealedCount * 2);
        }
        
        let xpDisplay = xpEarned;
        this.stats.xp += xpEarned;
        let nextXp = this.stats.level * 1000;
        if (this.stats.xp >= nextXp) {
            this.stats.level++;
            this.stats.xp -= nextXp;
            xpDisplay += " (LEVEL UP!)";
            audio.win();
        }
        
        document.getElementById('result-xp').innerText = `+${xpDisplay}`;
        this.saveStats();
    }
}
