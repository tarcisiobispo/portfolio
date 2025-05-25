import React, { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import Profile from '../components/Profile';
import SkipLink from '@/components/SkipLink';
import SEO from '@/components/SEO';
import LoadingSpinner from '@/components/LoadingSpinner';
import { mainPageSchema } from '@/utils/structuredData';
import { usePrefetch, useImagePrefetch } from '@/hooks/usePrefetch';
import { usePageTracking } from '@/hooks/useAnalytics';

// Lazy loading dos componentes pesados para melhor performance
const ProjectShowcase = React.lazy(() => import('../components/ProjectShowcase'));
const BacklogCycle = React.lazy(() => import('../components/BacklogCycle'));
const Contact = React.lazy(() => import('../components/Contact'));
const Footer = React.lazy(() => import('@/components/Footer'));

const Index = () => {
  const { trackPageView } = usePageTracking();

  // Track page view on component mount
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  const profileData = {
    name: "Tarcisio Bispo de Araujo"
  };

  const projects = [
    {
      projectKey: "fgvLaw",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
    },
    {
      projectKey: "direitoGV",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    },
    {
      projectKey: "taliparts",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80"
    },
    {
      projectKey: "tvInstitucional",
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // Prefetch de rotas e imagens para performance
  const imageSrcs = projects.map(project => project.imageUrl);
  usePrefetch({
    routes: ['/privacy-policy'],
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
    <main id="main-content" className="flex-1 w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section with Animated Background */}
      <div id="perfil" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(26,63,212,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(26,63,212,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.05),transparent_70%)]"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Profile Section */}
          <Profile {...profileData} />


        </div>
      </div>

      {/* Projects Section */}
      <div id="projetos" className="py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <ProjectShowcase projects={projects} />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Backlog Cycle Section with Pattern Background */}
      <div id="backlog" className="py-12 relative bg-gradient-to-b from-slate-100 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,63,212,0.03),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_70%)]"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <BacklogCycle />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contato" className="py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Contact />
            </Suspense>
          </motion.div>
        </div>
      </div>

    </main>

    <Suspense fallback={<LoadingSpinner />}>
      <Footer />
    </Suspense>
    </div>
  );
};

export default Index;
