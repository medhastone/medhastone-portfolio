const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/index.html', 'utf8');

const controlsHTML = `
            <!-- Mobile Controls -->
            <div class="mobile-controls" id="mobile-controls">
                <div class="ctrl-left">
                    <button class="ctrl-btn" id="btn-left"><span class="material-symbols-rounded">keyboard_arrow_left</span></button>
                    <button class="ctrl-btn" id="btn-right"><span class="material-symbols-rounded">keyboard_arrow_right</span></button>
                </div>
                <div class="ctrl-right">
                    <button class="ctrl-btn" id="btn-brake"><span class="material-symbols-rounded">keyboard_arrow_down</span></button>
                    <button class="ctrl-btn" id="btn-gas"><span class="material-symbols-rounded">keyboard_arrow_up</span></button>
                </div>
            </div>
            
            <!-- Pause Overlay -->`;

code = code.replace(/<!-- Pause Overlay -->/g, controlsHTML);
fs.writeFileSync('public/games/racing-2d/index.html', code);
