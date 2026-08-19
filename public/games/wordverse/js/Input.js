export class InputManager {
    constructor(uiManager, callbacks) {
        this.ui = uiManager;
        this.callbacks = callbacks;
        this.isDragging = false;
        this.path = []; // array of {row, col, el}
        this.lastElement = null;
        this.bindEvents();
    }

    bindEvents() {
        const grid = document.getElementById('letter-grid');
        
        // Touch events
        grid.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
        grid.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        window.addEventListener('touchend', this.handleEnd.bind(this));
        
        // Mouse events
        grid.addEventListener('mousedown', this.handleStart.bind(this));
        window.addEventListener('mousemove', this.handleMove.bind(this));
        window.addEventListener('mouseup', this.handleEnd.bind(this));
    }

    handleStart(e) {
        if(e.cancelable) e.preventDefault();
        this.isDragging = true;
        this.path = [];
        this.ui.clearCanvas();
        this.ui.clearSelection();
        const el = this.getElementFromEvent(e);
        this.processCell(el);
    }

    handleMove(e) {
        if (!this.isDragging) return;
        if(e.cancelable) e.preventDefault();
        const el = this.getElementFromEvent(e);
        this.processCell(el);
        this.ui.drawPath(this.path, e);
    }

    handleEnd(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        if (this.path.length > 0) {
            this.callbacks.onSubmit(this.path.map(p => ({row: p.row, col: p.col})));
        }
        this.ui.clearCanvas();
        this.ui.clearSelection();
        this.path = [];
        this.lastElement = null;
    }

    getElementFromEvent(e) {
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        return document.elementFromPoint(clientX, clientY);
    }

    processCell(el) {
        if (!el || !el.classList.contains('letter-cell')) return;
        
        const row = parseInt(el.dataset.row);
        const col = parseInt(el.dataset.col);
        
        // If already in path, check if backing up
        const existingIdx = this.path.findIndex(p => p.row === row && p.col === col);
        if (existingIdx !== -1) {
            if (existingIdx === this.path.length - 2) {
                // Backing up, remove last
                const removed = this.path.pop();
                removed.el.classList.remove('selected');
                this.lastElement = this.path[this.path.length - 1].el;
                this.callbacks.onPreview(this.path.map(p => ({row: p.row, col: p.col})));
            }
            return;
        }

        // Validate adjacency if there is a previous element
        if (this.path.length > 0) {
            const last = this.path[this.path.length - 1];
            const rDiff = Math.abs(last.row - row);
            const cDiff = Math.abs(last.col - col);
            if (rDiff > 1 || cDiff > 1 || (rDiff === 0 && cDiff === 0)) return; // not adjacent
        }

        this.path.push({row, col, el});
        this.lastElement = el;
        el.classList.add('selected');
        
        this.callbacks.onSelect();
        this.callbacks.onPreview(this.path.map(p => ({row: p.row, col: p.col})));
    }
}
