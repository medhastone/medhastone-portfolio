import { COLORS } from './shapes.js';

export class GameEngine {
    constructor() {
        this.boardSize = 8;
        this.grid = this.createEmptyGrid();
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('blockStackBest')) || 0;
        this.combo = 0;
    }

    createEmptyGrid() {
        const grid = [];
        for (let r = 0; r < this.boardSize; r++) {
            grid[r] = new Array(this.boardSize).fill(null);
        }
        return grid;
    }

    reset() {
        this.grid = this.createEmptyGrid();
        this.score = 0;
        this.combo = 0;
    }

    canPlace(shapeMatrix, startRow, startCol) {
        for (let r = 0; r < shapeMatrix.length; r++) {
            for (let c = 0; c < shapeMatrix[r].length; c++) {
                if (shapeMatrix[r][c] === 1) {
                    const boardR = startRow + r;
                    const boardC = startCol + c;
                    
                    if (boardR < 0 || boardR >= this.boardSize || boardC < 0 || boardC >= this.boardSize) {
                        return false;
                    }
                    if (this.grid[boardR][boardC] !== null) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    place(shape, startRow, startCol) {
        const matrix = shape.matrix;
        const color = COLORS[shape.colorIdx];
        let blocksPlaced = 0;

        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] === 1) {
                    this.grid[startRow + r][startCol + c] = color;
                    blocksPlaced++;
                }
            }
        }
        
        // Base score for placing blocks
        this.score += blocksPlaced;
        return this.processLines();
    }

    processLines() {
        const rowsToClear = [];
        const colsToClear = [];

        // Check rows
        for (let r = 0; r < this.boardSize; r++) {
            let full = true;
            for (let c = 0; c < this.boardSize; c++) {
                if (this.grid[r][c] === null) {
                    full = false;
                    break;
                }
            }
            if (full) rowsToClear.push(r);
        }

        // Check cols
        for (let c = 0; c < this.boardSize; c++) {
            let full = true;
            for (let r = 0; r < this.boardSize; r++) {
                if (this.grid[r][c] === null) {
                    full = false;
                    break;
                }
            }
            if (full) colsToClear.push(c);
        }

        const linesCleared = rowsToClear.length + colsToClear.length;
        let clearedCells = [];

        if (linesCleared > 0) {
            this.combo++;
            
            // Calculate score
            // 1 line = 10, 2 lines = 30, 3 lines = 60, 4 lines = 100...
            const lineScore = (linesCleared * (linesCleared + 1) / 2) * 10;
            const comboMultiplier = Math.max(1, this.combo);
            this.score += lineScore * comboMultiplier;

            // Collect cells to animate
            rowsToClear.forEach(r => {
                for (let c = 0; c < this.boardSize; c++) {
                    clearedCells.push({r, c});
                    this.grid[r][c] = null;
                }
            });
            colsToClear.forEach(c => {
                for (let r = 0; r < this.boardSize; r++) {
                    // Avoid duplicate cell animation entries
                    if (!clearedCells.find(cell => cell.r === r && cell.c === c)) {
                        clearedCells.push({r, c});
                        this.grid[r][c] = null;
                    }
                }
            });
        } else {
            this.combo = 0;
        }

        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('blockStackBest', this.bestScore);
        }

        return {
            clearedCells,
            linesCleared,
            combo: this.combo
        };
    }

    checkGameOver(availableShapes) {
        if (availableShapes.length === 0) return false;
        
        for (const shape of availableShapes) {
            if (!shape) continue;
            for (let r = 0; r < this.boardSize; r++) {
                for (let c = 0; c < this.boardSize; c++) {
                    if (this.canPlace(shape.matrix, r, c)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
