@echo off
echo Démarrage du script...

node script.mjs

IF %ERRORLEVEL% NEQ 0 (
    echo Une erreur est survenue lors de l'exécution du script.
    pause
    exit /b
)

pause
