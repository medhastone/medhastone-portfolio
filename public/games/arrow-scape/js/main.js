import { AudioController } from './audio.js';
import { ArrowGame } from './game.js';

const LEVELS = [
    // Level 1: Interlocking Puzzle (Intro)
    [
        [{c:6, r:8}, {c:6, r:4}, {c:9, r:4}], // Top-left L (Right)
        [{c:10, r:9}, {c:10, r:4}], // Top-right I (Up)
        [{c:12, r:6}, {c:12, r:10}, {c:9, r:10}], // Bottom-right L (Left)
        [{c:8, r:10}, {c:8, r:5}] // Bottom-Left I (Up)
    ],
    // Level 2: Dog (Artistic)
    [
        [{c:6, r:10}, {c:12, r:10}], // Body (Right)
        [{c:6, r:9}, {c:6, r:7}, {c:8, r:7}, {c:8, r:9}], // Head (Down)
        [{c:9, r:8}, {c:11, r:8}], // Snout (Right)
        [{c:6, r:11}, {c:6, r:14}], // Leg 1 (Down)
        [{c:8, r:11}, {c:8, r:14}], // Leg 2 (Down)
        [{c:10, r:11}, {c:10, r:14}], // Leg 3 (Down)
        [{c:12, r:11}, {c:12, r:14}], // Leg 4 (Down)
        [{c:13, r:10}, {c:14, r:10}, {c:14, r:7}] // Tail (Up)
    ],
    // Level 3: Human Warrior
    [
        [{c:15, r:6}, {c:15, r:2}], // Sword (Up)
        [{c:11, r:8}, {c:14, r:8}, {c:14, r:5}], // Right Arm (Up)
        [{c:9, r:8}, {c:7, r:8}, {c:7, r:11}], // Left Arm (Down)
        [{c:5, r:9}, {c:5, r:13}, {c:8, r:13}], // Shield (Right)
        [{c:9, r:14}, {c:9, r:18}], // Left Leg (Down)
        [{c:11, r:14}, {c:11, r:18}], // Right Leg (Down)
        [{c:10, r:7}, {c:10, r:13}], // Torso (Down)
        [{c:9, r:7}, {c:9, r:4}, {c:11, r:4}, {c:11, r:7}] // Head (Down)
    ],
    // Level 4: Ancient Temple
    [
        [{c:12, r:9}, {c:12, r:4}], // Spire (Up)
        [{c:11, r:9}, {c:5, r:9}], // Left Roof (Left)
        [{c:13, r:9}, {c:19, r:9}], // Right Roof (Right)
        [{c:4, r:10}, {c:20, r:10}, {c:20, r:8}], // Roof Base (Up)
        [{c:6, r:17}, {c:6, r:11}], // Pillar 1 (Up)
        [{c:10, r:17}, {c:10, r:11}], // Pillar 2 (Up)
        [{c:14, r:17}, {c:14, r:11}], // Pillar 3 (Up)
        [{c:18, r:17}, {c:18, r:11}], // Pillar 4 (Up)
        [{c:3, r:18}, {c:21, r:18}], // Base (Right)
        [{c:11, r:17}, {c:11, r:14}, {c:13, r:14}, {c:13, r:17}] // Arch (Down)
    ]
];

class MainController {
    constructor() {
        this.audio = new AudioController();
        this.currentLevel = 0;
        this.isWin = false;
        
        this.initUI();
        
        this.game = new ArrowGame(
            document.getElementById('game-canvas'),
            {
                onMove: () => this.handleMove(),
                onError: () => this.handleError(),
                onWin: () => this.handleWin()
            }
        );
        
        this.bindEvents();
    }

    initUI() {
        this.dom = {
            screens: document.querySelectorAll('.screen'),
            levelTitle: document.getElementById('level-title'),
            hearts: document.getElementById('hearts-container'),
            modal: document.getElementById('modal-overlay'),
            modalTitle: document.getElementById('modal-title'),
            btnNext: document.getElementById('btn-next'),
            btnRetry: document.getElementById('btn-retry')
        };
        // We disabled heart deduction, so hide the UI
        if(this.dom.hearts) this.dom.hearts.style.display = 'none';
    }

    switchScreen(id) {
        this.dom.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        if (id === 'screen-game') this.game.resize();
    }

    startGame() {
        this.audio.init();
        this.switchScreen('screen-game');
        this.loadLevel(0);
    }

    loadLevel(index) {
        this.currentLevel = index;
        this.isWin = false;
        this.dom.modal.classList.add('hidden');
        
        let levelData;
        if (index < LEVELS.length) {
            levelData = LEVELS[index];
            this.dom.levelTitle.innerText = `ART LEVEL ${this.currentLevel + 1}`;
        } else {
            levelData = this.generateLevel(index, 1000 + index);
            this.dom.levelTitle.innerText = `LEVEL ${this.currentLevel + 1}`;
        }
        
        this.game.loadLevel(levelData);
    }
    
