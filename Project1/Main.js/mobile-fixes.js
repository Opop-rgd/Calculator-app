(function() {
    // Предотвращение масштабирования при двойном тапе
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Предотвращение bounce-эффекта на iOS
    document.addEventListener('touchmove', function(event) {
        if (event.scale !== 1) {
            event.preventDefault();
        }
    }, { passive: false });

    // Улучшение отзывчивости на мобильных
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
})();