class ChessEngine {
    constructor() {
        this.pieceValues = {
            p: 100,
            n: 320,
            b: 330,
            r: 500,
            q: 900,
            k: 20000
        };

        // Pawn square table (White perspective)
        this.pawnEvalWhite = [
            [0,  0,  0,  0,  0,  0,  0,  0],
            [50, 50, 50, 50, 50, 50, 50, 50],
            [10, 10, 20, 30, 30, 20, 10, 10],
            [5,  5, 10, 25, 25, 10,  5,  5],
            [0,  0,  0, 20, 20,  0,  0,  0],
            [5, -5,-10,  0,  0,-10, -5,  5],
            [5, 10, 10,-20,-20, 10, 10,  5],
            [0,  0,  0,  0,  0,  0,  0,  0]
        ];

        this.knightEval = [
            [-50,-40,-30,-30,-30,-30,-40,-50],
            [-40,-20,  0,  0,  0,  0,-20,-40],
            [-30,  0, 10, 15, 15, 10,  0,-30],
            [-30,  5, 15, 20, 20, 15,  5,-30],
            [-30,  0, 15, 20, 20, 15,  0,-30],
            [-30,  5, 10, 15, 15, 10,  5,-30],
            [-40,-20,  0,  5,  5,  0,-20,-40],
            [-50,-40,-30,-30,-30,-30,-40,-50]
        ];

        this.bishopEvalWhite = [
            [-20,-10,-10,-10,-10,-10,-10,-20],
            [-10,  0,  0,  0,  0,  0,  0,-10],
            [-10,  0,  5, 10, 10,  5,  0,-10],
            [-10,  5,  5, 10, 10,  5,  5,-10],
            [-10,  0, 10, 10, 10, 10,  0,-10],
            [-10, 10, 10, 10, 10, 10, 10,-10],
            [-10,  5,  0,  0,  0,  0,  5,-10],
            [-20,-10,-10,-10,-10,-10,-10,-20]
        ];

        this.rookEvalWhite = [
            [ 0,  0,  0,  0,  0,  0,  0,  0],
            [ 5, 10, 10, 10, 10, 10, 10,  5],
            [-5,  0,  0,  0,  0,  0,  0, -5],
            [-5,  0,  0,  0,  0,  0,  0, -5],
            [-5,  0,  0,  0,  0,  0,  0, -5],
            [-5,  0,  0,  0,  0,  0,  0, -5],
            [-5,  0,  0,  0,  0,  0,  0, -5],
            [ 0,  0,  0,  5,  5,  0,  0,  0]
        ];

        this.evalQueen = [
            [-20,-10,-10, -5, -5,-10,-10,-20],
            [-10,  0,  0,  0,  0,  0,  0,-10],
            [-10,  0,  5,  5,  5,  5,  0,-10],
            [ -5,  0,  5,  5,  5,  5,  0, -5],
            [  0,  0,  5,  5,  5,  5,  0, -5],
            [-10,  5,  5,  5,  5,  5,  0,-10],
            [-10,  0,  5,  0,  0,  0,  0,-10],
            [-20,-10,-10, -5, -5,-10,-10,-20]
        ];

        this.kingEvalWhite = [
            [-30,-40,-40,-50,-50,-40,-40,-30],
            [-30,-40,-40,-50,-50,-40,-40,-30],
            [-30,-40,-40,-50,-50,-40,-40,-30],
            [-30,-40,-40,-50,-50,-40,-40,-30],
            [-20,-30,-30,-40,-40,-30,-30,-20],
            [-10,-20,-20,-20,-20,-20,-20,-10],
            [ 20, 20,  0,  0,  0,  0, 20, 20],
            [ 20, 30, 10,  0,  0, 10, 30, 20]
        ];
    }

