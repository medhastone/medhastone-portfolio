const fs = require('fs');

let game = fs.readFileSync('public/games/racing-2d/js/game.js', 'utf8');

const newHandleTouch = `handleTouch(e, isDown) {
        if(e.cancelable) e.preventDefault();
        
        // Reset keys
        this.keys['ArrowLeft'] = false;
        this.keys['ArrowRight'] = false;
        
        if (isDown) {
            for (let i = 0; i < e.touches.length; i++) {
                const touch = e.touches[i];
                // Check if touch is on canvas (left/right)
                if (touch.target === this.canvas) {
                    const rect = this.canvas.getBoundingClientRect();
                    const x = touch.clientX - rect.left;
                    if (x < rect.width / 2) {
                        this.keys['ArrowLeft'] = true;
                    } else {
                        this.keys['ArrowRight'] = true;
                    }
                }
            }
        }
    }`;

game = game.replace(/handleTouch\(e, isDown\) \{[\s\S]*?\}\n/g, newHandleTouch + "\n");

fs.writeFileSync('public/games/racing-2d/js/game.js', game);
