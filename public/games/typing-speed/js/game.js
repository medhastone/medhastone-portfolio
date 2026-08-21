class Game {
    constructor(ui) {
        this.ui = ui;
        this.isActive = false;
        this.mode = ''; // 'quick', 'falling', 'sentence'
        
        // Typing State
        this.currentWords = [];
        this.typedString = "";
        this.activeWordIndex = 0;
        
        // Stats
        this.totalTyped = 0;
        this.correctTyped = 0;
        this.errors = 0;
        this.startTime = 0;
        this.timeLimit = 0;
        this.timer = null;
        
        // Falling mode specifics
        this.fallingWords = [];
        this.fallingScore = 0;
        this.health = 3;
        this.combo = 1;
        this.fallingCanvas = document.getElementById('falling-canvas');
        this.fCtx = this.fallingCanvas.getContext('2d');
        this.fallingLoopId = null;
        this.fallingCurrentInput = "";

        this.bindInput();
        this.resizeFalling();
        window.addEventListener('resize', () => this.resizeFalling());
    }

    bindInput() {
        window.addEventListener('keydown', (e) => {
            if (!this.isActive) return;
            
            if (e.key === 'Escape') {
                this.endGame(true);
                return;
            }
            
            // Ignore modifiers
            if (e.ctrlKey || e.altKey || e.metaKey || e.key.length > 1 && e.key !== 'Backspace' && e.key !== ' ') return;
            
            if(this.mode === 'falling') {
                this.handleFallingInput(e);
            } else {
                this.handleQuickInput(e);
            }
        });
    }

    startQuickTest(timeLimit, isSentence = false) {
        this.mode = isSentence ? 'sentence' : 'quick';
        this.timeLimit = timeLimit;
        this.isActive = true;
        this.totalTyped = 0;
        this.correctTyped = 0;
        this.errors = 0;
        this.activeWordIndex = 0;
        this.typedString = "";
        
        if (isSentence) {
            const sentence = getRandomSentence();
            this.currentWords = sentence.split(' ');
            this.timeLimit = 0; // Count up instead of down
        } else {
            this.currentWords = getRandomWords(50);
        }
        
        this.renderText();
        this.startTime = Date.now();
        
        if (this.timeLimit > 0) {
            document.getElementById('hud-time').innerText = this.timeLimit;
            this.timer = setInterval(() => {
                let elapsed = Math.floor((Date.now() - this.startTime) / 1000);
                let remaining = this.timeLimit - elapsed;
                document.getElementById('hud-time').innerText = remaining;
                
                this.updateStats(elapsed);
                
                if (remaining <= 0) {
                    this.endGame();
                }
            }, 1000);
        } else {
            document.getElementById('hud-time').innerText = "0";
            this.timer = setInterval(() => {
                let elapsed = Math.floor((Date.now() - this.startTime) / 1000);
                document.getElementById('hud-time').innerText = elapsed;
                this.updateStats(elapsed);
            }, 1000);
        }
    }

    renderText() {
        const wrapper = document.getElementById('words-wrapper');
        wrapper.innerHTML = this.currentWords.map((word, wIdx) => {
            let activeCls = wIdx === this.activeWordIndex ? 'active' : '';
            let letters = word.split('').map((l, lIdx) => {
                let lCls = '';
                if (wIdx === this.activeWordIndex && lIdx === this.typedString.length) lCls = 'active-letter';
                return `<span class="letter ${lCls}">${l}</span>`;
            }).join('');
            
            // Add a space character at the end for typing spaces
            let spaceCls = wIdx === this.activeWordIndex && this.typedString.length === word.length ? 'active-letter' : '';
            return `<div class="word ${activeCls}" id="w-${wIdx}">${letters}<span class="letter space-char ${spaceCls}">&nbsp;</span></div>`;
        }).join('');
        
        this.scrollText();
    }

    updateTextVisuals() {
        const activeWordEl = document.getElementById(`w-${this.activeWordIndex}`);
        if(!activeWordEl) return;
        
        const targetWord = this.currentWords[this.activeWordIndex];
        const letterEls = activeWordEl.querySelectorAll('.letter:not(.space-char)');
        const spaceEl = activeWordEl.querySelector('.space-char');
        
        // Reset active
        activeWordEl.querySelectorAll('.active-letter').forEach(el => el.classList.remove('active-letter'));
        
        for (let i = 0; i < targetWord.length; i++) {
            let el = letterEls[i];
            el.className = 'letter'; // reset
            if (i < this.typedString.length) {
                if (this.typedString[i] === targetWord[i]) {
                    el.classList.add('correct');
                } else {
                    el.classList.add('incorrect');
                }
            } else if (i === this.typedString.length) {
                el.classList.add('active-letter');
            }
        }
        
        // Handle space char highlight
        if (this.typedString.length >= targetWord.length) {
            spaceEl.className = 'letter space-char';
            if (this.typedString.length === targetWord.length) {
                spaceEl.classList.add('active-letter');
            } else {
                spaceEl.classList.add('incorrect'); // typed too many chars
            }
        }
    }

    scrollText() {
        const wrapper = document.getElementById('words-wrapper');
        const activeEl = document.getElementById(`w-${this.activeWordIndex}`);
        if(activeEl && wrapper) {
            const offset = activeEl.offsetTop;
            wrapper.style.transform = `translateY(-${offset}px)`;
        }
    }

    handleQuickInput(e) {
        if (e.key === 'Backspace') {
            if (this.typedString.length > 0) {
                this.typedString = this.typedString.slice(0, -1);
                audio.type();
            } else if (this.activeWordIndex > 0) {
                // Cannot go back to previous word if it was submitted correctly
                // Optional: allow going back to fix mistakes. Keep it simple: no go back.
            }
        } else if (e.key === ' ') {
            e.preventDefault();
            const targetWord = this.currentWords[this.activeWordIndex];
            
            // Check correctness of the word
            let correct = true;
            for(let i=0; i<targetWord.length; i++){
                if(this.typedString[i] !== targetWord[i]) correct = false;
            }
            if(this.typedString.length !== targetWord.length) correct = false;
            
            if (correct) {
                this.correctTyped += targetWord.length + 1; // +1 for space
                audio.wordComplete();
                this.spawnParticlesAtWord();
            } else {
                this.errors++;
                audio.error();
            }
            
            this.totalTyped += targetWord.length + 1;
            
            this.activeWordIndex++;
            this.typedString = "";
            
            // Regenerate words if running out (infinite scroll)
            if (this.mode === 'quick' && this.activeWordIndex >= this.currentWords.length - 10) {
                this.currentWords = this.currentWords.concat(getRandomWords(50));
                this.renderText();
            } else {
                // If sentence mode and finished
                if (this.mode === 'sentence' && this.activeWordIndex >= this.currentWords.length) {
                    this.endGame();
                    return;
                }
                
                // Fast DOM update for active class
                document.querySelectorAll('.word.active').forEach(el => el.classList.remove('active'));
                const newActive = document.getElementById(`w-${this.activeWordIndex}`);
                if(newActive) newActive.classList.add('active');
            }
            
            this.scrollText();
        } else {
            this.typedString += e.key;
            audio.type();
            
            // Real-time error check for sound
            const targetWord = this.currentWords[this.activeWordIndex];
            let charIndex = this.typedString.length - 1;
            if(charIndex < targetWord.length) {
                if(this.typedString[charIndex] !== targetWord[charIndex]) {
                    audio.error();
                    this.errors++;
                }
            } else {
                audio.error();
                this.errors++;
            }
        }
        
        this.updateTextVisuals();
    }

    spawnParticlesAtWord() {
        const el = document.querySelector('.active-letter') || document.querySelector('.word.active');
        if(el) {
            const rect = el.getBoundingClientRect();
            particles.spawn(rect.left + rect.width/2, rect.top + rect.height/2, 15);
        }
    }

    updateStats(elapsed) {
        if(elapsed <= 0) return;
        let mins = elapsed / 60;
        let wpm = Math.round((this.correctTyped / 5) / mins);
        let acc = this.totalTyped > 0 ? Math.round(((this.totalTyped - this.errors) / this.totalTyped) * 100) : 100;
        if(acc < 0) acc = 0;
        
        document.getElementById('hud-wpm').innerText = wpm;
        document.getElementById('hud-acc').innerText = acc;
    }

    // --- Falling Words Mode ---
    
    startFallingMode() {
        this.mode = 'falling';
        this.isActive = true;
        this.fallingWords = [];
        this.fallingScore = 0;
        this.health = 3;
        this.combo = 1;
        this.fallingCurrentInput = "";
        
        document.getElementById('hud-health').innerText = this.health;
        document.getElementById('hud-score').innerText = this.fallingScore;
        document.getElementById('hud-combo').innerText = `x${this.combo}`;
        document.getElementById('falling-input-display').innerText = "";
        
        this.startTime = Date.now();
        this.totalTyped = 0;
        this.correctTyped = 0;
        this.errors = 0;
        
        this.resizeFalling();
        this.fallingLoopId = requestAnimationFrame(() => this.fallingLoop());
    }

    resizeFalling() {
        this.fallingCanvas.width = window.innerWidth;
        this.fallingCanvas.height = window.innerHeight;
    }

    handleFallingInput(e) {
        if (e.key === 'Backspace') {
            if (this.fallingCurrentInput.length > 0) {
                this.fallingCurrentInput = this.fallingCurrentInput.slice(0, -1);
                audio.type();
            }
        } else if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.checkFallingWord();
        } else {
            this.fallingCurrentInput += e.key;
            audio.type();
            
            // Auto check if matched
            this.checkFallingWord();
        }
        document.getElementById('falling-input-display').innerText = this.fallingCurrentInput;
    }

    checkFallingWord() {
        let matchedIndex = -1;
        for (let i = 0; i < this.fallingWords.length; i++) {
            if (this.fallingWords[i].text === this.fallingCurrentInput) {
                matchedIndex = i;
                break;
            }
        }
        
        if (matchedIndex !== -1) {
            let w = this.fallingWords[matchedIndex];
            particles.spawn(w.x, w.y, 30);
            audio.wordComplete();
            
            this.correctTyped += w.text.length;
            this.totalTyped += w.text.length;
            
            this.fallingScore += 10 * this.combo;
            this.combo++;
            
            this.fallingWords.splice(matchedIndex, 1);
            this.fallingCurrentInput = "";
            
            document.getElementById('hud-score').innerText = this.fallingScore;
            document.getElementById('hud-combo').innerText = `x${this.combo}`;
            document.getElementById('falling-input-display').innerText = "";
        }
    }

    fallingLoop() {
        if (!this.isActive) return;
        
        this.fCtx.clearRect(0, 0, this.fallingCanvas.width, this.fallingCanvas.height);
        
        let elapsed = (Date.now() - this.startTime) / 1000;
        let spawnRate = Math.max(0.5, 2.0 - (elapsed * 0.01)); // gets faster
        
        if (Math.random() < 0.01 / spawnRate) {
            const text = getRandomWords(1)[0];
            this.fCtx.font = "24px JetBrains Mono";
            let tw = this.fCtx.measureText(text).width;
            
            this.fallingWords.push({
                text: text,
                x: Math.random() * (this.fallingCanvas.width - tw - 40) + 20,
                y: -30,
                speed: Math.random() * 1 + 1 + (elapsed * 0.02)
            });
        }
        
        this.fCtx.font = "24px JetBrains Mono";
        this.fCtx.textAlign = "left";
        
        for (let i = this.fallingWords.length - 1; i >= 0; i--) {
            let w = this.fallingWords[i];
            w.y += w.speed;
            
            // Draw highlight if it matches partial input
            if (this.fallingCurrentInput.length > 0 && w.text.startsWith(this.fallingCurrentInput)) {
                this.fCtx.fillStyle = particles.getThemeColor();
                this.fCtx.fillText(w.text, w.x, w.y);
                
                this.fCtx.fillStyle = "#fff";
                this.fCtx.fillText(this.fallingCurrentInput, w.x, w.y);
            } else {
                this.fCtx.fillStyle = "#94a3b8";
                this.fCtx.fillText(w.text, w.x, w.y);
            }
            
            if (w.y > this.fallingCanvas.height) {
                this.health--;
                this.combo = 1;
                this.errors++;
                audio.error();
                document.getElementById('hud-health').innerText = this.health;
                document.getElementById('hud-combo').innerText = `x${this.combo}`;
                
                particles.spawn(w.x + 20, this.fallingCanvas.height - 10, 20, '#ef4444');
                this.fallingWords.splice(i, 1);
                
                if (this.health <= 0) {
                    this.endGame();
                    return;
                }
            }
        }
        
        this.fallingLoopId = requestAnimationFrame(() => this.fallingLoop());
    }

    endGame(cancelled = false) {
        this.isActive = false;
        clearInterval(this.timer);
        if(this.fallingLoopId) cancelAnimationFrame(this.fallingLoopId);
        
        if (cancelled) {
            this.ui.switchScreen('screen-modes');
            return;
        }
        
        let elapsed = (Date.now() - this.startTime) / 1000;
        if(elapsed < 1) elapsed = 1; // prevent div by zero
        
        let mins = elapsed / 60;
        let wpm = Math.round((this.correctTyped / 5) / mins);
        let acc = this.totalTyped > 0 ? Math.round(((this.totalTyped - this.errors) / this.totalTyped) * 100) : 0;
        if(acc < 0) acc = 0;
        
        if(this.mode === 'falling') {
            wpm = this.fallingScore; // Display score instead of WPM for falling
            document.querySelector('#result-wpm').previousElementSibling.innerText = "SCORE";
        } else {
            document.querySelector('#result-wpm').previousElementSibling.innerText = "WPM";
        }
        
        let xpEarned = Math.floor(wpm * (acc / 100)) + (this.mode === 'falling' ? Math.floor(this.fallingScore/10) : 0);
        
        this.ui.showResult(wpm, acc, this.errors, xpEarned);
    }
}
