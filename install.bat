@echo off
cd /d "%~dp0"
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

REM Testa conexao MySQL
echo Testando conexao MySQL...
C:\xampp\mysql\bin\mysql -u root -e "SELECT 1" 2>nul
if errorlevel 1 (
    echo ERRO: Nao foi possivel conectar ao MySQL
    echo Verifique se:
    echo 1. O XAMPP esta instalado em C:\xampp
    echo 2. O servico MySQL esta iniciado
    echo 3. A porta 3306 esta disponivel
    echo 4. O usuario root nao possui senha
    pause
    exit
)

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