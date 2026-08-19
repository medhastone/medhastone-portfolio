export class UIManager {
    constructor() {
        this.screens = document.querySelectorAll('.screen');
        this.boardContainer = document.getElementById('board');
        this.cells = [];
        this.toastTimeout = null;
        this.winLine = document.getElementById('win-line');
    }

    initBoard(onCellClick) {
        this.boardContainer.innerHTML = '';
        this.cells = [];
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            cell.addEventListener('click', () => onCellClick(i));
            this.boardContainer.appendChild(cell);
            this.cells.push(cell);
        }
        this.winLine.style.display = 'none';
        this.winLine.style.width = '0';
    }

    updateBoard(boardState) {
        boardState.forEach((val, idx) => {
            const cell = this.cells[idx];
            cell.className = 'cell'; // Reset
            if (val === 'X') cell.classList.add('x');
            else if (val === 'O') cell.classList.add('o');
        });
    }

    drawWinLine(winData) {
        this.winLine.style.display = 'block';
        const type = winData.type;
        const index = winData.index;
        
        let top = 0, left = 0, width = '100%', rotate = 0;
        
        // Approximate sizing based on grid (using percentages for responsive)
        if (type.type === 'row') {
            top = (index * 33.33) + 16.66 + '%';
            left = '5%'; width = '90%';
        } else if (type.type === 'col') {
            left = (index * 33.33) + 16.66 + '%';
            top = '5%'; width = '90%';
            this.winLine.style.transformOrigin = 'top left';
            rotate = 90;
        } else if (type.type === 'diag') {
            if (type.index === 0) { // Top-left to bottom-right
                top = '5%'; left = '5%'; width = '130%'; rotate = 45;
                this.winLine.style.transformOrigin = 'top left';
            } else { // Top-right to bottom-left
                top = '5%'; left = '95%'; width = '130%'; rotate = 135;
                this.winLine.style.transformOrigin = 'top left';
            }
        }
        
        this.winLine.style.top = top;
        this.winLine.style.left = left;
        this.winLine.style.transform = `rotate(${rotate}deg)`;
        
        // Trigger animation
        setTimeout(() => { this.winLine.style.width = width; }, 50);
    }

    switchScreen(screenId) {
        this.screens.forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    showToast(message, duration = 2000) {
        const toast = document.getElementById('feedback-toast');
        toast.innerText = message;
        toast.classList.add('show');
        clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    updateHUD(p1Score, p2Score, currentTurn, round, mode) {
        document.getElementById('hud-p1-score').innerText = p1Score;
        document.getElementById('hud-p2-score').innerText = p2Score;
        document.getElementById('match-status').innerText = mode === 'quick' ? 'QUICK MATCH' : `ROUND ${round}`;
        
        const turnInd = document.getElementById('turn-indicator');
        turnInd.innerText = `${currentTurn}'S TURN`;
        turnInd.className = currentTurn === 'X' ? 'turn-x' : 'turn-o';
    }

    updateResult(winner, score, moves, ratingChange, xpEarned) {
        const title = document.getElementById('result-title');
        title.className = 'result-title';
        if (winner === 'draw') {
            title.innerText = 'DRAW';
            title.classList.add('draw');
        } else {
            title.innerText = `${winner} WINS`;
            title.classList.add(winner === 'X' ? 'win' : 'lose'); // Assuming X is main player usually, but we keep it simple
        }
        
        document.getElementById('res-score').innerText = score;
        document.getElementById('res-moves').innerText = moves;
        document.getElementById('res-rating').innerText = ratingChange >= 0 ? `+${ratingChange}` : ratingChange;
        document.getElementById('res-rating').style.color = ratingChange >= 0 ? 'var(--color-x)' : 'var(--color-o)';
        document.getElementById('res-xp').innerText = `+${xpEarned}`;
    }
}
