import fs from 'fs';

const baseDir = 'public/games/mathgenius';

// 1. index.html
fs.writeFileSync(`${baseDir}/index.html`, `<!DOCTYPE html>
...`);
