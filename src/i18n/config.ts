import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Recursos inline para máxima compatibilidade
const resources = {
  'pt-BR': {
    translation: {
      navigation: {
        profile: "Perfil",
        projects: "Projetos",
        backlog: "Backlog",
        contact: "Contato",
        home: "Início",
        goToProfile: "Ir para sessão Perfil",
        goToProjetos: "Ir para sessão Projetos",
        goToBacklog: "Ir para sessão Backlog",
        goToContato: "Ir para sessão Contato"
      },
      profile: {
        title: "UX/Product Designer com foco em estratégia, impacto e experiência",
        bio: "Sou UX/Product Designer com forte atuação no design de produtos digitais focados em experiência do usuário, conversão e impacto de negócio. Com background em Marketing Digital, SEO e IA, integro estratégia, design e usabilidade em processos contínuos de melhoria e inovação.",
        exploreProjects: "Explore projetos",
        letsChat: "Vamos Conversar",
        downloadCV: "Download CV",
        linkedin: "LinkedIn"
      },
      projects: {
        title: "Projetos",
        overview: "Visão Geral",
        discovery: "Descoberta",
        solution: "Solução",
        iteration: "Iteração",
        outcomes: "Resultados",
        insights: "Insights",
        seeMore: "Ver detalhes",
        seeLess: "Ocultar detalhes",
        projectImage: "Imagem do projeto",
        fgvLaw: {
          title: "FGV LAW",
          category: "Navegação e Usabilidade",
          overview: "Reestruturação da área de cursos jurídicos da FGV LAW com foco em usabilidade e organização da informação.",
          discovery: "Identifiquei que os usuários enfrentavam dificuldade para localizar e comparar cursos.",
          solution: "Projetei um novo painel com sistema de abas e filtros temáticos.",
          iteration: "Após testes com usuários, simplificamos a terminologia dos filtros.",
          outcomes: [
            "Aumento significativo na visibilidade e interação com os cursos",
            "Melhora na taxa de conversão de acessos em inscrições ou leads",
            "Redução do tempo de navegação até a escolha do curso desejado"
          ],
          insights: "A estrutura de navegação precisa guiar, não apenas mostrar. Clareza e agrupamento relevante influenciam diretamente a percepção de valor de um curso."
        },
        direitoGV: {
          title: "Direito GV",
          category: "Mapas, Fluxos e Pesquisa",
          overview: "Reorganização da área de pesquisa da Direito GV para melhorar a visibilidade dos projetos acadêmicos e facilitar o acesso a informações sobre pesquisadores e suas linhas de trabalho.",
          discovery: "A área de pesquisa estava fragmentada e pouco acessível. Pesquisadores tinham dificuldade para divulgar seus trabalhos e usuários externos não conseguiam encontrar informações relevantes sobre projetos em andamento.",
          solution: "Desenvolvi uma nova arquitetura de informação com categorização por áreas temáticas, perfis de pesquisadores e linha do tempo de projetos. Criei também um sistema de busca avançada.",
          iteration: "Realizamos testes com alunos, professores e pesquisadores. A navegação foi ajustada com base em feedback sobre nomenclatura e ordem de prioridades. Validei cada alteração com os stakeholders envolvidos.",
          outcomes: [
            "Redução no tempo de navegação para encontrar projetos ou temas específicos",
            "Aumento no número de visitas às páginas de pesquisadores",
            "Valorização institucional da produção acadêmica"
          ],
          insights: "Áreas institucionais ganham relevância quando são navegáveis, atualizadas e refletidas de forma estratégica na arquitetura da informação."
        },
        taliparts: {
          title: "Taliparts",
          category: "UX Estratégico + B2B",
          overview: "Projeto de estruturação e validação digital da Taliparts, focado na publicação de peças automotivas no Mercado Livre, com integração às operações físicas. O objetivo era aprender rápido, com baixo custo, sobre demanda real, comportamento do comprador e diferencial competitivo.",
          discovery: "Conduzi benchmark detalhado com concorrentes do setor automotivo. Entrevistei mecânicos e lojistas, modelei personas e apliquei a Matriz CSD para identificar certezas, suposições e dúvidas no catálogo físico.",
          solution: "Criei uma estratégia de validação com SEO para Mercado Livre, padronização visual de anúncios, categorização centrada no vocabulário do comprador e histórico de buscas. Também organizei KPIs e defini plano de priorização de produtos.",
          iteration: "Testei produtos por blocos temáticos, monitorando cliques, perguntas e taxa de conversão. Refinei descrições, títulos e até a seleção de itens com base em performance real.",
          outcomes: [
            "Crescimento de vendas com os produtos priorizados estrategicamente",
            "Redução de dúvidas dos compradores por melhorias nas descrições",
            "Criação de processo replicável de publicação + análise + reposicionamento"
          ],
          insights: "Validar digitalmente com baixo custo é possível — e necessário. A lógica de produto precisa considerar contexto físico, vocabulário técnico e diferenciais percebidos pelo cliente."
        },
        tvInstitucional: {
          title: "FGV TV Institucional",
          category: "Engajamento e Comunicação Visual",
          overview: "Criação de um sistema visual para TVs no hall da FGV, com o objetivo de comunicar eventos e atualizações institucionais de forma atrativa, dinâmica e acessível a alunos e visitantes.",
          discovery: "Alunos ignoravam murais físicos e e-mails institucionais. Identifiquei que a linguagem dos canais era desatualizada e pouco integrada com a rotina visual dos espaços.",
          solution: "Implementei um painel digital com curadoria de conteúdo semanal, foco em ritmo visual e clareza imediata das mensagens. A plataforma foi pensada para ser automatizada, com flexibilidade de atualização remota.",
          iteration: "Testamos tipos de animações, tempo de exibição e contraste. Ajustamos o calendário visual e otimizamos o layout com base em feedback de alunos e coordenação.",
          outcomes: [
            "Aumento de 72% no engajamento com eventos",
            "Retenção de mensagens em painéis muito superior a e-mails anteriores",
            "Reaproveitamento da solução por outros setores da escola"
          ],
          insights: "Ambientes físicos também são interfaces. Quando bem projetados, informam, engajam e conectam — sem precisar de login."
        }
      },
      backlog: {
        title: "Ciclo de Backlogs Estratégicos",
        description: "Desafios reais enfrentados por stakeholders e soluções de UX aplicadas estrategicamente para resolver problemas de negócio.",
        solution: "Solução",
        result: "Resultado",
        note: "Nota",
        noItems: "Nenhum item nesta página.",
        previous: "Anterior",
        next: "Próxima",
        page: "Página",
        of: "de",
        items: [
          {
            challenge: "Usuários abandonavam o carrinho na etapa de pagamento",
            solution: "Redesenhei o fluxo de checkout com menos etapas e validação em tempo real",
            result: "Redução de 35% na taxa de abandono do carrinho",
            note: "A simplicidade no processo de compra é fundamental para conversão"
          },
          {
            challenge: "Baixa adesão ao programa de fidelidade",
            solution: "Criei um sistema de gamificação com recompensas visuais e progressão clara",
            result: "Aumento de 60% nas inscrições no programa",
            note: "Feedback visual imediato motiva engajamento contínuo"
          },
          {
            challenge: "Dificuldade dos usuários em encontrar produtos específicos",
            solution: "Implementei busca inteligente com filtros contextuais e sugestões automáticas",
            result: "Melhoria de 45% na taxa de conversão de busca",
            note: "A busca deve antecipar a intenção do usuário"
          },
          {
            challenge: "Interface complexa causava confusão nos usuários",
            solution: "Simplifiquei a navegação com hierarquia visual clara e menos opções por tela",
            result: "Redução de 50% nas solicitações de suporte",
            note: "Menos opções podem significar mais clareza e eficiência"
          }
        ]
      },
      contact: {
        title: "Vamos conversar?",
        description: "Estou sempre aberto a novas oportunidades e colaborações. Entre em contato para discutir projetos, parcerias ou apenas trocar ideias sobre UX e design de produtos.",
        form: {
          name: "Nome",
          namePlaceholder: "Digite seu nome completo",
          email: "E-mail",
          emailPlaceholder: "Digite seu melhor e-mail",
          subject: "Assunto",
          subjectPlaceholder: "Sobre o que você gostaria de conversar?",
          message: "Mensagem",
          messagePlaceholder: "Conte-me sobre seu projeto, oportunidade ou como posso ajudar...",
          messageHint: "Mínimo de 10 caracteres para uma mensagem clara",
          send: "Enviar mensagem",
          sending: "Enviando...",
          success: "Mensagem enviada com sucesso!",
          error: "Erro ao enviar mensagem. Tente novamente.",
          nameRequired: "Nome é obrigatório",
          emailRequired: "E-mail é obrigatório",
          emailInvalid: "E-mail inválido",
          subjectRequired: "Assunto é obrigatório",
          messageRequired: "Mensagem é obrigatória"
        },
        info: {
          email: "tbisp0@hotmail.com",
          location: "São Paulo, Brasil",
          availability: "Disponível para projetos freelance e oportunidades full-time"
        },
        social: {
          linkedin: "LinkedIn",
          whatsapp: "WhatsApp",
          email: "E-mail"
        }
      }
    }
  }
};

// Configuração simplificada e robusta
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',

    // DEBUG para diagnóstico
    debug: import.meta.env.DEV,

    // Configurações React
    react: {
      useSuspense: false
    },

    // Configurações de interpolação
    interpolation: {
      escapeValue: false
    },

    // Configurações básicas
    defaultNS: 'translation',

    // Configurações de detecção de idioma
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })
  .then(() => {
    console.log('✅ i18n initialized successfully');
    console.log('🌐 Current language:', i18n.language);
    console.log('📊 Sample translation:', i18n.t('profile.title'));
  })
  .catch((error) => {
    console.error('❌ Error initializing i18n:', error);
  });

export default i18n;
