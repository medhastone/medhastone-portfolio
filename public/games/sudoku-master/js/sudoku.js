class SudokuGenerator {
    constructor() {
        this.board = Array.from({length: 9}, () => Array(9).fill(0));
        this.solution = Array.from({length: 9}, () => Array(9).fill(0));
    }

    generate(difficulty) {
        this.board = Array.from({length: 9}, () => Array(9).fill(0));
        this.fillDiagonal();
        this.solveSudoku(this.board);
        
        // Save solution
        for(let r=0; r<9; r++) {
            for(let c=0; c<9; c++) {
                this.solution[r][c] = this.board[r][c];
            }
        }

        // Remove elements based on difficulty
        const diffMap = {
            'easy': 35,
            'medium': 45,
            'hard': 52,
            'expert': 58,
            'master': 62
        };
        const removeCount = diffMap[difficulty] || 45;
        this.removeElements(removeCount);

        return {
            puzzle: this.board.map(row => [...row]),
            solution: this.solution.map(row => [...row])
        };
    }

    fillDiagonal() {
        for(let i=0; i<9; i+=3) {
            this.fillBox(i, i);
        }
    }

    fillBox(rowStart, colStart) {
        let num;
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                do {
                    num = Math.floor(Math.random() * 9) + 1;
                } while(!this.unUsedInBox(rowStart, colStart, num));
                this.board[rowStart + i][colStart + j] = num;
            }
        }
    }

    unUsedInBox(rowStart, colStart, num) {
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                if(this.board[rowStart + i][colStart + j] === num) return false;
            }
        }
        return true;
    }

    isSafe(board, row, col, num) {
        for(let d=0; d<9; d++) {
            if(board[row][d] === num) return false;
            if(board[d][col] === num) return false;
        }
        let sqrt = 3;
        let boxRowStart = row - row % sqrt;
        let boxColStart = col - col % sqrt;
        for(let r = boxRowStart; r < boxRowStart + sqrt; r++) {
            for(let d = boxColStart; d < boxColStart + sqrt; d++) {
                if(board[r][d] === num) return false;
            }
        }
        return true;
    }

    solveSudoku(board) {
        let row = -1;
        let col = -1;
        let isEmpty = true;
        for(let i=0; i<9; i++) {
            for(let j=0; j<9; j++) {
                if(board[i][j] === 0) {
                    row = i;
                    col = j;
                    isEmpty = false;
                    break;
                }
            }
            if(!isEmpty) break;
        }

        if(isEmpty) return true;

        for(let num=1; num<=9; num++) {
            if(this.isSafe(board, row, col, num)) {
                board[row][col] = num;
                if(this.solveSudoku(board)) return true;
                board[row][col] = 0;
            }
        }
        return false;
    }

    removeElements(count) {
        let cellsToRemove = count;
        while(cellsToRemove > 0) {
            let cellId = Math.floor(Math.random() * 81);
            let i = Math.floor(cellId / 9);
            let j = cellId % 9;
            if(this.board[i][j] !== 0) {
                this.board[i][j] = 0;
                cellsToRemove--;
            }
        }
    }
}
