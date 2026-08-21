import { MathEngine } from './Engine.js';
import { UIManager } from './UI.js';
import { AudioController } from './audio.js';

class GameController {
    constructor() {
        try {
            this.engine = new MathEngine();
            this.audio = new AudioController();
            this.previousValidState = new Map();

            this.ui = new UIManager(this.engine, {
                onMove: (actionType) => this.handleMove(actionType)
            });

            this.currentDifficulty = 'easy';
            this.seconds = 0;
            this.timerInterval = null;
            
            this.setupButtons();
            setTimeout(() => this.ui.switchScreen('screen-home'), 100);

            const initAudio = () => {
                try { this.audio.init(); } catch(e) {}
            };
            window.addEventListener('click', initAudio, { once: true });
            window.addEventListener('touchstart', initAudio, { once: true });
            
        } catch(e) {
            console.error("Initialization error:", e);
        }
    }

    setupButtons() {
        document.querySelectorAll('button[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                try { this.audio.playSelect(); } catch(err) { console.warn(err); }
                
                const action = e.currentTarget.dataset.action;
                if (action === 'play-game') {
                    this.currentDifficulty = e.currentTarget.dataset.diff;
                    this.startLevel();
                } else if (action === 'nav-home') {
                    this.stopTimer();
                    this.ui.switchScreen('screen-home');
                } else if (action === 'next-level') {
                    this.startLevel();
                }
            });
        });
    }

    startLevel() {
        this.stopTimer();
        this.ui.switchScreen('screen-loading');
        
        document.getElementById('game-diff-text').innerText = this.currentDifficulty;
        document.getElementById('game-diff-text').className = 'diff-indicator text-' + this.currentDifficulty;
        
        setTimeout(() => {
            try {
                this.engine.generatePuzzle(this.currentDifficulty);
                this.ui.selectedTileId = null;
                this.previousValidState.clear();
                
                this.engine.validateBoard();
                this.updatePreviousValidState();

                this.ui.render();
                this.ui.switchScreen('screen-game');
                this.startTimer();
            } catch(err) {
                console.error("Error starting level:", err);
            }
        }, 150);
    }

    startTimer() {
        this.seconds = 0;
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
            this.seconds++;
            this.updateTimerDisplay();
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
    }

    updateTimerDisplay() {
        const m = Math.floor(this.seconds / 60).toString().padStart(2, '0');
        const s = (this.seconds % 60).toString().padStart(2, '0');
        document.getElementById('game-timer').innerText = m + ':' + s;
    }

    updatePreviousValidState() {
        this.previousValidState.clear();
        for (let r = 0; r < this.engine.boardRows; r++) {
            for (let c = 0; c < this.engine.boardCols; c++) {
                const cell = this.engine.grid[r][c];
                if (cell && cell.type === 'number' && !cell.fixed) {
                    const key = r + '-' + c;
                    this.previousValidState.set(key, cell.valid);
                }
            }
        }
    }

    handleMove(actionType) {
        try {
            // ALWAYS play sounds immediately based on the action
            if (actionType === 'select') this.audio.playSelect();
            else if (actionType === 'remove') this.audio.playRemove();
            else if (actionType === 'place') this.audio.playDrop();
            
            const isWin = this.engine.validateBoard();
            
            if (actionType === 'place') {
                let placedCorrectly = false;
                let placedIncorrectly = false;

                for (let r = 0; r < this.engine.boardRows; r++) {
                    for (let c = 0; c < this.engine.boardCols; c++) {
                        const cell = this.engine.grid[r][c];
                        if (cell && cell.type === 'number' && !cell.fixed) {
                            const key = r + '-' + c;
                            const prevValid = this.previousValidState.get(key);
                            
                            if (cell.valid === true && prevValid !== true) {
                                placedCorrectly = true;
                            } else if (cell.valid === false && prevValid !== false) {
                                if (cell.currentTile) placedIncorrectly = true;
                            }
                        }
                    }
                }

                // Play the special correct/error sounds slightly after the placement drop sound
                if (placedCorrectly) setTimeout(() => this.audio.playCorrect(), 150);
                else if (placedIncorrectly) setTimeout(() => this.audio.playError(), 150);
            }

            this.updatePreviousValidState();
            this.ui.render();
            
            if (isWin) {
                this.stopTimer();
                setTimeout(() => this.handleWin(), 600);
            }
        } catch(err) {
            console.error("Move error:", err);
        }
    }

    handleWin() {
        try { this.audio.playWin(); } catch(e) {}
        const m = Math.floor(this.seconds / 60).toString().padStart(2, '0');
        const s = (this.seconds % 60).toString().padStart(2, '0');
        document.getElementById('res-time').innerText = m + ':' + s;
        
        let score = 100;
        if(this.currentDifficulty === 'medium') score = 250;
        if(this.currentDifficulty === 'hard') score = 500;
        if(this.currentDifficulty === 'genius') score = 1000;
        
        const timeBonus = Math.max(0, 300 - this.seconds);
        const finalScore = score + timeBonus;
        
        document.getElementById('res-score').innerText = "+" + finalScore;
        this.ui.switchScreen('screen-result');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new GameController();
});
