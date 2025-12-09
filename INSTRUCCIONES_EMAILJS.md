# Instrucciones para Configurar EmailJS con Google (Gmail/Google Workspace)

Para que el formulario de contacto envíe correos automáticamente a `contacto@protechfilms.mx` usando tu cuenta de Google, necesitas configurar EmailJS.

## Pasos para Configurar EmailJS con Google:

### 1. Crear cuenta en EmailJS
1. Ve a https://www.emailjs.com/
2. Crea una cuenta gratuita (permite hasta 200 emails/mes)
3. Inicia sesión en tu dashboard

### 2. Conectar tu cuenta de Google (Gmail o Google Workspace)
1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Gmail"** como proveedor
4. Haz clic en **"Connect Account"**
5. Se abrirá una ventana para autorizar EmailJS a usar tu cuenta de Google
6. **Importante**: Asegúrate de usar la cuenta de Google que tiene acceso a `contacto@protechfilms.mx`
   - Si `contacto@protechfilms.mx` es una cuenta de Google Workspace, usa esa cuenta
   - Si es un alias, usa la cuenta principal de Google Workspace
7. Autoriza los permisos necesarios
8. Una vez conectado, copia el **Service ID** que se genera (ejemplo: `service_abc123`)

### 3. Crear una Plantilla de Email
1. Ve a **"Email Templates"** en el menú lateral
2. Haz clic en **"Create New Template"**
3. Configura la plantilla con estos campos:
   - **To Email**: `contacto@protechfilms.mx` (o el correo donde quieres recibir los mensajes)
   - **From Name**: `{{from_name}}` (nombre de quien envía el formulario)
   - **Reply To**: `{{from_email}}` (para que puedas responder directamente al cliente)
   - **Subject**: `Nuevo mensaje de contacto - Protech Films`
   - **Content** (cuerpo del mensaje):
   ```
   Has recibido un nuevo mensaje de contacto desde el sitio web de Protech Films:
   
   Nombre: {{from_name}}
   Email: {{from_email}}
   Teléfono: {{phone}}
   
   Mensaje:
   {{message}}
   ```
4. Haz clic en **"Save"** para guardar la plantilla
5. Copia el **Template ID** que aparece (ejemplo: `template_xyz789`)

### 4. Obtener tu Public Key
1. Ve a "Account" > "General"
2. Copia tu **Public Key**

### 5. Actualizar el código
Abre el archivo `script.js` y busca estas líneas (alrededor de la línea 225):

```javascript
// Inicializar EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init("YOUR_PUBLIC_KEY"); // Reemplaza con tu Public Key
}
```

Y más abajo:

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

**Reemplaza:**
- `YOUR_PUBLIC_KEY` con tu Public Key de EmailJS
- `YOUR_SERVICE_ID` con tu Service ID
- `YOUR_TEMPLATE_ID` con tu Template ID

### Ejemplo de código actualizado:

```javascript
// Inicializar EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init("abc123xyz"); // Tu Public Key aquí
}

// ... más código ...

emailjs.send('service_abc123', 'template_xyz789', {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    message: formData.message,
    to_email: 'contacto@protechfilms.mx'
})
```

## Verificación

Una vez configurado:
1. Abre el sitio web
2. Ve a la sección de contacto
3. Llena el formulario
4. Haz clic en "Enviar Mensaje"
5. Deberías recibir el correo en `contacto@protechfilms.mx`

## Ventajas de usar Google con EmailJS

✅ **Funciona con Gmail personal y Google Workspace**  
✅ **No necesitas configurar servidores SMTP**  
✅ **Los correos se envían desde tu cuenta de Google**  
✅ **Puedes responder directamente desde Gmail**  
✅ **Los correos llegan a tu bandeja de entrada normal**

## Notas Importantes

- El plan gratuito de EmailJS permite **200 emails por mes**, lo cual es suficiente para la mayoría de sitios web pequeños
- Si necesitas más, puedes actualizar a un plan de pago
- Los correos se enviarán desde la cuenta de Google que conectes
- Si `contacto@protechfilms.mx` es parte de Google Workspace, asegúrate de usar esa cuenta específica al conectar

## Solución de Problemas

**Si no puedes conectar tu cuenta de Google:**
- Verifica que tengas permisos de administrador si es Google Workspace
- Asegúrate de que la cuenta tenga acceso a `contacto@protechfilms.mx`
- Intenta usar una cuenta de Gmail personal primero para probar

**Si los correos no llegan:**
- Revisa la carpeta de spam
- Verifica que el "To Email" en la plantilla sea correcto
- Revisa los logs en EmailJS dashboard para ver errores

