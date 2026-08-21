class Game {
    constructor(ui) {
        this.ui = ui;
        this.boardElement = document.getElementById('minesweeper-board');
        this.isActive = false;
        this.firstClick = true;
        
        this.cols = 0;
        this.rows = 0;
        this.totalMines = 0;
        
        this.grid = [];
        this.flags = 0;
        this.revealedCount = 0;
        
        this.startTime = 0;
        this.timer = null;
        this.timeElapsed = 0;
    }

    start(cols, rows, mines) {
        this.cols = cols;
        this.rows = rows;
        this.totalMines = mines;
        this.isActive = true;
        this.firstClick = true;
        this.flags = 0;
        this.revealedCount = 0;
        this.timeElapsed = 0;
        
        this.boardElement.style.gridTemplateColumns = `repeat(${cols}, 32px)`;
        this.boardElement.style.gridTemplateRows = `repeat(${rows}, 32px)`;
        
        this.createGrid();
        this.renderBoard();
        this.updateHUD();
        
        clearInterval(this.timer);
        document.getElementById('hud-time').innerText = '000';
    }

    createGrid() {
        this.grid = [];
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.cols; c++) {
                row.push({
                    r: r, c: c,
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                });
            }
            this.grid.push(row);
        }
    }

    placeMines(firstR, firstC) {
        let minesPlaced = 0;
        while (minesPlaced < this.totalMines) {
            let r = Math.floor(Math.random() * this.rows);
            let c = Math.floor(Math.random() * this.cols);
            
            // Safe start zone (3x3 around first click)
            let isSafeZone = Math.abs(r - firstR) <= 1 && Math.abs(c - firstC) <= 1;
            
            if (!this.grid[r][c].isMine && !isSafeZone) {
                this.grid[r][c].isMine = true;
                minesPlaced++;
            }
        }
        this.calculateNeighbors();
    }

    calculateNeighbors() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.grid[r][c].isMine) continue;
                let count = 0;
                for (let nr = r - 1; nr <= r + 1; nr++) {
                    for (let nc = c - 1; nc <= c + 1; nc++) {
                        if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                            if (this.grid[nr][nc].isMine) count++;
                        }
                    }
                }
                this.grid[r][c].neighborMines = count;
            }
        }
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.dataset.r = r;
                tile.dataset.c = c;
                
                tile.addEventListener('click', (e) => this.handleLeftClick(r, c));
                tile.addEventListener('contextmenu', (e) => { e.preventDefault(); this.handleRightClick(r, c); });
                tile.addEventListener('dblclick', (e) => this.handleDoubleClick(r, c));
                
                this.boardElement.appendChild(tile);
            }
        }
    }

    getTileElement(r, c) {
        return this.boardElement.children[r * this.cols + c];
    }

    handleLeftClick(r, c) {
        if (!this.isActive) return;
        let cell = this.grid[r][c];
        
        if (cell.isFlagged || cell.isRevealed) return;
        
        if (this.firstClick) {
            this.firstClick = false;
            this.placeMines(r, c);
            this.startTimer();
        }
        
        if (cell.isMine) {
            this.gameOver(false);
            return;
        }
        
        this.reveal(r, c);
        audio.reveal();
        
        this.checkWinCondition();
    }

    handleRightClick(r, c) {
        if (!this.isActive || this.firstClick) return;
        let cell = this.grid[r][c];
        if (cell.isRevealed) return;
        
        cell.isFlagged = !cell.isFlagged;
        let el = this.getTileElement(r, c);
        
        if (cell.isFlagged) {
            this.flags++;
            el.classList.add('flag');
            el.innerHTML = '<span class="material-icons">flag</span>';
            audio.flag();
        } else {
            this.flags--;
            el.classList.remove('flag');
            el.innerHTML = '';
            audio.unflag();
        }
        
        this.updateHUD();
    }

    handleDoubleClick(r, c) {
        if (!this.isActive) return;
        let cell = this.grid[r][c];
        if (!cell.isRevealed || cell.neighborMines === 0) return;
        
        let flagCount = 0;
        for (let nr = r - 1; nr <= r + 1; nr++) {
            for (let nc = c - 1; nc <= c + 1; nc++) {
                if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                    if (this.grid[nr][nc].isFlagged) flagCount++;
                }
            }
        }
        
        if (flagCount === cell.neighborMines) {
            audio.chord();
            let hitMine = false;
            for (let nr = r - 1; nr <= r + 1; nr++) {
                for (let nc = c - 1; nc <= c + 1; nc++) {
                    if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                        let nCell = this.grid[nr][nc];
                        if (!nCell.isRevealed && !nCell.isFlagged) {
                            if (nCell.isMine) hitMine = true;
                            else this.reveal(nr, nc);
                        }
                    }
                }
            }
            if (hitMine) this.gameOver(false);
            else this.checkWinCondition();
        }
    }

    reveal(r, c) {
        let cell = this.grid[r][c];
        if (cell.isRevealed || cell.isFlagged) return;
        
        cell.isRevealed = true;
        this.revealedCount++;
        
        let el = this.getTileElement(r, c);
        el.classList.add('revealed');
        
        if (cell.neighborMines > 0) {
            el.innerText = cell.neighborMines;
            el.classList.add(`n-${cell.neighborMines}`);
        } else {
            // Flood fill
            for (let nr = r - 1; nr <= r + 1; nr++) {
                for (let nc = c - 1; nc <= c + 1; nc++) {
                    if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                        this.reveal(nr, nc);
                    }
                }
            }
        }
    }

    startTimer() {
        this.startTime = Date.now();
        this.timer = setInterval(() => {
            this.timeElapsed = Math.floor((Date.now() - this.startTime) / 1000);
            document.getElementById('hud-time').innerText = this.timeElapsed.toString().padStart(3, '0');
        }, 1000);
    }

    updateHUD() {
        let remaining = this.totalMines - this.flags;
        document.getElementById('hud-flags').innerText = remaining.toString().padStart(2, '0');
    }

    checkWinCondition() {
        if (this.revealedCount === (this.rows * this.cols) - this.totalMines) {
            this.gameOver(true);
        }
    }

    gameOver(isWin) {
        this.isActive = false;
        clearInterval(this.timer);
        
        // Reveal all mines
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let cell = this.grid[r][c];
                let el = this.getTileElement(r, c);
                
                if (cell.isMine) {
                    if (!cell.isFlagged) {
                        el.classList.add('revealed', 'mine');
                        el.innerHTML = '<span class="material-icons">brightness_7</span>';
                        if(!isWin) {
                            let rect = el.getBoundingClientRect();
                            particles.spawn(rect.left + 16, rect.top + 16, 5, '#ef4444', 3);
                        }
                    }
                } else if (cell.isFlagged) {
                    // False flag
                    el.classList.add('mine');
                    el.style.background = '#f59e0b';
                    el.innerHTML = '<span class="material-icons">close</span>';
                }
            }
        }
        
        if (isWin) {
            audio.win();
            // Firework effect
            for(let i=0; i<5; i++) {
                setTimeout(() => {
                    particles.spawn(window.innerWidth * Math.random(), window.innerHeight * Math.random(), 30, null, 8);
                }, i * 200);
            }
        } else {
            audio.explosion();
        }
        
        setTimeout(() => {
            this.ui.showResult(isWin, this.timeElapsed, this.cols, this.rows);
        }, 1500);
    }
}
