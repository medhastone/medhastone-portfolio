import { AudioController } from './audio.js';
import { ColorDashGame } from './game.js';

const SKINS = [
    { id: 'neon', name: 'Neon Core', trail: 'dynamic', iconColor: '#00f0ff' },
    { id: 'ghost', name: 'Ghost Orb', trail: '#ffffff', iconColor: '#ffffff' },
    { id: 'plasma', name: 'Plasma Void', trail: '#bd00ff', iconColor: '#bd00ff' },
    { id: 'gold', name: 'Golden Sun', trail: '#ffaa00', iconColor: '#ffee00' },
    { id: 'emerald', name: 'Emerald', trail: '#00ff88', iconColor: '#00ff88' },
    { id: 'rainbow', name: 'Prism', trail: 'rainbow', iconColor: 'linear-gradient(45deg, red, yellow, green, cyan, blue, magenta)' }
];

class MainController {
    constructor() {
        this.audio = new AudioController();
        
        // Load persist state
        this.bestScore = parseInt(localStorage.getItem('colorDashBest')) || 0;
        this.totalGems = parseInt(localStorage.getItem('colorDashGems')) || 0;
        this.currentSkinId = localStorage.getItem('colorDashSkin') || 'neon';
        
        this.initUI();
        this.bindEvents();
        
        // Initialize Three.js Game
        this.game = new ColorDashGame(
            document.getElementById('game-container'), 
            {
                onMove: () => this.audio.playMove(),
                onJump: () => this.audio.playJump(),
                onGatePass: () => {
                    this.audio.playGate();
                    this.flashScreen(document.getElementById('color-indicator').style.borderBottomColor);
                },
                onMatch: () => this.audio.playMatch(),
                onGem: () => this.audio.playCoin(),
                onCrash: () => this.handleCrash(),
                updateHUD: (score, gems) => this.updateHUD(score, gems),
                onColorChange: (hexColor) => this.updateColorIndicator(hexColor)
            }
        );
        
        // Initial render for background
        this.game.renderer.render(this.game.scene, this.game.camera);
    }

    initUI() {
        this.dom = {
            screens: document.querySelectorAll('.screen'),
            homeBest: document.getElementById('home-best'),
            homeGems: document.getElementById('home-gems'),
            hudScore: document.getElementById('hud-score'),
            hudGems: document.getElementById('hud-gems'),
            colorIndicator: document.getElementById('color-indicator'),
            goScore: document.getElementById('go-score'),
            goBest: document.getElementById('go-best'),
            goGems: document.getElementById('go-gems'),
            skinsGrid: document.getElementById('skins-grid')
        };
        
        this.populateSkins();
        this.updateHomeUI();
    }

    populateSkins() {
        this.dom.skinsGrid.innerHTML = '';
        SKINS.forEach(skin => {
            const card = document.createElement('div');
            card.className = `skin-card ${this.currentSkinId === skin.id ? 'selected' : ''}`;
            card.onclick = () => this.selectSkin(skin.id);
            
            const preview = document.createElement('div');
            preview.className = 'skin-preview';
            preview.style.background = skin.iconColor;
            preview.style.color = skin.iconColor.includes('gradient') ? 'transparent' : skin.iconColor;
            
            const name = document.createElement('div');
            name.className = 'skin-name';
            name.innerText = skin.name;
            
            card.appendChild(preview);
            card.appendChild(name);
            this.dom.skinsGrid.appendChild(card);
        });
        
        const activeSkin = SKINS.find(s => s.id === this.currentSkinId) || SKINS[0];
        if (this.game) {
            this.game.setSkin(activeSkin);
        }
    }

    selectSkin(id) {
        this.currentSkinId = id;
        localStorage.setItem('colorDashSkin', id);
        this.populateSkins();
    }

    updateHomeUI() {
        this.dom.homeBest.innerText = this.bestScore;
        this.dom.homeGems.innerText = this.totalGems;
    }

    updateHUD(score, gems) {
        this.dom.hudScore.innerText = score;
        this.dom.hudGems.innerText = gems;
    }
    
    updateColorIndicator(hexColor) {
        this.dom.colorIndicator.style.borderBottomColor = hexColor;
        this.dom.colorIndicator.style.color = hexColor;
        this.dom.colorIndicator.style.textShadow = `0 0 10px ${hexColor}`;
    }

