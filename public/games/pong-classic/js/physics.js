class Paddle {
    constructor(isLeft, canvasHeight, isAI = false) {
        this.w = 15;
        this.h = 100;
        this.baseH = 100;
        this.x = isLeft ? 30 : window.innerWidth - 30 - this.w;
        this.y = canvasHeight / 2 - this.h / 2;
        this.vy = 0;
        this.speed = 8;
        this.isAI = isAI;
        this.color = isLeft ? '0, 243, 255' : '255, 0, 234';
        this.targetY = this.y;
        this.hasShield = false;
    }

    update(canvasHeight, ball) {
        if (this.isAI) {
            let center = this.y + this.h / 2;
            let reactionLimit = this.speed * 0.85;
            if (center < ball.y - 10) this.y += reactionLimit;
            else if (center > ball.y + 10) this.y -= reactionLimit;
        } else {
            let diff = this.targetY - (this.y + this.h / 2);
            if (Math.abs(diff) > this.speed) {
                this.y += Math.sign(diff) * this.speed;
            } else {
                this.y += diff;
            }
        }
        this.y = Utils.clamp(this.y, 0, canvasHeight - this.h);
    }

    draw(ctx) {
        ctx.fillStyle = `rgb(${this.color})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgb(${this.color})`;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        
        if (this.hasShield) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x + this.w/2, this.y + this.h/2, this.h/1.5, -Math.PI/2, Math.PI/2, this.x > 100);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
    }
}

class Ball {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.reset();
        this.color = '255, 255, 255';
    }

    reset() {
        this.x = this.w / 2;
        this.y = this.h / 2;
        this.size = 10;
        let angle = Utils.random(-Math.PI/6, Math.PI/6);
        let dir = Math.random() > 0.5 ? 1 : -1;
        this.speed = 7;
        this.vx = Math.cos(angle) * this.speed * dir;
        this.vy = Math.sin(angle) * this.speed;
        this.active = true;
    }

    update(p1, p2, particles) {
        if(!this.active) return 0;
        
        this.x += this.vx;
        this.y += this.vy;
        
        particles.addTrail(this.x, this.y, this.color);
        
        if (this.y - this.size <= 0 || this.y + this.size >= this.h) {
            this.vy *= -1;
            this.y = Utils.clamp(this.y, this.size, this.h - this.size);
            audio.playWallHit();
            particles.createExplosion(this.x, this.y, this.color, 5);
        }
        
        let hit = false;
        let p = null;
        
        if (this.vx < 0 && this.x - this.size <= p1.x + p1.w && this.x + this.size >= p1.x && this.y >= p1.y && this.y <= p1.y + p1.h) {
            hit = true; p = p1; this.x = p1.x + p1.w + this.size;
        } else if (this.vx > 0 && this.x + this.size >= p2.x && this.x - this.size <= p2.x + p2.w && this.y >= p2.y && this.y <= p2.y + p2.h) {
            hit = true; p = p2; this.x = p2.x - this.size;
        }
        
        if (hit) {
            audio.playPaddleHit();
            particles.createExplosion(this.x, this.y, p.color, 15);
            
            let intersectY = p.y + (p.h / 2) - this.y;
            let normalizedIntersect = (intersectY / (p.h / 2));
            let bounceAngle = normalizedIntersect * (Math.PI / 3);
            
            let dir = this.vx > 0 ? -1 : 1;
            this.speed = Math.min(this.speed + 0.6, 25);
            this.vx = dir * this.speed * Math.cos(bounceAngle);
            this.vy = this.speed * -Math.sin(bounceAngle);
            return 3; // return 3 for paddle hit (triggers powerup checks)
        }
        
        if (this.x < 0) {
            if(p1.hasShield) {
                p1.hasShield = false;
                this.vx *= -1;
                audio.playWallHit();
                particles.createExplosion(this.x, this.y, '255,255,255', 30);
                return 0;
            }
            return 2;
        }
        if (this.x > this.w) {
            if(p2.hasShield) {
                p2.hasShield = false;
                this.vx *= -1;
                audio.playWallHit();
                particles.createExplosion(this.x, this.y, '255,255,255', 30);
                return 0;
            }
            return 1;
        }
        
        return 0;
    }

    draw(ctx) {
        ctx.fillStyle = `rgb(${this.color})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgb(${this.color})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class PowerUp {
    constructor(w, h) {
        this.x = Utils.random(w/4, w*3/4);
        this.y = Utils.random(50, h-50);
        this.size = 15;
        this.type = ['Speed', 'Giant', 'Shield', 'Slow'][Math.floor(Math.random() * 4)];
        this.active = true;
        this.color = this.type === 'Speed' ? '255,255,0' : this.type === 'Giant' ? '0,255,0' : this.type === 'Shield' ? '0,100,255' : '255,0,0';
    }

    draw(ctx) {
        if(!this.active) return;
        ctx.fillStyle = `rgb(${this.color})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgb(${this.color})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000';
        ctx.font = '10px Orbitron';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.type[0], this.x, this.y);
        ctx.shadowBlur = 0;
    }
}
