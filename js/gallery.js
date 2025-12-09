// ============================================
// GALLERY PROJECTS - Dynamic Loading
// ============================================

(function() {
    'use strict';
    
    /**
     * Lista de proyectos disponibles
     * Formato: { folder: "Nombre Proyecto - Ciudad Estado", images: ["imagen1.jpg", "imagen2.jpg", ...] }
     */
    const projects = [
        {
            folder: "Aeropuerto Internacional de Ciudad Obregón - Ciudad Obregon Sonora",
            images: ["Aeropuerto-obr.jpg"]
        },
        {
            folder: "Mazda - Ciudad Obregon Sonora",
            images: ["20241108_200332.jpg", "20241108_200348.jpg", "mazda-obr.jpg"]
        },
        {
            folder: "Residencia en San Carlos - San Carlos Sonora",
            images: ["20230923_162124.jpg", "20230923_162207.jpg"]
        }
    ];

    /**
     * Extrae el nombre del proyecto y la ciudad del nombre de la carpeta
     * Formato esperado: "Nombre Proyecto - Ciudad Estado"
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
     * Genera un elemento de galería para un proyecto
     */
    function createGalleryItem(project, index) {
        const { name, location } = parseProjectFolder(project.folder);
        const imagePath = `imgs/proyectos/${project.folder}/${project.images[0]}`;
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.projectIndex = index;
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = name;
        img.loading = 'lazy';
        
        // Manejar errores de carga de imagen
        img.onerror = function() {
            this.style.display = 'none';
        };
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        
        const title = document.createElement('h4');
        title.textContent = name;
        
        const locationText = document.createElement('p');
        locationText.textContent = location || 'Proyecto completado';
        
        overlay.appendChild(title);
        overlay.appendChild(locationText);
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        
        // Agregar event listener para abrir el modal
        galleryItem.addEventListener('click', () => {
            if (typeof window.openGalleryModal === 'function') {
                window.openGalleryModal(index);
            }
        });
        
        return galleryItem;
    }

    /**
     * Carga y renderiza los proyectos en la galería
     */
    function loadGalleryProjects() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;
        
        // Limpiar galería existente
        galleryGrid.innerHTML = '';
        
        // Generar elementos para cada proyecto
        projects.forEach((project, index) => {
            const galleryItem = createGalleryItem(project, index);
            galleryGrid.appendChild(galleryItem);
        });
        
        // Re-aplicar observador de animaciones a los nuevos elementos
        const newItems = galleryGrid.querySelectorAll('.gallery-item');
        newItems.forEach(item => {
            item.classList.add('fade-in', 'visible');
        });
    }

    // Cargar proyectos cuando el DOM esté listo
    function initGalleryProjects() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (galleryGrid) {
            loadGalleryProjects();
        }
    }

    // Exponer proyectos globalmente para el modal
    window.galleryProjects = projects;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGalleryProjects);
    } else {
        // Si el DOM ya está cargado, ejecutar después de un pequeño delay
        setTimeout(initGalleryProjects, 100);
    }
})();

