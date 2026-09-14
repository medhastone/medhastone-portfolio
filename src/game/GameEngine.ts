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
    const cols = Math.max(8, Math.min(12, Math.floor((this.width - BUBBLE_RADIUS * 2) / BUBBLE_DIAMETER)));
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

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid.updateWidth(width);
    if (this.playerBubble && this.state === 'AIMING') {
      this.playerBubble.x = this.width / 2;
      this.playerBubble.y = this.height - 45;
    }
  }

  handleMove(e: MouseEvent | TouchEvent) {
    if (e.cancelable) e.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    let clientX = 0;
    let clientY = 0;

    if (window.TouchEvent && e instanceof TouchEvent) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    this.mouseX = (clientX - rect.left) * scaleX;
    this.mouseY = (clientY - rect.top) * scaleY;

    // Clamp mouse aiming to be above shooter
    if (this.playerBubble && this.mouseY > this.playerBubble.y - 20) {
      this.mouseY = this.playerBubble.y - 20;
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
    this.playerBubble = new Bubble(this.width / 2, this.height - 45, this.nextBubbleColor);
    this.nextBubbleColor = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
    this.state = 'AIMING';
  }

  shoot() {
    if (!this.playerBubble || this.state !== 'AIMING') return;
    
    const dx = this.mouseX - this.playerBubble.x;
    const dy = this.mouseY - this.playerBubble.y;
    
    // Only allow aiming/shooting upwards
    if (dy >= -10) return;

    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 10) return; // Ignore accidental close taps
    
    const speed = 1100; // pixels per second
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

  drawAimGuide() {
    if (!this.playerBubble) return;
    const startX = this.playerBubble.x;
    const startY = this.playerBubble.y;

    const dx = this.mouseX - startX;
    const dy = this.mouseY - startY;

    // Only aim upwards
    if (dy >= -15) return;

    const angle = Math.atan2(dy, dx);
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);

    let curX = startX;
    let curY = startY;
    let curDirX = dirX;
    let curDirY = dirY;
    const minX = BUBBLE_RADIUS;
    const maxX = this.width - BUBBLE_RADIUS;
    const minY = this.grid.offsetY + this.grid.dropOffset;

    const dots: { x: number; y: number }[] = [];
    const step = 22;
    const maxDist = 650;
    let traveled = 0;

    while (traveled < maxDist) {
      curX += curDirX * step;
      curY += curDirY * step;
      traveled += step;

      // Bounce off side walls
      if (curX <= minX) {
        curX = minX;
        curDirX = Math.abs(curDirX);
      } else if (curX >= maxX) {
        curX = maxX;
        curDirX = -Math.abs(curDirX);
      }

      if (curY <= minY || curY >= this.height) {
        dots.push({ x: curX, y: curY });
        break;
      }

      dots.push({ x: curX, y: curY });
    }

    // Draw glowing laser dots
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const alpha = Math.max(0.2, 0.85 - (i / dots.length) * 0.65);
      const radius = Math.max(2, 4 - (i / dots.length) * 1.5);

      this.ctx.beginPath();
      this.ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      this.ctx.fill();
    }
  }

  draw() {
    // ALWAYS clear the full physical canvas width and height
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Subtle dark gradient / backdrop inside arena
    this.ctx.fillStyle = '#090d16';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Aim line
    if (this.state === 'AIMING' && this.playerBubble) {
      this.drawAimGuide();
    }

    this.grid.draw(this.ctx);
    
    this.fallingBubbles.forEach(b => b.draw(this.ctx));
    this.particles.forEach(p => p.draw(this.ctx));
    
    if (this.playerBubble) this.playerBubble.draw(this.ctx);

    // Shooter base ring
    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, this.height - 45, BUBBLE_RADIUS * 1.35, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    this.ctx.fill();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
    
    // Next bubble preview pedestal
    const previewX = this.width / 2 + 65;
    const previewY = this.height - 25;
    this.ctx.beginPath();
    this.ctx.arc(previewX, previewY, BUBBLE_RADIUS * 0.7, 0, Math.PI * 2);
    this.ctx.fillStyle = this.nextBubbleColor;
    this.ctx.fill();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Next indicator label
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    this.ctx.font = '9px Inter, system-ui, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('NEXT', previewX, previewY + 20);
  }
}
