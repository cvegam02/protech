# Script para subir el proyecto a GitHub
# Ejecutar en PowerShell después de instalar Git

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Subiendo Protech Films a GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✓ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git no está instalado" -ForegroundColor Red
    Write-Host "Por favor instala Git desde: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Paso 1: Inicializando repositorio..." -ForegroundColor Yellow

# Inicializar git si no está inicializado
if (-not (Test-Path .git)) {
    git init
    Write-Host "✓ Repositorio inicializado" -ForegroundColor Green
} else {
    Write-Host "✓ Repositorio ya inicializado" -ForegroundColor Green
}

Write-Host ""
Write-Host "Paso 2: Agregando repositorio remoto..." -ForegroundColor Yellow

# Verificar si el remote ya existe
$remoteExists = git remote | Select-String -Pattern "origin"
if ($remoteExists) {
    Write-Host "✓ Remote 'origin' ya existe" -ForegroundColor Green
    Write-Host "¿Deseas reemplazarlo? (S/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq "S" -or $response -eq "s") {
        git remote remove origin
        git remote add origin https://github.com/cvegam02/protech.git
        Write-Host "✓ Remote actualizado" -ForegroundColor Green
    }
} else {
    git remote add origin https://github.com/cvegam02/protech.git
    Write-Host "✓ Remote agregado" -ForegroundColor Green
}

Write-Host ""
Write-Host "Paso 3: Agregando archivos..." -ForegroundColor Yellow
git add .
Write-Host "✓ Archivos agregados" -ForegroundColor Green

Write-Host ""
Write-Host "Paso 4: Verificando estado..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "Paso 5: Creando commit..." -ForegroundColor Yellow
$commitMessage = "Initial commit: Sitio web Protech Films completo con páginas de servicios, diseño responsive y botones de WhatsApp"
git commit -m $commitMessage
Write-Host "✓ Commit creado" -ForegroundColor Green

Write-Host ""
Write-Host "Paso 6: Configurando branch main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branch configurado como 'main'" -ForegroundColor Green

Write-Host ""
Write-Host "Paso 7: Subiendo a GitHub..." -ForegroundColor Yellow
Write-Host "NOTA: Se te pedirá autenticación" -ForegroundColor Yellow
Write-Host "Si es la primera vez, necesitarás un Personal Access Token" -ForegroundColor Yellow
Write-Host "Obtén uno en: https://github.com/settings/tokens" -ForegroundColor Yellow
Write-Host ""
Write-Host "Presiona Enter para continuar..." -ForegroundColor Yellow
Read-Host

git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ¡Proceso completado!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Visita tu repositorio en:" -ForegroundColor Cyan
Write-Host "https://github.com/cvegam02/protech" -ForegroundColor White
Write-Host ""

