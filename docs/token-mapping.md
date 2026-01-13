# Mapeamento de Substituições — Hard-coded → Tokens

Este arquivo documenta as substituições aplicadas e o mapeamento recomendado para futuras conversões.

## Substituições aplicadas (ex.: `index-style.css`)

- `border-radius: 12px` → `border-radius: var(--radius-md)`
  - Rationale: padronizar corners do design system

- `color: #333333` → `color: var(--neutral-700)`
  - Rationale: usar palette neutra do sistema para consistência e contraste

- `box-shadow: inset 0 -0.4em 0 #F9DCE6` → `box-shadow: inset 0 -0.4em 0 var(--accent-rose-subtle)`
- `box-shadow: inset 0 -0.4em 0 #d5b6f7` → `box-shadow: inset 0 -0.4em 0 var(--accent-violet-subtle)`
  - Rationale: usar tokens de acento para efeitos decorativos, mantendo a possibilidade de variar paleta

- `padding: 0.4em / 0.6em` → `padding: var(--space-2); padding-inline: var(--space-3)`
  - Rationale: alinhar com a escala de espaçamento base (4px unit)

- `border: 1px solid black` → `border: 1px solid var(--sys-surface-variant)`
  - Rationale: bordas levam o token semântico da superfície para consistência entre temas

- `box-shadow: 0 .125rem .25rem #00000013` → `box-shadow: var(--elevation-1)`
  - Rationale: sombras suaves centralizadas em tokens de elevação

- Espaçamentos (ex.: `margin-bottom: 2em;`) → `margin-bottom: var(--space-8);`
  - Rationale: usar espaçamento generoso do token set

- Tipografia (ex.: `font-size: 1.8em`) → `font-size: var(--type-h1-size)` e afins
  - Rationale: centralizar escala tipográfica e melhorar consistência

## Recomendações gerais

- Priorizar sempre tokens semânticos (`--sys-*`) para cores de interface; usar tokens de `accent-*` para elementos decorativos.
- Evitar unidades `em` fixas em componentes que impactem layout (altura fixa, por exemplo). Prefira `min-height`/`max-height` com tokens quando necessário.
- Para sombras, use exclusivamente `--elevation-*`.
- Documentar novos tokens quando surgirem cores ou espaçamentos que não existam (como fiz com `--accent-*-subtle`).

## Próximo passo
Aplicar mesmos mapeamentos em `case-study-style.css` e outros arquivos CSS do projeto, validar visualmente e ajustar onde necessário.

## Novos tokens e mudanças aplicadas
- `--content-max-width` = `1024px` — usado para centralizar a largura do conteúdo (substitui `max-width` literal).
- `--image-hero-height` = `16rem` — usado como `min-height` para thumbnails do index (mantém proporção visual e evita colapsos).
- `--case-study-description-max-height` = `2.6rem` — fallback para truncagem de descrições de cards.
- **Tipografia:** `--font-family-sans` atualizado para **"Nunito Sans"** para uma aparência mais suave e legível (já incluída via Google Fonts nos HTML).
- **Pesos e espaçamento:** adicionei `--font-weight-regular: 400`, `--font-weight-medium: 500`, `--font-weight-heading: 600` e tokens de letter-spacing (`--font-letter-spacing-tight`, `--font-letter-spacing-normal`, `--font-letter-spacing-wide`) para oferecer controle fino de legibilidade e estética.
## Ações de acessibilidade e UX
- Adicionadas `alt` descritivas para todas as imagens do site.
- As descrições dos cards agora usam truncagem por linhas (`-webkit-line-clamp: 2`) com fallback `max-height`.
- Recomenda-se adicionar um mecanismo de expansão (`Ler mais`) caso a descrição precise ser lida integralmente no index.

## Testes sugeridos
1. Testes manuais (desktop/mobile): verificar crops, truncagem e alinhamento de grid.
2. Acessibilidade: executar axe/pa11y; confirmar navegação por teclado e leitura com screen readers.
3. Zoom/Font-size: testar até 200% e com fontes maiores para garantir legibilidade e evitar overflow.


