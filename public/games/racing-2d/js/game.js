class PlayerController {
    constructor(game, lanes = 3) {
        this.game = game;
        this.lanes = lanes;
        this.bound = false;
        this.laneCoordinates = [0, 0, 0];
        this.bindInputs();
    }

    calculateLanes() {
        if (!this.game.canvas) return;
        const canvasWidth = this.game.canvas.width;
        const roadW = canvasWidth * 0.8; 
        const roadX = (canvasWidth - roadW) / 2;
        const laneWidth = roadW / this.lanes;
        
        for (let i = 0; i < this.lanes; i++) {
            this.laneCoordinates[i] = roadX + (i * laneWidth) + (laneWidth / 2);
        }
    }

    bindInputs() {
        if (this.bound) return;
        this.bound = true;

        window.addEventListener('keydown', e => {
            if (!this.game.isRunning || this.game.isPaused || this.game.isCrashed) return;
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                this.changeLane(-1);
            }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                this.changeLane(1);
            }
        });

        const bindBtn = (id, dir) => {
            const btn = document.getElementById(id);
            if (!btn) return;
            const tap = (e) => {
                if (e.cancelable) e.preventDefault();
                if (!this.game.isRunning || this.game.isPaused || this.game.isCrashed) return;
                this.changeLane(dir);
                btn.classList.add('active');
                setTimeout(() => btn.classList.remove('active'), 100);
            };
            btn.addEventListener('touchstart', tap, {passive: false});
            btn.addEventListener('mousedown', tap);
        };
        bindBtn('btn-left', -1);
        bindBtn('btn-right', 1);

        // Mobile tap zones
        if (this.game.canvas) {
            this.game.canvas.addEventListener('touchstart', (e) => {
                if (e.cancelable) e.preventDefault();
                if (!this.game.isRunning || this.game.isPaused || this.game.isCrashed) return;
                
                const touch = e.changedTouches[0];
                if (!touch) return;
                
                const rect = this.game.canvas.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                if (x < rect.width / 2) {
                    this.changeLane(-1);
                } else {
                    this.changeLane(1);
                }
            }, {passive: false});
        }
    }

    changeLane(dir) {
        const p = this.game.player;
        if (!p) return;
        
        if (p.lane === undefined) p.lane = 1;
        
        p.lane += dir;
        if (p.lane < 0) p.lane = 0;
        if (p.lane >= this.lanes) p.lane = this.lanes - 1;
        
        this.updatePosition();
    }
    
    updatePosition() {
        const p = this.game.player;
        if (!p) return;
        this.calculateLanes();
        if (p.lane === undefined) p.lane = 1;
        p.x = this.laneCoordinates[p.lane] - (p.width / 2);
    }

    update(dt) {
        // Enforce boundaries each frame to prevent any drift and handle resize
        this.updatePosition();
    }
}

class Game {
    constructor(ui) {
        this.ui = ui;
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.keys = {};
        this.isRunning = false;
        this.isPaused = false;
        this.lastTime = 0;
        
        this.player = null;
        this.controller = new PlayerController(this);
        
        this.traffic = [];
        this.collectibles = [];
        this.particles = [];
        
        this.score = 0;
        this.distance = 0;
        this.coinsCollected = 0;
        this.isCrashed = false;
        
        this.roadOffset = 0;
        this.env = ENVIRONMENTS[0];
        
        this.spawnTimer = 0;
        this.coinTimer = 0;
        this.difficulty = 1;
        if(this.player) this.player.lane = 1;
        
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Inputs
        window.addEventListener('keydown', e => {
                                    if (e.key === 'ArrowUp' || e.key === 'w') this.keys['ArrowUp'] = true;
            if (e.key === 'ArrowDown' || e.key === 's') this.keys['ArrowDown'] = true;
        });
        window.addEventListener('keyup', e => {
                                    if (e.key === 'ArrowUp' || e.key === 'w') this.keys['ArrowUp'] = false;
            if (e.key === 'ArrowDown' || e.key === 's') this.keys['ArrowDown'] = false;
        });
        
        // Touch controls
                        
        // On-screen Mobile Controls
        const bindBtn = (id, key) => {
            const btn = document.getElementById(id);
            if(!btn) return;
            const down = (e) => { if(e.cancelable) e.preventDefault(); this.keys[key] = true; btn.classList.add('active'); };
            const up = (e) => { if(e.cancelable) e.preventDefault(); this.keys[key] = false; btn.classList.remove('active'); };
            btn.addEventListener('touchstart', down, {passive: false});
            btn.addEventListener('touchend', up, {passive: false});
            btn.addEventListener('mousedown', down);
            btn.addEventListener('mouseup', up);
            btn.addEventListener('mouseleave', up);
        };
                        bindBtn('btn-gas', 'Gas');
        bindBtn('btn-brake', 'Brake');
        
    }

    resize() {
        const container = document.getElementById('game-container');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }

    start(carData, upgrades) {
        this.env = ENVIRONMENTS[Math.floor(Math.random() * ENVIRONMENTS.length)];
        
        this.player = new Car(this.canvas.width / 2 - 20, this.canvas.height - 150, carData);
        this.player.applyUpgrades(upgrades);
        
        this.traffic = [];
        this.collectibles = [];
        this.particles = [];
        
        this.score = 0;
        this.distance = 0;
        this.coinsCollected = 0;
        this.isCrashed = false;
        this.difficulty = 1;
        if(this.player) this.player.lane = 1;
        
        
        this.isRunning = true;
        this.isPaused = false;
        this.lastTime = performance.now();
        
        requestAnimationFrame(t => this.loop(t));
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
        this.lastTime = performance.now();
        requestAnimationFrame(t => this.loop(t));
    }

