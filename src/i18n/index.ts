import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Recursos de tradução inline para evitar problemas de build
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
        fgvLaw: {
          title: "FGV LAW",
          category: "Navegação e Usabilidade",
          overview: "Reestruturação da área de cursos jurídicos da FGV LAW com foco em usabilidade e organização da informação. O projeto teve como objetivo aumentar a visibilidade das ofertas e facilitar a navegação entre opções.",
          discovery: "Identifiquei que os usuários enfrentavam dificuldade para localizar e comparar cursos. A estrutura atual gerava confusão e dispersão. Através de entrevistas e análise heurística, percebi que o excesso de conteúdo não estava ajudando na decisão, e sim atrapalhando.",
          solution: "Projetei um novo painel com sistema de abas e filtros temáticos, reorganizando a hierarquia visual e informacional. As opções foram agrupadas com base nos objetivos dos usuários (área jurídica, tipo de curso, carga horária).",
          iteration: "Após testes com usuários, simplificamos a terminologia dos filtros e ajustamos a ordem das informações com base em feedback direto. Refinei o layout para leitura rápida e adaptação mobile.",
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
            challenge: "A FGV precisava aumentar a visibilidade de cursos, palestras e atualizações institucionais.",
            solution: "A solução foi implementar um painel digital estratégico no hall da instituição, com curadoria de conteúdo e atualização automatizada.",
            result: "Aumento do engajamento presencial em 72% e maior percepção institucional.",
            note: "Entendi que, para comunicar com eficiência em ambientes físicos, o conteúdo precisa ser pensado como uma interface viva: ritmo visual, relevância contextual e clareza imediata fazem toda a diferença na atenção e retenção das mensagens."
          },
          {
            challenge: "Usuários da DIREITO FGV tinham dificuldade em localizar documentos e conteúdos relevantes dentro do portal acadêmico.",
            solution: "Redesenho da experiência de navegação com foco em features valorizadas pelo público corporativo e simplificação do processo de cotação.",
            result: "Aumento de 27% nas conversões de cotações e redução de 40% no abandono da jornada de compra.",
            note: "Percebi que mapear objetivos do usuário tem mais valor do que seguir estruturas institucionais fixas."
          },
          {
            challenge: "A área de cursos da FGV LAW apresentava dificuldade na organização dos conteúdos, dificultando a navegação e impactando a visibilidade dos programas.",
            solution: "Estruturei um novo painel com filtros segmentados e sistema de abas, reorganizando a hierarquia das informações com foco em escaneabilidade e jornada de decisão do usuário.",
            result: "Houve um aumento significativo na visibilidade dos cursos e na conversão de acessos em interações com páginas específicas, além de maior clareza percebida pelos usuários.",
            note: "Compreendi que, ao lidar com grande volume de opções, o design da informação precisa facilitar a tomada de decisão — não apenas mostrar conteúdo, mas organizar a escolha com lógica e contexto."
          },
          {
            challenge: "A Taliparts precisava validar digitalmente seu catálogo de peças automotivas sem grandes investimentos iniciais.",
            solution: "Criei uma estratégia de validação no Mercado Livre com SEO otimizado, padronização visual e categorização baseada no vocabulário do comprador.",
            result: "Crescimento consistente nas vendas dos produtos priorizados e criação de um processo replicável de análise e otimização.",
            note: "Aprendi que validação digital com baixo custo é não só possível, mas essencial. O contexto físico, vocabulário técnico e percepção de valor pelo cliente devem guiar a estratégia de produto."
          },
          {
            challenge: "Pesquisadores da Direito GV tinham dificuldade para divulgar seus trabalhos e usuários externos não encontravam informações sobre projetos acadêmicos.",
            solution: "Desenvolvi uma nova arquitetura de informação com categorização temática, perfis de pesquisadores, timeline de projetos e sistema de busca avançada.",
            result: "Redução significativa no tempo de navegação, aumento nas visitas às páginas de pesquisadores e maior valorização da produção acadêmica.",
            note: "Descobri que áreas institucionais ganham relevância quando são navegáveis e estrategicamente organizadas na arquitetura da informação."
          }
        ]
      },
      contact: {
        title: "Vamos conversar?",
        description: "Estou sempre aberto a novas oportunidades e colaborações. Entre em contato para discutir projetos, parcerias ou apenas trocar ideias sobre UX e design de produtos.",
        form: {
          name: "Nome",
          email: "E-mail",
          subject: "Assunto",
          message: "Mensagem",
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
  },
  'en-US': {
    translation: {
      navigation: {
        profile: "Profile",
        projects: "Projects",
        backlog: "Backlog",
        contact: "Contact",
        home: "Home"
      },
      profile: {
        title: "UX/Product Designer focused on strategy, impact and experience",
        bio: "I'm a UX/Product Designer with strong experience in digital product design focused on user experience, conversion and business impact.",
        exploreProjects: "Explore projects",
        letsChat: "Let's Chat",
        downloadCV: "Download CV",
        linkedin: "LinkedIn"
      },
      projects: {
        title: "Projects",
        overview: "Overview",
        discovery: "Discovery",
        solution: "Solution",
        iteration: "Iteration",
        outcomes: "Outcomes",
        insights: "Insights"
      },
      backlog: {
        title: "Strategic Backlog Cycle",
        description: "Real challenges faced by stakeholders and UX solutions applied strategically.",
        solution: "Solution",
        result: "Result",
        note: "Note",
        items: []
      },
      contact: {
        title: "Let's talk?",
        description: "I'm always open to new opportunities and collaborations."
      }
    }
  },
  'es-ES': {
    translation: {
      navigation: {
        profile: "Perfil",
        projects: "Proyectos",
        backlog: "Backlog",
        contact: "Contacto",
        home: "Inicio"
      },
      profile: {
        title: "UX/Product Designer enfocado en estrategia, impacto y experiencia",
        bio: "Soy UX/Product Designer con fuerte experiencia en diseño de productos digitales enfocados en experiencia de usuario.",
        exploreProjects: "Explorar proyectos",
        letsChat: "Hablemos",
        downloadCV: "Descargar CV",
        linkedin: "LinkedIn"
      },
      projects: {
        title: "Proyectos",
        overview: "Visión General",
        discovery: "Descubrimiento",
        solution: "Solución",
        iteration: "Iteración",
        outcomes: "Resultados",
        insights: "Insights"
      },
      backlog: {
        title: "Ciclo de Backlog Estratégico",
        description: "Desafíos reales enfrentados por stakeholders y soluciones UX aplicadas estratégicamente.",
        solution: "Solución",
        result: "Resultado",
        note: "Nota",
        items: []
      },
      contact: {
        title: "¿Hablamos?",
        description: "Siempre estoy abierto a nuevas oportunidades y colaboraciones."
      }
    }
  }
};

// Inicializar i18n de forma síncrona
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR', // idioma padrão
    fallbackLng: 'pt-BR',

    interpolation: {
      escapeValue: false // React já faz escape por padrão
    },

    // Configurações para desenvolvimento
    debug: import.meta.env.DEV,

    // Configurações de namespace
    defaultNS: 'translation',
    ns: ['translation'],

    // Configurações de detecção de idioma
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },

    // Configurações adicionais para produção
    load: 'languageOnly',
    cleanCode: true,

    // Configurações de fallback
    supportedLngs: ['pt-BR', 'en-US', 'es-ES'],
    nonExplicitSupportedLngs: true
  })
  .then(() => {
    console.log('i18n initialized successfully');
  })
  .catch((error) => {
    console.error('Error initializing i18n:', error);
  });

export default i18n;
