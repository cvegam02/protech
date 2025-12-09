// ============================================
// SERVICE CARDS CLICKABLE
// ============================================

(function() {
    'use strict';
    
    function setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card-secondary');
        
        if (serviceCards.length === 0) {
            setTimeout(setupServiceCards, 500);
            return;
        }
        
        serviceCards.forEach((card) => {
            // Buscar el enlace dentro de la tarjeta
            const link = card.querySelector('.service-link');
            if (!link) {
                return;
            }
            
            const href = link.getAttribute('href');
            if (!href) {
                return;
            }
            
            // Hacer toda la tarjeta clickeable
            card.style.cursor = 'pointer';
            
            // Agregar el listener de click
            card.addEventListener('click', function(e) {
                // Si el click fue en el enlace, dejar que el enlace maneje la navegación
                const clickedLink = e.target.closest('.service-link');
                if (clickedLink) {
                    return;
                }
                
                // Prevenir cualquier otro comportamiento
                e.preventDefault();
                e.stopPropagation();
                
                // Navegar a la página del servicio
                window.location.href = href;
            });
        });
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(setupServiceCards, 100);
        });
    } else {
        setTimeout(setupServiceCards, 100);
    }
})();

