# Configuración de Google Reviews - Protech Films

Esta guía te ayudará a configurar la integración de reviews de Google Maps en tu sitio web.

## 📋 Requisitos Previos

1. Tu negocio debe estar registrado en Google My Business
2. Debes tener acceso a Google Cloud Console
3. Tu negocio debe tener al menos algunas reviews en Google Maps

## 🔑 Paso 1: Obtener el Place ID de tu Negocio

El Place ID es un identificador único para tu negocio en Google Maps.

### Opción A: Usando la herramienta de Google
1. Ve a: https://developers.google.com/maps/documentation/places/web-service/place-id
2. Busca "Protech Films" o tu dirección completa
3. Copia el Place ID que aparece (ejemplo: `ChIJ...`)

### Opción B: Desde Google Maps directamente
1. Abre Google Maps: https://www.google.com/maps
2. Busca tu negocio "Protech Films Ciudad Obregón"
3. Haz clic en tu negocio
4. En la URL verás algo como: `.../place/Protech+Films/@27.4908,-109.9397,17z/data=!3m1!4b1!4m6!3m5!1s0x86c815efdc8ba569:0x4489ecd718fa75d9!8m2!3d27.4908!4d-109.9397!16s%2Fg%2F11c5...`
5. El Place ID está en el parámetro `data` o puedes usar la herramienta de búsqueda

### Opción C: Usando la API de Places
```javascript
// Puedes usar este código en la consola del navegador
// después de buscar tu negocio en Google Maps
const placeId = document.querySelector('[data-place-id]')?.getAttribute('data-place-id');
console.log('Place ID:', placeId);
```

## 🔐 Paso 2: Crear API Key de Google Cloud

1. **Ve a Google Cloud Console**
   - https://console.cloud.google.com/

2. **Crea o selecciona un proyecto**
   - Si no tienes uno, crea un nuevo proyecto llamado "Protech Films Website"

3. **Habilita Places API**
   - En el menú lateral, ve a "APIs y servicios" > "Biblioteca"
   - Busca "Places API"
   - Haz clic en "Habilitar"

4. **Crea una API Key**
   - Ve a "APIs y servicios" > "Credenciales"
   - Haz clic en "Crear credenciales" > "Clave de API"
   - Copia la API Key generada

5. **Restringe la API Key (Recomendado)**
   - Haz clic en la API Key que acabas de crear
   - En "Restricciones de aplicación":
     - Selecciona "Sitios web HTTP"
     - Agrega tu dominio (ej: `protechfilms.mx`, `*.protechfilms.mx`)
   - En "Restricciones de API":
     - Selecciona "Limitar clave"
     - Selecciona solo "Places API"
   - Guarda los cambios

## ⚙️ Paso 3: Configurar el Código

1. **Abre el archivo `google-reviews.js`**

2. **Actualiza la configuración** (líneas 7-12):
```javascript
const GOOGLE_PLACES_CONFIG = {
    apiKey: 'TU_API_KEY_AQUI', // Pega tu API Key
    placeId: 'TU_PLACE_ID_AQUI', // Pega tu Place ID
    language: 'es', // Idioma (español)
    maxReviews: 6 // Número de reviews a mostrar
};
```

3. **Ejemplo de configuración completa**:
```javascript
const GOOGLE_PLACES_CONFIG = {
    apiKey: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    language: 'es',
    maxReviews: 6
};
```

## 🧪 Paso 4: Probar la Integración

1. **Abre tu sitio web en el navegador**
2. **Abre la consola del desarrollador** (F12)
3. **Ve a la sección de Testimonios**
4. **Verifica que:**
   - Se carguen las reviews de Google
   - Aparezca el rating promedio
   - Se muestren las reviews con nombres y fotos

## 🐛 Solución de Problemas

### Error: "API key not valid"
- Verifica que copiaste correctamente la API Key
- Asegúrate de que Places API esté habilitada
- Verifica que la API Key no tenga restricciones que bloqueen tu dominio

### Error: "Place ID not found"
- Verifica que el Place ID sea correcto
- Asegúrate de que tu negocio esté visible en Google Maps
- Prueba buscando el Place ID en la herramienta de Google

### No se muestran reviews
- Verifica que tu negocio tenga reviews en Google Maps
- Revisa la consola del navegador para ver errores
- Asegúrate de que el archivo `google-reviews.js` esté cargado correctamente

### CORS Error
- Si ves errores de CORS, puede ser que necesites usar un proxy o configurar CORS en tu servidor
- Alternativamente, puedes usar la API desde el backend

## 💰 Costos de la API

- **Crédito mensual gratuito**: $200 USD
- **Places API (Place Details)**: 
  - $17 USD por cada 1,000 solicitudes (después del crédito gratuito)
- **Estimación**: 
  - Si tu sitio recibe 100 visitas/día = ~3,000 solicitudes/mes
  - Costo: $0 (dentro del crédito gratuito)
  - Si superas el crédito: ~$0.05 USD por cada 1,000 solicitudes adicionales

## 🔒 Seguridad

**IMPORTANTE**: 
- ⚠️ **NO** subas tu API Key a repositorios públicos
- ✅ Usa restricciones de dominio en la API Key
- ✅ Limita la API Key solo a Places API
- ✅ Considera usar variables de entorno en producción

## 📝 Notas Adicionales

- Las reviews se actualizan automáticamente cuando Google las actualiza
- El código incluye un fallback a la API clásica si la nueva API falla
- Las reviews se muestran en el idioma configurado (español por defecto)
- El número máximo de reviews se puede ajustar en la configuración

## 🆘 Soporte

Si tienes problemas:
1. Revisa la consola del navegador para errores
2. Verifica que la API Key y Place ID sean correctos
3. Asegúrate de que Places API esté habilitada
4. Consulta la documentación oficial: https://developers.google.com/maps/documentation/places/web-service

