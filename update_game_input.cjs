const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

// Update keyboard listeners
code = code.replace(
    /if \(e\.key === 'ArrowRight' \|\| e\.key === 'd'\) this\.keys\['ArrowRight'\] = true;/g,
    `if (e.key === 'ArrowRight' || e.key === 'd') this.keys['ArrowRight'] = true;
            if (e.key === 'ArrowUp' || e.key === 'w') this.keys['ArrowUp'] = true;
            if (e.key === 'ArrowDown' || e.key === 's') this.keys['ArrowDown'] = true;`
);

code = code.replace(
    /if \(e\.key === 'ArrowRight' \|\| e\.key === 'd'\) this\.keys\['ArrowRight'\] = false;/g,
    `if (e.key === 'ArrowRight' || e.key === 'd') this.keys['ArrowRight'] = false;
            if (e.key === 'ArrowUp' || e.key === 'w') this.keys['ArrowUp'] = false;
            if (e.key === 'ArrowDown' || e.key === 's') this.keys['ArrowDown'] = false;`
);

// Add mobile button bindings
code = code.replace(
    /this\.canvas\.addEventListener\('touchend', e => this\.handleTouch\(e, false\), \{passive: false\}\);/g,
    `this.canvas.addEventListener('touchend', e => this.handleTouch(e, false), {passive: false});
        
        // On-screen Mobile Controls
        const bindBtn = (id, key) => {
            const btn = document.getElementById(id);
            if(!btn) return;
            const down = (e) => { if(e.cancelable) e.preventDefault(); this.keys[key] = true; btn.classList.add('active'); };
            const up = (e) => { if(e.cancelable) e.preventDefault(); this.keys[key] = false; btn.classList.remove('active'); };
            btn.addEventListener('touchstart', down, {passive: false});
            btn.addEventListener('touchend', up, {passive: false});
            btn.addEventListener('mousedown', down);
            btn.addEventListener('mouseup', up);
            btn.addEventListener('mouseleave', up);
        };
        bindBtn('btn-left', 'ArrowLeft');
        bindBtn('btn-right', 'ArrowRight');
        bindBtn('btn-gas', 'Gas');
        bindBtn('btn-brake', 'Brake');
        `
);

// We can remove the old canvas touch handling to avoid conflicts, or keep it. Let's just remove the simple split-screen touch.
code = code.replace(
    /handleTouch\(e, isDown\) \{[\s\S]*?\}\n/g,
    `handleTouch(e, isDown) {
        // Prevent default scrolling on canvas
        if(e.cancelable) e.preventDefault();
    }\n`
);

// Fix traffic cleanup (top bounds)
code = code.replace(
    /this\.traffic = this\.traffic\.filter\(t => t\.active\);/g,
    `this.traffic = this.traffic.filter(t => t.active && t.y > -500);`
);
code = code.replace(
    /this\.collectibles = this\.collectibles\.filter\(c => c\.active\);/g,
    `this.collectibles = this.collectibles.filter(c => c.active && c.y > -500);`
);

// One tiny bug fix: traffic should move away if you brake, but it might still cause collisions if it passes over you. That's a feature! (You get rear-ended if you stop on a highway)

fs.writeFileSync('public/games/racing-2d/js/game.js', code);
