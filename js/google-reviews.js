// ============================================
// GOOGLE PLACES API - REVIEWS INTEGRATION
// ============================================

// CONFIGURACIÓN - ACTUALIZA ESTOS VALORES
const GOOGLE_PLACES_CONFIG = {
    apiKey: 'AIzaSyCXn3qNPW5Hbhf-iPNjR2MFxsGn3wkVVl0', // Reemplaza con tu API Key
    placeId: 'ChIJVXXYbPQVyIYRBW6r2rbiwto', // Reemplaza con el Place ID de tu negocio
    language: 'es', // Idioma para las reviews
    maxReviews: 6 // Número máximo de reviews a mostrar
};

/**
 * Obtiene los detalles del lugar incluyendo reviews desde Google Places API
 */
async function fetchGoogleReviews() {
    const { apiKey, placeId, language, maxReviews } = GOOGLE_PLACES_CONFIG;
    
    // Validar configuración
    if (!apiKey || apiKey === 'YOUR_GOOGLE_PLACES_API_KEY' || !placeId || placeId === 'YOUR_PLACE_ID') {
        console.warn('Google Places API: Por favor configura tu API Key y Place ID en google-reviews.js');
        return null;
    }
    
    // Usar Places API (Classic) primero - es más confiable y compatible
    try {
        console.log('Intentando obtener reviews con API clásica...');
        const result = await fetchGoogleReviewsClassic(apiKey, placeId, language, maxReviews);
        console.log('API clásica exitosa:', result);
        return result;
    } catch (error) {
        console.error('Error al obtener reviews con API clásica:', error);
        console.log('Intentando con API nueva como fallback...');
        
        // Fallback: Intentar con Places API (New) si la clásica falla
        try {
            const url = `https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,rating,userRatingCount,reviews&languageCode=${language}&key=${apiKey}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': apiKey,
                    'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews'
                }
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error en respuesta:', response.status, errorText);
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('API nueva exitosa:', data);
            return data;
        } catch (fallbackError) {
            console.error('Error en API nueva:', fallbackError);
            return null;
        }
    }
}

/**
 * Usa Places API (Classic) - Place Details
 */
async function fetchGoogleReviewsClassic(apiKey, placeId, language, maxReviews) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=${language}&key=${apiKey}`;
    
    console.log('Haciendo petición a Places API (Classic)...');
    console.log('Place ID:', placeId);
    console.log('URL (sin API key):', url.replace(apiKey, 'API_KEY_HIDDEN'));
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Respuesta completa de API:', data);
        
        if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
            const errorMsg = data.error_message || 'Error desconocido';
            console.error('Google Places API Error:', data.status, errorMsg);
            throw new Error(`API Error: ${data.status} - ${errorMsg}`);
        }
        
        if (!data.result) {
            console.error('No hay resultado en la respuesta');
            throw new Error('No se encontraron datos del lugar');
        }
        
        const reviewsCount = data.result.reviews ? data.result.reviews.length : 0;
        console.log('Reviews encontradas:', reviewsCount);
        console.log('Rating promedio:', data.result.rating);
        console.log('Total de reseñas:', data.result.user_ratings_total);
        
        return {
            result: data.result,
            rating: data.result.rating,
            userRatingCount: data.result.user_ratings_total,
            reviews: data.result.reviews ? data.result.reviews.slice(0, maxReviews) : []
        };
    } catch (error) {
        console.error('Error en fetchGoogleReviewsClassic:', error);
        throw error;
    }
}

/**
 * Formatea las reviews para mostrarlas en el sitio
 */
function formatReviews(placeData) {
    if (!placeData) return null;
    
    // Manejar formato de Places API (New)
    if (placeData.reviews && Array.isArray(placeData.reviews)) {
        return {
            name: placeData.displayName || 'Protech Films',
            rating: placeData.rating || 0,
            totalReviews: placeData.userRatingCount || 0,
            reviews: placeData.reviews.map(review => ({
                author: review.authorAttribution?.displayName || review.author_name || 'Cliente',
                rating: review.rating || 5,
                text: review.text?.text || review.text || '',
                time: review.publishTime || review.relativeTimeDescription || '',
                profilePhoto: review.authorAttribution?.photoUri || review.profile_photo_url || null
            }))
        };
    }
    
    // Manejar formato de Places API (Classic)
    if (placeData.result) {
        const result = placeData.result;
        return {
            name: result.name || 'Protech Films',
            rating: result.rating || 0,
            totalReviews: result.user_ratings_total || 0,
            reviews: (result.reviews || []).map(review => ({
                author: review.author_name || 'Cliente',
                rating: review.rating || 5,
                text: review.text || '',
                time: review.relative_time_description || '',
                profilePhoto: review.profile_photo_url || null
            }))
        };
    }
    
    return null;
}

