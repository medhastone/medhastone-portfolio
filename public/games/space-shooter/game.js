function safeGetItem(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
function safeSetItem(k, v) { try { localStorage.setItem(k, v); } catch(e) {} }
/**
 * NEON VOID - Premium 3D Space Shooter Engine
 * Uses Three.js for rendering, vanilla JS for logic.
 */

// --- UTILS & CONSTANTS ---
const MathUtils = THREE.MathUtils;
const GAME_Z = 0;
const CAMERA_Z = 60;
const BOUNDS = { x: 45, y: 35 };

const COLORS = {
    player: 0x00f0ff,
    enemyScout: 0xff0055,
    enemyTank: 0xff8800,
    boss: 0xbd00ff,
    laser: 0x00ff88,
    enemyLaser: 0xff0055,
    bgStar: 0xffffff
};

// --- GAME STATE ---
const STATE = {
    MENU: 0,
    GARAGE: 1,
    PLAYING: 2,
    GAMEOVER: 3
};

let gameState = STATE.MENU;
let score = 0;
let highScore = safeGetItem('neonVoidBest') || 0;
let energy = safeGetItem('neonVoidEnergy') || 0;
let combo = 1;
let comboTimer = 0;
let kills = 0;
let startTime = 0;

// --- ENGINE SETUP ---
const canvas = document.getElementById('game-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x030308);
scene.fog = new THREE.FogExp2(0x030308, 0.015);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, -20, CAMERA_Z);
camera.lookAt(0, 10, 0);

// Lighting
const hemiLight = new THREE.HemisphereLight(0x222244, 0x050510, 1.5);
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight(0xffeedd, 2.0);
dirLight.position.set(20, 50, 50);
scene.add(dirLight);

// Audio Engine (Web Audio API)
let audioCtx=null;try{audioCtx = new (window.AudioContext || window.webkitAudioContext)();}catch(e){}
const playSound = (type) => {
    if (!audioCtx) return;
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    
    switch(type) {
        case 'shoot':
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now); osc.stop(now + 0.1);
            break;
        case 'hit':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now); osc.stop(now + 0.2);
            break;
        case 'explosion':
            osc.type = 'square';
            osc.frequency.setValueAtTime(100, now);
            osc.frequency.exponentialRampToValueAtTime(10, now + 0.4);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.start(now); osc.stop(now + 0.4);
            break;
        case 'combo':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400 + (combo * 50), now);
            osc.frequency.exponentialRampToValueAtTime(800 + (combo * 50), now + 0.2);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now); osc.stop(now + 0.2);
            break;
    }
};

// --- ENVIRONMENT (Realistic Space) ---
// 1. Nebula Clouds
function createGlowTexture(colorStr, innerA, outerA) {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, colorStr.replace('A', innerA));
    grad.addColorStop(1, colorStr.replace('A', outerA));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
}

const texNebulaBlue = createGlowTexture('rgba(0, 150, 255, A)', 0.15, 0);
const texNebulaPurple = createGlowTexture('rgba(150, 0, 255, A)', 0.1, 0);

const nebulaGroup = new THREE.Group();
for(let i=0; i<15; i++) {
    const isBlue = Math.random() > 0.5;
    const mat = new THREE.SpriteMaterial({ 
        map: isBlue ? texNebulaBlue : texNebulaPurple,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true
    });
    const sprite = new THREE.Sprite(mat);
    const size = Math.random() * 150 + 100;
    sprite.scale.set(size, size, 1);
    sprite.position.set(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        -150 + (Math.random() * 50)
    );
    nebulaGroup.add(sprite);
}
scene.add(nebulaGroup);

// 2. Parallax Starfields
function createStarfield(count, size, color, zPos) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for(let i = 0; i < count * 3; i+=3) {
        pos[i] = (Math.random() - 0.5) * 300;
        pos[i+1] = (Math.random() - 0.5) * 300;
        pos[i+2] = zPos + (Math.random() * 50);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ size: size, color: color, transparent: true, opacity: 0.8 });
    const mesh = new THREE.Points(geo, mat);
    scene.add(mesh);
    return mesh;
}

