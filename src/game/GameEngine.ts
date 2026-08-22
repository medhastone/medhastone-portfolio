import { Particle } from './Particle';
import { playPop, playWin, playLose } from './audio';
import { Bubble } from './Bubble';
import { Grid } from './Grid';
import { BUBBLE_COLORS, BUBBLE_RADIUS, BUBBLE_DIAMETER, ROW_HEIGHT } from './types';
import confetti from 'canvas-confetti';

interface EngineCallbacks {
  level: number;
  onScoreChange: (score: number) => void;
  onWin: () => void;
  onLose: () => void;
}

export class GameEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  grid: Grid;
  
  width: number;
  height: number;
  
  playerBubble: Bubble | null = null;
  nextBubbleColor: string = '';
  
  fallingBubbles: Bubble[] = [];
  particles: Particle[] = [];
  
  score: number = 0;
  shotsSincePop: number = 0;
  callbacks: EngineCallbacks;
  
  lastTime: number = 0;
  reqId: number = 0;
  state: 'AIMING' | 'SHOOTING' | 'RESOLVING' | 'GAMEOVER' = 'AIMING';
  
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(canvas: HTMLCanvasElement, callbacks: EngineCallbacks) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
    this.callbacks = callbacks;

    // Responsive grid cols based on width
    const cols = Math.max(8, Math.floor((this.width - BUBBLE_RADIUS*2) / BUBBLE_DIAMETER));
    this.grid = new Grid(this.width, cols, 25);
    
    // Generate level based on current level number
    const startLines = Math.min(12, 4 + Math.floor(callbacks.level / 2));
    this.grid.generateLevel(startLines);

    this.spawnPlayerBubble();

    // Event listeners
    this.handleMove = this.handleMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.canvas.addEventListener('mousemove', this.handleMove);
    this.canvas.addEventListener('touchmove', this.handleMove, { passive: false });
    this.canvas.addEventListener('mousedown', this.handleClick);
    this.canvas.addEventListener('touchstart', this.handleClick, { passive: false });
  }

  handleMove(e: MouseEvent | TouchEvent) {
    if (e.cancelable) e.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    
    if (window.TouchEvent && e instanceof TouchEvent) {
        this.mouseX = e.touches[0].clientX - rect.left;
        this.mouseY = e.touches[0].clientY - rect.top;
    } else if (e instanceof MouseEvent) {
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }
  }

  handleClick(e: MouseEvent | TouchEvent) {
    if (e.cancelable) e.preventDefault();
    this.handleMove(e);
    
    if (this.state === 'AIMING' && this.playerBubble) {
      this.shoot();
    }
  }

  spawnPlayerBubble() {
    if (!this.nextBubbleColor) {
      this.nextBubbleColor = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
    }
    this.playerBubble = new Bubble(this.width / 2, this.height - 40, this.nextBubbleColor);
    this.nextBubbleColor = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
    this.state = 'AIMING';
  }

  shoot() {
    if (!this.playerBubble) return;
    
    const dx = this.mouseX - this.playerBubble.x;
    const dy = this.mouseY - this.playerBubble.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    if (dist < 10) return; // Ignore very close clicks
    
    const speed = 1000; // pixels per second
    this.playerBubble.vx = (dx / dist) * speed;
    this.playerBubble.vy = (dy / dist) * speed;
    this.state = 'SHOOTING';
    this.shotsSincePop++;
  }

  start() {
    this.lastTime = performance.now();
    this.reqId = requestAnimationFrame(this.loop.bind(this));
  }

  destroy() {
    cancelAnimationFrame(this.reqId);
    this.canvas.removeEventListener('mousemove', this.handleMove);
    this.canvas.removeEventListener('touchmove', this.handleMove);
    this.canvas.removeEventListener('mousedown', this.handleClick);
    this.canvas.removeEventListener('touchstart', this.handleClick);
  }

  loop(time: number) {
    const dt = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;

    this.update(dt);
    this.draw();

    if (this.state !== 'GAMEOVER') {
      this.reqId = requestAnimationFrame(this.loop.bind(this));
    }
  }

  update(dt: number) {
    if (this.state === 'GAMEOVER') return;

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update(dt);
      if (p.life <= 0) this.particles.splice(i, 1);
    }
    
    // Update falling bubbles
    for (let i = this.fallingBubbles.length - 1; i >= 0; i--) {
      const b = this.fallingBubbles[i];
      b.vy += 1500 * dt; // gravity
      b.update(dt, this.width, this.height);
      if (b.y > this.height + BUBBLE_RADIUS) {
        this.fallingBubbles.splice(i, 1);
        this.addScore(20);
        for(let i=0; i<8; i++) this.particles.push(new Particle(b.x, b.y, b.color));
      }
    }

    if (this.state === 'SHOOTING' && this.playerBubble) {
      this.playerBubble.update(dt, this.width, this.height);
      
      // Check collision with top or other bubbles
      let hit = false;
      if (this.playerBubble.y <= this.grid.offsetY + this.grid.dropOffset) {
        hit = true;
      } else {
        // Grid collision
        for (let r = 0; r < this.grid.rows; r++) {
          for (let c = 0; c < this.grid.cols; c++) {
            const b = this.grid.cells[r][c];
            if (b && !b.popping) {
              const dx = b.x - this.playerBubble.x;
              const dy = b.y - this.playerBubble.y;
              if (dx*dx + dy*dy <= BUBBLE_DIAMETER * BUBBLE_DIAMETER) {
                hit = true;
                break;
              }
            }
          }
          if (hit) break;
        }
      }

      if (hit) {
        this.state = 'RESOLVING';
        const {r, c} = this.grid.addBubble(this.playerBubble);
        this.playerBubble = null;
        
        // Resolve matches
        const matches = this.grid.findMatches(r, c, this.grid.cells[r][c]!.color);
        if (matches.length >= 3) {
          this.shotsSincePop = 0;
          matches.forEach(m => {
            m.popping = true;
            for(let i=0; i<8; i++) this.particles.push(new Particle(m.x, m.y, m.color));
            this.grid.cells[m.gridRow][m.gridCol] = null;
            this.addScore(10);
          });
          playPop();
          
          // Check for floating
          const floating = this.grid.findFloatingBubbles();
          floating.forEach(f => {
            this.grid.cells[f.gridRow][f.gridCol] = null;
            f.vy = 0;
            f.vx = (Math.random() - 0.5) * 200;
            this.fallingBubbles.push(f);
          });
        }
        
        // Wait a bit then spawn next
        
        if (matches.length < 3 && this.shotsSincePop >= 5) {
            this.shotsSincePop = 0;
            this.grid.dropOffset += ROW_HEIGHT;
            
            // Move all bubbles down visually
            for (let r = 0; r < this.grid.rows; r++) {
                for (let c = 0; c < this.grid.cols; c++) {
                    const b = this.grid.cells[r][c];
                    if (b) {
                        b.y += ROW_HEIGHT;
                    }
                }
            }
        }

        setTimeout(() => this.checkWinLose(), 300);
      }
    }

    // Update grid bubbles (popping animation)
    for (let r = 0; r < this.grid.rows; r++) {
      for (let c = 0; c < this.grid.cols; c++) {
        const b = this.grid.cells[r][c];
        if (b) {
          b.update(dt, this.width, this.height);
          if (!b.active) {
            this.grid.cells[r][c] = null;
          }
        }
      }
    }
  }

  addScore(pts: number) {
    this.score += pts;
    this.callbacks.onScoreChange(this.score);
  }

  checkWinLose() {
    // Check win (no bubbles left)
    let bubblesLeft = 0;
    let lowestRow = 0;
    for (let r = 0; r < this.grid.rows; r++) {
      for (let c = 0; c < this.grid.cols; c++) {
        if (this.grid.cells[r][c]) {
          bubblesLeft++;
          lowestRow = Math.max(lowestRow, r);
        }
      }
    }

    if (bubblesLeft === 0) {
      this.state = 'GAMEOVER';
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      playWin();
      this.callbacks.onWin();
      return;
    }

    // Check lose (bubbles reached bottom)
    const pos = this.grid.getBubblePos(lowestRow, 0);
    if (pos.y + BUBBLE_RADIUS > this.height - 80) {
       this.state = 'GAMEOVER';
       playLose();
       this.callbacks.onLose();
       return;
    }

    this.spawnPlayerBubble();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Aim line
    if (this.state === 'AIMING' && this.playerBubble) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.playerBubble.x, this.playerBubble.y);
      this.ctx.lineTo(this.mouseX, this.mouseY);
      this.ctx.setLineDash([10, 10]);
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    this.grid.draw(this.ctx);
    
    this.fallingBubbles.forEach(b => b.draw(this.ctx));
    this.particles.forEach(p => p.draw(this.ctx));
    
    if (this.playerBubble) this.playerBubble.draw(this.ctx);

    // Shooter base
    this.ctx.fillStyle = 'rgba(255,255,255,0.1)';
    this.ctx.fillRect(this.width/2 - 40, this.height - 40, 80, 80);
    
    // Next bubble preview
    this.ctx.beginPath();
    this.ctx.arc(this.width/2 + 60, this.height - 20, BUBBLE_RADIUS * 0.6, 0, Math.PI*2);
    this.ctx.fillStyle = this.nextBubbleColor;
    this.ctx.fill();
    this.ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }
}
