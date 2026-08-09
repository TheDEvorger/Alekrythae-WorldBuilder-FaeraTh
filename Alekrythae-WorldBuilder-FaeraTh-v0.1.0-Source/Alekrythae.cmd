@echo off
setlocal EnableExtensions
cd /d "%~dp0"

set "APP_ALEK=%~dp0Meggy\Alekrythae-World-Builder-FaeraTh.alek"
set "ASSET_AUDIT=%~dp0ASSET_KONTROL.ps1"
set "ASSETS_DIR=%~dp0Meggy\Assets"

if not exist "%APP_ALEK%" (
  echo [HATA] Alekrythae World Builder ^& FaeraTh .alek dosyasi bulunamadi:
  echo %APP_ALEK%
  pause
  exit /b 1
)

if exist "%ASSET_AUDIT%" (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%ASSET_AUDIT%" -AssetsDirectory "%ASSETS_DIR%"
  if errorlevel 1 (
    pause
    exit /b 1
  )
)

rem Core artik bu repoda paketlenmez. Core bir kez ayri paketinden calistirilinca
rem .alek dosya iliskisini HKCU altina kaydeder.
reg query "HKCU\Software\Classes\Alekrythae.Nexus.v0\shell\open\command" /ve >nul 2>&1
if errorlevel 1 (
  echo.
  echo [HATA] Ałek’ryŧhæ Core kaydi bulunamadi.
  echo Core paketini ayri olarak indir, kalici bir klasore ayikla ve
  echo "Alekrythae Core.exe" dosyasini bir kez calistir. Ardindan tekrar dene.
  echo.
  pause
  exit /b 2
)

start "" "%APP_ALEK%"
exit /b 0
