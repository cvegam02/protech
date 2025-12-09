// ============================================
// PROJECTS MODAL FOR VEHICULOS PAGE
// ============================================

// Datos de los proyectos
const vehicleProjects = [
    {
        name: 'Peugeot',
        image: 'imgs/servicio-autos/proyectos/Peugeot.jpeg',
        tint: 'Tintado 25%'
    },
    {
        name: 'Audi',
        image: 'imgs/servicio-autos/proyectos/Audi.jpeg',
        tint: 'Tintado 30%'
    },
    {
        name: 'Dodge',
        image: 'imgs/servicio-autos/proyectos/Dondge.jpeg',
        tint: 'Tintado 15%'
    },
    {
        name: 'Toyota',
        image: 'imgs/servicio-autos/proyectos/Toyota.jpeg',
        tint: 'Tintado 20%'
    },
    {
        name: 'Jeep',
        image: 'imgs/servicio-autos/proyectos/Jeep.jpeg',
        tint: 'Tintado 5%'
    },
    {
        name: 'Volkswagen',
        image: 'imgs/servicio-autos/proyectos/VolksWagen.jpeg',
        tint: 'Tintado 35%'
    }
];

let currentProjectIndex = 0;

/**
 * Abre el modal con el proyecto seleccionado
 */
function openProjectModal(projectIndex) {
    if (projectIndex < 0 || projectIndex >= vehicleProjects.length) return;
    
    currentProjectIndex = projectIndex;
    const project = vehicleProjects[projectIndex];
    
    const modal = document.getElementById('projectsModal');
    const modalTitle = document.getElementById('projectsModalTitle');
    const modalTint = document.getElementById('projectsModalTint');
    const modalCarousel = document.getElementById('projectsModalCarousel');
    const modalCounter = document.getElementById('projectsModalCounter');
    
    // Configurar título y tintado
    modalTitle.textContent = project.name;
    modalTint.textContent = project.tint;
    
    // Limpiar carrusel y contador
    modalCarousel.innerHTML = '';
    modalCounter.innerHTML = '';
    
    // Crear todas las imágenes del carrusel (para navegación fluida)
    vehicleProjects.forEach((proj, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        if (index === projectIndex) carouselItem.classList.add('active');
        
        const img = document.createElement('img');
        img.src = proj.image;
        img.alt = `${proj.name} - ${proj.tint}`;
        img.loading = index === projectIndex ? 'eager' : 'lazy';
        
        carouselItem.appendChild(img);
        modalCarousel.appendChild(carouselItem);
        
        // Punto del contador para cada proyecto
        const counterDot = document.createElement('div');
        counterDot.className = 'counter-dot';
        if (index === projectIndex) counterDot.classList.add('active');
        counterDot.setAttribute('aria-label', `Proyecto ${index + 1} de ${vehicleProjects.length}`);
        counterDot.addEventListener('click', () => goToProject(index));
        modalCounter.appendChild(counterDot);
    });
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Actualizar navegación
    updateProjectNavigation();
}

/**
 * Cierra el modal de proyectos
 */
function closeProjectModal() {
    const modal = document.getElementById('projectsModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Navega a un proyecto específico
 */
function goToProject(projectIndex) {
    if (projectIndex < 0 || projectIndex >= vehicleProjects.length) return;
    
    currentProjectIndex = projectIndex;
    const project = vehicleProjects[projectIndex];
    
    const modalTitle = document.getElementById('projectsModalTitle');
    const modalTint = document.getElementById('projectsModalTint');
    const modalCarousel = document.getElementById('projectsModalCarousel');
    const counterDots = document.querySelectorAll('#projectsModalCounter .counter-dot');
    const carouselItems = modalCarousel.querySelectorAll('.carousel-item');
    
    // Actualizar título y tintado
    modalTitle.textContent = project.name;
    modalTint.textContent = project.tint;
    
    // Actualizar carrusel (mostrar la imagen activa)
    carouselItems.forEach((item, index) => {
        item.classList.toggle('active', index === projectIndex);
    });
    
    // Actualizar contador
    counterDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === projectIndex);
    });
    
    updateProjectNavigation();
}

/**
 * Navega al proyecto anterior
 */
function prevProject() {
    const newIndex = currentProjectIndex > 0 ? currentProjectIndex - 1 : vehicleProjects.length - 1;
    goToProject(newIndex);
}

/**
 * Navega al proyecto siguiente
 */
function nextProject() {
    const newIndex = currentProjectIndex < vehicleProjects.length - 1 ? currentProjectIndex + 1 : 0;
    goToProject(newIndex);
}

/**
 * Actualiza la visibilidad de los botones de navegación
 */
function updateProjectNavigation() {
    const modalPrev = document.getElementById('projectsModalPrev');
    const modalNext = document.getElementById('projectsModalNext');
    
    if (modalPrev && modalNext) {
        // Mostrar siempre los botones ya que tenemos múltiples proyectos
        modalPrev.style.display = 'flex';
        modalNext.style.display = 'flex';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Agregar event listeners a las tarjetas de proyecto
    const projectCards = document.querySelectorAll('.service-projects .project-card');
    projectCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            openProjectModal(index);
        });
    });
    
    // Event listeners del modal
    const modal = document.getElementById('projectsModal');
    const modalClose = document.getElementById('projectsModalClose');
    const modalOverlay = document.getElementById('projectsModalOverlay');
    const modalPrev = document.getElementById('projectsModalPrev');
    const modalNext = document.getElementById('projectsModalNext');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProjectModal);
    }
    
    if (modalPrev) {
        modalPrev.addEventListener('click', prevProject);
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', nextProject);
    }
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProjectModal();
        }
        // Navegación con flechas del teclado
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') prevProject();
            if (e.key === 'ArrowRight') nextProject();
        }
    });
});

