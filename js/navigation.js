// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

(function() {
    'use strict';
    
    // Función para inicializar el navbar (se ejecuta después de que navbar.js lo cargue)
    function initNavbarFunctionality() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        const backToTop = document.getElementById('backToTop');
        
        // Verificar que los elementos existan
        if (!navbar || !hamburger || !navMenu) {
            console.log('Elementos del navbar no encontrados, reintentando...');
            setTimeout(initNavbarFunctionality, 200);
            return;
        }
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (navbar && window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else if (navbar) {
                navbar.classList.remove('scrolled');
            }

            // Show/hide back to top button
            if (backToTop && window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else if (backToTop) {
                backToTop.classList.remove('visible');
            }
        });

        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu when clicking on a link
        if (navLinks.length > 0 && hamburger && navMenu) {
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    // Inicializar cuando el DOM esté listo (después de que navbar.js lo cargue)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initNavbarFunctionality, 500);
        });
    } else {
        setTimeout(initNavbarFunctionality, 500);
    }

    // Active nav link on scroll (se inicializa después de que el navbar esté cargado)
    function initNavLinkActivation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) {
            setTimeout(initNavLinkActivation, 200);
            return;
        }
        
        function activateNavLink() {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) {
                        navLink.classList.add('active');
                    }
                }
            });
        }

        window.addEventListener('scroll', activateNavLink);
    }

    // Inicializar después de que el navbar esté cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initNavLinkActivation, 500);
        });
    } else {
        setTimeout(initNavLinkActivation, 500);
    }
})();

