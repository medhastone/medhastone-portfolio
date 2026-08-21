class Game {
    constructor() {
        this.bgCanvas = document.getElementById('bg-canvas');
        this.gameCanvas = document.getElementById('game-canvas');
        this.bgCtx = this.bgCanvas.getContext('2d');
        this.ctx = this.gameCanvas.getContext('2d', { alpha: true });
        
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.particles = new ParticleSystem(this.ctx);
        this.ui = new UIController(this);
        
        this.isRunning = false;
        this.keys = {};
        this.powerups = [];
        this.powerupTimer = 0;
        
        this.bindInput();
        this.drawBackground();
        requestAnimationFrame(() => this.loop());
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.bgCanvas.width = this.width;
        this.bgCanvas.height = this.height;
        this.gameCanvas.width = this.width;
        this.gameCanvas.height = this.height;
        if (!this.isRunning) this.drawBackground();
    }

    bindInput() {
        window.addEventListener('keydown', e => this.keys[e.key] = true);
        window.addEventListener('keyup', e => this.keys[e.key] = false);
        
        const touchLeft = document.getElementById('touch-left');
        const touchRight = document.getElementById('touch-right');
        
        const handleTouch = (e, isLeft) => {
            e.preventDefault();
            if(!this.isRunning) return;
            const touch = e.touches[0];
            if(touch) {
                if(isLeft) this.p1.targetY = touch.clientY;
                if(!this.p2.isAI && !isLeft) this.p2.targetY = touch.clientY;
            }
        };
        
        touchLeft.addEventListener('touchstart', e => handleTouch(e, true));
        touchLeft.addEventListener('touchmove', e => handleTouch(e, true));
        touchRight.addEventListener('touchstart', e => handleTouch(e, false));
        touchRight.addEventListener('touchmove', e => handleTouch(e, false));
        
        this.gameCanvas.addEventListener('mousemove', e => {
            if(!this.isRunning) return;
            if(e.clientX < this.width/2) this.p1.targetY = e.clientY;
            else if(!this.p2.isAI) this.p2.targetY = e.clientY;
        });
    }

    startMatch(mode) {
        this.currentMode = mode;
        this.p1Score = 0;
        this.p2Score = 0;
        this.powerups = [];
        this.powerupTimer = Date.now();
        
        let isMultiplayer = mode === 'multiplayer';
        
        this.p1 = new Paddle(true, this.height, false);
        this.p2 = new Paddle(false, this.height, !isMultiplayer);
        
        if (mode === 'survival') {
            this.p2.isAI = true;
            this.p2.speed = 12; // Hard AI
        }
        
        let customColor = Utils.loadData('active_color', '0, 243, 255');
        this.p1.color = customColor;
        
        this.ball = new Ball(this.width, this.height);
        
        this.winScore = mode === 'survival' ? 999 : 5;
        this.ui.updateScore(this.p1Score, this.p2Score);
        
        this.isRunning = true;
    }

    endMatch() {
        this.isRunning = false;
        this.ui.showResult(this.p1Score, this.p2Score);
    }

    showNotify(text) {
        const notify = document.getElementById('powerup-notify');
        notify.innerText = text;
        notify.classList.add('show');
        setTimeout(() => notify.classList.remove('show'), 2000);
    }

    applyPowerUp(type, hitter) {
        audio.playPowerup();
        this.showNotify(type.toUpperCase() + '!');
        
        if (type === 'Speed') {
            hitter.speed += 4;
            setTimeout(() => hitter.speed -= 4, 10000);
        } else if (type === 'Giant') {
            hitter.h = hitter.baseH * 2;
            setTimeout(() => hitter.h = hitter.baseH, 10000);
        } else if (type === 'Shield') {
            hitter.hasShield = true;
        } else if (type === 'Slow') {
            this.ball.speed = 4;
        }
    }

    update() {
        if (!this.isRunning) return;

        if (this.keys['w'] || this.keys['W']) this.p1.targetY -= this.p1.speed * 2;
        if (this.keys['s'] || this.keys['S']) this.p1.targetY += this.p1.speed * 2;
        
        if (this.keys['ArrowUp'] && !this.p2.isAI) this.p2.targetY -= this.p2.speed * 2;
        if (this.keys['ArrowDown'] && !this.p2.isAI) this.p2.targetY += this.p2.speed * 2;

        this.p1.update(this.height, this.ball);
        this.p2.update(this.height, this.ball);
        
        let result = this.ball.update(this.p1, this.p2, this.particles);
        
        // Handle Powerups
        if (this.currentMode === 'arcade') {
            if (Date.now() - this.powerupTimer > 5000 && this.powerups.length < 2) {
                this.powerups.push(new PowerUp(this.width, this.height));
                this.powerupTimer = Date.now();
            }
            
            for (let i = this.powerups.length - 1; i >= 0; i--) {
                let pu = this.powerups[i];
                if (Utils.distance(this.ball.x, this.ball.y, pu.x, pu.y) < this.ball.size + pu.size) {
                    this.particles.createExplosion(pu.x, pu.y, pu.color, 20);
                    // Decide who hit it
                    let hitter = this.ball.vx > 0 ? this.p1 : this.p2; // If ball is going right, p1 hit it
                    this.applyPowerUp(pu.type, hitter);
                    this.powerups.splice(i, 1);
                }
            }
        }
        
        if (result === 1 || result === 2) {
            audio.playScore();
            if (result === 1) {
                this.p1Score++;
                this.particles.createExplosion(this.width, this.ball.y, this.p1.color, 50);
            } else {
                this.p2Score++;
                this.particles.createExplosion(0, this.ball.y, this.p2.color, 50);
            }
            
            this.ui.updateScore(this.p1Score, this.p2Score);
            
            if (this.p1Score >= this.winScore || this.p2Score >= this.winScore) {
                this.endMatch();
            } else {
                this.ball.reset();
            }
        }
        
        this.particles.update();
    }

    drawBackground() {
        this.bgCtx.fillStyle = '#0a0a0f';
        this.bgCtx.fillRect(0, 0, this.width, this.height);
        
        this.bgCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.bgCtx.lineWidth = 4;
        this.bgCtx.setLineDash([15, 15]);
        this.bgCtx.beginPath();
        this.bgCtx.moveTo(this.width / 2, 0);
        this.bgCtx.lineTo(this.width / 2, this.height);
        this.bgCtx.stroke();
        this.bgCtx.setLineDash([]);
        
        const gradient = this.bgCtx.createRadialGradient(this.width/2, this.height/2, 100, this.width/2, this.height/2, this.width);
        gradient.addColorStop(0, 'rgba(0, 243, 255, 0.05)');
        gradient.addColorStop(1, 'transparent');
        this.bgCtx.fillStyle = gradient;
        this.bgCtx.fillRect(0, 0, this.width, this.height);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        if (!this.isRunning) return;
        
        this.particles.draw();
        for(let pu of this.powerups) pu.draw(this.ctx);
        this.p1.draw(this.ctx);
        this.p2.draw(this.ctx);
        if(this.ball.active) this.ball.draw(this.ctx);
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}