    stop() {
        this.isRunning = false;
    }

    checkCollisions() {
        const p = this.player;
        const margin = 5;
        
        // Traffic
        for (let t of this.traffic) {
            if (p.x < t.x + t.width - margin &&
                p.x + p.width > t.x + margin &&
                p.y < t.y + t.height - margin &&
                p.height + p.y > t.y + margin) {
                // Crash
                if (!this.isCrashed) {
                    this.isCrashed = true;
                    if(window.audio) window.audio.crash();
                    for(let i=0; i<30; i++) this.particles.push(new Particle(p.x + p.width/2, p.y, '#ef4444'));
                    setTimeout(() => this.endGame(), 1500);
                }
                return;
            }
        }
        
        // Collectibles
        for (let c of this.collectibles) {
            if (c.active && p.x < c.x + c.width &&
                p.x + p.width > c.x &&
                p.y < c.y + c.height &&
                p.height + p.y > c.y) {
                c.active = false;
                if (c.type === 'coin') {
                    this.coinsCollected++;
                    if(window.audio) window.audio.coin();
                    this.score += 10;
                    for(let i=0; i<10; i++) this.particles.push(new Particle(c.x + c.width/2, c.y + c.height/2, '#fbbf24'));
                }
            }
        }
    }

    spawnEntities() {
        this.spawnTimer--;
        this.coinTimer--;
        
        if (this.spawnTimer <= 0) {
            const laneWidth = this.canvas.width / 4;
            const lane = Math.floor(Math.random() * 4);
            const x = lane * laneWidth + laneWidth/2 - 20;
            
            const speed = (Math.random() * 5 + 2) * this.difficulty;
            const type = Math.random() > 0.8 ? 'truck' : 'car';
            
            this.traffic.push(new Traffic(x, -100, speed, type));
            
            this.spawnTimer = 60 - this.difficulty * 5;
            if (this.spawnTimer < 20) this.spawnTimer = 20;
        }
        
        if (this.coinTimer <= 0) {
            const laneWidth = this.canvas.width / 4;
            const lane = Math.floor(Math.random() * 4);
            const x = lane * laneWidth + laneWidth/2 - 10;
            
            this.collectibles.push(new Collectible(x, -50, 'coin'));
            this.coinTimer = Math.random() * 100 + 50;
        }
    }

    endGame() {
        this.isRunning = false;
        this.ui.showResults(this.score, this.distance, this.coinsCollected);
    }

    loop(timestamp) {
        if (!this.isRunning || this.isPaused) return;
        
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        
        this.update(dt);
        this.draw();
        this.ui.updateHUD(this.score, this.coinsCollected, this.player.nitro, this.player.maxNitro * this.player.nitroMod);
        
        requestAnimationFrame(t => this.loop(t));
    }

    update(dt) {
        if (!this.isCrashed) {
            this.controller.update(dt);
            this.player.update(this.keys, this.canvas.width, dt);
        } else {
            this.player.speed *= 0.9; // decelerate
        }
        
        // Increase difficulty over time
        this.difficulty += dt * 0.01;
        this.distance += this.player.speed * dt;
        this.score += this.player.speed * dt * 0.1;
        
        this.roadOffset += this.player.speed;
        if (this.roadOffset > 100) this.roadOffset -= 100;
        
        this.spawnEntities();
        
        for (let t of this.traffic) t.update(this.player.speed);
        for (let c of this.collectibles) c.update(this.player.speed);
        for (let p of this.particles) p.update();
        this.particles = this.particles.filter(p => p.life > 0);
        
        this.traffic = this.traffic.filter(t => t.active && t.y > -500);
        this.collectibles = this.collectibles.filter(c => c.active && c.y > -500);
        
        this.checkCollisions();
    }

    draw() {
        // Draw Environment
        this.ctx.fillStyle = this.env.bg;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Road
        const roadW = this.canvas.width * 0.8;
        const roadX = (this.canvas.width - roadW) / 2;
        this.ctx.fillStyle = this.env.road;
        this.ctx.fillRect(roadX, 0, roadW, this.canvas.height);
        
        // Road Lines
        this.ctx.fillStyle = this.env.lines;
        this.ctx.globalAlpha = 0.5;
        for (let i = 1; i < 4; i++) {
            const lineX = roadX + (roadW / 4) * i;
            for (let y = -100; y < this.canvas.height + 100; y += 100) {
                this.ctx.fillRect(lineX - 2, y + this.roadOffset, 4, 50);
            }
        }
        this.ctx.globalAlpha = 1.0;
        
        // Entities
        for (let c of this.collectibles) c.draw(this.ctx);
        for (let t of this.traffic) t.draw(this.ctx);
        this.player.draw(this.ctx);
        for (let p of this.particles) p.draw(this.ctx);
        
        // Speed lines effect
        if (this.player.speed > this.player.baseSpeed) {
            this.ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            for(let i=0; i<10; i++) {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                const len = Math.random() * 100 + 50;
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x, y + len);
            }
            this.ctx.stroke();
        }
    }
}
