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
                    console.warn('No se encontró .stat-number en:', entry.target);
                    return;
                }
                
                const targetValue = statNumber.getAttribute('data-target');
                if (!targetValue) {
                    console.warn('No se encontró data-target en:', statNumber);
                    return;
                }
                
                // Extraer el número y el sufijo (+, %, etc.)
                const match = targetValue.match(/^(\d+)(.*)$/);
                if (match) {
                    const target = parseInt(match[1]);
                    const suffix = match[2] || '';
                    entry.target.classList.add('counted');
                    animateCounter(statNumber, target, suffix);
                } else {
                    console.warn('No se pudo parsear data-target:', targetValue);
                }
            }
        });
    }, { threshold: 0.5 });

    // Inicializar observer de stats
    function initStatsObserver() {
        const statItems = document.querySelectorAll('.stat-item');
        if (statItems.length > 0) {
            console.log('Inicializando observer de stats para', statItems.length, 'elementos');
            statItems.forEach(item => {
                statsObserver.observe(item);
            });
        } else {
            console.warn('No se encontraron elementos .stat-item');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStatsObserver);
    } else {
        // Si el DOM ya está cargado, ejecutar inmediatamente
        initStatsObserver();
    }
})();

