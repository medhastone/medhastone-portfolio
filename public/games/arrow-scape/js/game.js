export class ArrowGame {
    constructor(canvas, callbacks) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cb = callbacks;
        
        this.arrows = [];
        this.cellSize = 35; // Base cell size
        this.animId = null;
        this.lastTime = 0;
        
        this.cam = { x: 0, y: 0, zoom: 1 };
        this.levelCenter = { c: 0, r: 0 };
        
        this.isDragging = false;
        this.lastPointer = null;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Pointer events for Pan/Zoom and Clicks
        this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
        window.addEventListener('pointermove', (e) => this.handlePointerMove(e));
        window.addEventListener('pointerup', () => this.handlePointerUp());
        
        // Mouse wheel for zoom
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
            this.applyZoom(zoomDelta, e.clientX, e.clientY);
        }, { passive: false });
    }
    
    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio; 
        this.render();
    }
    
    loadLevel(pointsArrays) {
        let minC = 999, maxC = -999, minR = 999, maxR = -999;
        
        this.arrows = pointsArrays.map((pts, i) => {
            // Find bounds
            for (let p of pts) {
                if (p.c < minC) minC = p.c; if (p.c > maxC) maxC = p.c;
                if (p.r < minR) minR = p.r; if (p.r > maxR) maxR = p.r;
            }
            let lastP1 = pts[pts.length-2];
            let lastP2 = pts[pts.length-1];
            return {
                id: i,
                points: pts, // Original fixed layout
                snakePoints: JSON.parse(JSON.stringify(pts)), // Dynamic slithering points
                cells: [], // dynamically rebuilt collision cells
                dir: { c: Math.sign(lastP2.c - lastP1.c), r: Math.sign(lastP2.r - lastP1.r) },
                state: 'IDLE', // IDLE, QUEUED, MOVING
                wiggleTimer: 0,
                color: `hsl(${(i * 137.5) % 360}, 90%, 65%)`
            };
        });
        
        // Build initial collision cells
        this.arrows.forEach(arr => this.rebuildCells(arr));
        
        // Setup Camera to fit the level bounding box
        this.levelCenter = { c: (minC + maxC) / 2, r: (minR + maxR) / 2 };
        this.cam.x = this.canvas.width / 2;
        this.cam.y = this.canvas.height / 2;
        
        const levelWidth = (maxC - minC + 4) * this.cellSize;
        const levelHeight = (maxR - minR + 4) * this.cellSize;
        const scaleX = this.canvas.width / levelWidth;
        const scaleY = this.canvas.height / levelHeight;
        this.cam.zoom = Math.min(scaleX, scaleY) * 0.9; 
        
        if (!this.animId) {
            this.lastTime = performance.now();
            this.animId = requestAnimationFrame((t) => this.loop(t));
        } else {
            this.render();
        }
    }

    rebuildCells(arr) {
        arr.cells = [];
        let seen = new Set();
        for (let j = 0; j < arr.snakePoints.length - 1; j++) {
            let p1 = arr.snakePoints[j];
            let p2 = arr.snakePoints[j+1];
            let c1 = Math.round(p1.c), r1 = Math.round(p1.r);
            let c2 = Math.round(p2.c), r2 = Math.round(p2.r);

            let steps = Math.max(Math.abs(c2 - c1), Math.abs(r2 - r1));
            let dc = steps === 0 ? 0 : (c2 - c1) / steps;
            let dr = steps === 0 ? 0 : (r2 - r1) / steps;

            for (let i = 0; i <= steps; i++) {
                let c = Math.round(c1 + dc * i);
                let r = Math.round(r1 + dr * i);
                let key = `${c},${r}`;
                if (!seen.has(key)) {
                    arr.cells.push({c, r});
                    seen.add(key);
                }
            }
        }
        if (arr.snakePoints.length === 1) {
            arr.cells.push({c: Math.round(arr.snakePoints[0].c), r: Math.round(arr.snakePoints[0].r)});
        }
    }
    
    applyZoom(factor, clientX, clientY) {
        if (!clientX) {
            const rect = this.canvas.getBoundingClientRect();
            clientX = rect.left + rect.width/2;
            clientY = rect.top + rect.height/2;
        }
        
        const rect = this.canvas.getBoundingClientRect();
        const x = (clientX - rect.left) * window.devicePixelRatio;
        const y = (clientY - rect.top) * window.devicePixelRatio;
        
        // Zoom towards pointer
        this.cam.x = x - (x - this.cam.x) * factor;
        this.cam.y = y - (y - this.cam.y) * factor;
        this.cam.zoom *= factor;
        
        // Clamp zoom
        this.cam.zoom = Math.max(0.2, Math.min(this.cam.zoom, 5.0));
    }
    
    zoomIn() { this.applyZoom(1.2); }
    zoomOut() { this.applyZoom(0.8); }
    
    handlePointerDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * window.devicePixelRatio;
        const y = (e.clientY - rect.top) * window.devicePixelRatio;
        
        // Convert screen coordinates to world grid coordinates
        const worldX = (x - this.cam.x) / this.cam.zoom + this.levelCenter.c * this.cellSize;
        const worldY = (y - this.cam.y) / this.cam.zoom + this.levelCenter.r * this.cellSize;
        
        const clickC = worldX / this.cellSize;
        const clickR = worldY / this.cellSize;
        
        let clickedArrow = null;
        for (let i = this.arrows.length - 1; i >= 0; i--) {
            const arr = this.arrows[i];
            if (arr.state === 'MOVING') continue;
            for (let cell of arr.cells) {
                const dx = clickC - (cell.c + 0.5);
                const dy = clickR - (cell.r + 0.5);
                if (Math.sqrt(dx*dx + dy*dy) < 0.8) {
                    clickedArrow = arr;
                    break;
                }
            }
            if (clickedArrow) break;
        }
        
        if (clickedArrow) {
            this.tryMoveArrow(clickedArrow);
        } else {
            this.isDragging = true;
            this.lastPointer = { x, y };
        }
    }
    
    handlePointerMove(e) {
        if (!this.isDragging) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * window.devicePixelRatio;
        const y = (e.clientY - rect.top) * window.devicePixelRatio;
        
        const dx = x - this.lastPointer.x;
        const dy = y - this.lastPointer.y;
        
        this.cam.x += dx;
        this.cam.y += dy;
        this.lastPointer = { x, y };
    }
    
    handlePointerUp() {
        this.isDragging = false;
    }
    
    isPathClear(arr) {
        let maxSteps = 40; // Spatial raycast
        let head = arr.snakePoints[arr.snakePoints.length - 1];
        let headC = Math.round(head.c);
        let headR = Math.round(head.r);

        for (let step = 1; step <= maxSteps; step++) {
            let tc = headC + arr.dir.c * step;
            let tr = headR + arr.dir.r * step;

            for (let other of this.arrows) {
                if (other === arr) continue;
                
                // 1. Check current body cells
                for (let oCell of other.cells) {
                    if (oCell.c === tc && oCell.r === tr) {
                        return false;
                    }
                }
                
                // 2. Check future path of MOVING arrows (reserves the corridor)
                if (other.state === 'MOVING') {
                    let oHead = other.snakePoints[other.snakePoints.length - 1];
                    let oHeadC = Math.round(oHead.c);
                    let oHeadR = Math.round(oHead.r);
                    
                    if (other.dir.c !== 0) {
                        if (tr === oHeadR) {
                            if (other.dir.c === 1 && tc >= oHeadC) return false;
                            if (other.dir.c === -1 && tc <= oHeadC) return false;
                        }
                    }
                    if (other.dir.r !== 0) {
                        if (tc === oHeadC) {
                            if (other.dir.r === 1 && tr >= oHeadR) return false;
                            if (other.dir.r === -1 && tr <= oHeadR) return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    tryMoveArrow(arr) {
        if (this.isPathClear(arr)) {
            arr.state = 'MOVING';
            this.cb.onMove();
        } else {
            if (arr.state !== 'QUEUED') {
                arr.state = 'QUEUED';
                arr.wiggleTimer = 0.3;
                this.cb.onError(); // Queue alert
            }
        }
    }
    
    loop(time) {
        this.animId = requestAnimationFrame((t) => this.loop(t));
        const dt = Math.min((time - this.lastTime) / 1000, 0.1);
        this.lastTime = time;
        
        this.update(dt);
        this.render();
    }
    
    update(dt) {
        let activeArrows = 0;
        let movingCount = 0;

        // Auto-resolve queue: If path clears, start moving!
        for (let arr of this.arrows) {
            if (arr.state === 'QUEUED') {
                if (this.isPathClear(arr)) {
                    arr.state = 'MOVING';
                    this.cb.onMove();
                }
            }
        }

        for (let i = this.arrows.length - 1; i >= 0; i--) {
            let arr = this.arrows[i];
            activeArrows++;
            
            if (arr.state === 'QUEUED') {
                if (arr.wiggleTimer > 0) arr.wiggleTimer -= dt;
            }

            if (arr.state === 'MOVING') {
                movingCount++;
                const speed = 25; // slither speed
                const dist = speed * dt;
                
                // 1. Advance Head
                const head = arr.snakePoints[arr.snakePoints.length - 1];
                head.c += arr.dir.c * dist;
                head.r += arr.dir.r * dist;

                // 2. Shrink Tail
                let shrink = dist;
                while (shrink > 0 && arr.snakePoints.length > 1) {
                    let p0 = arr.snakePoints[0];
                    let p1 = arr.snakePoints[1];
                    let dx = p1.c - p0.c;
                    let dy = p1.r - p0.r;
                    let segLen = Math.sqrt(dx*dx + dy*dy);

                    if (segLen > shrink) {
                        p0.c += (dx / segLen) * shrink;
                        p0.r += (dy / segLen) * shrink;
                        shrink = 0;
                    } else {
                        shrink -= segLen;
                        arr.snakePoints.shift();
                    }
                }

                this.rebuildCells(arr); // dynamically update bounding volume

                // Remove if far off screen bounds
                if (arr.snakePoints.length > 0) {
                    let tail = arr.snakePoints[0];
                    if (Math.abs(tail.c - this.levelCenter.c) > 40 || Math.abs(tail.r - this.levelCenter.r) > 40) {
                        this.arrows.splice(i, 1);
                        activeArrows--;
                    }
                } else {
                    this.arrows.splice(i, 1);
                    activeArrows--;
                }
            }
        }
        
        if (activeArrows === 0 && movingCount === 0 && this.arrows.length === 0) {
            this.cb.onWin();
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.save();
        this.ctx.translate(this.cam.x, this.cam.y);
        this.ctx.scale(this.cam.zoom, this.cam.zoom);
        
        const offX = -this.levelCenter.c * this.cellSize;
        const offY = -this.levelCenter.r * this.cellSize;
        this.ctx.translate(offX, offY);
        
        // Draw Grid Dots (Dark Theme)
        this.ctx.fillStyle = 'rgba(255,255,255,0.05)';
        for (let c = -15; c < 35; c++) {
            for (let r = -15; r < 35; r++) {
                const x = c * this.cellSize + this.cellSize/2;
                const y = r * this.cellSize + this.cellSize/2;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 2, 0, Math.PI*2);
                this.ctx.fill();
            }
        }
        
        for (let arr of this.arrows) {
            this.drawArrow(arr);
        }
        
        this.ctx.restore();
    }
    
    drawArrow(arr) {
        this.ctx.save();
        
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = this.cellSize * 0.35;
        this.ctx.strokeStyle = arr.color;
        this.ctx.fillStyle = arr.color;
        
        // Neon Glow
        this.ctx.shadowBlur = arr.state === 'QUEUED' ? 25 : 15;
        this.ctx.shadowColor = arr.color;
        
        // Visual feedback for Queued
        if (arr.state === 'QUEUED') {
            this.ctx.globalAlpha = 0.6 + 0.4 * Math.sin(performance.now() / 150);
        }

        // Apply wiggle offset if recently queued
        let wc = 0, wr = 0;
        if (arr.state === 'QUEUED' && arr.wiggleTimer > 0) {
            wc = Math.sin(arr.wiggleTimer * 40) * 0.1 * arr.dir.c * this.cellSize;
            wr = Math.sin(arr.wiggleTimer * 40) * 0.1 * arr.dir.r * this.cellSize;
        }
        this.ctx.translate(wc, wr);
        
        if (arr.snakePoints.length < 1) {
            this.ctx.restore();
            return;
        }

        // Draw Body Segment
        if (arr.snakePoints.length >= 2) {
            this.ctx.beginPath();
            for (let i = 0; i < arr.snakePoints.length; i++) {
                let x = arr.snakePoints[i].c * this.cellSize + this.cellSize/2;
                let y = arr.snakePoints[i].r * this.cellSize + this.cellSize/2;
                
                if (i === arr.snakePoints.length - 1) {
                    x -= arr.dir.c * (this.cellSize * 0.25);
                    y -= arr.dir.r * (this.cellSize * 0.25);
                }
                
                if (i === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            }
            this.ctx.stroke();
        }
        
        // Draw Head
        const last = arr.snakePoints[arr.snakePoints.length - 1];
        const headX = last.c * this.cellSize + this.cellSize/2;
        const headY = last.r * this.cellSize + this.cellSize/2;
        const angle = Math.atan2(arr.dir.r, arr.dir.c);
        const headLen = this.cellSize * 0.7;
        
        this.ctx.beginPath();
        this.ctx.translate(headX + arr.dir.c * (this.cellSize*0.1), headY + arr.dir.r * (this.cellSize*0.1));
        this.ctx.rotate(angle);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-headLen, headLen * 0.45);
        this.ctx.lineTo(-headLen * 0.3, 0);
        this.ctx.lineTo(-headLen, -headLen * 0.45);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.restore();
    }
}
