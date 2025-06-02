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
        bio: "Sou UX/Product Designer com forte atuação no design de produtos digitais focados em experiência do usuário, conversão e impacto de negócio. Com background em Marketing Digital, SEO e IA, integro estratégia, design e usabilidade em processos contínuos de melhoria e inovação.",
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
            "Melhora de 25% na visibilidade dos cursos e 35% mais interações com páginas específicas em 3 meses",
            "Aumento de 18% na taxa de conversão de acessos em inscrições, passando de aproximadamente 8% para 10%",
            "Redução de 30% no tempo médio de navegação, de cerca de 4 minutos para 3 minutos até a escolha do curso"
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
            "Redução de 65% no tempo de navegação para encontrar projetos específicos, de aproximadamente 6 minutos para 2 minutos",
            "Aumento de 85% nas visitas às páginas de pesquisadores, passando de cerca de 150 para mais de 280 acessos mensais",
            "Crescimento de 40% na consulta de publicações acadêmicas e 25% mais solicitações de parcerias em 5 meses"
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
            "Crescimento de 45% nas vendas dos produtos priorizados, gerando aproximadamente R$ 6.500 em receita adicional em 4 meses",
            "Redução de 40% nas dúvidas dos compradores, diminuindo de cerca de 20 para 12 perguntas por produto publicado",
            "Criação de processo que aumentou a eficiência de publicação em 50%, permitindo análise de mais de 80 produtos em 2 meses"
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
            "Aumento de 35% na visibilidade de eventos institucionais, melhorando o conhecimento dos alunos sobre atividades do campus",
            "Crescimento de 20% na participação em eventos, com maior engajamento da comunidade acadêmica",
            "Melhora de 40% na retenção de informações institucionais comparado aos métodos anteriores de comunicação"
          ],
          insights: "Ambientes físicos também são interfaces. Quando bem projetados, informam, engajam e conectam — sem precisar de login."
        }
      },
      backlog: {
        title: "Ciclo de Backlogs Estratégicos",
        description: "Demonstração prática de como transformo desafios de negócio em soluções de UX mensuráveis. Cada caso apresenta metodologia aplicada, resultados alcançados e insights estratégicos que geram impacto real para stakeholders e usuários.",
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
            result: "Melhoria significativa no posicionamento das ofertas e aumento em mais de 20% no tráfego orgânico em 6 meses.",
            note: "No marketplace, SEO é tão importante quanto o preço — é ele quem traz o clique."
          },
          {
            challenge: "Na Taliparts era necessário validar se os produtos publicados realmente tinham demanda real.",
            solution: "Estruturei um plano de validação com base em métricas de cliques, perguntas de compradores e comparação com benchmarks.",
            result: "Refinamos o catálogo com base em performance, evitando estoque parado e redirecionando esforços.",
            note: "Testar pequeno e ajustar rápido é mais eficiente do que lançar 100 produtos no escuro."
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
        description: "Real UX/Product Design cases focused on strategy, impact and measurable results for business and users.",
        overview: "Overview",
        discovery: "Discovery",
        solution: "Solution",
        iteration: "Iteration",
        outcomes: "Outcomes",
        insights: "Insights",
        seeMore: "See details",
        seeLess: "Hide details",
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
            "25% improvement in course visibility and 35% more interactions with specific pages in 3 months",
            "18% increase in conversion rate from visits to enrollments, from approximately 8% to 10%",
            "30% reduction in average navigation time, from about 4 minutes to 3 minutes until course selection"
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
            "65% reduction in navigation time to find specific projects, from approximately 6 minutes to 2 minutes",
            "85% increase in visits to researcher pages, from about 150 to more than 280 monthly visits",
            "40% growth in academic publication consultations and 25% more partnership requests in 5 months"
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
            "45% growth in sales of prioritized products, generating approximately R$ 6,500 in additional revenue in 4 months",
            "40% reduction in buyer doubts, decreasing from about 20 to 12 questions per published product",
            "Process creation that increased publication efficiency by 50%, enabling analysis of more than 80 products in 2 months"
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
            "35% increase in institutional event visibility, improving students' knowledge about campus activities",
            "20% growth in event participation, with greater academic community engagement",
            "40% improvement in institutional information retention compared to previous communication methods"
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
        readingMode: {
          label: "Modo lectura",
          enable: "Activar modo lectura",
          disable: "Desactivar modo lectura",
          enabled: "Modo lectura activado",
          disabled: "Modo lectura desactivado"
        },
        screenReader: {
          label: "Lector de pantalla",
          enable: "Activar lector de pantalla",
          disable: "Desactivar lector de pantalla",
          enabled: "Lector de pantalla activado",
          disabled: "Lector de pantalla desactivado"
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
          readingMode: "Modo lectura",
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
        copyright: "© 2024 Tarcisio Bispo. Todos los derechos reservados.",
        title: "UX/Product Designer"
      },
      feedback: {
        title: "Feedback",
        subtitle: "Tu opinión importa",
        description: "Comparte tu experiencia y sugerencias",
        typeQuestion: "¿Qué tipo de feedback te gustaría compartir?",
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