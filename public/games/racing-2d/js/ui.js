class UI {
    constructor() {
        this.loadSaveData();
        
        this.game = new Game(this);
        this.screens = document.querySelectorAll('.screen');
        
        this.currentCarIndex = 0;
        
        this.bindEvents();
        this.updateMainMenu();
    }
    
    loadSaveData() {
        const defaultData = {
            coins: 0, gems: 0,
            highscore: 0, totalDist: 0, level: 1, xp: 0,
            unlockedCars: ['compact'],
            selectedCar: 'compact',
            upgrades: {} // { carId: { speed: 0, handling: 0, nitro: 0 } }
        };
        
        try {
            const saved = localStorage.getItem('turboRushSave');
            this.data = saved ? {...defaultData, ...JSON.parse(saved)} : defaultData;
        } catch(e) {
            this.data = defaultData;
        }
    }
    
    saveData() {
        localStorage.setItem('turboRushSave', JSON.stringify(this.data));
    }

    switchScreen(id) {
        this.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    bindEvents() {
        // Main Menu
        document.getElementById('btn-play').addEventListener('click', () => {
            if(window.audio) window.audio.click();
        this.switchScreen('screen-game');
            const car = CAR_DATA.find(c => c.id === this.data.selectedCar);
            const upgs = this.data.upgrades[car.id] || { speed:0, handling:0, nitro:0 };
            this.game.start(car, upgs);
        });
        
        document.getElementById('btn-garage').addEventListener('click', () => {
            this.currentCarIndex = CAR_DATA.findIndex(c => c.id === this.data.selectedCar);
            if(this.currentCarIndex < 0) this.currentCarIndex = 0;
            this.updateGarage();
            if(window.audio) window.audio.click();
        this.switchScreen('screen-garage');
        });
        
        document.getElementById('btn-stats').addEventListener('click', () => {
            this.updateStats();
            if(window.audio) window.audio.click();
        this.switchScreen('screen-stats');
        });
        
        // Back buttons
        document.querySelectorAll('.btn-back').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.updateMainMenu();
                if(window.audio) window.audio.click();
        this.switchScreen(e.currentTarget.dataset.target || 'screen-main');
            });
        });

        // Garage controls
        document.getElementById('btn-prev-car').addEventListener('click', () => {
            this.currentCarIndex = (this.currentCarIndex - 1 + CAR_DATA.length) % CAR_DATA.length;
            this.updateGarage();
        });
        document.getElementById('btn-next-car').addEventListener('click', () => {
            this.currentCarIndex = (this.currentCarIndex + 1) % CAR_DATA.length;
            this.updateGarage();
        });
        
        document.getElementById('btn-buy-car').addEventListener('click', () => {
            const car = CAR_DATA[this.currentCarIndex];
            if (this.data.coins >= car.cost) {
                this.data.coins -= car.cost;
                this.data.unlockedCars.push(car.id);
                this.saveData();
                this.updateGarage();
            } else {
                // Not enough coins visual feedback could go here
            }
        });
        
        document.getElementById('btn-select-car').addEventListener('click', () => {
            const car = CAR_DATA[this.currentCarIndex];
            if (this.data.unlockedCars.includes(car.id)) {
                this.data.selectedCar = car.id;
                this.saveData();
                this.updateGarage();
            }
        });
        
        // Upgrades
        const handleUpgrade = (type) => {
            const carId = CAR_DATA[this.currentCarIndex].id;
            if(!this.data.upgrades[carId]) this.data.upgrades[carId] = {speed:0, handling:0, nitro:0};
            
            let lvl = this.data.upgrades[carId][type];
            if (lvl < UPGRADE_COSTS.length) {
                const cost = UPGRADE_COSTS[lvl];
                if (this.data.coins >= cost) {
                    this.data.coins -= cost;
                    this.data.upgrades[carId][type]++;
                    this.saveData();
                    this.updateGarage();
                }
            }
        };
        
        document.getElementById('btn-upg-speed').addEventListener('click', () => handleUpgrade('speed'));
        document.getElementById('btn-upg-handling').addEventListener('click', () => handleUpgrade('handling'));
        document.getElementById('btn-upg-nitro').addEventListener('click', () => handleUpgrade('nitro'));

        // Game Pause/Resume
        document.getElementById('btn-pause').addEventListener('click', () => {
            this.game.pause();
            document.getElementById('overlay-pause').classList.add('active');
        });
        document.getElementById('btn-resume').addEventListener('click', () => {
            document.getElementById('overlay-pause').classList.remove('active');
            this.game.resume();
        });
        document.getElementById('btn-quit').addEventListener('click', () => {
            document.getElementById('overlay-pause').classList.remove('active');
            this.game.stop();
            this.updateMainMenu();
            if(window.audio) window.audio.click();
        this.switchScreen('screen-main');
        });
        
        // Results
        document.getElementById('btn-restart').addEventListener('click', () => {
            if(window.audio) window.audio.click();
        this.switchScreen('screen-game');
            const car = CAR_DATA.find(c => c.id === this.data.selectedCar);
            const upgs = this.data.upgrades[car.id] || { speed:0, handling:0, nitro:0 };
            this.game.start(car, upgs);
        });
        document.getElementById('btn-home').addEventListener('click', () => {
            this.updateMainMenu();
            if(window.audio) window.audio.click();
        this.switchScreen('screen-main');
        });
    }

    updateMainMenu() {
        document.getElementById('menu-coins').innerText = this.data.coins;
        document.getElementById('menu-gems').innerText = this.data.gems;
        document.getElementById('menu-level').innerText = this.data.level;
    }

    renderCarPreview(car) {
        const canvas = document.getElementById('car-preview');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Center drawing
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        
        const w = 60, h = 120;
        ctx.fillStyle = car.color;
        ctx.beginPath(); ctx.roundRect(-w/2, -h/2, w, h, 12); ctx.fill();
        
        // Glass
        ctx.fillStyle = '#1e293b';
        ctx.beginPath(); ctx.roundRect(-w/2 + 8, -h/2 + 25, w - 16, 30, 4); ctx.fill();
        ctx.beginPath(); ctx.roundRect(-w/2 + 8, h/2 - 30, w - 16, 15, 3); ctx.fill();
        
        ctx.restore();
    }

    updateGarage() {
        const car = CAR_DATA[this.currentCarIndex];
        document.getElementById('garage-car-name').innerText = car.name;
        document.getElementById('garage-coins').innerText = this.data.coins;
        
        this.renderCarPreview(car);
        
        const btnBuy = document.getElementById('btn-buy-car');
        const btnSelect = document.getElementById('btn-select-car');
        
        const isUnlocked = this.data.unlockedCars.includes(car.id);
        const isSelected = this.data.selectedCar === car.id;
        
        if (isUnlocked) {
            btnBuy.style.display = 'none';
            btnSelect.style.display = 'block';
            btnSelect.innerText = isSelected ? 'SELECTED' : 'SELECT';
            btnSelect.style.background = isSelected ? 'var(--green)' : 'var(--secondary)';
        } else {
            btnBuy.style.display = 'block';
            btnSelect.style.display = 'none';
            btnBuy.innerHTML = `BUY - ${car.cost} <span class="material-symbols-rounded">monetization_on</span>`;
            btnBuy.style.opacity = this.data.coins >= car.cost ? '1' : '0.5';
        }
        
        // Upgrades
        const upgs = this.data.upgrades[car.id] || { speed:0, handling:0, nitro:0 };
        const renderBars = (id, lvl, type) => {
            const container = document.getElementById(id);
            container.innerHTML = '';
            for(let i=0; i<7; i++) {
                const bar = document.createElement('div');
                bar.className = 'upg-bar' + (i < lvl ? ' filled' : '');
                if (i < lvl && i === 6) bar.className = 'upg-bar max';
                container.appendChild(bar);
            }
            
            const btn = document.getElementById('btn-upg-' + type);
            if (!isUnlocked) {
                btn.style.display = 'none';
            } else if (lvl >= 7) {
                btn.style.display = 'block';
                btn.innerText = 'MAX';
                btn.style.background = 'var(--text-muted)';
            } else {
                btn.style.display = 'block';
                btn.innerText = UPGRADE_COSTS[lvl];
                btn.style.background = this.data.coins >= UPGRADE_COSTS[lvl] ? 'var(--green)' : 'var(--text-muted)';
            }
        };
        
        renderBars('upg-speed-bars', upgs.speed, 'speed');
        renderBars('upg-handling-bars', upgs.handling, 'handling');
        renderBars('upg-nitro-bars', upgs.nitro, 'nitro');
    }

    updateStats() {
        const list = document.getElementById('stats-list');
        list.innerHTML = `
            <div class="stat-item"><span>High Score</span> <span class="text-gold">${Math.floor(this.data.highscore)}</span></div>
            <div class="stat-item"><span>Total Distance</span> <span>${Math.floor(this.data.totalDist/1000)} km</span></div>
            <div class="stat-item"><span>Total Coins</span> <span class="text-yellow">${this.data.coins}</span></div>
            <div class="stat-item"><span>Cars Unlocked</span> <span>${this.data.unlockedCars.length}/${CAR_DATA.length}</span></div>
        `;
    }

    updateHUD(score, coins, nitro, maxNitro) {
        document.getElementById('hud-score').innerText = Math.floor(score);
        document.getElementById('hud-coins').innerText = coins;
        const nPct = (nitro / maxNitro) * 100;
        document.getElementById('nitro-fill').style.width = nPct + '%';
    }

    showResults(score, distance, coins) {
        if (score > this.data.highscore) this.data.highscore = score;
        this.data.totalDist += distance;
        this.data.coins += coins;
        
        // Basic XP/Leveling
        this.data.xp += Math.floor(score);
        if (this.data.xp > this.data.level * 1000) {
            this.data.level++;
            this.data.xp = 0;
            // Level up reward
            this.data.gems += 5;
        }
        
        this.saveData();
        
        document.getElementById('res-score').innerText = Math.floor(score);
        document.getElementById('res-highscore').innerText = Math.floor(this.data.highscore);
        document.getElementById('res-distance').innerText = Math.floor(distance) + ' m';
        document.getElementById('res-coins').innerText = '+' + coins;
        
        if(window.audio) window.audio.click();
        this.switchScreen('screen-results');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new UI();
});
