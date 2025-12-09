// Script de diagnóstico para verificar que todo funcione
console.log('=== DIAGNÓSTICO DE SCRIPTS ===');
console.log('Estado del DOM:', document.readyState);
console.log('Elemento testimonialsGrid:', document.getElementById('testimonialsGrid') ? 'ENCONTRADO' : 'NO ENCONTRADO');
console.log('Elemento galleryGrid:', document.getElementById('galleryGrid') ? 'ENCONTRADO' : 'NO ENCONTRADO');
console.log('Elementos stat-item:', document.querySelectorAll('.stat-item').length);

// Verificar configuración de Google Reviews
if (typeof GOOGLE_PLACES_CONFIG !== 'undefined') {
    console.log('Google Reviews Config:', {
        apiKey: GOOGLE_PLACES_CONFIG.apiKey ? 'CONFIGURADO' : 'NO CONFIGURADO',
        placeId: GOOGLE_PLACES_CONFIG.placeId ? 'CONFIGURADO' : 'NO CONFIGURADO'
    });
} else {
    console.warn('GOOGLE_PLACES_CONFIG no está definido');
}

// Verificar proyectos
if (typeof projects !== 'undefined') {
    console.log('Proyectos encontrados:', projects.length);
} else {
    console.warn('Variable projects no está definida');
}

console.log('=== FIN DIAGNÓSTICO ===');

