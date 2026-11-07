# Análise do Case FGV Direito SP — Relatório Design Circuit (Audit)

**Status:** Atualizado após Reestruturação Estrutural (Fevereiro 2026)

Este case foi auditado sob a ótica da **Design Circuit**, focando em senioridade, tomada de decisão e impacto de negócio.

---

## 1. Avaliação de Senioridade (Pirâmide de Freytag)

O case agora possui uma estrutura narrativa robusta que demonstra não apenas execução técnica, mas **governança e mediação**.

- **Exposição:** Contexto institucional bem definido. 38 anos de história sintetizados em uma necessidade de escalabilidade.
- **Ação Ascendente:** O discovery não é apenas uma "receita de bolo". A conexão entre Heurísticas -> Matriz CSD -> Card Sorting está fluida.
- **Clímax (Decision Point):** ⭐ **PONTO FORTE.** A restauração dessa seção é o que separa um Pleno de um Sênior. As decisões sobre Drupal e taxonomia mostram entendimento de restrições técnicas e de negócio.
- **Resolução:** Resultados quantitativos e qualitativos conectam adequadamente com os problemas iniciais.

## 2. Pontos de Impacto Implementados

1. **Escaneabilidade (Teste dos 5s):** A conversão de parágrafos em `process-list` e o uso de metadados concisos permitem que um recrutador entenda o valor do projeto em segundos.
2. **Terminologia:** Uso correto de "Arquitetura de Informação" e termos de mercado, eliminando ambiguidades (ex.: remoção do termo IA que causava confusão).
3. **Progressive Disclosure:** Detalhes técnicos densos estão escondidos em acordions, mantendo o case limpo sem perder a profundidade de prova social.

## 3. Checklist de Validação (Status Atual)

- [x] **Clareza de Papel:** Removido o título genérico "Lead", focado em competências reais.
- [x] **Escaneabilidade:** Alta. Uso agressivo de bullets e negrito.
- [x] **Ponto de Clímax:** Bem documentado na seção de Decision Point.
- [x] **Métricas:** Presentes (Findability +30%, Entrada de Estudantes +5%), cruciais para a linguagem executiva.
- [x] **Redundância:** Eliminada no resumo e subtítulo.

## 4. Próximos Passos para o "Top 1%"

Embora o case esteja excelente, para atingir o nível máximo de portfólio de produto:
- **Testemunhos:** Se houver, adicionar um pequeno quote de um stakeholder da FGV validando o impacto da governaça.
- **Links Externos:** Garantir que o link para o portal (se ainda ativo) esteja destacado como prova de deploy.

---
**Score Design Circuit:** 92/100 (Pronto para aplicação em vagas Sênior/Lead).

---

## Future release — Governança e visibilidade do capital acadêmico

Observação rápida: durante o trabalho ficou claro que a "invisibilidade" do capital acadêmico não era apenas um problema de apresentação visual. Em muitos casos os blocos de conteúdo existem, mas estão fragmentados, sem metadados padronizados, sem donos editoriais e sem fluxos de ingestão — ou seja, é um problema de governança, não apenas de layout.

Por que documentar como "future release": esta intervenção exige decisões institucionais (pessoas, políticas, integrações técnicas) e impacta mais do que o front-end; entregue como iniciativa de produto/editorial para a próxima fase.

Principais evidências observadas
- Conteúdo disperso em múltiplos subdomínios/departamentos sem metadados comuns.
- Publicações e resultados em PDFs/imagens, não indexáveis por search.
- Falta de perfis de autor e identificadores unificados (autor → projeto → saída).
- Processos editoriais indefinidos: ninguém com responsabilidade clara para publicar/atualizar.

Checklist recomendada para a release (prioridade):
1. Padronizar modelo de conteúdo (metadados mínimos: autor, afiliação, data, tipo, projeto, DOI/identificador).
2. Criar perfis de autor vinculáveis e mapear afiliacões (permitir landing pages por autor/projeto).
3. Definir dono(s) editorial(is) e um fluxo de submissão/revisão para conteúdos acadêmicos.
4. Implementar ingestão/API para importar resultados de repositórios internos e externos (evitar dependência exclusiva de uploads manuais).
5. Transformar artefatos não estruturados (PDFs) em registros com metadados ou extrair metadados via OCR/ETL quando necessário.
6. Ajustar indexação/search para priorizar perfis e saídas académicas (faceting por projeto/autor/tipo).
7. Depois das etapas anteriores: revisar layout e componentes de exibição (cards, coleções, taxonomias visuais) com base em dados reais de conteúdo.

Papéis sugeridos
- Product Owner (institucional): responsável por aprovar políticas e prioridades.
- Editor/Curador acadêmico: validação de metadados e qualidade editorial.
- Engenheiro de dados/API: implementa ingestão, normalização e indexação.
- Designer de informação: mapeia apresentação e navegação após a normalização dos dados.

Resultados esperados (KPIs)
- Aumento da findability (% de conteúdo com metadados mínimos).
- Crescimento de perfis completos de autores publicados.
- Redução do tempo médio entre produção e publicação.

Comentários finais: esta intervenção entra na categoria "governança de conteúdo" e desbloqueia valor perene — só então o trabalho de IA/UX e layout será plenamente eficaz.
