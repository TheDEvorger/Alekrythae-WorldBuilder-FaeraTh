@echo off
setlocal EnableExtensions
cd /d "%~dp0"
if exist "%~dp0..\Alekrythae.cmd" (
  call "%~dp0..\Alekrythae.cmd"
  exit /b %errorlevel%
)
if not exist "Alekrythae-World-Builder-FaeraTh.alek" (
  echo [HATA] Alekrythae-World-Builder-FaeraTh.alek bulunamadi.
  pause
  exit /b 1
)
start "" "%~dp0Alekrythae-World-Builder-FaeraTh.alek"
