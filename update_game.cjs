const fs = require('fs');
let code = fs.readFileSync('public/games/chess-ai/js/game.js', 'utf8');

const puzzleCode = `
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
`;

// Insert startPuzzle before tickTimer
code = code.replace(/tickTimer\(\) \{/, puzzleCode + '\n    tickTimer() {');

// Update handlePlayerMove
const handlePlayerMoveOrig = `    handlePlayerMove(moveObj) {
        const move = this.chess.move(moveObj);
        if (move) {
            this.lastMove = move;
            if (move.flags.includes('c') || move.flags.includes('e')) audio.capture();
            else audio.move();
            
            this.updateView();
            this.checkGameStatus();
            
            if (!this.isGameOver) {
                setTimeout(() => this.makeAIMove(), 200); // Small delay for UX
            }
        }
    }`;

const handlePlayerMoveNew = `    handlePlayerMove(moveObj) {
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
    }`;

code = code.replace(handlePlayerMoveOrig, handlePlayerMoveNew);

// Add makePuzzleOpponentMove
const makePuzzleOpponentMoveCode = `
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
`;

code = code.replace(/undo\(\) \{/, makePuzzleOpponentMoveCode + '\n    undo() {');

// Update endGame for puzzle solved
code = code.replace(/} else if \(reason === 'resign'\) \{/, `} else if (reason === 'puzzle_solved') {
            isWin = true;
            result = 'PUZZLE SOLVED';
            reason = 'Great job!';
        } else if (reason === 'resign') {`);
        
// Reset timer displays inside normal start
code = code.replace(/this\.time = \{ w: 600, b: 600 \};/, `this.time = { w: 600, b: 600 };
        document.getElementById('timer-top').style.display = 'block';
        document.getElementById('timer-bottom').style.display = 'block';
        this.isPuzzleMode = false;`);

fs.writeFileSync('public/games/chess-ai/js/game.js', code);
