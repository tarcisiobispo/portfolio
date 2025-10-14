import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Quote, Headset, Timer, TrendingDown, TrendingUp, Star, Medal, QrCode, BarChart3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Definição dos tipos para as seções do projeto
interface ProjectSection {
  type: 'heading' | 'subheading' | 'text' | 'list' | 'image' | 'before-after' | 'quote' | 'metrics';
  content: string | string[] | ImageContent | BeforeAfterContent | MetricContent[];
}

interface ImageContent {
  src: string;
  alt: string;
}

interface BeforeAfterContent {
  before: ImageContent;
  after: ImageContent;
}

interface MetricContent {
  value: string;
  label: string;
}

// Type guards para ajudar o TypeScript
const isStringContent = (content: ProjectSection['content']): content is string => {
  return typeof content === 'string';
};

const isStringArrayContent = (content: ProjectSection['content']): content is string[] => {
  return Array.isArray(content) && content.every(item => typeof item === 'string');
};

const isImageContent = (content: ProjectSection['content']): content is ImageContent => {
  return typeof content === 'object' && content !== null && 'src' in content && 'alt' in content;
};

const isBeforeAfterContent = (content: ProjectSection['content']): content is BeforeAfterContent => {
  return typeof content === 'object' && content !== null && 'before' in content && 'after' in content;
};

const isMetricsContent = (content: ProjectSection['content']): content is MetricContent[] => {
  return Array.isArray(content) && content.every(item =>
    typeof item === 'object' && item !== null && 'value' in item && 'label' in item
  );
};

