# Instrucciones Rápidas - Git Recién Instalado

## Opción 1: Reiniciar PowerShell (Recomendado)

1. **Cierra** la ventana de PowerShell actual
2. **Abre una nueva** ventana de PowerShell
3. Navega a la carpeta del proyecto:
   ```powershell
   cd C:\Users\carlo\Documents\protechfilms
   ```
4. Verifica que Git funcione:
   ```powershell
   git --version
   ```

## Opción 2: Usar Git Bash

1. Busca "Git Bash" en el menú de inicio
2. Ábrelo
3. Navega a la carpeta:
   ```bash
   cd /c/Users/carlo/Documents/protechfilms
   ```
4. Ejecuta los comandos desde ahí

## Opción 3: Verificar Instalación de Git

Si Git no funciona después de reiniciar:

1. Verifica que Git se instaló correctamente
2. Durante la instalación, asegúrate de seleccionar:
   - ✅ "Git from the command line and also from 3rd-party software"
   - ✅ "Use Git and optional Unix tools from the Command Prompt"

## Comandos para Ejecutar (Una vez que Git funcione)

```powershell
# 1. Configurar Git (solo primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"

# 2. Inicializar repositorio
git init

# 3. Agregar repositorio remoto
git remote add origin https://github.com/cvegam02/protech.git

# 4. Agregar todos los archivos
git add .

# 5. Crear commit
git commit -m "Initial commit: Sitio web Protech Films completo"

# 6. Configurar branch y subir
git branch -M main
git push -u origin main
```

## Si Git Sigue Sin Funcionar

1. Reinstala Git desde: https://git-scm.com/download/win
2. Durante la instalación, en "Adjusting your PATH environment":
   - Selecciona: **"Git from the command line and also from 3rd-party software"**
3. Reinicia tu computadora
4. Abre PowerShell nuevamente