/**
 * Formatea la fecha de la review a un formato legible en español
 */
function formatReviewDate(dateString) {
    if (!dateString) {
        return 'Cliente verificado';
    }
    
    // Si es un timestamp ISO (formato: 2025-11-03T19:07:52.533803893Z)
    if (dateString.includes('T') && dateString.includes('Z')) {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const diffMonths = Math.floor(diffDays / 30);
            const diffYears = Math.floor(diffDays / 365);
            
            // Si es menos de un día
            if (diffDays === 0) {
                const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
                if (diffHours === 0) {
                    const diffMinutes = Math.floor(diffTime / (1000 * 60));
                    if (diffMinutes === 0) {
                        return 'Hace unos momentos';
                    }
                    return `Hace ${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'}`;
                }
                return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
            }
            
            // Si es menos de un mes
            if (diffDays < 30) {
                return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
            }
            
            // Si es menos de un año
            if (diffMonths < 12) {
                return `Hace ${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`;
            }
            
            // Si es más de un año
            return `Hace ${diffYears} ${diffYears === 1 ? 'año' : 'años'}`;
        } catch (error) {
            console.warn('Error al formatear fecha:', error);
            // Si falla, intentar mostrar la fecha en formato corto
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('es-MX', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
            } catch (e) {
                return 'Cliente verificado';
            }
        }
    }
    
    // Si ya es un texto relativo (ej: "hace 2 semanas"), traducirlo si es necesario
    const lowerDate = dateString.toLowerCase();
    if (lowerDate.includes('week') || lowerDate.includes('semana')) {
        return dateString.replace(/week/i, 'semana').replace(/weeks/i, 'semanas');
    }
    if (lowerDate.includes('month') || lowerDate.includes('mes')) {
        return dateString.replace(/month/i, 'mes').replace(/months/i, 'meses');
    }
    if (lowerDate.includes('year') || lowerDate.includes('año')) {
        return dateString.replace(/year/i, 'año').replace(/years/i, 'años');
    }
    if (lowerDate.includes('day') || lowerDate.includes('día')) {
        return dateString.replace(/day/i, 'día').replace(/days/i, 'días');
    }
    
    // Si no se puede formatear, devolver el texto original o un valor por defecto
    return dateString || 'Cliente verificado';
}

/**
 * Genera estrellas HTML basado en el rating
 */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

/**
 * Renderiza las reviews en el DOM
 */
