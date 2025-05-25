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
        home: "Início"
      },
      profile: {
        title: "UX/Product Designer com foco em estratégia, impacto e experiência",
        bio: "Sou UX/Product Designer com forte atuação no design de produtos digitais focados em experiência do usuário, conversão e impacto de negócio. Com background em Marketing Digital, SEO e IA, integro estratégia, design e usabilidade em processos contínuos de melhoria e inovação.",
        exploreProjects: "Explore projetos",
        letsChat: "Vamos Conversar",
        downloadCV: "Download CV"
      },
      projects: {
        title: "Projetos",
        overview: "Visão Geral",
        discovery: "Descoberta",
        solution: "Solução",
        iteration: "Iteração",
        outcomes: "Resultados",
        insights: "Insights",
        fgvLaw: {
          title: "FGV LAW",
          overview: "Reestruturação da área de cursos jurídicos da FGV LAW com foco em usabilidade e organização da informação.",
          discovery: "Identifiquei que os usuários enfrentavam dificuldade para localizar e comparar cursos.",
          solution: "Projetei um novo painel com sistema de abas e filtros temáticos.",
          iteration: "Após testes com usuários, simplificamos a terminologia dos filtros.",
          outcomes: ["Aumento significativo na visibilidade", "Melhora na taxa de conversão"],
          insights: "A estrutura de navegação precisa guiar, não apenas mostrar."
        }
      },
      backlog: {
        title: "Ciclo de Backlogs Estratégicos",
        description: "Desafios reais enfrentados por stakeholders e soluções de UX aplicadas estrategicamente.",
        solution: "Solução",
        result: "Resultado",
        note: "Nota",
        items: [
          {
            challenge: "A FGV precisava aumentar a visibilidade de cursos.",
            solution: "Implementar um painel digital estratégico no hall da instituição.",
            result: "Aumento do engajamento presencial em 72%.",
            note: "O conteúdo precisa ser pensado como uma interface viva."
          }
        ]
      },
      contact: {
        title: "Vamos conversar?",
        description: "Estou sempre aberto a novas oportunidades e colaborações."
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
        downloadCV: "Download CV"
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
        downloadCV: "Descargar CV"
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

// Inicializar i18n de forma robusta
const initI18n = async () => {
  try {
    await i18n
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

        // Garantir que as traduções estão carregadas
        initImmediate: false,

        // Configurações de fallback
        supportedLngs: ['pt-BR', 'en-US', 'es-ES'],
        nonExplicitSupportedLngs: true
      });

    console.log('i18n initialized successfully');
  } catch (error) {
    console.error('Error initializing i18n:', error);
    // Fallback para configuração mínima
    await i18n.init({
      lng: 'pt-BR',
      fallbackLng: 'pt-BR',
      resources,
      interpolation: {
        escapeValue: false
      }
    });
  }
};

// Inicializar imediatamente
initI18n();

export default i18n;
