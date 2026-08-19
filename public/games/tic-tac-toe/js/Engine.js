export class GameEngine {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.isGameOver = false;
        this.winLine = null;
        this.history = [];
    }

    reset() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.isGameOver = false;
        this.winLine = null;
        this.history = [];
    }

    makeMove(index) {
        if (this.isGameOver || this.board[index] !== null) return false;
        
        this.history.push({ board: [...this.board], player: this.currentPlayer });
        this.board[index] = this.currentPlayer;
        
        const win = this.checkWin();
        if (win) {
            this.isGameOver = true;
            this.winLine = win;
        } else if (this.checkDraw()) {
            this.isGameOver = true;
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
        
        return true;
    }

    undo() {
        if (this.history.length === 0) return false;
        const lastState = this.history.pop();
        this.board = [...lastState.board];
        this.currentPlayer = lastState.player;
        this.isGameOver = false;
        this.winLine = null;
        return true;
    }

    checkWin() {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
            [0, 4, 8], [2, 4, 6]             // Diags
        ];
        
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return { type: this.getLineType(i), indices: [a, b, c], winner: this.board[a] };
            }
        }
        return null;
    }

    getLineType(index) {
        if (index < 3) return { type: 'row', index };
        if (index < 6) return { type: 'col', index: index - 3 };
        return { type: 'diag', index: index - 6 };
    }

    checkDraw() {
        return this.board.every(cell => cell !== null);
    }
}
