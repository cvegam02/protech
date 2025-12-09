# Instrucciones para FormSubmit (SIN EmailJS)

## ✅ Ventajas de FormSubmit

- **100% Gratis** - Sin límites de emails
- **Sin configuración** - Solo cambia el email en el formulario
- **Sin JavaScript adicional** - Funciona automáticamente
- **Sin cuentas** - No necesitas registrarte en ningún servicio
- **Protección anti-spam** - Incluye protección básica
- **Redirección automática** - Puedes redirigir a una página de agradecimiento

## 📧 Cómo Funciona

El formulario ya está configurado para enviar correos directamente a `contacto@protechfilms.mx` usando FormSubmit.

### Lo que ya está hecho:

1. ✅ El formulario tiene `action="https://formsubmit.co/contacto@protechfilms.mx"`
2. ✅ Configurado para enviar a tu correo
3. ✅ Incluye protección anti-spam básica

### Lo que recibirás:

Cuando alguien llene el formulario, recibirás un correo en `contacto@protechfilms.mx` con:
- Nombre del contacto
- Email del contacto
- Teléfono
- Mensaje

## 🔧 Personalización Opcional

Si quieres personalizar más el comportamiento, puedes editar el formulario en `index.html`:

### Agregar página de agradecimiento:

```html
<input type="hidden" name="_next" value="https://tudominio.com/gracias.html">
```

### Cambiar el asunto del correo:

Ya está configurado como: "Nuevo mensaje de contacto - Protech Films"

Si quieres cambiarlo, edita esta línea:
```html
<input type="hidden" name="_subject" value="Tu nuevo asunto aquí">
```

### Agregar campo de respuesta automática:

FormSubmit puede enviar una respuesta automática al usuario. Agrega:
```html
<input type="hidden" name="_autoresponse" value="Gracias por contactarnos. Te responderemos pronto.">
```

## ⚠️ Verificación del Email (Primera vez)

**IMPORTANTE**: La primera vez que uses FormSubmit, recibirás un correo de verificación en `contacto@protechfilms.mx`. 

1. Revisa tu bandeja de entrada (y spam)
2. Haz clic en el enlace de verificación
3. Después de eso, todos los formularios funcionarán automáticamente

## 🚀 Alternativas si FormSubmit no funciona

Si por alguna razón FormSubmit no funciona para ti, aquí hay otras opciones:

### Opción 1: Web3Forms (Similar a FormSubmit)
```html
<form action="https://api.web3forms.com/submit" method="POST">
    <input type="hidden" name="access_key" value="TU_ACCESS_KEY">
    <input type="hidden" name="subject" value="Nuevo mensaje de contacto">
    <input type="hidden" name="to" value="contacto@protechfilms.mx">
    <!-- resto del formulario -->
</form>
```
Regístrate en: https://web3forms.com/

### Opción 2: Getform (Más opciones)
Similar a FormSubmit pero con más características. Regístrate en: https://getform.io/

### Opción 3: Backend propio
Si tienes un servidor, puedes crear un endpoint PHP o Node.js para procesar el formulario.

## 📝 Notas

- FormSubmit es completamente gratuito y no tiene límites
- Los correos pueden tardar unos segundos en llegar
- Revisa la carpeta de spam la primera vez
- No necesitas mantener ninguna configuración activa

