// ============================================
// TESTIMONIALS CAROUSEL
// ============================================

(function() {
    'use strict';
    
    function initTestimonialsCarousel() {
        const carousel = document.getElementById('testimonialsCarousel');
        const track = document.getElementById('testimonialsTrack');
        const grid = document.getElementById('testimonialsGrid');
        const prevBtn = document.getElementById('testimonialsPrev');
        const nextBtn = document.getElementById('testimonialsNext');
        
        if (!carousel || !track || !grid || !prevBtn || !nextBtn) {
            // Reintentar después de que se carguen los reviews de Google
            setTimeout(initTestimonialsCarousel, 1000);
            return;
        }
        
        let currentIndex = 0;
        let cardsPerView = 3; // Por defecto 3 en desktop
        
        // Calcular cuántas tarjetas mostrar según el ancho de la pantalla
        function updateCardsPerView() {
            if (window.innerWidth <= 768) {
                cardsPerView = 1;
            } else if (window.innerWidth <= 1024) {
                cardsPerView = 2;
            } else {
                cardsPerView = 3;
            }
        }
        
        function updateCarousel() {
            updateCardsPerView();
            const cards = grid.querySelectorAll('.testimonial-card');
            const totalCards = cards.length;
            
            if (totalCards === 0) {
                return;
            }
            
            // Asegurar que currentIndex no exceda el máximo
            const maxIndex = Math.max(0, totalCards - cardsPerView);
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            // Calcular el desplazamiento
            const firstCard = cards[0];
            if (!firstCard) return;
            
            const cardWidth = firstCard.offsetWidth;
            const gap = parseFloat(window.getComputedStyle(grid).gap) || 24;
            const translateX = -(currentIndex * (cardWidth + gap));
            
            grid.style.transform = `translateX(${translateX}px)`;
            
            // Actualizar estado de los botones
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
            
            // Mostrar/ocultar botones según estado
            if (prevBtn.disabled) {
                prevBtn.style.opacity = '0.4';
            } else {
                prevBtn.style.opacity = '1';
            }
            
            if (nextBtn.disabled) {
                nextBtn.style.opacity = '0.4';
            } else {
                nextBtn.style.opacity = '1';
            }
        }
        
        function nextSlide() {
            const cards = grid.querySelectorAll('.testimonial-card');
            const totalCards = cards.length;
            const maxIndex = Math.max(0, totalCards - cardsPerView);
            
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Actualizar en resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCarousel();
            }, 250);
        });
        
        // Use MutationObserver to detect when Google Reviews are loaded
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if new testimonial cards were added
                    const newCards = Array.from(mutation.addedNodes).filter(node => 
                        node.classList && node.classList.contains('testimonial-card')
                    );
                    if (newCards.length > 0) {
                        updateCarousel();
                    }
                }
            }
        });

        // Observe the testimonialsGrid for changes
        if (grid) {
            observer.observe(grid, { childList: true });
        }
        
        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(updateCarousel, 500);
            });
        } else {
            setTimeout(updateCarousel, 500);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTestimonialsCarousel);
    } else {
        setTimeout(initTestimonialsCarousel, 1000);
    }
})();

