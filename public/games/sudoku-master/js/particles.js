class Particles {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.color = 'rgba(255, 255, 255, 0.1)';
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setTheme(themeId) {
        if(themeId === 'light' || themeId === 'zen') {
            this.color = 'rgba(0, 0, 0, 0.05)';
        } else {
            this.color = 'rgba(56, 189, 248, 0.15)'; // primary blue tint
        }
    }

    init() {
        for(let i=0; i<50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: Math.random() * 3 + 1
            });
        }
    }

    burst() {
        for(let i=0; i<100; i++) {
            this.particles.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                r: Math.random() * 5 + 2,
                life: 1.0,
                decay: Math.random() * 0.02 + 0.01,
                isBurst: true
            });
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = this.color;
        
        for(let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            
            if(p.isBurst) {
                p.life -= p.decay;
                if(p.life <= 0) {
                    this.particles.splice(i, 1);
                    continue;
                }
                this.ctx.globalAlpha = p.life;
                this.ctx.fillStyle = '#fbbf24'; // gold for burst
            } else {
                this.ctx.globalAlpha = 1;
                this.ctx.fillStyle = this.color;
                if(p.x < 0) p.x = this.canvas.width;
                if(p.x > this.canvas.width) p.x = 0;
                if(p.y < 0) p.y = this.canvas.height;
                if(p.y > this.canvas.height) p.y = 0;
            }
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1;
    }
}
