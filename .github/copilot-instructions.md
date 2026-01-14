# Instruções rápidas para agentes AI — Portfólio estático

Este repositório é um site estático (HTML/CSS) com estudos de caso. As instruções abaixo ajudam agentes a serem produtivos rapidamente neste projeto.

1) Visão geral do projeto
- Estrutura principal: `index.html`, `case-studies/`, `css/`, `images/`, `sitemap.xml`, `robots.txt`.
- Site sem build system: não há Node, bundlers ou testes automatizados — o fluxo é editar HTML/CSS e servir estaticamente.

2) Fluxos e tarefas comuns
- Preview local: sirva o diretório raiz com um servidor estático. Exemplo (Python):

```bash
python -m http.server 8000
```

- Atualizar SEO / domínio: substituir `https://seudominio.com/` conforme descrito em `SEO_SETUP.md` e atualizar `sitemap.xml` e `robots.txt` ([SEO_SETUP.md](SEO_SETUP.md)).

- Adicionar novo estudo de caso: copie um template de `case-studies/case-study-triunfante.html`, atualize `og:url`, `canonical` e `url` no JSON-LD, coloque imagens em `images/<projeto>/`, e adicione a nova URL em `sitemap.xml`.

3) Convenções específicas do projeto
- Design tokens: cores, espaçamentos e tipografia centralizados em [css/design-tokens.css](css/design-tokens.css). Importar sempre via `@import` ou `<link>`.
- Estilos base: [css/base-style.css](css/base-style.css) aplica a tipografia e regras globais; [css/case-study-style.css](css/case-study-style.css) contém variações para estudos de caso.
- Acessibilidade: presença de `skip-link`, `aria-label` e `aria-controls` em componentes. Preserve atributos `data-tooltip` e `aria-*` quando modificar componentes interativos.
- Arquivos de imagem: organização por pasta em `images/<nome-do-projeto>/` (ex.: `images/triunfante/`). Use atributos `loading="lazy"` e dimensões (`width`/`height`) quando possível.

4) Padrões de conteúdo e SEO (exemplos concretos)
- Todas as páginas usam Open Graph, Twitter Cards e JSON-LD. Exemplos em [index.html](index.html) e `case-studies/*.html`.
- Sempre atualize estas três áreas ao criar/duplicar páginas:
  - `og:url` e `canonical` (meta/link)
  - `url` dentro do `application/ld+json`
  - entrada correspondente em `sitemap.xml`

5) Restrições técnicas e boas práticas detectadas
- Não adicionar dependências JS/Node desnecessárias — este repo foi pensado para hospedagem estática.
- Evite alterar classes CSS sem checar `design-tokens.css` para manter consistência visual.
- Scripts inline mínimos são usados para comportamento pequeno (ex.: fechar `details` no case study). Prefira alterações conservadoras.

6) Integrações externas e deploy
- Não há integrações visíveis (analytics, CMS) nos arquivos fonte. O deploy esperado é em host estático (Netlify, Vercel, GitHub Pages). Antes do deploy, atualizar domínio real e `sitemap.xml`.

7) Onde procurar exemplos no repositório
- Homepage: [index.html](index.html) — hero, cards e links para estudos de caso.
- Estudos de caso: [case-studies/case-study-triunfante.html](case-studies/case-study-triunfante.html) e [case-studies/case-study-fgv.html](case-studies/case-study-fgv.html).
- Tokens e base CSS: [css/design-tokens.css](css/design-tokens.css), [css/base-style.css](css/base-style.css).
- SEO/Guia: [SEO_SETUP.md](SEO_SETUP.md), [sitemap.xml](sitemap.xml), [robots.txt](robots.txt).

8) Exemplos de prompts úteis para edições
 - "Adicionar novo estudo de caso: copiar `case-studies/case-study-triunfante.html`, atualizar meta tags (og/url, canonical), JSON-LD url e inserir entrada em `sitemap.xml`." 
- "Converter uma cor do design token: substituir `--color-accent-primary` em `css/design-tokens.css` e ajustar contrastes em `css/base-style.css`."

9) Ao terminar: pedir revisão humana
- Depois de mudanças em SEO, sitemap ou grandes ajustes visuais, solicite revisão manual e verificação no browser e nas ferramentas (Google Rich Results, Facebook Debugger).

---
Se quiser, eu posso gerar um checklist automatizado para novos estudos de caso ou abrir um PR com a primeira alteração (ex.: atualizar `sitemap.xml`). Quer que eu proceda com isso agora?
