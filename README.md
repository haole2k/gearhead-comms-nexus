# Bacarin Racing - Comunicador de Equipe

Aplicação de comunicação em tempo real para a equipe Bacarin Racing, permitindo comunicação eficiente durante corridas e treinos.

## 🚀 Tecnologias

- React + TypeScript
- Tailwind CSS + Shadcn/UI
- MySQL + Prisma
- React Query
- React Router DOM

## 📋 Requisitos

- Node.js (v16+)
- XAMPP (MySQL)
- Git

## 🔧 Instalação

### Método Automático (Recomendado)
1. Baixe o instalador `bacarin-racing-installer.exe`
2. Execute o instalador
3. Aguarde a inicialização automática
4. O console exibirá informações importantes sobre a aplicação

### Método Manual
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/bacarin-racing-comms.git
cd bacarin-racing-comms

# Instale dependências
npm install

# Configure .env
cp .env.example .env

# Inicie o XAMPP e MySQL

# Execute o script SQL
mysql -u root < prisma/schema.sql

# Gere Prisma Client
npx prisma generate

# Inicie a aplicação
npm run dev
```

## 🎨 Funcionalidades

- Canais de comunicação em tempo real
  - Geral
  - Pit Stop
  - Estratégia
  - Telemetria
  - Emergência
- Status dos membros (online/offline)
- Controles de áudio
  - Push-to-Talk (PTT)
  - Ajuste de volume
  - Supressão de ruído
- Interface responsiva
- Sistema de notificações
- Temas claro/escuro
- Modo compacto para canais
- Sistema de mensagens privadas
- Gravação de comunicações

## 👥 Usuário Padrão

```
Usuário: admin
Senha: admin
```

## 🖥️ Desenvolvimento

Recomendamos:
- VS Code + ESLint + Prettier
- Chrome DevTools
- React Developer Tools
- MySQL Workbench

## 📱 Layout Responsivo

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (<768px)

## 🏁 Bacarin Racing

Desenvolvido para a equipe Bacarin Racing.

## 📞 Suporte

Para bugs ou sugestões, abra uma [issue](https://github.com/seu-usuario/bacarin-racing-comms/issues).

---
Desenvolvido por [Devsign Sistemas](https://www.devsign.com.br)