// ============================================
// COUNTER ANIMATION
// ============================================

(function() {
    'use strict';
    
    function animateCounter(element, target, suffix = '', duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + suffix;
            }
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (!statNumber) {
                    return;
                }
                
                const targetValue = statNumber.getAttribute('data-target');
                if (!targetValue) {
                    return;
                }
                
                // Extraer el número y el sufijo (+, %, etc.)
                const match = targetValue.match(/^(\d+)(.*)$/);
                if (match) {
                    const target = parseInt(match[1]);
                    const suffix = match[2] || '';
                    entry.target.classList.add('counted');
                    animateCounter(statNumber, target, suffix);
                }
            }
        });
    }, { threshold: 0.5 });

    // Inicializar observer de stats
    function initStatsObserver() {
        const statItems = document.querySelectorAll('.stat-item');
        if (statItems.length > 0) {
            statItems.forEach(item => {
                statsObserver.observe(item);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStatsObserver);
    } else {
        // Si el DOM ya está cargado, ejecutar inmediatamente
        initStatsObserver();
    }
})();

