@echo off
echo === Bacarin Racing - Instalador ===
echo.

REM Verifica se o XAMPP esta instalado
if not exist "C:\xampp" (
    echo ERRO: XAMPP nao encontrado em C:\xampp
    echo Por favor, instale o XAMPP primeiro.
    pause
    exit
)

REM Inicia o MySQL do XAMPP
echo Iniciando MySQL...
start /B C:\xampp\mysql\bin\mysqld.exe

REM Aguarda o MySQL iniciar
timeout /t 5 /nobreak > nul

REM Instala dependencias
echo Instalando dependencias...
call npm install

REM Executa o script SQL
echo Inicializando banco de dados...
C:\xampp\mysql\bin\mysql -u root < prisma/schema.sql

REM Gera o Prisma Client
echo Gerando Prisma Client...
call npx prisma generate

REM Inicia a aplicacao
echo Iniciando aplicacao...
start http://localhost:5173
call npm run dev

echo.
echo Aplicacao iniciada! Acesse: http://localhost:5173
echo.
echo Usuario padrao: admin
echo Senha padrao: admin
echo.
pause