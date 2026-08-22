# Babá Eletrônica (Baby Monitor)

> 🇧🇷 **Babá eletrônica inteligente, gratuita e de código aberto em tempo real.**  
> 🇺🇸 **Real-time, free, and open-source smart baby monitor using WebRTC.**

Transforme qualquer celular antigo em uma babá eletrônica inteligente e use seu celular do dia a dia como monitor dos pais. Funciona direto no navegador em Android e iOS, sem necessidade de instalar aplicativos ou criar contas.

---

## 🌟 Principais Recursos / Key Features

- **🌐 Suporte Bilíngue (pt-BR / en-US)**: Interface completa em português do Brasil e inglês com alternância instantânea e persistência.
- **📱 PWA Completo**: Instalável como aplicativo na tela inicial de celulares Android e iOS.
- **📹 Transmissão em Tempo Real (WebRTC)**: Vídeo e áudio diretos de alta fidelidade com baixíssima latência (< 200ms).
- **👥 Múltiplos Monitores Simultâneos**: Pai e mãe podem assistir e ouvir ao mesmo tempo em aparelhos separados.
- **🎙️ Push-to-Talk (Segure para Falar)**: Fale com o bebê diretamente pelo celular dos pais.
- **🔊 Alertas Visuais e Sonoros**: Indicador de choro/som alto, perda de conexão e medidor de nível de áudio.
- **🎵 Canções de Ninar e Ruído Branco**: Toque músicas relaxantes no celular do quarto com temporizador programável.
- **🔋 Economia de Bateria**: A tela do celular do bebê escurece automaticamente mantendo a câmera e o microfone ativos.
- **🔒 Privacidade Total**: Nenhuma mídia é gravada ou enviada para terceiros. Conexão direta ponta a ponta (P2P).
- **🌐 Servidor Relay Integrado**: Modo fallback para redes corporativas ou roteadores restritivos com NAT simétrico.
- **🐳 Docker & Coolify Ready**: Imagem leve e segura para auto-hospedagem em 1 clique.

---

## 🚀 Como Iniciar / Quick Start

### Execução Local

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor
npm start
```

Acesse `http://localhost:3000` no seu navegador.

1. Digite um nome único para a sessão (ex: `quarto-bebe`).
2. No celular do quarto, abra o modo **Celular do Bebê (Câmera)**.
3. No seu celular, abra o **Monitor dos Pais**.
4. Salve nos favoritos ou instale como PWA na tela inicial!

---

## 🧪 Testes Automatizados (Playwright)

O projeto possui uma suíte completa de testes de ponta a ponta testando internacionalização, PWA, 1 Sender + 1 Receiver, **1 Sender + 2 Receivers simultâneos** e modo Relay:

```bash
# Executar todos os testes
npm test

# Executar com interface gráfica
npm run test:headed
```

---

## 📚 Documentação Adicional

- 🛠️ [**DEVELOPMENT.md**](./DEVELOPMENT.md): Guia de arquitetura, testes e como configurar **HTTPS local** para testar em celulares reais na mesma rede Wi-Fi.
- 🚀 [**DEPLOYMENT.md**](./DEPLOYMENT.md): Guia de implantação em produção com **Docker**, **Docker Compose** e **Coolify**.

---

## 📄 Licença / License

Distribuído sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.
