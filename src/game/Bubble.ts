import { BUBBLE_RADIUS, Point } from './types';

export class Bubble {
  x: number;
  y: number;
  color: string;
  vx: number = 0;
  vy: number = 0;
  gridRow: number = -1;
  gridCol: number = -1;
  active: boolean = true;
  popping: boolean = false;
  popProgress: number = 0;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  update(dt: number, width: number, height: number) {
    if (this.popping) {
      this.popProgress += dt * 5;
      if (this.popProgress >= 1) {
        this.active = false;
      }
      return;
    }

    if (this.vx !== 0 || this.vy !== 0) {
      this.x += this.vx * dt;
      this.y += this.vy * dt;

      // Bounce off walls
      if (this.x - BUBBLE_RADIUS <= 0) {
        this.x = BUBBLE_RADIUS;
        this.vx *= -1;
      } else if (this.x + BUBBLE_RADIUS >= width) {
        this.x = width - BUBBLE_RADIUS;
        this.vx *= -1;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;

    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.popping) {
      ctx.globalAlpha = 1 - this.popProgress;
      ctx.scale(1 + this.popProgress, 1 + this.popProgress);
    }

    // Shadow
    ctx.beginPath();
    ctx.arc(2, 2, BUBBLE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fill();

    // Base color
    ctx.beginPath();
    ctx.arc(0, 0, BUBBLE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.stroke();

    // Highlight
    ctx.beginPath();
    ctx.arc(-BUBBLE_RADIUS * 0.3, -BUBBLE_RADIUS * 0.3, BUBBLE_RADIUS * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fill();

    ctx.restore();
  }
}
