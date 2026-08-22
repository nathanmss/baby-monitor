# Guia de Desenvolvimento - Babá Eletrônica (Baby Monitor)

Este documento contém todas as instruções necessárias para configurar o ambiente local, executar os testes automatizados e testar a aplicação em dispositivos móveis reais na mesma rede local.

---

## 1. Arquitetura do Projeto

- **Frontend**: Vanilla HTML5, CSS3 moderno e JavaScript (ES Modules). Sem dependência de frameworks pesados (React/Vue/Angular), garantindo inicialização instantânea e baixo consumo de memória em celulares antigos.
- **Internacionalização (i18n)**: Módulo nativo (`public/js/i18n.js`) com suporte completo a **Português do Brasil (`pt-BR`)** e **Inglês (`en-US`)**, persistência em `localStorage` e seletor na interface.
- **PWA (Progressive Web App)**: `manifest.webmanifest`, ícones adaptativos e Service Worker otimizado (sem cachear rotas de sinalização ou streams em tempo real).
- **Backend / Sinalização**: Node.js com servidor HTTP/HTTPS nativo, utilizando **Server-Sent Events (SSE)** e `POST /api/signal` para troca de ofertas, respostas e candidatos ICE.
- **Transmissão de Mídia (WebRTC)**:
  - **Modo Direto (P2P)**: Conexão direta entre o Sender (câmera do bebê) e os Receivers (monitores dos pais) usando STUN público e SDP otimizado para baixa latência em Opus/VP8.
  - **Modo Relay**: Ponte WebRTC no próprio servidor Node.js via `@roamhq/wrtc` para redes corporativas ou roteadores restritivos que bloqueiam UDP/P2P.
  - **Múltiplos Monitores**: O Sender gerencia conexões independentes para múltiplos Receivers simultâneos.

---

## 2. Pré-requisitos

- **Node.js**: versão 20 LTS ou 22+ recomendada.
- **npm**: versão 10+.
- Navegadores modernos com suporte a WebRTC (Chrome, Edge, Safari, Firefox).

---

## 3. Instalação e Execução Local

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Iniciar o servidor de desenvolvimento
npm start
```

O servidor iniciará em `http://localhost:3000`.

- **Página Inicial**: `http://localhost:3000/`
- **Página de Início / Configuração de Sessão**: `http://localhost:3000/start.html`
- **Câmera do Bebê (Sender)**: `http://localhost:3000/s/nome-da-sessao`
- **Monitor dos Pais (Receiver)**: `http://localhost:3000/r/nome-da-sessao`

---

## 4. Testes em Celulares Reais na Mesma Rede Wi-Fi (HTTPS Local)

> [!IMPORTANT]
> Navegadores móveis (Chrome no Android e Safari no iOS) exigem um **Secure Context (HTTPS)** para liberar o acesso a `navigator.mediaDevices.getUserMedia` (câmera e microfone), `navigator.wakeLock` (manter tela ligada) e Service Workers ao acessar por IP local (ex: `192.168.1.100:3000`).

### Opção A: Certificados Locais com `mkcert` (Recomendado)

1. Instale o [mkcert](https://github.com/FiloSottile/mkcert):
   ```bash
   # Windows (via Chocolatey ou Scoop)
   choco install mkcert
   mkcert -install

   # Linux / macOS
   brew install mkcert
   mkcert -install
   ```

2. Descubra o IP da sua máquina na rede local (ex: `192.168.1.50` no Windows via `ipconfig` ou Linux via `ip a`).

3. Gere os certificados para `localhost` e seu IP local:
   ```bash
   mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 192.168.1.50
   ```

4. Crie um arquivo `.env` na raiz do projeto:
   ```env
   PORT=3000
   SSL_KEY=key.pem
   SSL_CERT=cert.pem
   ```

5. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor iniciará em `https://192.168.1.50:3000`. Acesse este endereço em ambos os celulares conectados no mesmo Wi-Fi.

---

### Opção B: Túnel Seguro (Ngrok / Cloudflare Tunnel / LocalTunnel)

Se preferir não gerar certificados locais, você pode expor a porta local com túnel HTTPS:

```bash
# Usando LocalTunnel
npx localtunnel --port 3000

# Ou usando Ngrok
ngrok http 3000
```
Use o link `https://...` gerado no celular do bebê e no celular dos pais.

---

### Opção C: Flag do Chrome no Android (Sem HTTPS)

1. No Chrome do celular Android, acesse: `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
2. Ative a flag e adicione a URL da sua máquina (ex: `http://192.168.1.50:3000`).
3. Reinicie o Chrome.

---

## 5. Testes Automatizados (Playwright)

A suíte de testes ponta a ponta cobre:
- Internacionalização (pt-BR e en-US, persistência e alternância).
- Manifesto PWA e tags de instalação mobile.
- Simulação de câmera/microfone via flags do Chromium.
- Conexão e streaming WebRTC direto (1 Sender + 1 Receiver).
- **1 Sender transmitindo para 2 Receivers simultâneos** com desconexão independente.
- Modo Server Relay e APIs de status.
- Responsividade em viewports mobile (360x800 e 390x844).

```bash
# Executar todos os testes em modo headless
npm test

# Executar testes com interface visual do navegador
npm run test:headed
```

---

## 6. Estrutura de Arquivos

```
baby-monitor/
├── public/
│   ├── index.html           # Landing page com i18n e seletor de idioma
│   ├── start.html           # Seleção de sessão, qualidade e modo
│   ├── sender.html          # Interface da câmera do bebê
│   ├── receiver.html        # Interface do monitor dos pais
│   ├── manifest.webmanifest # Manifesto PWA
│   ├── icons/               # Ícones de aplicativo
│   └── js/
│       ├── i18n.js          # Dicionário e motor de internacionalização
│       ├── session.js       # Inicialização e persistência de sessões
│       ├── signaling.js     # Cliente SSE + HTTP POST
│       ├── webrtc.js        # Configuração ICE e otimização SDP
│       ├── sender-app.js    # Controlador da câmera do bebê
│       ├── sender-webrtc.js # WebRTC do sender (múltiplos receivers)
│       ├── receiver-app.js  # Controlador do monitor dos pais
│       ├── receiver-webrtc.js # WebRTC do receiver
│       ├── keep-awake.js    # Wake Lock API + NoSleep fallback
│       └── ptt.js           # Push-to-Talk (walkie-talkie)
├── server/
│   ├── index.js             # Servidor HTTP/HTTPS e roteamento
│   ├── session-manager.js   # Estado em memória das sessões ativas
│   ├── sse-manager.js       # Canais SSE e heartbeats
│   ├── signal-router.js     # Roteamento de mensagens de sinalização
│   ├── relay-manager.js     # Servidor WebRTC Relay (@roamhq/wrtc)
│   ├── static-server.js     # Servidor de arquivos estáticos seguro
│   └── utils.js             # Validações, headers e helpers
├── tests/                   # Suíte de testes Playwright
├── Dockerfile               # Imagem OCI para deploy em produção
├── docker-compose.yml       # Orquestração local para Docker Desktop
├── DEVELOPMENT.md           # Este guia de desenvolvimento
└── DEPLOYMENT.md            # Guia de implantação em produção / Coolify
```
