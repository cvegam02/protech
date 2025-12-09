// ============================================
// SCROLL ANIMATIONS
// ============================================

(function() {
    'use strict';
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.feature-card, .service-card, .gallery-item, .contact-item, .stat-item, .product-card, .tech-feature, .tech-card, .partner-logo, .testimonial-card');
        
        if (animateElements.length === 0) {
            setTimeout(initScrollAnimations, 200);
            return;
        }
        
        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }
})();

