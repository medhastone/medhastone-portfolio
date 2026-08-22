export const BUBBLE_COLORS = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#22c55e', // Green
  '#eab308', // Yellow
  '#a855f7', // Purple
  '#f97316', // Orange
];

export const BUBBLE_RADIUS = 20;
export const BUBBLE_DIAMETER = BUBBLE_RADIUS * 2;
export const ROW_HEIGHT = BUBBLE_RADIUS * Math.sqrt(3);

export interface Point {
  x: number;
  y: number;
}
