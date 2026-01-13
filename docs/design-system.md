# Design System — Portfólio

Este documento descreve os tokens e componentes CSS do portfólio.

## Estrutura de CSS e carregamento

### Home (`index.html`)
- CSS carregado: `css/design-tokens.css`

### Case studies (`case-studies/*.html`)
- CSS carregado: `css/case-study-style.css`
- Observação: `css/case-study-style.css` importa `css/base-style.css`, que por sua vez importa `css/design-tokens.css`.

Os case studies são uma **linha editorial diferente** do restante do site (cores e tipografia podem divergir de propósito).

## Convenções

### Nomeação de classes
- Padrão aproximado de BEM para blocos e elementos (ex.: `hero`, `hero__title`, `case-card__content`).

### Unidades e escala
- Espaçamentos seguem uma escala baseada em 8px.
- Tipografia usa famílias do Google Fonts.

## Tokens (CSS Custom Properties)

Tokens vivem em `css/design-tokens.css` dentro de `:root`.

### Cores

#### Superfícies
- `--color-surface-primary`: fundo principal (dark)
- `--color-surface-secondary`: superfície secundária
- `--color-surface-tertiary`: superfície terciária

#### Texto
- `--color-text-main`: texto principal
- `--color-text-muted`: texto secundário
- `--color-text-subtle`: texto mais sutil
- `--color-text-inverse`: texto invertido

#### Acentos
- `--color-accent-primary`: cor principal para botões/ícones
- `--color-accent-secondary`: acento sutil

### Espaçamento

Escala semântica:
- `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl`, `--space-3xl`

Aliases numéricos (para compatibilidade com CSS legado e casos):
- `--space-2`, `--space-3`, `--space-4`, `--space-8`, `--space-12`, `--space-16`, `--space-24`

### Tipografia
- Famílias:
  - `--font-family-sans`
  - `--font-family-serif`
- Tamanhos:
  - `--font-size-sm`, `--font-size-base`, `--font-size-lg`, `--font-size-xl`, `--font-size-2xl`, `--font-size-3xl`, `--font-size-4xl`
- Line height:
  - `--line-height-tight`, `--line-height-base`, `--line-height-loose`
- Pesos:
  - `--font-weight-normal`, `--font-weight-medium`, `--font-weight-semibold`, `--font-weight-bold`

### Raio
- `--radius-sm`, `--radius-md`, `--radius-lg`

### Sombra
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`

### Transições
- `--transition-fast`, `--transition-base`, `--transition-slow`

## Componentes (Home)

Todos os componentes abaixo existem em `css/design-tokens.css`.

### Container
Classe: `container`
- Define largura máxima e padding responsivo.

### Hero
Classes:
- `hero`
- `hero__pre`
- `hero__title`
- `hero__subtitle`
- `hero__actions`

### Social links
Classes:
- `social-links`
- `social-link`

### Botões
Classe base: `btn`
Variantes:
- `btn--primary`
- `btn--ghost`

Estados:
- Hover configurado nas variantes
- Foco por teclado: `:focus-visible` (outline)

### Grid de cards
- `card-grid`

### Card de case
Classes:
- `case-card`
- `case-card__image`
- `case-card__content`
- `case-card__title`
- `case-card__description`

## Acessibilidade

### Foco por teclado
- Home (`design-tokens.css`): `a:focus-visible`, `.btn:focus-visible`, `.social-link:focus-visible`
- Cases (`case-study-style.css`): `a:focus-visible`, `.go-back-nav:focus-visible`, `.case-sidebar a:focus-visible`

Recomendação:
- Evitar remover outlines sem fornecer substituto visível.

### Imagens
- Sempre fornecer `alt` descritivo nas capas e imagens relevantes.

## Como evoluir o Design System

### Adicionar um novo token
1. Declarar em `:root` (em `design-tokens.css`).
2. Preferir nomes semânticos (ex.: `--color-*`, `--space-*`).
3. Documentar em `docs/token-mapping.md`.

### Adicionar um novo componente
1. Definir a classe no CSS apropriado:
   - Home: `design-tokens.css`
   - Case study: `case-study-style.css`
2. Adicionar exemplo em `docs/component-examples.md`.