const starsFar = createStarfield(1000, 0.4, 0x555588, -200);
const starsMid = createStarfield(500, 0.8, 0x88ccff, -100);
const starsNear = createStarfield(200, 1.2, 0xffffff, -50);

// --- ENTITIES & POOLING ---
const entities = {
    player: null,
    projectiles: [],
    enemies: [],
    particles: []
};

// Materials
const texLaser = createGlowTexture('rgba(0, 255, 136, A)', 1.0, 0.0);
const matLaser = new THREE.MeshBasicMaterial({ color: COLORS.laser, blending: THREE.AdditiveBlending });
const matEnemyLaser = new THREE.MeshBasicMaterial({ color: COLORS.enemyLaser, blending: THREE.AdditiveBlending });
const matParticle = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending });

// Geometries & Ship Generators
const geoLaser = new THREE.CylinderGeometry(0.2, 0.2, 3, 8);
const geoParticle = new THREE.BoxGeometry(0.5, 0.5, 0.5);

function createFighterJet(isPlayer = true) {
    const group = new THREE.Group();
    const mainColor = isPlayer ? 0xcccccc : 0x222222;
    const accentColor = isPlayer ? COLORS.player : COLORS.enemyScout;
    
    const matBody = new THREE.MeshStandardMaterial({ color: mainColor, metalness: 0.8, roughness: 0.2 });
    const matGlass = new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness: 0.9, roughness: 0.1 });
    const matGlow = new THREE.MeshBasicMaterial({ color: accentColor });
    
    // Core Fuselage
    const fuselageGeo = new THREE.CylinderGeometry(0.6, 1.2, 6, 8);
    const fuselage = new THREE.Mesh(fuselageGeo, matBody);
    group.add(fuselage);
    
    // Nose
    const noseGeo = new THREE.ConeGeometry(0.6, 2.5, 8);
    const nose = new THREE.Mesh(noseGeo, matBody);
    nose.position.y = 4.25;
    group.add(nose);
    
    // Wings (Swept back)
    const wingGeo = new THREE.BoxGeometry(7, 2.5, 0.3);
    const wingPositions = wingGeo.attributes.position.array;
    for(let i=0; i<wingPositions.length; i+=3) {
        if(Math.abs(wingPositions[i]) > 1) { // Outer edges
            wingPositions[i+1] -= 2; // Pull y down/back
        }
    }
    wingGeo.computeVertexNormals();
    const wings = new THREE.Mesh(wingGeo, matBody);
    wings.position.y = -1;
    group.add(wings);
    
    // Cockpit Canopy
    const cockpitGeo = new THREE.CylinderGeometry(0.5, 1.5, 4, 8);
    const cockpit = new THREE.Mesh(cockpitGeo, matGlass);
    cockpit.scale.set(1, 1, 0.6);
    cockpit.position.set(0, 1, 0.5);
    group.add(cockpit);
    
    // Engine Thrusters
    const engineGeo = new THREE.CylinderGeometry(0.7, 0.5, 1, 8);
    const engineL = new THREE.Mesh(engineGeo, matBody);
    engineL.position.set(-1.2, -3, 0);
    const engineR = new THREE.Mesh(engineGeo, matBody);
    engineR.position.set(1.2, -3, 0);
    group.add(engineL, engineR);
    
    // Thruster Glows
    const glowGeo = new THREE.CylinderGeometry(0.4, 0.1, 2, 8);
    const glowL = new THREE.Mesh(glowGeo, matGlow);
    glowL.position.set(-1.2, -4, 0);
    const glowR = new THREE.Mesh(glowGeo, matGlow);
    glowR.position.set(1.2, -4, 0);
    group.add(glowL, glowR);
    
    group.scale.set(0.6, 0.6, 0.6);
    return group;
}

