class Game {
    constructor(ui) {
        this.ui = ui;
        this.chess = new Chess();
        this.engine = new ChessEngine();
        this.board = null;
        
        this.playerColor = 'w';
        this.difficulty = 3;
        this.isGameOver = false;
        this.lastMove = null;
        
        this.timerInterval = null;
        this.time = { w: 600, b: 600 };
    }

    initBoard() {
        this.board = new Board('chess-board', (move) => this.handlePlayerMove(move));
    }

    start(difficulty, color) {
        this.difficulty = parseInt(difficulty);
        this.playerColor = color === 'r' ? (Math.random() > 0.5 ? 'w' : 'b') : color;
        
        this.chess.reset();
        this.isGameOver = false;
        this.lastMove = null;
        this.time = { w: 600, b: 600 };
        document.getElementById('timer-top').style.display = 'flex';
        document.getElementById('timer-bottom').style.display = 'flex';
        this.isPuzzleMode = false;
        
        this.board.setPlayerColor(this.playerColor);
        this.updateView();
        
        this.ui.setupGameInfo(this.difficulty, this.playerColor);
        
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => this.tickTimer(), 1000);
        
        if (this.playerColor === 'b') {
            this.makeAIMove();
        }
    }

    
    startPuzzle(puzzle) {
        this.isPuzzleMode = true;
        this.currentPuzzle = puzzle;
        this.puzzleStep = 0;
        
        this.difficulty = 3;
        this.playerColor = puzzle.color;
        
        this.chess.load(puzzle.fen);
        this.isGameOver = false;
        this.lastMove = null;
        
        // Hide timers for puzzles
        document.getElementById('timer-top').style.display = 'none';
        document.getElementById('timer-bottom').style.display = 'none';
        
        this.board.setPlayerColor(this.playerColor);
        this.updateView();
        
        this.ui.setupGameInfo(this.difficulty, this.playerColor);
        document.getElementById('opponent-name').innerText = 'Puzzle: ' + puzzle.title;
        document.getElementById('opponent-rating').innerText = 'Tactics';
        
        clearInterval(this.timerInterval);
    }

    tickTimer() {
        if(this.isGameOver) return;
        const turn = this.chess.turn();
        this.time[turn]--;
        this.ui.updateTimers(this.time.w, this.time.b, this.playerColor);
        
        if(this.time[turn] <= 0) {
            this.endGame('timeout');
        }
    }

    handlePlayerMove(moveObj) {
        const move = this.chess.move(moveObj);
        if (move) {
            if (this.isPuzzleMode) {
                const expectedMoveSAN = this.currentPuzzle.moves[this.puzzleStep];
                // Check if move matches expected
                if (move.lan === expectedMoveSAN || move.san === expectedMoveSAN || (move.from + move.to) === expectedMoveSAN) {
                    this.lastMove = move;
                    if (move.flags.includes('c') || move.flags.includes('e')) audio.capture();
                    else audio.move();
                    this.updateView();
                    
                    this.puzzleStep++;
                    if (this.puzzleStep >= this.currentPuzzle.moves.length) {
                        this.endGame('puzzle_solved');
                    } else {
                        // Make automated opponent response
                        setTimeout(() => this.makePuzzleOpponentMove(), 400);
                    }
                } else {
                    // Wrong move
                    this.chess.undo();
                    this.board.render(this.chess.board(), this.lastMove, this.getCheckSquare());
                    
                    // Show error briefly
                    const evalText = document.getElementById('eval-text');
                    const origText = evalText.innerText;
                    evalText.innerText = "Incorrect!";
                    evalText.style.color = "#ff4444";
                    audio.lose(); // error sound
                    setTimeout(() => {
                        evalText.innerText = origText;
                        evalText.style.color = "";
                    }, 1500);
                }
                return;
            }

            this.lastMove = move;
            if (move.flags.includes('c') || move.flags.includes('e')) audio.capture();
            else audio.move();
            
            this.updateView();
            this.checkGameStatus();
            
            if (!this.isGameOver) {
                setTimeout(() => this.makeAIMove(), 200); // Small delay for UX
            }
        }
    }

    makeAIMove() {
        if (this.isGameOver) return;
        
        // Depth based on difficulty 1-6
        let depth = 1;
        if(this.difficulty >= 2) depth = 2;
        if(this.difficulty >= 4) depth = 3;
        if(this.difficulty >= 6) depth = 4; // Warning: JS depth 4 might be slow, keep 3 for smoothness if needed, or use Web Worker. We'll stick to 3 for snappy web response.
        
        const aiMoveStr = this.engine.getBestMove(this.chess, depth);
        const move = this.chess.move(aiMoveStr);
        
        if (move) {
            this.lastMove = move;
            if (move.flags.includes('c') || move.flags.includes('e')) audio.capture();
            else audio.move();
            
            this.updateView();
            this.checkGameStatus();
        }
    }

    
    makePuzzleOpponentMove() {
        if (this.isGameOver || !this.isPuzzleMode) return;
        const expectedMoveSAN = this.currentPuzzle.moves[this.puzzleStep];
        const move = this.chess.move(expectedMoveSAN, { sloppy: true }); // using sloppy for simplified inputs
        
        // If exact move isn't found using san, try by from/to
        if (!move) {
           const from = expectedMoveSAN.substring(0, 2);
           const to = expectedMoveSAN.substring(2, 4);
           this.chess.move({from, to});
        }
        
        const history = this.chess.history({verbose: true});
        this.lastMove = history[history.length - 1];
        
        if (this.lastMove.flags.includes('c') || this.lastMove.flags.includes('e')) audio.capture();
        else audio.move();
        
        this.updateView();
        this.puzzleStep++;
        
        if (this.puzzleStep >= this.currentPuzzle.moves.length) {
            this.endGame('puzzle_solved');
        }
    }

    undo() {
        if (this.isGameOver) return;
        // Undo AI move
        this.chess.undo();
        // Undo Player move
        this.chess.undo();
        
        const history = this.chess.history({verbose: true});
        this.lastMove = history.length > 0 ? history[history.length - 1] : null;
        
        this.updateView();
        audio.click();
    }
    
    useHint() {
        if (this.isGameOver || this.chess.turn() !== this.playerColor) return;
        
        const hintStr = this.engine.getBestMove(this.chess, 2); // Quick analysis
        // Highlight hint visually (simple format string parsing)
        const match = hintStr.match(/([a-h][1-8])([a-h][1-8])/);
        if(match) {
            const from = match[1];
            const to = match[2];
            this.board.getSquareEl(from)?.classList.add('highlight-move');
            this.board.getSquareEl(to)?.classList.add('highlight-move');
        } else {
            // Standard notation fallback (e.g. Nf3)
            // Hard to parse perfectly without full move generation match, just play sound
        }
        audio.click();
    }

    resign() {
        this.endGame('resign');
    }

    getCheckSquare() {
        if (this.chess.in_check()) {
            const turn = this.chess.turn();
            const board = this.chess.board();
            for(let r=0; r<8; r++){
                for(let c=0; c<8; c++){
                    if(board[r][c] && board[r][c].type === 'k' && board[r][c].color === turn) {
                        return String.fromCharCode('a'.charCodeAt(0) + c) + (8 - r);
                    }
                }
            }
        }
        return null;
    }

    updateView() {
        this.board.render(this.chess.board(), this.lastMove, this.getCheckSquare());
        this.ui.updateMoves(this.chess.history());
        this.ui.updateCapturedPieces(this.chess.history({verbose: true}), this.playerColor);
        
        // Eval bar
        const evalScore = this.engine.evaluateBoard(this.chess);
        this.ui.updateEvalBar(evalScore, this.playerColor);
        
        if(this.chess.in_check() && !this.isGameOver) {
            audio.check();
        }
    }

    checkGameStatus() {
        if (this.chess.in_checkmate()) {
            this.endGame('checkmate');
        } else if (this.chess.in_draw() || this.chess.in_stalemate() || this.chess.in_threefold_repetition()) {
            this.endGame('draw');
        }
    }

    endGame(reason) {
        this.isGameOver = true;
        clearInterval(this.timerInterval);
        
        let result = '';
        let isWin = false;
        
        if (reason === 'checkmate') {
            isWin = this.chess.turn() !== this.playerColor;
            result = isWin ? 'VICTORY' : 'DEFEAT';
        } else if (reason === 'timeout') {
            isWin = this.time[this.playerColor] > 0;
            result = isWin ? 'VICTORY' : 'DEFEAT';
            reason = 'by Timeout';
        } else if (reason === 'puzzle_solved') {
            isWin = true;
            result = 'PUZZLE SOLVED';
            reason = 'Great job!';
        } else if (reason === 'resign') {
            isWin = false;
            result = 'DEFEAT';
            reason = 'by Resignation';
        } else {
            result = 'DRAW';
        }
        
        if(isWin) audio.win();
        else if (result === 'DEFEAT') audio.lose();
        
        setTimeout(() => {
            this.ui.showResult(isWin, result, reason, this.difficulty);
        }, 1000);
    }
}
