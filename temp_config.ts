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
        home: "InÃ­cio",
        goToProfile: "Ir para sessÃ£o Perfil",
        goToProjetos: "Ir para sessÃ£o Projetos",
        goToBacklog: "Ir para sessÃ£o Backlog",
        goToContato: "Ir para sessÃ£o Contato"
      },
      profile: {
        title: "UX/Product Designer com foco em estratÃ©gia, impacto e experiÃªncia",
        bio: "Sou UX/Product Designer com forte atuaÃ§Ã£o no design de produtos digitais focados em experiÃªncia do usuÃ¡rio, conversÃ£o e impacto de negÃ³cio. Com background em Marketing Digital, SEO e IA, integro estratÃ©gia, design e usabilidade em processos contÃ­nuos de melhoria e inovaÃ§Ã£o.",
        exploreProjects: "Explore projetos",
        letsChat: "Vamos Conversar",
        downloadCV: "Download CV",
        linkedin: "LinkedIn",
        name: "Tarcisio Bispo de Araujo",
        ixdf: "IxDF | Interaction Design Foundation",
        greeting: "OlÃ¡, eu sou",
        jobTitle: "UX/Product Designer",
        location: "Campinas, SÃ£o Paulo",
        phone: "+55 (19) 9 9013-7380",
        role1: "UX Designer",
        role2: "Product Designer",
        role3: "Design Strategist",
        role4: "Interaction Designer"
      },
      projects: {
        title: "Projetos",
        description: "Casos reais de UX/Product Design com foco em estratÃ©gia, impacto e resultados mensurÃ¡veis para negÃ³cios e usuÃ¡rios.",
        overview: "VisÃ£o Geral",
        discovery: "Descoberta",
        solution: "SoluÃ§Ã£o",
        iteration: "IteraÃ§Ã£o",
        outcomes: "Resultados",
        insights: "Insights",
        seeMore: "Ver detalhes",
        seeLess: "Ocultar detalhes",
        projectImage: "Imagem do projeto",
        badges: {
          usability: "Usabilidade",
          informationArchitecture: "Arquitetura da InformaÃ§Ã£o",
          userTesting: "Testes de UsuÃ¡rio",
          uxResearch: "UX Research",
          journeyMapping: "Mapa de Jornada",
          stakeholderManagement: "Stakeholder Management",
          productStrategy: "Product Strategy",
          seo: "SEO",
          productValidation: "ValidaÃ§Ã£o de Produto",
          visualDesign: "Design Visual",
          communication: "ComunicaÃ§Ã£o",
          engagement: "Engajamento"
        },
        fgvLaw: {
          title: "Direito FGV â€“ ReestruturaÃ§Ã£o de UX",
          category: "NavegaÃ§Ã£o e Usabilidade",
          overview: "ReestruturaÃ§Ã£o da Ã¡rea de cursos jurÃ­dicos da Direito GV com foco em usabilidade e organizaÃ§Ã£o da informaÃ§Ã£o para melhorar a experiÃªncia dos usuÃ¡rios.",
          discovery: "Identifiquei que os usuÃ¡rios enfrentavam dificuldade para localizar e comparar cursos na plataforma da Direito GV.",
          solution: "Projetei um novo painel com sistema de abas e filtros temÃ¡ticos especÃ­ficos para o contexto jurÃ­dico.",
          iteration: "ApÃ³s testes com usuÃ¡rios, simplificamos a terminologia dos filtros e ajustamos a hierarquia de informaÃ§Ãµes.",
          outcomes: [
            "Melhora significativa na visibilidade dos cursos e aumento nas interaÃ§Ãµes com pÃ¡ginas especÃ­ficas",
            "Aumento na taxa de conversÃ£o de acessos em inscriÃ§Ãµes",
            "ReduÃ§Ã£o no tempo mÃ©dio de navegaÃ§Ã£o atÃ© a escolha do curso"
          ],
          insights: "A estrutura de navegaÃ§Ã£o precisa guiar, nÃ£o apenas mostrar. Clareza e agrupamento relevante influenciam diretamente a percepÃ§Ã£o de valor de um curso."
        },
        direitoGV: {
          title: "Pesquisa Direito FGV",
          category: "Mapas, Fluxos e Pesquisa",
          overview: "ReorganizaÃ§Ã£o da Ã¡rea de pesquisa para melhorar visibilidade dos projetos acadÃªmicos e facilitar acesso a pesquisadores.",
          discovery: "A Ã¡rea de pesquisa estava fragmentada e pouco acessÃ­vel. Pesquisadores tinham dificuldade para divulgar seus trabalhos e usuÃ¡rios externos nÃ£o conseguiam encontrar informaÃ§Ãµes relevantes sobre projetos em andamento.",
          solution: "Desenvolvi uma nova arquitetura de informaÃ§Ã£o com categorizaÃ§Ã£o por Ã¡reas temÃ¡ticas, perfis de pesquisadores e linha do tempo de projetos. Criei tambÃ©m um sistema de busca avanÃ§ada.",
          iteration: "Realizamos testes com alunos, professores e pesquisadores. A navegaÃ§Ã£o foi ajustada com base em feedback sobre nomenclatura e ordem de prioridades. Validei cada alteraÃ§Ã£o com os stakeholders envolvidos.",
          outcomes: [
            "ReduÃ§Ã£o significativa no tempo de navegaÃ§Ã£o para encontrar projetos especÃ­ficos",
            "Aumento expressivo nas visitas Ã s pÃ¡ginas de pesquisadores",
            "Crescimento na consulta de publicaÃ§Ãµes acadÃªmicas e mais solicitaÃ§Ãµes de parcerias"
          ],
          insights: "Ãreas institucionais ganham relevÃ¢ncia quando sÃ£o navegÃ¡veis, atualizadas e refletidas de forma estratÃ©gica na arquitetura da informaÃ§Ã£o."
        },
        taliparts: {
          title: "Taliparts",
          category: "UX EstratÃ©gico + B2B",
          overview: "EstruturaÃ§Ã£o e validaÃ§Ã£o digital da Taliparts para publicaÃ§Ã£o de peÃ§as automotivas no Mercado Livre com foco em aprendizado rÃ¡pido.",
          discovery: "Conduzi benchmark detalhado com concorrentes do setor automotivo. Entrevistei mecÃ¢nicos e lojistas, modelei personas e apliquei a Matriz CSD para identificar certezas, suposiÃ§Ãµes e dÃºvidas no catÃ¡logo fÃ­sico.",
          solution: "Criei uma estratÃ©gia de validaÃ§Ã£o com SEO para Mercado Livre, padronizaÃ§Ã£o visual de anÃºncios, categorizaÃ§Ã£o centrada no vocabulÃ¡rio do comprador e histÃ³rico de buscas. TambÃ©m organizei KPIs e defini plano de priorizaÃ§Ã£o de produtos.",
          iteration: "Testei produtos por blocos temÃ¡ticos, monitorando cliques, perguntas e taxa de conversÃ£o. Refinei descriÃ§Ãµes, tÃ­tulos e atÃ© a seleÃ§Ã£o de itens com base em performance real.",
          outcomes: [
            "Crescimento significativo nas vendas dos produtos priorizados estrategicamente",
            "ReduÃ§Ã£o expressiva nas dÃºvidas dos compradores por melhorias nas descriÃ§Ãµes",
            "CriaÃ§Ã£o de processo replicÃ¡vel que aumentou a eficiÃªncia de publicaÃ§Ã£o e anÃ¡lise de produtos"
          ],
          insights: "Validar digitalmente com baixo custo Ã© possÃ­vel â€” e necessÃ¡rio. A lÃ³gica de produto precisa considerar contexto fÃ­sico, vocabulÃ¡rio tÃ©cnico e diferenciais percebidos pelo cliente."
        },
        tvInstitucional: {
          title: "FGV TV Institucional",
          category: "Engajamento e ComunicaÃ§Ã£o Visual",
          overview: "Sistema visual para TVs no hall da FGV para comunicar eventos e atualizaÃ§Ãµes institucionais de forma atrativa e dinÃ¢mica.",
          discovery: "Alunos ignoravam murais fÃ­sicos e e-mails institucionais. Identifiquei que a linguagem dos canais era desatualizada e pouco integrada com a rotina visual dos espaÃ§os.",
          solution: "Implementei um painel digital com curadoria de conteÃºdo semanal, foco em ritmo visual e clareza imediata das mensagens. A plataforma foi pensada para ser automatizada, com flexibilidade de atualizaÃ§Ã£o remota.",
          iteration: "Testamos tipos de animaÃ§Ãµes, tempo de exibiÃ§Ã£o e contraste. Ajustamos o calendÃ¡rio visual e otimizamos o layout com base em feedback de alunos e coordenaÃ§Ã£o.",
          outcomes: [
            "Aumento significativo na visibilidade de eventos institucionais e conhecimento dos alunos sobre atividades do campus",
            "Crescimento expressivo na participaÃ§Ã£o em eventos com maior engajamento da comunidade acadÃªmica",
            "Melhora substancial na retenÃ§Ã£o de informaÃ§Ãµes institucionais comparado aos mÃ©todos anteriores"
          ],
          insights: "Ambientes fÃ­sicos tambÃ©m sÃ£o interfaces. Quando bem projetados, informam, engajam e conectam â€” sem precisar de login."
        }
      },
      backlog: {
        title: "Ciclo de Backlogs EstratÃ©gicos",
        description: "DemonstraÃ§Ã£o prÃ¡tica de como transformo desafios de negÃ³cio em soluÃ§Ãµes de UX mensurÃ¡veis. Cada caso apresenta metodologia aplicada, resultados alcanÃ§ados e insights estratÃ©gicos que geram impacto real para stakeholders e usuÃ¡rios.",
        solution: "SoluÃ§Ã£o",
        result: "Resultado",
        note: "Nota",
        noItems: "Nenhum item nesta pÃ¡gina.",
        previous: "Anterior",
        next: "PrÃ³xima",
        page: "PÃ¡gina",
        of: "de",
        items: [
          {
            challenge: "A FGV precisava aumentar a visibilidade de cursos, palestras e atualizaÃ§Ãµes institucionais.",
            solution: "A soluÃ§Ã£o foi implementar um painel digital estratÃ©gico no hall da instituiÃ§Ã£o, com curadoria de conteÃºdo e atualizaÃ§Ã£o automatizada.",
            result: "Aumento significativo do engajamento presencial e maior percepÃ§Ã£o institucional.",
            note: "Entendi que, para comunicar com eficiÃªncia em ambientes fÃ­sicos, o conteÃºdo precisa ser pensado como uma interface viva: ritmo visual, relevÃ¢ncia contextual e clareza imediata fazem toda a diferenÃ§a na atenÃ§Ã£o e retenÃ§Ã£o das mensagens."
          },
          {
            challenge: "UsuÃ¡rios da DIREITO FGV tinham dificuldade em localizar documentos e conteÃºdos relevantes dentro do portal acadÃªmico.",
            solution: "Redesenho da experiÃªncia de navegaÃ§Ã£o com foco em features valorizadas pelo pÃºblico corporativo e simplificaÃ§Ã£o do processo de cotaÃ§Ã£o.",
            result: "Aumento significativo nas conversÃµes de cotaÃ§Ãµes e reduÃ§Ã£o expressiva no abandono da jornada de compra.",
            note: "Percebi que mapear objetivos do usuÃ¡rio tem mais valor do que seguir estruturas institucionais fixas."
          },
          {
            challenge: "A Ã¡rea de cursos da FGV LAW apresentava dificuldade na organizaÃ§Ã£o dos conteÃºdos, dificultando a navegaÃ§Ã£o e impactando a visibilidade dos programas.",
            solution: "Estruturei um novo painel com filtros segmentados e sistema de abas, reorganizando a hierarquia das informaÃ§Ãµes com foco em escaneabilidade e jornada de decisÃ£o do usuÃ¡rio.",
            result: "Houve um aumento significativo na visibilidade dos cursos e na conversÃ£o de acessos em interaÃ§Ãµes com pÃ¡ginas especÃ­ficas, alÃ©m de maior clareza percebida pelos usuÃ¡rios.",
            note: "Compreendi que, ao lidar com grande volume de opÃ§Ãµes, o design da informaÃ§Ã£o precisa facilitar a tomada de decisÃ£o â€” nÃ£o apenas mostrar conteÃºdo, mas organizar a escolha com lÃ³gica e contexto."
          },
          {
            challenge: "A Taliparts precisava validar quais produtos seriam mais competitivos no Mercado Livre.",
            solution: "Conduzi benchmark detalhado com anÃ¡lise de concorrÃªncia, posicionamento e avaliaÃ§Ãµes de produtos similares.",
            result: "A curadoria inicial de produtos teve maior Ã­ndice de visualizaÃ§Ã£o e interesse jÃ¡ na primeira semana de divulgaÃ§Ã£o.",
            note: "Analisar o terreno competitivo com profundidade Ã© essencial antes de qualquer exposiÃ§Ã£o de marca em canal aberto."
          },
          {
            challenge: "Faltava clareza sobre quem era o pÃºblico-alvo real da Taliparts.",
            solution: "Modelei personas com base em entrevistas com lojistas, mecÃ¢nicos e compradores autÃ´nomos.",
            result: "Definimos trÃªs perfis estratÃ©gicos que orientaram desde a escolha de produto atÃ© o tom da comunicaÃ§Ã£o.",
            note: "Persona Ã© mais do que um arquÃ©tipo â€” Ã© a lente pela qual se interpreta todo o negÃ³cio."
          },
          {
            challenge: "Na Taliparts Os tÃ­tulos e descriÃ§Ãµes dos anÃºncios no Mercado Livre nÃ£o estavam otimizados para SEO no Mercado Livre.",
            solution: "Reestruturei os tÃ­tulos com base em prÃ¡ticas de SEO especÃ­ficas para marketplaces e testei descriÃ§Ãµes com palavras-chave frequentes.",
            result: "Melhoria significativa no posicionamento das ofertas e aumento expressivo no trÃ¡fego orgÃ¢nico.",
            note: "No marketplace, SEO Ã© tÃ£o importante quanto o preÃ§o â€” Ã© ele quem traz o clique."
          },
          {
            challenge: "Na Taliparts era necessÃ¡rio validar se os produtos publicados realmente tinham demanda real.",
            solution: "Estruturei um plano de validaÃ§Ã£o com base em mÃ©tricas de cliques, perguntas de compradores e comparaÃ§Ã£o com benchmarks.",
            result: "Refinamos o catÃ¡logo com base em performance, evitando estoque parado e redirecionando esforÃ§os.",
            note: "Testar pequeno e ajustar rÃ¡pido Ã© mais eficiente do que lanÃ§ar muitos produtos no escuro."
          },
          {
            challenge: "Na FGV algumas pÃ¡ginas possuiam conteÃºdo institucional denso afastava os usuÃ¡rios da leitura integral.",
            solution: "Apliquei tÃ©cnicas de UX writing (escaneabilidade, tÃ­tulos objetivos, listas visuais) nas pÃ¡ginas-chave.",
            result: "O tempo mÃ©dio de leitura aumentou e houve queda no abandono de pÃ¡gina.",
            note: "Pequenas decisÃµes no texto tÃªm grande impacto na experiÃªncia de leitura e compreensÃ£o."
          }
        ]
      },
      contact: {
        title: "Vamos conversar?",
        description: "Estou sempre aberto a novas oportunidades e colaboraÃ§Ãµes. Entre em contato para discutir projetos, parcerias ou apenas trocar ideias sobre UX e design de produtos.",
        form: {
          name: "Nome",
          namePlaceholder: "Digite seu nome completo",
          email: "E-mail",
          emailPlaceholder: "Digite seu melhor e-mail",
          subject: "Assunto",
          subjectPlaceholder: "Sobre o que vocÃª gostaria de conversar?",
          message: "Mensagem",
          messagePlaceholder: "Conte-me sobre seu projeto, oportunidade ou como posso ajudar...",
          messageHint: "MÃ­nimo de 10 caracteres para uma mensagem clara",
          privacy: "Seus dados nÃ£o serÃ£o compartilhados e serÃ£o usados apenas para responder sua mensagem.",
          send: "Enviar mensagem",
          sending: "Enviando..."
        },
        errors: {
          nameRequired: "Nome Ã© obrigatÃ³rio",
          nameMinLength: "Nome deve ter pelo menos 2 caracteres",
          emailRequired: "E-mail Ã© obrigatÃ³rio",
          emailInvalid: "E-mail invÃ¡lido",
          subjectRequired: "Assunto Ã© obrigatÃ³rio",
          messageRequired: "Mensagem Ã© obrigatÃ³ria",
          messageMinLength: "Sua mensagem precisa ter pelo menos {{count}} caracteres.",
          genericError: "Erro ao enviar mensagem. Tente novamente."
        },
        success: {
          message: "Mensagem enviada com sucesso!"
        },
        info: {
          email: "tbisp0@hotmail.com",
          location: "SÃ£o Paulo, Brasil",
          availability: "DisponÃ­vel para projetos freelance e oportunidades full-time"
        },
        social: {
          linkedin: "LinkedIn",
          whatsapp: "WhatsApp",
          email: "E-mail"
        }
      },
      accessibility: {
        title: "Acessibilidade",
        subtitle: "Personalize sua experiÃªncia de navegaÃ§Ã£o",
        description: "Configure as opÃ§Ãµes de acessibilidade para melhorar sua experiÃªncia.",
        instructions: "Use as opÃ§Ãµes abaixo para personalizar a interface.",
        shortcut: "Atalho: Shift + A",
        openMenu: "Abrir menu de acessibilidade",
        closeMenu: "Fechar menu de acessibilidade",
        menuLabel: "Menu de Acessibilidade",
        menuTooltip: "ConfiguraÃ§Ãµes de acessibilidade (Shift + A)",
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
        screenReader: {
          label: "Leitor de tela",
          enable: "Ativar leitor de tela",
          disable: "Desativar leitor de tela",
          enabled: "Leitor de tela ativado",
          disabled: "Leitor de tela desativado"
        },
        reset: {
          label: "Resetar configuraÃ§Ãµes",
          action: "ConfiguraÃ§Ãµes de acessibilidade resetadas",
          success: "ConfiguraÃ§Ãµes resetadas com sucesso"
        },
        features: {
          fontSize: "Tamanho da fonte",
          fontSizeIncrease: "Aumentar fonte",
          fontSizeDecrease: "Diminuir fonte",
          fontSizeReset: "Resetar fonte",
          highContrast: "Alto contraste",
          keyboardNavigation: "NavegaÃ§Ã£o por teclado",
          screenReader: "Leitor de tela",
          readPage: "Ler pÃ¡gina inteira",
          stopReading: "Parar leitura",
          readElement: "Ler elemento",
          skipToContent: "Pular para conteÃºdo principal",
          skipToNavigation: "Pular para navegaÃ§Ã£o"
        },
        dyslexia: {
          label: "Modo Dislexia",
          off: "Apagado",
          weak: "Leve",
          medium: "MÃ©dio",
          strong: "Forte",
          intensity: "Intensidade"
        },
        status: {
          enabled: "Ativado",
          disabled: "Desativado",
          fontIncreased: "Fonte aumentada",
          fontDecreased: "Fonte diminuÃ­da",
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
          system: "Usar preferÃªncia do sistema"
        },
        sound: {
          enable: "Ativar som",
          disable: "Desativar som"
        },
        language: {
          switch: "Trocar idioma",
          current: "Idioma atual",
          available: "Idiomas disponÃ­veis"
        },
        navigation: {
          home: "Ir para inÃ­cio",
          profile: "Ir para perfil",
          projects: "Ver projetos",
          backlog: "Ver backlog estratÃ©gico",
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
          print: "Imprimir pÃ¡gina",
          backToTop: "Voltar ao topo"
        }
      },
      seo: {
        title: "Tarcisio Bispo - UX/Product Designer | Portfolio",
        description: "UX/Product Designer especializado em estratÃ©gia, impacto e experiÃªncia do usuÃ¡rio. Veja meus projetos de design de produtos digitais e soluÃ§Ãµes de UX.",
        keywords: "UX Designer, Product Designer, Design de Produto, ExperiÃªncia do UsuÃ¡rio, UI/UX, Portfolio, SÃ£o Paulo",
        author: "Tarcisio Bispo de Araujo",
        pages: {
          home: {
            title: "Tarcisio Bispo - UX/Product Designer | Portfolio",
            description: "UX/Product Designer com foco em estratÃ©gia, impacto e experiÃªncia do usuÃ¡rio. Especialista em design de produtos digitais, conversÃ£o e impacto de negÃ³cio."
          },
          projects: {
            title: "Projetos - Tarcisio Bispo | UX Designer",
            description: "Veja meus principais projetos de UX/Product Design: FGV LAW, Direito GV, Taliparts e FGV TV Institucional. Cases reais com resultados mensurÃ¡veis."
          },
          backlog: {
            title: "Backlog EstratÃ©gico - Tarcisio Bispo | UX Designer",
            description: "DemonstraÃ§Ã£o prÃ¡tica de como transformo desafios de negÃ³cio em soluÃ§Ãµes de UX mensurÃ¡veis. Metodologia aplicada, resultados alcanÃ§ados e insights estratÃ©gicos."
          },
          contact: {
            title: "Contato - Tarcisio Bispo | UX Designer",
            description: "Entre em contato para discutir projetos, parcerias ou oportunidades. DisponÃ­vel para projetos freelance e oportunidades full-time."
          }
        }
      },
      schema: {
        person: {
          name: "Tarcisio Bispo de Araujo",
          jobTitle: "UX/Product Designer",
          description: "UX/Product Designer especializado em estratÃ©gia, impacto e experiÃªncia do usuÃ¡rio",
          location: "SÃ£o Paulo, Brasil",
          email: "tbisp0@hotmail.com",
          skills: ["UX Design", "Product Design", "Design Strategy", "User Research", "Prototyping", "Usability Testing"]
        },
        organization: {
          name: "TarcÃ­sio Bispo Portfolio",
          description: "Portfolio profissional de UX/Product Design",
          location: "SÃ£o Paulo, Brasil"
        }
      },
      toasts: {
        success: {
          title: "Sucesso!",
          messageSent: "Mensagem enviada com sucesso!",
          settingsSaved: "ConfiguraÃ§Ãµes salvas",
          linkCopied: "Link copiado para Ã¡rea de transferÃªncia",
          themeChanged: "Tema alterado",
          languageChanged: "Idioma alterado",
          soundEnabled: "Som ativado",
          soundDisabled: "Som desativado",
          soundEnabledDesc: "Feedback sonoro estÃ¡ ativo agora",
          soundDisabledDesc: "Feedback sonoro estÃ¡ desativado agora"
        },
        error: {
          title: "Erro",
          messageNotSent: "Erro ao enviar mensagem",
          networkError: "Erro de conexÃ£o",
          genericError: "Algo deu errado",
          tryAgain: "Tente novamente"
        },
        info: {
          title: "InformaÃ§Ã£o",
          loading: "Carregando...",
          processing: "Processando...",
          saving: "Salvando..."
        },
        warning: {
          title: "AtenÃ§Ã£o",
          unsavedChanges: "VocÃª tem alteraÃ§Ãµes nÃ£o salvas",
          confirmAction: "Tem certeza que deseja continuar?"
        }
      },
      alts: {
        profile: {
          photo: "Foto de perfil de Tarcisio Bispo",
          ixdfLogo: "Logo do Interaction Design Foundation",
          ixdfSeal: "Selo de certificaÃ§Ã£o IxDF"
        },
        projects: {
          fgvLaw: "Captura de tela do projeto FGV LAW - designers trabalhando em equipe no escritÃ³rio",
          direitoGV: "Captura de tela do projeto Pesquisa Direito FGV - mesa de madeira com livro em frente a estante",
          taliparts: "Captura de tela do projeto Taliparts - e-commerce de peÃ§as automotivas",
          tvInstitucional: "Captura de tela do projeto FGV TV Institucional - placa branca pendurada na lateral de um edifÃ­cio"
        },
        icons: {
          menu: "Ãcone de menu",
          close: "Ãcone de fechar",
          expand: "Ãcone de expandir",
          collapse: "Ãcone de recolher",
          external: "Ãcone de link externo",
          download: "Ãcone de download",
          email: "Ãcone de e-mail",
          phone: "Ãcone de telefone",
          location: "Ãcone de localizaÃ§Ã£o",
          linkedin: "Ãcone do LinkedIn",
          github: "Ãcone do GitHub",
          sun: "Ãcone de sol (modo claro)",
          moon: "Ãcone de lua (modo escuro)",
          globe: "Ãcone de globo (idiomas)",
          accessibility: "Ãcone de acessibilidade",
          loading: "Ãcone de carregamento",
          success: "Ãcone de sucesso",
          error: "Ãcone de erro",
          warning: "Ãcone de aviso",
          info: "Ãcone de informaÃ§Ã£o"
        },
        decorative: {
          gradient: "Gradiente decorativo",
          pattern: "PadrÃ£o decorativo",
          divider: "Divisor visual",
          background: "Imagem de fundo decorativa"
        }
      },
      feedback: {
        title: "Feedback",
        subtitle: "Sua opiniÃ£o Ã© importante",
        description: "Compartilhe sua experiÃªncia e sugestÃµes",
        typeQuestion: "Que tipo de feedback vocÃª gostaria de compartilhar?",
        thankYou: "Obrigado pelo seu feedback!",
        importance: "Sua opiniÃ£o Ã© muito importante para nÃ³s.",
        close: "Fechar",
        openFeedback: "Abrir feedback",
        send: "Enviar feedback",
        sending: "Enviando...",
        back: "Voltar",
        minimumCharacters: "MÃ­nimo 5 caracteres",
        includeEmail: "Incluir meu e-mail para resposta",
        privacyPolicy: "PolÃ­tica de Privacidade",
        defaultTitle: "Compartilhe seu feedback",
        defaultInstruction: "Conte-nos o que vocÃª pensa",
        defaultPlaceholder: "Digite sua mensagem aqui...",
        problem: "Reportar problema",
        idea: "Compartilhar ideia",
        praise: "Enviar elogio",
        problemTitle: "Reportar um problema",
        ideaTitle: "Compartilhar uma ideia",
        praiseTitle: "Enviar um elogio",
        problemInstruction: "Descreva o problema que vocÃª encontrou",
        ideaInstruction: "Compartilhe sua sugestÃ£o ou ideia",
        praiseInstruction: "Conte-nos o que vocÃª gostou",
        problemPlaceholder: "Descreva o problema em detalhes...",
        ideaPlaceholder: "Compartilhe sua ideia ou sugestÃ£o...",
        praisePlaceholder: "Conte-nos o que vocÃª gostou...",
        form: {
          type: "Tipo de feedback",
          message: "Sua mensagem",
          email: "Seu e-mail (opcional)",
          send: "Enviar feedback",
          sending: "Enviando...",
          success: "ðŸŽ‰ Obrigado pelo seu feedback! Sua opiniÃ£o Ã© muito importante para melhorar a experiÃªncia.",
          error: "âŒ Ops! NÃ£o conseguimos enviar seu feedback. Tente novamente ou entre em contato diretamente.",
          messageRequired: "Mensagem Ã© obrigatÃ³ria"
        },
        types: {
          bug: "Reportar bug",
          suggestion: "SugestÃ£o",
          compliment: "Elogio",
          other: "Outro"
        }
      },
      cookies: {
        title: "Este site usa cookies",
        description: "Usamos cookies para melhorar sua experiÃªncia, analisar o trÃ¡fego do site e personalizar conteÃºdo.",
        learnMore: "Saiba mais",
        acceptAll: "Aceitar todos",
        acceptNecessary: "Apenas necessÃ¡rios",
        customize: "Personalizar",
        savePreferences: "Salvar preferÃªncias",
        required: "ObrigatÃ³rio",
        preferences: {
          title: "PreferÃªncias de Cookies"
        },
        types: {
          necessary: {
            title: "Cookies NecessÃ¡rios",
            description: "Estes cookies sÃ£o essenciais para o funcionamento do site e nÃ£o podem ser desabilitados."
          },
          analytics: {
            title: "Cookies de AnÃ¡lise",
            description: "Nos ajudam a entender como os visitantes interagem com o site, coletando informaÃ§Ãµes de forma anÃ´nima.",
            providers: "Provedores"
          },
          marketing: {
            title: "Cookies de Marketing",
            description: "Usados para rastrear visitantes em sites para exibir anÃºncios relevantes e envolventes."
          }
        }
      },
      common: {
        close: "Fechar",
        loading: "Carregando...",
        error: "Algo deu errado",
        tryAgain: "Tente novamente",
        details: "Detalhes do erro",
        before: "Antes",
        after: "Depois",
        sorry: "Desculpe, encontramos um problema ao carregar esta pÃ¡gina.",
        reload: "Por favor, recarregue a pÃ¡gina ou tente novamente mais tarde.",
        reloadButton: "Recarregar PÃ¡gina",
        occurredError: "Ocorreu um erro",
        analyticsDisabled: "Analytics Desativado",
        analyticsDevMode: "Os serviÃ§os de anÃ¡lise estÃ£o desativados no modo de desenvolvimento ou ocorreu um erro.",
        previous: "Previous",
        next: "Next",
        more: "More",
        toggleSidebar: "Toggle Sidebar",
        previousSlide: "Previous slide",
        nextSlide: "Next slide",
        statusTheme: "Status do Tema",
        selectedTheme: "Tema selecionado:",
        resolvedTheme: "Tema resolvido:",
        htmlClass: "Classe no HTML:",
        themeChangeText: "Este texto deve mudar de cor conforme o tema",
        debugTranslation: " Debug Translations",
        language: "Language:",
        ready: "Ready:",
        resourcesLoaded: "Resources Loaded:",
        testKeys: "Test Keys:",
        soundDemo: "Sound Demo",
        integrationPoints: "Integration Points:",
        testProjectCard: "Teste do ProjectCard",
        implemented: "Funcionalidade Implementada:",
        originalBackground: "Original Enhanced Background",
        seoBackground: "SEO-Inspired Background",
        existingComponent: "Your existing ProjectShowcase component would go here",
        preserved: "All functionality preserved, with new subtle background effects",
        gradientSystem: "Sistema de Gradientes",
        currentSection: "SeÃ§Ã£o Atual:",
        gradientPreview: "Preview do Gradiente:",
        debugProjectShowcase: "Debug ProjectShowcase",
        expandedContent: "ConteÃºdo Expandido",
        currentState: "Estado atual:",
        projectId: "ID do projeto:",
        currentStatus: "Estado Atual:"
      },
      projectExplain: {
        challenge: "The Challenge",
        discovery: "Discovery",
        solution: "Solution",
        iteration: "Iteration and Evolution",
        results: "Results",
        insights: "Insights",
        before: "Before",
        after: "After",
        projectNotFound: "Project not found",
        backToProjects: "Back to projects"
      },
      language: {
        changed: "Idioma alterado com sucesso",
        current: "Idioma atual",
        available: "Idiomas disponÃ­veis",
        portuguese: "PortuguÃªs",
        english: "English",
        spanish: "EspaÃ±ol"
      },
      theme: {
        changed: "Tema alterado com sucesso",
        light: "Modo claro ativado",
        dark: "Modo escuro ativado",
        system: "Usando preferÃªncia do sistema"
      },
      notFound: {
        title: "PÃ¡gina nÃ£o encontrada",
        message: "Ops! A pÃ¡gina que vocÃª estÃ¡ procurando nÃ£o existe ou foi movida para outro local.",
        pathAttempted: "Caminho tentado:",
        backToHome: "Voltar ao InÃ­cio",
        goBack: "PÃ¡gina Anterior",
        reload: "Recarregar",
        lookingFor: "Talvez vocÃª esteja procurando por:",
        projects: "Projetos",
        backlog: "Backlogs EstratÃ©gicos",
        contact: "Contato",
        privacyPolicy: "PolÃ­tica de Privacidade"
      },
      footer: {
        copyright: "Â© 2024 Tarcisio Bispo. Todos os direitos reservados.",
        title: "UX/Product Designer"
      },
      projectDetails: {
        fgvLaw: {
          title: "FGV Law â€“ UX Restructuring",
          shortDescription: "Restructuring of the legal courses area at FGV Direito SP with focus on usability and information organization.",
          sections: {
            challenge: {
              title: "The Challenge: Disorganized Information Architecture",
              content: "The person responsible for the FGV Law portal contacted me reporting a drop in enrollments and high dropout rate in the course search process. Google Analytics reports showed many accesses without conversion, and it became evident that the site structure did not guide users clearly. There was lack of coherence between categories, information was scattered and essential data â€” such as fees and prerequisites â€” were difficult to locate.",
              quote: "\"Students say the site has everything, but no one can find anything.\" â€“ Person responsible for the FGV Law portal",
              result: "This scenario resulted in confusion, rework and overload of the administrative team, who needed to constantly answer basic questions by phone and email."
            },
            discovery: {
              title: "Discovery: Diagnosis and Flow Analysis",
              content: "My starting point was to analyze navigation behavior reports and conduct direct conversations with the person in charge and some postgraduate students. The goal was to understand where and why users got lost.",
              analysis: "The analysis revealed clear bottlenecks:",
              bottlenecks: [
                "Lack of coherent thematic grouping.",
                "Redundant steps on the path to enrollment.",
                "Confusing information hierarchy with excessive clicks."
              ],
              conclusion: "From this diagnosis, I designed the current flow (as-is) and identified friction points between user expectation and reality."
            },
            solution: {
              title: "Solution: New Structure and Thematic Wireframes",
              content: "Based on the evidence, I proposed a complete reorganization of information architecture, centered on legal themes instead of institutional categories. This change simplified the journey for those looking for a course, making it easier to compare options and understand the context of each program.",
              actions: "Among the main actions:",
              actionList: [
                "Creation of a tab system to organize sections progressively (Presentation, Structure, Selection Process, etc.).",
                "Redefinition of visual hierarchy with focus on clarity and scannability.",
                "Creation of wireframes presenting the new navigation logic and enrollment flows."
              ],
              validation: "This new foundation was validated with the person in charge and adjusted after specific feedback from students, who reported noticing simpler and more objective navigation."
            },
            iteration: {
              title: "Iteration and Evolution",
              content: "After delivery, the proposal served as the foundation for subsequent versions of the portal, which continued to be improved by FGV's internal team. Many of the visual and structural improvements that today make the Direito GV website more aligned with FGV's identity were born from the first suggestions developed in this project.",
              consolidation: "These iterations consolidated a cleaner language, consistent and coherent with the Foundation's digital ecosystem."
            },
            results: {
              title: "Results",
              content: "Although it was not possible to measure specific quantitative results, internal feedback was clear:",
              resultList: [
                "Noticeable reduction in recurring questions and support overload.",
                "Better understanding of course offerings and selection process stages.",
                "More fluid and intuitive navigation, with positive experience reported by students and the responsible team."
              ]
            },
            insights: {
              title: "Insights",
              content: "Structural clarity is the starting point for user confidence. Well-thought-out architecture not only organizes content â€” it guides decisions and translates brand identity into digital experience."
            }
          }
        },
        tvInstitucional: {
          title: "Institutional TV - Service Design",
          shortDescription: "Implementation of a visual communication system for an educational institution.",
          sections: {
            overview: {
              title: "Overview: The Environment Interface",
              content: "I developed a visual communication system for TVs in FGV's hall, transforming physical spaces into dynamic interfaces to communicate events and institutional updates in an attractive way.",
              quote: "Physical environments are also interfaces. When well designed, they inform, engage and connect â€” without needing login."
            },
            process: {
              title: "My Service Design Process",
              ethnographic: {
                title: "1. Ethnographic and Field Research",
                content: "I spent days in the institution's hall, observing the flow of people and how they interacted (or not) with existing communication media. With a clipboard in hand, I conducted interception interviews (guerrilla interviews) with 25 students, asking about how they got informed. The pattern was clear: current communication was invisible to them.",
                imageAlt: "Heat map showing the main points of circulation and stopping of students in the hall."
              },
              journey: {
                title: "2. Journey Mapping and Touchpoints",
                content: "I mapped the student's journey within the physical space, from entering the college to arriving in the classroom. I identified the main visual touchpoints and waiting points â€” such as in front of elevators and the snack bar line â€” as ideal locations for installing the new communication interfaces."
              },
              prototyping: {
                title: "3. Prototyping and Content Curation",
                content: "I created a prototype of the system using a simple slideshow on a TV to test the initial impact. I developed a visual programming grid, defining what type of content would be displayed at each time to maximize relevance. For example, day events in the morning, and library reminders in the afternoon.",
                imageAlt: "Mosaic with different templates for events, notices and news."
              },
              testing: {
                title: "4. Tests and Iteration",
                content: "To measure engagement, I used a simple tactic: I added QR Codes to event ads that led to the registration page. In the first week, the number of accesses was 300% higher than the average clicks on links sent by email, proving the effectiveness of the channel. I also tested different display times and collected direct feedback from students to adjust the animation rhythm."
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
          shortDescription: "Product validation research for marketplace sales.",
          sections: {
            challenge: {
              title: "The Challenge: Selling Digital with Low Risk",
              content: "Taliparts, a traditional auto parts distributor, wanted to enter Mercado Livre, but didn't know which of their 20,000 items would have the greatest sales potential and how to stand out from the competition. The goal was to create an entry strategy with low cost and rapid learning."
            },
            strategy: {
              title: "My Lean Research Strategy",
              competitive: {
                title: "1. Competitive and Market Analysis",
                content: "I started with a deep analysis of the 5 largest auto parts sellers on Mercado Livre. I mapped their best-selling products, pricing strategies, and reputation. I used Google Trends and Google's keyword planner to identify a product niche with high demand and moderate competition: suspension kits for popular cars.",
                imageAlt: "SWOT Analysis diagram of main competitors on Mercado Livre."
              },
              personas: {
                title: "2. Persona Definition",
                content: "Based on automotive forums and analysis of questions from competing ads, I created two personas: the \"Professional Mechanic\", who seeks cost-benefit and delivery speed, and the \"DIY Car Owner (Do It Yourself)\", who seeks tutorials and brand confidence."
              },
              validation: {
                title: "3. Validation with Ghost Ads",
                content: "To validate demand without buying stock, I created 10 \"ghost\" ads (with extended delivery time) for the selected suspension kits. In one week, 3 of the 10 ads received more than 50 questions and several purchase attempts, validating market interest in these specific products."
              },
              seo: {
                title: "4. SEO Optimization for Marketplace",
                content: "With validated products, I focused on optimizing each ad for maximum SEO performance within Mercado Livre. I created titles following the formula [Part Name] + [Brand] + [Car Model] + [Year] + [Differential], which increased visibility by 150%.",
                beforeAlt: "Example of generic ad title: \"Car Shock Absorber\".",
                afterAlt: "Example of optimized title: \"Original Front Shock Absorber (Pair) Gol G5 G6 Voyage 2008-2012\"."
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
          shortDescription: "Analysis and improvement of information architecture for the Direito GV courses area.",
          sections: {
            overview: {
              title: "Research Project Overview",
              content: "I worked on the research and discovery phase that underpinned the portal redesign project (FGV Law). My focus was to deeply diagnose usability and information architecture problems to provide a clear roadmap for the design and development team.",
              imageAlt: "Double Diamond diagram highlighting the Discovery and Definition phase."
            },
            process: {
              title: "My Diagnostic Process",
              heuristic: {
                title: "1. Heuristic Analysis",
                content: "I started with a complete heuristic evaluation of the portal interface, using Nielsen's 10 Heuristics as a guide. I identified 45 usability problems, classifying each by severity. One critical problem was the lack of system feedback after filling out forms."
              },
              stakeholders: {
                title: "2. Stakeholder Interviews",
                content: "I conducted meetings with 5 key stakeholders, including course coordinators and the marketing team. The goal was to align expectations and understand business objectives. I discovered that the main goal was to increase enrollments in short courses, which helped me prioritize the usability problems that most impacted this flow."
              },
              journey: {
                title: "3. As-Is User Journey Mapping",
                content: "I mapped the complete journey of a student trying to enroll in a course. The map visualized more than 20 steps, 8 frustration points and 3 navigation loops where the user got stuck. This artifact was crucial to show stakeholders the severity of the problems.",
                imageAlt: "Detailed user journey map, showing pain points and opportunities."
              }
            },
            deliverables: {
              title: "Deliverables and Recommendations",
              content: "The result of this research phase was a detailed diagnostic report and a set of strategic recommendations, which served as the basis for the redesign project.",
              deliverablesList: [
                "UX Diagnostic Report: Document with all usability problems found and classified by severity.",
                "Information Architecture Recommendation: Proposal for a new category and menu structure.",
                "Implementation Roadmap: Suggestion of a phased action plan for the development team."
              ]
            }
          }
        }
      },
      projectDetails: {
        fgvLaw: {
          title: "Direito FGV â€“ ReestruturaÃ§Ã£o de UX",
          shortDescription: "ReestruturaÃ§Ã£o da Ã¡rea de cursos jurÃ­dicos da FGV Direito SP com foco em usabilidade e organizaÃ§Ã£o da informaÃ§Ã£o.",
          sections: {
            challenge: {
              title: "O Desafio: Arquitetura de InformaÃ§Ã£o Desorganizada",
              content: "A responsÃ¡vel pelo portal da FGV Law entrou em contato relatando queda nas inscriÃ§Ãµes e alta taxa de desistÃªncia no processo de busca por cursos. Os relatÃ³rios do Google Analytics mostravam muitos acessos sem conversÃ£o, e ficou evidente que a estrutura do site nÃ£o guiava o usuÃ¡rio de forma clara. Faltava coerÃªncia entre as categorias, as informaÃ§Ãµes estavam dispersas e dados essenciais â€” como valores e prÃ©-requisitos â€” eram difÃ­ceis de localizar.",
              quote: "\"Os alunos dizem que o site tem tudo, mas ninguÃ©m encontra nada.\" â€“ ResponsÃ¡vel pelo portal da FGV Law",
              result: "Esse cenÃ¡rio resultava em confusÃ£o, retrabalho e sobrecarga da equipe administrativa, que precisava atender constantemente dÃºvidas bÃ¡sicas por telefone e e-mail."
            },
            discovery: {
              title: "Descoberta: DiagnÃ³stico e AnÃ¡lise de Fluxo",
              content: "Meu ponto de partida foi analisar os relatÃ³rios de comportamento de navegaÃ§Ã£o e realizar conversas diretas com a responsÃ¡vel e alguns alunos de pÃ³s-graduaÃ§Ã£o. O objetivo era compreender onde e por que os usuÃ¡rios se perdiam.",
              analysis: "A anÃ¡lise revelou gargalos claros:",
              bottlenecks: [
                "Falta de agrupamento temÃ¡tico coerente.",
                "Etapas redundantes no caminho atÃ© a inscriÃ§Ã£o.",
                "Hierarquia de informaÃ§Ã£o confusa, com excesso de cliques."
              ],
              conclusion: "A partir desse diagnÃ³stico, desenhei o fluxo atual (as-is) e identifiquei os pontos de atrito entre expectativa e realidade do usuÃ¡rio."
            },
            solution: {
              title: "SoluÃ§Ã£o: Nova Estrutura e Wireframes TemÃ¡ticos",
              content: "Com base nas evidÃªncias, propus uma reorganizaÃ§Ã£o completa da arquitetura de informaÃ§Ã£o, centrada em temas jurÃ­dicos em vez de categorias institucionais. Essa mudanÃ§a simplificou a jornada de quem busca um curso, tornando mais fÃ¡cil comparar opÃ§Ãµes e entender o contexto de cada programa.",
              actions: "Entre as principais aÃ§Ãµes:",
              actionList: [
                "CriaÃ§Ã£o de um sistema de abas para organizar as seÃ§Ãµes de forma progressiva (ApresentaÃ§Ã£o, Estrutura, Processo Seletivo etc.).",
                "RedefiniÃ§Ã£o da hierarquia visual com foco na clareza e escaneabilidade.",
                "CriaÃ§Ã£o de wireframes apresentando a nova lÃ³gica de navegaÃ§Ã£o e os fluxos de inscriÃ§Ã£o."
              ],
              validation: "Essa nova base foi validada com a responsÃ¡vel e ajustada apÃ³s feedbacks pontuais de alunos, que relataram perceber a navegaÃ§Ã£o mais simples e objetiva."
            },
            iteration: {
              title: "IteraÃ§Ã£o e EvoluÃ§Ã£o",
              content: "ApÃ³s a entrega, a proposta serviu como fundamento para as versÃµes seguintes do portal, que continuaram sendo aprimoradas pela equipe interna da FGV. Muitas das melhorias visuais e estruturais que hoje tornam o site da Direito GV mais alinhado Ã  identidade da FGV nasceram das primeiras sugestÃµes desenvolvidas nesse projeto.",
              consolidation: "Essas iteraÃ§Ãµes consolidaram uma linguagem mais limpa, consistente e coerente com o ecossistema digital da FundaÃ§Ã£o."
            },
            results: {
              title: "Resultados",
              content: "Embora nÃ£o tenha sido possÃ­vel mensurar resultados quantitativos especÃ­ficos, os retornos internos foram claros:",
              resultList: [
                "ReduÃ§Ã£o perceptÃ­vel de dÃºvidas recorrentes e de sobrecarga do suporte.",
                "Melhor compreensÃ£o da oferta de cursos e das etapas do processo seletivo.",
                "NavegaÃ§Ã£o mais fluida e intuitiva, com experiÃªncia positiva relatada por alunos e pela equipe responsÃ¡vel."
              ]
            },
            insights: {
              title: "Insights",
              content: "A clareza da estrutura Ã© o ponto de partida para a confianÃ§a do usuÃ¡rio. Uma arquitetura bem pensada nÃ£o apenas organiza conteÃºdo â€” ela guia decisÃµes e traduz a identidade da marca em experiÃªncia digital"
            }
          }
        },
        tvInstitucional: {
          title: "TV Institucional - Service Design",
          shortDescription: "ImplementaÃ§Ã£o de um sistema de comunicaÃ§Ã£o visual para uma instituiÃ§Ã£o de ensino.",
          sections: {
            overview: {
              title: "VisÃ£o Geral: A Interface do Ambiente",
              content: "Desenvolvi um sistema de comunicaÃ§Ã£o visual para as TVs no hall da FGV, transformando espaÃ§os fÃ­sicos em interfaces dinÃ¢micas para comunicar eventos e atualizaÃ§Ãµes institucionais de forma atrativa.",
              quote: "Ambientes fÃ­sicos tambÃ©m sÃ£o interfaces. Quando bem projetados, informam, engajam e conectam â€” sem precisar de login."
            },
            process: {
              title: "Meu Processo de Service Design",
              ethnographic: {
                title: "1. Pesquisa EtnogrÃ¡fica e de Campo",
                content: "Passei dias no hall da instituiÃ§Ã£o, observando o fluxo de pessoas e como elas interagiam (ou nÃ£o) com os meios de comunicaÃ§Ã£o existentes. Com uma prancheta na mÃ£o, realizei entrevistas de interceptaÃ§Ã£o (guerrilla interviews) com 25 alunos, perguntando sobre como eles se informavam. O padrÃ£o era claro: a comunicaÃ§Ã£o atual era invisÃ­vel para eles.",
                imageAlt: "Mapa de calor mostrando os principais pontos de circulaÃ§Ã£o e parada dos alunos no hall."
              },
              journey: {
                title: "2. Mapeamento da Jornada e Pontos de Contato",
                content: "Mapeei a jornada do aluno dentro do espaÃ§o fÃ­sico, desde a entrada na faculdade atÃ© a chegada na sala de aula. Identifiquei os principais pontos de contato visuais e de espera â€” como a frente dos elevadores e a fila da lanchonete â€” como locais ideais para a instalaÃ§Ã£o das novas interfaces de comunicaÃ§Ã£o."
              },
              prototyping: {
                title: "3. Prototipagem e Curadoria de ConteÃºdo",
                content: "Criei um protÃ³tipo do sistema usando um simples slideshow em uma TV para testar o impacto inicial. Desenvolvi uma grade de programaÃ§Ã£o visual, definindo que tipo de conteÃºdo seria exibido em cada horÃ¡rio para maximizar a relevÃ¢ncia. Por exemplo, eventos do dia pela manhÃ£, e lembretes da biblioteca Ã  tarde.",
                imageAlt: "Mosaico com diferentes templates para eventos, avisos e notÃ­cias."
              },
              testing: {
                title: "4. Testes e IteraÃ§Ã£o",
                content: "Para medir o engajamento, usei uma tÃ¡tica simples: adicionei QR Codes nos anÃºncios de eventos que levavam para a pÃ¡gina de inscriÃ§Ã£o. Na primeira semana, o nÃºmero de acessos foi 300% maior do que a mÃ©dia de cliques nos links enviados por e-mail, provando a eficÃ¡cia do canal. TambÃ©m testei diferentes tempos de exibiÃ§Ã£o e coletei feedback direto dos alunos para ajustar o ritmo das animaÃ§Ãµes."
              }
            },
            results: {
              title: "Resultados: Da IgnorÃ¢ncia ao Engajamento",
              metrics: [
                { value: "+300%", label: "de aumento na visibilidade de eventos (medido por QR Code)" },
                { value: "+40%", label: "de aumento na participaÃ§Ã£o em eventos do campus" },
                { value: "9/10", label: "nota de satisfaÃ§Ã£o dos alunos com o novo canal" }
              ]
            }
          }
        },
        taliparts: {
          title: "TALIPARTS - UX & Business Research",
          shortDescription: "Pesquisa de validaÃ§Ã£o de produtos para venda em marketplaces.",
          sections: {
            challenge: {
              title: "O Desafio: Vender no Digital com Baixo Risco",
              content: "A Taliparts, uma distribuidora de autopeÃ§as tradicional, queria entrar no Mercado Livre, mas nÃ£o sabia quais dos seus 20.000 itens teriam maior potencial de venda e como se destacar da concorrÃªncia. O objetivo era criar uma estratÃ©gia de entrada com baixo custo e aprendizado rÃ¡pido."
            },
            strategy: {
              title: "Minha EstratÃ©gia de Pesquisa Lean",
              competitive: {
                title: "1. AnÃ¡lise Competitiva e de Mercado",
                content: "Iniciei com uma anÃ¡lise profunda dos 5 maiores vendedores de autopeÃ§as no Mercado Livre. Mapeei seus produtos mais vendidos, estratÃ©gias de preÃ§o, e a reputaÃ§Ã£o. Usei o Google Trends e o planejador de palavras-chave do Google para identificar um nicho de produtos com alta demanda e concorrÃªncia moderada: kits de suspensÃ£o para carros populares.",
                imageAlt: "Diagrama de AnÃ¡lise SWOT dos principais concorrentes no Mercado Livre."
              },
              personas: {
                title: "2. DefiniÃ§Ã£o de Personas",
                content: "Com base em fÃ³runs de automÃ³veis e na anÃ¡lise de perguntas de anÃºncios concorrentes, criei duas personas: o \"MecÃ¢nico Profissional\", que busca custo-benefÃ­cio e agilidade na entrega, e o \"Dono de Carro DIY (FaÃ§a VocÃª Mesmo)\", que busca tutoriais e confianÃ§a na marca."
              },
              validation: {
                title: "3. ValidaÃ§Ã£o com AnÃºncios Fantasma",
                content: "Para validar a demanda sem comprar estoque, criei 10 anÃºncios \"fantasma\" (com prazo de entrega estendido) para os kits de suspensÃ£o selecionados. Em uma semana, 3 dos 10 anÃºncios receberam mais de 50 perguntas e vÃ¡rias tentativas de compra, validando o interesse do mercado nesses produtos especÃ­ficos."
              },
              seo: {
                title: "4. OtimizaÃ§Ã£o de SEO para Marketplace",
                content: "Com os produtos validados, foquei em otimizar cada anÃºncio para mÃ¡xima performance de SEO dentro do Mercado Livre. Criei tÃ­tulos seguindo a fÃ³rmula [Nome da PeÃ§a] + [Marca] + [Modelo do Carro] + [Ano] + [Diferencial], o que aumentou a visibilidade em 150%.",
                beforeAlt: "Exemplo de tÃ­tulo de anÃºncio genÃ©rico: \"Amortecedor de Carro\".",
                afterAlt: "Exemplo de tÃ­tulo otimizado: \"Amortecedor Dianteiro Original (Par) Gol G5 G6 Voyage 2008-2012\"."
              }
            },
            results: {
              title: "Resultados e PrÃ³ximos Passos",
              metrics: [
                { value: "Top 10", label: "em 60% dos anÃºncios para palavras-chave alvo" },
                { value: "+150%", label: "de CTR comparado Ã  mÃ©dia da categoria" },
                { value: "80%", label: "dos produtos validados atingiram o ponto de equilÃ­brio em 45 dias" }
              ]
            }
          }
        },
        direitoGV: {
          title: "Direito GV - Pesquisa e Arquitetura",
          shortDescription: "AnÃ¡lise e melhoria da arquitetura de informaÃ§Ã£o para a Ã¡rea de cursos da Direito GV.",
          sections: {
            overview: {
              title: "VisÃ£o Geral do Projeto de Pesquisa",
              content: "Atuei na fase de pesquisa e descoberta que fundamentou o projeto de redesenho do portal (FGV Law). Meu foco foi diagnosticar profundamente os problemas de usabilidade e de arquitetura de informaÃ§Ã£o para fornecer um roadmap claro para a equipe de design e desenvolvimento.",
              imageAlt: "Diagrama do Duplo Diamante destacando a fase de Descoberta e DefiniÃ§Ã£o."
            },
            process: {
              title: "Meu Processo de DiagnÃ³stico",
              heuristic: {
                title: "1. AnÃ¡lise HeurÃ­stica",
                content: "Iniciei com uma avaliaÃ§Ã£o heurÃ­stica completa da interface do portal, usando as 10 HeurÃ­sticas de Nielsen como guia. Identifiquei 45 problemas de usabilidade, classificando cada um por severidade. Um problema crÃ­tico era a falta de feedback do sistema apÃ³s o preenchimento de formulÃ¡rios."
              },
              stakeholders: {
                title: "2. Entrevistas com Stakeholders",
                content: "Conduzi reuniÃµes com 5 stakeholders chave, incluindo coordenadores de curso e a equipe de marketing. O objetivo era alinhar as expectativas e entender os objetivos de negÃ³cio. Descobri que a meta principal era aumentar as inscriÃ§Ãµes em cursos de curta duraÃ§Ã£o, o que me ajudou a priorizar os problemas de usabilidade que mais impactavam esse fluxo."
              },
              journey: {
                title: "3. Mapeamento da Jornada do UsuÃ¡rio As-Is",
                content: "Mapeei a jornada completa de um aluno tentando se inscrever em um curso. O mapa visualizou mais de 20 passos, 8 pontos de frustraÃ§Ã£o e 3 loops de navegaÃ§Ã£o onde o usuÃ¡rio ficava preso. Este artefato foi crucial para mostrar aos stakeholders a gravidade dos problemas.",
                imageAlt: "Mapa detalhado da jornada do usuÃ¡rio, mostrando pontos de dor e oportunidades."
              }
            },
            deliverables: {
              title: "EntregÃ¡veis e RecomendaÃ§Ãµes",
              content: "O resultado desta fase de pesquisa foi um relatÃ³rio detalhado de diagnÃ³stico e um conjunto de recomendaÃ§Ãµes estratÃ©gicas, que serviram como base para o projeto de redesenho.",
              deliverablesList: [
                "RelatÃ³rio de DiagnÃ³stico de UX: Documento com todos os problemas de usabilidade encontrados e classificados por severidade.",
                "RecomendaÃ§Ã£o de Arquitetura de InformaÃ§Ã£o: Proposta de uma nova estrutura de categorias e menus.",
                "Roadmap de ImplementaÃ§Ã£o: SugestÃ£o de um plano de aÃ§Ã£o faseado para a equipe de desenvolvimento."
              ]
            }
          }
        }
      },
      privacy: {
        title: "PolÃ­tica de Privacidade",
        subtitle: "Como tratamos seus dados pessoais",
        lastUpdated: "Ãšltima atualizaÃ§Ã£o",
        introduction: {
          title: "1. IntroduÃ§Ã£o",
          content: "Esta PolÃ­tica de Privacidade explica como coletamos, usamos e protegemos suas informaÃ§Ãµes pessoais quando vocÃª utiliza nosso portfÃ³lio online."
        },
        dataCollection: {
          title: "2. Dados Coletados",
          formData: {
            title: "Dados de FormulÃ¡rios",
            contactForm: "FormulÃ¡rio de Contato: Nome, e-mail, telefone, empresa, cargo, mensagem",
            feedbackForm: "FormulÃ¡rio de Feedback: Nome, e-mail, tipo de feedback, mensagem, seÃ§Ã£o do site",
            newsletter: "Newsletter: E-mail e preferÃªncias de comunicaÃ§Ã£o"
          },
          technicalData: {
            title: "Dados TÃ©cnicos",
            navigation: "Dados de NavegaÃ§Ã£o: EndereÃ§o IP, tipo de navegador, sistema operacional",
            cookies: "Cookies e Tecnologias Similares: PreferÃªncias de tema, idioma, configuraÃ§Ãµes de acessibilidade",
            analytics: "Analytics: PÃ¡ginas visitadas, tempo de permanÃªncia, origem do trÃ¡fego (dados anonimizados)",
            performance: "Dados de Performance: Velocidade de carregamento, erros tÃ©cnicos"
          }
        },
        dataUsage: {
          title: "3. Como Usamos Seus Dados",
          purposes: {
            professional: "ComunicaÃ§Ã£o Profissional",
            improvement: "Melhoria dos ServiÃ§os",
            personalization: "PersonalizaÃ§Ã£o",
            security: "SeguranÃ§a"
          }
        },
        legalBasis: {
          title: "4. Base Legal (LGPD)",
          articles: {
            consent: "Art. 7Âº, I - Consentimento: Para envio de newsletter e comunicaÃ§Ãµes promocionais",
            legitimate: "Art. 7Âº, IV - Interesse LegÃ­timo: Para analytics e melhoria dos serviÃ§os",
            contract: "Art. 7Âº, V - ExecuÃ§Ã£o de Contrato: Para prestaÃ§Ã£o de serviÃ§os profissionais",
            rights: "Art. 7Âº, VI - ExercÃ­cio de Direitos: Para responder solicitaÃ§Ãµes e exercer direitos"
          }
        },
        dataSharing: {
          title: "5. Compartilhamento de Dados",
          cases: {
            serviceProviders: "Prestadores de ServiÃ§o: EmailJS (envio de e-mails), Google Analytics (anÃ¡lise de trÃ¡fego)",
            legal: "ObrigaÃ§Ã£o Legal: Quando exigido por lei ou ordem judicial",
            rights: "ProteÃ§Ã£o de Direitos: Para proteger nossos direitos, propriedade ou seguranÃ§a",
            consent: "Consentimento Expresso: Com sua autorizaÃ§Ã£o prÃ©via e especÃ­fica"
          }
        },
        dataRights: {
          title: "6. Seus Direitos (LGPD)",
          rights: "Direitos LGPD"
        },
        exerciseRights: {
          title: "7. Como Exercer Seus Direitos",
          howTo: "Como Exercer",
          contact: "tbisp0@hotmail.com",
          response: "Resposta em atÃ© 15 dias Ãºteis"
        },
        dataRetention: {
          title: "8. RetenÃ§Ã£o de Dados",
          table: {
            dataType: "Tipo de Dado",
            retention: "PerÃ­odo de RetenÃ§Ã£o"
          },
          types: {
            contact: "Dados de Contato",
            feedback: "Feedback",
            analytics: "Analytics",
            preferences: "PreferÃªncias"
          },
          periods: {
            contact: "5 anos apÃ³s Ãºltimo contato",
            feedback: "3 anos para melhoria dos serviÃ§os",
            analytics: "26 meses (Google Analytics)",
            preferences: "AtÃ© revogaÃ§Ã£o do usuÃ¡rio"
          }
        },
        cookies: {
          title: "9. Cookies",
          essential: "Cookies Essenciais",
          essentialDesc: "NecessÃ¡rios para funcionamento bÃ¡sico (tema, idioma, acessibilidade)",
          performance: "Cookies de Performance",
          performanceDesc: "Google Analytics para entender como vocÃª usa o site (anonimizados)"
        },
        contact: {
          title: "10. Entre em Contato",
          email: "E-mail:",
          phone: "Telefone:",
          location: "LocalizaÃ§Ã£o:",
          values: {
            email: "tbisp0@hotmail.com",
            phone: "+55 (19) 99013-7380",
            location: "Campinas, SP, Brasil"
          }
        }
      }
    }
  },
