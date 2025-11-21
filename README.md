# Protech Films - Sitio Web Moderno

Sitio web moderno, responsivo y con animaciones para Protech Films. Diseñado con inspiración en XPEL, Audi y BMW. Diseñado para ser hosteado en GoDaddy.

## 🚀 Características

- **Diseño Moderno y Tecnológico**: Interfaz oscura con efectos neón y estilo premium
- **100% Responsivo**: Optimizado para desktop, tablet y móvil
- **Video de Fondo**: Hero section con video de fondo profesional
- **Transiciones Suaves**: Animaciones fluidas en scroll y hover
- **Navegación Intuitiva**: Menú fijo con scroll suave entre secciones
- **Páginas de Servicios Individuales**: 4 páginas detalladas con cotización por WhatsApp
- **Optimizado para SEO**: Estructura semántica y meta tags
- **Rápido y Ligero**: Código optimizado para carga rápida

## 📁 Estructura de Archivos

```
protechfilms/
├── index.html                    # Página principal
├── styles.css                    # Estilos principales
├── service-page.css              # Estilos para páginas de servicios
├── script.js                     # Funcionalidad interactiva
├── servicio-residencial.html     # Página de servicio residencial
├── servicio-comercial.html       # Página de servicio comercial
├── servicio-vehiculos.html        # Página de servicio vehículos
├── servicio-industrial.html      # Página de servicio industrial
├── imgs/
│   └── logo.png                  # Logo de la empresa
├── .gitignore                    # Archivos a ignorar en Git
└── README.md                     # Este archivo
```

## 🎨 Secciones Incluidas en la Página Principal

1. **Hero Section**: Video de fondo con estadísticas y llamadas a la acción
2. **Products Showcase**: Productos destacados con tecnología avanzada
3. **Features**: Características principales destacadas
4. **Services**: Servicios ofrecidos con enlaces a páginas individuales
5. **Technology**: Sección de tecnología e innovación
6. **Partners**: Asociaciones con marcas premium
7. **Testimonials**: Testimonios de clientes
8. **About**: Información sobre la empresa con estadísticas animadas
9. **Gallery**: Galería de proyectos con efectos hover
10. **Contact**: Formulario de contacto y información de contacto
11. **Footer**: Pie de página con enlaces y redes sociales

## 📄 Páginas de Servicios

Cada servicio tiene su propia página con:
- Explicación detallada del servicio
- Beneficios principales
- Ejemplos de aplicación
- Proyectos realizados
- Sección de cotización con botón de WhatsApp

## 🛠️ Tecnologías Utilizadas

- HTML5 semántico
- CSS3 con variables personalizadas y efectos neón
- JavaScript vanilla (sin dependencias)
- Font Awesome 6.4.0 para iconos
- Google Fonts (Inter y Space Grotesk)
- Video HTML5 para fondo del hero

## 📱 Responsive Breakpoints

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px
- Small Mobile: < 480px

## 🎯 Funcionalidades JavaScript

- Menú móvil hamburguesa
- Scroll suave entre secciones
- Animaciones al hacer scroll (Intersection Observer)
- Contador animado de estadísticas
- Botón "Volver arriba"
- Navegación activa según scroll
- Efecto parallax en hero
- Validación de formulario
- Manejo de video de fondo
- Lazy loading de imágenes

## 🚀 Instalación y Uso

1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador para previsualizar
3. Para subir a GoDaddy:
   - Consulta `GUIA_SUBIR_GODADDY.md` para instrucciones detalladas
   - Sube todos los archivos a la carpeta `public_html` de tu hosting
   - Asegúrate de que `index.html` esté en la raíz

## 📱 Páginas de Servicios

- **Ventanas Residenciales**: `/servicio-residencial.html`
- **Ventanas Comerciales**: `/servicio-comercial.html`
- **Vehículos**: `/servicio-vehiculos.html`
- **Proyectos Industriales**: `/servicio-industrial.html`

Cada página incluye:
- Explicación detallada del servicio
- 6 beneficios principales
- 3 ejemplos de aplicación
- 4 proyectos realizados
- Botón de cotización por WhatsApp con mensaje predefinido

## ✏️ Personalización

### Colores

Los colores se pueden modificar en `styles.css` en la sección `:root`:

```css
:root {
    --primary-color: #3B82F6;
    --secondary-color: #F59E42;
    --accent-color: #10B981;
    /* ... más colores */
}
```

### Contenido

- Edita el texto directamente en `index.html`
- Reemplaza los placeholders de imágenes con tus propias imágenes
- Actualiza la información de contacto en la sección correspondiente

### Imágenes

Para agregar imágenes reales:
1. Crea una carpeta `images/` en la raíz
2. Reemplaza los placeholders con elementos `<img>` apuntando a tus imágenes
3. Ejemplo: `<img src="images/proyecto1.jpg" alt="Proyecto">`

## 📝 Notas Importantes

### Para GoDaddy
- Asegúrate de tener un certificado SSL activado
- Configura los meta tags para SEO en el `<head>`
- Verifica que todos los archivos estén en la misma carpeta
- Consulta `GUIA_SUBIR_GODADDY.md` para instrucciones detalladas

### Para WhatsApp
- **IMPORTANTE**: Actualiza el número de WhatsApp en todos los archivos HTML
- Busca `526641234567` y reemplázalo con el número real
- Formato: código de país + código de área + número (ej: 526641234567)

### Para el Logo
- El logo debe estar en la carpeta `imgs/logo.png`
- Asegúrate de subir la carpeta `imgs` completa a GoDaddy

## 🔧 Próximos Pasos (Opcional)

- Integrar formulario de contacto con backend
- Agregar imágenes reales de proyectos
- Implementar un sistema de blog
- Integrar Google Maps para ubicación
- Agregar más animaciones personalizadas
- Implementar analytics (Google Analytics)
- Optimizar imágenes para mejor rendimiento

## 📚 Documentación Adicional

- `GUIA_SUBIR_GODADDY.md` - Guía completa para subir a GoDaddy
- `GUIA_GITHUB.md` - Guía para subir a GitHub
- `LISTA_VERIFICACION.md` - Checklist de verificación

## 📄 Licencia

Este proyecto es de uso libre para Protech Films.

---

**Desarrollado con ❤️ para Protech Films**