const Section: React.FC<{ section: ProjectSection }> = ({ section }) => {
  const { t } = useTranslation();

  switch (section.type) {
    case 'heading':
      return <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-8 first:mt-0 text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] pb-3">{section.content as string}</h2>;
    case 'subheading':
      return <h3 className="text-xl sm:text-2xl font-semibold mb-3 mt-6 text-[var(--color-text)]">{section.content as string}</h3>;
    case 'text':
      return <p className="text-lg leading-relaxed mb-4 text-[var(--color-text-secondary)] max-w-none">{section.content as string}</p>;
    case 'list':
      if (isStringArrayContent(section.content)) {
        return (
          <ul className="list-disc list-inside space-y-2 mb-4 text-lg text-[var(--color-text-secondary)]">
            {section.content.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      }
      return null;
    case 'image':
      if (isImageContent(section.content)) {
        return (
          <figure className="mb-8">
            <img src={section.content.src} alt={section.content.alt} className="max-w-full h-auto rounded-lg shadow-lg bg-gray-200" />
            <figcaption className="text-left text-sm text-gray-500 mt-3">{section.content.alt}</figcaption>
          </figure>
        );
      }
      return null;
    case 'before-after':
      if (isBeforeAfterContent(section.content)) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <h4 className="text-xl font-semibold text-center mb-3">{t('common.before')}</h4>
              <img src={section.content.before.src} alt={section.content.before.alt} className="max-w-full h-auto rounded-lg shadow-lg bg-gray-200 border-2 border-red-200" />
              <p className="text-center text-sm text-gray-500 mt-3">{section.content.before.alt}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-center mb-3">{t('common.after')}</h4>
              <img src={section.content.after.src} alt={section.content.after.alt} className="max-w-full h-auto rounded-lg shadow-lg bg-gray-200 border-2 border-green-200" />
              <p className="text-center text-sm text-gray-500 mt-3">{section.content.after.alt}</p>
            </div>
          </div>
        );
      }
      return null;
    case 'quote':
      return (
        <blockquote className="px-6 py-5 bg-[var(--color-surface)] rounded-lg shadow-inner mb-8 my-8 border-l-4 border-[var(--color-primary)]">
          <div className="flex items-start gap-4">
            <Quote className="w-8 h-8 text-[var(--color-primary)] mt-1 opacity-70 shrink-0" />
            <p className="text-lg sm:text-xl italic text-[var(--color-text-secondary)] leading-relaxed">{section.content as string}</p>
          </div>
        </blockquote>
      );
    case 'metrics':
      if (isMetricsContent(section.content)) {
        const metricsIconMap: Record<string, LucideIcon> = {
          suporte: Headset,
          chamados: Headset,
          tempo: Timer,
          minutos: Timer,
          abandono: TrendingDown,
          inscriç: TrendingUp,
          participação: TrendingUp,
          visibilidade: BarChart3,
          satisfação: Star,
          top: Medal,
          ctr: BarChart3,
          qr: QrCode,
        };

        const chooseIcon = (label: string): LucideIcon => {
          const lowerLabel = label.toLowerCase();
          for (const keyword in metricsIconMap) {
            if (lowerLabel.includes(keyword)) {
              return metricsIconMap[keyword];
            }
          }
          return BarChart3;
        };

        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-3 sm:gap-4 mb-8">
            {section.content.map((metric, index: number) => {
              const IconComponent = chooseIcon(metric.label);
              return (
                <div
                  key={index}
                  className="px-4 sm:px-5 py-4 sm:py-5 bg-[var(--color-surface)] rounded-2xl shadow-lg border border-gray-100/40 dark:border-gray-700/40 h-full min-h-[180px] sm:min-h-[200px] flex flex-col items-center justify-center text-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
                >
                  <span className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-green-500">{metric.value}</p>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-snug max-w-[14rem]">
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>
        );
      }
      return null;
    default:
      return null;
  }
};

const ProjectShowcase = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  // Função para obter dados traduzidos do projeto
  const getTranslatedProject = (projectSlug: string) => {
    const currentLang = i18n.language;
    const projectDetails = t('projectDetails', { returnObjects: true }) as any;

    switch (projectSlug) {
      case 'fgvLaw':
        return {
          slug: 'fgvLaw',
          title: projectDetails.fgvLaw?.title || 'Direito FGV – Reestruturação de UX',
          shortDescription: projectDetails.fgvLaw?.shortDescription || 'Reestruturação da área de cursos jurídicos da FGV Direito SP com foco em usabilidade e organização da informação.',
          sections: [
            { type: 'heading' as const, content: projectDetails.fgvLaw?.sections?.challenge?.title || t('projectExplain.challenge', 'O Desafio: Arquitetura de Informação Desorganizada') },
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.challenge?.content || 'A responsável pelo portal da FGV Law entrou em contato relatando queda nas inscrições e alta taxa de desistência no processo de busca por cursos.' },
            { type: 'quote' as const, content: projectDetails.fgvLaw?.sections?.challenge?.quote || '"Os alunos dizem que o site tem tudo, mas ninguém encontra nada." – Responsável pelo portal da FGV Law' },
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.challenge?.result || 'Esse cenário resultava em confusão, retrabalho e sobrecarga da equipe administrativa.' },
            { type: 'heading' as const, content: projectDetails.fgvLaw?.sections?.discovery?.title || t('projectExplain.discovery', 'Descoberta: Diagnóstico e Análise de Fluxo') },
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.discovery?.content || 'Meu ponto de partida foi analisar os relatórios de comportamento de navegação e realizar conversas diretas com a responsável e alguns alunos de pós-graduação.' },
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.discovery?.analysis || 'A análise revelou gargalos claros:' },
            { type: 'list' as const, content: projectDetails.fgvLaw?.sections?.discovery?.bottlenecks || [
              'Falta de agrupamento temático coerente.',
              'Etapas redundantes no caminho até a inscrição.',
              'Hierarquia de informação confusa, com excesso de cliques.'
            ]},
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.discovery?.conclusion || 'A partir desse diagnóstico, desenhei o fluxo atual (as-is) e identifiquei os pontos de atrito entre expectativa e realidade do usuário.' },
            { type: 'heading' as const, content: projectDetails.fgvLaw?.sections?.solution?.title || t('projectExplain.solution', 'Solução: Nova Estrutura e Wireframes Temáticos') },
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.solution?.content || 'Com base nas evidências, propus uma reorganização completa da arquitetura de informação.' },
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.solution?.actions || 'Entre as principais ações:' },
            { type: 'list' as const, content: projectDetails.fgvLaw?.sections?.solution?.actionList || [
              'Criação de um sistema de abas para organizar as seções de forma progressiva.',
              'Redefinição da hierarquia visual com foco na clareza e escaneabilidade.',
              'Criação de wireframes apresentando a nova lógica de navegação e os fluxos de inscrição.'
            ]},
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.solution?.validation || 'Essa nova base foi validada com a responsável e ajustada após feedbacks pontuais de alunos.' },
            { type: 'heading' as const, content: projectDetails.fgvLaw?.sections?.iteration?.title || t('projectExplain.iteration', 'Iteração e Evolução') },
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.iteration?.content || 'Após a entrega, a proposta serviu como fundamento para as versões seguintes do portal.' },
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.iteration?.consolidation || 'Essas iterações consolidaram uma linguagem mais limpa, consistente e coerente.' },
            { type: 'heading' as const, content: projectDetails.fgvLaw?.sections?.results?.title || t('projectExplain.results', 'Resultados') },
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.results?.content || 'Embora não tenha sido possível mensurar resultados quantitativos específicos, os retornos internos foram claros:' },
            { type: 'list' as const, content: projectDetails.fgvLaw?.sections?.results?.resultList || [
              'Redução perceptível de dúvidas recorrentes e de sobrecarga do suporte.',
              'Melhor compreensão da oferta de cursos e das etapas do processo seletivo.',
              'Navegação mais fluida e intuitiva, com experiência positiva relatada por alunos e pela equipe responsável.'
            ]},
            { type: 'heading' as const, content: projectDetails.fgvLaw?.sections?.insights?.title || t('projectExplain.insights', 'Insights') },
            { type: 'text' as const, content: projectDetails.fgvLaw?.sections?.insights?.content || 'A clareza da estrutura é o ponto de partida para a confiança do usuário.' }
          ]
        };
      case 'tvInstitucional':
        return {
          slug: 'tvInstitucional',
          title: projectDetails.tvInstitucional?.title || 'TV Institucional - Service Design',
          shortDescription: projectDetails.tvInstitucional?.shortDescription || 'Implementação de um sistema de comunicação visual para uma instituição de ensino.',
          sections: [
            { type: 'heading' as const, content: projectDetails.tvInstitucional?.sections?.overview?.title || t('projectExplain.challenge', 'Visão Geral: A Interface do Ambiente') },
            { type: 'text' as const, content: projectDetails.tvInstitucional?.sections?.overview?.content || 'Desenvolvi um sistema de comunicação visual para as TVs no hall da FGV.' },
            { type: 'quote' as const, content: projectDetails.tvInstitucional?.sections?.overview?.quote || 'Ambientes físicos também são interfaces. Quando bem projetados, informam, engajam e conectam — sem precisar de login.' },
            { type: 'heading' as const, content: projectDetails.tvInstitucional?.sections?.process?.title || t('projectExplain.solution', 'Meu Processo de Service Design') },
            { type: 'subheading' as const, content: projectDetails.tvInstitucional?.sections?.process?.ethnographic?.title || '1. Pesquisa Etnográfica e de Campo' },
            { type: 'text' as const, content: projectDetails.tvInstitucional?.sections?.process?.ethnographic?.content || 'Passei dias no hall da instituição, observando o fluxo de pessoas.' },
            { type: 'image' as const, content: { src: 'https://placehold.co/800x400/FFF9C4/F9A825?text=Mapa+de+Calor+do+Fluxo+de+Alunos', alt: projectDetails.tvInstitucional?.sections?.process?.ethnographic?.imageAlt || 'Mapa de calor mostrando os principais pontos de circulação e parada dos alunos no hall.' } },
            { type: 'subheading' as const, content: projectDetails.tvInstitucional?.sections?.process?.journey?.title || '2. Mapeamento da Jornada e Pontos de Contato' },
            { type: 'text' as const, content: projectDetails.tvInstitucional?.sections?.process?.journey?.content || 'Mapeei a jornada do aluno dentro do espaço físico.' },
            { type: 'subheading' as const, content: projectDetails.tvInstitucional?.sections?.process?.prototyping?.title || '3. Prototipagem e Curadoria de Conteúdo' },
            { type: 'text' as const, content: projectDetails.tvInstitucional?.sections?.process?.prototyping?.content || 'Criei um protótipo do sistema usando um simples slideshow em uma TV.' },
            { type: 'image' as const, content: { src: 'https://placehold.co/800x500/CFD8DC/37474F?text=Exemplos+de+Templates+de+Conteúdo', alt: projectDetails.tvInstitucional?.sections?.process?.prototyping?.imageAlt || 'Mosaico com diferentes templates para eventos, avisos e notícias.' } },
            { type: 'subheading' as const, content: projectDetails.tvInstitucional?.sections?.process?.testing?.title || '4. Testes e Iteração' },
            { type: 'text' as const, content: projectDetails.tvInstitucional?.sections?.process?.testing?.content || 'Para medir o engajamento, usei uma tática simples: adicionei QR Codes nos anúncios de eventos.' },
            { type: 'heading' as const, content: projectDetails.tvInstitucional?.sections?.results?.title || t('projectExplain.results', 'Resultados: Da Ignorância ao Engajamento') },
            { type: 'metrics' as const, content: projectDetails.tvInstitucional?.sections?.results?.metrics || [
              { value: '+300%', label: 'de aumento na visibilidade de eventos (medido por QR Code)' },
              { value: '+40%', label: 'de aumento na participação em eventos do campus' },
              { value: '9/10', label: 'nota de satisfação dos alunos com o novo canal' }
            ]}
          ]
        };
      case 'taliparts':
        return {
          slug: 'taliparts',
          title: projectDetails.taliparts?.title || 'TALIPARTS - UX & Business Research',
          shortDescription: projectDetails.taliparts?.shortDescription || 'Pesquisa de validação de produtos para venda em marketplaces.',
          sections: [
            { type: 'heading' as const, content: projectDetails.taliparts?.sections?.challenge?.title || t('projectExplain.challenge', 'O Desafio: Vender no Digital com Baixo Risco') },
            { type: 'text' as const, content: projectDetails.taliparts?.sections?.challenge?.content || 'A Taliparts, uma distribuidora de autopeças tradicional, queria entrar no Mercado Livre.' },
            { type: 'heading' as const, content: projectDetails.taliparts?.sections?.strategy?.title || t('projectExplain.solution', 'Minha Estratégia de Pesquisa Lean') },
            { type: 'subheading' as const, content: projectDetails.taliparts?.sections?.strategy?.competitive?.title || '1. Análise Competitiva e de Mercado' },
            { type: 'text' as const, content: projectDetails.taliparts?.sections?.strategy?.competitive?.content || 'Iniciei com uma análise profunda dos 5 maiores vendedores de autopeças no Mercado Livre.' },
            { type: 'image' as const, content: { src: 'https://placehold.co/800x400/FFE0B2/E65100?text=Análise+SWOT+da+Concorrência', alt: projectDetails.taliparts?.sections?.strategy?.competitive?.imageAlt || 'Diagrama de Análise SWOT dos principais concorrentes no Mercado Livre.' } },
            { type: 'subheading' as const, content: projectDetails.taliparts?.sections?.strategy?.personas?.title || '2. Definição de Personas' },
            { type: 'text' as const, content: projectDetails.taliparts?.sections?.strategy?.personas?.content || 'Com base em fóruns de automóveis e na análise de perguntas de anúncios concorrentes.' },
            { type: 'subheading' as const, content: projectDetails.taliparts?.sections?.strategy?.validation?.title || '3. Validação com Anúncios Fantasma' },
            { type: 'text' as const, content: projectDetails.taliparts?.sections?.strategy?.validation?.content || 'Para validar a demanda sem comprar estoque, criei 10 anúncios "fantasma".' },
            { type: 'subheading' as const, content: projectDetails.taliparts?.sections?.strategy?.seo?.title || '4. Otimização de SEO para Marketplace' },
            { type: 'text' as const, content: projectDetails.taliparts?.sections?.strategy?.seo?.content || 'Com os produtos validados, foquei em otimizar cada anúncio para máxima performance de SEO.' },
            { type: 'before-after' as const, content: {
              before: { src: 'https://placehold.co/600x400/FFCDD2/C62828?text=Título+Não+Otimizado', alt: projectDetails.taliparts?.sections?.strategy?.seo?.beforeAlt || 'Exemplo de título de anúncio genérico.' },
              after: { src: 'https://placehold.co/600x400/C8E6C9/388E3C?text=Título+Otimizado+para+SEO', alt: projectDetails.taliparts?.sections?.strategy?.seo?.afterAlt || 'Exemplo de título otimizado.' }
            }},
            { type: 'heading' as const, content: projectDetails.taliparts?.sections?.results?.title || t('projectExplain.results', 'Resultados e Próximos Passos') },
            { type: 'metrics' as const, content: projectDetails.taliparts?.sections?.results?.metrics || [
              { value: 'Top 10', label: 'em 60% dos anúncios para palavras-chave alvo' },
              { value: '+150%', label: 'de CTR comparado à média da categoria' },
              { value: '80%', label: 'dos produtos validados atingiram o ponto de equilíbrio em 45 dias' }
            ]}
          ]
        };
      case 'direitoGV':
        return {
          slug: 'direitoGV',
          title: projectDetails.direitoGV?.title || 'Direito GV - Pesquisa e Arquitetura',
          shortDescription: projectDetails.direitoGV?.shortDescription || 'Análise e melhoria da arquitetura de informação para a área de cursos da Direito GV.',
          sections: [
            { type: 'heading' as const, content: projectDetails.direitoGV?.sections?.overview?.title || t('projectExplain.challenge', 'Visão Geral do Projeto de Pesquisa') },
            { type: 'text' as const, content: projectDetails.direitoGV?.sections?.overview?.content || 'Atuei na fase de pesquisa e descoberta que fundamentou o projeto de redesenho do portal.' },
            { type: 'image' as const, content: { src: 'https://placehold.co/800x300/D1C4E9/4527A0?text=Duplo+Diamante+(Foco+em+Descoberta)', alt: projectDetails.direitoGV?.sections?.overview?.imageAlt || 'Diagrama do Duplo Diamante destacando a fase de Descoberta e Definição.' } },
            { type: 'heading' as const, content: projectDetails.direitoGV?.sections?.process?.title || t('projectExplain.solution', 'Meu Processo de Diagnóstico') },
            { type: 'subheading' as const, content: projectDetails.direitoGV?.sections?.process?.heuristic?.title || '1. Análise Heurística' },
            { type: 'text' as const, content: projectDetails.direitoGV?.sections?.process?.heuristic?.content || 'Iniciei com uma avaliação heurística completa da interface do portal.' },
            { type: 'subheading' as const, content: projectDetails.direitoGV?.sections?.process?.stakeholders?.title || '2. Entrevistas com Stakeholders' },
            { type: 'text' as const, content: projectDetails.direitoGV?.sections?.process?.stakeholders?.content || 'Conduzi reuniões com 5 stakeholders chave.' },
            { type: 'subheading' as const, content: projectDetails.direitoGV?.sections?.process?.journey?.title || '3. Mapeamento da Jornada do Usuário As-Is' },
            { type: 'text' as const, content: projectDetails.direitoGV?.sections?.process?.journey?.content || 'Mapeei a jornada completa de um aluno tentando se inscrever em um curso.' },
            { type: 'image' as const, content: { src: 'https://placehold.co/800x500/B2EBF2/00838F?text=Mapa+da+Jornada+do+Usuário+(As-Is)', alt: projectDetails.direitoGV?.sections?.process?.journey?.imageAlt || 'Mapa detalhado da jornada do usuário.' } },
            { type: 'heading' as const, content: projectDetails.direitoGV?.sections?.deliverables?.title || t('projectExplain.results', 'Entregáveis e Recomendações') },
            { type: 'text' as const, content: projectDetails.direitoGV?.sections?.deliverables?.content || 'O resultado desta fase de pesquisa foi um relatório detalhado de diagnóstico.' },
            { type: 'list' as const, content: projectDetails.direitoGV?.sections?.deliverables?.deliverablesList || [
              'Relatório de Diagnóstico de UX: Documento com todos os problemas de usabilidade encontrados.',
              'Recomendação de Arquitetura de Informação: Proposta de uma nova estrutura de categorias.',
              'Roadmap de Implementação: Sugestão de um plano de ação faseado.'
            ]}
          ]
        };
      default:
        return null;
    }
  };

  const project = getTranslatedProject(slug || '');

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{t('projectExplain.projectNotFound', 'Projeto não encontrado')}</h1>
        <Link to="/" className="text-blue-500 hover:underline">{t('projectExplain.backToProjects', 'Voltar para projetos')}</Link>
      </div>
    );
  }

  return (
    <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 md:pt-16 pb-[clamp(3rem,6vw,6rem)]">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/#projetos"
          className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline mb-6"
        >
          <ArrowLeft size={20} />
          {t('navigation.projects')}
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-[var(--color-text)]">{project.title}</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-none">{project.shortDescription}</p>

        <article className="prose prose-lg max-w-none">
          {project.sections.map((section, index) => (
            <Section key={index} section={section} />
          ))}
        </article>
      </div>
    </main>
  );
};

export default ProjectShowcase;