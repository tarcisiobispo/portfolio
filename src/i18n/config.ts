import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
        bio: "UX/Product Designer com foco em estratégia, impacto e resultados mensuráveis para negócios e usuários. Especialista em transformar desafios complexos em experiências digitais intuitivas e centradas no usuário.",
        exploreProjects: "Explore projetos",
        letsChat: "Vamos Conversar",
        downloadCV: "Download CV",
        linkedin: "LinkedIn",
        name: "Tarcisio Bispo de Araujo",
        ixdf: "IxDF | Interaction Design Foundation",
        greeting: "Olá, eu sou",
        jobTitle: "UX/Product Designer",
        location: "Campinas, São Paulo",
        phone: "+55 (19) 9 9013-7380",
        role1: "UX Designer",
        role2: "Product Designer",
        role3: "Design Strategist",
        role4: "Interaction Designer"
      },
      projects: {
        title: "Projetos",
        description: "Casos reais de UX/Product Design com foco em estratégia, impacto e resultados mensuráveis para negócios e usuários.",
        overview: "Visão Geral",
        discovery: "Descoberta",
        solution: "Solução",
        iteration: "Iteração",
        outcomes: "Resultados",
        insights: "Insights",
        seeMore: "Ver detalhes",
        seeLess: "Ocultar detalhes",
        seeResults: "Ver resultados",
        projectImage: "Imagem do projeto",
        badges: {
          usability: "Usabilidade",
          informationArchitecture: "Arquitetura da Informação",
          userTesting: "Testes de Usuário",
          uxResearch: "UX Research",
          journeyMapping: "Mapa de Jornada",
          stakeholderManagement: "Stakeholder Management",
          productStrategy: "Product Strategy",
          seo: "SEO",
          productValidation: "Validação de Produto",
          visualDesign: "Design Visual",
          communication: "Comunicação",
          engagement: "Engajamento"
        },
        fgvLaw: {
          title: "FGV LAW",
          category: "Navegação e Usabilidade",
          overview: "Reestruturação da área de cursos jurídicos da Direito GV com foco em usabilidade e organização da informação para melhorar a experiência dos usuários.",
          discovery: "Identifiquei que os usuários enfrentavam dificuldade para localizar e comparar cursos na plataforma da Direito GV.",
          solution: "Projetei um novo painel com sistema de abas e filtros temáticos específicos para o contexto jurídico.",
          iteration: "Após testes com usuários, simplificamos a terminologia dos filtros e ajustamos a hierarquia de informações.",
          outcomes: [
            "Melhora significativa na visibilidade dos cursos e aumento nas interações com páginas específicas",
            "Aumento na taxa de conversão de acessos em inscrições",
            "Redução no tempo médio de navegação até a escolha do curso"
          ],
          insights: "A estrutura de navegação precisa guiar, não apenas mostrar. Clareza e agrupamento relevante influenciam diretamente a percepção de valor de um curso."
        },
        direitoGV: {
          title: "Pesquisa Direito FGV",
          category: "Mapas, Fluxos e Pesquisa",
          overview: "Reorganização da área de pesquisa para melhorar visibilidade dos projetos acadêmicos e facilitar acesso a pesquisadores.",
          discovery: "A área de pesquisa estava fragmentada e pouco acessível. Pesquisadores tinham dificuldade para divulgar seus trabalhos e usuários externos não conseguiam encontrar informações relevantes sobre projetos em andamento.",
          solution: "Desenvolvi uma nova arquitetura de informação com categorização por áreas temáticas, perfis de pesquisadores e linha do tempo de projetos. Criei também um sistema de busca avançada.",
          iteration: "Realizamos testes com alunos, professores e pesquisadores. A navegação foi ajustada com base em feedback sobre nomenclatura e ordem de prioridades. Validei cada alteração com os stakeholders envolvidos.",
          outcomes: [
            "Redução significativa no tempo de navegação para encontrar projetos específicos",
            "Aumento expressivo nas visitas às páginas de pesquisadores",
            "Crescimento na consulta de publicações acadêmicas e mais solicitações de parcerias"
          ],
          insights: "Áreas institucionais ganham relevância quando são navegáveis, atualizadas e refletidas de forma estratégica na arquitetura da informação."
        },
        taliparts: {
          title: "Taliparts",
          category: "UX Estratégico + B2B",
          overview: "Estruturação e validação digital da Taliparts para publicação de peças automotivas no Mercado Livre com foco em aprendizado rápido.",
          discovery: "Conduzi benchmark detalhado com concorrentes do setor automotivo. Entrevistei mecânicos e lojistas, modelei personas e apliquei a Matriz CSD para identificar certezas, suposições e dúvidas no catálogo físico.",
          solution: "Criei uma estratégia de validação com SEO para Mercado Livre, padronização visual de anúncios, categorização centrada no vocabulário do comprador e histórico de buscas. Também organizei KPIs e defini plano de priorização de produtos.",
          iteration: "Testei produtos por blocos temáticos, monitorando cliques, perguntas e taxa de conversão. Refinei descrições, títulos e até a seleção de itens com base em performance real.",
          outcomes: [
            "Crescimento significativo nas vendas dos produtos priorizados estrategicamente",
            "Redução expressiva nas dúvidas dos compradores por melhorias nas descrições",
            "Criação de processo replicável que aumentou a eficiência de publicação e análise de produtos"
          ],
          insights: "Validar digitalmente com baixo custo é possível — e necessário. A lógica de produto precisa considerar contexto físico, vocabulário técnico e diferenciais percebidos pelo cliente."
        },
        tvInstitucional: {
          title: "FGV TV Institucional",
          category: "Engajamento e Comunicação Visual",
          overview: "Sistema visual para TVs no hall da FGV para comunicar eventos e atualizações institucionais de forma atrativa e dinâmica.",
          discovery: "Alunos ignoravam murais físicos e e-mails institucionais. Identifiquei que a linguagem dos canais era desatualizada e pouco integrada com a rotina visual dos espaços.",
          solution: "Implementei um painel digital com curadoria de conteúdo semanal, foco em ritmo visual e clareza imediata das mensagens. A plataforma foi pensada para ser automatizada, com flexibilidade de atualização remota.",
          iteration: "Testamos tipos de animações, tempo de exibição e contraste. Ajustamos o calendário visual e otimizamos o layout com base em feedback de alunos e coordenação.",
          outcomes: [
            "Aumento significativo na visibilidade de eventos institucionais e conhecimento dos alunos sobre atividades do campus",
            "Crescimento expressivo na participação em eventos com maior engajamento da comunidade acadêmica",
            "Melhora substancial na retenção de informações institucionais comparado aos métodos anteriores"
          ],
          insights: "Ambientes físicos também são interfaces. Quando bem projetados, informam, engajam e conectam — sem precisar de login."
        }
      },
      backlog: {
        title: "Ciclo de Backlogs Estratégicos",
        description: "Casos práticos de transformação de desafios em soluções UX. Metodologia aplicada, resultados e insights estratégicos com impacto real.",
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
            result: "Aumento significativo do engajamento presencial e maior percepção institucional.",
            note: "Entendi que, para comunicar com eficiência em ambientes físicos, o conteúdo precisa ser pensado como uma interface viva: ritmo visual, relevância contextual e clareza imediata fazem toda a diferença na atenção e retenção das mensagens."
          },
          {
            challenge: "Usuários da DIREITO FGV tinham dificuldade em localizar documentos e conteúdos relevantes dentro do portal acadêmico.",
            solution: "Redesenho da experiência de navegação com foco em features valorizadas pelo público corporativo e simplificação do processo de cotação.",
            result: "Aumento significativo nas conversões de cotações e redução expressiva no abandono da jornada de compra.",
            note: "Percebi que mapear objetivos do usuário tem mais valor do que seguir estruturas institucionais fixas."
          },
          {
            challenge: "A área de cursos da FGV LAW apresentava dificuldade na organização dos conteúdos, dificultando a navegação e impactando a visibilidade dos programas.",
            solution: "Estruturei um novo painel com filtros segmentados e sistema de abas, reorganizando a hierarquia das informações com foco em escaneabilidade e jornada de decisão do usuário.",
            result: "Houve um aumento significativo na visibilidade dos cursos e na conversão de acessos em interações com páginas específicas, além de maior clareza percebida pelos usuários.",
            note: "Compreendi que, ao lidar com grande volume de opções, o design da informação precisa facilitar a tomada de decisão — não apenas mostrar conteúdo, mas organizar a escolha com lógica e contexto."
          },
          {
            challenge: "A Taliparts precisava validar quais produtos seriam mais competitivos no Mercado Livre.",
            solution: "Conduzi benchmark detalhado com análise de concorrência, posicionamento e avaliações de produtos similares.",
            result: "A curadoria inicial de produtos teve maior índice de visualização e interesse já na primeira semana de divulgação.",
            note: "Analisar o terreno competitivo com profundidade é essencial antes de qualquer exposição de marca em canal aberto."
          },
          {
            challenge: "Faltava clareza sobre quem era o público-alvo real da Taliparts.",
            solution: "Modelei personas com base em entrevistas com lojistas, mecânicos e compradores autônomos.",
            result: "Definimos três perfis estratégicos que orientaram desde a escolha de produto até o tom da comunicação.",
            note: "Persona é mais do que um arquétipo — é a lente pela qual se interpreta todo o negócio."
          },
          {
            challenge: "Na Taliparts Os títulos e descrições dos anúncios no Mercado Livre não estavam otimizados para SEO no Mercado Livre.",
            solution: "Reestruturei os títulos com base em práticas de SEO específicas para marketplaces e testei descrições com palavras-chave frequentes.",
            result: "Melhoria significativa no posicionamento das ofertas e aumento expressivo no tráfego orgânico.",
            note: "No marketplace, SEO é tão importante quanto o preço — é ele quem traz o clique."
          },
          {
            challenge: "Na Taliparts era necessário validar se os produtos publicados realmente tinham demanda real.",
            solution: "Estruturei um plano de validação com base em métricas de cliques, perguntas de compradores e comparação com benchmarks.",
            result: "Refinamos o catálogo com base em performance, evitando estoque parado e redirecionando esforços.",
            note: "Testar pequeno e ajustar rápido é mais eficiente do que lançar muitos produtos no escuro."
          },
          {
            challenge: "Na FGV algumas páginas possuiam conteúdo institucional denso afastava os usuários da leitura integral.",
            solution: "Apliquei técnicas de UX writing (escaneabilidade, títulos objetivos, listas visuais) nas páginas-chave.",
            result: "O tempo médio de leitura aumentou e houve queda no abandono de página.",
            note: "Pequenas decisões no texto têm grande impacto na experiência de leitura e compreensão."
          }
        ]
      },
      contact: {
        title: "Vamos conversar?",
        description: "Aberto a oportunidades e colaborações. Entre em contato para discutir projetos ou trocar ideias sobre UX.",
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
          privacy: "Seus dados não serão compartilhados e serão usados apenas para responder sua mensagem.",
          send: "Enviar mensagem",
          sending: "Enviando..."
        },
        errors: {
          nameRequired: "Nome é obrigatório",
          nameMinLength: "Nome deve ter pelo menos 2 caracteres",
          emailRequired: "E-mail é obrigatório",
          emailInvalid: "E-mail inválido",
          subjectRequired: "Assunto é obrigatório",
          messageRequired: "Mensagem é obrigatória",
          messageMinLength: "Sua mensagem precisa ter pelo menos {{count}} caracteres.",
          genericError: "Erro ao enviar mensagem. Tente novamente."
        },
        success: {
          message: "Mensagem enviada com sucesso!"
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
        dyslexia: {
          label: "Modo Dislexia",
          enable: "Ativar modo dislexia",
          disable: "Desativar modo dislexia",
          enabled: "Modo dislexia ativado",
          disabled: "Modo dislexia desativado",
          options: {
            off: "Desligado",
            weak: "Leve",
            medium: "Médio",
            strong: "Forte"
          },
          status: {
            active: "Modo Dislexia {{intensity}} Ativo",
            example: "Texto de exemplo:",
            exampleText: "Este texto deve mudar quando você ativar o modo dislexia acima."
          }
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
        sound: {
          enable: "Ativar som",
          disable: "Desativar som"
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
        title: "Tarcisio Bispo - UX/Product Designer | Portfolio",
        description: "UX/Product Designer especializado em estratégia, impacto e experiência do usuário. Veja meus projetos de design de produtos digitais e soluções de UX.",
        keywords: "UX Designer, Product Designer, Design de Produto, Experiência do Usuário, UI/UX, Portfolio, São Paulo",
        author: "Tarcisio Bispo de Araujo",
        pages: {
          home: {
            title: "Tarcisio Bispo - UX/Product Designer | Portfolio",
            description: "UX/Product Designer com foco em estratégia, impacto e experiência do usuário. Especialista em design de produtos digitais, conversão e impacto de negócio."
          },
          projects: {
            title: "Projetos - Tarcisio Bispo | UX Designer",
            description: "Veja meus principais projetos de UX/Product Design: FGV LAW, Direito GV, Taliparts e FGV TV Institucional. Cases reais com resultados mensuráveis."
          },
          backlog: {
            title: "Backlog Estratégico - Tarcisio Bispo | UX Designer",
            description: "Demonstração prática de como transformo desafios de negócio em soluções de UX mensuráveis. Metodologia aplicada, resultados alcançados e insights estratégicos."
          },
          contact: {
            title: "Contato - Tarcisio Bispo | UX Designer",
            description: "Entre em contato para discutir projetos, parcerias ou oportunidades. Disponível para projetos freelance e oportunidades full-time."
          }
        }
      },
      schema: {
        person: {
          name: "Tarcisio Bispo de Araujo",
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
          languageChanged: "Idioma alterado",
          soundEnabled: "Som ativado",
          soundDisabled: "Som desativado",
          soundEnabledDesc: "Feedback sonoro está ativo agora",
          soundDisabledDesc: "Feedback sonoro está desativado agora"
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
          photo: "Foto de perfil de Tarcisio Bispo",
          ixdfLogo: "Logo do Interaction Design Foundation",
          ixdfSeal: "Selo de certificação IxDF"
        },
        projects: {
          fgvLaw: "Captura de tela do projeto FGV LAW - designers trabalhando em equipe no escritório",
          direitoGV: "Captura de tela do projeto Pesquisa Direito FGV - mesa de madeira com livro em frente a estante",
          taliparts: "Captura de tela do projeto Taliparts - e-commerce de peças automotivas",
          tvInstitucional: "Captura de tela do projeto FGV TV Institucional - placa branca pendurada na lateral de um edifício"
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
        openFeedback: "Abrir feedback",
        send: "Enviar feedback",
        sending: "Enviando...",
        back: "Voltar",
        minimumCharacters: "Mínimo 5 caracteres",
        includeEmail: "Incluir meu e-mail para resposta",
        privacyPolicy: "Política de Privacidade",
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
          success: "🎉 Obrigado pelo seu feedback! Sua opinião é muito importante para melhorar a experiência.",
          error: "❌ Ops! Não conseguimos enviar seu feedback. Tente novamente ou entre em contato diretamente.",
          messageRequired: "Mensagem é obrigatória"
        },
        types: {
          bug: "Reportar bug",
          suggestion: "Sugestão",
          compliment: "Elogio",
          other: "Outro"
        }
      },
      cookies: {
        title: "Este site usa cookies",
        description: "Usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo.",
        learnMore: "Saiba mais",
        acceptAll: "Aceitar todos",
        acceptNecessary: "Apenas necessários",
        customize: "Personalizar",
        savePreferences: "Salvar preferências",
        required: "Obrigatório",
        preferences: {
          title: "Preferências de Cookies"
        },
        types: {
          necessary: {
            title: "Cookies Necessários",
            description: "Estes cookies são essenciais para o funcionamento do site e não podem ser desabilitados."
          },
          analytics: {
            title: "Cookies de Análise",
            description: "Nos ajudam a entender como os visitantes interagem com o site, coletando informações de forma anônima.",
            providers: "Provedores"
          },
          marketing: {
            title: "Cookies de Marketing",
            description: "Usados para rastrear visitantes em sites para exibir anúncios relevantes e envolventes."
          }
        }
      },
      common: {
        close: "Fechar"
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
      },
      footer: {
        copyright: "© 2024 Tarcisio Bispo. Todos os direitos reservados.",
        title: "UX/Product Designer"
      },
      projectDetails: {
        fgvLaw: {
          title: "FGV LAW - Reestruturação UX",
          shortDescription: "Reestruturação da área de cursos jurídicos da Direito GV com foco em usabilidade e organização da informação para melhorar a experiência dos usuários.",
          sections: {
            challenge: {
              title: "O Desafio: Arquitetura de Informação Desorganizada",
              content: "A responsável pelo portal da FGV Law entrou em contato relatando queda nas inscrições e alta taxa de desistência no processo de busca por cursos.",
              quote: "\"Os alunos dizem que o site tem tudo, mas ninguém encontra nada.\" – Responsável pelo portal da FGV Law",
              result: "Esse cenário resultava em confusão, retrabalho e sobrecarga da equipe administrativa."
            },
            discovery: {
              title: "Descoberta: Diagnóstico e Análise de Fluxo",
              content: "Meu ponto de partida foi analisar os relatórios de comportamento de navegação e realizar conversas diretas com a responsável e alguns alunos de pós-graduação.",
              analysis: "A análise revelou gargalos claros:",
              bottlenecks: [
                "Falta de agrupamento temático coerente.",
                "Etapas redundantes no caminho até a inscrição.",
                "Hierarquia de informação confusa, com excesso de cliques."
              ],
              conclusion: "A partir desse diagnóstico, desenhei o fluxo atual (as-is) e identifiquei os pontos de atrito entre expectativa e realidade do usuário."
            },
            solution: {
              title: "Solução: Nova Estrutura e Wireframes Temáticos",
              content: "Com base nas evidências, propus uma reorganização completa da arquitetura de informação.",
              actions: "Entre as principais ações:",
              actionList: [
                "Criação de um sistema de abas para organizar as seções de forma progressiva.",
                "Redefinição da hierarquia visual com foco na clareza e escaneabilidade.",
                "Criação de wireframes apresentando a nova lógica de navegação e os fluxos de inscrição."
              ],
              validation: "Essa nova base foi validada com a responsável e ajustada após feedbacks pontuais de alunos."
            },
            iteration: {
              title: "Iteração e Evolução",
              content: "Após a entrega, a proposta serviu como fundamento para as versões seguintes do portal.",
              consolidation: "Essas iterações consolidaram uma linguagem mais limpa, consistente e coerente."
            },
            results: {
              title: "Resultados",
              content: "Embora não tenha sido possível mensurar resultados quantitativos específicos, os retornos internos foram claros:",
              resultList: [
                "Redução perceptível de dúvidas recorrentes e de sobrecarga do suporte.",
                "Melhor compreensão da oferta de cursos e das etapas do processo seletivo.",
                "Navegação mais fluida e intuitiva, com experiência positiva relatada por alunos e pela equipe responsável."
              ]
            },
            insights: {
              title: "Insights",
              content: "A clareza da estrutura é o ponto de partida para a confiança do usuário."
            }
          }
        },
        tvInstitucional: {
          title: "TV Institucional - Service Design",
          shortDescription: "Implementação de um sistema de comunicação visual para TVs no hall da FGV para comunicar eventos e atualizações institucionais de forma atrativa e dinâmica.",
          sections: {
            overview: {
              title: "Visão Geral: A Interface do Ambiente",
              content: "Desenvolvi um sistema de comunicação visual para as TVs no hall da FGV.",
              quote: "Ambientes físicos também são interfaces. Quando bem projetados, informam, engajam e conectam — sem precisar de login."
            },
            process: {
              title: "Meu Processo de Service Design",
              ethnographic: {
                title: "1. Pesquisa Etnográfica e de Campo",
                content: "Passei dias no hall da instituição, observando o fluxo de pessoas.",
                imageAlt: "Mapa de calor mostrando os principais pontos de circulação e parada dos alunos no hall."
              },
              journey: {
                title: "2. Mapeamento da Jornada e Pontos de Contato",
                content: "Mapeei a jornada do aluno dentro do espaço físico."
              },
              prototyping: {
                title: "3. Prototipagem e Curadoria de Conteúdo",
                content: "Criei um protótipo do sistema usando um simples slideshow em uma TV.",
                imageAlt: "Mosaico com diferentes templates para eventos, avisos e notícias."
              },
              testing: {
                title: "4. Testes e Iteração",
                content: "Para medir o engajamento, usei uma tática simples: adicionei QR Codes nos anúncios de eventos."
              }
            },
            results: {
              title: "Resultados: Da Ignorância ao Engajamento",
              metrics: [
                { value: "+300%", label: "de aumento na visibilidade de eventos (medido por QR Code)" },
                { value: "+40%", label: "de aumento na participação em eventos do campus" },
                { value: "9/10", label: "nota de satisfação dos alunos com o novo canal" }
              ]
            }
          }
        },
        taliparts: {
          title: "TALIPARTS - UX & Business Research",
          shortDescription: "Pesquisa estratégica e validação de produtos para entrada no Mercado Livre, com foco em aprendizado rápido e redução de riscos.",
          sections: {
            challenge: {
              title: "O Desafio: Vender no Digital com Baixo Risco",
              content: "A Taliparts, uma distribuidora de autopeças tradicional, queria entrar no Mercado Livre."
            },
            strategy: {
              title: "Minha Estratégia de Pesquisa Lean",
              competitive: {
                title: "1. Análise Competitiva e de Mercado",
                content: "Iniciei com uma análise profunda dos 5 maiores vendedores de autopeças no Mercado Livre.",
                imageAlt: "Diagrama de Análise SWOT dos principais concorrentes no Mercado Livre."
              },
              personas: {
                title: "2. Definição de Personas",
                content: "Com base em fóruns de automóveis e na análise de perguntas de anúncios concorrentes."
              },
              validation: {
                title: "3. Validação com Anúncios Fantasma",
                content: "Para validar a demanda sem comprar estoque, criei 10 anúncios \"fantasma\"."
              },
              seo: {
                title: "4. Otimização de SEO para Marketplace",
                content: "Com os produtos validados, foquei em otimizar cada anúncio para máxima performance de SEO.",
                beforeAlt: "Exemplo de título de anúncio genérico.",
                afterAlt: "Exemplo de título otimizado."
              }
            },
            results: {
              title: "Resultados e Próximos Passos",
              metrics: [
                { value: "Top 10", label: "em 60% dos anúncios para palavras-chave alvo" },
                { value: "+150%", label: "de CTR comparado à média da categoria" },
                { value: "80%", label: "dos produtos validados atingiram o ponto de equilíbrio em 45 dias" }
              ]
            }
          }
        },
        direitoGV: {
          title: "Direito GV - Pesquisa e Arquitetura",
          shortDescription: "Análise e melhoria da arquitetura de informação para a área de cursos da Direito GV, com foco na experiência do usuário corporativo.",
          sections: {
            overview: {
              title: "Visão Geral do Projeto de Pesquisa",
              content: "Atuei na fase de pesquisa e descoberta que fundamentou o projeto de redesenho do portal.",
              imageAlt: "Diagrama do Duplo Diamante destacando a fase de Descoberta e Definição."
            },
            process: {
              title: "Meu Processo de Diagnóstico",
              heuristic: {
                title: "1. Análise Heurística",
                content: "Iniciei com uma avaliação heurística completa da interface do portal."
              },
              stakeholders: {
                title: "2. Entrevistas com Stakeholders",
                content: "Conduzi reuniões com 5 stakeholders chave."
              },
              journey: {
                title: "3. Mapeamento da Jornada do Usuário As-Is",
                content: "Mapeei a jornada completa de um aluno tentando se inscrever em um curso.",
                imageAlt: "Mapa detalhado da jornada do usuário."
              }
            },
            deliverables: {
              title: "Entregáveis e Recomendações",
              content: "O resultado desta fase de pesquisa foi um relatório detalhado de diagnóstico.",
              deliverablesList: [
                "Relatório de Diagnóstico de UX: Documento com todos os problemas de usabilidade encontrados.",
                "Recomendação de Arquitetura de Informação: Proposta de uma nova estrutura de categorias.",
                "Roadmap de Implementação: Sugestão de um plano de ação faseado."
              ]
            }
          }
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
        linkedin: "LinkedIn",
        name: "Tarcisio Bispo de Araujo",
        ixdf: "IxDF | Interaction Design Foundation",
        greeting: "Hello, I am"
      },
      projects: {
        title: "Projects",
        description: "Casos práticos de transformação de desafios em soluções UX. Metodologia aplicada, resultados e insights estratégicos com impacto real.",
        overview: "Overview",
        discovery: "Discovery",
        solution: "Solution",
        iteration: "Iteration",
        outcomes: "Outcomes",
        insights: "Insights",
        seeMore: "See details",
        seeLess: "Hide details",
        seeResults: "See results",
        projectImage: "Project image",
        badges: {
          usability: "Usability",
          informationArchitecture: "Information Architecture",
          userTesting: "User Testing",
          uxResearch: "UX Research",
          journeyMapping: "Journey Mapping",
          stakeholderManagement: "Stakeholder Management",
          productStrategy: "Product Strategy",
          seo: "SEO",
          productValidation: "Product Validation",
          visualDesign: "Visual Design",
          communication: "Communication",
          engagement: "Engagement"
        },
        fgvLaw: {
          title: "FGV LAW",
          category: "Navigation and Usability",
          overview: "Restructuring of Direito GV legal courses area with focus on usability and information organization to improve user experience.",
          discovery: "I identified that users faced difficulty locating and comparing courses on the Direito GV platform.",
          solution: "I designed a new panel with tab system and thematic filters specific to the legal context.",
          iteration: "After user testing, we simplified the filter terminology and adjusted information hierarchy.",
          outcomes: [
            "Significant improvement in course visibility and increased interactions with specific pages",
            "Increase in conversion rate from visits to enrollments",
            "Reduction in average navigation time until course selection"
          ],
          insights: "Navigation structure needs to guide, not just show. Clarity and relevant grouping directly influence the perception of a course's value."
        },
        direitoGV: {
          title: "FGV Law Research",
          category: "Maps, Flows and Research",
          overview: "Reorganization of research area to improve visibility of academic projects and facilitate access to researchers.",
          discovery: "The research area was fragmented and poorly accessible. Researchers had difficulty promoting their work and external users couldn't find relevant information about ongoing projects.",
          solution: "I developed a new information architecture with categorization by thematic areas, researcher profiles and project timeline. I also created an advanced search system.",
          iteration: "We conducted tests with students, professors and researchers. Navigation was adjusted based on feedback about nomenclature and priority order. I validated each change with involved stakeholders.",
          outcomes: [
            "Significant reduction in navigation time to find specific projects",
            "Substantial increase in visits to researcher pages",
            "Growth in academic publication consultations and more partnership requests"
          ],
          insights: "Institutional areas gain relevance when they are navigable, updated and strategically reflected in information architecture."
        },
        taliparts: {
          title: "Taliparts",
          category: "Strategic UX + B2B",
          overview: "Taliparts digital structuring and validation for publishing automotive parts on Mercado Livre with focus on rapid learning.",
          discovery: "I conducted detailed benchmark with automotive sector competitors. I interviewed mechanics and shop owners, modeled personas and applied CSD Matrix to identify certainties, assumptions and doubts in the physical catalog.",
          solution: "I created a validation strategy with SEO for Mercado Livre, visual standardization of ads, categorization centered on buyer vocabulary and search history. I also organized KPIs and defined product prioritization plan.",
          iteration: "I tested products by thematic blocks, monitoring clicks, questions and conversion rate. I refined descriptions, titles and even item selection based on real performance.",
          outcomes: [
            "Significant growth in sales of strategically prioritized products",
            "Substantial reduction in buyer doubts through improved descriptions",
            "Creation of replicable process that increased publication and analysis efficiency"
          ],
          insights: "Digital validation at low cost is possible — and necessary. Product logic needs to consider physical context, technical vocabulary and differentials perceived by the customer."
        },
        tvInstitucional: {
          title: "FGV Institutional TV",
          category: "Engagement and Visual Communication",
          overview: "Visual system for TVs in FGV's hall to communicate events and institutional updates in an attractive and dynamic way.",
          discovery: "Students ignored physical bulletin boards and institutional emails. I identified that the language of channels was outdated and poorly integrated with the visual routine of spaces.",
          solution: "I implemented a digital panel with weekly content curation, focus on visual rhythm and immediate message clarity. The platform was designed to be automated, with remote update flexibility.",
          iteration: "We tested animation types, display time and contrast. We adjusted the visual calendar and optimized layout based on student and coordination feedback.",
          outcomes: [
            "Significant increase in institutional event visibility and improved students' knowledge about campus activities",
            "Substantial growth in event participation with greater academic community engagement",
            "Notable improvement in institutional information retention compared to previous communication methods"
          ],
          insights: "Physical environments are also interfaces. When well designed, they inform, engage and connect — without needing login."
        }
      },
      backlog: {
        title: "Strategic Backlog Cycle",
        description: "Practical demonstration of how I transform business challenges into measurable UX solutions. Each case presents applied methodology, achieved results, and strategic insights that generate real impact for stakeholders and users.",
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
            "challenge": "FGV needed to increase visibility of courses, lectures and institutional updates.",
            "solution": "The solution was to implement a strategic digital panel in the institution's hall, with content curation and automated updates.",
            "result": "72% increase in face-to-face engagement and greater institutional perception.",
            "note": "I understood that to communicate efficiently in physical environments, content needs to be thought of as a living interface: visual rhythm, contextual relevance and immediate clarity make all the difference in attention and message retention."
          },
          {
            "challenge": "DIREITO FGV users had difficulty locating documents and relevant content within the academic portal.",
            "solution": "Redesign of the navigation experience focusing on features valued by the corporate audience and simplification of the quotation process.",
            "result": "27% increase in quotation conversions and 40% reduction in purchase journey abandonment.",
            "note": "I realized that mapping user objectives has more value than following fixed institutional structures."
          },
          {
            "challenge": "The FGV LAW course area had difficulty organizing content, making navigation difficult and impacting program visibility.",
            "solution": "I structured a new panel with segmented filters and tab system, reorganizing information hierarchy with focus on scannability and user decision journey.",
            "result": "There was a significant increase in course visibility and conversion of access to interactions with specific pages, plus greater clarity perceived by users.",
            "note": "I understood that when dealing with a large volume of options, information design needs to facilitate decision-making — not just show content, but organize choice with logic and context."
          },
          {
            "challenge": "Taliparts needed to validate which products would be most competitive on Mercado Livre.",
            "solution": "I conducted detailed benchmarking with competition analysis, positioning and evaluations of similar products.",
            "result": "The initial product curation had higher viewing and interest rates in the first week of publication.",
            "note": "Analyzing the competitive terrain in depth is essential before any brand exposure in open channels."
          },
          {
            "challenge": "There was a lack of clarity about who Taliparts' real target audience was.",
            "solution": "I modeled personas based on interviews with shopkeepers, mechanics and autonomous buyers.",
            "result": "We defined three strategic profiles that guided everything from product choice to communication tone.",
            "note": "Persona is more than an archetype — it's the lens through which the entire business is interpreted."
          },
          {
            "challenge": "At Taliparts, the titles and descriptions of ads on Mercado Livre were not optimized for SEO on Mercado Livre.",
            "solution": "I restructured titles based on SEO practices specific to marketplaces and tested descriptions with frequent keywords.",
            "result": "Significant improvement in offer positioning and more than 20% increase in organic traffic in 6 months.",
            "note": "In the marketplace, SEO is as important as price — it's what brings the click."
          },
          {
            "challenge": "At Taliparts it was necessary to validate whether the published products really had real demand.",
            "solution": "I structured a validation plan based on click metrics, buyer questions and benchmark comparison.",
            "result": "We refined the catalog based on performance, avoiding dead stock and redirecting efforts.",
            "note": "Testing small and adjusting quickly is more efficient than launching 100 products in the dark."
          },
          {
            "challenge": "At FGV some pages had dense institutional content that kept users from reading in full.",
            "solution": "I applied UX writing techniques (scannability, objective titles, visual lists) to key pages.",
            "result": "Average reading time increased and there was a drop in page abandonment.",
            "note": "Small decisions in text have great impact on reading experience and comprehension."
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
          privacy: "Your data will not be shared and will only be used to respond to your message.",
          send: "Send message",
          sending: "Sending...",
          success: "🎉 Thank you for your message! I'll get back to you soon. Your contact is very important to me.",
          error: "❌ Oops! I couldn't send your message. Please try again or contact me directly at tbisp0@hotmail.com.",
          nameRequired: "Name is required",
          nameMinLength: "Name must be at least 2 characters",
          emailRequired: "Email is required",
          emailInvalid: "Invalid email",
          subjectRequired: "Subject is required",
          messageRequired: "Message is required",
          messageMinLength: "Message must be at least 10 characters"
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
        dyslexia: {
          label: "Dyslexia Mode",
          enable: "Enable dyslexia mode",
          disable: "Disable dyslexia mode",
          enabled: "Dyslexia mode enabled",
          disabled: "Dyslexia mode disabled",
          options: {
            off: "Off",
            weak: "Light",
            medium: "Medium",
            strong: "Strong"
          },
          status: {
            active: "Dyslexia Mode {{intensity}} Active",
            example: "Example text:",
            exampleText: "This text should change when you activate dyslexia mode above."
          }
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
        sound: {
          enable: "Enable sound",
          disable: "Disable sound"
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
        title: "Tarcisio Bispo - UX/Product Designer | Portfolio",
        description: "UX/Product Designer specialized in strategy, impact and user experience. See my digital product design projects and UX solutions.",
        keywords: "UX Designer, Product Designer, Product Design, User Experience, UI/UX, Portfolio, São Paulo",
        author: "Tarcisio Bispo de Araujo",
        pages: {
          home: {
            title: "Tarcisio Bispo - UX/Product Designer | Portfolio",
            description: "UX/Product Designer focused on strategy, impact and user experience. Expert in digital product design, conversion and business impact."
          },
          projects: {
            title: "Projects - Tarcisio Bispo | UX Designer",
            description: "See my main UX/Product Design projects: FGV LAW, Direito GV, Taliparts and FGV Institutional TV. Real cases with measurable results."
          },
          backlog: {
            title: "Strategic Backlog - Tarcisio Bispo | UX Designer",
            description: "Practical demonstration of how I transform business challenges into measurable UX solutions. Applied methodology, achieved results, and strategic insights."
          },
          contact: {
            title: "Contact - Tarcisio Bispo | UX Designer",
            description: "Get in touch to discuss projects, partnerships or opportunities. Available for freelance projects and full-time opportunities."
          }
        }
      },
      schema: {
        person: {
          name: "Tarcisio Bispo de Araujo",
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
          languageChanged: "Language changed",
          soundEnabled: "Sound enabled",
          soundDisabled: "Sound disabled",
          soundEnabledDesc: "Audio feedback is now active",
          soundDisabledDesc: "Audio feedback is now muted"
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
          photo: "Tarcisio Bispo profile photo",
          ixdfLogo: "Interaction Design Foundation logo",
          ixdfSeal: "IxDF certification seal"
        },
        projects: {
          fgvLaw: "FGV LAW project screenshot - designers working as a team in the office",
          direitoGV: "FGV Law Research project screenshot - wooden table with book in front of bookshelf",
          taliparts: "Taliparts project screenshot - automotive parts e-commerce",
          tvInstitucional: "FGV Institutional TV project screenshot - white sign hanging on the side of a building"
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
      },
      footer: {
        copyright: "© 2024 Tarcisio Bispo. All rights reserved.",
        title: "UX/Product Designer"
      },
      projectDetails: {
        fgvLaw: {
          title: "FGV LAW - UX Restructuring",
          shortDescription: "Restructuring of Direito GV legal courses area with focus on usability and information organization to improve user experience.",
          sections: {
            challenge: {
              title: "The Challenge: Disorganized Information Architecture",
              content: "The person responsible for FGV Law portal contacted me reporting a drop in enrollments and high abandonment rate in the course search process.",
              quote: "\"Students say the site has everything, but nobody finds anything.\" – FGV Law portal manager",
              result: "This scenario resulted in confusion, rework and overload on the administrative team."
            },
            discovery: {
              title: "Discovery: Diagnosis and Flow Analysis",
              content: "My starting point was to analyze navigation behavior reports and conduct direct conversations with the manager and some postgraduate students.",
              analysis: "The analysis revealed clear bottlenecks:",
              bottlenecks: [
                "Lack of coherent thematic grouping.",
                "Redundant steps in the path to enrollment.",
                "Confusing information hierarchy, with excessive clicks."
              ],
              conclusion: "From this diagnosis, I drew the current flow (as-is) and identified the friction points between user expectation and reality."
            },
            solution: {
              title: "Solution: New Structure and Thematic Wireframes",
              content: "Based on the evidence, I proposed a complete reorganization of the information architecture.",
              actions: "Among the main actions:",
              actionList: [
                "Creation of a tab system to organize sections progressively.",
                "Redefinition of visual hierarchy with focus on clarity and scannability.",
                "Creation of wireframes presenting the new navigation logic and enrollment flows."
              ],
              validation: "This new foundation was validated with the manager and adjusted after specific feedback from students."
            },
            iteration: {
              title: "Iteration and Evolution",
              content: "After delivery, the proposal served as the foundation for subsequent portal versions.",
              consolidation: "These iterations consolidated a cleaner, more consistent and coherent language."
            },
            results: {
              title: "Results",
              content: "Although it was not possible to measure specific quantitative results, the internal feedback was clear:",
              resultList: [
                "Perceptible reduction in recurring questions and administrative team overload.",
                "Better understanding of course offerings and enrollment process steps.",
                "Smoother and more intuitive navigation, with positive experience reported by students and the responsible team."
              ]
            },
            insights: {
              title: "Insights",
              content: "The clarity of the structure is the starting point for user confidence."
            }
          }
        },
        tvInstitucional: {
          title: "FGV Institutional TV - Service Design",
          shortDescription: "Implementation of a visual communication system for TVs in FGV's hall to communicate events and institutional updates in an attractive and dynamic way.",
          sections: {
            overview: {
              title: "Overview: The Interface of the Environment",
              content: "I developed a visual communication system for the TVs in FGV's hall.",
              quote: "Physical environments are also interfaces. When well designed, they inform, engage and connect — without needing login."
            },
            process: {
              title: "My Service Design Process",
              ethnographic: {
                title: "1. Ethnographic and Field Research",
                content: "I spent days in the institution's hall, observing people's flow.",
                imageAlt: "Heat map showing the main circulation and stopping points of students in the hall."
              },
              journey: {
                title: "2. Journey Mapping and Touchpoints",
                content: "I mapped the student's journey within the physical space."
              },
              prototyping: {
                title: "3. Prototyping and Content Curation",
                content: "I created a prototype of the system using a simple slideshow on a TV.",
                imageAlt: "Mosaic with different templates for events, notices and news."
              },
              testing: {
                title: "4. Testing and Iteration",
                content: "To measure engagement, I used a simple tactic: I added QR Codes to event announcements."
              }
            },
            results: {
              title: "Results: From Ignorance to Engagement",
              metrics: [
                { value: "+300%", label: "increase in event visibility (measured by QR Code)" },
                { value: "+40%", label: "increase in participation in campus events" },
                { value: "9/10", label: "student satisfaction score with the new channel" }
              ]
            }
          }
        },
        taliparts: {
          title: "TALIPARTS - UX & Business Research",
          shortDescription: "Strategic research and product validation for entry into Mercado Livre, with focus on rapid learning and risk reduction.",
          sections: {
            challenge: {
              title: "The Challenge: Selling Digitally with Low Risk",
              content: "Taliparts, a traditional auto parts distributor, wanted to enter Mercado Livre."
            },
            strategy: {
              title: "My Lean Research Strategy",
              competitive: {
                title: "1. Competitive and Market Analysis",
                content: "I started with a deep analysis of the 5 largest auto parts sellers on Mercado Livre.",
                imageAlt: "SWOT Analysis diagram of the main competitors on Mercado Livre."
              },
              personas: {
                title: "2. Persona Definition",
                content: "Based on automotive forums and analysis of competitor ad questions."
              },
              validation: {
                title: "3. Validation with Ghost Ads",
                content: "To validate demand without buying inventory, I created 10 \"ghost\" ads."
              },
              seo: {
                title: "4. SEO Optimization for Marketplace",
                content: "With validated products, I focused on optimizing each ad for maximum SEO performance.",
                beforeAlt: "Example of generic ad title.",
                afterAlt: "Example of SEO-optimized title."
              }
            },
            results: {
              title: "Results and Next Steps",
              metrics: [
                { value: "Top 10", label: "in 60% of ads for target keywords" },
                { value: "+150%", label: "CTR compared to category average" },
                { value: "80%", label: "of validated products reached break-even in 45 days" }
              ]
            }
          }
        },
        direitoGV: {
          title: "Direito GV - Research and Architecture",
          shortDescription: "Analysis and improvement of information architecture for Direito GV's course area, with focus on corporate user experience.",
          sections: {
            overview: {
              title: "Research Project Overview",
              content: "I acted in the research and discovery phase that founded the portal redesign project.",
              imageAlt: "Double Diamond diagram highlighting the Discovery and Definition phase."
            },
            process: {
              title: "My Diagnostic Process",
              heuristic: {
                title: "1. Heuristic Analysis",
                content: "I started with a complete heuristic evaluation of the portal interface."
              },
              stakeholders: {
                title: "2. Stakeholder Interviews",
                content: "I conducted meetings with 5 key stakeholders."
              },
              journey: {
                title: "3. As-Is User Journey Mapping",
                content: "I mapped the complete journey of a student trying to enroll in a course.",
                imageAlt: "Detailed user journey map."
              }
            },
            deliverables: {
              title: "Deliverables and Recommendations",
              content: "The result of this research phase was a detailed diagnostic report.",
              deliverablesList: [
                "UX Diagnostic Report: Document with all usability problems found.",
                "Information Architecture Recommendation: Proposal for a new category structure.",
                "Implementation Roadmap: Suggestion for a phased action plan."
              ]
            }
          }
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
        openFeedback: "Open feedback",
        send: "Send feedback",
        sending: "Sending...",
        back: "Back",
        minimumCharacters: "Minimum 5 characters",
        includeEmail: "Include my email for response",
        privacyPolicy: "Privacy Policy",
        defaultTitle: "Share your feedback",
        defaultInstruction: "Tell us what you think",
        defaultPlaceholder: "Type your message here...",
        problem: "Report problem",
        idea: "Share idea",
        praise: "Send praise",
        problemTitle: "Report a problem",
        ideaTitle: "Share an idea",
        praiseTitle: "Send praise",
        problemInstruction: "Describe the problem you found",
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
          success: "🎉 Thank you for your feedback! Your opinion is very important to improve the experience.",
          error: "❌ Oops! We couldn't send your feedback. Please try again or contact directly.",
          messageRequired: "Message is required"
        },
        types: {
          bug: "Report bug",
          suggestion: "Suggestion",
          compliment: "Compliment",
          other: "Other"
        }
      },
      cookies: {
        title: "This site uses cookies",
        description: "We use cookies to improve your experience, analyze site traffic and personalize content.",
        learnMore: "Learn more",
        acceptAll: "Accept all",
        acceptNecessary: "Only necessary",
        customize: "Customize",
        savePreferences: "Save preferences",
        required: "Required",
        preferences: {
          title: "Cookie Preferences"
        },
        types: {
          necessary: {
            title: "Necessary Cookies",
            description: "These cookies are essential for the website to function and cannot be disabled."
          },
          analytics: {
            title: "Analytics Cookies",
            description: "Help us understand how visitors interact with the site by collecting information anonymously.",
            providers: "Providers"
          },
          marketing: {
            title: "Marketing Cookies",
            description: "Used to track visitors across websites to display relevant and engaging ads."
          }
        }
      },
      common: {
        close: "Close"
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
        home: "Inicio",
        goToProfile: "Ir a la sección Perfil",
        goToProjetos: "Ir a la sección Proyectos",
        goToBacklog: "Ir a la sección Backlog",
        goToContato: "Ir a la sección Contacto"
      },
      profile: {
        title: "UX/Product Designer enfocado en estrategia, impacto y experiencia",
        bio: "Soy UX/Product Designer con amplia experiencia en el diseño de productos digitales enfocados en experiencia del usuario, conversión e impacto empresarial. Con formación en Marketing Digital, SEO e IA, integro estrategia, diseño y usabilidad en procesos continuos de mejora e innovación.",
        exploreProjects: "Explorar proyectos",
        letsChat: "Conversemos",
        downloadCV: "Descargar CV",
        linkedin: "LinkedIn",
        name: "Tarcisio Bispo de Araujo",
        ixdf: "IxDF | Interaction Design Foundation",
        greeting: "Hola, soy"
      },
      projects: {
        title: "Proyectos",
        description: "Casos reales de UX/Product Design enfocados en estrategia, impacto y resultados medibles para negocios y usuarios.",
        overview: "Resumen",
        discovery: "Descubrimiento",
        solution: "Solución",
        iteration: "Iteración",
        outcomes: "Resultados",
        insights: "Insights",
        seeMore: "Ver detalles",
        seeLess: "Ocultar detalles",
        seeResults: "Ver resultados",
        projectImage: "Imagen del proyecto",
        badges: {
          usability: "Usabilidad",
          informationArchitecture: "Arquitectura de la Información",
          userTesting: "Pruebas de Usuario",
          uxResearch: "UX Research",
          journeyMapping: "Mapeo de Jornada",
          stakeholderManagement: "Gestión de Stakeholders",
          productStrategy: "Estrategia de Producto",
          seo: "SEO",
          productValidation: "Validación de Producto",
          visualDesign: "Diseño Visual",
          communication: "Comunicación",
          engagement: "Engagement"
        },
        fgvLaw: {
          title: "FGV LAW",
          category: "Navegación y Usabilidad",
          overview: "Reestructuración del área de cursos jurídicos de Direito GV con enfoque en usabilidad y organización de la información para mejorar la experiencia del usuario.",
          discovery: "Identifiqué que los usuarios tenían dificultades para localizar y comparar cursos en la plataforma de Direito GV.",
          solution: "Diseñé un nuevo panel con sistema de pestañas y filtros temáticos específicos para el contexto jurídico.",
          iteration: "Después de pruebas con usuarios, simplificamos la terminología de los filtros y ajustamos la jerarquía de información.",
          outcomes: [
            "Mejora del 25% en la visibilidad de cursos y 35% más interacciones con páginas específicas en 3 meses",
            "Aumento del 18% en la tasa de conversión de visitas a inscripciones, pasando de aproximadamente 8% a 10%",
            "Reducción del 30% en el tiempo promedio de navegación, de cerca de 4 minutos a 3 minutos hasta la selección del curso"
          ],
          insights: "La estructura de navegación necesita guiar, no solo mostrar. La claridad y agrupación relevante influyen directamente en la percepción del valor de un curso."
        },
        direitoGV: {
          title: "Investigación Derecho FGV",
          category: "Mapas, Flujos e Investigación",
          overview: "Reorganización del área de investigación para mejorar visibilidad de proyectos académicos y facilitar acceso a investigadores.",
          discovery: "El área de investigación estaba fragmentada y era poco accesible. Los investigadores tenían dificultades para promocionar su trabajo y usuarios externos no encontraban información relevante sobre proyectos en curso.",
          solution: "Desarrollé una nueva arquitectura de información con categorización por áreas temáticas, perfiles de investigadores y cronología de proyectos. También creé un sistema de búsqueda avanzada.",
          iteration: "Realizamos pruebas con estudiantes, profesores e investigadores. La navegación se ajustó basándose en feedback sobre nomenclatura y orden de prioridad. Validé cada cambio con stakeholders involucrados.",
          outcomes: [
            "Reducción del 65% en el tiempo de navegación para encontrar proyectos específicos, de aproximadamente 6 minutos a 2 minutos",
            "Aumento del 85% en visitas a páginas de investigadores, pasando de cerca de 150 a más de 280 visitas mensuales",
            "Crecimiento del 40% en consultas de publicaciones académicas y 25% más solicitudes de colaboración en 5 meses"
          ],
          insights: "Las áreas institucionales ganan relevancia cuando son navegables, actualizadas y estratégicamente reflejadas en la arquitectura de información."
        },
        taliparts: {
          title: "Taliparts",
          category: "UX Estratégico + B2B",
          overview: "Estructuración y validación digital de Taliparts para publicación de autopartes en Mercado Libre con enfoque en aprendizaje rápido.",
          discovery: "Realicé benchmark detallado con competidores del sector automotriz. Entrevisté mecánicos y propietarios de talleres, modelé personas y apliqué Matriz CSD para identificar certezas, suposiciones y dudas en el catálogo físico.",
          solution: "Creé una estrategia de validación con SEO para Mercado Libre, estandarización visual de anuncios, categorización centrada en vocabulario del comprador e historial de búsqueda. También organicé KPIs y definí plan de priorización de productos.",
          iteration: "Probé productos por bloques temáticos, monitoreando clics, preguntas y tasa de conversión. Refiné descripciones, títulos e incluso selección de ítems basándome en rendimiento real.",
          outcomes: [
            "Crecimiento del 45% en ventas de productos priorizados, generando aproximadamente R$ 6.500 en ingresos adicionales en 4 meses",
            "Reducción del 40% en dudas del comprador, disminuyendo de cerca de 20 a 12 preguntas por producto publicado",
            "Creación de proceso que aumentó la eficiencia de publicación en 50%, permitiendo análisis de más de 80 productos en 2 meses"
          ],
          insights: "La validación digital a bajo costo es posible — y necesaria. La lógica del producto necesita considerar contexto físico, vocabulario técnico y diferenciales percibidos por el cliente."
        },
        tvInstitucional: {
          title: "FGV TV Institucional",
          category: "Engagement y Comunicación Visual",
          overview: "Sistema visual para TVs en el hall de FGV para comunicar eventos y actualizaciones institucionales de manera atractiva y dinámica.",
          discovery: "Los estudiantes ignoraban carteleras físicas y emails institucionales. Identifiqué que el lenguaje de los canales estaba desactualizado y mal integrado con la rutina visual de los espacios.",
          solution: "Implementé un panel digital con curación semanal de contenido, enfoque en ritmo visual y claridad inmediata del mensaje. La plataforma fue diseñada para ser automatizada, con flexibilidad de actualización remota.",
          iteration: "Probamos tipos de animación, tiempo de exhibición y contraste. Ajustamos el calendario visual y optimizamos layout basándose en feedback de estudiantes y coordinación.",
          outcomes: [
            "Aumento del 35% en la visibilidad de eventos institucionales, mejorando el conocimiento de los estudiantes sobre actividades del campus",
            "Crecimiento del 20% en la participación en eventos, con mayor compromiso de la comunidad académica",
            "Mejora del 40% en la retención de información institucional comparado con métodos anteriores de comunicación"
          ],
          insights: "Los ambientes físicos también son interfaces. Cuando están bien diseñados, informan, involucran y conectan — sin necesidad de login."
        }
      },
      backlog: {
        title: "Ciclo de Backlog Estratégico",
        description: "Demostración práctica de cómo transformo desafíos empresariales en soluciones UX medibles. Cada caso presenta metodología aplicada, resultados alcanzados e insights estratégicos que generan impacto real para stakeholders y usuarios.",
        solution: "Solución",
        result: "Resultado",
        note: "Nota",
        noItems: "No hay elementos en esta página.",
        previous: "Anterior",
        next: "Siguiente",
        page: "Página",
        of: "de",
        items: [
          {
            "challenge": "FGV necesitaba aumentar la visibilidad de cursos, conferencias y actualizaciones institucionales.",
            "solution": "La solución fue implementar un panel digital estratégico en el hall de la institución, con curaduría de contenido y actualización automatizada.",
            "result": "Aumento del 72% en el engagement presencial y mayor percepción institucional.",
            "note": "Entendí que para comunicar con eficiencia en ambientes físicos, el contenido necesita ser pensado como una interfaz viva: ritmo visual, relevancia contextual y claridad inmediata hacen toda la diferencia en la atención y retención de mensajes."
          },
          {
            "challenge": "Los usuarios de DIREITO FGV tenían dificultades para localizar documentos y contenido relevante dentro del portal académico.",
            "solution": "Rediseño de la experiencia de navegación enfocándose en características valoradas por el público corporativo y simplificación del proceso de cotización.",
            "result": "Aumento del 27% en conversiones de cotizaciones y reducción del 40% en el abandono del journey de compra.",
            "note": "Me di cuenta de que mapear objetivos del usuario tiene más valor que seguir estructuras institucionales fijas."
          },
          {
            "challenge": "El área de cursos de FGV LAW presentaba dificultades en la organización de contenidos, dificultando la navegación e impactando la visibilidad de los programas.",
            "solution": "Estructuré un nuevo panel con filtros segmentados y sistema de pestañas, reorganizando la jerarquía de información con enfoque en escaneabilidad y journey de decisión del usuario.",
            "result": "Hubo un aumento significativo en la visibilidad de cursos y en la conversión de accesos a interacciones con páginas específicas, además de mayor claridad percibida por los usuarios.",
            "note": "Comprendí que al lidiar con gran volumen de opciones, el diseño de información necesita facilitar la toma de decisiones — no solo mostrar contenido, sino organizar la elección con lógica y contexto."
          },
          {
            "challenge": "Taliparts necesitaba validar qué productos serían más competitivos en Mercado Libre.",
            "solution": "Conduje un benchmark detallado con análisis de competencia, posicionamiento y evaluaciones de productos similares.",
            "result": "La curaduría inicial de productos tuvo mayor índice de visualización e interés ya en la primera semana de divulgación.",
            "note": "Analizar el terreno competitivo con profundidad es esencial antes de cualquier exposición de marca en canal abierto."
          },
          {
            "challenge": "Faltaba claridad sobre quién era el público objetivo real de Taliparts.",
            "solution": "Modelé personas basándome en entrevistas con comerciantes, mecánicos y compradores autónomos.",
            "result": "Definimos tres perfiles estratégicos que orientaron desde la elección de producto hasta el tono de comunicación.",
            "note": "Persona es más que un arquetipo — es la lente a través de la cual se interpreta todo el negocio."
          },
          {
            "challenge": "En Taliparts los títulos y descripciones de los anuncios en Mercado Libre no estaban optimizados para SEO en Mercado Libre.",
            "solution": "Reestructuré los títulos basándome en prácticas de SEO específicas para marketplaces y probé descripciones con palabras clave frecuentes.",
            "result": "Mejora significativa en el posicionamiento de ofertas y aumento de más del 20% en tráfico orgánico en 6 meses.",
            "note": "En el marketplace, SEO es tan importante como el precio — es lo que trae el clic."
          },
          {
            "challenge": "En Taliparts era necesario validar si los productos publicados realmente tenían demanda real.",
            "solution": "Estructuré un plan de validación basado en métricas de clics, preguntas de compradores y comparación con benchmarks.",
            "result": "Refinamos el catálogo basándose en performance, evitando stock parado y redirigiendo esfuerzos.",
            "note": "Probar pequeño y ajustar rápido es más eficiente que lanzar 100 productos a ciegas."
          },
          {
            "challenge": "En FGV algunas páginas tenían contenido institucional denso que alejaba a los usuarios de la lectura integral.",
            "solution": "Apliqué técnicas de UX writing (escaneabilidad, títulos objetivos, listas visuales) en las páginas clave.",
            "result": "El tiempo promedio de lectura aumentó y hubo caída en el abandono de página.",
            "note": "Pequeñas decisiones en el texto tienen gran impacto en la experiencia de lectura y comprensión."
          }
        ]
      },
      contact: {
        title: "¿Conversamos?",
        description: "Siempre estoy abierto a nuevas oportunidades y colaboraciones. Ponte en contacto para discutir proyectos, asociaciones o simplemente intercambiar ideas sobre UX y diseño de productos.",
        form: {
          name: "Nombre",
          namePlaceholder: "Ingresa tu nombre completo",
          email: "Email",
          emailPlaceholder: "Ingresa tu mejor email",
          subject: "Asunto",
          subjectPlaceholder: "¿De qué te gustaría hablar?",
          message: "Mensaje",
          messagePlaceholder: "Cuéntame sobre tu proyecto, oportunidad o cómo puedo ayudar...",
          messageHint: "Mínimo 10 caracteres para un mensaje claro",
          privacy: "Tus datos no serán compartidos y solo se usarán para responder tu mensaje.",
          send: "Enviar mensaje",
          sending: "Enviando...",
          success: "🎉 ¡Gracias por tu mensaje! Te responderé pronto. Tu contacto es muy importante para mí.",
          error: "❌ ¡Ups! No pude enviar tu mensaje. Intenta de nuevo o contáctame directamente a tbisp0@hotmail.com.",
          nameRequired: "El nombre es obligatorio",
          nameMinLength: "El nombre debe tener al menos 2 caracteres",
          emailRequired: "El email es obligatorio",
          emailInvalid: "Email inválido",
          subjectRequired: "El asunto es obligatorio",
          messageRequired: "El mensaje es obligatorio",
          messageMinLength: "El mensaje debe tener al menos 10 caracteres"
        },
        info: {
          email: "tbisp0@hotmail.com",
          location: "São Paulo, Brasil",
          availability: "Disponible para proyectos freelance y oportunidades full-time"
        },
        social: {
          linkedin: "LinkedIn",
          whatsapp: "WhatsApp",
          email: "Email"
        }
      },
      accessibility: {
        title: "Accesibilidad",
        subtitle: "Personaliza tu experiencia de navegación",
        description: "Configura opciones de accesibilidad para mejorar tu experiencia.",
        instructions: "Usa las opciones a continuación para personalizar la interfaz.",
        shortcut: "Atajo: Shift + A",
        openMenu: "Abrir menú de accesibilidad",
        closeMenu: "Cerrar menú de accesibilidad",
        menuLabel: "Menú de Accesibilidad",
        menuTooltip: "Configuraciones de accesibilidad (Shift + A)",
        fontSize: {
          label: "Tamaño de fuente",
          increase: "Aumentar",
          decrease: "Disminuir",
          reset: "Resetear",
          increaseLabel: "Aumentar tamaño de fuente",
          decreaseLabel: "Disminuir tamaño de fuente",
          resetLabel: "Resetear tamaño de fuente"
        },
        contrast: {
          label: "Alto contraste",
          enable: "Activar alto contraste",
          disable: "Desactivar alto contraste",
          enabled: "Alto contraste activado",
          disabled: "Alto contraste desactivado"
        },
        dyslexia: {
          label: "Modo Dislexia",
          enable: "Activar modo dislexia",
          disable: "Desactivar modo dislexia",
          enabled: "Modo dislexia activado",
          disabled: "Modo dislexia desactivado",
          options: {
            off: "Apagado",
            weak: "Leve",
            medium: "Medio",
            strong: "Fuerte"
          },
          status: {
            active: "Modo Dislexia {{intensity}} Activo",
            example: "Texto de ejemplo:",
            exampleText: "Este texto debe cambiar cuando actives el modo dislexia arriba."
          }
        },
        reset: {
          label: "Resetear configuraciones",
          action: "Configuraciones de accesibilidad reseteadas",
          success: "Configuraciones reseteadas con éxito"
        },
        features: {
          fontSize: "Tamaño de fuente",
          fontSizeIncrease: "Aumentar fuente",
          fontSizeDecrease: "Disminuir fuente",
          fontSizeReset: "Resetear fuente",
          highContrast: "Alto contraste",
          keyboardNavigation: "Navegación por teclado",
          screenReader: "Lector de pantalla",
          readPage: "Leer página completa",
          stopReading: "Parar lectura",
          readElement: "Leer elemento",
          skipToContent: "Saltar al contenido principal",
          skipToNavigation: "Saltar a navegación"
        },
        status: {
          enabled: "Activado",
          disabled: "Desactivado",
          fontIncreased: "Fuente aumentada",
          fontDecreased: "Fuente disminuida",
          fontReset: "Fuente reseteada",
          contrastEnabled: "Alto contraste activado",
          contrastDisabled: "Alto contraste desactivado",
          readingEnabled: "Modo lectura activado",
          readingDisabled: "Modo lectura desactivado"
        }
      },
      tooltips: {
        theme: {
          light: "Cambiar a modo claro",
          dark: "Cambiar a modo oscuro",
          system: "Usar preferencia del sistema"
        },
        sound: {
          enable: "Activar sonido",
          disable: "Desactivar sonido"
        },
        language: {
          switch: "Cambiar idioma",
          current: "Idioma actual",
          available: "Idiomas disponibles"
        },
        navigation: {
          home: "Ir al inicio",
          profile: "Ir al perfil",
          projects: "Ver proyectos",
          backlog: "Ver backlog estratégico",
          contact: "Ponerse en contacto"
        },
        social: {
          linkedin: "Perfil de LinkedIn",
          email: "Enviar email",
          whatsapp: "Chatear en WhatsApp"
        },
        actions: {
          expand: "Expandir detalles",
          collapse: "Contraer detalles",
          download: "Descargar archivo",
          share: "Compartir",
          copy: "Copiar enlace",
          print: "Imprimir página",
          backToTop: "Volver arriba"
        }
      },
      seo: {
        title: "Tarcisio Bispo - UX/Product Designer | Portfolio",
        description: "UX/Product Designer especializado en estrategia, impacto y experiencia del usuario. Ve mis proyectos de diseño de productos digitales y soluciones UX.",
        keywords: "UX Designer, Product Designer, Diseño de Producto, Experiencia del Usuario, UI/UX, Portfolio, São Paulo",
        author: "Tarcisio Bispo de Araujo",
        pages: {
          home: {
            title: "Tarcisio Bispo - UX/Product Designer | Portfolio",
            description: "UX/Product Designer enfocado en estrategia, impacto y experiencia del usuario. Experto en diseño de productos digitales, conversión e impacto empresarial."
          },
          projects: {
            title: "Proyectos - Tarcisio Bispo | UX Designer",
            description: "Ve mis principales proyectos de UX/Product Design: FGV LAW, Direito GV, Taliparts y FGV TV Institucional. Casos reales con resultados medibles."
          },
          backlog: {
            title: "Backlog Estratégico - Tarcisio Bispo | UX Designer",
            description: "Demostración práctica de cómo transformo desafíos empresariales en soluciones UX medibles. Metodología aplicada, resultados alcanzados e insights estratégicos."
          },
          contact: {
            title: "Contacto - Tarcisio Bispo | UX Designer",
            description: "Ponte en contacto para discutir proyectos, asociaciones u oportunidades. Disponible para proyectos freelance y oportunidades full-time."
          }
        }
      },
      schema: {
        person: {
          name: "Tarcisio Bispo de Araujo",
          jobTitle: "UX/Product Designer",
          description: "UX/Product Designer especializado en estrategia, impacto y experiencia del usuario",
          location: "São Paulo, Brasil",
          email: "tbisp0@hotmail.com",
          skills: ["UX Design", "Product Design", "Estrategia de Diseño", "Investigación de Usuario", "Prototipado", "Pruebas de Usabilidad"]
        },
        organization: {
          name: "Tarcisio Bispo Portfolio",
          description: "Portfolio profesional de UX/Product Design",
          location: "São Paulo, Brasil"
        }
      },
      toasts: {
        success: {
          title: "¡Éxito!",
          messageSent: "¡Mensaje enviado con éxito!",
          settingsSaved: "Configuraciones guardadas",
          linkCopied: "Enlace copiado al portapapeles",
          themeChanged: "Tema cambiado",
          languageChanged: "Idioma cambiado",
          soundEnabled: "Sonido activado",
          soundDisabled: "Sonido desactivado",
          soundEnabledDesc: "Retroalimentación de audio ahora activa",
          soundDisabledDesc: "Retroalimentación de audio ahora silenciada"
        },
        error: {
          title: "Error",
          messageNotSent: "Error al enviar mensaje",
          networkError: "Error de conexión",
          genericError: "Algo salió mal",
          tryAgain: "Intenta de nuevo"
        },
        info: {
          title: "Información",
          loading: "Cargando...",
          processing: "Procesando...",
          saving: "Guardando..."
        },
        warning: {
          title: "Advertencia",
          unsavedChanges: "Tienes cambios no guardados",
          confirmAction: "¿Estás seguro de que quieres continuar?"
        }
      },
      alts: {
        profile: {
          photo: "Foto de perfil de Tarcisio Bispo",
          ixdfLogo: "Logo de Interaction Design Foundation",
          ixdfSeal: "Sello de certificación IxDF"
        },
        projects: {
          fgvLaw: "Captura de pantalla del proyecto FGV LAW - diseñadores trabajando en equipo en la oficina",
          direitoGV: "Captura de pantalla del proyecto Investigación Derecho FGV - mesa de madera con libro frente a estantería",
          taliparts: "Captura de pantalla del proyecto Taliparts - e-commerce de autopartes",
          tvInstitucional: "Captura de pantalla del proyecto FGV TV Institucional - cartel blanco colgado en el lateral de un edificio"
        },
        icons: {
          menu: "Ícono de menú",
          close: "Ícono de cerrar",
          expand: "Ícono de expandir",
          collapse: "Ícono de contraer",
          external: "Ícono de enlace externo",
          download: "Ícono de descarga",
          email: "Ícono de email",
          phone: "Ícono de teléfono",
          location: "Ícono de ubicación",
          linkedin: "Ícono de LinkedIn",
          github: "Ícono de GitHub",
          sun: "Ícono de sol (modo claro)",
          moon: "Ícono de luna (modo oscuro)",
          globe: "Ícono de globo (idiomas)",
          accessibility: "Ícono de accesibilidad",
          loading: "Ícono de carga",
          success: "Ícono de éxito",
          error: "Ícono de error",
          warning: "Ícono de advertencia",
          info: "Ícono de información"
        },
        decorative: {
          gradient: "Gradiente decorativo",
          pattern: "Patrón decorativo",
          divider: "Divisor visual",
          background: "Imagen de fondo decorativa"
        }
      },
      language: {
        changed: "Idioma cambiado con éxito",
        current: "Idioma actual",
        available: "Idiomas disponibles",
        portuguese: "Português",
        english: "English",
        spanish: "Español",
        select: "Seleccionar idioma"
      },
      theme: {
        changed: "Tema cambiado con éxito",
        light: "Modo claro activado",
        dark: "Modo oscuro activado",
        system: "Usando preferencia del sistema"
      },
      footer: {
        copyright: " 2024 Tarcisio Bispo. Todos los derechos reservados.",
        title: "UX/Product Designer"
      },
      projectDetails: {
        fgvLaw: {
          title: "FGV LAW - Reestructuración UX",
          shortDescription: "Reestructuración del área de cursos jurídicos de Direito GV con enfoque en usabilidad y organización de la información para mejorar la experiencia del usuario.",
          sections: {
            challenge: {
              title: "El Desafío: Arquitectura de Información Desorganizada",
              content: "La responsable del portal de FGV Law se contactó reportando caída en las inscripciones y alta tasa de abandono en el proceso de búsqueda de cursos.",
              quote: "\"Los alumnos dicen que el sitio tiene todo, pero nadie encuentra nada.\" – Responsable del portal de FGV Law",
              result: "Este escenario resultaba en confusión, retrabajo y sobrecarga del equipo administrativo."
            },
            discovery: {
              title: "Descubrimiento: Diagnóstico y Análisis de Flujo",
              content: "Mi punto de partida fue analizar los informes de comportamiento de navegación y realizar conversaciones directas con la responsable y algunos alumnos de posgrado.",
              analysis: "El análisis reveló cuellos de botella claros:",
              bottlenecks: [
                "Falta de agrupamiento temático coherente.",
                "Etapas redundantes en el camino hacia la inscripción.",
                "Jerarquía de información confusa, con exceso de clics."
              ],
              conclusion: "A partir de este diagnóstico, dibujé el flujo actual (as-is) e identifiqué los puntos de fricción entre expectativa y realidad del usuario."
            },
            solution: {
              title: "Solución: Nueva Estructura y Wireframes Temáticos",
              content: "Basado en la evidencia, propuse una reorganización completa de la arquitectura de información.",
              actions: "Entre las principales acciones:",
              actionList: [
                "Creación de un sistema de pestañas para organizar las secciones de forma progresiva.",
                "Redefinición de la jerarquía visual con enfoque en claridad y escaneabilidad.",
                "Creación de wireframes presentando la nueva lógica de navegación y los flujos de inscripción."
              ],
              validation: "Esta nueva base fue validada con la responsable y ajustada después de feedbacks puntuales de alumnos."
            },
            iteration: {
              title: "Iteración y Evolución",
              content: "Después de la entrega, la propuesta sirvió como fundamento para las versiones siguientes del portal.",
              consolidation: "Estas iteraciones consolidaron un lenguaje más limpio, consistente y coherente."
            },
            results: {
              title: "Resultados",
              content: "Aunque no fue posible medir resultados cuantitativos específicos, los retornos internos fueron claros:",
              resultList: [
                "Reducción perceptible de dudas recurrentes y de sobrecarga del soporte.",
                "Mejor comprensión de la oferta de cursos y de las etapas del proceso selectivo.",
                "Navegación más fluida e intuitiva, con experiencia positiva reportada por alumnos y por el equipo responsable."
              ]
            },
            insights: {
              title: "Insights",
              content: "La claridad de la estructura es el punto de partida para la confianza del usuario."
            }
          }
        },
        tvInstitucional: {
          title: "TV Institucional - Service Design",
          shortDescription: "Implementación de un sistema de comunicación visual para TVs en el hall de FGV para comunicar eventos y actualizaciones institucionales de manera atractiva y dinámica.",
          sections: {
            overview: {
              title: "Visión General: La Interfaz del Ambiente",
              content: "Desarrollé un sistema de comunicación visual para las TVs en el hall de FGV.",
              quote: "Los ambientes físicos también son interfaces. Cuando están bien diseñados, informan, involucran y conectan — sin necesidad de login."
            },
            process: {
              title: "Mi Proceso de Service Design",
              ethnographic: {
                title: "1. Investigación Etnográfica y de Campo",
                content: "Pasé días en el hall de la institución, observando el flujo de personas.",
                imageAlt: "Mapa de calor mostrando los principales puntos de circulación y parada de los alumnos en el hall."
              },
              journey: {
                title: "2. Mapeo de Jornada y Puntos de Contacto",
                content: "Mapeé la jornada del alumno dentro del espacio físico."
              },
              prototyping: {
                title: "3. Prototipado y Curaduría de Contenido",
                content: "Creé un prototipo del sistema usando un simple slideshow en una TV.",
                imageAlt: "Mosaico con diferentes templates para eventos, avisos y noticias."
              },
              testing: {
                title: "4. Pruebas e Iteración",
                content: "Para medir el engagement, usé una táctica simple: agregué códigos QR en los anuncios de eventos."
              }
            },
            results: {
              title: "Resultados: De la Ignorancia al Engagement",
              metrics: [
                { value: "+300%", label: "de aumento en la visibilidad de eventos (medido por QR Code)" },
                { value: "+40%", label: "de aumento en la participación en eventos del campus" },
                { value: "9/10", label: "nota de satisfacción de los alumnos con el nuevo canal" }
              ]
            }
          }
        },
        taliparts: {
          title: "TALIPARTS - UX & Business Research",
          shortDescription: "Investigación estratégica y validación de productos para entrada en Mercado Libre, con enfoque en aprendizaje rápido y reducción de riesgos.",
          sections: {
            challenge: {
              title: "El Desafío: Vender en Digital con Bajo Riesgo",
              content: "Taliparts, una distribuidora tradicional de autopartes, quería entrar en Mercado Libre."
            },
            strategy: {
              title: "Mi Estrategia de Investigación Lean",
              competitive: {
                title: "1. Análisis Competitivo y de Mercado",
                content: "Inicié con un análisis profundo de los 5 mayores vendedores de autopartes en Mercado Libre.",
                imageAlt: "Diagrama de Análisis FODA de los principales competidores en Mercado Libre."
              },
              personas: {
                title: "2. Definición de Personas",
                content: "Basado en foros de automóviles y en el análisis de preguntas de anuncios de competidores."
              },
              validation: {
                title: "3. Validación con Anuncios Fantasma",
                content: "Para validar la demanda sin comprar inventario, creé 10 anuncios \"fantasma\"."
              },
              seo: {
                title: "4. Optimización de SEO para Marketplace",
                content: "Con los productos validados, me enfoqué en optimizar cada anuncio para máxima performance de SEO.",
                beforeAlt: "Ejemplo de título de anuncio genérico.",
                afterAlt: "Ejemplo de título optimizado para SEO."
              }
            },
            results: {
              title: "Resultados y Próximos Pasos",
              metrics: [
                { value: "Top 10", label: "en 60% de los anuncios para palabras clave objetivo" },
                { value: "+150%", label: "de CTR comparado con el promedio de la categoría" },
                { value: "80%", label: "de los productos validados alcanzaron el punto de equilibrio en 45 días" }
              ]
            }
          }
        },
        direitoGV: {
          title: "Direito GV - Investigación y Arquitectura",
          shortDescription: "Análisis y mejora de la arquitectura de información para el área de cursos de Direito GV, con enfoque en la experiencia del usuario corporativo.",
          sections: {
            overview: {
              title: "Visión General del Proyecto de Investigación",
              content: "Actué en la fase de investigación y descubrimiento que fundamentó el proyecto de rediseño del portal.",
              imageAlt: "Diagrama del Doble Diamante destacando la fase de Descubrimiento y Definición."
            },
            process: {
              title: "Mi Proceso de Diagnóstico",
              heuristic: {
                title: "1. Análisis Heurístico",
                content: "Inicié con una evaluación heurística completa de la interfaz del portal."
              },
              stakeholders: {
                title: "2. Entrevistas con Stakeholders",
                content: "Conduje reuniones con 5 stakeholders clave."
              },
              journey: {
                title: "3. Mapeo de la Jornada del Usuario As-Is",
                content: "Mapeé la jornada completa de un alumno intentando inscribirse en un curso.",
                imageAlt: "Mapa detallado de la jornada del usuario."
              }
            },
            deliverables: {
              title: "Entregables y Recomendaciones",
              content: "El resultado de esta fase de investigación fue un informe detallado de diagnóstico.",
              deliverablesList: [
                "Informe de Diagnóstico de UX: Documento con todos los problemas de usabilidad encontrados.",
                "Recomendación de Arquitectura de Información: Propuesta de una nueva estructura de categorías.",
                "Roadmap de Implementación: Sugerencia de un plan de acción por fases."
              ]
            }
          }
        }
      },
      feedback: {
        title: "Feedback",
        subtitle: "Tu opinión importa",
        description: "Comparte tu experiencia y sugerencias",
        // ... (rest of the code remains the same)
        thankYou: "¡Gracias por tu feedback!",
        importance: "Tu opinión es muy importante para nosotros.",
        close: "Cerrar",
        openFeedback: "Abrir feedback",
        send: "Enviar feedback",
        sending: "Enviando...",
        back: "Volver",
        minimumCharacters: "Mínimo 5 caracteres",
        includeEmail: "Incluir mi email para respuesta",
        privacyPolicy: "Política de Privacidad",
        defaultTitle: "Comparte tu feedback",
        defaultInstruction: "Cuéntanos qué piensas",
        defaultPlaceholder: "Escribe tu mensaje aquí...",
        problem: "Reportar problema",
        idea: "Compartir idea",
        praise: "Enviar elogio",
        problemTitle: "Reportar un problema",
        ideaTitle: "Compartir una idea",
        praiseTitle: "Enviar un elogio",
        problemInstruction: "Describe el problema que encontraste",
        ideaInstruction: "Comparte tu sugerencia o idea",
        praiseInstruction: "Cuéntanos qué te gustó",
        problemPlaceholder: "Describe el problema en detalle...",
        ideaPlaceholder: "Comparte tu idea o sugerencia...",
        praisePlaceholder: "Cuéntanos qué te gustó...",
        form: {
          type: "Tipo de feedback",
          message: "Tu mensaje",
          email: "Tu email (opcional)",
          send: "Enviar feedback",
          sending: "Enviando...",
          success: "🎉 ¡Gracias por tu feedback! Tu opinión es muy importante para mejorar la experiencia.",
          error: "❌ ¡Ups! No pudimos enviar tu feedback. Intenta de nuevo o contacta directamente.",
          messageRequired: "El mensaje es obligatorio"
        },
        types: {
          bug: "Reportar bug",
          suggestion: "Sugerencia",
          compliment: "Elogio",
          other: "Otro"
        }
      },
      cookies: {
        title: "Este sitio usa cookies",
        description: "Usamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar contenido.",
        learnMore: "Saber más",
        acceptAll: "Aceptar todas",
        acceptNecessary: "Solo necesarias",
        customize: "Personalizar",
        savePreferences: "Guardar preferencias",
        required: "Obligatorio",
        preferences: {
          title: "Preferencias de Cookies"
        },
        types: {
          necessary: {
            title: "Cookies Necesarias",
            description: "Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar."
          },
          analytics: {
            title: "Cookies de Análisis",
            description: "Nos ayudan a entender cómo los visitantes interactúan con el sitio recopilando información de forma anónima.",
            providers: "Proveedores"
          },
          marketing: {
            title: "Cookies de Marketing",
            description: "Se utilizan para rastrear visitantes en sitios web para mostrar anuncios relevantes y atractivos."
          }
        }
      },
      common: {
        close: "Cerrar"
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
    debug: import.meta.env.DEV,
    
    // Garantir que os objetos são retornados corretamente
    returnObjects: true,
    
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
    // i18n initialized successfully - logs removed for production
    if (import.meta.env.DEV) {
      console.log('✅ i18n initialized successfully');
      console.log('🌐 Current language:', i18n.language);
    }
  })
  .catch((error) => {
    // Only log errors in development
    if (import.meta.env.DEV) {
      console.error('❌ Error initializing i18n:', error);
    }
  });

export default i18n;