# 🔐 Google Auth Preview - Dashboard de Autenticação

## 🎯 Objetivo de Aprendizado
Projeto desenvolvido para estudar **Google OAuth 2.0** e **autenticação JWT**, criando um dashboard simples para testar e visualizar tokens de autenticação do Google de forma segura no navegador.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Autenticação:** Google OAuth 2.0
- **Biblioteca:** @react-oauth/google
- **Ícones:** Phosphor Icons
- **Deploy:** Firebase Hosting
- **Conceitos estudados:**
  - OAuth 2.0 flow
  - JWT tokens e decodificação
  - React Context para auth
  - Integração com Google APIs
  - Segurança frontend
  - Environment variables

## 🚀 Demonstração
```tsx
// Configuração do Google OAuth Provider
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.error("REACT_APP_GOOGLE_CLIENT_ID não foi configurado!");
  throw new Error("Google Client ID não está disponível.");
}

const root = createRoot(container!);
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// Hook para login com Google
const handleGoogleLogin = useGoogleLogin({
  onSuccess: (tokenResponse) => {
    console.log('Login Success:', tokenResponse);
    setToken(tokenResponse.access_token);
    setIsAuthenticated(true);
  },
  onError: (error) => {
    console.error('Login Failed:', error);
  },
});
```

## 💡 Principais Aprendizados

### 🔐 OAuth 2.0 Flow
- **Authorization Code:** Fluxo de autorização
- **Access Token:** Token de acesso para APIs
- **Refresh Token:** Renovação de tokens
- **Scopes:** Permissões específicas

### 🎫 JWT Tokens
- **Header:** Algoritmo e tipo do token
- **Payload:** Dados do usuário
- **Signature:** Verificação de integridade
- **Decodificação:** Leitura segura de dados

### ⚛️ React Integration
- **Context API:** Estado global de autenticação
- **Environment Variables:** Configuração segura
- **Error Handling:** Tratamento de falhas
- **TypeScript:** Tipagem de responses

## 🧠 Conceitos Técnicos Estudados

### 1. **Google OAuth Setup**
```tsx
interface AuthContextType {
  isAuthenticated: boolean;
  user: GoogleUser | null;
  token: string | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setToken(tokenResponse.access_token);
      fetchUserProfile(tokenResponse.access_token);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. **JWT Token Display**
```tsx
const TokenDisplay: React.FC<{ token: string }> = ({ token }) => {
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    try {
      // Decodificar JWT (apenas para visualização)
      const decoded = jwt_decode(token);
      setDecodedToken(decoded);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, [token]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(token);
      toast.success('Token copiado para área de transferência!');
    } catch (error) {
      console.error('Failed to copy token:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Access Token</h3>
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Copiar Token
        </button>
      </div>
      
      <div className="bg-white p-3 rounded border font-mono text-sm break-all">
        {token}
      </div>

      {decodedToken && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Token Decodificado:</h4>
          <pre className="bg-white p-3 rounded border text-xs overflow-auto">
            {JSON.stringify(decodedToken, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
```

### 3. **Environment Configuration**
```javascript
// env-config.js para build
const fs = require('fs');
const config = JSON.stringify(process.env);
fs.writeFileSync('./build/env-config.js', `window.env = ${config}`);

// Uso no componente
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || window.env?.REACT_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
  throw new Error("Google Client ID não configurado");
}
```

## 📁 Estrutura do Projeto
```
google-auth-preview/
├── src/
│   ├── components/         # Componentes React
│   ├── contexts/          # Context API
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript interfaces
│   └── utils/             # Utilitários
├── public/                # Assets públicos
├── build/                 # Build de produção
├── .firebaserc           # Configuração Firebase
├── firebase.json         # Deploy config
└── env-config.js         # Script de configuração
```

## 🔧 Como Executar

### Pré-requisitos
- Node.js 16+
- Google Cloud Console account
- Firebase CLI (para deploy)

### Configuração
```bash
# Clone o repositório
git clone <repo-url>
cd google-auth-preview

# Instale dependências
npm install

# Configure Google OAuth
# 1. Acesse Google Cloud Console
# 2. Crie credenciais OAuth 2.0
# 3. Configure URLs autorizadas

# Crie arquivo .env
echo "REACT_APP_GOOGLE_CLIENT_ID=seu_client_id_aqui" > .env

# Inicie o projeto
npm start
```

### Deploy Firebase
```bash
# Build do projeto
npm run build

# Deploy
firebase deploy
```

## 🎯 Funcionalidades Implementadas
- ✅ **Login Google OAuth** com @react-oauth/google
- ✅ **Visualização de tokens** JWT decodificados
- ✅ **Copy to clipboard** para tokens
- ✅ **User profile** display
- ✅ **Logout** com limpeza de estado
- ✅ **Error handling** para falhas de auth
- ✅ **Responsive design** mobile-friendly

## 🔒 Segurança
- **Client-side only:** Nenhum dado armazenado em servidor
- **No persistence:** Tokens não salvos em localStorage
- **Environment variables:** Client ID protegido
- **HTTPS only:** Deploy apenas em HTTPS
- **Token validation:** Verificação de integridade

## 🚧 Desafios Enfrentados
1. **OAuth Flow:** Entender fluxo completo de autorização
2. **JWT Handling:** Decodificação segura de tokens
3. **Environment Config:** Configuração para build/deploy
4. **Error States:** Tratamento de falhas de autenticação
5. **TypeScript:** Tipagem correta de responses Google
6. **Firebase Deploy:** Configuração de hosting

## 📚 Recursos Utilizados
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)
- [JWT.io](https://jwt.io/) - JWT debugger
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [React TypeScript](https://react-typescript-cheatsheet.netlify.app/)

## 📈 Próximos Passos
- [ ] Adicionar mais provedores OAuth (GitHub, Facebook)
- [ ] Implementar refresh token handling
- [ ] Adicionar testes automatizados
- [ ] Criar modo de desenvolvimento offline
- [ ] Implementar rate limiting visual
- [ ] Adicionar analytics de uso

## 🔗 Projetos Relacionados
- [React PriceGuard View](../react-priceguard-view/) - OAuth em produção
- [React E-commerce](../react-ecommerce-tt/) - Autenticação completa
- [Go PriceGuard API](../go-priceguard-api/) - Backend OAuth

---

**Desenvolvido por:** Felipe Macedo  
**Contato:** contato.dev.macedo@gmail.com  
**GitHub:** [FelipeMacedo](https://github.com/felipemacedo1)  
**LinkedIn:** [felipemacedo1](https://linkedin.com/in/felipemacedo1)

> 💡 **Reflexão:** Este projeto foi essencial para entender OAuth 2.0 na prática. A experiência com Google APIs e JWT tokens estabeleceu bases sólidas para implementar autenticação em projetos mais complexos.