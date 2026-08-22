import { Bubble } from './Bubble';
import { BUBBLE_RADIUS, BUBBLE_DIAMETER, ROW_HEIGHT, Point, BUBBLE_COLORS } from './types';

export class Grid {
  cols: number;
  rows: number;
  cells: (Bubble | null)[][] = [];
  offsetX: number = 0;
  offsetY: number = 0;
  dropOffset: number = 0;

  constructor(width: number, cols: number = 10, rows: number = 20) {
    this.cols = cols;
    this.rows = rows;
    
    // Center the grid in the canvas
    const maxGridWidth = cols * BUBBLE_DIAMETER + BUBBLE_RADIUS; // staggered rows are wider by 1 radius
    this.offsetX = (width - maxGridWidth) / 2 + BUBBLE_RADIUS;
    this.offsetY = BUBBLE_RADIUS;

    for (let r = 0; r < rows; r++) {
      this.cells[r] = [];
      for (let c = 0; c < cols; c++) {
        this.cells[r][c] = null;
      }
    }
  }

  getBubblePos(r: number, c: number): Point {
    const isOffset = (r % 2) !== 0;
    const x = this.offsetX + c * BUBBLE_DIAMETER + (isOffset ? BUBBLE_RADIUS : 0);
    const y = this.offsetY + this.dropOffset + r * ROW_HEIGHT;
    return { x, y };
  }

  getGridCell(x: number, y: number): { r: number, c: number } {
    const gridY = y - this.offsetY - this.dropOffset;
    const r = Math.round(gridY / ROW_HEIGHT);
    const isOffset = (r % 2) !== 0;
    const gridX = x - this.offsetX - (isOffset ? BUBBLE_RADIUS : 0);
    const c = Math.round(gridX / BUBBLE_DIAMETER);
    return { r, c };
  }

  addBubble(b: Bubble) {
    const cell = this.getGridCell(b.x, b.y);
    let { r, c } = cell;

    if (r < 0) r = 0;
    if (c < 0) c = 0;
    if (r >= this.rows) r = this.rows - 1;
    
    // Depending on staggered row, cols might be cols-1 for odd rows
    const maxC = (r % 2 !== 0) ? this.cols - 2 : this.cols - 1;
    if (c > maxC) c = maxC;

    // Prevent overwriting
    if (this.cells[r][c] !== null) {
        // Simple fallback
        for(let dr=-1; dr<=1; dr++){
            for(let dc=-1; dc<=1; dc++){
                const nr = r+dr; const nc = c+dc;
                if (nr>=0 && nr<this.rows && nc>=0 && nc<=maxC && !this.cells[nr][nc]){
                    r = nr; c = nc;
                    break;
                }
            }
        }
    }

    b.gridRow = r;
    b.gridCol = c;
    b.vx = 0;
    b.vy = 0;
    
    const pos = this.getBubblePos(r, c);
    b.x = pos.x;
    b.y = pos.y;
    
    if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
        this.cells[r][c] = b;
    }
    return {r, c};
  }

  getNeighbors(r: number, c: number): Bubble[] {
    const neighbors: Bubble[] = [];
    const isOffset = (r % 2) !== 0;
    const offsets = isOffset 
      ? [[0, -1], [0, 1], [-1, 0], [-1, 1], [1, 0], [1, 1]]
      : [[0, -1], [0, 1], [-1, -1], [-1, 0], [1, -1], [1, 0]];
      
    for (const [dr, dc] of offsets) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
        if (this.cells[nr][nc]) {
          neighbors.push(this.cells[nr][nc]!);
        }
      }
    }
    return neighbors;
  }

  findMatches(r: number, c: number, color: string): Bubble[] {
    const matches: Bubble[] = [];
    const visited = new Set<Bubble>();
    const stack: {r: number, c: number}[] = [{r, c}];

    while (stack.length > 0) {
      const curr = stack.pop()!;
      const bubble = this.cells[curr.r][curr.c];
      if (!bubble || visited.has(bubble) || bubble.color !== color) continue;

      visited.add(bubble);
      matches.push(bubble);

      const neighbors = this.getNeighbors(curr.r, curr.c);
      for (const n of neighbors) {
        stack.push({r: n.gridRow, c: n.gridCol});
      }
    }

    return matches;
  }

  findFloatingBubbles(): Bubble[] {
    const visited = new Set<Bubble>();
    const stack: Bubble[] = [];

    // Add all top row bubbles to stack
    for (let c = 0; c < this.cols; c++) {
      const b = this.cells[0][c];
      if (b) {
        stack.push(b);
        visited.add(b);
      }
    }

    // Traverse all connected bubbles
    while (stack.length > 0) {
      const curr = stack.pop()!;
      const neighbors = this.getNeighbors(curr.gridRow, curr.gridCol);
      for (const n of neighbors) {
        if (!visited.has(n)) {
          visited.add(n);
          stack.push(n);
        }
      }
    }

    // Any bubble not visited is floating
    const floating: Bubble[] = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const b = this.cells[r][c];
        if (b && !visited.has(b)) {
          floating.push(b);
        }
      }
    }
    return floating;
  }

  generateLevel(lines: number) {
    for (let r = 0; r < lines; r++) {
      const maxC = (r % 2 !== 0) ? this.cols - 1 : this.cols;
      for (let c = 0; c < maxC; c++) {
        const pos = this.getBubblePos(r, c);
        const color = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
        const b = new Bubble(pos.x, pos.y, color);
        b.gridRow = r;
        b.gridCol = c;
        this.cells[r][c] = b;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const b = this.cells[r][c];
        if (b) b.draw(ctx);
      }
    }
  }
}
