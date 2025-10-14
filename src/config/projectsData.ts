// Definição dos tipos para as seções do projeto
export interface ProjectSection {
  type: 'heading' | 'subheading' | 'text' | 'image' | 'before-after' | 'list' | 'quote' | 'metrics';
  content: string | string[] | ImageContent | BeforeAfterContent | MetricContent[];
}

export interface ImageContent {
  src: string;
  alt: string;
}

export interface BeforeAfterContent {
  before: ImageContent;
  after: ImageContent;
}

export interface MetricContent {
  value: string;
  label: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  shortDescription: string;
  sections: ProjectSection[];
}

export const projectsData: ProjectData[] = [
  {
    slug: 'fgvLaw',
    title: 'Direito FGV – Reestruturação de UX',
    shortDescription: 'Reestruturação da área de cursos jurídicos da FGV Direito SP com foco em usabilidade e organização da informação.',
    sections: [
      { type: 'heading', content: 'O Desafio: Arquitetura de Informação Desorganizada' },
      { type: 'text', content: 'A responsável pelo portal da FGV Law entrou em contato relatando queda nas inscrições e alta taxa de desistência no processo de busca por cursos. Os relatórios do Google Analytics mostravam muitos acessos sem conversão, e ficou evidente que a estrutura do site não guiava o usuário de forma clara. Faltava coerência entre as categorias, as informações estavam dispersas e dados essenciais — como valores e pré-requisitos — eram difíceis de localizar.' },
      { type: 'quote', content: `"Os alunos dizem que o site tem tudo, mas ninguém encontra nada." – Responsável pelo portal da FGV Law` },
      { type: 'text', content: 'Esse cenário resultava em confusão, retrabalho e sobrecarga da equipe administrativa, que precisava atender constantemente dúvidas básicas por telefone e e-mail.' },

      { type: 'heading', content: 'Descoberta: Diagnóstico e Análise de Fluxo' },
      { type: 'text', content: 'Meu ponto de partida foi analisar os relatórios de comportamento de navegação e realizar conversas diretas com a responsável e alguns alunos de pós-graduação. O objetivo era compreender onde e por que os usuários se perdiam.' },
      { type: 'text', content: 'A análise revelou gargalos claros:' },
      { type: 'list', content: [
          'Falta de agrupamento temático coerente.',
          'Etapas redundantes no caminho até a inscrição.',
          'Hierarquia de informação confusa, com excesso de cliques.'
      ]},
      { type: 'text', content: 'A partir desse diagnóstico, desenhei o fluxo atual (as-is) e identifiquei os pontos de atrito entre expectativa e realidade do usuário.' },

      { type: 'heading', content: 'Solução: Nova Estrutura e Wireframes Temáticos' },
      { type: 'text', content: 'Com base nas evidências, propus uma reorganização completa da arquitetura de informação, centrada em temas jurídicos em vez de categorias institucionais. Essa mudança simplificou a jornada de quem busca um curso, tornando mais fácil comparar opções e entender o contexto de cada programa.' },
      { type: 'text', content: 'Entre as principais ações:' },
      { type: 'list', content: [
          'Criação de um sistema de abas para organizar as seções de forma progressiva (Apresentação, Estrutura, Processo Seletivo etc.).',
          'Redefinição da hierarquia visual com foco na clareza e escaneabilidade.',
          'Criação de wireframes apresentando a nova lógica de navegação e os fluxos de inscrição.'
      ]},
      { type: 'text', content: 'Essa nova base foi validada com a responsável e ajustada após feedbacks pontuais de alunos, que relataram perceber a navegação mais simples e objetiva.' },

      { type: 'heading', content: 'Iteração e Evolução' },
      { type: 'text', content: 'Após a entrega, a proposta serviu como fundamento para as versões seguintes do portal, que continuaram sendo aprimoradas pela equipe interna da FGV. Muitas das melhorias visuais e estruturais que hoje tornam o site da Direito GV mais alinhado à identidade da FGV nasceram das primeiras sugestões desenvolvidas nesse projeto.' },
      { type: 'text', content: 'Essas iterações consolidaram uma linguagem mais limpa, consistente e coerente com o ecossistema digital da Fundação.' },

      { type: 'heading', content: 'Resultados' },
      { type: 'text', content: 'Embora não tenha sido possível mensurar resultados quantitativos específicos, os retornos internos foram claros:' },
      { type: 'list', content: [
          'Redução perceptível de dúvidas recorrentes e de sobrecarga do suporte.',
          'Melhor compreensão da oferta de cursos e das etapas do processo seletivo.',
          'Navegação mais fluida e intuitiva, com experiência positiva relatada por alunos e pela equipe responsável.'
      ]},

      { type: 'heading', content: 'Insights' },
      { type: 'text', content: 'A clareza da estrutura é o ponto de partida para a confiança do usuário. Uma arquitetura bem pensada não apenas organiza conteúdo — ela guia decisões e traduz a identidade da marca em experiência digital' }
    ]
  },
  {
    slug: 'tvInstitucional',
    title: 'TV Institucional - Service Design',
    shortDescription: 'Implementação de um sistema de comunicação visual para uma instituição de ensino.',
    sections: [
        { type: 'heading', content: 'Visão Geral: A Interface do Ambiente' },
        { type: 'text', content: 'Desenvolvi um sistema de comunicação visual para as TVs no hall da FGV, transformando espaços físicos em interfaces dinâmicas para comunicar eventos e atualizações institucionais de forma atrativa.' },
        { type: 'quote', content: 'Ambientes físicos também são interfaces. Quando bem projetados, informam, engajam e conectam — sem precisar de login.' },
        
        { type: 'heading', content: 'Meu Processo de Service Design' },

        { type: 'subheading', content: '1. Pesquisa Etnográfica e de Campo' },
        { type: 'text', content: 'Passei dias no hall da instituição, observando o fluxo de pessoas e como elas interagiam (ou não) com os meios de comunicação existentes. Com uma prancheta na mão, realizei entrevistas de interceptação (guerrilla interviews) com 25 alunos, perguntando sobre como eles se informavam. O padrão era claro: a comunicação atual era invisível para eles.' },
        { type: 'image', content: { src: 'https://placehold.co/800x400/FFF9C4/F9A825?text=Mapa+de+Calor+do+Fluxo+de+Alunos', alt: 'Mapa de calor mostrando os principais pontos de circulação e parada dos alunos no hall.' } },

        { type: 'subheading', content: '2. Mapeamento da Jornada e Pontos de Contato' },
        { type: 'text', content: 'Mapeei a jornada do aluno dentro do espaço físico, desde a entrada na faculdade até a chegada na sala de aula. Identifiquei os principais pontos de contato visuais e de espera — como a frente dos elevadores e a fila da lanchonete — como locais ideais para a instalação das novas interfaces de comunicação.' },

        { type: 'subheading', content: '3. Prototipagem e Curadoria de Conteúdo' },
        { type: 'text', content: 'Criei um protótipo do sistema usando um simples slideshow em uma TV para testar o impacto inicial. Desenvolvi uma grade de programação visual, definindo que tipo de conteúdo seria exibido em cada horário para maximizar a relevância. Por exemplo, eventos do dia pela manhã, e lembretes da biblioteca à tarde.' },
        { type: 'image', content: { src: 'https://placehold.co/800x500/CFD8DC/37474F?text=Exemplos+de+Templates+de+Conteúdo', alt: 'Mosaico com diferentes templates para eventos, avisos e notícias.' } },

        { type: 'subheading', content: '4. Testes e Iteração' },
        { type: 'text', content: 'Para medir o engajamento, usei uma tática simples: adicionei QR Codes nos anúncios de eventos que levavam para a página de inscrição. Na primeira semana, o número de acessos foi 300% maior do que a média de cliques nos links enviados por e-mail, provando a eficácia do canal. Também testei diferentes tempos de exibição e coletei feedback direto dos alunos para ajustar o ritmo das animações.' },

        { type: 'heading', content: 'Resultados: Da Ignorância ao Engajamento' },
        { type: 'metrics', content: [
            { value: '+300%', label: 'de aumento na visibilidade de eventos (medido por QR Code)' },
            { value: '+40%', label: 'de aumento na participação em eventos do campus' },
            { value: '9/10', label: 'nota de satisfação dos alunos com o novo canal' },
        ]},
    ]
  },
  {
    slug: 'taliparts',
    title: 'TALIPARTS - UX & Business Research',
    shortDescription: 'Pesquisa de validação de produtos para venda em marketplaces.',
    sections: [
        { type: 'heading', content: 'O Desafio: Vender no Digital com Baixo Risco' },
        { type: 'text', content: 'A Taliparts, uma distribuidora de autopeças tradicional, queria entrar no Mercado Livre, mas não sabia quais dos seus 20.000 itens teriam maior potencial de venda e como se destacar da concorrência. O objetivo era criar uma estratégia de entrada com baixo custo e aprendizado rápido.' },
        
        { type: 'heading', content: 'Minha Estratégia de Pesquisa Lean' },

        { type: 'subheading', content: '1. Análise Competitiva e de Mercado' },
        { type: 'text', content: 'Iniciei com uma análise profunda dos 5 maiores vendedores de autopeças no Mercado Livre. Mapeei seus produtos mais vendidos, estratégias de preço, e a reputação. Usei o Google Trends e o planejador de palavras-chave do Google para identificar um nicho de produtos com alta demanda e concorrência moderada: kits de suspensão para carros populares.' },
        { type: 'image', content: { src: 'https://placehold.co/800x400/FFE0B2/E65100?text=Análise+SWOT+da+Concorrência', alt: 'Diagrama de Análise SWOT dos principais concorrentes no Mercado Livre.' } },

        { type: 'subheading', content: '2. Definição de Personas' },
        { type: 'text', content: 'Com base em fóruns de automóveis e na análise de perguntas de anúncios concorrentes, criei duas personas: o "Mecânico Profissional", que busca custo-benefício e agilidade na entrega, e o "Dono de Carro DIY (Faça Você Mesmo)", que busca tutoriais e confiança na marca.' },

        { type: 'subheading', content: '3. Validação com Anúncios Fantasma' },
        { type: 'text', content: 'Para validar a demanda sem comprar estoque, criei 10 anúncios "fantasma" (com prazo de entrega estendido) para os kits de suspensão selecionados. Em uma semana, 3 dos 10 anúncios receberam mais de 50 perguntas e várias tentativas de compra, validando o interesse do mercado nesses produtos específicos.' },

        { type: 'subheading', content: '4. Otimização de SEO para Marketplace' },
        { type: 'text', content: 'Com os produtos validados, foquei em otimizar cada anúncio para máxima performance de SEO dentro do Mercado Livre. Criei títulos seguindo a fórmula [Nome da Peça] + [Marca] + [Modelo do Carro] + [Ano] + [Diferencial], o que aumentou a visibilidade em 150%.' },
        { type: 'before-after', content: {
            before: { src: 'https://placehold.co/600x400/FFCDD2/C62828?text=Título+Não+Otimizado', alt: 'Exemplo de título de anúncio genérico: "Amortecedor de Carro".' }, 
            after: { src: 'https://placehold.co/600x400/C8E6C9/388E3C?text=Título+Otimizado+para+SEO', alt: 'Exemplo de título otimizado: "Amortecedor Dianteiro Original (Par) Gol G5 G6 Voyage 2008-2012".' } 
        }},

        { type: 'heading', content: 'Resultados e Próximos Passos' },
        { type: 'metrics', content: [
            { value: 'Top 10', label: 'em 60% dos anúncios para palavras-chave alvo' },
            { value: '+150%', label: 'de CTR comparado à média da categoria' },
            { value: '80%', label: 'dos produtos validados atingiram o ponto de equilíbrio em 45 dias' },
        ]},
    ]
  },
  {
    slug: 'direitoGV',
    title: 'Direito GV - Pesquisa e Arquitetura',
    shortDescription: 'Análise e melhoria da arquitetura de informação para a área de cursos da Direito GV.',
    sections: [
        { type: 'heading', content: 'Visão Geral do Projeto de Pesquisa' },
        { type: 'text', content: 'Atuei na fase de pesquisa e descoberta que fundamentou o projeto de redesenho do portal (FGV Law). Meu foco foi diagnosticar profundamente os problemas de usabilidade e de arquitetura de informação para fornecer um roadmap claro para a equipe de design e desenvolvimento.' },
        { type: 'image', content: { src: 'https://placehold.co/800x300/D1C4E9/4527A0?text=Duplo+Diamante+(Foco+em+Descoberta)', alt: 'Diagrama do Duplo Diamante destacando a fase de Descoberta e Definição.' } },
        
        { type: 'heading', content: 'Meu Processo de Diagnóstico' },

        { type: 'subheading', content: '1. Análise Heurística' },
        { type: 'text', content: 'Iniciei com uma avaliação heurística completa da interface do portal, usando as 10 Heurísticas de Nielsen como guia. Identifiquei 45 problemas de usabilidade, classificando cada um por severidade. Um problema crítico era a falta de feedback do sistema após o preenchimento de formulários.' },

        { type: 'subheading', content: '2. Entrevistas com Stakeholders' },
        { type: 'text', content: 'Conduzi reuniões com 5 stakeholders chave, incluindo coordenadores de curso e a equipe de marketing. O objetivo era alinhar as expectativas e entender os objetivos de negócio. Descobri que a meta principal era aumentar as inscrições em cursos de curta duração, o que me ajudou a priorizar os problemas de usabilidade que mais impactavam esse fluxo.' },

        { type: 'subheading', content: '3. Mapeamento da Jornada do Usuário As-Is' },
        { type: 'text', content: 'Mapeei a jornada completa de um aluno tentando se inscrever em um curso. O mapa visualizou mais de 20 passos, 8 pontos de frustração e 3 loops de navegação onde o usuário ficava preso. Este artefato foi crucial para mostrar aos stakeholders a gravidade dos problemas.' },
        { type: 'image', content: { src: 'https://placehold.co/800x500/B2EBF2/00838F?text=Mapa+da+Jornada+do+Usuário+(As-Is)', alt: 'Mapa detalhado da jornada do usuário, mostrando pontos de dor e oportunidades.' } },

        { type: 'heading', content: 'Entregáveis e Recomendações' },
        { type: 'text', content: 'O resultado desta fase de pesquisa foi um relatório detalhado de diagnóstico e um conjunto de recomendações estratégicas, que serviram como base para o projeto de redesenho.' },
        { type: 'list', content: [
            'Relatório de Diagnóstico de UX: Documento com todos os problemas de usabilidade encontrados e classificados por severidade.',
            'Recomendação de Arquitetura de Informação: Proposta de uma nova estrutura de categorias e menus.',
            'Roadmap de Implementação: Sugestão de um plano de ação faseado para a equipe de desenvolvimento.'
        ]}
    ]
  }
];