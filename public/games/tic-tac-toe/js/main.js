import { GameEngine } from './Engine.js';
import { AIController } from './AI.js';
import { UIManager } from './UI.js';
import { StateManager } from './State.js';
import { AudioManager } from './Audio.js';

class GameController {
    constructor() {
        this.engine = new GameEngine();
        this.ui = new UIManager();
        this.state = new StateManager();
        this.audio = new AudioManager();
        this.ai = null;
        this.aiTimer = null;

        // Match config
        this.mode = 'quick';
        this.aiDifficulty = 'medium';
        this.playerSymbol = 'X';
        this.isAI = true;
        
        // Match state
        this.p1Score = 0;
        this.p2Score = 0;
        this.round = 1;
        this.movesCount = 0;

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateMenuStats();
        this.ui.switchScreen('screen-menu');
    }

    updateMenuStats() {
        const data = this.state.data;
        document.getElementById('menu-rank').innerText = this.state.getRank();
        // XP Bar simple calculation (0-100% based on XP modulo 1000)
        const xpPercent = (data.xp % 1000) / 10;
        document.getElementById('menu-xp').style.width = `${xpPercent}%`;

        document.getElementById('st-rating').innerText = data.rating;
        const wr = data.games > 0 ? Math.round((data.wins / data.games) * 100) : 0;
        document.getElementById('st-winrate').innerText = `${wr}%`;
        document.getElementById('st-played').innerText = data.games;
        document.getElementById('st-streak').innerText = data.bestStreak;
    }