function createTankUFO() {
    const group = new THREE.Group();
    const matDark = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9, roughness: 0.4 });
    const matGlow = new THREE.MeshBasicMaterial({ color: COLORS.enemyTank });
    
    const coreGeo = new THREE.SphereGeometry(1.5, 16, 16);
    const core = new THREE.Mesh(coreGeo, matDark);
    core.scale.z = 0.5;
    group.add(core);
    
    const ringGeo = new THREE.TorusGeometry(2.5, 0.5, 8, 24);
    const ring = new THREE.Mesh(ringGeo, matDark);
    group.add(ring);
    
    const glowGeo = new THREE.SphereGeometry(1.6, 16, 16);
    const glow = new THREE.Mesh(glowGeo, matGlow);
    glow.scale.set(1, 0.2, 1);
    group.add(glow);
    
    return group;
}

class Player {
    constructor() {
        this.mesh = createFighterJet(true);
        scene.add(this.mesh);
        
        // Dynamic Lighting
        const glow = new THREE.PointLight(COLORS.player, 2, 20);
        glow.position.set(0, -3, 2);
        this.mesh.add(glow);
        this.reset();

        this.reset();
    }
    
    reset() {
        this.mesh.position.set(0, -20, GAME_Z);
        this.mesh.rotation.set(0, 0, 0);
        this.target = new THREE.Vector3(0, -10, GAME_Z);
        this.hp = 100;
        this.fireRate = 0.12; // seconds
        this.fireTimer = 0;
    }
    
    update(dt) {
        // Smooth movement (lerp)
        this.mesh.position.lerp(this.target, dt * 8);
        
        // Clamp to screen bounds
        this.mesh.position.x = MathUtils.clamp(this.mesh.position.x, -BOUNDS.x/2, BOUNDS.x/2);
        this.mesh.position.y = MathUtils.clamp(this.mesh.position.y, -BOUNDS.y/2 + 5, BOUNDS.y/2 - 5);
        
        // Dynamic banking/tilting based on movement
        const deltaX = this.target.x - this.mesh.position.x;
        // Tilting (Z rotation) for banking left/right
        this.mesh.rotation.y = MathUtils.lerp(this.mesh.rotation.y, -deltaX * 0.08, dt * 10);
        // Slight pitch down when moving forward
        this.mesh.rotation.x = MathUtils.lerp(this.mesh.rotation.x, (this.target.y - this.mesh.position.y) * 0.05, dt * 10);
        
        // Auto-fire
        this.fireTimer -= dt;
        if (this.fireTimer <= 0 && gameState === STATE.PLAYING) {
            this.shoot();
            this.fireTimer = this.fireRate;
        }
    }
    
    shoot() {
        playSound('shoot');
        // Twin Lasers
        const createLaser = (offsetX) => {
            const proj = new THREE.Mesh(geoLaser, matLaser);
            proj.position.copy(this.mesh.position);
            proj.position.x += offsetX;
            proj.position.y += 2;
            proj.velocity = new THREE.Vector3(0, 60, 0); // Fast up
            proj.isPlayer = true;
            proj.damage = 25;
            scene.add(proj);
            entities.projectiles.push(proj);
        };
        createLaser(-1);
        createLaser(1);
        
        // Slight recoil
        this.mesh.position.y -= 0.5;
    }
    
    damage(amount) {
        this.hp -= amount;
        ui.healthFill.style.width = Math.max(0, this.hp) + '%';
        createExplosion(this.mesh.position, COLORS.enemyScout, 10);
        playSound('hit');
        if (this.hp <= 0) gameOver();
    }
}

class Enemy {
    constructor(type) {
        this.type = type;
        if (type === 'tank') {
            this.mesh = createTankUFO();
            this.hp = 150;
            this.score = 50;
            this.speed = 12;
        } else {
            this.mesh = createFighterJet(false);
            this.mesh.rotation.z = Math.PI; // Face down
            this.hp = 25;
            this.score = 10;
            this.speed = 28;
        }
        
        // Spawn at top, random X
        this.mesh.position.set(
            (Math.random() - 0.5) * BOUNDS.x,
            BOUNDS.y/2 + 5,
            GAME_Z
        );
        scene.add(this.mesh);
    }
    
