export class MathEngine {
    constructor() {
        this.boardSize = 0;
        this.grid = [];
        this.tiles = [];
        this.placedEquations = [];
    }

    generatePuzzle(difficulty) {
        let numEquations = 6;
        let hideRatio = 0.5;
        this.difficulty = difficulty;

        switch(difficulty) {
            case 'easy': numEquations = 5; hideRatio = 0.4; break;
            case 'medium': numEquations = 10; hideRatio = 0.6; break;
            case 'hard': numEquations = 16; hideRatio = 0.75; break;
            case 'genius': numEquations = 22; hideRatio = 0.9; break;
        }

        const pool = this.generateEquationPool(difficulty);
        
        this.gridSize = 35; // Kept smaller for faster generation
        this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(null));
        this.placedEquations = [];

        const eq1 = pool[Math.floor(Math.random() * pool.length)];
        this.placeEquation(eq1, Math.floor(this.gridSize/2), Math.floor(this.gridSize/2) - 2, true);

        let placed = 1;
        let attempts = 0;
        
        while (placed < numEquations && attempts < 2500) {
            if (this.attachEquation(pool)) {
                placed++;
            }
            attempts++;
        }

        this.trimAndFinalizeBoard(hideRatio);
    }

    generateEquationPool(diff) {
        const pool = [];
        const maxVal = diff === 'easy' ? 20 : (diff === 'medium' ? 50 : 100);
        
        for (let a = 1; a <= maxVal; a++) {
            for (let b = 1; b <= maxVal; b++) {
                if (a + b <= maxVal) pool.push([a, '+', b, '=', a + b]);
                if (a - b > 0) pool.push([a, '-', b, '=', a - b]);
                
                if (diff !== 'easy') {
                    if (a * b <= maxVal) pool.push([a, '*', b, '=', a * b]);
                    if (b !== 0 && a % b === 0) pool.push([a, '/', b, '=', a / b]);
                }
            }
        }

        if (diff === 'hard' || diff === 'genius') {
            const subMax = diff === 'hard' ? 12 : 20;
            const ops = ['+', '-', '*', '/'];
            for (let a = 1; a <= subMax; a++) {
                for (let b = 1; b <= subMax; b++) {
                    for (let c = 1; c <= subMax; c++) {
                        for (let op1 of ops) {
                            for (let op2 of ops) {
                                if (op1 === '/' && a % b !== 0) continue;
                                if (op2 === '/' && op1 !== '*' && b % c !== 0) continue;
                                if (op1 === '*' && op2 === '/' && (a * b) % c !== 0) continue;

                                const tokens = [a, op1, b, op2, c];
                                const res = this.evaluateBODMAS(tokens);
                                
                                if (res !== null && res > 0 && res <= maxVal && Number.isInteger(res)) {
                                    pool.push([...tokens, '=', res]);
                                }
                            }
                        }
                    }
                }
            }
        }
        
        return pool;
    }

    evaluateBODMAS(tokens) {
        try {
            let nextTokens = [];
            let i = 0;
            while(i < tokens.length) {
                if (tokens[i] === '*' || tokens[i] === '/') {
                    let prev = nextTokens.pop();
                    let op = tokens[i];
                    let next = tokens[i+1];
                    if (op === '*') nextTokens.push(prev * next);
                    else if (op === '/') nextTokens.push(prev / next);
                    i += 2;
                } else {
                    nextTokens.push(tokens[i]);
                    i++;
                }
            }
            let res = nextTokens[0];
            i = 1;
            while(i < nextTokens.length) {
                let op = nextTokens[i];
                let next = nextTokens[i+1];
                if (op === '+') res += next;
                if (op === '-') res -= next;
                i += 2;
            }
            return res;
        } catch(e) {
            return null;
        }
    }

    placeEquation(eqTokens, r, c, isHorizontal) {
        for (let i = 0; i < eqTokens.length; i++) {
            const row = isHorizontal ? r : r + i;
            const col = isHorizontal ? c + i : c;
            const val = eqTokens[i];
            const type = typeof val === 'number' ? 'number' : (val === '=' ? 'equals' : 'operator');
            
            if (!this.grid[row][col]) {
                this.grid[row][col] = { type, value: val, r: row, c: col };
            }
        }
        this.placedEquations.push({ tokens: eqTokens, r, c, isHorizontal });
    }

    attachEquation(pool) {
        const numCells = [];
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (this.grid[r][c] && this.grid[r][c].type === 'number') numCells.push(this.grid[r][c]);
            }
        }

        numCells.sort(() => Math.random() - 0.5);

        for (const cell of numCells) {
            const matchingEqs = pool.filter(eq => eq.includes(cell.value));
            
            matchingEqs.sort((e1, e2) => {
                const w1 = e1.length > 5 ? Math.random() + 2 : Math.random();
                const w2 = e2.length > 5 ? Math.random() + 2 : Math.random();
                return w2 - w1;
            });

            for (const eq of matchingEqs) {
                let isHoriz = false;
                if (this.grid[cell.r][cell.c - 1] || this.grid[cell.r][cell.c + 1]) isHoriz = true;
                const newIsHoriz = !isHoriz;

                const matchIndices = [];
                for(let i=0; i<eq.length; i++) {
                    if (eq[i] === cell.value && i % 2 === 0) matchIndices.push(i);
                }
                matchIndices.sort(() => Math.random() - 0.5);

                for (const offset of matchIndices) {
                    const startR = newIsHoriz ? cell.r : cell.r - offset;
                    const startC = newIsHoriz ? cell.c - offset : cell.c;

                    if (this.canPlace(eq, startR, startC, newIsHoriz, cell.r, cell.c)) {
                        this.placeEquation(eq, startR, startC, newIsHoriz);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    canPlace(eqTokens, r, c, isHorizontal, intersectR, intersectC) {
        if (r < 0 || c < 0) return false;
        if (isHorizontal && c + eqTokens.length > this.gridSize) return false;
        if (!isHorizontal && r + eqTokens.length > this.gridSize) return false;

        for (let i = 0; i < eqTokens.length; i++) {
            const row = isHorizontal ? r : r + i;
            const col = isHorizontal ? c + i : c;
            
            if (row === intersectR && col === intersectC) continue;
            if (this.grid[row][col]) return false;

            const neighbors = [
                this.grid[row-1]?.[col], this.grid[row+1]?.[col],
                this.grid[row]?.[col-1], this.grid[row]?.[col+1]
            ];
            if (neighbors.some(n => n !== undefined && n !== null)) return false;
        }
        return true;
    }

    trimAndFinalizeBoard(hideRatio) {
        let minR = this.gridSize, maxR = -1, minC = this.gridSize, maxC = -1;

        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (this.grid[r][c]) {
                    if (r < minR) minR = r;
                    if (r > maxR) maxR = r;
                    if (c < minC) minC = c;
                    if (c > maxC) maxC = c;
                }
            }
        }

        const newRows = maxR - minR + 1;
        const newCols = maxC - minC + 1;
        const finalGrid = Array(newRows).fill(null).map(() => Array(newCols).fill(null));
        this.tiles = [];

        let hasHidden = false;

        for (let r = minR; r <= maxR; r++) {
            for (let c = minC; c <= maxC; c++) {
                if (this.grid[r][c]) {
                    const cell = this.grid[r][c];
                    const newCell = { ...cell, r: r - minR, c: c - minC };
                    
                    if (newCell.type === 'number') {
                        let hide = Math.random() < hideRatio;
                        if (!hasHidden && r === maxR && c === maxC) hide = true;

                        if (hide) {
                            hasHidden = true;
                            this.tiles.push({
                                id: 'tile_' + Math.random().toString(36).substr(2, 9),
                                value: newCell.value
                            });
                            newCell.currentTile = null;
                            newCell.fixed = false;
                        } else {
                            newCell.fixed = true;
                        }
                    } else {
                        newCell.fixed = true;
                    }
                    finalGrid[r - minR][c - minC] = newCell;
                }
            }
        }

        // Adjust placedEquations coordinates
        this.placedEquations.forEach(pe => {
            pe.r -= minR;
            pe.c -= minC;
        });

        this.grid = finalGrid;
        this.boardRows = newRows;
        this.boardCols = newCols;
        this.tiles.sort(() => Math.random() - 0.5);
    }

    placeTile(r, c, tileId) {
        const cell = this.grid[r][c];
        if (cell && cell.type === 'number' && !cell.fixed) {
            const tile = this.tiles.find(t => t.id === tileId);
            if (tile) {
                cell.currentTile = tile;
                return true;
            }
        }
        return false;
    }

    removeTile(r, c) {
        const cell = this.grid[r][c];
        if (cell && cell.type === 'number' && !cell.fixed && cell.currentTile) {
            const tile = cell.currentTile;
            cell.currentTile = null;
            return tile;
        }
        return null;
    }

    getCellValue(cell) {
        if (!cell) return null;
        if (cell.fixed) return cell.value;
        if (cell.currentTile) return cell.currentTile.value;
        return null;
    }

    validateBoard() {
        let allFilled = true;
        for (let r = 0; r < this.boardRows; r++) {
            for (let c = 0; c < this.boardCols; c++) {
                const cell = this.grid[r][c];
                if (cell && cell.type === 'number' && !cell.fixed) {
                    cell.valid = null;
                    if (!cell.currentTile) allFilled = false;
                }
            }
        }

        let allCorrect = true;

        for (const pe of this.placedEquations) {
            let tokens = [];
            for (let i = 0; i < pe.tokens.length; i++) {
                const row = pe.isHorizontal ? pe.r : pe.r + i;
                const col = pe.isHorizontal ? pe.c + i : pe.c;
                const cell = this.grid[row][col];
                let val = cell.type === 'number' ? this.getCellValue(cell) : cell.value;
                tokens.push(val);
            }

            const eqIdx = tokens.indexOf('=');
            const leftTokens = tokens.slice(0, eqIdx);
            const rightVal = tokens[eqIdx + 1];

            const calc = this.evaluateBODMAS(leftTokens);
            const isEqValid = (calc === rightVal);

            // Mark cells
            for (let i = 0; i < pe.tokens.length; i++) {
                const row = pe.isHorizontal ? pe.r : pe.r + i;
                const col = pe.isHorizontal ? pe.c + i : pe.c;
                const cell = this.grid[row][col];
                if (cell.type === 'number' && !cell.fixed) {
                    if (cell.valid !== false) {
                        cell.valid = isEqValid;
                    }
                }
            }

            if (tokens.includes(null) || !isEqValid) {
                allCorrect = false;
            }
        }

        return allFilled && allCorrect;
    }
}