    bindEvents() {
        document.body.addEventListener('click', () => {
            this.audio.init();
        }, { once: true });
        // Navigation & Setup
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.audio.play('click');
                const action = e.currentTarget.dataset.action;
                
                if (action === 'nav-setup') {
                    this.isAI = e.currentTarget.dataset.mode === 'ai';
                    document.getElementById('setup-ai-group').style.display = this.isAI ? 'block' : 'none';
                    this.ui.switchScreen('screen-setup');
                }
                else if (action === 'nav-menu') {
                    this.updateMenuStats();
                    this.ui.switchScreen('screen-menu');
                }
                else if (action === 'nav-stats') {
                    this.updateMenuStats();
                    this.ui.switchScreen('screen-stats');
                }
                else if (action === 'start-match') {
                    this.setupMatch();
                }
                else if (action === 'rematch') {
                    this.setupMatch();
                }
            });
        });

        // Setup Options
        document.querySelectorAll('.sym-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.audio.play('click');
                document.querySelectorAll('.sym-btn').forEach(b => b.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                this.playerSymbol = target.dataset.sym;
            });
        });

        // Game Controls
        document.getElementById('btn-undo').addEventListener('click', () => this.handleUndo());
        document.getElementById('btn-hint').addEventListener('click', () => this.handleHint());
        document.getElementById('btn-quit').addEventListener('click', () => {
            this.audio.play('click');
            this.ui.switchScreen('screen-menu');
            this.updateMenuStats();
        });

        // Audio Toggle
        document.getElementById('btn-mute').addEventListener('click', (e) => {
            const isMuted = this.audio.toggleMute();
            e.currentTarget.innerText = isMuted ? '🔇' : '🔊';
        });
    }

    setupMatch() {
        this.mode = document.getElementById('setup-match-type').value;
        this.aiDifficulty = document.getElementById('setup-ai-diff').value;
        
        if (this.isAI) {
            const aiSym = this.playerSymbol === 'X' ? 'O' : 'X';
            this.ai = new AIController(this.aiDifficulty, aiSym);
            document.getElementById('hud-p2-name').innerText = `AI (${this.aiDifficulty.toUpperCase()})`;
        } else {
            document.getElementById('hud-p2-name').innerText = 'PLAYER 2';
        }

        document.getElementById('hud-p1-sym').innerText = this.playerSymbol;
        document.getElementById('hud-p1-sym').className = 'hud-sym ' + this.playerSymbol.toLowerCase();
        const p2Sym = this.playerSymbol === 'X' ? 'O' : 'X';
        document.getElementById('hud-p2-sym').innerText = p2Sym;
        document.getElementById('hud-p2-sym').className = 'hud-sym ' + p2Sym.toLowerCase();

        this.p1Score = 0;
        this.p2Score = 0;
        this.round = 1;
        
        this.startRound();
    }

    startRound() {
        if (this.aiTimer) clearTimeout(this.aiTimer);
        this.engine.reset();
        this.movesCount = 0;
        this.ui.initBoard((idx) => this.handleCellClick(idx));
        this.ui.switchScreen('screen-game');
        this.updateHUD();

        // If AI plays first (Player selected O and X always goes first)
        if (this.isAI && this.playerSymbol === 'O' && this.engine.currentPlayer === this.ai.aiSymbol) {
            this.aiTimer = setTimeout(() => this.makeAIMove(), 500);
        }
    }

    handleCellClick(index) {
        if (this.engine.isGameOver) return;
        
        // Prevent clicking during AI turn
        if (this.isAI && this.engine.currentPlayer === this.ai.aiSymbol) return;

        if (this.engine.makeMove(index)) {
            this.movesCount++;
            this.audio.play(this.engine.board[index] === 'X' ? 'place-x' : 'place-o');
            this.ui.updateBoard(this.engine.board);
            this.checkRoundEnd();

            if (!this.engine.isGameOver && this.isAI) {
                this.updateHUD();
                this.aiTimer = setTimeout(() => this.makeAIMove(), Math.random() * 400 + 300); // 300-700ms delay for realism
            } else if (!this.engine.isGameOver) {
                this.updateHUD();
            }
        }
    }

    makeAIMove() {
        if (this.engine.isGameOver) return;
        
        const move = this.ai.getMove([...this.engine.board]);
        if (move !== -1) {
            this.engine.makeMove(move);
            this.movesCount++;
            this.audio.play(this.engine.board[move] === 'X' ? 'place-x' : 'place-o');
            this.ui.updateBoard(this.engine.board);
            this.checkRoundEnd();
            
            if (!this.engine.isGameOver) {
                this.updateHUD();
            }
        }
    }

    handleUndo() {
        if (this.engine.isGameOver || this.movesCount === 0) return;
        
        this.audio.play('click');
        if (this.isAI) {
            // Undo twice (AI's move and Player's move)
            if (this.aiTimer) clearTimeout(this.aiTimer);
            if (this.engine.undo()) {
                this.movesCount--;
                if (this.engine.currentPlayer === this.ai.aiSymbol) {
                    if (this.engine.undo()) this.movesCount--;
                }
            }
        } else {
            if (this.engine.undo()) this.movesCount--;
        }
        this.ui.updateBoard(this.engine.board);
        this.updateHUD();
    }

    handleHint() {
        if (this.engine.isGameOver) return;
        if (this.isAI && this.engine.currentPlayer === this.ai.aiSymbol) return;
        
        this.audio.play('click');
        // Temporarily use master AI to find best move for current player
        const tempAI = new AIController('master', this.engine.currentPlayer);
        const bestMove = tempAI.getBestMove([...this.engine.board]).index;
        
        if (bestMove !== -1) {
            const cell = this.ui.cells[bestMove];
            cell.style.boxShadow = 'inset 0 0 30px ' + (this.engine.currentPlayer === 'X' ? 'var(--color-x)' : 'var(--color-o)');
            setTimeout(() => {
                cell.style.boxShadow = '';
            }, 1000);
            this.ui.showToast('Best move highlighted');
        }
    }

    updateHUD() {
        this.ui.updateHUD(this.p1Score, this.p2Score, this.engine.currentPlayer, this.round, this.mode);
    }

    checkRoundEnd() {
        if (!this.engine.isGameOver) return;

        let winner = 'draw';
        if (this.engine.winLine) {
            winner = this.engine.winLine.winner;
            this.ui.drawWinLine(this.engine.winLine);
            
            if (winner === this.playerSymbol) {
                this.p1Score++;
                this.audio.play('win');
            } else {
                this.p2Score++;
                this.audio.play('lose');
            }
        } else {
            this.audio.play('draw');
        }

        setTimeout(() => this.processMatchResult(winner), 1500);
    }

    processMatchResult(winner) {
        let matchEnded = false;
        
        if (this.mode === 'quick') {
            matchEnded = true;
        } else if (this.mode === 'bo3') {
            if (this.p1Score === 2 || this.p2Score === 2) matchEnded = true;
            else this.round++;
        } else if (this.mode === 'bo5') {
            if (this.p1Score === 3 || this.p2Score === 3) matchEnded = true;
            else this.round++;
        }

        if (matchEnded) {
            let isWin = false, isDraw = false, isLoss = false;
            
            if (this.p1Score > this.p2Score) isWin = true;
            else if (this.p1Score < this.p2Score) isLoss = true;
            else isDraw = true;

            let ratingChange = 0;
            if (this.isAI) {
                // Calculate rating change based on difficulty
                const diffMulti = { 'easy': 0.5, 'medium': 1, 'hard': 1.5, 'master': 2.5 }[this.aiDifficulty];
                if (isWin) ratingChange = Math.round(20 * diffMulti);
                else if (isLoss) ratingChange = -Math.round(20 / diffMulti);
            }

            const stats = this.state.updateMatchResult(isWin, isDraw, ratingChange);
            
            let finalWinnerTxt = 'draw';
            if (isWin) finalWinnerTxt = this.playerSymbol;
            else if (isLoss) finalWinnerTxt = this.playerSymbol === 'X' ? 'O' : 'X';

            this.ui.updateResult(finalWinnerTxt, `${this.p1Score} - ${this.p2Score}`, this.movesCount, ratingChange, stats.xpEarned);
            this.ui.switchScreen('screen-result');
        } else {
            // Next round
            this.startRound();
        }
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    window.game = new GameController();
});
