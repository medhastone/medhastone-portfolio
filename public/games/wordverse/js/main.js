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
        this.difficulty = 'easy';
        
        this.input = new InputManager(this.ui, {
            onSelect: () => this.audio.play('select'),
            onPreview: (indices) => this.handlePreview(indices),
            onSubmit: (indices) => this.handleSubmit(indices)
        });

        this.bindEvents();
        this.updateMenuStats();
        this.ui.updateCoins(this.state.data.coins);
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
                } else if (action === 'set-diff') {
                    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.difficulty = e.currentTarget.dataset.diff;
                } else if (action === 'nav-stats') {
                    this.updateMenuStats();
                    this.ui.switchScreen('screen-stats');
                } else if (action === 'next-puzzle') {
                    this.startNextPuzzle();
                } else if (action === 'play-rush') {
                    this.startGame('rush');
                } else if (action === 'play-zen') {
                    this.startGame('zen');
                } else if (action === 'btn-hint') {
                    if (this.state.data.coins >= 20) {
                        const hintPath = this.engine.getHint();
                        if (hintPath) {
                            this.state.data.coins -= 20;
                            this.state.save();
                            this.ui.updateCoins(this.state.data.coins);
                            this.ui.showHint(hintPath);
                            this.audio.play('select');
                        } else {
                            this.ui.setPreview('NO WORDS LEFT', false);
                            setTimeout(() => this.ui.setPreview('', false), 2000);
                        }
                    } else {
                        this.ui.setPreview('NEED 20 COINS', false);
                        setTimeout(() => this.ui.setPreview('', false), 2000);
                    }
                } else if (action === 'btn-shuffle') {
                    if (this.state.data.coins >= 50) {
                        this.state.data.coins -= 50;
                        this.state.save();
                        this.ui.updateCoins(this.state.data.coins);
                        this.engine.generateBoard(this.difficulty);
                        this.ui.initBoard(this.engine);
                        this.ui.updateHUD(this.engine.score, this.timer, this.engine.combo);
                    } else {
                        this.ui.setPreview('NEED 50 COINS', false);
                        setTimeout(() => this.ui.setPreview('', false), 2000);
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
        
        if (mode === 'rush') {
            if (this.difficulty === 'easy') this.timer = 120;
            else if (this.difficulty === 'medium') this.timer = 90;
            else if (this.difficulty === 'hard') this.timer = 60;
            else if (this.difficulty === 'master') this.timer = 45;
        } else {
            this.timer = 0;
        }
        
        this.engine.score = 0;
        this.engine.generateBoard(this.difficulty);
        this.ui.initBoard(this.engine);
        this.ui.updateHUD(this.engine.score, this.timer, this.engine.combo);
        this.ui.updateFoundWordsList([]);
        this.ui.updateTargetWords(this.engine.foundWords);
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
        
        const { newRank, coinsEarned } = this.state.updatePostGame(this.engine.score, Array.from(this.engine.foundWords));
        this.ui.updateCoins(this.state.data.coins);
        this.ui.showGameOver(this.engine.score, newRank, this.engine.foundWords.size, coinsEarned);
    }

    handleLevelClear() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // Give 50 coins bonus
        const bonusCoins = 50;
        this.state.data.coins += bonusCoins;
        this.state.save();
        this.ui.updateCoins(this.state.data.coins);
        
        // Force the screen to show with maximum prejudice
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const clrScreen = document.getElementById('screen-level-cleared');
        if (clrScreen) {
            clrScreen.classList.add('active');
            clrScreen.style.opacity = '1';
            clrScreen.style.pointerEvents = 'auto';
            clrScreen.style.zIndex = '9999';
        } else {
            // Fallback if HTML is somehow broken
            alert('PUZZLE CLEARED! +50 COINS');
            this.startNextPuzzle();
        }
    }

    startNextPuzzle() {
        // Give time bonus for rush mode
        if (this.mode === 'rush') {
            this.timer += 30; // +30 seconds
        }
        
        this.engine.generateBoard(this.difficulty);
        this.ui.initBoard(this.engine);
        this.ui.updateHUD(this.engine.score, this.timer, this.engine.combo);
        this.ui.updateFoundWordsList([]);
        this.ui.updateTargetWords(this.engine.foundWords);
        this.ui.setPreview('LEVEL UP!', false);
        setTimeout(() => this.ui.setPreview('', false), 1500);
        
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => this.tick(), 1000);
        
        this.ui.switchScreen('screen-game');
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
            this.ui.updateTargetWords(this.engine.foundWords);
            this.ui.setPreview('', false);
            
            // Foolproof check based on what the user actually sees
            const targetWordsInDOM = document.querySelectorAll('.target-word');
            const foundTargetWordsInDOM = document.querySelectorAll('.target-word.found');
            
            if (targetWordsInDOM.length > 0 && targetWordsInDOM.length === foundTargetWordsInDOM.length) {
                setTimeout(() => this.handleLevelClear(), 500);
            }
        } else {
            if (result.reason === 'too_short') {
                this.ui.setPreview('3+ LETTERS NEEDED', false);
                setTimeout(() => {
                    const preview = document.getElementById('word-preview');
                    if(preview && preview.innerText === '3+ LETTERS NEEDED') this.ui.setPreview('', false);
                }, 1500);
            } else if (result.reason === 'duplicate') {
                this.ui.setPreview('ALREADY FOUND', false);
                setTimeout(() => {
                    const preview = document.getElementById('word-preview');
                    if(preview && preview.innerText === 'ALREADY FOUND') this.ui.setPreview('', false);
                }, 1500);
            } else {
                this.audio.play('invalid');
                this.ui.setPreview('', false);
            }
        }
        
        this.ui.updateHUD(this.engine.score, this.timer, this.engine.combo);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new GameController();
});
