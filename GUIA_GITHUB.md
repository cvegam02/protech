# Guía para Subir el Proyecto a GitHub

## Paso 1: Instalar Git

Si Git no está instalado en tu computadora:

1. **Descarga Git para Windows**: https://git-scm.com/download/win
2. **Instala Git** siguiendo el asistente de instalación
3. **Reinicia** tu terminal o PowerShell después de la instalación

## Paso 2: Configurar Git (Solo la primera vez)

Abre PowerShell o Git Bash y ejecuta:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

## Paso 3: Inicializar el Repositorio

Abre PowerShell en la carpeta del proyecto (`C:\Users\carlo\Documents\protechfilms`) y ejecuta:

```bash
# Inicializar git
git init

# Agregar el repositorio remoto
git remote add origin https://github.com/cvegam02/protech.git

# Verificar que se agregó correctamente
git remote -v
```

## Paso 4: Agregar Archivos

```bash
# Agregar todos los archivos
git add .

# Verificar qué archivos se agregaron
git status
```

## Paso 5: Hacer el Primer Commit

```bash
# Crear el commit inicial
git commit -m "Initial commit: Sitio web Protech Films completo"

# O si prefieres un mensaje más descriptivo:
git commit -m "Initial commit: Sitio web Protech Films con páginas de servicios, diseño responsive y botones de WhatsApp"
```

## Paso 6: Subir a GitHub

```bash
# Subir al repositorio (primera vez)
git push -u origin main

# Si el branch se llama 'master' en lugar de 'main':
git branch -M main
git push -u origin main
```

## Si GitHub te pide autenticación:

### Opción 1: Personal Access Token (Recomendado)

1. Ve a GitHub: https://github.com/settings/tokens
2. Click en **"Generate new token"** > **"Generate new token (classic)"**
3. Dale un nombre (ej: "Protech Films")
4. Selecciona el scope **"repo"**
5. Click en **"Generate token"**
6. **Copia el token** (solo se muestra una vez)
7. Cuando Git te pida la contraseña, usa el token en lugar de tu contraseña

### Opción 2: GitHub Desktop (Más fácil)

1. Descarga GitHub Desktop: https://desktop.github.com/
2. Inicia sesión con tu cuenta de GitHub
3. File > Add Local Repository
4. Selecciona la carpeta `protechfilms`
5. Haz commit y push desde la interfaz gráfica

## Comandos Útiles para el Futuro

### Ver el estado del repositorio
```bash
git status
```

### Agregar cambios específicos
```bash
git add nombre-archivo.html
```

### Hacer commit de cambios
```bash
git commit -m "Descripción de los cambios"
```

### Subir cambios a GitHub
```bash
git push
```

### Ver el historial de commits
```bash
git log
```

### Actualizar desde GitHub (si trabajas en otra computadora)
```bash
git pull
```

## Estructura del Proyecto que se Subirá

```
protech/
├── index.html
├── styles.css
├── service-page.css
├── script.js
├── servicio-residencial.html
├── servicio-comercial.html
├── servicio-vehiculos.html
├── servicio-industrial.html
├── imgs/
│   └── logo.png
├── .gitignore
└── README.md (si existe)
```

## Solución de Problemas

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/cvegam02/protech.git
```

### Error: "failed to push some refs"
```bash
# Si hay cambios en GitHub que no tienes localmente
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: "authentication failed"
- Verifica que tu token de acceso personal sea correcto
- O usa GitHub Desktop para evitar problemas de autenticación

## Verificar que se Subió Correctamente

1. Ve a: https://github.com/cvegam02/protech
2. Deberías ver todos tus archivos listados
3. El README.md (si existe) se mostrará en la página principal del repositorio

---

## Nota Importante

**NO subas archivos sensibles** como:
- Contraseñas
- API keys
- Información personal
- Archivos de configuración con datos privados

El archivo `.gitignore` ya está configurado para excluir archivos temporales y del sistema.


