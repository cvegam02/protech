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
    
    console.log('Haciendo petición a:', url.replace(apiKey, 'API_KEY_HIDDEN'));
    
    const response = await fetch(url);
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error HTTP:', response.status, errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Respuesta de API:', data);
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        console.error('Google Places API Error:', data.status, data.error_message || '');
        throw new Error(`API Error: ${data.status} - ${data.error_message || ''}`);
    }
    
    if (!data.result) {
        console.error('No hay resultado en la respuesta');
        throw new Error('No se encontraron datos del lugar');
    }
    
    console.log('Reviews encontradas:', data.result.reviews ? data.result.reviews.length : 0);
    
    return {
        result: data.result,
        rating: data.result.rating,
        userRatingCount: data.result.user_ratings_total,
        reviews: data.result.reviews ? data.result.reviews.slice(0, maxReviews) : []
    };
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
    if (!testimonialsGrid) return;
    
    // Limpiar testimonios estáticos
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
                    <p>${review.time || 'Cliente verificado'}</p>
                </div>
            </div>
        `;
        
        testimonialsGrid.appendChild(testimonialCard);
    });
    
    // Actualizar rating promedio en el header si existe
    updateRatingHeader(reviewsData);
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
        console.log('Iniciando carga de reviews de Google...');
        const placeData = await fetchGoogleReviews();
        console.log('Datos recibidos:', placeData);
        
        const reviewsData = formatReviews(placeData);
        console.log('Reviews formateadas:', reviewsData);
        
        if (reviewsData && reviewsData.reviews && reviewsData.reviews.length > 0) {
            renderReviews(reviewsData);
            console.log('Reviews renderizadas exitosamente');
        } else {
            console.warn('No se pudieron cargar las reviews. Mostrando testimonios por defecto.');
        }
    } catch (error) {
        console.error('Error al inicializar reviews:', error);
    } finally {
        if (loadingIndicator.parentElement) {
            loadingIndicator.remove();
        }
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

