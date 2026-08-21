window.addEventListener('DOMContentLoaded', () => {
    window.gameUI = new UI();
    window.game = new Game(window.gameUI);
    
    // Simulate background movement for menu
    setInterval(() => {
        if(window.game && !window.game.isActive) {
            window.game.clouds.forEach(c => {
                c.position.x -= 0.05;
                if(c.position.x < -40) c.position.x = 40;
            });
            window.game.renderer.render(window.game.scene, window.game.camera);
        }
    }, 1000/60);
});
