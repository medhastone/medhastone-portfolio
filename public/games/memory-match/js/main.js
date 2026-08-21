import { AudioController } from './audio.js';
import { ParticleSystem } from './particles.js';
import { LEVELS, ICONS } from './levels.js';

class GameController {
    constructor() {
        this.audio = new AudioController();
        this.particles = new ParticleSystem();
        
        this.state = {
            level: parseInt(localStorage.getItem('memoryMatchLevel')) || 1,
            bestScore: parseInt(localStorage.getItem('memoryMatchBest')) || 0,
            score: 0,
            moves: 0,
            combo: 0,
            lastMatchTime: 0,
            cards: [],
            flippedCards: [],
            matches: 0,
            isLocked: false,
            currentConfig: null
        };
        
        this.initUI();
        this.bindEvents();
    }

    initUI() {
        this.dom = {
            screens: document.querySelectorAll('.screen'),
            grid: document.getElementById('card-grid'),
            score: document.getElementById('score'),
            gameLevel: document.getElementById('game-level'),
            moves: document.getElementById('moves'),
            homeBestScore: document.getElementById('home-best-score'),
            homeLevel: document.getElementById('home-level'),
            comboDisplay: document.getElementById('combo-display'),
            finalScore: document.getElementById('final-score'),
            finalBest: document.getElementById('final-best'),
            finalMoves: document.getElementById('final-moves'),
            finalAccuracy: document.getElementById('final-accuracy'),
            gameoverTitle: document.getElementById('gameover-title')
        };
        this.updateHomeUI();
    }

    updateHomeUI() {
        this.dom.homeBestScore.innerText = this.state.bestScore;
        this.dom.homeLevel.innerText = this.state.level;
    }

    bindEvents() {
        document.getElementById('btn-play').addEventListener('click', () => {
            this.audio.playClick();
            this.startLevel(this.state.level);
        });
        
        document.getElementById('btn-quit').addEventListener('click', () => {
            this.audio.playClick();
            this.switchScreen('screen-home');
        });

        document.getElementById('btn-next-level').addEventListener('click', () => {
            this.audio.playClick();
            this.startLevel(this.state.level);
        });

        document.getElementById('btn-home').addEventListener('click', () => {
            this.audio.playClick();
            this.switchScreen('screen-home');
        });

        document.getElementById('btn-how-to-play').addEventListener('click', () => {
            this.audio.playClick();
            document.getElementById('screen-how-to-play').classList.add('active');
        });

        document.getElementById('btn-close-how').addEventListener('click', () => {
            this.audio.playClick();
            document.getElementById('screen-how-to-play').classList.remove('active');
        });

        const initAudio = () => { this.audio.init(); };
        window.addEventListener('pointerdown', initAudio, { once: true });
    }

    switchScreen(id) {
        this.dom.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        this.updateHomeUI();
    }

    startLevel(levelNum) {
        // Find config or generate for infinite levels
        let config = LEVELS.find(l => l.level === levelNum);
        if(!config) {
            config = LEVELS[LEVELS.length - 1]; // cap at max level grid
        }
        
        this.state.currentConfig = config;
        this.state.score = 0;
        this.state.moves = 0;
        this.state.combo = 0;
        this.state.matches = 0;
        this.state.flippedCards = [];
        this.state.isLocked = true; // Lock board during preview phase
        
        this.updateGameUI();
        this.generateBoard(config);
        this.switchScreen('screen-game');
    }

    updateGameUI() {
        this.dom.score.innerText = this.state.score;
        this.dom.moves.innerText = this.state.moves;
        this.dom.gameLevel.innerText = this.state.level;
    }

    generateBoard(config) {
        this.dom.grid.innerHTML = '';
        this.dom.grid.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;
        this.dom.grid.style.gridTemplateRows = `repeat(${config.rows}, 1fr)`;
        
        const totalCards = config.cols * config.rows;
        const pairsCount = totalCards / 2;
        
        // Select random icons
        const shuffledIcons = [...ICONS].sort(() => 0.5 - Math.random());
        const selectedIcons = shuffledIcons.slice(0, pairsCount);
        
        // Create pairs
        const cardDeck = [...selectedIcons, ...selectedIcons];
        cardDeck.sort(() => 0.5 - Math.random()); // Shuffle deck
        
        this.state.cards = [];
        
        cardDeck.forEach((icon, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.index = index;
            cardElement.dataset.icon = icon;
            
            cardElement.innerHTML = `
                <div class="card-face card-back"></div>
                <div class="card-face card-front">
                    <span class="material-icons">${icon}</span>
                </div>
            `;
            
            cardElement.addEventListener('click', (e) => this.onCardClick(e, cardElement, icon));
            this.dom.grid.appendChild(cardElement);
            this.state.cards.push({ id: index, icon, element: cardElement, matched: false });
        });
        
        // Intro animation and memorization phase
        const cards = this.dom.grid.querySelectorAll('.memory-card');
        
        // Show all cards initially face up
        cards.forEach(card => card.classList.add('flipped'));

        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 30);
            
