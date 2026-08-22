class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.active = true;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Car extends Entity {
    constructor(x, y, data) {
        super(x, y, 40, 80);
        this.baseSpeed = data.maxSpeed;
        this.speed = 0;
        this.acc = data.acc;
        this.handle = data.handle;
        this.color = data.color;
        
        this.maxNitro = data.nitro;
        this.nitro = this.maxNitro;
        this.isNitro = false;
        
        this.vx = 0;
        
        // Upgrades modifiers
        this.speedMod = 1;
        this.handleMod = 1;
        this.nitroMod = 1;
    }

    applyUpgrades(upgrades) {
        this.speedMod = 1 + (upgrades.speed || 0) * 0.1;
        this.handleMod = 1 + (upgrades.handling || 0) * 0.1;
        this.nitroMod = 1 + (upgrades.nitro || 0) * 0.2;
    }

    update(keys, canvasWidth, dt) {
        // Lateral movement handled by PlayerController

        // Boundaries
        const margin = 20;
        if (this.x < margin) this.x = margin;
        if (this.x > canvasWidth - this.width - margin) this.x = canvasWidth - this.width - margin;

        // Forward speed
        let targetSpeed = this.baseSpeed * this.speedMod;
        if (keys.ArrowUp || keys.KeyW || keys.w || keys.Gas) {
            targetSpeed = (this.baseSpeed * this.speedMod) * 1.2;
        } else if (keys.ArrowDown || keys.KeyS || keys.s || keys.Brake) {
            targetSpeed = (this.baseSpeed * this.speedMod) * 0.2; // Brake
        }
        
        // Nitro
        if ((keys.Space || keys.Nitro) && this.nitro > 0 && targetSpeed >= 0) {
            this.isNitro = true;
            targetSpeed = (this.baseSpeed * this.speedMod) * 1.5;
            this.nitro -= 1;
        } else {
            this.isNitro = false;
            if (this.nitro < this.maxNitro * this.nitroMod) {
                this.nitro += 0.1; // recharge
            }
        }

        this.speed += (targetSpeed - this.speed) * this.acc;
    }

    draw(ctx) {
        // Draw Car body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 8);
        ctx.fill();
        
        // Windshield
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(this.x + 5, this.y + 15, this.width - 10, 20, 3);
        ctx.fill();
        
        // Rear window
        ctx.beginPath();
        ctx.roundRect(this.x + 5, this.y + this.height - 20, this.width - 10, 10, 2);
        ctx.fill();

        // Nitro flames
        if (this.isNitro) {
            ctx.fillStyle = '#f97316';
            ctx.beginPath();
            ctx.moveTo(this.x + 10, this.y + this.height);
            ctx.lineTo(this.x + 20, this.y + this.height + Math.random() * 30 + 10);
            ctx.lineTo(this.x + 30, this.y + this.height);
            ctx.fill();
            
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.moveTo(this.x + 15, this.y + this.height);
            ctx.lineTo(this.x + 20, this.y + this.height + Math.random() * 20 + 5);
            ctx.lineTo(this.x + 25, this.y + this.height);
            ctx.fill();
        }
    }
}

class Traffic extends Entity {
    constructor(x, y, speed, type) {
        super(x, y, 40, 80);
        this.speed = speed; // Relative speed to environment
        this.type = type;
        const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        if (type === 'truck') {
            this.width = 45;
            this.height = 120;
            this.color = '#cbd5e1';
        }
    }

    update(playerSpeed) {
        // y decreases as player moves forward, so objects move DOWN the screen
        // Player speed is subtracted by traffic speed (if traffic moves same direction)
        this.y += (playerSpeed - this.speed);
        if (this.y > window.innerHeight) this.active = false;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 5);
        ctx.fill();
        
        ctx.fillStyle = '#000';
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.roundRect(this.x + 5, this.y + 10, this.width - 10, 15, 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }
}

class Collectible extends Entity {
    constructor(x, y, type) {
        super(x, y, 20, 20);
        this.type = type; // 'coin', 'gem', 'nitro'
        this.rotation = 0;
    }

    update(playerSpeed) {
        this.y += playerSpeed;
        this.rotation += 0.1;
        if (this.y > window.innerHeight) this.active = false;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        
        if (this.type === 'coin') {
            ctx.scale(Math.cos(this.rotation), 1);
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.arc(0, 0, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#d97706';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#b45309';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('$', 0, 0);
        }
        
        ctx.restore();
    }
}
