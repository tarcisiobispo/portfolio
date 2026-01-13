# Componentes — Exemplos de Uso

Exemplos simples para começar a usar os tokens e componentes do design system.

## Botão primário

HTML:
```html
<button class="btn btn--primary">Ver projeto</button>
```

Notas:
- Usa `--sys-primary` e `--sys-primary-container` para gradiente e `--elevation-*` para sombra.
- Tem estados hover/active/disabled embutidos.

## Card

HTML:
```html
<article class="card">
  <h3>Case study</h3>
  <p class="u-mb-4">Breve descrição do projeto e resultados.</p>
  <button class="btn btn--ghost">Ler mais</button>
</article>
```

Notas:
- Padding, radius e elevação são controlados via tokens (`--card-padding`, `--card-radius`, `--elevation-*`).

## Input

HTML:
```html
<input class="input" placeholder="Pesquisar casos" />
```

Notas:
- `:focus` aplica `--focus-ring` e placeholder usa `--sys-on-surface-variant`.
- `prefers-reduced-motion` reduz transições quando ativo.

---

### Cards (index)
- As descrições dos cards usam truncagem visual a 2 linhas no index para manter layout limpo. Use `case-study-card .case-study-description` e `-webkit-line-clamp: 2`.
- Não esconda conteúdo crítico: certifique-se de que o link do card leva à página completa do case study para leitura total.

### Imagens e acessibilidade
- Sempre adicione `alt` descritivos nas imagens (`<img alt="...">`). As imagens de capa dos cards devem indicar o nome do projeto.

Para adicionar novos componentes, siga os tokens semânticos e documente quaisquer tokens novos (ex.: `--accent-*-subtle`) no `docs/token-mapping.md`.