    update(dt) {
        this.mesh.position.y -= this.speed * dt;
        if (this.type === 'tank') {
            this.mesh.rotation.x += dt;
            this.mesh.rotation.y += dt;
        }
        
        // Remove if off screen
        if (this.mesh.position.y < -BOUNDS.y/2 - 5) {
            this.dead = true;
        }
    }
    
    damage(amount) {
        this.hp -= amount;
        // Hit flash
        this.mesh.children.forEach(c => {
            if (c.material && c.material.emissive) {
                c.material.emissiveIntensity = 2;
                setTimeout(() => { if (c) c.material.emissiveIntensity = 0.5; }, 50);
            }
        });
        
        if (this.hp <= 0) {
            this.dead = true;
            createExplosion(this.mesh.position, this.type === 'tank' ? COLORS.enemyTank : COLORS.enemyScout, 20);
            playSound('explosion');
            
            // Score & Combo
            score += this.score * combo;
            kills++;
            ui.score.innerText = score;
            
            combo++;
            comboTimer = 3.0;
            ui.comboContainer.classList.remove('hidden');
            ui.comboText.innerText = `x${combo}`;
            playSound('combo');
        }
    }
}

function createExplosion(pos, color, count) {
    for (let i = 0; i < count; i++) {
        const p = new THREE.Mesh(geoParticle, matParticle.clone());
        p.material.color.setHex(color);
        p.position.copy(pos);
        p.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        p.life = 1.0;
        scene.add(p);
        entities.particles.push(p);
    }
}

// --- LOGIC LOOP ---
let lastTime = 0;
let enemySpawnTimer = 0;

function updateLogic(dt) {
    if (gameState !== STATE.PLAYING) return;
    
    // Background scroll (Parallax Multi-layer)
    starsFar.position.y -= dt * 2;
    if (starsFar.position.y < -150) starsFar.position.y = 0;
    
    starsMid.position.y -= dt * 6;
    if (starsMid.position.y < -150) starsMid.position.y = 0;
    
    starsNear.position.y -= dt * 15;
    if (starsNear.position.y < -150) starsNear.position.y = 0;
    
    // Nebula Slow Drift
    nebulaGroup.rotation.z += dt * 0.02;
    
    // Player
    entities.player.update(dt);
    
    // Combo drain
    if (combo > 1) {
        comboTimer -= dt;
        if (comboTimer <= 0) {
            combo = 1;
            ui.comboContainer.classList.add('hidden');
        } else {
            ui.comboTimerFill.style.transform = `scaleX(${comboTimer / 3})`;
        }
    }
    
    // Spawning Enemies
    enemySpawnTimer -= dt;
    if (enemySpawnTimer <= 0) {
        const type = Math.random() > 0.8 ? 'tank' : 'scout';
        entities.enemies.push(new Enemy(type));
        // Spawn faster over time
        enemySpawnTimer = Math.max(0.5, 2.0 - (kills * 0.02)); 
    }
    
    // Update Projectiles
    for (let i = entities.projectiles.length - 1; i >= 0; i--) {
        const p = entities.projectiles[i];
        p.position.addScaledVector(p.velocity, dt);
        
        // Remove offscreen
        if (p.position.y > BOUNDS.y/2 + 10 || p.position.y < -BOUNDS.y/2 - 10) {
            scene.remove(p);
            entities.projectiles.splice(i, 1);
            continue;
        }
        
        // Collision with Enemies (if player proj)
        if (p.isPlayer) {
            for (let j = entities.enemies.length - 1; j >= 0; j--) {
                const e = entities.enemies[j];
                if (p.position.distanceTo(e.mesh.position) < 2.5) {
                    e.damage(p.damage);
                    scene.remove(p);
                    entities.projectiles.splice(i, 1);
                    createExplosion(p.position, COLORS.laser, 5);
                    break;
                }
            }
        }
    }
    
    // Update Enemies
    for (let i = entities.enemies.length - 1; i >= 0; i--) {
        const e = entities.enemies[i];
        e.update(dt);
        
        // Player Collision
        if (!e.dead && entities.player.mesh.position.distanceTo(e.mesh.position) < 3.0) {
            entities.player.damage(25);
            e.damage(1000); // Destroy enemy
        }
        
        if (e.dead) {
            scene.remove(e.mesh);
            entities.enemies.splice(i, 1);
        }
    }
    
    // Update Particles
    for (let i = entities.particles.length - 1; i >= 0; i--) {
        const p = entities.particles[i];
        p.position.addScaledVector(p.velocity, dt);
        p.rotation.x += dt * 5;
        p.rotation.y += dt * 5;
        p.life -= dt * 1.5;
        p.material.opacity = p.life;
        p.scale.setScalar(p.life);
        
        if (p.life <= 0) {
            scene.remove(p);
            p.material.dispose();
            entities.particles.splice(i, 1);
        }
    }
    
    // Dynamic Camera Tracking
    camera.position.x = MathUtils.lerp(camera.position.x, entities.player.mesh.position.x * 0.1, dt * 2);
    camera.lookAt(0, 10, 0);
}

