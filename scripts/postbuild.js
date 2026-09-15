import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');

// Read the compiled index.html
const indexHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('Build failed: dist/index.html not found.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// List of all SPA routes that need physical index.html files for static hosts
const routes = [
  'random-pokemon-generator',
  'pokemon-compare',
  'pokemon-favorite-tournament',
  'whos-that-pokemon',
  'pokemon-nickname-generator',
  'pokemon-iv-calculator',
  'pokemon-nuzlocke-tracker',
  'parkdock',
  'parkdock/privacy-policy',
  'medijourney',
  'medijourney/privacy-policy',
  'brainmaze',
  'brainmaze/privacy-policy',
  'rojgarbahi',
  'rojgarbahi/privacy-policy',
  'pdfzero',
  'pdfzero/privacy-policy',
  'lexibrain',
  'lexibrain/privacy-policy',
  'play-games',
  'play-games/bubble-mania',
  'play-games/neon-snake',
  'play-games/sudoku-master',
  'play-games/block-stack',
  'play-games/minesweeper',
  'play-games/space-shooter',
  'play-games/typing-speed',
  'play-games/pong-classic',
  'play-games/racing-2d',
  'play-games/tic-tac-toe',
  'play-games/wordverse',
  'play-games/mathgenius',
  'play-games/arrow-scape',
  'play-games/color-dash',
  'play-games/flappy-bird',
  'play-games/chess-ai',
  'play-games/memory-match'
];

routes.forEach(route => {
  const dirPath = path.join(distDir, route);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'index.html'), indexHtml, 'utf8');
});

// Also create a 404.html for GitHub Pages and similar hosts
fs.writeFileSync(path.join(distDir, '404.html'), indexHtml, 'utf8');

console.log('Postbuild static route generation completed successfully.');
