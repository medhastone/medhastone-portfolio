class UIController {
    constructor(game) {
        this.game = game;
        this.screens = document.querySelectorAll('.screen');
        this.stats = Utils.loadData('stats', { matches: 0, wins: 0, losses: 0, xp: 0 });
        this.bindEvents();
    }

    switchScreen(id) {
        this.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    bindEvents() {
        document.getElementById('btn-play').addEventListener('click', () => this.switchScreen('screen-modes'));
        document.getElementById('btn-customization').addEventListener('click', () => {
            this.switchScreen('screen-customization');
            this.renderCustomization();
        });
        document.getElementById('btn-stats').addEventListener('click', () => {
            this.switchScreen('screen-stats');
            this.renderStats();
        });
        
        document.querySelectorAll('.btn-back').forEach(btn => {
            btn.addEventListener('click', () => this.switchScreen('screen-main'));
        });

        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                audio.resume();
                this.game.startMatch(mode);
                this.switchScreen('screen-hud');
            });
        });

        document.getElementById('btn-rematch').addEventListener('click', () => {
            this.game.startMatch(this.game.currentMode);
            this.switchScreen('screen-hud');
        });
        document.getElementById('btn-menu').addEventListener('click', () => this.switchScreen('screen-main'));
        
        // Customization tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.custom-content').forEach(c => c.classList.add('hidden'));
                e.target.classList.add('active');
                document.getElementById('tab-' + e.target.dataset.tab).classList.remove('hidden');
            });
        });
    }

    renderStats() {
        const container = document.getElementById('stats-content');
        container.innerHTML = `
            <div class="stat-row"><span>Total Matches:</span> <span class="stat-val">${this.stats.matches}</span></div>
            <div class="stat-row"><span>Wins:</span> <span class="stat-val">${this.stats.wins}</span></div>
            <div class="stat-row"><span>Losses:</span> <span class="stat-val">${this.stats.losses}</span></div>
            <div class="stat-row"><span>Total XP:</span> <span class="stat-val">${this.stats.xp}</span></div>
            <div class="stat-row"><span>Win Rate:</span> <span class="stat-val">${this.stats.matches > 0 ? Math.round((this.stats.wins / this.stats.matches) * 100) : 0}%</span></div>
        `;
    }

    renderCustomization() {
        const container = document.getElementById('paddle-skins-container');
        const skins = [
            { id: 'neon', name: 'Neon (Default)', color: '0, 243, 255' },
            { id: 'fire', name: 'Fire Paddle', color: '255, 50, 0' },
            { id: 'plasma', name: 'Plasma Green', color: '50, 255, 50' },
            { id: 'gold', name: 'Gold Elite', color: '255, 215, 0' }
        ];
        const activeSkin = Utils.loadData('active_skin', 'neon');
        
        container.innerHTML = skins.map(s => `
            <div class="skin-item ${s.id === activeSkin ? 'active' : ''}" data-skin="${s.id}" data-color="${s.color}">
                <div class="skin-preview" style="background: rgb(${s.color}); box-shadow: 0 0 10px rgb(${s.color});"></div>
                <p>${s.name}</p>
            </div>
        `).join('');
        
        container.querySelectorAll('.skin-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget;
                Utils.saveData('active_skin', target.dataset.skin);
                Utils.saveData('active_color', target.dataset.color);
                this.renderCustomization();
            });
        });
    }

    updateScore(p1, p2) {
        document.getElementById('score-p1').innerText = p1;
        document.getElementById('score-p2').innerText = p2;
    }

    showResult(p1Score, p2Score) {
        this.switchScreen('screen-result');
        const isWin = p1Score > p2Score;
        document.getElementById('result-title').innerText = isWin ? 'VICTORY' : 'DEFEAT';
        document.getElementById('result-title').style.color = isWin ? 'var(--primary)' : 'var(--secondary)';
        document.getElementById('result-score').innerText = `${p1Score} - ${p2Score}`;
        
        let xpGained = isWin ? 150 : 50;
        document.getElementById('result-xp').innerText = `+${xpGained} XP`;
        
        this.stats.matches++;
        if(isWin) this.stats.wins++;
        else this.stats.losses++;
        this.stats.xp += xpGained;
        
        Utils.saveData('stats', this.stats);
    }
}
