@echo off
echo Vérification de Node.js...


node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js n'est pas installé. Veuillez installer Node.js depuis https://nodejs.org/
    exit /b
)

echo Node.js est installé.


echo Installation des modules depuis package.json...
npm install

IF %ERRORLEVEL% NEQ 0 (
    echo Une erreur est survenue lors de l'installation des modules.
    exit /b
)

echo Installation terminée avec succès.
pause
