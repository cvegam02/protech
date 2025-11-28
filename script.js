// ============================================
// HERO VIDEO BACKGROUND
// ============================================

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

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

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

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll indicator click
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

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
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .gallery-item, .contact-item, .stat-item, .product-card, .tech-feature, .tech-card, .partner-logo, .testimonial-card');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target, suffix = '', duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = statNumber.getAttribute('data-target');
            
            // Extraer el número y el sufijo (+, %, etc.)
            const match = targetValue.match(/^(\d+)(.*)$/);
            if (match) {
                const target = parseInt(match[1]);
                const suffix = match[2] || '';
                entry.target.classList.add('counted');
                animateCounter(statNumber, target, suffix);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
});

// ============================================
// FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Show success message (in a real app, this would send to a server)
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = '✓ Mensaje Enviado';
            submitButton.style.background = 'var(--accent-color)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }, 1500);

        // In production, you would send this data to your server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Handle success
        // })
        // .catch(error => {
        //     // Handle error
        // });
    });
}

// ============================================
// GALLERY INTERACTIVE EFFECTS
// ============================================

const galleryItems = document.querySelectorAll('.gallery-item');

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

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================

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

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle scroll events for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handlers
const throttledScroll = throttle(() => {
    activateNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ============================================
// GOOGLE MAPS REVIEWS INTEGRATION
// ============================================

/**
 * Función para cargar reseñas de Google Maps
 * 
 * OPCIÓN 1: Manual - Actualiza las reseñas directamente en el HTML
 * OPCIÓN 2: Automática - Usa la API de Google Places (requiere API key)
 * 
 * Para usar la API automática:
 * 1. Obtén una API key de Google Cloud Console
 * 2. Habilita la API de Places
 * 3. Reemplaza 'YOUR_API_KEY' y 'YOUR_PLACE_ID' abajo
 * 4. Descomenta la función loadGoogleReviews()
 */

// Configuración (descomenta y configura si usas API)
// const GOOGLE_PLACES_API_KEY = 'YOUR_API_KEY';
// const GOOGLE_PLACE_ID = 'YOUR_PLACE_ID'; // Obtén el Place ID desde Google Maps

/**
 * Carga reseñas desde Google Places API
 * Requiere: API key de Google Cloud Platform con Places API habilitada
 */
async function loadGoogleReviews() {
    const testimonialsContainer = document.querySelector('.testimonials-grid');
    if (!testimonialsContainer) return;

    // Si no hay API key configurada, no hacer nada
    if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
        console.log('Google Reviews: API key no configurada. Usando reseñas manuales.');
        return;
    }

    try {
        // Cargar el script de Google Maps si no está cargado
        if (!window.google || !window.google.maps) {
            await loadGoogleMapsScript();
        }

        const service = new google.maps.places.PlacesService(document.createElement('div'));
        
        service.getDetails({
            placeId: GOOGLE_PLACE_ID,
            fields: ['reviews', 'name', 'rating']
        }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
                testimonialsContainer.innerHTML = '';
                
                // Mostrar las primeras 3 reseñas
                place.reviews.slice(0, 3).forEach(review => {
                    const testimonialCard = createTestimonialCard(
                        review.rating,
                        review.text,
                        review.author_name,
                        review.relative_time_description || 'Cliente'
                    );
                    testimonialsContainer.appendChild(testimonialCard);
                });
            } else {
                console.log('No se pudieron cargar las reseñas de Google Maps');
            }
        });
    } catch (error) {
        console.error('Error cargando reseñas de Google:', error);
    }
}

/**
 * Carga el script de Google Maps
 */
function loadGoogleMapsScript() {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Crea una tarjeta de testimonio
 */
function createTestimonialCard(rating, text, authorName, authorRole) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    // Crear estrellas
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'testimonial-rating';
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.className = i < rating ? 'fas fa-star' : 'far fa-star';
        ratingDiv.appendChild(star);
    }
    
    // Texto del testimonio
    const textP = document.createElement('p');
    textP.className = 'testimonial-text';
    textP.textContent = `"${text}"`;
    
    // Autor
    const authorDiv = document.createElement('div');
    authorDiv.className = 'testimonial-author';
    
    const avatar = document.createElement('div');
    avatar.className = 'author-avatar';
    avatar.innerHTML = '<i class="fas fa-user"></i>';
    
    const authorInfo = document.createElement('div');
    authorInfo.className = 'author-info';
    authorInfo.innerHTML = `
        <h4>${authorName}</h4>
        <p>${authorRole}</p>
    `;
    
    authorDiv.appendChild(avatar);
    authorDiv.appendChild(authorInfo);
    
    card.appendChild(ratingDiv);
    card.appendChild(textP);
    card.appendChild(authorDiv);
    
    return card;
}

// Cargar reseñas cuando el DOM esté listo
// Descomenta la siguiente línea si quieres usar la API automática:
// document.addEventListener('DOMContentLoaded', loadGoogleReviews);

