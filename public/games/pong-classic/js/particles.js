class ParticleSystem {
    constructor(ctx) {
        this.ctx = ctx;
        this.particles = [];
        this.trails = [];
    }

    createExplosion(x, y, color, count = 20) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Utils.random(2, 8);
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: Utils.random(0.02, 0.05),
                color,
                size: Utils.random(2, 6)
            });
        }
    }

    addTrail(x, y, color) {
        this.trails.push({
            x, y,
            life: 1,
            decay: 0.1,
            color,
            size: 8
        });
    }

    update() {
        // Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            p.size *= 0.95;
            if (p.life <= 0) this.particles.splice(i, 1);
        }
        
        // Trails
        for (let i = this.trails.length - 1; i >= 0; i--) {
            let t = this.trails[i];
            t.life -= t.decay;
            t.size *= 0.9;
            if (t.life <= 0) this.trails.splice(i, 1);
        }
    }

    draw() {
        this.ctx.globalCompositeOperation = 'lighter';
        
        // Draw trails
        for (let t of this.trails) {
            this.ctx.fillStyle = `rgba(${t.color}, ${t.life * 0.5})`;
            this.ctx.beginPath();
            this.ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Draw particles
        for (let p of this.particles) {
            this.ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.globalCompositeOperation = 'source-over';
    }
}