    getPieceValue(piece, x, y) {
        if (piece === null) return 0;
        
        let val = this.pieceValues[piece.type];
        
        // Add positional value
        let isWhite = piece.color === 'w';
        // Note: x is rank (0 is 8th rank for white, 7 is 1st rank)
        // y is file (0 is 'a', 7 is 'h')
        
        // Reverse x for black so tables work for both
        let rank = isWhite ? x : 7 - x;
        
        switch (piece.type) {
            case 'p': val += this.pawnEvalWhite[rank][y]; break;
            case 'n': val += this.knightEval[rank][y]; break;
            case 'b': val += this.bishopEvalWhite[rank][y]; break;
            case 'r': val += this.rookEvalWhite[rank][y]; break;
            case 'q': val += this.evalQueen[rank][y]; break;
            case 'k': val += this.kingEvalWhite[rank][y]; break;
        }
        
        return isWhite ? val : -val;
    }

    evaluateBoard(chess) {
        if (chess.in_checkmate()) {
            return chess.turn() === 'w' ? -999999 : 999999;
        }
        if (chess.in_draw() || chess.in_stalemate() || chess.in_threefold_repetition()) {
            return 0;
        }

        let totalEvaluation = 0;
        const board = chess.board();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                totalEvaluation += this.getPieceValue(board[i][j], i, j);
            }
        }
        return totalEvaluation;
    }

    getBestMove(chess, depth) {
        let possibleMoves = chess.moves({ verbose: true });
        if (possibleMoves.length === 0) return null;
        
        // Sort moves to improve alpha-beta pruning (captures first)
        possibleMoves.sort((a, b) => {
            let scoreA = a.captured ? 10 : 0;
            let scoreB = b.captured ? 10 : 0;
            if (a.flags.includes('p')) scoreA += 5; // promotions
            if (b.flags.includes('p')) scoreB += 5;
            return scoreB - scoreA;
        });

        let bestMove = null;
        let bestValue = chess.turn() === 'w' ? -Infinity : Infinity;

        let alpha = -Infinity;
        let beta = Infinity;

        for (let i = 0; i < possibleMoves.length; i++) {
            let move = possibleMoves[i];
            chess.move(move);
            let boardValue = this.minimax(chess, depth - 1, alpha, beta, chess.turn() === 'w');
            chess.undo();

            if (chess.turn() === 'w') {
                if (boardValue > bestValue) {
                    bestValue = boardValue;
                    bestMove = move;
                }
                alpha = Math.max(alpha, bestValue);
            } else {
                if (boardValue < bestValue) {
                    bestValue = boardValue;
                    bestMove = move;
                }
                beta = Math.min(beta, bestValue);
            }
        }

        // Fallback if something went wrong
        if (!bestMove) bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        
        return bestMove.san;
    }

    minimax(chess, depth, alpha, beta, isMaximizingPlayer) {
        if (depth === 0) {
            return this.evaluateBoard(chess);
        }

        let possibleMoves = chess.moves({ verbose: true });
        
        if (possibleMoves.length === 0) {
            return this.evaluateBoard(chess);
        }

        // Sort moves for better pruning
        possibleMoves.sort((a, b) => {
            return (b.captured ? 1 : 0) - (a.captured ? 1 : 0);
        });

        if (isMaximizingPlayer) {
            let bestVal = -Infinity;
            for (let i = 0; i < possibleMoves.length; i++) {
                chess.move(possibleMoves[i]);
                bestVal = Math.max(bestVal, this.minimax(chess, depth - 1, alpha, beta, !isMaximizingPlayer));
                chess.undo();
                alpha = Math.max(alpha, bestVal);
                if (beta <= alpha) {
                    break;
                }
            }
            return bestVal;
        } else {
            let bestVal = Infinity;
            for (let i = 0; i < possibleMoves.length; i++) {
                chess.move(possibleMoves[i]);
                bestVal = Math.min(bestVal, this.minimax(chess, depth - 1, alpha, beta, !isMaximizingPlayer));
                chess.undo();
                beta = Math.min(beta, bestVal);
                if (beta <= alpha) {
                    break;
                }
            }
            return bestVal;
        }
    }
}
