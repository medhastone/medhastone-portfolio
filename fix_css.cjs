const fs = require('fs');
let code = fs.readFileSync('public/games/racing-2d/css/style.css', 'utf8');

code += `
/* Mobile Controls */
.mobile-controls {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    pointer-events: none;
    z-index: 15;
}
.ctrl-left, .ctrl-right {
    display: flex;
    gap: 10px;
    pointer-events: auto;
}
.ctrl-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.4);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    transition: background 0.1s;
    user-select: none;
}
.ctrl-btn span {
    font-size: 2rem;
}
.ctrl-btn:active, .ctrl-btn.active {
    background: rgba(255,255,255,0.5);
}
@media (min-width: 768px) {
    .mobile-controls {
        display: none;
    }
}
`;

fs.writeFileSync('public/games/racing-2d/css/style.css', code);
