import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Profile from '../components/Profile';
import SkipLink from '@/components/SkipLink';
import SEO from '@/components/SEO';
import LoadingSpinner from '@/components/LoadingSpinner';
import { mainPageSchema } from '@/utils/structuredData';
import { usePrefetch, useImagePrefetch } from '@/hooks/usePrefetch';
import { usePageTracking } from '@/hooks/useAnalytics';
import { ProjectSkeleton, ProfileSkeleton, BacklogSkeleton, ContactSkeleton } from '@/components/ui/ProjectSkeleton';
import Container from '@/components/Layout/Container';
import { lazyWithRetry } from '../utils/lazyWithRetry'; // Using relative path to avoid module resolution issues

// Lazy loading dos componentes pesados para melhor performance
const ProjectShowcase = lazyWithRetry(() => import('../components/ProjectShowcase'));
const BacklogCycle = lazyWithRetry(() => import('../components/BacklogCycle'));
const Contact = lazyWithRetry(() => import('../components/Contact'));
const Footer = lazyWithRetry(() => import('@/components/Footer'));

const Index = () => {
  const { trackPageView } = usePageTracking();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

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

  // Lidar com âncoras quando a página carrega (vindas de páginas de projeto)
  useEffect(() => {
    if (!isLoading && location.hash) {
      const sectionId = location.hash.substring(1); // Remove o #
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // Pequeno delay para garantir que o conteúdo foi renderizado
      }
    }
  }, [isLoading, location.hash]);

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
      <section id="perfil" className="relative overflow-hidden" data-section="perfil">
        <Container>
          {/* Profile Section */}
          <Profile {...profileData} loading={isLoading} />
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="relative" aria-labelledby="projects-heading" data-section="projetos">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="projects-heading" className="sr-only">{t('index.projectsHeading')}</h2>
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
      <section id="backlog" className="relative transition-colors duration-300" aria-labelledby="backlog-heading" data-section="backlog">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="backlog-heading" className="sr-only">{t('index.backlogHeading')}</h2>
            <Suspense fallback={<BacklogSkeleton />}>
              <BacklogCycle loading={isLoading} />
            </Suspense>
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contato" className="relative" aria-labelledby="contact-heading" data-section="contato">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="contact-heading" className="sr-only">{t('index.contactHeading')}</h2>
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
