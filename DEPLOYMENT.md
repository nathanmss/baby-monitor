# Guia de Implantação (Deployment) - Babá Eletrônica

Este guia detalha como preparar e implantar a aplicação **Babá Eletrônica** em ambientes de produção com **Coolify**, **Docker** ou servidores VPS próprios.

---

## 1. Fluxo de Branches e Regras de Segurança

> [!CAUTION]
> - **Branch `main`**: Exclusiva para produção estável. Se conectada ao auto-deploy do Coolify/VPS, qualquer alteração nela dispara um novo build imediatamente.
> - **Branch `develop`**: Toda a implementação e testes devem ocorrer nesta branch.
> - **Nenhum deploy direto na VPS deve ser feito a partir de branches de desenvolvimento sem validação de testes.**

---

## 2. Implantação via Coolify (Recomendado)

O [Coolify](https://coolify.io) é a plataforma recomendada para hospedar o projeto de forma autônoma e com SSL automático.

### Passo a Passo no Painel do Coolify:

1. **Adicionar Nova Aplicação**:
   - Escolha **Private Repository (com Deploy Key ou GitHub App)** ou **Public Repository**.
   - Aponte para o repositório do projeto.
   - Selecione a branch `main` (para produção).

2. **Tipo de Build**:
   - Selecione **Dockerfile**.
   - O Coolify detectará automaticamente o `Dockerfile` otimizado na raiz do projeto.

3. **Portas e Roteamento**:
   - **Porta Interna do Contêiner**: `3000`.
   - **Domínio Público**: Defina seu domínio ou subdomínio (ex: `https://baba.seudominio.com`). O Coolify configurará o proxy reverso (Traefik/Caddy) com certificado Let's Encrypt automaticamente.

4. **Healthcheck**:
   - O `Dockerfile` já inclui healthcheck automático consultando `http://localhost:3000/api/status`.
   - No Coolify, a rota de checagem de saúde pode ser configurada como `/api/status`.

5. **Variáveis de Ambiente**:
   ```env
   PORT=3000
   NODE_ENV=production
   ENABLE_DEBUG_TIMER=false
   ```

---

## 3. Implantação com Docker e Docker Compose

Para executar o contêiner em qualquer VPS com Docker:

### Utilizando Docker Compose:

```bash
# 1. Clonar o repositório
git clone https://github.com/nathanmss/baby-monitor.git
cd baby-monitor

# 2. Iniciar o serviço em background
docker compose up -d --build

# 3. Verificar o status e logs
docker compose ps
docker compose logs -f
```

### Utilizando Docker CLI diretamente:

```bash
# Construir a imagem OCI
docker build -t baby-monitor:latest .

# Executar o contêiner
docker run -d \
  --name baby-monitor \
  --restart unless-stopped \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  baby-monitor:latest
```

---

## 4. Considerações de Rede para WebRTC em Produção

### Modo Direto (P2P):
- Por padrão, a aplicação utiliza servidores STUN públicos para descobrir o IP público e portas dos dispositivos.
- Funciona perfeitamente na maioria das redes residenciais (mesmo Wi-Fi ou 4G/5G com NAT regular).

### Modo Server Relay:
- O servidor possui bridge WebRTC integrado com `@roamhq/wrtc`.
- Quando clientes selecionam o modo **Servidor Relay** ou quando o NAT simétrico impede a conexão direta P2P, o tráfego RTP passa pelo servidor Node.js.
- Se implantado atrás de um firewall ou proxy que bloqueie portas UDP aleatórias, certifique-se de que as portas UDP necessárias estejam liberadas caso planeje usar o Relay em larga escala.

---

## 5. Manutenção e Atualização

Para atualizar a versão em produção:

1. Desenvolva e teste todas as funcionalidades na branch `develop`.
2. Execute a suíte de testes ponta a ponta:
   ```bash
   npm test
   ```
3. Abra um Pull Request / Merge da branch `develop` para a `main`.
4. O Coolify detectará o commit na `main` e executará o novo build de produção com zero downtime.