    flashScreen(color) {
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.inset = 0;
        flash.style.backgroundColor = color;
        flash.style.opacity = '0.3';
        flash.style.zIndex = '5';
        flash.style.pointerEvents = 'none';
        flash.style.transition = 'opacity 0.5s ease-out';
        document.getElementById('ui-layer').appendChild(flash);
        
        // Force reflow
        flash.offsetHeight;
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 500);
    }

    handleCrash() {
        this.audio.playCrash();
        
        // Save stats
        const finalScore = Math.floor(this.game.score);
        const sessionGems = this.game.gems;
        
        if (finalScore > this.bestScore) {
            this.bestScore = finalScore;
            localStorage.setItem('colorDashBest', this.bestScore);
        }
        
        this.totalGems += sessionGems;
        localStorage.setItem('colorDashGems', this.totalGems);
        
        // Screen Shake
        const container = document.getElementById('game-container');
        container.style.transform = 'translate(10px, 10px)';
        setTimeout(() => container.style.transform = 'translate(-10px, -10px)', 50);
        setTimeout(() => container.style.transform = 'translate(10px, -10px)', 100);
        setTimeout(() => container.style.transform = 'translate(0, 0)', 150);
        
        // Show Game Over
        setTimeout(() => {
            this.dom.goScore.innerText = finalScore;
            this.dom.goBest.innerText = this.bestScore;
            this.dom.goGems.innerText = `+${sessionGems}`;
            this.switchScreen('screen-gameover');
        }, 1000);
    }

    switchScreen(id) {
        this.dom.screens.forEach(s => s.classList.remove('active'));
        if (id) {
            document.getElementById(id).classList.add('active');
        }
    }

    startGame() {
        this.audio.init();
        this.audio.playClick ? this.audio.playClick() : null; // if implemented
        this.switchScreen('screen-hud');
        
        const activeSkin = SKINS.find(s => s.id === this.currentSkinId) || SKINS[0];
        this.game.setSkin(activeSkin);
        this.game.start();
    }

    bindEvents() {
        document.getElementById('btn-play').addEventListener('click', () => this.startGame());
        document.getElementById('btn-restart').addEventListener('click', () => this.startGame());
        
        document.getElementById('btn-skins').addEventListener('click', () => {
            this.audio.init();
            this.switchScreen('screen-skins');
        });
        
        document.getElementById('btn-close-skins').addEventListener('click', () => {
            this.switchScreen('screen-home');
        });

        document.getElementById('btn-home').addEventListener('click', () => {
            this.updateHomeUI();
            this.switchScreen('screen-home');
            this.game.resetState();
            this.game.renderer.render(this.game.scene, this.game.camera);
        });

        // Keyboard Controls
        window.addEventListener('keydown', (e) => {
            if (!this.game.isPlaying || this.game.isDead) return;
            switch(e.key) {
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    this.game.moveLeft();
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    this.game.moveRight();
                    break;
                case 'ArrowUp':
                case 'w':
                case 'W':
                case ' ':
                    this.game.jump();
                    break;
            }
        });

        // Pointer (Mouse + Touch) Controls
        let pointerStartX = 0;
        let pointerStartY = 0;
        let isDragging = false;
        
        window.addEventListener('pointerdown', (e) => {
            if (e.target.tagName !== 'BUTTON') window.focus(); // Get focus for keyboard
            pointerStartX = e.clientX;
            pointerStartY = e.clientY;
            isDragging = true;
        }, { passive: false });

        window.addEventListener('pointermove', (e) => {
            if (this.game.isPlaying && isDragging) e.preventDefault(); // prevent scroll/select
        }, { passive: false });

        window.addEventListener('pointerup', (e) => {
            if (!isDragging) return;
            isDragging = false;

            if (!this.game.isPlaying || this.game.isDead) return;
            
            const dx = e.clientX - pointerStartX;
            const dy = e.clientY - pointerStartY;
            
            if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
                // Swipe
                if (Math.abs(dx) > Math.abs(dy)) {
                    if (dx > 30) this.game.moveRight();
                    else this.game.moveLeft();
                } else {
                    if (dy < -30) {
                        this.game.jump();
                    }
                }
            } else {
                // Tap
                if (e.target.tagName !== 'BUTTON') {
                    this.game.jump();
                }
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new MainController();
});
