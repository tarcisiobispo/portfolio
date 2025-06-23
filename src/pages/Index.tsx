import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Profile from '../components/Profile';
import SkipLink from '@/components/SkipLink';
import SEO from '@/components/SEO';
import LoadingSpinner from '@/components/LoadingSpinner';
import { mainPageSchema } from '@/utils/structuredData';
import { usePrefetch, useImagePrefetch } from '@/hooks/usePrefetch';
import { usePageTracking } from '@/hooks/useAnalytics';
import { ProjectSkeleton, ProfileSkeleton, BacklogSkeleton, ContactSkeleton } from '@/components/ui/ProjectSkeleton';
import Container from '@/components/Layout/Container';

// Lazy loading dos componentes pesados para melhor performance
const ProjectShowcase = React.lazy(() => import('../components/ProjectShowcase'));
const BacklogCycle = React.lazy(() => import('../components/BacklogCycle'));
const Contact = React.lazy(() => import('../components/Contact'));
const Footer = React.lazy(() => import('@/components/Footer'));

const Index = () => {
  const { trackPageView } = usePageTracking();
  const [isLoading, setIsLoading] = useState(true);

  // Track page view on component mount
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);
  
  // Simular carregamento inicial
  useEffect(() => {
    // Definir um tempo mínimo de carregamento para evitar flash de conteúdo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const profileData = {
    name: "Tarcisio Bispo de Araujo"
  };

  const projects = [
    {
      projectKey: "fgvLaw",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=75&fm=webp"
    },
    {
      projectKey: "direitoGV",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=75&fm=webp"
    },
    {
      projectKey: "taliparts",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=75&fm=webp"
    },
    {
      projectKey: "tvInstitucional",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=75&fm=webp"
    }
  ];

  // Prefetch de imagens para performance
  const imageSrcs = projects.map(project => project.imageUrl);
  // SPA routes are handled by React Router and don't need prefetching
  usePrefetch({
    routes: [], // Only static files that exist in dist folder
    delay: 3000
  });
  useImagePrefetch(imageSrcs);



  return (
    <div className="min-h-screen flex flex-col">
    <SEO
      title="Tarcisio Bispo | UX/Product Designer"
      description="Portfólio de Tarcisio Bispo de Araujo - UX/Product Designer com foco em estratégia, impacto e experiência do usuário. Especialista em design thinking, prototipagem e pesquisa de usuário."
      keywords="UX Designer, Product Designer, UI/UX, Design Thinking, Prototipagem, Pesquisa de Usuário, Portfolio, Tarcisio Bispo"
      structuredData={mainPageSchema}
    />
    <SkipLink />
    <main id="main-content" className="flex-1 w-full relative transition-colors duration-300">
      {/* Hero Section */}
      <section id="perfil" className="relative overflow-hidden">
        <Container>
          {/* Profile Section */}
          <Profile {...profileData} loading={isLoading} />
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="relative" aria-labelledby="projects-heading">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="projects-heading" className="sr-only">Projetos de UX Design</h2>
            <Suspense fallback={
              <div className="projects-grid">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProjectSkeleton key={i} />
                ))}
              </div>
            }>
              <ProjectShowcase projects={projects} loading={isLoading} />
            </Suspense>
          </motion.div>
        </Container>
      </section>

      {/* Backlog Cycle Section */}
      <section id="backlog" className="relative transition-colors duration-300" aria-labelledby="backlog-heading">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="backlog-heading" className="sr-only">Backlog Estratégico</h2>
            <Suspense fallback={<BacklogSkeleton />}>
              <BacklogCycle loading={isLoading} />
            </Suspense>
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contato" className="relative" aria-labelledby="contact-heading">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="contact-heading" className="sr-only">Contato</h2>
            <Suspense fallback={<ContactSkeleton />}>
              <Contact />
            </Suspense>
          </motion.div>
        </Container>
      </section>

    </main>

    <Suspense fallback={<LoadingSpinner />}>
      <div className="w-full flex justify-center">
        <Footer />
      </div>
    </Suspense>
    </div>
  );
};

export default Index;
