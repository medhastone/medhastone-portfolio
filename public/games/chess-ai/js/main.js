window.addEventListener('DOMContentLoaded', () => {
    window.gameUI = new UI();
    window.game = new Game(window.gameUI);
    window.game.initBoard(); // Initialize the board UI early
});
