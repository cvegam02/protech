// ============================================
// BACK TO TOP BUTTON
// ============================================

(function() {
    'use strict';
    
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        
        if (!backToTop) {
            setTimeout(initBackToTop, 200);
            return;
        }
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initBackToTop, 500);
        });
    } else {
        setTimeout(initBackToTop, 500);
    }
})();

