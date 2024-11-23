
# React Google OAuth Dashboard

Este é um projeto simples de front-end React que utiliza o Google OAuth 2.0 para autenticação. O objetivo é fornecer um ambiente para realização de testes com tokens do Google.

## Funcionalidades
- Login via Google OAuth 2.0.
- Exibição do token JWT gerado pelo Google.
- Opção de copiar o token para a área de transferência.

## Tecnologias Utilizadas
- React + TypeScript
- Tailwind CSS
- Firebase Hosting (para o deploy)
- Biblioteca @react-oauth/google
- Phosphor Icons

### **Importante**
Este projeto tem como objetivo fornecer uma interface simples para testes e manipulação de tokens OAuth 2.0 gerados pelo Google. **Não armazena nenhum dado sensível em cache ou banco de dados.** Toda a manipulação ocorre no navegador do usuário, garantindo a segurança das informações durante os testes.

## Como Configurar o Projeto
1. Clone o repositório:
   ```bash
   git clone https://github.com/felipemacedo1/google-auth-preview.git
   cd google-auth-preview
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione sua chave do Google:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=<sua_google_client_id>
   ```

4. Inicie o projeto localmente:
   ```bash
   npm start
   ```

## Como Contribuir
1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Envie suas alterações:
   ```bash
   git add .
   git commit -m "Descrição das alterações"
   git push origin minha-feature
   ```
4. Abra um Pull Request no GitHub.

## Deploy
Este projeto está hospedado no Firebase Hosting. Para deploy, basta rodar:
```bash
npm run build
firebase deploy
```

## Licença
Este projeto está sob a licença MIT.