# Token Mapping

Este arquivo lista os tokens existentes no projeto e serve como referência para evolução do design system.

## Fonte de verdade
- `css/design-tokens.css`

## Tokens existentes

### Cores
- `--color-surface-primary`
- `--color-surface-secondary`
- `--color-surface-tertiary`
- `--color-text-main`
- `--color-text-muted`
- `--color-text-subtle`
- `--color-text-inverse`
- `--color-accent-primary`
- `--color-accent-secondary`

### Espaçamento (semântico)
- `--space-xs`
- `--space-sm`
- `--space-md`
- `--space-lg`
- `--space-xl`
- `--space-2xl`
- `--space-3xl`

### Espaçamento (aliases numéricos)
- `--space-2`
- `--space-3`
- `--space-4`
- `--space-8`
- `--space-12`
- `--space-16`
- `--space-24`

### Tipografia
- `--font-family-sans`
- `--font-family-serif`
- `--font-size-sm`
- `--font-size-base`
- `--font-size-lg`
- `--font-size-xl`
- `--font-size-2xl`
- `--font-size-3xl`
- `--font-size-4xl`
- `--line-height-tight`
- `--line-height-base`
- `--line-height-loose`
- `--font-weight-normal`
- `--font-weight-medium`
- `--font-weight-semibold`
- `--font-weight-bold`

### Raio
- `--radius-sm`
- `--radius-md`
- `--radius-lg`

### Sombras
- `--shadow-sm`
- `--shadow-md`
- `--shadow-lg`

### Transições
- `--transition-fast`
- `--transition-base`
- `--transition-slow`

## Notas de compatibilidade

Alguns arquivos de CSS (especialmente dos case studies) usam `var(--space-16)` e similares. Esses tokens são suportados via aliases numéricos em `design-tokens.css`.
