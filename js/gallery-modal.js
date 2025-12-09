// ============================================
// GALLERY MODAL - Carousel Functionality
// ============================================

(function() {
    'use strict';
    
    let currentProjectIndex = 0;
    let currentImageIndex = 0;
    let projects = [];

    // Obtener proyectos desde el módulo de galería
    function getProjects() {
        if (window.galleryProjects && window.galleryProjects.length > 0) {
            return window.galleryProjects;
        }
        return [];
    }

    /**
     * Extrae el nombre del proyecto y la ciudad del nombre de la carpeta
     */
    function parseProjectFolder(folderName) {
        const parts = folderName.split(' - ');
        if (parts.length >= 2) {
            return {
                name: parts[0].trim(),
                location: parts.slice(1).join(' - ').trim()
            };
        }
        return {
            name: folderName,
            location: ''
        };
    }

    /**
     * Abre el modal de galería con el proyecto seleccionado
     */
    window.openGalleryModal = function(projectIndex) {
        projects = getProjects();
        currentProjectIndex = projectIndex;
        currentImageIndex = 0;
        
        const project = projects[projectIndex];
        if (!project) return;
        
        const { name, location } = parseProjectFolder(project.folder);
        const modal = document.getElementById('galleryModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalLocation = document.getElementById('modalLocation');
        const modalCarousel = document.getElementById('modalCarousel');
        const modalCounter = document.getElementById('modalCounter');
        
        if (!modal || !modalTitle || !modalLocation || !modalCarousel || !modalCounter) {
            return;
        }
        
        // Configurar título y ubicación
        modalTitle.textContent = name;
        modalLocation.textContent = location || 'Proyecto completado';
        
        // Limpiar carrusel y contador
        modalCarousel.innerHTML = '';
        modalCounter.innerHTML = '';
        
        // Crear imágenes del carrusel
        project.images.forEach((image, index) => {
            const imagePath = `imgs/proyectos/${project.folder}/${image}`;
            
            // Imagen del carrusel
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';
            if (index === 0) carouselItem.classList.add('active');
            
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `${name} - Imagen ${index + 1}`;
            img.loading = 'lazy';
            
            carouselItem.appendChild(img);
            modalCarousel.appendChild(carouselItem);
            
            // Punto del contador
            const counterDot = document.createElement('div');
            counterDot.className = 'counter-dot';
            if (index === 0) counterDot.classList.add('active');
            counterDot.setAttribute('aria-label', `Imagen ${index + 1} de ${project.images.length}`);
            counterDot.addEventListener('click', () => goToImage(index));
            modalCounter.appendChild(counterDot);
        });
        
        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Actualizar navegación
        updateModalNavigation();
    };

    /**
     * Cierra el modal de galería
     */
    function closeGalleryModal() {
        const modal = document.getElementById('galleryModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    /**
     * Navega a una imagen específica
     */
    function goToImage(imageIndex) {
        projects = getProjects();
        const project = projects[currentProjectIndex];
        if (!project || imageIndex < 0 || imageIndex >= project.images.length) return;
        
        currentImageIndex = imageIndex;
        
        // Actualizar carrusel
        const carouselItems = document.querySelectorAll('.carousel-item');
        const counterDots = document.querySelectorAll('.counter-dot');
        
        carouselItems.forEach((item, index) => {
            item.classList.toggle('active', index === imageIndex);
        });
        
        counterDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === imageIndex);
        });
        
        updateModalNavigation();
    }

    /**
     * Navega a la imagen anterior
     */
    function prevImage() {
        projects = getProjects();
        const project = projects[currentProjectIndex];
        if (!project) return;
        
        const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : project.images.length - 1;
        goToImage(newIndex);
    }

    /**
     * Navega a la imagen siguiente
     */
    function nextImage() {
        projects = getProjects();
        const project = projects[currentProjectIndex];
        if (!project) return;
        
        const newIndex = currentImageIndex < project.images.length - 1 ? currentImageIndex + 1 : 0;
        goToImage(newIndex);
    }

    /**
     * Actualiza el estado de los botones de navegación
     */
    function updateModalNavigation() {
        projects = getProjects();
        const project = projects[currentProjectIndex];
        if (!project) return;
        
        const prevBtn = document.getElementById('modalPrev');
        const nextBtn = document.getElementById('modalNext');
        
        // Los botones siempre están habilitados (carrusel circular)
        if (prevBtn) prevBtn.style.opacity = '1';
        if (nextBtn) nextBtn.style.opacity = '1';
    }

    // Event listeners para el modal
    function initModalListeners() {
        const modal = document.getElementById('galleryModal');
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalPrev = document.getElementById('modalPrev');
        const modalNext = document.getElementById('modalNext');
        
        if (!modal) {
            setTimeout(initModalListeners, 200);
            return;
        }
        
        if (modalClose) {
            modalClose.addEventListener('click', closeGalleryModal);
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeGalleryModal);
        }
        
        if (modalPrev) {
            modalPrev.addEventListener('click', prevImage);
        }
        
        if (modalNext) {
            modalNext.addEventListener('click', nextImage);
        }
        
        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeGalleryModal();
            }
            // Navegación con flechas del teclado
            if (modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'ArrowRight') nextImage();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModalListeners);
    } else {
        initModalListeners();
    }
})();

