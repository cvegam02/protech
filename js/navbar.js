// ============================================
// NAVBAR COMPONENT - Reutilizable para todas las páginas
// ============================================

(function() {
    'use strict';
    
    // Detectar la página actual para marcar el link activo
    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        if (page === 'index.html' || page === '' || page === '/') {
            return 'home';
        } else if (page.includes('servicio-vehiculos')) {
            return 'vehiculos';
        } else if (page.includes('servicio-residencial')) {
            return 'residencial';
        } else if (page.includes('servicio-comercial')) {
            return 'comercial';
        } else if (page.includes('servicio-industrial')) {
            return 'industrial';
        } else if (page.includes('articulos') || page.includes('sabias-que')) {
            return 'articulos';
        }
        return 'home';
    }
    
    // Generar el HTML del navbar
    function generateNavbar() {
        const currentPage = getCurrentPage();
        const isHomePage = currentPage === 'home';
        
        // Todas las páginas están en la misma carpeta raíz, así que no necesitamos ../
        // Solo usamos rutas relativas simples
        const basePath = '';
        
        return `
            <nav class="navbar" id="navbar">
                <div class="container">
                    <div class="nav-wrapper">
                        <div class="logo">
                            <a href="index.html" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.5rem;">
                                <img src="imgs/logo.png" alt="Protech Films Logo" class="logo-img">
                            </a>
                        </div>
                        <ul class="nav-menu" id="navMenu">
                            <li><a href="index.html#home" class="nav-link ${currentPage === 'home' ? 'active' : ''}">Inicio</a></li>
                            <li><a href="index.html#services" class="nav-link ${currentPage === 'home' ? '' : ''}">Servicios</a></li>
                            <li><a href="index.html#about" class="nav-link ${currentPage === 'home' ? '' : ''}">Nosotros</a></li>
                            <li><a href="index.html#gallery" class="nav-link ${currentPage === 'home' ? '' : ''}">Galería</a></li>
                            <li><a href="articulos.html" class="nav-link ${currentPage === 'articulos' ? 'active' : ''}">¿Sabías que?</a></li>
                            <li><a href="index.html#contact" class="nav-link ${currentPage === 'home' ? '' : ''}">Contacto</a></li>
                        </ul>
                        <a href="index.html#contact" class="nav-map-icon" aria-label="Ver ubicación en mapa" title="Nuestra Ubicación">
                            <i class="fas fa-map-marker-alt"></i>
                        </a>
                        <div class="hamburger" id="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
    
    // Insertar el navbar en el DOM
    function initNavbar() {
        // Buscar el contenedor del navbar o crear uno
        let navbarContainer = document.getElementById('navbar-container');
        
        if (!navbarContainer) {
            // Si no existe, buscar el navbar existente y reemplazarlo
            const existingNavbar = document.querySelector('.navbar');
            if (existingNavbar) {
                navbarContainer = existingNavbar.parentElement;
                existingNavbar.remove();
            } else {
                // Crear contenedor antes del body content
                navbarContainer = document.createElement('div');
                navbarContainer.id = 'navbar-container';
                const body = document.body;
                if (body.firstChild) {
                    body.insertBefore(navbarContainer, body.firstChild);
                } else {
                    body.appendChild(navbarContainer);
                }
            }
        }
        
        // Insertar el navbar
        navbarContainer.innerHTML = generateNavbar();
        
        // Inicializar funcionalidad del hamburger si existe
        initHamburger();
        
        // Inicializar scroll suave para links internos
        initSmoothScroll();
    }
    
    // Inicializar funcionalidad del menú hamburger
    function initHamburger() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Cerrar menú al hacer click en un link
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }
    
    // Inicializar scroll suave para links internos
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Solo aplicar scroll suave si es un link interno (no externo)
                if (href.startsWith('#') && href !== '#') {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();

