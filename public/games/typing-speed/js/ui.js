class UI {
    constructor() {
        this.screens = document.querySelectorAll('.screen');
        this.stats = this.loadStats();
        this.applyTheme(localStorage.getItem('typerush_theme') || 'neon-cyan');
        this.bindEvents();
        this.game = new Game(this);
    }

    switchScreen(id) {
        this.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        audio.type();
    }

    bindEvents() {
        document.getElementById('btn-play').addEventListener('click', () => this.switchScreen('screen-modes'));
        document.getElementById('btn-stats').addEventListener('click', () => {
            this.renderStats();
            this.switchScreen('screen-stats');
        });
        document.getElementById('btn-custom').addEventListener('click', () => this.switchScreen('screen-custom'));
        
        document.querySelectorAll('.btn-back, #btn-menu-return').forEach(btn => {
            btn.addEventListener('click', () => this.switchScreen('screen-main'));
        });

        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                const time = parseInt(e.currentTarget.dataset.time);
                
                audio.levelUp(); // Game start sound
                
                if (mode === 'falling') {
                    this.switchScreen('screen-game-falling');
                    this.game.startFallingMode();
                } else {
                    this.switchScreen('screen-game-typing');
                    this.game.startQuickTest(time, mode === 'sentence');
                }
            });
        });

        document.getElementById('btn-rematch').addEventListener('click', () => {
            // Determine last mode from game instance
            audio.levelUp();
            if (this.game.mode === 'falling') {
                this.switchScreen('screen-game-falling');
                this.game.startFallingMode();
            } else {
                this.switchScreen('screen-game-typing');
                this.game.startQuickTest(this.game.timeLimit, this.game.mode === 'sentence');
            }
        });

        // Theme switching
        document.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const theme = e.currentTarget.dataset.theme;
                this.applyTheme(theme);
                
                document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                audio.wordComplete();
            });
        });
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('typerush_theme', theme);
        
        const activeCard = document.querySelector(`.theme-card[data-theme="${theme}"]`);
        if(activeCard) {
            document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
            activeCard.classList.add('active');
        }
    }

    loadStats() {
        const defaultStats = { xp: 0, level: 1, bestWpm: 0, totalTests: 0, totalWords: 0, avgAcc: 0 };
        try {
            const saved = localStorage.getItem('typerush_stats');
            return saved ? JSON.parse(saved) : defaultStats;
        } catch(e) { return defaultStats; }
    }

    saveStats() {
        localStorage.setItem('typerush_stats', JSON.stringify(this.stats));
    }

    getRankName(level) {
        if(level < 5) return 'BEGINNER';
        if(level < 10) return 'LEARNER';
        if(level < 20) return 'FAST FINGERS';
        if(level < 35) return 'SPEEDSTER';
        if(level < 50) return 'KEYBOARD NINJA';
        if(level < 100) return 'TYPING MASTER';
        return 'TYPERUSH LEGEND';
    }

    renderStats() {
        const nextXp = this.stats.level * 1000;
        document.getElementById('stat-level').innerText = this.stats.level;
        document.getElementById('stat-rank-name').innerText = this.getRankName(this.stats.level);
        document.getElementById('stat-xp-current').innerText = this.stats.xp;
        document.getElementById('stat-xp-next').innerText = nextXp;
        document.getElementById('stat-xp-bar').style.width = `${Math.min(100, (this.stats.xp / nextXp) * 100)}%`;
        
        document.getElementById('stat-best-wpm').innerText = this.stats.bestWpm;
        document.getElementById('stat-avg-acc').innerText = Math.round(this.stats.avgAcc) + '%';
        document.getElementById('stat-total-tests').innerText = this.stats.totalTests;
        document.getElementById('stat-total-words').innerText = this.stats.totalWords;
    }

    showResult(wpm, acc, errors, xpEarned) {
        this.switchScreen('screen-result');
        
        document.getElementById('result-wpm').innerText = wpm;
        document.getElementById('result-acc').innerText = acc + '%';
        document.getElementById('result-errors').innerText = errors;
        
        let xpDisplay = xpEarned;
        
        // Update Stats
        this.stats.totalTests++;
        if(this.game.mode !== 'falling' && wpm > this.stats.bestWpm) {
            this.stats.bestWpm = wpm;
            particles.spawn(window.innerWidth/2, window.innerHeight/2, 100);
            audio.levelUp();
            document.getElementById('result-title').innerText = "NEW HIGH SCORE!";
        } else {
            document.getElementById('result-title').innerText = "TEST COMPLETE";
        }
        
        // Running average accuracy
        this.stats.avgAcc = ((this.stats.avgAcc * (this.stats.totalTests - 1)) + acc) / this.stats.totalTests;
        this.stats.totalWords += Math.floor(this.game.correctTyped / 5);
        
        // XP and Level up
        this.stats.xp += xpEarned;
        let nextXp = this.stats.level * 1000;
        if (this.stats.xp >= nextXp) {
            this.stats.level++;
            this.stats.xp -= nextXp;
            xpDisplay += " (LEVEL UP!)";
            audio.levelUp();
        }
        
        document.getElementById('result-xp').innerText = `+${xpDisplay}`;
        this.saveStats();
    }
}