function renderReviews(reviewsData) {
    if (!reviewsData || !reviewsData.reviews || reviewsData.reviews.length === 0) {
        console.warn('No hay reviews disponibles para mostrar');
        return;
    }
    
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (!testimonialsGrid) {
        console.error('No se encontró el elemento testimonialsGrid');
        return;
    }
    
    console.log('Renderizando', reviewsData.reviews.length, 'reviews');
    
    // Limpiar testimonios estáticos completamente
    testimonialsGrid.innerHTML = '';
    
    // Renderizar cada review
    reviewsData.reviews.forEach(review => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        
        testimonialCard.innerHTML = `
            <div class="testimonial-rating">
                ${generateStars(review.rating)}
            </div>
            <p class="testimonial-text">
                "${review.text}"
            </p>
            <div class="testimonial-author">
                <div class="author-avatar">
                    ${review.profilePhoto 
                        ? `<img src="${review.profilePhoto}" alt="${review.author}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                           <i class="fas fa-user" style="display:none;"></i>`
                        : '<i class="fas fa-user"></i>'
                    }
                </div>
                <div class="author-info">
                    <h4>${review.author}</h4>
                    <p>${formatReviewDate(review.time)}</p>
                </div>
            </div>
        `;
        
        testimonialsGrid.appendChild(testimonialCard);
    });
    
    // Actualizar rating promedio en el header si existe
    updateRatingHeader(reviewsData);
    
    // Notificar al carrusel que se actualizaron los reviews
    // El MutationObserver en script.js detectará los cambios automáticamente
    console.log('Reviews renderizadas, el carrusel se actualizará automáticamente');
}

/**
 * Actualiza el header con el rating promedio
 */
function updateRatingHeader(reviewsData) {
    const sectionHeader = document.querySelector('.testimonials .section-header');
    if (!sectionHeader) return;
    
    // Buscar o crear elemento de rating
    let ratingElement = document.getElementById('googleRating');
    
    if (!ratingElement) {
        ratingElement = document.createElement('div');
        ratingElement.id = 'googleRating';
        ratingElement.className = 'google-rating-header';
        sectionHeader.appendChild(ratingElement);
    }
    
    ratingElement.innerHTML = `
        <div class="rating-display">
            <div class="rating-stars-large">
                ${generateStars(reviewsData.rating)}
            </div>
            <div class="rating-info">
                <span class="rating-number">${reviewsData.rating.toFixed(1)}</span>
                <span class="rating-total">de ${reviewsData.totalReviews} reseñas en Google</span>
            </div>
        </div>
        <a href="https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACES_CONFIG.placeId}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="google-maps-link">
            Ver todas las reseñas en Google Maps <i class="fab fa-google"></i>
        </a>
    `;
}

/**
 * Inicializa la carga de reviews
 */
async function initGoogleReviews() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve);
        });
    }
    
    // Esperar un poco más para asegurar que todo esté listo
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (!testimonialsGrid) {
        console.warn('No se encontró el contenedor de testimonios');
        return;
    }
    
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'reviews-loading';
    loadingIndicator.innerHTML = '<p>Cargando reseñas de Google...</p>';
    testimonialsGrid.parentElement.insertBefore(loadingIndicator, testimonialsGrid);
    
    try {
        console.log('=== INICIANDO CARGA DE GOOGLE REVIEWS ===');
        console.log('Configuración:', {
            apiKey: GOOGLE_PLACES_CONFIG.apiKey ? 'CONFIGURADO' : 'NO CONFIGURADO',
            placeId: GOOGLE_PLACES_CONFIG.placeId,
            maxReviews: GOOGLE_PLACES_CONFIG.maxReviews
        });
        
        const placeData = await fetchGoogleReviews();
        console.log('Datos recibidos de API:', placeData);
        
        if (!placeData) {
            console.warn('No se recibieron datos de la API');
            if (loadingIndicator.parentElement) {
                loadingIndicator.remove();
            }
            return;
        }
        
        const reviewsData = formatReviews(placeData);
        console.log('Reviews formateadas:', reviewsData);
        
        if (reviewsData && reviewsData.reviews && reviewsData.reviews.length > 0) {
            renderReviews(reviewsData);
            console.log('✅ Reviews renderizadas exitosamente:', reviewsData.reviews.length);
        } else {
            console.warn('⚠️ No se pudieron cargar las reviews. Datos:', reviewsData);
            // Mostrar mensaje al usuario
            testimonialsGrid.innerHTML = `
                <div class="testimonial-card" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <p>No se pudieron cargar las reseñas de Google en este momento. Por favor, inténtalo más tarde.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('❌ Error al inicializar reviews:', error);
        console.error('Stack trace:', error.stack);
        // Mostrar mensaje de error al usuario
        testimonialsGrid.innerHTML = `
            <div class="testimonial-card" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p>Error al cargar las reseñas: ${error.message}</p>
            </div>
        `;
    } finally {
        if (loadingIndicator && loadingIndicator.parentElement) {
            loadingIndicator.remove();
        }
        console.log('=== FIN CARGA DE GOOGLE REVIEWS ===');
    }
}

// Inicializar cuando el DOM esté listo
(function() {
    function startInit() {
        console.log('Google Reviews: Iniciando...');
        console.log('Config:', GOOGLE_PLACES_CONFIG);
        initGoogleReviews();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Google Reviews: DOM cargado, esperando 500ms...');
            setTimeout(startInit, 500);
        });
    } else {
        console.log('Google Reviews: DOM ya cargado, esperando 500ms...');
        setTimeout(startInit, 500);
    }
})();

