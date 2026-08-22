Estamos trabalhando no meu fork do projeto open source `felschatz/baby-monitor`.

Quero preparar e validar completamente o projeto LOCALMENTE antes de qualquer deploy na minha VPS.

O projeto será usado de verdade como babá eletrônica, com um celular permanentemente no quarto do bebê transmitindo câmera e microfone, e eu e minha esposa acessando como receptores.

Prioridades:

- confiabilidade;
- privacidade;
- baixa latência;
- funcionamento contínuo;
- experiência mobile/PWA;
- reconexão;
- simplicidade;
- baixo consumo de recursos.

Não faça deploy na VPS.

Não faça push para `main`.

Não faça merge em `main`.

A branch `main` será exclusivamente de produção e está ligada ao auto-deploy do Coolify.

---

# 1. ESTRATÉGIA DE GIT

Primeiro inspecione:

```bash
git status
git branch -a
git remote -v
```

Confirme que:

- `origin` aponta para o meu fork;
- `upstream`, se configurado, aponta para `felschatz/baby-monitor`.

A estratégia deste projeto será:

```text
main
→ produção
→ Coolify acompanha essa branch
→ nunca desenvolver diretamente nela

develop
→ desenvolvimento
→ tradução
→ testes
→ validação local
```

Se a branch `develop` ainda não existir:

1. confirme que `main` está íntegra;
2. crie `develop` a partir da `main`;
3. mude para `develop`.

Todo o trabalho desta tarefa deve acontecer em:

```text
develop
```

Não crie branches adicionais sem necessidade.

Não altere histórico Git.

Não use force push.

Não faça merge em `main`.

Não faça push para `main`.

Não faça push para nenhuma branch sem minha autorização.

---

# 2. ANTES DE CODIFICAR: ENTENDA O PROJETO

Não comece fazendo alterações imediatamente.

Leia completamente:

- `AGENT.md`, se existir;
- `AGENTS.md`, se existir;
- `README.md`;
- `CONTRIBUTING.md`, se existir;
- `package.json`;
- arquivos Docker existentes;
- `.env.example`;
- servidor;
- frontend;
- Service Worker;
- WebRTC;
- SSE;
- Sender;
- Receiver;
- Relay;
- PTT;
- músicas/lullabies;
- código relacionado a Wake Lock;
- segurança das sessões.

Mapeie a arquitetura real.

Quero saber:

1. Como Sender e Receiver se encontram.
2. Como funciona a sinalização.
3. Como funciona WebRTC Direct.
4. Como funciona Server Relay.
5. Se existe TURN/STUN e como é usado.
6. Se suporta mais de um Receiver.
7. Como a reconexão funciona.
8. Como Wake Lock funciona.
9. Como câmera/microfone são mantidos ativos.
10. Qual é o estado atual da PWA.
11. Como os textos da interface estão organizados.
12. Como o projeto é executado atualmente.

Não presuma nada que possa ser confirmado lendo o código.

Depois dessa análise, apresente rapidamente o plano de implementação e então continue.

---

# 3. OBJETIVO DESTA ETAPA

Ao final desta tarefa eu quero ter LOCALMENTE:

```text
Baby Monitor
├── rodando corretamente
├── pt-BR
├── PWA
├── Sender
├── Receiver
├── WebRTC Direct
├── Server Relay
├── múltiplos Receivers
├── Docker local
├── Playwright
├── testes mobile
├── documentação
└── pronto para futuramente ir ao Coolify
```

Mas NÃO faça deploy.

---

# 4. PORTUGUÊS DO BRASIL

Adicionar suporte completo a:

```text
pt-BR
```

Português brasileiro deve ser o idioma padrão quando o navegador estiver configurado em português do Brasil.

Preserve inglês.

Se já existir infraestrutura de internacionalização, utilize-a.

Se não existir, implemente uma solução pequena e limpa.

Não duplique toda a aplicação apenas para traduzir textos.

Traduzir todos os textos visíveis ao usuário, incluindo:

