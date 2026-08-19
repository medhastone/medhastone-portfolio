export class UIManager {
    constructor() {
        this.canvas = document.getElementById('swipe-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridEl = document.getElementById('letter-grid');
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    switchScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    initBoard(engine) {
        this.gridEl.innerHTML = '';
        this.gridEl.style.gridTemplateColumns = `repeat(${engine.boardSize}, 1fr)`;
        
        for (let r = 0; r < engine.boardSize; r++) {
            for (let c = 0; c < engine.boardSize; c++) {
                const cell = document.createElement('div');
                cell.className = 'letter-cell';
                cell.dataset.row = r;
                cell.dataset.col = c;
                
                const span = document.createElement('span');
                span.innerText = engine.grid[r][c];
                cell.appendChild(span);
                
                this.gridEl.appendChild(cell);
            }
        }
        this.resizeCanvas();
    }

    resizeCanvas() {
        const rect = this.gridEl.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearSelection() {
        document.querySelectorAll('.letter-cell.selected').forEach(c => c.classList.remove('selected'));
    }

    drawPath(path, e) {
        this.clearCanvas();
        if (path.length === 0) return;

        const gridRect = this.gridEl.getBoundingClientRect();
        
        this.ctx.beginPath();
        this.ctx.lineWidth = 12;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)'; // Primary theme color

        for (let i = 0; i < path.length; i++) {
            const elRect = path[i].el.getBoundingClientRect();
            const x = elRect.left - gridRect.left + elRect.width / 2;
            const y = elRect.top - gridRect.top + elRect.height / 2;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }

        // Draw to current touch/mouse position
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        const currentX = clientX - gridRect.left;
        const currentY = clientY - gridRect.top;
        
        // Only draw to current pos if it's within bounds to prevent weird extending lines
        if(currentX >= 0 && currentX <= gridRect.width && currentY >= 0 && currentY <= gridRect.height) {
            this.ctx.lineTo(currentX, currentY);
        }

        this.ctx.stroke();
    }

    updateHUD(score, timer, combo) {
        document.getElementById('hud-score').innerText = score;
        document.getElementById('hud-timer').innerText = this.formatTime(timer);
        
        const comboEl = document.getElementById('hud-combo');
        if (combo > 1) {
            comboEl.innerText = `x${combo}`;
            comboEl.style.opacity = '1';
            comboEl.style.transform = `scale(${1 + combo * 0.1})`;
        } else {
            comboEl.style.opacity = '0';
        }
    }

    setPreview(word, isValid) {
        const preview = document.getElementById('word-preview');
        preview.innerText = word;
        preview.className = 'word-preview ' + (isValid ? 'valid' : 'invalid');
        if(word.length === 0) preview.className = 'word-preview';
    }

    showWordParticles(indices) {
        // Floating point animation logic here (adds a +10 over the last element)
        if(indices.length === 0) return;
        const lastEl = indices[indices.length - 1];
        const cell = document.querySelector(`.letter-cell[data-row="${lastEl.row}"][data-col="${lastEl.col}"]`);
        if(!cell) return;
        
        const float = document.createElement('div');
        float.className = 'floating-score';
        float.innerText = '+';
        cell.appendChild(float);
        
        setTimeout(() => float.remove(), 1000);
    }
    
    updateFoundWordsList(words) {
        const list = document.getElementById('found-words');
        list.innerHTML = '';
        words.forEach(w => {
            const pill = document.createElement('div');
            pill.className = 'word-pill';
            pill.innerText = w;
            list.appendChild(pill);
        });
    }

    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    showGameOver(score, rank, words) {
        document.getElementById('result-score').innerText = score;
        document.getElementById('result-rank').innerText = rank;
        document.getElementById('result-words').innerText = words;
        this.switchScreen('screen-result');
    }

    showHint(path) {
        if (!path || path.length === 0) return;
        const hintLength = Math.min(2, path.length);
        for(let i=0; i<hintLength; i++) {
            const el = document.querySelector(`.letter-cell[data-row="${path[i].row}"][data-col="${path[i].col}"]`);
            if (el) {
                el.classList.add('hinted');
                setTimeout(() => el.classList.remove('hinted'), 2000);
            }
        }
    }
}