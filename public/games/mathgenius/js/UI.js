export class UIManager {
    constructor(engine, callbacks) {
        this.engine = engine;
        this.callbacks = callbacks;
        this.boardEl = document.getElementById('board-zoom');
        this.trayEl = document.getElementById('tile-tray');
        
        this.selectedTileId = null;
    }

    switchScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    render() {
        const boardW = this.boardEl.parentElement.clientWidth - 32;
        const boardH = this.boardEl.parentElement.clientHeight - 32;
        const cellW = Math.floor(boardW / this.engine.boardCols);
        const cellH = Math.floor(boardH / this.engine.boardRows);
        const size = Math.max(34, Math.min(cellW, cellH, 50)); 

        this.boardEl.style.setProperty('--cell-size', size + 'px');
        this.boardEl.style.gridTemplateColumns = 'repeat(' + this.engine.boardCols + ', ' + size + 'px)';
        this.boardEl.style.gridTemplateRows = 'repeat(' + this.engine.boardRows + ', ' + size + 'px)';
        this.boardEl.innerHTML = '';

        for (let r = 0; r < this.engine.boardRows; r++) {
            for (let c = 0; c < this.engine.boardCols; c++) {
                const cellData = this.engine.grid[r][c];
                const cellEl = document.createElement('div');
                cellEl.className = 'cell';
                
                if (!cellData) {
                    cellEl.classList.add('empty-space');
                } else if (cellData.fixed) {
                    cellEl.classList.add('fixed');
                    if (cellData.type === 'operator' && cellData.value === '*') cellEl.innerHTML = '×';
                    else if (cellData.type === 'operator' && cellData.value === '/') cellEl.innerHTML = '÷';
                    else cellEl.innerHTML = cellData.value;
                } else {
                    cellEl.classList.add('slot');
                    cellEl.dataset.r = r;
                    cellEl.dataset.c = c;
                    
                    if (cellData.valid === true) cellEl.classList.add('valid');
                    if (cellData.valid === false) cellEl.classList.add('invalid');

                    if (cellData.currentTile) {
                        const tileEl = this.createTileElement(cellData.currentTile, true);
                        cellEl.appendChild(tileEl);
                    }
                    
                    // Slot click handler (Tap-to-place)
                    cellEl.addEventListener('click', () => {
                        if (this.selectedTileId) {
                            if (cellData.currentTile) this.engine.removeTile(r, c);
                            this.engine.placeTile(r, c, this.selectedTileId);
                            this.selectedTileId = null;
                            this.callbacks.onMove();
                        } else if (cellData.currentTile) {
                            // Move back to tray
                            this.engine.removeTile(r, c);
                            this.callbacks.onMove();
                        }
                    });
                }
                this.boardEl.appendChild(cellEl);
            }
        }

        this.trayEl.innerHTML = '';
        const unplacedTiles = this.engine.tiles.filter(t => !this.isTilePlaced(t.id));
        unplacedTiles.forEach(t => {
            this.trayEl.appendChild(this.createTileElement(t, false));
        });
    }

    isTilePlaced(id) {
        for (let r = 0; r < this.engine.boardRows; r++) {
            for (let c = 0; c < this.engine.boardCols; c++) {
                const cell = this.engine.grid[r][c];
                if (cell && cell.currentTile && cell.currentTile.id === id) return true;
            }
        }
        return false;
    }

    createTileElement(tile, isPlaced = false) {
        const el = document.createElement('div');
        el.className = 'tile';
        if (isPlaced) el.classList.add('placed');
        if (!isPlaced && this.selectedTileId === tile.id) el.classList.add('selected');
        
        el.innerText = tile.value;
        
        if (!isPlaced) {
            el.addEventListener('click', () => {
                this.selectedTileId = (this.selectedTileId === tile.id) ? null : tile.id;
                this.render(); // Re-render to highlight selected tile
            });
        }
        
        return el;
    }
}
