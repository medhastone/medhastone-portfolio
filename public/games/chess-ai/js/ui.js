class UI {
    constructor() {
        this.screens = document.querySelectorAll('.screen');
        this.stats = this.loadStats();
        
        this.themes = [
            { id: 'classic', name: 'Wood Classic', class: 'theme-classic', c1: '#f0d9b5', c2: '#b58863' },
            { id: 'marble', name: 'Royal Marble', class: 'theme-marble', c1: '#e2e8f0', c2: '#64748b' },
            { id: 'cyber', name: 'Cyber Neon', class: 'theme-cyber', c1: '#1a1a2e', c2: '#16213e' }
        ];

        this.diffNames = { 1: 'Beginner', 2: 'Novice', 3: 'Intermediate', 4: 'Advanced', 5: 'Master', 6: 'Grandmaster' };
        
        this.bindEvents();
        this.updateMenuStats();
        this.applyTheme(this.stats.theme || 'classic');
        
        this.initThreeJSBg();
    }

    initThreeJSBg() {
        try {
            const container = document.getElementById('three-bg');
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
            
            // Particles
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            for ( let i = 0; i < 2000; i ++ ) {
                vertices.push(
                    THREE.MathUtils.randFloatSpread( 2000 ),
                    THREE.MathUtils.randFloatSpread( 2000 ),
                    THREE.MathUtils.randFloatSpread( 2000 )
                );
            }
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
            const material = new THREE.PointsMaterial( { color: 0x888888, size: 2, transparent: true, opacity: 0.5 } );
            const points = new THREE.Points( geometry, material );
            scene.add( points );
            
            camera.position.z = 500;
            
            const animate = function () {
                requestAnimationFrame( animate );
                points.rotation.x += 0.0005;
                points.rotation.y += 0.0005;
                renderer.render( scene, camera );
            };
            animate();
            
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            this.threeMat = material;
        } catch(e) { console.log('ThreeJS not loaded'); }
    }

    switchScreen(id) {
        this.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        audio.click();
    }

    bindEvents() {
        document.getElementById('btn-play').addEventListener('click', () => this.switchScreen('screen-setup'));
        document.getElementById('btn-stats').addEventListener('click', () => { this.renderStats(); this.switchScreen('screen-stats'); });
        document.getElementById('btn-themes').addEventListener('click', () => { this.renderThemes(); this.switchScreen('screen-themes'); });
        document.getElementById('btn-puzzles').addEventListener('click', () => { this.renderPuzzles(); this.switchScreen('screen-puzzles'); });

        // Setup
        let diff = 3;
        let color = 'w';
        
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('primary'));
                e.currentTarget.classList.add('primary');
                diff = e.currentTarget.dataset.diff;
                audio.click();
            });
        });
        
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                color = e.currentTarget.dataset.color;
                audio.click();
            });
        });

        document.getElementById('btn-start-match').addEventListener('click', () => {
            window.game.start(diff, color);
            this.switchScreen('screen-game');
        });

        // Game Tools
        document.getElementById('btn-game-back').addEventListener('click', () => {
            window.game.isGameOver = true;
            if (window.game.timerInterval) clearInterval(window.game.timerInterval);
            this.switchScreen('screen-main');
        });
        document.getElementById('btn-resign').addEventListener('click', () => {
            window.game.resign();
        });
        document.getElementById('btn-undo').addEventListener('click', () => window.game.undo());
        document.getElementById('btn-hint').addEventListener('click', () => window.game.useHint());
        
        const boardWrapper = document.getElementById('board-wrapper');
        document.getElementById('btn-3d').addEventListener('click', () => {
            boardWrapper.classList.toggle('view-3d');
            audio.click();
        });

        // Result
        document.getElementById('btn-rematch').addEventListener('click', () => this.switchScreen('screen-setup'));
        document.querySelectorAll('.btn-back').forEach(btn => {
            btn.addEventListener('click', () => this.switchScreen('screen-main'));
        });
    }

    setupGameInfo(difficulty, color) {
        document.getElementById('opponent-name').innerText = `AI ${this.diffNames[difficulty]}`;
        const ratings = {1:400, 2:800, 3:1200, 4:1600, 5:2000, 6:2400};
        document.getElementById('opponent-rating').innerText = ratings[difficulty];
        document.getElementById('player-rating').innerText = this.stats.rating;
        
        // Clear history
        document.getElementById('moves-list').innerHTML = '';
        document.getElementById('captured-top').innerHTML = '';
        document.getElementById('captured-bottom').innerHTML = '';
        this.updateEvalBar(0, color);
    }

    updateTimers(tw, tb, playerColor) {
        const fmt = (t) => `${Math.floor(t/60).toString().padStart(2,'0')}:${(t%60).toString().padStart(2,'0')}`;
        const topEl = document.getElementById('timer-top');
        const botEl = document.getElementById('timer-bottom');
        
        if (playerColor === 'w') {
            botEl.innerText = fmt(tw);
            topEl.innerText = fmt(tb);
            if(window.game.chess.turn() === 'w') { botEl.classList.add('active'); topEl.classList.remove('active'); }
            else { topEl.classList.add('active'); botEl.classList.remove('active'); }
        } else {
            botEl.innerText = fmt(tb);
            topEl.innerText = fmt(tw);
            if(window.game.chess.turn() === 'b') { botEl.classList.add('active'); topEl.classList.remove('active'); }
            else { topEl.classList.add('active'); botEl.classList.remove('active'); }
        }
    }

    updateMoves(history) {
        const list = document.getElementById('moves-list');
        list.innerHTML = '';
        for(let i=0; i<history.length; i+=2) {
            const num = Math.floor(i/2) + 1;
            const whiteMove = history[i];
            const blackMove = history[i+1] || '';
            list.innerHTML += `
                <div class="move-num">${num}.</div>
                <div class="move-text">${whiteMove}</div>
                <div class="move-text">${blackMove}</div>
            `;
        }
        list.scrollTop = list.scrollHeight;
    }

    updateCapturedPieces(verboseHistory, playerColor) {
        const top = document.getElementById('captured-top');
        const bot = document.getElementById('captured-bottom');
        top.innerHTML = ''; bot.innerHTML = '';
        
        const capturedByW = [];
        const capturedByB = [];
        
        verboseHistory.forEach(m => {
            if(m.captured) {
                if(m.color === 'w') capturedByW.push(m.captured);
                else capturedByB.push(m.captured);
            }
        });
        
        const sortPieces = (arr) => arr.sort((a,b) => {
            const val = {p:1, n:3, b:3, r:5, q:9};
            return val[a] - val[b];
        });
        
        sortPieces(capturedByW);
        sortPieces(capturedByB);
        
        const getImg = (type, color) => `<img src="${window.game.board.pieceImages[color][type]}" />`;
        
        if (playerColor === 'w') {
            capturedByW.forEach(p => bot.innerHTML += getImg(p, 'b'));
            capturedByB.forEach(p => top.innerHTML += getImg(p, 'w'));
        } else {
            capturedByB.forEach(p => bot.innerHTML += getImg(p, 'w'));
            capturedByW.forEach(p => top.innerHTML += getImg(p, 'b'));
        }
    }

    updateEvalBar(score, playerColor) {
        // score is from white's perspective. positive means white is winning.
        // mapping roughly to -10 to +10 pawns.
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        const pawns = score / 100;
        let pct = 50 + (pawns / 10) * 50;
        pct = clamp(pct, 0, 100);
        
        // If player is black, invert bar visual perspective
        if (playerColor === 'b') pct = 100 - pct;
        
        const fill = document.getElementById('eval-fill');
        const text = document.getElementById('eval-text');
        
        fill.style.width = `${pct}%`;
        fill.style.background = playerColor === 'w' ? '#fff' : '#333';
        document.getElementById('eval-bar').style.background = playerColor === 'w' ? '#333' : '#fff';
        
        let displayScore = (playerColor === 'w' ? pawns : -pawns);
        text.innerText = (displayScore > 0 ? '+' : '') + displayScore.toFixed(1);
    }

    showResult(isWin, resultStr, reason, difficulty) {
        document.getElementById('result-title').innerText = resultStr;
        document.getElementById('result-title').className = `cinzel ${isWin ? 'text-blue' : (resultStr === 'DRAW' ? '' : 'text-red')}`;
        document.getElementById('result-subtitle').innerText = reason;
        
        document.getElementById('res-opponent').innerText = `AI ${this.diffNames[difficulty]}`;
        
        const accuracy = Math.floor(75 + Math.random()*20); // Placeholder
        document.getElementById('res-accuracy').innerText = `${accuracy}%`;
        
        // Calc rating change (Elo simplified)
        const opponentRating = {1:400, 2:800, 3:1200, 4:1600, 5:2000, 6:2400}[difficulty];
        const K = 32;
        const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - this.stats.rating) / 400));
        const actualScore = isWin ? 1 : (resultStr === 'DRAW' ? 0.5 : 0);
        
        let ratingChange = Math.round(K * (actualScore - expectedScore));
        if(ratingChange > 0 && !isWin && resultStr !== 'DRAW') ratingChange = -Math.abs(ratingChange); // Ensure loss is neg
        if(ratingChange < 0 && isWin) ratingChange = Math.abs(ratingChange);
        
        this.stats.rating = Math.max(100, this.stats.rating + ratingChange);
        this.stats.played++;
        if(isWin) this.stats.won++;
        
        let xp = isWin ? difficulty * 50 : 10;
        this.stats.xp += xp;
        
        const rcEl = document.getElementById('res-rating');
        rcEl.innerHTML = `${ratingChange >= 0 ? '+' : ''}${ratingChange} <small>(${this.stats.rating})</small>`;
        rcEl.className = ratingChange >= 0 ? 'text-blue' : 'text-red';
        
        document.getElementById('res-xp').innerText = xp;
        
        this.saveStats();
        this.updateMenuStats();
        
        this.switchScreen('screen-result');
    }

    loadStats() {
        const def = { rating: 1000, played: 0, won: 0, xp: 0, theme: 'classic' };
        try { return JSON.parse(localStorage.getItem('chessX_stats')) || def; } 
        catch(e) { return def; }
    }
    saveStats() { localStorage.setItem('chessX_stats', JSON.stringify(this.stats)); }
    
    updateMenuStats() {
        document.getElementById('menu-rating').innerText = this.stats.rating;
        document.getElementById('menu-xp').innerText = this.stats.xp;
    }

    getRankName(rating) {
        if(rating < 800) return 'Beginner';
        if(rating < 1200) return 'Novice';
        if(rating < 1600) return 'Intermediate';
        if(rating < 2000) return 'Advanced';
        if(rating < 2400) return 'Master';
        return 'Grandmaster';
    }

    
    renderPuzzles() {
        const list = document.getElementById('puzzle-list');
        list.innerHTML = '';
        window.CHESS_PUZZLES.forEach(p => {
            const el = document.createElement('div');
            el.className = 'puzzle-card';
            el.style.padding = '15px';
            el.style.background = 'rgba(255,255,255,0.1)';
            el.style.borderRadius = '10px';
            el.style.cursor = 'pointer';
            el.style.border = '1px solid rgba(255,255,255,0.2)';
            
            el.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 5px;">${p.title}</div>
                <div style="font-size: 0.9em; opacity: 0.8;">${p.description}</div>
            `;
            
            el.addEventListener('click', () => {
                if(window.audio) audio.click(); window.game.startPuzzle(p);
                this.switchScreen('screen-game');
            });
            
            // Hover effects
            el.addEventListener('mouseenter', () => el.style.background = 'rgba(255,255,255,0.2)');
            el.addEventListener('mouseleave', () => el.style.background = 'rgba(255,255,255,0.1)');
            
            list.appendChild(el);
        });
    }

    renderStats() {
        document.getElementById('stat-rating').innerText = this.stats.rating;
        document.getElementById('stat-played').innerText = this.stats.played;
        const wr = this.stats.played > 0 ? Math.round((this.stats.won / this.stats.played)*100) : 0;
        document.getElementById('stat-winrate').innerText = `${wr}%`;
        document.getElementById('stat-rank').innerText = this.getRankName(this.stats.rating);
    }

    renderThemes() {
        const grid = document.getElementById('theme-grid');
        grid.innerHTML = '';
        this.themes.forEach(t => {
            const el = document.createElement('div');
            el.className = `theme-card ${this.stats.theme === t.id ? 'active' : ''}`;
            el.innerHTML = `
                <div class="theme-preview">
                    <div class="tp-light" style="background:${t.c1}"></div>
                    <div class="tp-dark" style="background:${t.c2}"></div>
                </div>
                <div class="theme-name">${t.name}</div>
            `;
            el.addEventListener('click', () => {
                this.applyTheme(t.id);
                this.renderThemes();
            });
            grid.appendChild(el);
        });
    }

    applyTheme(id) {
        const theme = this.themes.find(t => t.id === id) || this.themes[0];
        document.body.className = theme.class;
        this.stats.theme = id;
        this.saveStats();
        
        // Update ThreeJS particles color slightly based on theme
        if(this.threeMat) {
            if(id === 'cyber') this.threeMat.color.setHex(0x00ffcc);
            else if(id === 'marble') this.threeMat.color.setHex(0xa8a2c2);
            else this.threeMat.color.setHex(0x888888);
        }
    }
}
