// ============================================
// KEYBOARD NAVIGATION
// ============================================

(function() {
    'use strict';
    
    // Close mobile menu on Escape key
    function initKeyboardNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (!hamburger || !navMenu) {
            setTimeout(initKeyboardNavigation, 200);
            return;
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initKeyboardNavigation, 500);
        });
    } else {
        setTimeout(initKeyboardNavigation, 500);
    }
})();