- página inicial;
- Sender;
- Receiver;
- configurações;
- estados de conexão;
- erros;
- permissões;
- alertas;
- câmera;
- microfone;
- áudio;
- sensibilidade;
- volume;
- tela cheia;
- Push-to-Talk;
- músicas;
- modo áudio;
- Direct;
- Relay;
- reconexão;
- mensagens geradas por JavaScript;
- acessibilidade;
- títulos;
- labels;
- placeholders.

Use português brasileiro natural.

Exemplos:

```text
Sender
→ Celular do bebê
ou
→ Câmera do bebê

Receiver
→ Monitor dos pais

Push to Talk
→ Segure para falar

Audio only
→ Somente áudio

Connection lost
→ Conexão perdida

Sensitivity
→ Sensibilidade
```

Adapte ao contexto real da interface.

Se fizer sentido, adicione seletor:

```text
🇧🇷 Português
🇺🇸 English
```

Persista a escolha localmente.

Depois procure no repositório por textos em inglês que ainda possam aparecer na interface.

---

# 5. PWA

Quero usar o projeto como PWA em Android.

Primeiro verifique o que o projeto já possui.

Não recrie algo que já existe.

A PWA deve possuir, quando aplicável:

- manifest;
- nome;
- short name;
- ícones;
- `display: standalone`;
- viewport mobile;
- theme color;
- instalação no Android;
- service worker correto;
- atualização segura.

Preserve funcionalidades existentes relacionadas a:

- músicas offline;
- Sender;
- cache atual;
- Service Worker.

Evite cache agressivo de:

- SSE;
- signaling;
- sessões;
- endpoints dinâmicos;
- WebRTC;
- páginas que precisam refletir estado em tempo real.

Confiabilidade é mais importante que funcionamento offline.

---

# 6. MODO SENDER — CELULAR DO QUARTO

Este aparelho pode permanecer funcionando por muitas horas consecutivas.

Revise cuidadosamente:

- câmera;
- microfone;
- permissões;
- Wake Lock;
- liberação/requisição novamente do Wake Lock;
- tela escurecida;
- reconexão;
- perda temporária de Wi-Fi;
- SSE;
- WebRTC;
- Receiver desconectando e reconectando;
- mudança de visibilidade da aba;
- erros do navegador;
- autoplay;
- estado real da transmissão.

A tela pode ficar visualmente escura para não iluminar o quarto, mas isso não deve interromper a câmera ou microfone.

Não prometa comportamento que o navegador/Android não consegue oferecer.

Se Android puder suspender câmera quando a aplicação estiver realmente em background, documente isso claramente.

---

# 7. MODO RECEIVER — CELULAR DOS PAIS

Validar:

- vídeo;
- áudio;
- baixa latência;
- controle de volume;
- fullscreen;
- sensibilidade;
- alerta de som;
- alerta de desconexão;
- áudio somente;
- Push-to-Talk;
- músicas;
- reconexão;
- estados da interface.

A experiência deve ser muito confortável em celular.

Não faça redesign radical.

Preserve a identidade atual sempre que possível.

Melhore apenas problemas reais de UX.

---

# 8. DOIS RECEIVERS AO MESMO TEMPO

Esse cenário é essencial.

Uso real:

```text
Celular do bebê
       │
       ├──── meu celular
       │
       └──── celular da minha esposa
```

Testar:

```text
1 Sender
+
1 Receiver
```

e:

```text
1 Sender
+
2 Receivers simultâneos
```

Verifique:

- se os dois recebem vídeo;
- se os dois recebem áudio;
- se um não derruba o outro;
- reconexão individual;
- desconexão de um sem afetar o outro;
- Push-to-Talk;
- músicas;
- estados internos.

Faça esses testes tanto em:

```text
Direct
```

quanto em:

```text
Server Relay
```

quando tecnicamente aplicável.

Se existir limitação arquitetural, documente antes de tentar uma reescrita grande.

---

# 9. DOCKER LOCAL

