const fs = require('fs');
let code = fs.readFileSync('src/game/GameEngine.ts', 'utf8');

code = "import { Particle } from './Particle';\n" + code;

// Add particles array to class
code = code.replace(
    /fallingBubbles: Bubble\[\] = \[\];/g,
    `fallingBubbles: Bubble[] = [];\n  particles: Particle[] = [];`
);

// Spawn particles when matching
code = code.replace(
    /m\.popping = true;/g,
    `m.popping = true;\n            for(let i=0; i<8; i++) this.particles.push(new Particle(m.x, m.y, m.color));`
);

// Spawn particles for falling bubbles when they exit
code = code.replace(
    /this\.addScore\(20\);\n      \}/g,
    `this.addScore(20);\n        for(let i=0; i<8; i++) this.particles.push(new Particle(b.x, b.y, b.color));\n      }`
);

// Update particles
code = code.replace(
    /\/\/ Update falling bubbles/g,
    `// Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update(dt);
      if (p.life <= 0) this.particles.splice(i, 1);
    }
    
    // Update falling bubbles`
);

// Draw particles
code = code.replace(
    /this\.fallingBubbles\.forEach\(b => b\.draw\(this\.ctx\)\);/g,
    `this.fallingBubbles.forEach(b => b.draw(this.ctx));\n    this.particles.forEach(p => p.draw(this.ctx));`
);

fs.writeFileSync('src/game/GameEngine.ts', code);
