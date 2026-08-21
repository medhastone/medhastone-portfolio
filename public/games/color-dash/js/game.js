// Three.js game engine logic
export const COLORS = [0xff007f, 0x00f0ff, 0xffff00, 0x00ff00]; // Pink, Cyan, Yellow, Green
export const COLOR_HEX_STRINGS = ['#ff007f', '#00f0ff', '#ffff00', '#00ff00'];

export class ColorDashGame {
    constructor(container, uiCallbacks) {
        this.container = container;
        this.ui = uiCallbacks;
        
        // Setup Three.js Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x050510, 0.012);
        
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 150);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x050510);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance
        this.container.appendChild(this.renderer.domElement);
        
        // Game State Constants
        this.laneWidth = 3.5;
        this.lanes = [-this.laneWidth, 0, this.laneWidth];
        this.gravity = -60;
        this.baseSpeed = 30;
        
        // Variables
        this.objects = []; // obstacles, gates, gems
        this.particles = [];
        this.initWorld();
        this.resetState();
        
        // Bind resize
        window.addEventListener('resize', () => this.onResize());
    }
    
    resetState() {
        this.speed = this.baseSpeed;
        this.currentLane = 1; // Middle
        this.targetX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        
        this.score = 0;
        this.gems = 0;
        this.isPlaying = false;
        this.isDead = false;
        
        this.lastSpawnZ = 0;
        
        // Clear old objects
        this.objects.forEach(obj => this.scene.remove(obj.mesh));
        this.objects = [];
        this.particles.forEach(p => this.scene.remove(p.mesh));
        this.particles = [];
        
        // Reset player
        if(this.player) {
            this.player.position.set(0, 0.5, 0);
            this.setPlayerColor(Math.floor(Math.random() * COLORS.length));
        }
        
        this.camera.position.set(0, 5, 10);
    }
    
    initWorld() {
        // Lights
        const ambient = new THREE.AmbientLight(0x222233);
        this.scene.add(ambient);
        
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(10, 20, 10);
        this.scene.add(dirLight);
        
        // Endless Grid Floor
        this.grid = new THREE.GridHelper(400, 100, 0x00f0ff, 0x111122);
        this.grid.position.y = 0;
        this.scene.add(this.grid);
        
        // Player Sphere
        const geo = new THREE.SphereGeometry(0.6, 32, 32);
        this.playerColorIdx = 0;
        this.playerMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: COLORS[this.playerColorIdx],
            emissiveIntensity: 1,
            roughness: 0.2,
            metalness: 0.8
        });
        this.player = new THREE.Mesh(geo, this.playerMat);
        this.scene.add(this.player);
        
        // Dynamic Player Light
        this.playerLight = new THREE.PointLight(COLORS[this.playerColorIdx], 2, 15);
        this.player.add(this.playerLight);
        
        // Speed lines effect
        this.speedLinesGroup = new THREE.Group();
        const lineGeo = new THREE.CylinderGeometry(0.02, 0.02, 30);
        const lineMat = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.15});
        this.speedLines = [];
        for(let i = 0; i < 60; i++) {
            const mesh = new THREE.Mesh(lineGeo, lineMat);
            // Randomly position around the track perimeter
            mesh.position.set((Math.random() - 0.5) * 60, Math.random() * 30, (Math.random() - 0.5) * 150);
            mesh.rotation.x = Math.PI / 2; // Point along Z axis
            this.speedLinesGroup.add(mesh);
            this.speedLines.push(mesh);
        }
        this.scene.add(this.speedLinesGroup);
    }
    
    setPlayerColor(idx) {
        this.playerColorIdx = idx;
        this.playerMat.emissive.setHex(COLORS[idx]);
        this.playerLight.color.setHex(COLORS[idx]);
        this.ui.onColorChange(COLOR_HEX_STRINGS[idx]);
    }
    
    setSkin(skinData) {
        this.skin = skinData;
    }
    
    start() {
        this.resetState();
        this.isPlaying = true;
        this.lastTime = performance.now();
        this.animate();
    }
    
    // Controls
    moveLeft() {
        if (!this.isPlaying || this.isDead) return;
        if (this.currentLane > 0) {
            this.currentLane--;
            this.targetX = this.lanes[this.currentLane];
            this.ui.onMove();
        }
    }
    
    moveRight() {
        if (!this.isPlaying || this.isDead) return;
        if (this.currentLane < 2) {
            this.currentLane++;
            this.targetX = this.lanes[this.currentLane];
            this.ui.onMove();
        }
    }
    
    jump() {
        if (!this.isPlaying || this.isDead) return;
        if (!this.isJumping) {
            this.velocityY = 18; // Jump strength
            this.isJumping = true;
            this.ui.onJump();
        }
    }
    
    // Procedural Generation
    spawnGate(z, colorIdx) {
        const geo = new THREE.PlaneGeometry(15, 10);
        const mat = new THREE.MeshBasicMaterial({
            color: COLORS[colorIdx],
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(0, 5, z);
        this.scene.add(mesh);
        this.objects.push({ mesh, type: 'gate', colorIdx, passed: false });
    }
    
    spawnBarrier(x, z, colorIdx) {
        const geo = new THREE.BoxGeometry(this.laneWidth - 0.2, 3, 1);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x111111,
            emissive: COLORS[colorIdx],
            emissiveIntensity: 0.8,
            roughness: 0.1,
            metalness: 0.9,
            transparent: true,
            opacity: 0.95
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, 1.5, z);
        this.scene.add(mesh);
        this.objects.push({ mesh, type: 'barrier', colorIdx, passed: false });
    }
    
    spawnGem(x, z) {
        const geo = new THREE.OctahedronGeometry(0.5);
        const mat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x00f0ff,
            emissiveIntensity: 0.5,
            roughness: 0,
            metalness: 1
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, 1, z);
        this.scene.add(mesh);
        this.objects.push({ mesh, type: 'gem', passed: false });
    }
    
    spawnRow() {
        this.lastSpawnZ -= 30; // 30 units between obstacle rows
        const z = this.lastSpawnZ;
        
        // 15% chance for a Color Gate
        if (Math.random() < 0.15) {
            const colorIdx = Math.floor(Math.random() * COLORS.length);
            this.spawnGate(z, colorIdx);
            return;
        }
        
        // Spawn Barriers & Gems
        const laneHasBarrier = [false, false, false];
        const numBarriers = Math.floor(Math.random() * 2) + 1; // 1 or 2 barriers
        
        for(let i=0; i<numBarriers; i++) {
            let l = Math.floor(Math.random() * 3);
            laneHasBarrier[l] = true;
        }
        
        for(let i=0; i<3; i++) {
            if (laneHasBarrier[i]) {
                // Determine color. To keep it fair, we occasionally force the player's color
                let cIdx = Math.floor(Math.random() * COLORS.length);
                if (Math.random() < 0.4) cIdx = this.playerColorIdx; // 40% chance it matches player
                
                this.spawnBarrier(this.lanes[i], z, cIdx);
            } else {
                if (Math.random() < 0.6) {
                    this.spawnGem(this.lanes[i], z);
                }
            }
        }
    }
    
    spawnParticles(pos, colorHex) {
        const count = 15;
        const geo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const mat = new THREE.MeshBasicMaterial({ color: colorHex });
        
        for(let i=0; i<count; i++) {
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.copy(pos);
            // random velocity
            const vx = (Math.random() - 0.5) * 15;
            const vy = Math.random() * 15 + 5;
            const vz = (Math.random() - 0.5) * 15;
            this.scene.add(mesh);
            this.particles.push({ mesh, vx, vy, vz, life: 1.0 });
        }
    }
    
    spawnTrailParticle() {
        const geo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        
        let colorHex;
        if (!this.skin || this.skin.trail === 'dynamic') {
            colorHex = COLORS[this.playerColorIdx];
        } else if (this.skin.trail === 'rainbow') {
            const hue = (performance.now() / 1000) % 1;
            colorHex = new THREE.Color().setHSL(hue, 1, 0.5).getHex();
        } else {
            colorHex = new THREE.Color(this.skin.trail).getHex();
        }

        const mat = new THREE.MeshBasicMaterial({ color: colorHex });
        const mesh = new THREE.Mesh(geo, mat);
        
        // Spawn slightly behind player
        mesh.position.copy(this.player.position);
        mesh.position.z += 0.5;
        mesh.position.y -= 0.3;
        
        const vx = (Math.random() - 0.5) * 2;
        const vy = (Math.random() - 0.5) * 2;
        const vz = Math.random() * 2 + 1;
        this.scene.add(mesh);
        this.particles.push({ mesh, vx, vy, vz, life: 0.6 });
    }
    
    updateParticles(dt) {
        for(let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.mesh.position.x += p.vx * dt;
            p.mesh.position.y += p.vy * dt;
            p.mesh.position.z += p.vz * dt;
            p.vy += this.gravity * dt * 0.5; // gravity
            p.life -= dt * 2;
            
            p.mesh.scale.setScalar(Math.max(0, p.life));
            
            if(p.life <= 0) {
                this.scene.remove(p.mesh);
                this.particles.splice(i, 1);
            }
        }
    }
    
    checkCollisions() {
        const pRadius = 0.6;
        for(let i = this.objects.length - 1; i >= 0; i--) {
            const obj = this.objects[i];
            
            // Cleanup objects passed behind camera
            if (obj.mesh.position.z > this.player.position.z + 15) {
                this.scene.remove(obj.mesh);
                this.objects.splice(i, 1);
                continue;
            }
            
            // Gems rotate
            if(obj.type === 'gem') {
                obj.mesh.rotation.y += 0.05;
                obj.mesh.rotation.x += 0.02;
            }
            
            // Collision detection (AABB / Distance)
            const dx = this.player.position.x - obj.mesh.position.x;
            const dy = this.player.position.y - obj.mesh.position.y;
            const dz = this.player.position.z - obj.mesh.position.z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            
            if (dist < 1.8) {
                if (obj.type === 'gem' && !obj.passed) {
                    obj.passed = true;
                    this.gems++;
                    this.score += 10;
                    this.ui.onGem();
                    this.spawnParticles(obj.mesh.position, 0x00f0ff);
                    this.scene.remove(obj.mesh);
                    this.objects.splice(i, 1);
                } 
                else if (obj.type === 'gate' && !obj.passed) {
                    obj.passed = true;
                    this.setPlayerColor(obj.colorIdx);
                    this.ui.onGatePass();
                    this.spawnParticles(obj.mesh.position, COLORS[obj.colorIdx]);
                } 
                else if (obj.type === 'barrier' && !obj.passed) {
                    if (obj.colorIdx !== this.playerColorIdx) {
                        // CRASH!
                        this.isDead = true;
                        this.ui.onCrash();
                        this.spawnParticles(this.player.position, 0xff0000);
                        this.player.visible = false;
                        return; // exit collision loop
                    } else {
                        // Matching Color pass!
                        obj.passed = true;
                        this.score += 50;
                        this.ui.onMatch();
                        this.spawnParticles(obj.mesh.position, COLORS[obj.colorIdx]);
                        // Fade it out or remove
                        this.scene.remove(obj.mesh);
                        this.objects.splice(i, 1);
                    }
                }
            }
        }
    }
    
    update(dt) {
        if (!this.isPlaying) return;
        
        if (!this.isDead) {
            // Forward movement
            this.player.position.z -= this.speed * dt;
            this.score += this.speed * dt * 0.2; // passive score
            
            // Gradually increase speed
            this.speed += dt * 0.5;
            
            // Smooth lateral movement and banking
            const diffX = this.targetX - this.player.position.x;
            this.player.position.x += diffX * 12 * dt;
            
            // Banking (tilt) into turns
            const targetBank = diffX * -0.5;
            this.player.rotation.z += (targetBank - this.player.rotation.z) * 10 * dt;
            
            // Jump physics
            this.player.position.y += this.velocityY * dt;
            this.velocityY += this.gravity * dt;
            if (this.player.position.y < 0.6) {
                this.player.position.y = 0.6;
                this.velocityY = 0;
                this.isJumping = false;
            }
            
            // Rotate player for rolling effect
            this.player.rotation.x -= this.speed * dt * 0.5;
            
            // Generate world
            while(this.lastSpawnZ > this.player.position.z - 200) {
                this.spawnRow();
            }
            
            // Continuous Trail
            this.trailTimer = (this.trailTimer || 0) + dt;
            if (this.trailTimer > 0.03) {
                this.trailTimer = 0;
                this.spawnTrailParticle();
            }
            
            this.checkCollisions();
        }
        
        // Camera smoothly follows player
        const targetCamZ = this.player.position.z + 10;
        const targetCamX = this.player.position.x * 0.5;
        const targetCamY = this.isDead ? this.camera.position.y : this.player.position.y + 4;
        
        this.camera.position.z += (targetCamZ - this.camera.position.z) * 10 * dt;
        this.camera.position.x += (targetCamX - this.camera.position.x) * 5 * dt;
        this.camera.position.y += (targetCamY - this.camera.position.y) * 5 * dt;
        this.camera.lookAt(this.player.position.x, this.player.position.y, this.player.position.z - 10);
        
        // Move Grid with camera to look infinite
        this.grid.position.z = this.camera.position.z - (this.camera.position.z % 10);
        
        // Update speed lines
        this.speedLinesGroup.position.z = this.camera.position.z - 50; // Follow camera
        for (let i = 0; i < this.speedLines.length; i++) {
            const line = this.speedLines[i];
            line.position.z += this.speed * dt * 2.0; // Lines move faster than player
            if (line.position.z > 50) {
                line.position.z -= 150; // Wrap around
            }
        }
        
        this.updateParticles(dt);
        
        if (!this.isDead) {
            this.ui.updateHUD(Math.floor(this.score), this.gems);
        }
    }
    
    animate() {
        if(!this.isPlaying) return;
        
        requestAnimationFrame(() => this.animate());
        
        const now = performance.now();
        let dt = (now - this.lastTime) / 1000;
        if (dt > 0.1) dt = 0.1; // cap delta time
        this.lastTime = now;
        
        this.update(dt);
        this.renderer.render(this.scene, this.camera);
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
