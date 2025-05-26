import * as React from 'react';
import { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import BackToTop from "@/components/ui/BackToTop";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import DebugTranslations from "@/components/DebugTranslations";
import FluidGradientBackground, { GradientSectionIndicator } from "@/components/FluidGradientBackground";
import FluidGradientDemo from "@/components/examples/FluidGradientDemo";


// Lazy loading dos componentes de página para code splitting
const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));

const queryClient = new QueryClient();

const App = () => {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AnalyticsProvider>

          {/* Skip Links para Navegação por Teclado */}
          <a href="#main-content" className="skip-link">
            {t('accessibility.features.skipToContent')}
          </a>
          <a href="#navigation" className="skip-link">
            {t('accessibility.features.skipToNavigation')}
          </a>

          <Toaster />
          <Sonner />

          {/* Debug Translations - apenas em desenvolvimento */}
          {import.meta.env.DEV && <DebugTranslations />}

          {/* Sistema de Gradientes Fluidos */}
          <FluidGradientBackground />

          {/* Indicador de Seção (apenas em desenvolvimento) */}
          {import.meta.env.DEV && <GradientSectionIndicator />}
          {import.meta.env.DEV && <FluidGradientDemo />}

          {/* UX Premium Components */}
          <BackToTop />

          <Header />
          <BrowserRouter
            basename="/portfolio"
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}
          >
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          </AnalyticsProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
