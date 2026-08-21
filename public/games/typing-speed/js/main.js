window.addEventListener('DOMContentLoaded', () => {
    // Prevent default scrolling on mobile to keep game fixed
    document.body.addEventListener('touchmove', (e) => { e.preventDefault(); }, { passive: false });
    
    // Initialize UI and Game
    window.gameUI = new UI();
});
