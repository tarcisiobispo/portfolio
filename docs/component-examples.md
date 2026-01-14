# Componentes — Exemplos de Uso

Exemplos simples para começar a usar os tokens e componentes do design system.

Referência principal: `docs/design-system.md`.

## Botão primário

HTML:
```html
<button class="btn btn--primary">Ver projeto</button>
```

Notas:
- Implementado em `css/design-tokens.css`.
- Tem estado `:hover` e foco por teclado (`:focus-visible`).

## Card

HTML:
```html
<article class="case-card">
  <a href="case-studies/case-study-triunfante.html">
    <img class="case-card__image" src="images/sitemap-gecko-cover.jpg" alt="Capa do projeto" />
  </a>
  <div class="case-card__content">
    <h3 class="case-card__title">Título do case</h3>
    <p class="case-card__description">Breve descrição do projeto e resultados.</p>
    <a class="btn btn--primary" href="case-studies/case-study-triunfante.html">Ver estudo de caso</a>
  </div>
</article>
```

Notas:
- Implementado em `css/design-tokens.css`.
- Use `alt` descritivo na imagem.

## Input

Atualmente não existe um componente `.input` implementado no CSS do projeto.
Se você quiser, eu posso padronizar um input seguindo o mesmo design system.

---

### Cards (index)
- Se você quiser truncagem a 2 linhas, isso pode ser adicionado em `.case-card__description`.
- Não esconda conteúdo crítico: certifique-se de que o link do card leva à página completa do case study para leitura total.

### Imagens e acessibilidade
- Sempre adicione `alt` descritivos nas imagens (`<img alt="...">`). As imagens de capa dos cards devem indicar o nome do projeto.

Para adicionar novos componentes, siga os tokens semânticos e documente quaisquer tokens novos (ex.: `--accent-*-subtle`) no `docs/token-mapping.md`.
