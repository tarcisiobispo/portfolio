# Configuração de SEO

## ⚠️ IMPORTANTE: Atualizar URLs

Todos os arquivos contêm URLs placeholder `https://seudominio.com/` que precisam ser substituídas pelo domínio real do site.

### Arquivos que precisam ser atualizados:

1. **index.html**
   - Linha ~11: `og:url`
   - Linha ~18: `canonical`
   - Linha ~30: Schema.org `url`

2. **case-studies/case-study-triunfante.html**
   - Linha ~15: `og:url`
   - Linha ~26: `canonical`
   - Linha ~38: Schema.org `url`

3. **case-studies/case-study-fgv.html**
   - Linha ~15: `og:url`
   - Linha ~26: `canonical`
   - Linha ~38: Schema.org `url`

4. **sitemap.xml**
   - Todas as URLs `<loc>` precisam ser atualizadas

5. **robots.txt**
   - Linha 3: URL do sitemap

### Como atualizar:

1. Substitua `https://seudominio.com/` pelo seu domínio real em todos os arquivos acima
2. Atualize as datas `<lastmod>` no sitemap.xml quando fizer alterações significativas
3. Submeta o sitemap.xml no Google Search Console

## Meta Tags Implementadas

### Open Graph (Facebook/LinkedIn)
- ✅ `og:type`
- ✅ `og:title`
- ✅ `og:description`
- ✅ `og:image`
- ✅ `og:url`
- ✅ `og:site_name`
- ✅ `og:locale`

### Twitter Cards
- ✅ `twitter:card` (summary_large_image)
- ✅ `twitter:title`
- ✅ `twitter:description`
- ✅ `twitter:image`

### SEO Básico
- ✅ `canonical` URLs
- ✅ Meta descriptions otimizadas
- ✅ Títulos descritivos

## Schema.org Structured Data

### Homepage (index.html)
- ✅ Tipo: `Person`
- ✅ Inclui: nome, cargo, descrição, redes sociais, habilidades

### Case Studies
- ✅ Tipo: `CreativeWork`
- ✅ Inclui: título, descrição, autor, data, imagem, URL

## Arquivos Criados

1. **sitemap.xml** - Mapa do site para indexação
2. **robots.txt** - Instruções para crawlers
3. **SEO_SETUP.md** - Este arquivo de documentação

## Próximos Passos

1. ✅ Atualizar todas as URLs com o domínio real
2. ✅ Submeter sitemap.xml no Google Search Console
3. ✅ Verificar rich snippets no Google Rich Results Test
4. ✅ Testar compartilhamento social (Facebook Debugger, Twitter Card Validator)
5. ✅ Monitorar indexação no Google Search Console

## Ferramentas de Validação

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Google Search Console**: https://search.google.com/search-console
