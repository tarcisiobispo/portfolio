import React, { useState, memo, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { ChevronLeft, ChevronRight, CheckCircle2, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/config';
import CTAButton from '@/components/ui/CTAButton';
import { useTranslationArray } from '@/utils/translationHelpers';
import { useProjectSounds, useNavigationSounds } from '@/hooks/useSound';
import { BacklogSkeleton } from '@/components/ui/ProjectSkeleton';

interface BacklogItem {
  id: string;
  challenge: string;
  solution: string;
  result: string;
  note: string;
}

const ITEMS_PER_PAGE = 4;

interface BacklogCycleProps {
  loading?: boolean;
}

const BacklogCycle: React.FC<BacklogCycleProps> = ({ loading: externalLoading = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [loading, setLoading] = useState(externalLoading);
  const { t } = useTranslation();
  const { playExpand, playCollapse } = useProjectSounds();
  const { playButtonClick, playButtonHover } = useNavigationSounds();
  
  // Forçar atualização quando o idioma mudar
  useEffect(() => {
    const handleLanguageChange = () => {
      // Forçar re-renderização do componente
      setForceUpdate(prev => prev + 1);
      setCurrentPage(1); // Resetar para a primeira página
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  // Tentar obter os itens do idioma atual, com fallback para pt-BR
  const currentResource = i18n.getResourceBundle(i18n.language, 'translation');
  const ptBRResource = i18n.getResourceBundle('pt-BR', 'translation');
  
  // Usar os itens do idioma atual se existirem, senão usar pt-BR como fallback
  const backlogItems = (
    (currentResource?.backlog?.items?.length > 0 
      ? currentResource?.backlog?.items 
      : ptBRResource?.backlog?.items) || []
  ) as Array<{
    challenge: string;
    solution: string;
    result: string;
    note: string;
  }>;
  
  // Simular carregamento se necessário
  useEffect(() => {
    if (externalLoading || backlogItems.length === 0) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [externalLoading, backlogItems.length]);

  // Log para depuração - verificar quantos itens estão sendo carregados
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      console.log(`Idioma atual: ${i18n.language}, Número de itens: ${backlogItems.length}`);
      console.log(`Fonte dos itens: ${currentResource?.backlog?.items?.length > 0 ? 'Idioma atual' : 'Fallback pt-BR'}`);
      
      // Se não houver itens ou menos que o esperado, tentar buscar diretamente
      if (backlogItems.length < 8) {
        console.warn(`⚠️ Número de itens menor que o esperado (${backlogItems.length}/8)`);
      }
    }
  }, [backlogItems.length, forceUpdate, i18n.language]);

  // Adicionar IDs aos itens para o Accordion
  const backlogItemsWithIds = backlogItems.map((item, index) => ({
    ...item,
    id: `backlog-${index + 1}`
  }));

  const totalPages = Math.ceil(backlogItemsWithIds.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedItems = backlogItemsWithIds.slice(startIdx, endIdx);



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="w-full pt-12 pb-[clamp(1.5rem,3vw,2.5rem)]">
      {/* Header Section - Alinhado com Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 sm:mb-10"
      >
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-8">
            {t('backlog.title')}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8">
            {t('backlog.description')}
          </p>
          {/* Linha Azul Animada - Similar ao Hero */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          ></motion.div>
        </div>
      </motion.div>

      {/* Content Section - Alinhado com Header */}
      <motion.div
        className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 justify-start max-w-[1200px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4 [&>*:last-child]:mb-0">
          {loading ? (
            // Mostrar skeleton enquanto carrega
            <BacklogSkeleton />
          ) : paginatedItems.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-muted)]">
              {t('backlog.noItems')}
            </div>
          ) : (
            paginatedItems.map((item, index) => (
              <AccordionItem value={item.id} key={item.id} className="border-none [&>div:last-child]:pb-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-fit"
                >
                  <AccordionTrigger className="px-5 py-3 sm:px-6 sm:py-4 hover:no-underline group [&[data-state=open]]:pb-0">
                    <div className="flex items-center gap-4 w-full min-h-[48px]">
                      {/* Icon Container - Middle Aligned */}
                      <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center self-center">
                        <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)]" />
                      </div>

                      {/* Content Container - Middle Aligned */}
                      <div className="flex-1 text-left flex items-center">
                        <p className="backlog-challenge-text group-hover:text-[var(--color-primary)] transition-colors duration-200 pr-4">
                          {item.challenge}
                        </p>
                      </div>

                      {/* Chevron Icon - Middle Aligned */}
                      <div className="flex-shrink-0 flex items-center justify-center self-center">
                        {/* O ícone do chevron é automaticamente adicionado pelo AccordionTrigger */}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 [&_*]:mb-0 [&>div]:pb-0">
                    <div className="px-5 pb-0 sm:px-6 sm:pb-0">
                      {/* Grid Responsivo para as seções */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 items-start content-start gap-4 sm:gap-5 mb-0 pb-0 min-h-0">

                        {/* Solução */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="self-start bg-[var(--color-primary)]/5 rounded-xl p-3 sm:p-4 h-fit"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center">
                              <Lightbulb className="w-4 h-4 text-[var(--color-primary)]" />
                            </div>
                            <h4 className="font-semibold text-[var(--color-text)]">
                              {t('backlog.solution')}
                            </h4>
                          </div>
                          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-0">
                            {item.solution}
                          </p>
                        </motion.div>

                        {/* Resultado */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="self-start bg-[var(--color-secondary)]/5 rounded-xl p-3 sm:p-4 h-fit"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-[var(--color-secondary)]/10 rounded-lg flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-[var(--color-secondary)]" />
                            </div>
                            <h4 className="font-semibold text-[var(--color-text)]">
                              {t('backlog.result')}
                            </h4>
                          </div>
                          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-0">
                            {item.result}
                          </p>
                        </motion.div>

                        {/* Nota */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          className="self-start rounded-xl p-3 sm:p-4 h-fit"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-[var(--color-muted)]/10 rounded-lg flex items-center justify-center">
                              <Target className="w-4 h-4 text-[var(--color-muted)]" />
                            </div>
                            <h4 className="font-semibold text-[var(--color-text)]">
                              {t('backlog.note')}
                            </h4>
                          </div>
                          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-0">
                            {item.note}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </AccordionContent>
                </motion.div>
              </AccordionItem>
            ))
          )}
        </Accordion>

        {/* Paginação Melhorada */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center items-center gap-4 mt-8"
          >
            <CTAButton
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              variant="ghost"
              size="md"
              icon={ChevronLeft}
              iconPosition="left"
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('backlog.previous')}
            </CTAButton>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    playButtonClick();
                  }}
                  onMouseEnter={() => playButtonHover()}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-[var(--color-primary)] text-white shadow-md'
                      : 'text-[var(--color-muted)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]'
                  }`}
                  aria-label={`${t('backlog.page')} ${page}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <CTAButton
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              variant="ghost"
              size="md"
              icon={ChevronRight}
              iconPosition="right"
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('backlog.next')}
            </CTAButton>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default BacklogCycle;