function render() {
    renderer.render(scene, camera);
}

function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const dt = Math.min((timestamp - lastTime) / 1000, 0.1); // Cap dt to prevent massive jumps
    lastTime = timestamp;
    
    updateLogic(dt);
    render();
    
    requestAnimationFrame(animate);
}

// --- UI & STATE ---
const ui = {
    screens: {
        menu: document.getElementById('screen-menu'),
        garage: document.getElementById('screen-garage'),
        hud: document.getElementById('screen-hud'),
        gameover: document.getElementById('screen-gameover')
    },
    menuBest: document.getElementById('menu-best'),
    menuEnergy: document.getElementById('menu-energy'),
    score: document.getElementById('hud-score'),
    healthFill: document.getElementById('hud-health'),
    comboContainer: document.getElementById('combo-display'),
    comboText: document.getElementById('hud-combo'),
    comboTimerFill: document.getElementById('combo-timer'),
    goScore: document.getElementById('go-score'),
    goCombo: document.getElementById('go-combo'),
    goKills: document.getElementById('go-kills'),
    goTime: document.getElementById('go-time'),
    
    // Garage
    shipName: document.getElementById('ship-name'),
    shipDesc: document.getElementById('ship-desc'),
    statDmg: document.getElementById('stat-dmg'),
    statSpd: document.getElementById('stat-spd'),
    statFr: document.getElementById('stat-fr')
};

// Garage Data
const SHIPS = [
    { id: 'nova', name: 'NOVA', desc: 'Balanced fighter', color: 0x00f0ff, speed: 50, dmg: 50, fireRate: 50, realFr: 0.12 },
    { id: 'phantom', name: 'PHANTOM', desc: 'Fast & fragile', color: 0xbd00ff, speed: 90, dmg: 30, fireRate: 80, realFr: 0.08 },
    { id: 'titan', name: 'TITAN', desc: 'Heavy hitter', color: 0xff8800, speed: 30, dmg: 90, fireRate: 20, realFr: 0.25 }
];
let currentShipIndex = 0;

function updateGarageUI() {
    const ship = SHIPS[currentShipIndex];
    ui.shipName.innerText = ship.name;
    ui.shipName.style.color = '#' + ship.color.toString(16).padStart(6, '0');
    ui.shipDesc.innerText = ship.desc;
    
    ui.statDmg.style.width = ship.dmg + '%';
    ui.statSpd.style.width = ship.speed + '%';
    ui.statFr.style.width = ship.fireRate + '%';
    
    // Update player preview color
    if(entities.player) {
        entities.player.mesh.children.forEach(c => {
            if (c.material && c.material.color && c.geometry && c.geometry.type === 'CylinderGeometry' && c.scale.x === 1) { // Glow cylinders
               c.material.color.setHex(ship.color);
            }
        });
        // Update light
        const light = entities.player.mesh.children.find(c => c.type === 'PointLight');
        if (light) light.color.setHex(ship.color);
    }
}

