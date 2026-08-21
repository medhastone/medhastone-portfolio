window.addEventListener('DOMContentLoaded', () => {
    // Prevent default context menu on right click globally
    document.addEventListener('contextmenu', event => event.preventDefault());
    
    // Initialize UI and Game
    window.gameUI = new UI();
});
