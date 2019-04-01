@ECHO OFF&PUSHD %~DP0 &TITLE Build
:menu
cls
echo.
echo ==============================
echo.
echo 1.Build test
echo.
echo 2.Build test2
echo.
echo 3.Build production
echo.
echo ==============================
echo.
echo.
set /p user_input=input number:
if %user_input% equ 1 call npm run test
if %user_input% equ 2 call npm run test2
if %user_input% equ 3 call npm run build
pause
goto menu