function changeScreen(screenName) {
    Object.values(ui.screens).forEach(s => s.classList.remove('active'));
    ui.screens[screenName].classList.add('active');
}

function startGame() {
    if (!entities.player) entities.player = new Player();
    else entities.player.reset();
    
    // Apply selected ship stats
    const ship = SHIPS[currentShipIndex];
    entities.player.fireRate = ship.realFr;
    
    // Clear old entities
    entities.enemies.forEach(e => scene.remove(e.mesh));
    entities.enemies = [];
    entities.projectiles.forEach(p => scene.remove(p));
    entities.projectiles = [];
    
    score = 0;
    combo = 1;
    kills = 0;
    enemySpawnTimer = 1;
    startTime = Date.now();
    
    ui.score.innerText = '0';
    ui.healthFill.style.width = '100%';
    ui.comboContainer.classList.add('hidden');
    
    changeScreen('hud');
    gameState = STATE.PLAYING;
    
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}

function gameOver() {
    gameState = STATE.GAMEOVER;
    
    const timeSecs = Math.floor((Date.now() - startTime) / 1000);
    const m = Math.floor(timeSecs / 60).toString().padStart(2, '0');
    const s = (timeSecs % 60).toString().padStart(2, '0');
    
    ui.goScore.innerText = score;
    ui.goCombo.innerText = 'x' + combo;
    ui.goKills.innerText = kills;
    ui.goTime.innerText = `${m}:${s}`;
    
    if (score > highScore) {
        highScore = score;
        safeSetItem('neonVoidBest', highScore);
    }
    
    // Simulate energy gain
    energy = parseInt(energy) + Math.floor(score / 100);
    safeSetItem('neonVoidEnergy', energy);
    
    changeScreen('gameover');
}

function initMenu() {
    ui.menuBest.innerText = highScore;
    ui.menuEnergy.innerText = energy;
    changeScreen('menu');
}

// --- INPUTS ---
// Mouse / Touch targeting
const joystickHint = document.querySelector('.joystick-hint');
function setPlayerTarget(clientX, clientY) {
    if (gameState !== STATE.PLAYING) return;
    
    // Raycast from camera to Z=0 plane
    const vec = new THREE.Vector3();
    const pos = new THREE.Vector3();
    
    vec.set(
        (clientX / window.innerWidth) * 2 - 1,
        -(clientY / window.innerHeight) * 2 + 1,
        0.5 
    );
    vec.unproject(camera);
    vec.sub(camera.position).normalize();
    
    const distance = -camera.position.z / vec.z;
    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    
    // Apply an offset so the finger doesn't block the ship
    entities.player.target.set(pos.x, pos.y + 10, GAME_Z);
    
    if (joystickHint) joystickHint.style.opacity = '0';
}

window.addEventListener('mousemove', (e) => setPlayerTarget(e.clientX, e.clientY));
window.addEventListener('touchmove', (e) => setPlayerTarget(e.touches[0].clientX, e.touches[0].clientY), {passive: false});

// Buttons
document.getElementById('btn-play').addEventListener('click', startGame);
document.getElementById('btn-garage').addEventListener('click', () => {
    changeScreen('garage');
    updateGarageUI();
});
document.getElementById('btn-back-menu').addEventListener('click', initMenu);
document.getElementById('btn-restart').addEventListener('click', startGame);
document.getElementById('btn-quit').addEventListener('click', initMenu);
document.getElementById('btn-select-ship').addEventListener('click', initMenu);

document.getElementById('btn-prev-ship').addEventListener('click', () => {
    currentShipIndex = (currentShipIndex - 1 + SHIPS.length) % SHIPS.length;
    updateGarageUI();
});
document.getElementById('btn-next-ship').addEventListener('click', () => {
    currentShipIndex = (currentShipIndex + 1) % SHIPS.length;
    updateGarageUI();
});

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Boot
if (!entities.player) {
    entities.player = new Player();
    // Move it up for menu background
    entities.player.target.y = 5;
}
initMenu();
requestAnimationFrame(animate);