Tenho Docker Desktop funcionando no Windows.

Você pode utilizá-lo.

Primeiro entenda como o projeto roda nativamente.

Para desenvolvimento rápido, pode executar diretamente com Node se isso facilitar debug.

Mas também quero validar o ambiente Docker que posteriormente será usado no servidor.

Se não existir Dockerfile adequado, crie.

Quero:

```text
docker build
```

funcionando.

E:

```text
docker run
```

funcionando.

Se Docker Compose fizer sentido, pode ser utilizado.

Mas não introduza serviços desnecessários.

O projeto deve continuar pequeno.

O container deve:

- usar versão adequada do Node;
- instalar somente o necessário;
- executar como usuário não-root, se possível;
- respeitar `PORT`;
- responder corretamente a SIGTERM;
- possuir `.dockerignore`;
- não conter segredos;
- ser pequeno;
- ser adequado futuramente para Coolify.

Não configure Coolify ainda.

Apenas deixe preparado.

---

# 10. HTTPS PARA TESTE LOCAL EM CELULARES

Câmera e microfone no navegador normalmente exigem contexto seguro.

`localhost` pode funcionar no computador, mas:

```text
http://192.168.x.x
```

acessado pelo celular pode não permitir câmera/microfone.

Quero testar com celulares reais ainda nesta fase local.

Portanto:

1. verifique o comportamento atual;
2. determine a solução local mais simples e segura para disponibilizar HTTPS dentro da rede;
3. implemente/documente se necessário.

Pode utilizar certificado local de desenvolvimento caso seja adequado.

Não exponha o projeto publicamente só para resolver isso.

Não use serviços cloud desnecessários.

Documente exatamente como acessar pelo celular durante os testes.

---

# 11. PLAYWRIGHT

Existe uma skill de Playwright disponível no meu ambiente.

USE-A.

Não faça apenas inspeção visual.

Quero testes automatizados reais.

Teste pelo menos:

- página inicial;
- pt-BR;
- inglês;
- troca de idioma;
- Sender;
- Receiver;
- controles;
- navegação;
- erros;
- estado conectado;
- estado desconectado;
- volume;
- sensibilidade;
- somente áudio;
- tela escura;
- PWA manifest;
- viewport mobile;
- console JavaScript;
- signaling básico.

Quando necessário, utilize fake camera e fake microphone do Chromium.

Também tente automatizar:

```text
1 Sender
+
2 Receivers
```

usando contexts/pages separados.

Não marque como aprovado algo que o Playwright não conseguiu realmente validar.

---

# 12. TESTES RESPONSIVOS

Testar pelo menos:

```text
360 × 800
390 × 844
desktop
```

Verifique:

- overflow;
- botões;
- controles;
- texto;
- modal;
- vídeo;
- tela cheia;
- orientação;
- layout.

---

# 13. SEGURANÇA

Essa aplicação transmite imagem e áudio do interior de uma residência.

Faça uma revisão de segurança.

Investigue:

- descoberta de sessões;
- enumeração;
- nomes de sessão;
- autenticação;
- SSE;
- signaling;
- Relay;
- endpoints;
- CORS;
- headers;
- logs;
- inputs;
- path traversal;
- injection;
- XSS;
- informações sensíveis;
- sessões ativas;
- rate limiting;
- cache;
- dependências.

Não implemente um sistema gigantesco de usuários.

Se a segurança atual depender apenas de um nome secreto de sessão, avalie se isso será suficiente quando futuramente estiver exposto na Internet.

Caso recomende autenticação adicional, priorize algo simples e robusto.

Não coloque:

- senha;
- token;
- domínio;
- IP;
- credential;
- secret

hardcoded.

Use variáveis de ambiente.

---

# 14. NÃO FAÇA REWRITE

Este projeto foi escolhido porque é simples.

Não transforme em:

- React;
- Next.js;
- Vue;
- Angular;
- TypeScript completo;
- banco de dados;
- plataforma SaaS;
- sistema complexo de contas.

