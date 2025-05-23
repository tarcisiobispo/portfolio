import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Profile from '../components/Profile';
import ProjectShowcase from '../components/ProjectShowcase';
import BacklogCycle from '../components/BacklogCycle';
import Contact from '../components/Contact';
import { ArrowDown } from 'lucide-react';

const Index = () => {
  const profileData = {
    name: "Tarcisio Bispo de Araujo",
    title: "UX/Product Designer com foco em estratégia, impacto e experiência",
    bio: "Sou UX/Product Designer com forte atuação no design de produtos digitais focados em experiência do usuário, conversão e impacto de negócio. Com background em Marketing Digital, SEO e IA, integro estratégia, design e usabilidade em processos contínuos de melhoria e inovação. Já atuei em contextos acadêmicos, e-commerce B2B e comunicação institucional, sempre guiado por dados, empatia e visão de produto."
  };

  const projects = [
    {
      title: "Projeto 1 – FGV LAW",
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
      insights: "A estrutura de navegação precisa guiar, não apenas mostrar. Clareza e agrupamento relevante influenciam diretamente a percepção de valor de um curso.",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Projeto 2 – Área de Pesquisa da Direito GV",
      category: "Mapas, Fluxos e Pesquisa",
      overview: "Redesenho da área digital dedicada às pesquisas acadêmicas da Direito GV. O foco foi simplificar o acesso a projetos, publicações e pesquisadores, melhorando a transparência e usabilidade.",
      discovery: "Usuários internos relataram dificuldade para localizar materiais e compreender a organização da área. A estrutura atual não favorecia a descoberta de novos projetos nem valorizava a produção científica da escola.",
      solution: "Mapeei fluxos, criei wireframes e reorganizei o conteúdo com base em fluxogramas e sitemap redesenhado. Trabalhei próximo à equipe institucional para validar as categorias e tags aplicadas.",
      iteration: "Realizamos testes com alunos, professores e pesquisadores. A navegação foi ajustada com base em feedback sobre nomenclatura e ordem de prioridades. Validei cada alteração com os stakeholders envolvidos.",
      outcomes: [
        "Redução no tempo de navegação para encontrar projetos ou temas específicos",
        "Aumento no número de visitas às páginas de pesquisadores",
        "Valorização institucional da produção acadêmica"
      ],
      insights: "Áreas institucionais ganham relevância quando são navegáveis, atualizadas e refletidas de forma estratégica na arquitetura da informação.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Projeto 3 – Taliparts (Validação Estratégica + Canais Digitais)",
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
      insights: "Validar digitalmente com baixo custo é possível — e necessário. A lógica de produto precisa considerar contexto físico, vocabulário técnico e diferenciais percebidos pelo cliente.",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Projeto 4 – TV Institucional",
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
      insights: "Ambientes físicos também são interfaces. Quando bem projetados, informam, engajam e conectam — sem precisar de login.",
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // Ref for scroll
  const projectsRef = useRef(null);
  
  // Scroll handler
  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(135deg, #f5f8ff 0%, #e3eafe 100%)"
      }}
    >
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,63,212,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(26,63,212,0.05),transparent_70%)]"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Profile Section */}
          <Profile {...profileData} />
          
          {/* Scroll indicator */}
          <motion.div 
            className="hidden md:flex justify-center w-full absolute bottom-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            <button 
              onClick={scrollToProjects} 
              className="flex flex-col items-center text-portfolio-blue-dark opacity-80 hover:opacity-100 transition-opacity"
            >
              <span className="mb-2 text-sm font-medium">Explore projetos</span>
              <ArrowDown className="animate-bounce" />
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Projects Section */}
      <div ref={projectsRef} className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ProjectShowcase projects={projects} />
          </motion.div>
        </div>
      </div>
      
      {/* Backlog Cycle Section with Pattern Background */}
      <div className="py-20 relative bg-gradient-to-b from-slate-100 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,63,212,0.03),transparent_70%)]"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <BacklogCycle />
          </motion.div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Contact />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
