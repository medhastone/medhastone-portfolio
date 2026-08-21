// Define premium shapes and their base colors
export const COLORS = [
    '#0ea5e9', // cyan
    '#3b82f6', // blue
    '#a855f7', // purple
    '#f43f5e', // rose
    '#10b981', // emerald
    '#eab308', // yellow
    '#f97316'  // orange
];

export const SHAPES = [
    // 1x1 Dot
    { matrix: [[1]], colorIdx: 5 },
    
    // 2x2 Square
    { matrix: [
        [1, 1],
        [1, 1]
    ], colorIdx: 4 },
    
    // 3x3 Square
    { matrix: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ], colorIdx: 3 },
    
    // Lines
    { matrix: [[1, 1]], colorIdx: 0 }, // 2x1
    { matrix: [[1], [1]], colorIdx: 0 }, // 1x2
    { matrix: [[1, 1, 1]], colorIdx: 1 }, // 3x1
    { matrix: [[1], [1], [1]], colorIdx: 1 }, // 1x3
    { matrix: [[1, 1, 1, 1]], colorIdx: 2 }, // 4x1
    { matrix: [[1], [1], [1], [1]], colorIdx: 2 }, // 1x4
    { matrix: [[1, 1, 1, 1, 1]], colorIdx: 6 }, // 5x1
    { matrix: [[1], [1], [1], [1], [1]], colorIdx: 6 }, // 1x5

    // Small L-Shapes (2x2 bounding box)
    { matrix: [[1, 0], [1, 1]], colorIdx: 3 },
    { matrix: [[0, 1], [1, 1]], colorIdx: 3 },
    { matrix: [[1, 1], [1, 0]], colorIdx: 3 },
    { matrix: [[1, 1], [0, 1]], colorIdx: 3 },

    // Large L-Shapes (3x3 bounding box)
    { matrix: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
    ], colorIdx: 4 },
    { matrix: [
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1]
    ], colorIdx: 4 },
    { matrix: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]
    ], colorIdx: 4 },
    { matrix: [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ], colorIdx: 4 },
    
    // T-Shapes
    { matrix: [
        [1, 1, 1],
        [0, 1, 0]
    ], colorIdx: 0 },
    { matrix: [
        [0, 1, 0],
        [1, 1, 1]
    ], colorIdx: 0 },
    { matrix: [
        [1, 0],
        [1, 1],
        [1, 0]
    ], colorIdx: 0 },
    { matrix: [
        [0, 1],
        [1, 1],
        [0, 1]
    ], colorIdx: 0 },
];

export function getRandomShapes(count = 3) {
    const selected = [];
    for(let i=0; i<count; i++) {
        const rand = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        selected.push(JSON.parse(JSON.stringify(rand))); // deep copy
    }
    return selected;
}
