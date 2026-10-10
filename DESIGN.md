# Design System - Olho de Sauron Baby

## Philosophy
Elegância utilitária e minimalismo escuro OLED para ambientes noturnos. A interface desaparece quando o usuário está apenas observando e se faz presente com precisão tátil quando acionada.

## Color Tokens
- `--bg-canvas`: `#09090b` (Preto OLED verdadeiro para consumo zero em telas OLED e sem vazamento de luz)
- `--bg-surface`: `rgba(18, 18, 20, 0.82)` (Vidro escuro fosco com blur para docks e cartões flutuantes)
- `--bg-card`: `#141416`
- `--bg-elevated`: `#1c1c20`
- `--border-subtle`: `rgba(255, 255, 255, 0.08)`
- `--border-focus`: `rgba(217, 119, 6, 0.45)`
- `--accent-amber`: `#d97706` (Âmbar suave e acolhedor, não agressivo aos olhos no escuro)
- `--accent-amber-hover`: `#b45309`
- `--status-online`: `#16a34a` (Verde calmo)
- `--status-offline`: `#dc2626` (Vermelho sutil)
- `--text-primary`: `#f4f4f5` (Contraste alto, legível a 1m de distância no tablet)
- `--text-secondary`: `#a1a1aa`
- `--text-muted`: `#71717a`

## Typography
- Família: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif`
- Escala:
  - Heading 1: 1.5rem (24px), peso 700
  - Heading 2: 1.15rem (18px), peso 600
  - Body: 0.95rem (15px), peso 400
  - Captions/Pills: 0.75rem (12px), peso 600

## Components
1. **Floating HUD Dock:**
   - Centralizado na base: `position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);`
   - `backdrop-filter: blur(24px); border-radius: 28px;`
   - Alvos mínimos de toque: 48x48px
   - Auto-hide após 4 segundos sem interação (com fade out suave e reativação imediata ao toque).
2. **Compact Noise VU Meter:**
   - Indicador visual compacto em pill (32-40px de altura, 80-120px de largura) com barra de nível de som viva e marcador de limite.
3. **Settings Modal/Sheet:**
   - Painel flutuante translúcido com fechamento rápido, sem empurrar o layout do vídeo.
4. **Action Mode Cards (Home /):**
   - Dois cards imersivos lado a lado ou verticais, com ícones nítidos, tipografia clara e acionamento instantâneo.