Não instale frameworks gigantes apenas por conveniência.

Faça melhorias incrementais.

Preserve o upstream.

---

# 15. TESTE LOCAL COMPLETO

Depois das alterações:

Suba o projeto local.

Teste execução direta.

Teste execução Docker.

Use Playwright.

Observe:

- stdout;
- stderr;
- console do navegador;
- Network;
- SSE;
- WebRTC;
- erros.

Não aceite erros inexplicados.

---

# 16. TESTE EM DISPOSITIVOS REAIS

Depois dos testes automatizados, prepare o projeto para teste com celulares reais na mesma rede.

Eu posteriormente testarei fisicamente:

```text
Celular A
→ Sender

Celular B
→ Receiver

Celular C
→ segundo Receiver
```

Prepare instruções objetivas para isso.

Não considere câmera real, microfone real, Wake Lock e longa duração completamente validados apenas com Playwright.

Esses itens precisam de teste físico.

---

# 17. DOCUMENTAÇÃO

Atualize a documentação sem destruir o README original.

Se necessário, crie:

```text
DEVELOPMENT.md
```

e/ou:

```text
DEPLOYMENT.md
```

Documentar:

- instalação;
- Node;
- Docker;
- execução local;
- HTTPS local;
- PWA;
- pt-BR;
- Sender;
- Receiver;
- Direct;
- Relay;
- múltiplos Receivers;
- limitações Android;
- Wake Lock;
- segurança;
- variáveis de ambiente;
- testes;
- Playwright.

Também documente nosso fluxo Git:

```text
develop
→ desenvolvimento/testes

main
→ produção/Coolify
```

---

# 18. NÃO FAZER DEPLOY

Muito importante:

NÃO:

- acessar minha VPS;
- configurar Coolify;
- alterar Coolify;
- fazer deploy;
- fazer merge em `main`;
- fazer push em `main`.

O Coolify está configurado com auto-redeploy.

Portanto, `main` é produção.

Somente depois que eu testar e aprovar tudo localmente faremos:

```text
develop
      ↓
    main
      ↓
    push
      ↓
  Coolify
```

Essa etapa será feita posteriormente e somente com minha autorização.

---

# 19. VERIFICAÇÃO FINAL

Antes de finalizar:

1. execute testes existentes;
2. execute Playwright;
3. execute security/dependency checks apropriados;
4. execute o projeto diretamente;
5. execute pelo Docker;
6. valide pt-BR;
7. valide inglês;
8. valide PWA;
9. valide Sender;
10. valide Receiver;
11. valide 2 Receivers;
12. valide Direct;
13. valide Relay;
14. verifique console;
15. verifique Network;
16. revise `git diff`;
17. confirme ausência de secrets;
18. confirme que está em `develop`;
19. confirme que `main` não foi modificada.

---

# 20. NO FINAL, PARE

Não faça commit, push, merge ou deploy automaticamente.

Ao finalizar, me entregue:

## Arquitetura encontrada

Explique resumidamente como o Baby Monitor funciona.

## Alterações realizadas

Liste os principais arquivos alterados e por quê.

## pt-BR

Explique como foi implementado.

## PWA

Explique o que já existia e o que precisou ser acrescentado.

## Sender

Informe o resultado dos testes.

## Receiver

Informe o resultado dos testes.

## Dois Receivers

Informe claramente se:

```text
1 Sender + 2 Receivers
```

funcionou.

## Direct

Informe o que foi validado.

## Relay

Informe o que foi validado.

## Docker

Informe:

- build;
- run;
- health;
- tamanho aproximado;
- problemas encontrados.

## Playwright

Liste os testes executados e resultado.

## Segurança

Liste:

- riscos encontrados;
- corrigidos;
- pendentes.

## Testes reais ainda necessários

Liste o que precisa ser confirmado fisicamente nos celulares.

## Git

Mostre:

```text
branch atual
git status
git diff --stat
```

E pare.

Espere minha autorização antes de qualquer commit, push, merge ou deploy.