import { DictionaryManager } from './Dictionary.js';
import { GameEngine } from './Engine.js';
import { UIManager } from './UI.js';
import { InputManager } from './Input.js';
import { StateManager } from './State.js';
import { AudioManager } from './Audio.js';

class GameController {
    constructor() {
        this.dict = new DictionaryManager();
        this.engine = new GameEngine(this.dict);
        this.ui = new UIManager();
        this.state = new StateManager();
        this.audio = new AudioManager();
        
        this.timer = 0;
        this.timerInterval = null;
        this.mode = 'rush';
        
        this.input = new InputManager(this.ui, {
            onSelect: () => this.audio.play('select'),
            onPreview: (indices) => this.handlePreview(indices),
            onSubmit: (indices) => this.handleSubmit(indices)
        });

        this.bindEvents();
        this.updateMenuStats();
    }

    bindEvents() {
        document.body.addEventListener('click', () => {
            this.audio.init();
        }, { once: true });

        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.audio.play('click');
                const action = e.currentTarget.dataset.action;
                
                if (action === 'nav-menu') {
                    this.endGame();
                    this.updateMenuStats();
                    this.ui.switchScreen('screen-menu');
                } else if (action === 'nav-stats') {
                    this.updateMenuStats();
                    this.ui.switchScreen('screen-stats');
                } else if (action === 'play-rush') {
                    this.startGame('rush');
                } else if (action === 'play-zen') {
                    this.startGame('zen');
                } else if (action === 'btn-hint') {
                    if (this.engine.score >= 20) {
                        const hintPath = this.engine.getHint();
                        if (hintPath) {
                            this.engine.score -= 20;
                            this.ui.showHint(hintPath);
                            this.ui.updateHUD(this.engine.score, this.timer, this.engine.combo);
                            this.audio.play('select');
                        } else {
                            this.ui.setPreview('NO WORDS LEFT', false);
                            setTimeout(() => this.ui.setPreview('', false), 2000);
                        }
                    } else {
                        this.ui.setPreview('NEED 20 SCORE', false);
                        setTimeout(() => this.ui.setPreview('', false), 2000);
                    }
                } else if (action === 'btn-shuffle') {
                    if (this.engine.score >= 50) {
                        this.engine.score -= 50;
                        this.engine.generateBoard(this.engine.boardSize);
                        this.ui.initBoard(this.engine);
                        this.ui.updateHUD(this.engine.score, this.timer, this.engine.combo);
                    }
                }
            });
        });
    }

    updateMenuStats() {
        const data = this.state.data;
        document.getElementById('menu-rank').innerText = this.state.getRank();
        const xpPercent = (data.xp % 1000) / 10;
        document.getElementById('menu-xp').style.width = `${xpPercent}%`;
        
        document.getElementById('st-played').innerText = data.gamesPlayed;
        document.getElementById('st-words').innerText = data.wordsFound;
        document.getElementById('st-best').innerText = data.bestScore;
        document.getElementById('st-longest').innerText = data.bestWord || '-';
        document.getElementById('st-streak').innerText = data.streak;
    }

    startGame(mode) {
        this.mode = mode;
        this.timer = mode === 'rush' ? 90 : 0; // 90 seconds for rush
        
        const size = 4; // Can be linked to difficulty
        this.engine.generateBoard(size);
        this.ui.initBoard(this.engine);
        this.ui.updateHUD(this.engine.score, this.timer, this.engine.combo);
        this.ui.updateFoundWordsList([]);
        this.ui.setPreview('', false);
        
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => this.tick(), 1000);
        
        this.ui.switchScreen('screen-game');
    }

    tick() {
        if (this.mode === 'rush') {
            this.timer--;
            if (this.timer <= 0) {
                this.timer = 0;
                this.endGame();
                return;
            }
        } else {
            this.timer++;
        }
        this.ui.updateHUD(this.engine.score, this.timer, this.engine.combo);
    }

    endGame() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        const { newRank } = this.state.updatePostGame(this.engine.score, Array.from(this.engine.foundWords));
        this.ui.showGameOver(this.engine.score, newRank, this.engine.foundWords.size);
    }

    handlePreview(indices) {
        if (indices.length === 0) {
            this.ui.setPreview('', false);
            return;
        }
        const word = this.engine.getWordFromIndices(indices);
        const isPrefix = this.dict.isPrefix(word);
        this.ui.setPreview(word, isPrefix && word.length >= 3);
    }

    handleSubmit(indices) {
        const result = this.engine.submitWord(indices);
        
        if (result.valid) {
            this.audio.play('valid');
            this.ui.showWordParticles(indices);
            this.ui.updateFoundWordsList(Array.from(this.engine.foundWords));
        } else {
            if (result.reason !== 'too_short') {
                this.audio.play('invalid');
            }
        }
        
        this.ui.setPreview('', false);
        this.ui.updateHUD(this.engine.score, this.timer, this.engine.combo);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new GameController();
});
