// ============================================
// GALLERY INTERACTIVE EFFECTS
// ============================================

(function() {
    'use strict';
    
    function initGalleryEffects() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (galleryItems.length === 0) {
            setTimeout(initGalleryEffects, 200);
            return;
        }
        
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });

            item.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });

            // Lazy loading for images
            const img = item.querySelector('img');
            if (img && 'loading' in HTMLImageElement.prototype) {
                img.loading = 'lazy';
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGalleryEffects);
    } else {
        initGalleryEffects();
    }
})();

