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
      },
      accessibility: {
        title: "Acessibilidade",
        subtitle: "Personalize sua experiência de navegação",
        description: "Configure as opções de acessibilidade para melhorar sua experiência.",
        instructions: "Use as opções abaixo para personalizar a interface.",
        shortcut: "Atalho: Shift + A",
        openMenu: "Abrir menu de acessibilidade",
        closeMenu: "Fechar menu de acessibilidade",
        menuLabel: "Menu de Acessibilidade",
        menuTooltip: "Configurações de acessibilidade (Shift + A)",
        fontSize: {
          label: "Tamanho da fonte",
          increase: "Aumentar",
          decrease: "Diminuir",
          reset: "Resetar",
          increaseLabel: "Aumentar tamanho da fonte",
          decreaseLabel: "Diminuir tamanho da fonte",
          resetLabel: "Resetar tamanho da fonte"
        },
        contrast: {
          label: "Alto contraste",
          enable: "Ativar alto contraste",
          disable: "Desativar alto contraste",
          enabled: "Alto contraste ativado",
          disabled: "Alto contraste desativado"
        },
        readingMode: {
          label: "Modo leitura",
          enable: "Ativar modo leitura",
          disable: "Desativar modo leitura",
          enabled: "Modo leitura ativado",
          disabled: "Modo leitura desativado"
        },
        screenReader: {
          label: "Leitor de tela",
          enable: "Ativar leitor de tela",
          disable: "Desativar leitor de tela",
          enabled: "Leitor de tela ativado",
          disabled: "Leitor de tela desativado"
        },
        reset: {
          label: "Resetar configurações",
          action: "Configurações de acessibilidade resetadas",
          success: "Configurações resetadas com sucesso"
        },
        features: {
          fontSize: "Tamanho da fonte",
          fontSizeIncrease: "Aumentar fonte",
          fontSizeDecrease: "Diminuir fonte",
          fontSizeReset: "Resetar fonte",
          highContrast: "Alto contraste",
          readingMode: "Modo leitura",
          keyboardNavigation: "Navegação por teclado",
          screenReader: "Leitor de tela",
          readPage: "Ler página inteira",
          stopReading: "Parar leitura",
          readElement: "Ler elemento",
          skipToContent: "Pular para conteúdo principal",
          skipToNavigation: "Pular para navegação"
        },
        status: {
          enabled: "Ativado",
          disabled: "Desativado",
          fontIncreased: "Fonte aumentada",
          fontDecreased: "Fonte diminuída",
          fontReset: "Fonte resetada",
          contrastEnabled: "Alto contraste ativado",
          contrastDisabled: "Alto contraste desativado",
          readingEnabled: "Modo leitura ativado",
          readingDisabled: "Modo leitura desativado"
        }
      },
      tooltips: {
        theme: {
          light: "Alternar para modo claro",
          dark: "Alternar para modo escuro",
          system: "Usar preferência do sistema"
        },
        language: {
          switch: "Trocar idioma",
          current: "Idioma atual",
          available: "Idiomas disponíveis"
        },
        navigation: {
          home: "Ir para início",
          profile: "Ir para perfil",
          projects: "Ver projetos",
          backlog: "Ver backlog estratégico",
          contact: "Entrar em contato"
        },
        social: {
          linkedin: "Perfil no LinkedIn",
          email: "Enviar e-mail",
          whatsapp: "Conversar no WhatsApp"
        },
        actions: {
          expand: "Expandir detalhes",
          collapse: "Recolher detalhes",
          download: "Baixar arquivo",
          share: "Compartilhar",
          copy: "Copiar link",
          print: "Imprimir página",
          backToTop: "Voltar ao topo"
        }
      },
      seo: {
        title: "Tarcísio Bispo - UX/Product Designer | Portfolio",
        description: "UX/Product Designer especializado em estratégia, impacto e experiência do usuário. Veja meus projetos de design de produtos digitais e soluções de UX.",
        keywords: "UX Designer, Product Designer, Design de Produto, Experiência do Usuário, UI/UX, Portfolio, São Paulo",
        author: "Tarcísio Bispo de Araújo",
        pages: {
          home: {
            title: "Tarcísio Bispo - UX/Product Designer | Portfolio",
            description: "UX/Product Designer com foco em estratégia, impacto e experiência do usuário. Especialista em design de produtos digitais, conversão e impacto de negócio."
          },
          projects: {
            title: "Projetos - Tarcísio Bispo | UX Designer",
            description: "Veja meus principais projetos de UX/Product Design: FGV LAW, Direito GV, Taliparts e FGV TV Institucional. Cases reais com resultados mensuráveis."
          },
          backlog: {
            title: "Backlog Estratégico - Tarcísio Bispo | UX Designer",
            description: "Desafios reais enfrentados por stakeholders e soluções de UX aplicadas estrategicamente para resolver problemas de negócio."
          },
          contact: {
            title: "Contato - Tarcísio Bispo | UX Designer",
            description: "Entre em contato para discutir projetos, parcerias ou oportunidades. Disponível para projetos freelance e oportunidades full-time."
          }
        }
      },
      schema: {
        person: {
          name: "Tarcísio Bispo de Araújo",
          jobTitle: "UX/Product Designer",
          description: "UX/Product Designer especializado em estratégia, impacto e experiência do usuário",
          location: "São Paulo, Brasil",
          email: "tbisp0@hotmail.com",
          skills: ["UX Design", "Product Design", "Design Strategy", "User Research", "Prototyping", "Usability Testing"]
        },
        organization: {
          name: "Tarcísio Bispo Portfolio",
          description: "Portfolio profissional de UX/Product Design",
          location: "São Paulo, Brasil"
        }
      },
      toasts: {
        success: {
          title: "Sucesso!",
          messageSent: "Mensagem enviada com sucesso!",
          settingsSaved: "Configurações salvas",
          linkCopied: "Link copiado para área de transferência",
          themeChanged: "Tema alterado",
          languageChanged: "Idioma alterado"
        },
        error: {
          title: "Erro",
          messageNotSent: "Erro ao enviar mensagem",
          networkError: "Erro de conexão",
          genericError: "Algo deu errado",
          tryAgain: "Tente novamente"
        },
        info: {
          title: "Informação",
          loading: "Carregando...",
          processing: "Processando...",
          saving: "Salvando..."
        },
        warning: {
          title: "Atenção",
          unsavedChanges: "Você tem alterações não salvas",
          confirmAction: "Tem certeza que deseja continuar?"
        }
      },
      alts: {
        profile: {
          photo: "Foto de perfil de Tarcísio Bispo",
          ixdfLogo: "Logo do Interaction Design Foundation",
          ixdfSeal: "Selo de certificação IxDF"
        },
        projects: {
          fgvLaw: "Captura de tela do projeto FGV LAW - interface de cursos jurídicos",
          direitoGV: "Captura de tela do projeto Direito GV - área de pesquisa acadêmica",
          taliparts: "Captura de tela do projeto Taliparts - e-commerce de peças automotivas",
          tvInstitucional: "Captura de tela do projeto FGV TV Institucional - sistema de comunicação visual"
        },
        icons: {
          menu: "Ícone de menu",
          close: "Ícone de fechar",
          expand: "Ícone de expandir",
          collapse: "Ícone de recolher",
          external: "Ícone de link externo",
          download: "Ícone de download",
          email: "Ícone de e-mail",
          phone: "Ícone de telefone",
          location: "Ícone de localização",
          linkedin: "Ícone do LinkedIn",
          github: "Ícone do GitHub",
          sun: "Ícone de sol (modo claro)",
          moon: "Ícone de lua (modo escuro)",
          globe: "Ícone de globo (idiomas)",
          accessibility: "Ícone de acessibilidade",
          loading: "Ícone de carregamento",
          success: "Ícone de sucesso",
          error: "Ícone de erro",
          warning: "Ícone de aviso",
          info: "Ícone de informação"
        },
        decorative: {
          gradient: "Gradiente decorativo",
          pattern: "Padrão decorativo",
          divider: "Divisor visual",
          background: "Imagem de fundo decorativa"
        }
      },
      feedback: {
        title: "Feedback",
        subtitle: "Sua opinião é importante",
        description: "Compartilhe sua experiência e sugestões",
        typeQuestion: "Que tipo de feedback você gostaria de compartilhar?",
        thankYou: "Obrigado pelo seu feedback!",
        importance: "Sua opinião é muito importante para nós.",
        close: "Fechar",
        defaultTitle: "Compartilhe seu feedback",
        defaultInstruction: "Conte-nos o que você pensa",
        defaultPlaceholder: "Digite sua mensagem aqui...",
        problem: "Reportar problema",
        idea: "Compartilhar ideia",
        praise: "Enviar elogio",
        problemTitle: "Reportar um problema",
        ideaTitle: "Compartilhar uma ideia",
        praiseTitle: "Enviar um elogio",
        problemInstruction: "Descreva o problema que você encontrou",
        ideaInstruction: "Compartilhe sua sugestão ou ideia",
        praiseInstruction: "Conte-nos o que você gostou",
        problemPlaceholder: "Descreva o problema em detalhes...",
        ideaPlaceholder: "Compartilhe sua ideia ou sugestão...",
        praisePlaceholder: "Conte-nos o que você gostou...",
        form: {
          type: "Tipo de feedback",
          message: "Sua mensagem",
          email: "Seu e-mail (opcional)",
          send: "Enviar feedback",
          sending: "Enviando...",
          success: "Feedback enviado com sucesso!",
          error: "Erro ao enviar feedback. Tente novamente.",
          messageRequired: "Mensagem é obrigatória"
        },
        types: {
          bug: "Reportar bug",
          suggestion: "Sugestão",
          compliment: "Elogio",
          other: "Outro"
        }
      },
      language: {
        changed: "Idioma alterado com sucesso",
        current: "Idioma atual",
        available: "Idiomas disponíveis",
        portuguese: "Português",
        english: "English",
        spanish: "Español"
      },
      theme: {
        changed: "Tema alterado com sucesso",
        light: "Modo claro ativado",
        dark: "Modo escuro ativado",
        system: "Usando preferência do sistema"
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
        home: "Home",
        goToProfile: "Go to Profile section",
        goToProjetos: "Go to Projects section",
        goToBacklog: "Go to Backlog section",
        goToContato: "Go to Contact section"
      },
      profile: {
        title: "UX/Product Designer focused on strategy, impact and experience",
        bio: "I am a UX/Product Designer with strong expertise in designing digital products focused on user experience, conversion and business impact. With a background in Digital Marketing, SEO and AI, I integrate strategy, design and usability in continuous improvement and innovation processes.",
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
        insights: "Insights",
        seeMore: "See details",
        seeLess: "Hide details",
        projectImage: "Project image",
        fgvLaw: {
          title: "FGV LAW",
          category: "Navigation and Usability",
          overview: "Restructuring of FGV LAW's legal courses area with focus on usability and information organization.",
          discovery: "I identified that users faced difficulty locating and comparing courses.",
          solution: "I designed a new panel with tab system and thematic filters.",
          iteration: "After user testing, we simplified the filter terminology.",
          outcomes: [
            "Significant increase in course visibility and interaction",
            "Improvement in conversion rate from visits to enrollments or leads",
            "Reduction in navigation time to desired course selection"
          ],
          insights: "Navigation structure needs to guide, not just show. Clarity and relevant grouping directly influence the perception of a course's value."
        },
        direitoGV: {
          title: "Direito GV",
          category: "Maps, Flows and Research",
          overview: "Reorganization of Direito GV's research area to improve visibility of academic projects and facilitate access to information about researchers and their work lines.",
          discovery: "The research area was fragmented and poorly accessible. Researchers had difficulty promoting their work and external users couldn't find relevant information about ongoing projects.",
          solution: "I developed a new information architecture with categorization by thematic areas, researcher profiles and project timeline. I also created an advanced search system.",
          iteration: "We conducted tests with students, professors and researchers. Navigation was adjusted based on feedback about nomenclature and priority order. I validated each change with involved stakeholders.",
          outcomes: [
            "Reduction in navigation time to find specific projects or themes",
            "Increase in visits to researcher pages",
            "Institutional valorization of academic production"
          ],
          insights: "Institutional areas gain relevance when they are navigable, updated and strategically reflected in information architecture."
        },
        taliparts: {
          title: "Taliparts",
          category: "Strategic UX + B2B",
          overview: "Taliparts structuring and digital validation project, focused on publishing automotive parts on Mercado Livre, with integration to physical operations. The goal was to learn quickly, at low cost, about real demand, buyer behavior and competitive advantage.",
          discovery: "I conducted detailed benchmark with automotive sector competitors. I interviewed mechanics and shop owners, modeled personas and applied CSD Matrix to identify certainties, assumptions and doubts in the physical catalog.",
          solution: "I created a validation strategy with SEO for Mercado Livre, visual standardization of ads, categorization centered on buyer vocabulary and search history. I also organized KPIs and defined product prioritization plan.",
          iteration: "I tested products by thematic blocks, monitoring clicks, questions and conversion rate. I refined descriptions, titles and even item selection based on real performance.",
          outcomes: [
            "Sales growth with strategically prioritized products",
            "Reduction in buyer doubts through description improvements",
            "Creation of replicable process of publication + analysis + repositioning"
          ],
          insights: "Digital validation at low cost is possible — and necessary. Product logic needs to consider physical context, technical vocabulary and differentials perceived by the customer."
        },
        tvInstitucional: {
          title: "FGV Institutional TV",
          category: "Engagement and Visual Communication",
          overview: "Creation of a visual system for TVs in FGV's hall, aiming to communicate events and institutional updates in an attractive, dynamic and accessible way to students and visitors.",
          discovery: "Students ignored physical bulletin boards and institutional emails. I identified that the language of channels was outdated and poorly integrated with the visual routine of spaces.",
          solution: "I implemented a digital panel with weekly content curation, focus on visual rhythm and immediate message clarity. The platform was designed to be automated, with remote update flexibility.",
          iteration: "We tested animation types, display time and contrast. We adjusted the visual calendar and optimized layout based on student and coordination feedback.",
          outcomes: [
            "72% increase in event engagement",
            "Message retention in panels much superior to previous emails",
            "Solution reuse by other school sectors"
          ],
          insights: "Physical environments are also interfaces. When well designed, they inform, engage and connect — without needing login."
        }
      },
      backlog: {
        title: "Strategic Backlog Cycle",
        description: "Real challenges faced by stakeholders and UX solutions strategically applied to solve business problems.",
        solution: "Solution",
        result: "Result",
        note: "Note",
        noItems: "No items on this page.",
        previous: "Previous",
        next: "Next",
        page: "Page",
        of: "of",
        items: [
          {
            challenge: "Users abandoned cart at payment step",
            solution: "I redesigned checkout flow with fewer steps and real-time validation",
            result: "35% reduction in cart abandonment rate",
            note: "Simplicity in purchase process is fundamental for conversion"
          },
          {
            challenge: "Low loyalty program adoption",
            solution: "I created a gamification system with visual rewards and clear progression",
            result: "60% increase in program enrollments",
            note: "Immediate visual feedback motivates continuous engagement"
          },
          {
            challenge: "Users difficulty finding specific products",
            solution: "I implemented smart search with contextual filters and automatic suggestions",
            result: "45% improvement in search conversion rate",
            note: "Search should anticipate user intention"
          },
          {
            challenge: "Complex interface caused user confusion",
            solution: "I simplified navigation with clear visual hierarchy and fewer options per screen",
            result: "50% reduction in support requests",
            note: "Fewer options can mean more clarity and efficiency"
          }
        ]
      },
      contact: {
        title: "Let's talk?",
        description: "I'm always open to new opportunities and collaborations. Get in touch to discuss projects, partnerships or just exchange ideas about UX and product design.",
        form: {
          name: "Name",
          namePlaceholder: "Enter your full name",
          email: "Email",
          emailPlaceholder: "Enter your best email",
          subject: "Subject",
          subjectPlaceholder: "What would you like to talk about?",
          message: "Message",
          messagePlaceholder: "Tell me about your project, opportunity or how I can help...",
          messageHint: "Minimum 10 characters for a clear message",
          send: "Send message",
          sending: "Sending...",
          success: "Message sent successfully!",
          error: "Error sending message. Please try again.",
          nameRequired: "Name is required",
          emailRequired: "Email is required",
          emailInvalid: "Invalid email",
          subjectRequired: "Subject is required",
          messageRequired: "Message is required"
        },
        info: {
          email: "tbisp0@hotmail.com",
          location: "São Paulo, Brazil",
          availability: "Available for freelance projects and full-time opportunities"
        },
        social: {
          linkedin: "LinkedIn",
          whatsapp: "WhatsApp",
          email: "Email"
        }
      },
      accessibility: {
        title: "Accessibility",
        subtitle: "Customize your browsing experience",
        description: "Configure accessibility options to improve your experience.",
        instructions: "Use the options below to customize the interface.",
        shortcut: "Shortcut: Shift + A",
        openMenu: "Open accessibility menu",
        closeMenu: "Close accessibility menu",
        menuLabel: "Accessibility Menu",
        menuTooltip: "Accessibility settings (Shift + A)",
        fontSize: {
          label: "Font size",
          increase: "Increase",
          decrease: "Decrease",
          reset: "Reset",
          increaseLabel: "Increase font size",
          decreaseLabel: "Decrease font size",
          resetLabel: "Reset font size"
        },
        contrast: {
          label: "High contrast",
          enable: "Enable high contrast",
          disable: "Disable high contrast",
          enabled: "High contrast enabled",
          disabled: "High contrast disabled"
        },
        readingMode: {
          label: "Reading mode",
          enable: "Enable reading mode",
          disable: "Disable reading mode",
          enabled: "Reading mode enabled",
          disabled: "Reading mode disabled"
        },
        screenReader: {
          label: "Screen reader",
          enable: "Enable screen reader",
          disable: "Disable screen reader",
          enabled: "Screen reader enabled",
          disabled: "Screen reader disabled"
        },
        reset: {
          label: "Reset settings",
          action: "Accessibility settings reset",
          success: "Settings reset successfully"
        },
        features: {
          fontSize: "Font size",
          fontSizeIncrease: "Increase font",
          fontSizeDecrease: "Decrease font",
          fontSizeReset: "Reset font",
          highContrast: "High contrast",
          readingMode: "Reading mode",
          keyboardNavigation: "Keyboard navigation",
          screenReader: "Screen reader",
          readPage: "Read entire page",
          stopReading: "Stop reading",
          readElement: "Read element",
          skipToContent: "Skip to main content",
          skipToNavigation: "Skip to navigation"
        },
        status: {
          enabled: "Enabled",
          disabled: "Disabled",
          fontIncreased: "Font increased",
          fontDecreased: "Font decreased",
          fontReset: "Font reset",
          contrastEnabled: "High contrast enabled",
          contrastDisabled: "High contrast disabled",
          readingEnabled: "Reading mode enabled",
          readingDisabled: "Reading mode disabled"
        }
      },
      tooltips: {
        theme: {
          light: "Switch to light mode",
          dark: "Switch to dark mode",
          system: "Use system preference"
        },
        language: {
          switch: "Switch language",
          current: "Current language",
          available: "Available languages"
        },
        navigation: {
          home: "Go to home",
          profile: "Go to profile",
          projects: "View projects",
          backlog: "View strategic backlog",
          contact: "Get in touch"
        },
        social: {
          linkedin: "LinkedIn profile",
          email: "Send email",
          whatsapp: "Chat on WhatsApp"
        },
        actions: {
          expand: "Expand details",
          collapse: "Collapse details",
          download: "Download file",
          share: "Share",
          copy: "Copy link",
          print: "Print page",
          backToTop: "Back to top"
        }
      },
      seo: {
        title: "Tarcísio Bispo - UX/Product Designer | Portfolio",
        description: "UX/Product Designer specialized in strategy, impact and user experience. See my digital product design projects and UX solutions.",
        keywords: "UX Designer, Product Designer, Product Design, User Experience, UI/UX, Portfolio, São Paulo",
        author: "Tarcísio Bispo de Araújo",
        pages: {
          home: {
            title: "Tarcísio Bispo - UX/Product Designer | Portfolio",
            description: "UX/Product Designer focused on strategy, impact and user experience. Expert in digital product design, conversion and business impact."
          },
          projects: {
            title: "Projects - Tarcísio Bispo | UX Designer",
            description: "See my main UX/Product Design projects: FGV LAW, Direito GV, Taliparts and FGV Institutional TV. Real cases with measurable results."
          },
          backlog: {
            title: "Strategic Backlog - Tarcísio Bispo | UX Designer",
            description: "Real challenges faced by stakeholders and UX solutions strategically applied to solve business problems."
          },
          contact: {
            title: "Contact - Tarcísio Bispo | UX Designer",
            description: "Get in touch to discuss projects, partnerships or opportunities. Available for freelance projects and full-time opportunities."
          }
        }
      },
      schema: {
        person: {
          name: "Tarcísio Bispo de Araújo",
          jobTitle: "UX/Product Designer",
          description: "UX/Product Designer specialized in strategy, impact and user experience",
          location: "São Paulo, Brazil",
          email: "tbisp0@hotmail.com",
          skills: ["UX Design", "Product Design", "Design Strategy", "User Research", "Prototyping", "Usability Testing"]
        },
        organization: {
          name: "Tarcísio Bispo Portfolio",
          description: "Professional UX/Product Design portfolio",
          location: "São Paulo, Brazil"
        }
      },
      toasts: {
        success: {
          title: "Success!",
          messageSent: "Message sent successfully!",
          settingsSaved: "Settings saved",
          linkCopied: "Link copied to clipboard",
          themeChanged: "Theme changed",
          languageChanged: "Language changed"
        },
        error: {
          title: "Error",
          messageNotSent: "Error sending message",
          networkError: "Connection error",
          genericError: "Something went wrong",
          tryAgain: "Try again"
        },
        info: {
          title: "Information",
          loading: "Loading...",
          processing: "Processing...",
          saving: "Saving..."
        },
        warning: {
          title: "Warning",
          unsavedChanges: "You have unsaved changes",
          confirmAction: "Are you sure you want to continue?"
        }
      },
      alts: {
        profile: {
          photo: "Tarcísio Bispo profile photo",
          ixdfLogo: "Interaction Design Foundation logo",
          ixdfSeal: "IxDF certification seal"
        },
        projects: {
          fgvLaw: "FGV LAW project screenshot - legal courses interface",
          direitoGV: "Direito GV project screenshot - academic research area",
          taliparts: "Taliparts project screenshot - automotive parts e-commerce",
          tvInstitucional: "FGV Institutional TV project screenshot - visual communication system"
        },
        icons: {
          menu: "Menu icon",
          close: "Close icon",
          expand: "Expand icon",
          collapse: "Collapse icon",
          external: "External link icon",
          download: "Download icon",
          email: "Email icon",
          phone: "Phone icon",
          location: "Location icon",
          linkedin: "LinkedIn icon",
          github: "GitHub icon",
          sun: "Sun icon (light mode)",
          moon: "Moon icon (dark mode)",
          globe: "Globe icon (languages)",
          accessibility: "Accessibility icon",
          loading: "Loading icon",
          success: "Success icon",
          error: "Error icon",
          warning: "Warning icon",
          info: "Information icon"
        },
        decorative: {
          gradient: "Decorative gradient",
          pattern: "Decorative pattern",
          divider: "Visual divider",
          background: "Decorative background image"
        }
      },
      feedback: {
        title: "Feedback",
        subtitle: "Your opinion matters",
        description: "Share your experience and suggestions",
        typeQuestion: "What type of feedback would you like to share?",
        thankYou: "Thank you for your feedback!",
        importance: "Your opinion is very important to us.",
        close: "Close",
        defaultTitle: "Share your feedback",
        defaultInstruction: "Tell us what you think",
        defaultPlaceholder: "Type your message here...",
        problem: "Report problem",
        idea: "Share idea",
        praise: "Send compliment",
        problemTitle: "Report a problem",
        ideaTitle: "Share an idea",
        praiseTitle: "Send a compliment",
        problemInstruction: "Describe the problem you encountered",
        ideaInstruction: "Share your suggestion or idea",
        praiseInstruction: "Tell us what you liked",
        problemPlaceholder: "Describe the problem in detail...",
        ideaPlaceholder: "Share your idea or suggestion...",
        praisePlaceholder: "Tell us what you liked...",
        form: {
          type: "Feedback type",
          message: "Your message",
          email: "Your email (optional)",
          send: "Send feedback",
          sending: "Sending...",
          success: "Feedback sent successfully!",
          error: "Error sending feedback. Please try again.",
          messageRequired: "Message is required"
        },
        types: {
          bug: "Report bug",
          suggestion: "Suggestion",
          compliment: "Compliment",
          other: "Other"
        }
      },
      language: {
        changed: "Language changed successfully",
        current: "Current language",
        available: "Available languages",
        portuguese: "Português",
        english: "English",
        spanish: "Español",
        select: "Select language"
      },
      theme: {
        changed: "Theme changed successfully",
        light: "Light mode enabled",
        dark: "Dark mode enabled",
        system: "Using system preference"
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
