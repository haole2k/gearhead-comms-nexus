# Bacarin Racing - Comunicador de Equipe

Uma aplicação de comunicação em tempo real desenvolvida especialmente para a equipe Bacarin Racing, permitindo comunicação eficiente entre membros da equipe durante corridas e treinos.

## 🚀 Tecnologias Utilizadas

- React
- TypeScript
- Tailwind CSS
- Shadcn/UI
- React Router DOM
- Tanstack Query
- Lucide Icons
- Sonner (Notificações)

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- Node.js (versão 16 ou superior)
- npm ou yarn
- Git

## 🔧 Instalação e Configuração

### Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/bacarin-racing-comms.git
cd bacarin-racing-comms
```

### Instalar Dependências
```bash
npm install
# ou
yarn install
```

### Configurar Variáveis de Ambiente
1. Copie o arquivo `.env.example` para `.env`
2. Preencha as variáveis de ambiente necessárias

### Gerar Prisma Client
```bash
npx prisma generate
```

### Executar Migrations do Banco de Dados
```bash
npx prisma migrate dev
```

### Iniciar Servidor de Desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

### Acessar a Aplicação
Abra seu navegador em:
```
http://localhost:5173
```

### Comandos Adicionais

#### Rodar Testes
```bash
npm test
# ou
yarn test
```

#### Build para Produção
```bash
npm run build
# ou
yarn build
```

#### Visualizar Build de Produção
```bash
npm run preview
# ou
yarn preview
```

## 🎨 Funcionalidades

- Sistema de canais de comunicação em tempo real
- Indicadores de status dos membros (online/offline/falando)
- Controles de áudio (mute/unmute/deafen)
- Interface responsiva e moderna
- Animações suaves para melhor feedback visual
- Tooltips informativos para melhor usabilidade
- Sistema de notificações para eventos importantes
- Suporte a temas claro/escuro
- Layout otimizado para dispositivos móveis

## 🖥️ Ambiente de Desenvolvimento

Para um ambiente de desenvolvimento ideal, recomendamos:

- VS Code com as extensões:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript + JavaScript
- Chrome DevTools para debugging
- React Developer Tools

## 📱 Layout Responsivo

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Dispositivos móveis (<768px)

## 🔒 Boas Práticas

- Código tipado com TypeScript
- Componentes reutilizáveis
- Hooks personalizados
- Gerenciamento de estado com React Query
- Padrões de commits convencionais
- Testes unitários (Jest + Testing Library)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🏁 Bacarin Racing

Desenvolvido especialmente para a equipe Bacarin Racing, mantendo as cores e identidade visual da equipe.

## 📞 Suporte

Para reportar bugs ou sugerir novas funcionalidades, por favor abra uma [issue](https://github.com/seu-usuario/bacarin-racing-comms/issues).

## 🛠️ Desenvolvido por

[Devsign Sistemas](https://www.devsign.com.br)