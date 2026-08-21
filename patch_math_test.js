import fs from 'fs';
console.log('Writing...');
fs.writeFileSync('public/games/mathgenius/style.css', 'test', 'utf-8');
console.log('Written!');
