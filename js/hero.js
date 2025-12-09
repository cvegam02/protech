// ============================================
// HERO VIDEO BACKGROUND
// ============================================

(function() {
    'use strict';
    
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Asegurar que el video se reproduzca
        heroVideo.addEventListener('loadedmetadata', () => {
            heroVideo.play().catch(err => {
                console.log('Video autoplay prevented:', err);
            });
        });

        // Reintentar reproducción si falla
        heroVideo.addEventListener('play', () => {
            heroVideo.play().catch(() => {});
        });

        // Manejar errores de carga
        heroVideo.addEventListener('error', () => {
            console.log('Error loading video, falling back to background image');
            const heroVideoBg = document.querySelector('.hero-video-bg');
            if (heroVideoBg) {
                heroVideoBg.style.background = 
                    'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(10, 10, 10, 0.9) 100%), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80") center/cover no-repeat';
            }
        });

        // Pausar video cuando no está visible (opcional, para ahorrar recursos)
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(() => {});
                } else {
                    // Opcional: pausar cuando no está visible
                    // heroVideo.pause();
                }
            });
        }, { threshold: 0.5 });

        videoObserver.observe(heroVideo);
    }
})();