            // Restore transition for flip after intro
            setTimeout(() => {
                card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.4s';
                card.style.transform = ''; // IMPORTANT: Remove inline transform so CSS rotation works
            }, cards.length * 30 + 400);
        });

        // Hide cards after memorization time
        const introDuration = cards.length * 30 + 400;
        const memorizeTime = 5000; // Give exactly 5 seconds for all levels

        setTimeout(() => {
            cards.forEach(card => {
                card.classList.remove('flipped');
            });
            
            // Wait for the flip-back animation to finish before unlocking
            setTimeout(() => {
                this.state.isLocked = false;
            }, 600);
        }, introDuration + memorizeTime);
    }

    onCardClick(e, cardElement, icon) {
        if(this.state.isLocked) return;
        if(cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) return;
        
        this.audio.playFlip();
        cardElement.classList.add('flipped');
        
        this.state.flippedCards.push({ element: cardElement, icon });
        
        if(this.state.flippedCards.length === 2) {
            this.state.moves++;
            this.updateGameUI();
            this.checkMatch();
        }
    }

    checkMatch() {
        this.state.isLocked = true;
        const [card1, card2] = this.state.flippedCards;
        
        if(card1.icon === card2.icon) {
            // Match
            this.handleMatch(card1.element, card2.element);
        } else {
            // No match
            this.handleMismatch(card1.element, card2.element);
        }
    }

    handleMatch(el1, el2) {
        const now = Date.now();
        const timeSinceLastMatch = now - this.state.lastMatchTime;
        this.state.lastMatchTime = now;
        
        // Combo logic
        if(this.state.combo > 0 && timeSinceLastMatch < 5000) {
            this.state.combo++;
        } else {
            this.state.combo = 1;
        }

        const basePoints = 100;
        const comboMultiplier = this.state.combo;
        const points = basePoints * comboMultiplier;
        
        this.state.score += points;
        this.state.matches++;
        
        this.audio.playMatch();
        if(comboMultiplier > 1) {
            this.audio.playCombo(comboMultiplier);
            this.showCombo(comboMultiplier);
        }

        // Add matched classes
        el1.classList.add('matched');
        el2.classList.add('matched');
        
        // Particles
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();
        this.particles.spawn(rect1.left + rect1.width/2, rect1.top + rect1.height/2, '#00f0ff', 15 + comboMultiplier * 2);
        this.particles.spawn(rect2.left + rect2.width/2, rect2.top + rect2.height/2, '#bd00ff', 15 + comboMultiplier * 2);

        this.updateGameUI();
        this.state.flippedCards = [];
        this.state.isLocked = false;
        
        this.checkWin();
    }

    handleMismatch(el1, el2) {
        this.state.combo = 0; // reset combo
        
        el1.classList.add('error');
        el2.classList.add('error');
        this.audio.playError();
        
        setTimeout(() => {
            el1.classList.remove('flipped', 'error');
            el2.classList.remove('flipped', 'error');
            this.state.flippedCards = [];
            this.state.isLocked = false;
        }, 1000);
    }

    showCombo(multiplier) {
        this.dom.comboDisplay.innerText = `COMBO x${multiplier}`;
        this.dom.comboDisplay.classList.add('show');
        setTimeout(() => {
            this.dom.comboDisplay.classList.remove('show');
        }, 1500);
    }

    checkWin() {
        const totalPairs = (this.state.currentConfig.cols * this.state.currentConfig.rows) / 2;
        if(this.state.matches === totalPairs) {
            setTimeout(() => {
                this.audio.playLevelComplete();
                this.levelComplete();
            }, 500);
        }
    }

    levelComplete() {
        // Calculate Accuracy
        const totalPairs = (this.state.currentConfig.cols * this.state.currentConfig.rows) / 2;
        const minMoves = totalPairs;
        let accuracy = Math.round((minMoves / this.state.moves) * 100);
        if(accuracy > 100) accuracy = 100;

        // Save Best
        if(this.state.score > this.state.bestScore) {
            this.state.bestScore = this.state.score;
            localStorage.setItem('memoryMatchBest', this.state.bestScore);
        }
        
        // Next Level
        this.state.level++;
        localStorage.setItem('memoryMatchLevel', this.state.level);
        
        // Update DOM
        this.dom.gameoverTitle.innerText = `LEVEL ${this.state.level - 1} CLEARED!`;
        this.dom.finalScore.innerText = this.state.score;
        this.dom.finalBest.innerText = this.state.bestScore;
        this.dom.finalMoves.innerText = this.state.moves;
        this.dom.finalAccuracy.innerText = `${accuracy}%`;
        
        this.switchScreen('screen-gameover');
        
        // Big particle explosion
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        this.particles.spawn(x, y, '#00f0ff', 40);
        this.particles.spawn(x, y, '#ff007f', 40);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new GameController();
});
