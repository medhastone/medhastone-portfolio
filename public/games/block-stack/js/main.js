import { GameEngine } from './Engine.js';
import { getRandomShapes, COLORS } from './shapes.js';
import { AudioController } from './audio.js';

class GameController {
    constructor() {
        this.engine = new GameEngine();
        this.audio = new AudioController();
        this.shapesQueue = [];
        this.draggingState = null;
        
        this.initUI();
        this.bindEvents();
        
        // Setup particle canvas
        this.canvas = document.getElementById('fx-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animateParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initUI() {
        this.dom = {
            screens: document.querySelectorAll('.screen'),
            score: document.getElementById('score'),
            gameBest: document.getElementById('game-best-score'),
            homeBest: document.getElementById('home-best-score'),
            comboDisplay: document.getElementById('combo-display'),
            grid: document.getElementById('grid-board'),
            slots: [
                document.getElementById('slot-0'),
                document.getElementById('slot-1'),
                document.getElementById('slot-2')
            ],
            finalScore: document.getElementById('final-score')
        };

        // Create Grid Cells
        this.dom.grid.innerHTML = '';
        for(let r=0; r<8; r++) {
            for(let c=0; c<8; c++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.r = r;
                cell.dataset.c = c;
                this.dom.grid.appendChild(cell);
            }
        }
        
        this.updateScores();
    }

    bindEvents() {
        document.getElementById('btn-play').addEventListener('click', () => {
            this.audio.playClick();
            this.startGame();
        });
        
        document.getElementById('btn-restart').addEventListener('click', () => {
            this.audio.playClick();
            this.startGame();
        });
        
        document.getElementById('btn-home').addEventListener('click', () => {
            this.audio.playClick();
            this.switchScreen('screen-home');
        });

        // Initialize Audio Context on first interaction
        const initAudio = () => { this.audio.init(); };
        window.addEventListener('pointerdown', initAudio, { once: true });
        
        // Pointer events for Drag and Drop
        window.addEventListener('pointermove', (e) => this.onDragMove(e), {passive: false});
        window.addEventListener('pointerup', (e) => this.onDragEnd(e));
    }

    switchScreen(id) {
        this.dom.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        this.updateScores();
    }

    updateScores() {
        if(this.dom.score.innerText !== String(this.engine.score)) {
            this.dom.score.style.transform = 'scale(1.3)';
            this.dom.score.style.transition = 'transform 0.1s';
            setTimeout(() => {
                this.dom.score.style.transform = 'scale(1)';
            }, 150);
        }
        this.dom.score.innerText = this.engine.score;
        this.dom.gameBest.innerText = this.engine.bestScore;
        this.dom.homeBest.innerText = this.engine.bestScore;
        this.dom.finalScore.innerText = this.engine.score;
    }

    startGame() {
        this.engine.reset();
        this.renderBoard();
        this.refillQueue();
        this.switchScreen('screen-game');
    }

    renderBoard() {
        const cells = this.dom.grid.children;
        for(let r=0; r<8; r++) {
            for(let c=0; c<8; c++) {
                const idx = r * 8 + c;
                const cell = cells[idx];
                const color = this.engine.grid[r][c];
                
                cell.className = 'grid-cell' + (color ? ' filled' : '');
                cell.style.backgroundColor = color || '';
            }
        }
        this.updateScores();
    }

    refillQueue() {
        this.shapesQueue = getRandomShapes(3);
        this.renderTray();
        this.checkGameOver();
    }

    renderTray() {
        for(let i=0; i<3; i++) {
            const slot = this.dom.slots[i];
            slot.innerHTML = '';
            
            const shape = this.shapesQueue[i];
            if(shape) {
                const blockDOM = this.createBlockDOM(shape);
                blockDOM.dataset.index = i;
                
                // Add pointer down event
                blockDOM.addEventListener('pointerdown', (e) => this.onDragStart(e, blockDOM, i, shape));
                slot.appendChild(blockDOM);
            }
        }
    }

    createBlockDOM(shape, isDragging = false) {
        const wrapper = document.createElement('div');
        wrapper.className = 'block-shape';
        wrapper.style.gridTemplateColumns = `repeat(${shape.matrix[0].length}, 1fr)`;
        wrapper.style.gridTemplateRows = `repeat(${shape.matrix.length}, 1fr)`;
        
        // Use a smaller size for the tray, but actual board cell size when dragging
        const cellSize = isDragging ? 'min(10vw, 42px)' : 'min(4vw, 18px)';
        const gap = isDragging ? 'var(--board-gap)' : '2px';
        wrapper.style.gap = gap;

        const color = COLORS[shape.colorIdx];

        for(let r=0; r<shape.matrix.length; r++) {
            for(let c=0; c<shape.matrix[r].length; c++) {
                const cell = document.createElement('div');
                if(shape.matrix[r][c] === 1) {
                    cell.className = 'block-cell';
                    cell.style.width = cellSize;
                    cell.style.height = cellSize;
                    cell.style.backgroundColor = color;
                } else {
                    cell.style.width = cellSize;
                    cell.style.height = cellSize;
                }
                wrapper.appendChild(cell);
            }
        }
        return wrapper;
    }

    onDragStart(e, blockEl, index, shape) {
        e.preventDefault();
        this.audio.playGrab();
        
        // Hide original
        blockEl.style.opacity = '0';
        
        // Create dragging clone
        const clone = this.createBlockDOM(shape, true);
        clone.classList.add('dragging');
        document.body.appendChild(clone);
        
        // Calculate offset (we want the block to appear slightly above the finger so it's not hidden)
        // Adjust for touch devices where finger obscures screen
        const touchOffset = -60; 
        
        this.draggingState = {
            clone,
            original: blockEl,
            shape,
            index,
            offsetX: clone.offsetWidth / 2,
            offsetY: (clone.offsetHeight / 2) - touchOffset,
            lastValidRow: -1,
            lastValidCol: -1
        };
        
        this.updateDragPosition(e.clientX, e.clientY);
    }

    updateDragPosition(x, y) {
        if(!this.draggingState) return;
        const { clone, offsetX, offsetY } = this.draggingState;
        
        // Position center of clone slightly above cursor
        clone.style.left = `${x - offsetX}px`;
        clone.style.top = `${y - offsetY}px`;
    }

    onDragMove(e) {
        if(!this.draggingState) return;
        e.preventDefault();
        
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        this.updateDragPosition(clientX, clientY);
        
        // Calculate grid position
        this.clearHighlights();
        
        const boardRect = this.dom.grid.getBoundingClientRect();
        const cloneRect = this.draggingState.clone.getBoundingClientRect();
        
        // We use the center of the top-left solid cell of the shape for alignment
        // To simplify, we align the bounding box of the dragged shape to the grid
        
        // Approximate cell size
        const cellSize = boardRect.width / 8;
        
        const boardPadding = 8;
        const relX = cloneRect.left - (boardRect.left + boardPadding);
        const relY = cloneRect.top - (boardRect.top + boardPadding);
        
        // Use rounding to snap, offset by half a gap for forgiveness
        const col = Math.round(relX / cellSize);
        const row = Math.round(relY / cellSize);
        
        this.draggingState.lastValidRow = -1;
        this.draggingState.lastValidCol = -1;

        // If shape is roughly over the board
        if(row >= -2 && row <= 8 && col >= -2 && col <= 8) {
            const canPlace = this.engine.canPlace(this.draggingState.shape.matrix, row, col);
            this.highlightGrid(this.draggingState.shape.matrix, row, col, canPlace);
            if(canPlace) {
                this.draggingState.lastValidRow = row;
                this.draggingState.lastValidCol = col;
            }
        }
    }

    highlightGrid(matrix, startR, startC, isValid) {
        const cells = this.dom.grid.children;
        for(let r=0; r<matrix.length; r++) {
            for(let c=0; c<matrix[r].length; c++) {
                if(matrix[r][c] === 1) {
                    const br = startR + r;
                    const bc = startC + c;
                    if(br >= 0 && br < 8 && bc >= 0 && bc < 8) {
                        const idx = br * 8 + bc;
                        cells[idx].classList.add(isValid ? 'highlight' : 'highlight-error');
                    }
                }
            }
        }
    }

    clearHighlights() {
        const cells = this.dom.grid.children;
        for(let i=0; i<cells.length; i++) {
            cells[i].classList.remove('highlight', 'highlight-error');
        }
    }

    onDragEnd(e) {
        if(!this.draggingState) return;
        
        const { clone, original, shape, index, lastValidRow, lastValidCol } = this.draggingState;
        
        // Cleanup DOM
        clone.remove();
        this.clearHighlights();
        
        if(lastValidRow !== -1 && lastValidCol !== -1) {
            // Valid Placement
            this.audio.playDrop();
            const result = this.engine.place(shape, lastValidRow, lastValidCol);
            
            // Remove from queue
            this.shapesQueue[index] = null;
            original.remove(); // Remove from tray
            
            this.renderBoard();
            
            if(result.clearedCells.length > 0) {
                this.handleClears(result);
            }
            
            // Check if queue empty
            if(this.shapesQueue.every(s => s === null)) {
                this.refillQueue();
            } else {
                this.checkGameOver();
            }
            
        } else {
            // Invalid - snap back
            this.audio.playInvalid();
            original.style.opacity = '1';
        }
        
        this.draggingState = null;
    }

    handleClears(result) {
        this.audio.playClear(result.combo);
        
        if(result.combo > 1) {
            this.showComboPopup(result.combo);
        }

        // Add clear animation classes and particles
        const boardRect = this.dom.grid.getBoundingClientRect();
        const cellSize = boardRect.width / 8;

        result.clearedCells.forEach(({r, c}) => {
            const idx = r * 8 + c;
            const cell = this.dom.grid.children[idx];
            
            // Clone color before it gets cleared
            const color = cell.style.backgroundColor;
            
            cell.classList.add('clearing');
            setTimeout(() => {
                cell.classList.remove('clearing');
            }, 400);

            // Particles
            const cx = boardRect.left + (c * cellSize) + (cellSize/2);
            const cy = boardRect.top + (r * cellSize) + (cellSize/2);
            this.spawnParticles(cx, cy, color, 5 + result.combo * 2);
        });

        // Board pulse
        this.dom.grid.style.transform = 'scale(1.02)';
        setTimeout(() => this.dom.grid.style.transform = 'none', 150);
        
        setTimeout(() => this.renderBoard(), 400);
    }

    showComboPopup(combo) {
        this.dom.comboDisplay.innerText = `COMBO x${combo}`;
        this.dom.comboDisplay.classList.add('show');
        setTimeout(() => {
            this.dom.comboDisplay.classList.remove('show');
        }, 1500);
    }

    checkGameOver() {
        const available = this.shapesQueue.filter(s => s !== null);
        if(this.engine.checkGameOver(available)) {
            setTimeout(() => {
                this.audio.playGameOver();
                this.switchScreen('screen-gameover');
            }, 500);
        }
    }

    // --- Particle System ---
    spawnParticles(x, y, color, count) {
        for(let i=0; i<count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: Math.random() * 0.03 + 0.015,
                color: color || '#fff',
                size: Math.random() * 6 + 2
            });
        }
    }

    animateParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for(let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            
            if(p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            this.ctx.fill();
        }
        
        requestAnimationFrame(() => this.animateParticles());
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new GameController();
});
