export class AIController {
    constructor(difficulty, aiSymbol) {
        this.difficulty = difficulty;
        this.aiSymbol = aiSymbol;
        this.playerSymbol = aiSymbol === 'X' ? 'O' : 'X';
    }

    getMove(board) {
        const available = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        if (available.length === 0) return -1;

        if (this.difficulty === 'easy') {
            // 30% optimal, 70% random
            if (Math.random() < 0.3) return this.getBestMove(board).index;
            return available[Math.floor(Math.random() * available.length)];
        } 
        else if (this.difficulty === 'medium') {
            // 70% optimal, 30% random
            if (Math.random() < 0.7) return this.getBestMove(board).index;
            return available[Math.floor(Math.random() * available.length)];
        }
        else if (this.difficulty === 'hard') {
            // 90% optimal, 10% random (might miss a non-obvious block)
            if (Math.random() < 0.9) return this.getBestMove(board).index;
            return available[Math.floor(Math.random() * available.length)];
        }
        else {
            // Master - 100% Minimax
            return this.getBestMove(board).index;
        }
    }

    getHint(board, playerSymbol) {
        const tempAI = new AIController('master', playerSymbol);
        return tempAI.getBestMove(board).index;
    }

    getBestMove(board) {
        let bestScore = -Infinity;
        let move = -1;
        const available = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);

        // Center priority optimization for faster/better opening
        if (available.length === 9) return { index: 4 }; // Center if empty board

        for (let i = 0; i < available.length; i++) {
            let idx = available[i];
            board[idx] = this.aiSymbol;
            let score = this.minimax(board, 0, false, -Infinity, Infinity);
            board[idx] = null;
            if (score > bestScore) {
                bestScore = score;
                move = idx;
            }
        }
        return { index: move };
    }

    minimax(board, depth, isMaximizing, alpha, beta) {
        let result = this.checkWinner(board);
        if (result !== null) {
            if (result === this.aiSymbol) return 10 - depth;
            if (result === this.playerSymbol) return depth - 10;
            return 0; // Draw
        }

        const available = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        if (available.length === 0) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < available.length; i++) {
                let idx = available[i];
                board[idx] = this.aiSymbol;
                let score = this.minimax(board, depth + 1, false, alpha, beta);
                board[idx] = null;
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) break;
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < available.length; i++) {
                let idx = available[i];
                board[idx] = this.playerSymbol;
                let score = this.minimax(board, depth + 1, true, alpha, beta);
                board[idx] = null;
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);
                if (beta <= alpha) break;
            }
            return bestScore;
        }
    }

    checkWinner(board) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }
}
