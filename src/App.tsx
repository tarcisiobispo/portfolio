/**
 * App.tsx - Componente principal da aplicação
 * 
 * Utiliza a nova estrutura de lazy loading que agrupa componentes relacionados
 * para melhorar a organização do código e facilitar a manutenção.
 * 
 * Os componentes são agrupados em:
 * - PageComponents: Páginas completas da aplicação
 * - UIComponents: Componentes de interface do usuário
 * - AnalyticsComponents: Componentes de análise e rastreamento
 * - ContentComponents: Seções principais do site
 */

import * as React from 'react';
import { Suspense, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Import lazy loading utilities and component groups
import { lazyWithRetry, withSuspense } from '@/utils/lazyWithRetry';
import LoadingSpinner from "@/components/LoadingSpinner";

// Critical components loaded immediately
import Header from "@/components/Header";

// Use the grouped lazy components
const Index = lazyWithRetry(() => import('@/pages/Index').then(m => ({ default: m.default })));
const NotFound = lazyWithRetry(() => import('@/pages/NotFound').then(m => ({ default: m.default })));
const PrivacyPolicy = lazyWithRetry(() => import('@/pages/PrivacyPolicy').then(m => ({ default: m.default })));
const FluidGradientBackground = lazyWithRetry(() => import('@/components/FluidGradientBackground').then(m => ({ default: m.default })));
const CookieConsent = lazyWithRetry(() => import('@/components/CookieConsent').then(m => ({ default: m.default })));
const AnalyticsProvider = lazyWithRetry(() => import('@/components/analytics/AnalyticsProvider').then(m => ({ default: m.default })));
const LazyScripts = lazyWithRetry(() => import('@/components/LazyScripts').then(m => ({ default: m.default })));

// Components not yet moved to the grouped structure
const GradientSectionIndicator = lazyWithRetry(
  () => import("@/components/FluidGradientBackground")
    .then(module => ({ default: module.GradientSectionIndicator }))
);

const FluidGradientDemo = withSuspense(
  lazyWithRetry(() => import("@/components/examples/FluidGradientDemo")),
  <div>Loading demo...</div>
);

const DebugTranslations = withSuspense(
  lazyWithRetry(() => import("@/components/DebugTranslations")),
  <div>Loading translations...</div>
);

const SoundDemo = withSuspense(
  lazyWithRetry(() => import("@/components/ui/SoundDemo")),
  <div>Loading sound demo...</div>
);

const ProjectShowcaseDebug = withSuspense(
  lazyWithRetry(() => import("@/components/ProjectShowcaseDebug").then(m => ({ default: m.default }))),
  <div>Loading project showcase debugger...</div>
);

// Importar o BackToTop correto (novo, responsivo, acessível)
const BackToTop = lazyWithRetry(() => import('@/components/ui/BackToTop').then(m => ({ default: m.default })));

const queryClient = new QueryClient();

// Componente de fallback para erros
class ErrorBoundary extends React.Component<{children: React.ReactNode, fallback?: React.ReactNode}> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Algo deu errado</h2>
            <p className="mb-4">Por favor, recarregue a página ou tente novamente mais tarde.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ErrorBoundary 
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-4">
                  <h2 className="text-xl font-bold mb-2">Ocorreu um erro</h2>
                  <p>Por favor, recarregue a página ou tente novamente mais tarde.</p>
                </div>
              </div>
            }
          >
            <Suspense 
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              }
            >
              <AnalyticsProvider>
                {/* Skip Link para Navegação por Teclado - Visível apenas com foco */}
                <a 
                  href="#main-content" 
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-md focus:shadow-lg"
                >
                  {t('accessibility.features.skipToContent')}
                </a>

                <Toaster />
                <Sonner />

                {/* Debug Translations - apenas em desenvolvimento */}
                {import.meta.env.DEV && (
                  <Suspense fallback={null}>
                    <DebugTranslations />
                  </Suspense>
                )}

                {/* Sistema de Gradientes Fluidos */}
                <Suspense fallback={null}>
                  <FluidGradientBackground />
                </Suspense>

                {/* Indicador de Seção (apenas em desenvolvimento) */}
                {import.meta.env.DEV && (
                  <Suspense fallback={null}>
                    <GradientSectionIndicator />
                  </Suspense>
                )}
                {import.meta.env.DEV && (
                  <Suspense fallback={null}>
                    <FluidGradientDemo />
                  </Suspense>
                )}

                {/* Sound Demo - apenas em desenvolvimento */}
                {import.meta.env.DEV && (
                  <div className="fixed bottom-4 right-4 z-50">
                    <Suspense fallback={null}>
                      <SoundDemo />
                    </Suspense>
                  </div>
                )}

                {/* UX Premium Components */}
                <Suspense fallback={null}>
                  <BackToTop />
                </Suspense>

                {/* Lazy load third-party scripts */}
                <Suspense fallback={null}>
                  <LazyScripts delay={2000} />
                </Suspense>

                {/* Cookie Consent Banner */}
                <Suspense fallback={null}>
                  <CookieConsent />
                </Suspense>
                
                <Header />
                
                <HashRouter
                  future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                  }}
                >
                  <Suspense 
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <LoadingSpinner />
                      </div>
                    }
                  >
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      {import.meta.env.DEV && (
                        <Route path="/debug-projects" element={<ProjectShowcaseDebug />} />
                      )}
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </HashRouter>
              </AnalyticsProvider>
            </Suspense>
          </ErrorBoundary>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;