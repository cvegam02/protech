// ============================================
// SMOOTH SCROLLING
// ============================================

(function() {
    'use strict';
    
    function initSmoothScrolling() {
        const anchors = document.querySelectorAll('a[href^="#"]');
        
        if (anchors.length === 0) {
            setTimeout(initSmoothScrolling, 200);
            return;
        }
        
        anchors.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Inicializar después de que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initSmoothScrolling, 300);
        });
    } else {
        setTimeout(initSmoothScrolling, 300);
    }

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
})();

