class UI {
    constructor() {
        this.screens = document.querySelectorAll('.screen');
        this.stats = this.loadStats();
        this.skins = [
            { id: 0, name: 'Classic Bird', price: 0, color: 0xfbbf24, icon: 'pets' },
            { id: 1, name: 'Blue Jay', price: 50, color: 0x0ea5e9, icon: 'flutter_dash' },
            { id: 2, name: 'Red Robin', price: 100, color: 0xef4444, icon: 'cruelty_free' },
            { id: 3, name: 'Emerald Owl', price: 250, color: 0x10b981, icon: 'visibility' },
            { id: 4, name: 'Cyber Drone', price: 500, color: 0x475569, icon: 'smart_toy' },
            { id: 5, name: 'Gold Phoenix', price: 1000, color: 0xffd700, icon: 'whatshot' }
        ];
        
        this.missions = [
            { id: 1, desc: 'Score 10 points', target: 10, reward: 50, progress: 0 },
            { id: 2, desc: 'Collect 50 coins', target: 50, reward: 100, progress: 0 },
            { id: 3, desc: 'Play 5 games', target: 5, reward: 75, progress: 0 }
        ];

        this.bindEvents();
        this.updateMenuStats();
        this.renderShop();
        this.renderMissions();
    }

    switchScreen(id) {
        this.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        if(id !== 'screen-game') {
            document.getElementById('game-canvas').style.filter = 'blur(5px)';
        } else {
            document.getElementById('game-canvas').style.filter = 'none';
        }
    }

    bindEvents() {
        document.getElementById('btn-play').addEventListener('click', () => {
            this.switchScreen('screen-game');
            window.game.start();
        });
        document.getElementById('btn-restart').addEventListener('click', () => {
            this.switchScreen('screen-game');
            window.game.start();
        });
        document.getElementById('btn-characters').addEventListener('click', () => {
            this.renderShop();
            this.switchScreen('screen-characters');
        });
        document.getElementById('btn-missions').addEventListener('click', () => {
            this.renderMissions();
            this.switchScreen('screen-missions');
        });
        document.querySelectorAll('.btn-back, #btn-menu').forEach(btn => {
            btn.addEventListener('click', () => {
                this.updateMenuStats();
                this.switchScreen('screen-main');
            });
        });
    }

    loadStats() {
        const def = { highscore: 0, coins: 0, xp: 0, level: 1, unlocked: [0], currentSkin: 0, gamesPlayed: 0 };
        try {
            return JSON.parse(localStorage.getItem('flappyX_stats')) || def;
        } catch(e) { return def; }
    }

    saveStats() {
        localStorage.setItem('flappyX_stats', JSON.stringify(this.stats));
    }

    updateMenuStats() {
        document.getElementById('menu-coins').innerText = this.stats.coins;
        document.getElementById('menu-highscore').innerText = this.stats.highscore;
        document.getElementById('shop-coins').innerText = this.stats.coins;
    }

    renderShop() {
        const grid = document.getElementById('character-grid');
        grid.innerHTML = '';
        this.skins.forEach(skin => {
            const isUnlocked = this.stats.unlocked.includes(skin.id);
            const isActive = this.stats.currentSkin === skin.id;
            
            const card = document.createElement('div');
            card.className = `char-card ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`;
            
            let priceHtml = isUnlocked ? '<span class="material-icons">check</span> OWNED' : `<span class="material-icons">monetization_on</span> ${skin.price}`;
            
            card.innerHTML = `
                <div class="char-icon"><span class="material-icons" style="color: ${'#' + skin.color.toString(16).padStart(6,'0')}">${skin.icon}</span></div>
                <div class="char-name">${skin.name}</div>
                <div class="char-price mt-2">${priceHtml}</div>
            `;
            
            card.addEventListener('click', () => {
                if(isUnlocked) {
                    this.stats.currentSkin = skin.id;
                    this.saveStats();
                    this.renderShop();
                    if(window.game) window.game.updateBirdSkin();
                } else if(this.stats.coins >= skin.price) {
                    this.stats.coins -= skin.price;
                    this.stats.unlocked.push(skin.id);
                    this.stats.currentSkin = skin.id;
                    this.saveStats();
                    this.updateMenuStats();
                    this.renderShop();
                    audio.powerup();
                    if(window.game) window.game.updateBirdSkin();
                } else {
                    audio.hit(); // error sound
                }
            });
            grid.appendChild(card);
        });
    }

    renderMissions() {
        // Rank logic
        const rankNames = ['Rookie Flyer', 'Wing Explorer', 'Sky Rider', 'Flight Master'];
        const rankIdx = Math.min(Math.floor((this.stats.level - 1) / 5), rankNames.length - 1);
        document.getElementById('rank-title').innerText = rankNames[rankIdx] + ` (Lv ${this.stats.level})`;
        
        const nextXp = this.stats.level * 100;
        document.getElementById('xp-current').innerText = this.stats.xp;
        document.getElementById('xp-next').innerText = nextXp;
        document.getElementById('rank-xp').style.width = `${Math.min(100, (this.stats.xp / nextXp) * 100)}%`;

        const list = document.getElementById('mission-list');
        list.innerHTML = '';
        this.missions.forEach(m => {
            const card = document.createElement('div');
            card.className = 'mission-card';
            card.innerHTML = `
                <div class="mission-desc">${m.desc}</div>
                <div class="mission-reward"><span class="material-icons">monetization_on</span> ${m.reward}</div>
            `;
            list.appendChild(card);
        });
    }

    showGameOver(score, coinsEarned) {
        this.stats.gamesPlayed++;
        this.stats.coins += coinsEarned;
        
        const isNewBest = score > this.stats.highscore;
        if(isNewBest) this.stats.highscore = score;
        
        const xpEarned = score * 5 + coinsEarned * 2;
        this.stats.xp += xpEarned;
        
        let levelUp = false;
        while(this.stats.xp >= this.stats.level * 100) {
            this.stats.xp -= this.stats.level * 100;
            this.stats.level++;
            levelUp = true;
        }

        this.saveStats();

        document.getElementById('result-score').innerText = score;
        document.getElementById('result-best').innerText = this.stats.highscore;
        document.getElementById('result-coins').innerText = coinsEarned;
        document.getElementById('result-xp').innerText = xpEarned + (levelUp ? ' (LEVEL UP!)' : '');
        
        if(isNewBest) {
            document.getElementById('result-score').classList.add('text-gold');
        } else {
            document.getElementById('result-score').classList.remove('text-gold');
        }

        this.switchScreen('screen-gameover');
    }
}
