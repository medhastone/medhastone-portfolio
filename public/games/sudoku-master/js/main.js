window.addEventListener('DOMContentLoaded', () => {
    window.particles = new Particles();
    window.gameUI = new UI();
    window.game = new Game(window.gameUI);
});
