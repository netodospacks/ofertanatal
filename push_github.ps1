# Script de push para o GitHub
# Execute este arquivo APÓS instalar o Git e gerar um novo token no GitHub.
#
# COMO USAR:
# 1. Abra o PowerShell nesta pasta
# 2. Execute: powershell -ExecutionPolicy Bypass -File .\push_github.ps1
# 3. Cole seu token quando solicitado

$TOKEN = Read-Host "Cole seu GitHub Personal Access Token (repo scope)"
$REPO  = "https://$TOKEN@github.com/netodospacks/ofertanatal.git"

Set-Location "C:\Users\Virtual Store\Desktop\OFERTINHA DO NATLA"

Write-Host "Inicializando repositório..." -ForegroundColor Cyan
git init

Write-Host "Configurando remote..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin $REPO

Write-Host "Adicionando arquivos..." -ForegroundColor Cyan
git add .

Write-Host "Criando commit..." -ForegroundColor Cyan
git commit -m "feat: landing page completa - Coleção de Caixinhas de Natal R`$19,90"

Write-Host "Definindo branch main..." -ForegroundColor Cyan
git branch -M main

Write-Host "Enviando para o GitHub..." -ForegroundColor Cyan
git push -u origin main

Write-Host ""
Write-Host "✅ Publicado em: https://github.com/netodospacks/ofertanatal" -ForegroundColor Green
Write-Host ""
Write-Host "Para ativar o GitHub Pages:" -ForegroundColor Yellow
Write-Host "  Settings > Pages > Branch: main > Folder: / (root) > Save" -ForegroundColor Yellow

