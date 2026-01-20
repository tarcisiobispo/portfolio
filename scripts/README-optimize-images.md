# Otimizar imagens (JPG/PNG -> WebP)

Este script converte recursivamente imagens `.jpg`, `.jpeg` e `.png` para `.webp` usando a biblioteca `sharp`.

Instalação e uso:

```bash
cd c:/projetos/portfolio
npm install
npm run optimize-images -- ./images 80
```

- O primeiro argumento é o diretório fonte (padrão `./images`).
- O segundo argumento é a qualidade WebP (padrão `80`).

Observações:
- O script pula arquivos `.webp` que já existem e estão atualizados.
- `sharp` precisa compilar binários nativos; em Windows pode exigir ferramentas adicionais (veja documentação do `sharp`).
