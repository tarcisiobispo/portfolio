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
import { GTMHead, GTMBody } from "@/components/analytics/GoogleTagManager";
import { ANALYTICS_CONFIG } from "@/config/analytics";
import DebugTranslations from "@/components/DebugTranslations";


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
          {/* Google Tag Manager - Head Script */}
          {ANALYTICS_CONFIG.ENABLED && (
            <GTMHead gtmId={ANALYTICS_CONFIG.GTM_ID} />
          )}

          {/* Google Tag Manager - Body NoScript */}
          {ANALYTICS_CONFIG.ENABLED && (
            <GTMBody gtmId={ANALYTICS_CONFIG.GTM_ID} />
          )}

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
          <DebugTranslations />

          {/* UX Premium Components */}
          <BackToTop />

          <Header />
          <BrowserRouter basename="/portfolio">
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
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
