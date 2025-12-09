// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================

(function() {
    'use strict';
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroVideoBg = document.querySelector('.hero-video-bg');
        const heroPattern = document.querySelector('.hero-pattern');
        
        if (hero && scrolled < window.innerHeight) {
            if (heroVideoBg) {
                heroVideoBg.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            if (heroPattern) {
                heroPattern.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
            }
        }
    });
})();