    generateLevel(levelIndex, seed) {
        // Deterministic Pseudo-Random Number Generator based on Seed
        let s = seed;
        const random = () => {
            let t = s += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
        
        // Scale difficulty with level index
        const numArrows = Math.min(150, 10 + Math.floor(levelIndex * 2.5));
        const maxLen = Math.min(10, 3 + Math.floor(levelIndex / 5));
        
        const arrows = [];
        const grid = new Set();
        const has = (c, r) => grid.has(`${c},${r}`);
        const add = (c, r) => grid.add(`${c},${r}`);
        
        // Reverse-Generation Logic to Guarantee 100% Solvability!
        for (let i = 0; i < numArrows; i++) {
            for (let attempts = 0; attempts < 500; attempts++) {
                let c = Math.floor(random() * 24) - 12;
                let r = Math.floor(random() * 24) - 12;
                
                // Cluster around existing arrows for a tangled layout
                if (arrows.length > 0 && random() > 0.1) {
                    const targetArr = arrows[Math.floor(random() * arrows.length)];
                    const targetPt = targetArr[Math.floor(random() * targetArr.length)];
                    c = targetPt.c + Math.floor(random() * 7) - 3;
                    r = targetPt.r + Math.floor(random() * 7) - 3;
                }
                
                if (has(c, r)) continue; // Head must be placed on empty space
                
                const dirs = [{c:0, r:-1}, {c:0, r:1}, {c:-1, r:0}, {c:1, r:0}];
                const escDir = dirs[Math.floor(random() * dirs.length)];
                
                // 1. Raycast forward. The escape path from this head MUST be totally clear of any previously placed arrows.
                let clear = true;
                let tc = c, tr = r;
                for (let step = 0; step < 50; step++) {
                    tc += escDir.c;
                    tr += escDir.r;
                    if (has(tc, tr)) { clear = false; break; }
                }
                if (!clear) continue;
                
                // 2. Build the snake body backwards
                const tempCells = [{c, r}];
                let bc = c, br = r;
                let backDir = {c: -escDir.c, r: -escDir.r};
                let len = 2 + Math.floor(random() * (maxLen - 1));
                
                for (let step = 1; step < len; step++) {
                    if (random() > 0.3) { // 70% chance to turn to make interlocking knots
                        if (backDir.c !== 0) {
                            backDir = {c: 0, r: random() > 0.5 ? 1 : -1};
                        } else {
                            backDir = {c: random() > 0.5 ? 1 : -1, r: 0};
                        }
                    }
                    
                    bc += backDir.c;
                    br += backDir.r;
                    
                    // Body must not overlap existing arrows or itself
                    if (has(bc, br)) break;
                    if (tempCells.some(pt => pt.c === bc && pt.r === br)) break;
                    
                    tempCells.push({c: bc, r: br});
                }
                
                if (tempCells.length >= 2) {
                    tempCells.reverse(); // Standardize array from Tail -> Head
                    
                    // Collapse straight lines to simplify coordinates
                    let collapsed = [tempCells[0]];
                    for (let k = 1; k < tempCells.length - 1; k++) {
                        let prev = collapsed[collapsed.length-1];
                        let curr = tempCells[k];
                        let next = tempCells[k+1];
                        let d1c = Math.sign(curr.c - prev.c), d1r = Math.sign(curr.r - prev.r);
                        let d2c = Math.sign(next.c - curr.c), d2r = Math.sign(next.r - curr.r);
                        if (d1c !== d2c || d1r !== d2r) {
                            collapsed.push(curr);
                        }
                    }
                    collapsed.push(tempCells[tempCells.length-1]);
                    
                    arrows.push(collapsed);
                    tempCells.forEach(pt => add(pt.c, pt.r));
                    break;
                }
            }
        }
        return arrows;
    }

    handleMove() {
        this.audio.playMove();
    }

    handleError() {
        if(this.isWin) return;
        this.audio.playError();
    }

    handleWin() {
        if(this.isWin) return;
        this.isWin = true;
        this.audio.playWin();
        setTimeout(() => this.showWin(), 500);
    }

    showWin() {
        this.dom.modalTitle.innerText = this.currentLevel < LEVELS.length - 1 ? "ART UNLOCKED!" : "LEVEL CLEARED!";
        this.dom.btnNext.classList.remove('hidden');
        this.dom.btnRetry.classList.add('hidden');
        this.dom.modal.classList.remove('hidden');
    }

    bindEvents() {
        document.getElementById('btn-start').addEventListener('click', () => this.startGame());
        document.getElementById('btn-back').addEventListener('click', () => this.switchScreen('screen-home'));
        document.getElementById('btn-reset').addEventListener('click', () => this.loadLevel(this.currentLevel));
        
        document.getElementById('btn-zoom-in').addEventListener('click', () => this.game.zoomIn());
        document.getElementById('btn-zoom-out').addEventListener('click', () => this.game.zoomOut());
        
        this.dom.btnNext.addEventListener('click', () => {
            this.loadLevel(this.currentLevel + 1);
        });
        
        this.dom.btnRetry.addEventListener('click', () => {
            this.loadLevel(this.currentLevel);
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new MainController();
});
