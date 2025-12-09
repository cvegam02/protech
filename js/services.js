// ============================================
// SERVICE CARDS CLICKABLE
// ============================================

(function() {
    'use strict';
    
    function setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card-secondary');
        
        if (serviceCards.length === 0) {
            console.log('No se encontraron tarjetas de servicio, reintentando...');
            setTimeout(setupServiceCards, 500);
            return;
        }
        
        console.log('Configurando', serviceCards.length, 'tarjetas de servicio');
        
        serviceCards.forEach((card, index) => {
            // Buscar el enlace dentro de la tarjeta
            const link = card.querySelector('.service-link');
            if (!link) {
                console.warn('Tarjeta', index, ': No se encontró enlace');
                return;
            }
            
            const href = link.getAttribute('href');
            if (!href) {
                console.warn('Tarjeta', index, ': No se encontró href');
                return;
            }
            
            console.log('Tarjeta', index, 'configurada con href:', href);
            
            // Hacer toda la tarjeta clickeable
            card.style.cursor = 'pointer';
            
            // Agregar el listener de click
            card.addEventListener('click', function(e) {
                // Si el click fue en el enlace, dejar que el enlace maneje la navegación
                const clickedLink = e.target.closest('.service-link');
                if (clickedLink) {
                    console.log('Click en el enlace, dejando que maneje la navegación');
                    return;
                }
                
                console.log('Click en la tarjeta, navegando a:', href);
                
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

