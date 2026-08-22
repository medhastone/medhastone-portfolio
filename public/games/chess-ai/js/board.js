class Board {
    constructor(containerId, onMove) {
        this.container = document.getElementById(containerId);
        this.onMove = onMove;
        this.squares = [];
        this.selectedSquare = null;
        this.playerColor = 'w';
        this.isFlipped = false;
        
        this.pieceImages = {
            'w': {
                'k': 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
                'q': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
                'r': 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
                'b': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
                'n': 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
                'p': 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
            },
            'b': {
                'k': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
                'q': 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
                'r': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
                'b': 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
                'n': 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
                'p': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg'
            }
        };

        this.init();
    }

    init() {
        this.container.innerHTML = '';
        this.squares = [];
        for (let r = 0; r < 8; r++) {
            this.squares[r] = [];
            for (let c = 0; c < 8; c++) {
                const square = document.createElement('div');
                const isLight = (r + c) % 2 === 0;
                square.className = `square ${isLight ? 'light' : 'dark'}`;
                
                // standard coordinates (a8 to h1)
                const file = String.fromCharCode('a'.charCodeAt(0) + c);
                const rank = 8 - r;
                square.dataset.square = file + rank;
                
                square.addEventListener('click', () => this.handleSquareClick(square.dataset.square));
                
                this.container.appendChild(square);
                this.squares[r][c] = square;
            }
        }
        this.updateCoordinates();
    }

    setPlayerColor(color) {
        this.playerColor = color;
        this.isFlipped = color === 'b';
        this.updateCoordinates();
        this.render(window.game.chess.board()); // force re-render if board exists
    }

    updateCoordinates() {
        const files = this.isFlipped ? ['h','g','f','e','d','c','b','a'] : ['a','b','c','d','e','f','g','h'];
        const ranks = this.isFlipped ? ['1','2','3','4','5','6','7','8'] : ['8','7','6','5','4','3','2','1'];
        
        const filesEl = document.getElementById('coord-files');
        const ranksEl = document.getElementById('coord-ranks');
        
        filesEl.innerHTML = '';
        ranksEl.innerHTML = '';
        
        files.forEach(f => {
            const el = document.createElement('div'); el.innerText = f; filesEl.appendChild(el);
        });
        ranks.forEach(r => {
            const el = document.createElement('div'); el.innerText = r; ranksEl.appendChild(el);
        });

        // Reorder squares visually using flex/grid order
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const sq = this.squares[r][c];
                const visualRow = this.isFlipped ? 7 - r : r;
                const visualCol = this.isFlipped ? 7 - c : c;
                sq.style.order = visualRow * 8 + visualCol;
            }
        }
    }

    render(boardState, lastMove = null, checkSquare = null) {
        // Clear all
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const sq = this.squares[r][c];
                sq.innerHTML = '';
                sq.className = sq.className.replace(/highlight-last|highlight-move|highlight-capture|in-check/g, '').trim();
                
                const piece = boardState[r][c];
                if (piece) {
                    const img = document.createElement('div');
                    img.className = 'piece';
                    img.style.backgroundImage = `url(${this.pieceImages[piece.color][piece.type]})`;
                    sq.appendChild(img);
                }
            }
        }

        if (lastMove) {
            this.getSquareEl(lastMove.from)?.classList.add('highlight-last');
            this.getSquareEl(lastMove.to)?.classList.add('highlight-last');
        }
        
        if (checkSquare) {
            this.getSquareEl(checkSquare)?.classList.add('in-check');
        }
    }

    getSquareEl(sqStr) {
        const file = sqStr.charCodeAt(0) - 'a'.charCodeAt(0);
        const rank = 8 - parseInt(sqStr[1]);
        if(rank >= 0 && rank < 8 && file >= 0 && file < 8) {
            return this.squares[rank][file];
        }
        return null;
    }

    handleSquareClick(sq) {
        if (window.game.isGameOver || window.game.chess.turn() !== this.playerColor) return;

        if (this.selectedSquare) {
            const moves = window.game.chess.moves({ square: this.selectedSquare, verbose: true });
            const move = moves.find(m => m.to === sq);
            
            if (move) {
                // Check promotion
                if (move.flags.includes('p') || move.flags.includes('cp')) {
                    this.showPromotionModal(this.selectedSquare, sq);
                } else {
                    this.onMove({ from: this.selectedSquare, to: sq });
                    this.clearSelection();
                }
            } else {
                // Select different piece
                const piece = window.game.chess.get(sq);
                if (piece && piece.color === this.playerColor) {
                    this.selectSquare(sq);
                } else {
                    this.clearSelection();
                }
            }
        } else {
            const piece = window.game.chess.get(sq);
            if (piece && piece.color === this.playerColor) {
                this.selectSquare(sq);
            }
        }
    }

    selectSquare(sq) {
        this.clearSelection();
        this.selectedSquare = sq;
        this.getSquareEl(sq)?.classList.add('highlight-last'); // use same style for selection
        
        // Show valid moves
        const moves = window.game.chess.moves({ square: sq, verbose: true });
        moves.forEach(m => {
            const el = this.getSquareEl(m.to);
            if(el) {
                if(window.game.chess.get(m.to)) el.classList.add('highlight-capture');
                else el.classList.add('highlight-move');
            }
        });
    }

    clearSelection() {
        this.selectedSquare = null;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const sq = this.squares[r][c];
                sq.classList.remove('highlight-move', 'highlight-capture');
                // Don't remove highlight-last, render will handle it
                if(sq.innerText === '') sq.classList.remove('highlight-last'); // rough cleanup
            }
        }
        // Force re-render to restore last move highlights properly
        if(window.game) this.render(window.game.chess.board(), window.game.lastMove, window.game.getCheckSquare());
    }
    
    showPromotionModal(from, to) {
        const modal = document.getElementById('promotion-modal');
        const container = document.getElementById('promo-pieces');
        container.innerHTML = '';
        
        ['q', 'r', 'n', 'b'].forEach(type => {
            const img = document.createElement('img');
            img.className = 'promo-piece';
            img.src = this.pieceImages[this.playerColor][type];
            img.onclick = () => {
                modal.classList.remove('active');
                this.onMove({ from, to, promotion: type });
                this.clearSelection();
            };
            container.appendChild(img);
        });
        
        modal.classList.add('active');
    }
}
