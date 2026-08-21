class Game {
    constructor(ui) {
        this.ui = ui;
        this.canvas = document.getElementById('game-canvas');
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.isActive = false;
        this.score = 0;
        this.coins = 0;
        this.distance = 0;
        this.speed = 5;
        this.gravity = -25;
        this.jumpForce = 12;
        
        this.bird = null;
        this.birdVelocity = 0;
        
        this.obstacles = [];
        this.coinObjects = [];
        this.particles = [];
        this.clouds = [];
        
        this.clock = new THREE.Clock();
        
        this.init3D();
        this.bindEvents();
        
        window.addEventListener('resize', () => this.resize());
        this.resize();
        
        this.animate();
    }

    init3D() {
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, 20, 10);
        dirLight.castShadow = true;
        this.scene.add(dirLight);

        // Ground
        const groundGeo = new THREE.BoxGeometry(100, 2, 20);
        const groundMat = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
        this.ground = new THREE.Mesh(groundGeo, groundMat);
        this.ground.position.y = -10;
        this.scene.add(this.ground);
        
        const grassGeo = new THREE.BoxGeometry(100, 0.5, 20);
        const grassMat = new THREE.MeshPhongMaterial({ color: 0x228B22 });
        this.grass = new THREE.Mesh(grassGeo, grassMat);
        this.grass.position.y = -8.75;
        this.scene.add(this.grass);

        // Bird setup
        this.createBird();
        
        // Background clouds
        this.createClouds();

        this.camera.position.set(0, 0, 15);
    }

    createBird() {
        if(this.bird) this.scene.remove(this.bird);
        
        const skin = this.ui.skins.find(s => s.id === this.ui.stats.currentSkin) || this.ui.skins[0];
        
        const geo = new THREE.SphereGeometry(0.8, 32, 32);
        const mat = new THREE.MeshPhongMaterial({ color: skin.color, shininess: 100 });
        this.bird = new THREE.Mesh(geo, mat);
        
        // Eyes
        const eyeGeo = new THREE.SphereGeometry(0.2, 16, 16);
        const eyeMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const pupilMat = new THREE.MeshPhongMaterial({ color: 0x000000 });
        
        const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
        eyeR.position.set(0.5, 0.2, 0.6);
        const pupilR = new THREE.Mesh(new THREE.SphereGeometry(0.1), pupilMat);
        pupilR.position.set(0.6, 0.2, 0.75);
        
        const beakGeo = new THREE.ConeGeometry(0.3, 0.8, 16);
        const beakMat = new THREE.MeshPhongMaterial({ color: 0xffa500 });
        const beak = new THREE.Mesh(beakGeo, beakMat);
        beak.rotation.z = -Math.PI / 2;
        beak.position.set(0.8, 0, 0);

        this.bird.add(eyeR);
        this.bird.add(pupilR);
        this.bird.add(beak);
        
        this.bird.position.set(-5, 0, 0);
        this.scene.add(this.bird);
    }

    updateBirdSkin() {
        this.createBird();
    }

    createClouds() {
        const cloudGeo = new THREE.SphereGeometry(1, 16, 16);
        const cloudMat = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
        
        for(let i=0; i<10; i++) {
            const cloud = new THREE.Group();
            for(let j=0; j<3; j++) {
                const p = new THREE.Mesh(cloudGeo, cloudMat);
                p.position.set(j*1.2 - 1.2, Math.random()*0.5, 0);
                p.scale.setScalar(Math.random()*0.5 + 0.8);
                cloud.add(p);
            }
            cloud.position.set(Math.random()*60 - 30, Math.random()*10 + 5, -15 - Math.random()*10);
            this.scene.add(cloud);
            this.clouds.push(cloud);
        }
    }

    bindEvents() {
        const flap = (e) => {
            if(e) e.preventDefault();
            if(!this.isActive) return;
            this.birdVelocity = this.jumpForce;
            audio.flap();
            this.spawnParticles(this.bird.position.clone(), 5, 0xffffff);
            document.getElementById('touch-hint').style.display = 'none';
        };
        
        document.addEventListener('keydown', (e) => {
            if(e.code === 'Space' || e.code === 'ArrowUp') flap(e);
        });
        this.canvas.addEventListener('mousedown', flap);
        this.canvas.addEventListener('touchstart', flap, {passive: false});
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    start() {
        this.isActive = true;
        this.score = 0;
        this.coins = 0;
        this.distance = 0;
        this.speed = 8;
        this.birdVelocity = 0;
        this.bird.position.set(-5, 0, 0);
        this.bird.rotation.z = 0;
        
        // Clear obstacles
        this.obstacles.forEach(o => this.scene.remove(o.top, o.bottom));
        this.obstacles = [];
        this.coinObjects.forEach(c => this.scene.remove(c));
        this.coinObjects = [];
        
        this.updateHUD();
        document.getElementById('touch-hint').style.display = 'block';
        
        this.spawnObstacle(15);
        this.spawnObstacle(25);
        this.spawnObstacle(35);
    }

    spawnObstacle(xPos) {
        const gapSize = 5.5;
        const gapY = (Math.random() * 10) - 5; // -5 to +5
        
        const pipeGeo = new THREE.CylinderGeometry(1, 1, 20, 16);
        const pipeMat = new THREE.MeshPhongMaterial({ color: 0x2ecc71 });
        
        const topPipe = new THREE.Mesh(pipeGeo, pipeMat);
        topPipe.position.set(xPos, gapY + 10 + gapSize/2, 0);
        
        const bottomPipe = new THREE.Mesh(pipeGeo, pipeMat);
        bottomPipe.position.set(xPos, gapY - 10 - gapSize/2, 0);
        
        this.scene.add(topPipe);
        this.scene.add(bottomPipe);
        
        this.obstacles.push({
            top: topPipe,
            bottom: bottomPipe,
            passed: false,
            x: xPos
        });
        
        // 30% chance for a coin
        if(Math.random() > 0.7) {
            const coinGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16);
            const coinMat = new THREE.MeshPhongMaterial({ color: 0xfbbf24 });
            const coin = new THREE.Mesh(coinGeo, coinMat);
            coin.rotation.x = Math.PI / 2;
            coin.position.set(xPos, gapY, 0);
            this.scene.add(coin);
            this.coinObjects.push(coin);
        }
    }

    spawnParticles(pos, count, color) {
        const geo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const mat = new THREE.MeshBasicMaterial({ color: color });
        for(let i=0; i<count; i++) {
            const p = new THREE.Mesh(geo, mat);
            p.position.copy(pos);
            p.velocity = new THREE.Vector3(
                (Math.random()-0.5)*10,
                (Math.random()-0.5)*10,
                (Math.random()-0.5)*10
            );
            p.life = 1.0;
            this.scene.add(p);
            this.particles.push(p);
        }
    }

    gameOver() {
        this.isActive = false;
        audio.hit();
        this.spawnParticles(this.bird.position, 20, this.bird.material.color.getHex());
        
        setTimeout(() => {
            this.ui.showGameOver(this.score, this.coins);
        }, 1000);
    }

    updateHUD() {
        document.getElementById('hud-score').innerText = this.score;
        document.getElementById('hud-coins').innerText = this.coins;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const dt = Math.min(this.clock.getDelta(), 0.1);
        
        // Ground texture scroll (simulated)
        if(this.isActive) {
            this.distance += this.speed * dt;
        }

        // Bird Physics
        if (this.isActive) {
            this.birdVelocity += this.gravity * dt;
            this.bird.position.y += this.birdVelocity * dt;
            
            // Rotation based on velocity
            const targetRot = Math.max(-Math.PI/2, Math.min(Math.PI/4, this.birdVelocity * 0.1));
            this.bird.rotation.z += (targetRot - this.bird.rotation.z) * 10 * dt;
            
            // Floor/Ceiling collision
            if (this.bird.position.y < -7.5 || this.bird.position.y > 12) {
                this.gameOver();
            }
            
            // Speed progression
            this.speed = 8 + (this.score * 0.2);
            
            // Obstacles
            for (let i = this.obstacles.length - 1; i >= 0; i--) {
                const obs = this.obstacles[i];
                obs.x -= this.speed * dt;
                obs.top.position.x = obs.x;
                obs.bottom.position.x = obs.x;
                
                // Collision
                const birdRadius = 0.6;
                const pipeRadius = 1.1;
                
                if (Math.abs(obs.x - this.bird.position.x) < (birdRadius + pipeRadius)) {
                    if (this.bird.position.y > (obs.top.position.y - 10) || 
                        this.bird.position.y < (obs.bottom.position.y + 10)) {
                        this.gameOver();
                    }
                }
                
                // Score
                if (!obs.passed && obs.x < this.bird.position.x) {
                    obs.passed = true;
                    this.score++;
                    audio.score();
                    this.updateHUD();
                }
                
                // Remove & Respawn
                if (obs.x < -15) {
                    this.scene.remove(obs.top, obs.bottom);
                    this.obstacles.splice(i, 1);
                    // Find max X
                    let maxX = -100;
                    this.obstacles.forEach(o => { if(o.x > maxX) maxX = o.x; });
                    this.spawnObstacle(Math.max(15, maxX + 10));
                }
            }
            
            // Coins
            for (let i = this.coinObjects.length - 1; i >= 0; i--) {
                const coin = this.coinObjects[i];
                coin.position.x -= this.speed * dt;
                coin.rotation.z += 5 * dt;
                
                if (coin.position.distanceTo(this.bird.position) < 1.5) {
                    this.scene.remove(coin);
                    this.coinObjects.splice(i, 1);
                    this.coins++;
                    audio.coin();
                    this.updateHUD();
                    this.spawnParticles(coin.position, 5, 0xfbbf24);
                } else if (coin.position.x < -15) {
                    this.scene.remove(coin);
                    this.coinObjects.splice(i, 1);
                }
            }
        } else if (this.bird && this.bird.position.y > -7.5) {
            // Death fall
            this.birdVelocity += this.gravity * dt;
            this.bird.position.y += this.birdVelocity * dt;
            this.bird.rotation.z -= 5 * dt;
        }
        
        // Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.position.addScaledVector(p.velocity, dt);
            p.life -= dt * 2;
            p.scale.setScalar(p.life);
            if (p.life <= 0) {
                this.scene.remove(p);
                this.particles.splice(i, 1);
            }
        }
        
        // Clouds
        this.clouds.forEach(c => {
            c.position.x -= 2 * dt;
            if(c.position.x < -40) c.position.x = 40;
        });

        this.renderer.render(this.scene, this.camera);
    }
}
