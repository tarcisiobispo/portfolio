import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CTAButton from '@/components/ui/CTAButton';

interface BacklogItem {
  id: string;
  challenge: string;
  solution: string;
  result: string;
  note: string;
}

const ITEMS_PER_PAGE = 4;

const BacklogCycle: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  // Agora os itens vêm das traduções
  const backlogItems = t('backlog.items', { returnObjects: true }) as Array<{
    challenge: string;
    solution: string;
    result: string;
    note: string;
  }>;

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
    <section className="w-full">
      {/* Header Section - Centralizado e Alinhado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-center">{t('backlog.title')}</h1>
        <div className="h-1 w-20 mb-6 rounded mx-auto" style={{ background: "var(--color-primary)" }}></div>
        <p className="mb-0 max-w-3xl mx-auto text-center" style={{ color: "var(--color-muted)" }}>
          {t('backlog.description')}
        </p>
      </motion.div>

      {/* Content Section - Centralizado */}
      <motion.div
        className="w-full max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Accordion type="single" collapsible className="w-full space-y-6">
          {paginatedItems.length === 0 ? (
            <div className="text-center py-8" style={{ color: "var(--color-muted)" }}>
              {t('backlog.noItems')}
            </div>
          ) : (
            paginatedItems.map((item) => (
              <AccordionItem value={item.id} key={item.id} className="overflow-hidden border-none">
                <div className="relative w-full">
                  {/* Decorative vertical line */}
                  <div className="absolute left-8 top-0 h-full w-0.5 opacity-20 z-0" style={{ backgroundColor: "var(--color-primary)" }}></div>
                  <div className="w-full rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border relative z-10" style={{ backgroundColor: "var(--color-card-bg)", borderColor: "var(--color-border)" }}>
                    <AccordionTrigger className="px-8 py-6 text-left font-medium hover:no-underline group" style={{ color: "var(--color-text)" }}>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary-dark)" }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg pr-8 group-hover:transition-colors" style={{ color: "var(--color-primary-dark)" }}>
                            {item.challenge}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="px-8 pb-6 pl-[4.5rem] space-y-6"
                      >
                        <div className="space-y-4 border-l-2 pl-6 relative" style={{ borderColor: "var(--color-primary)" }}>
                          <div className="absolute w-3 h-3 rounded-full -left-[7px] top-2" style={{ backgroundColor: "var(--color-primary)" }}></div>
                          <h4 className="font-semibold" style={{ color: "var(--color-title-secondary)" }}>{t('backlog.solution')}</h4>
                          <p style={{ color: "var(--color-text)" }}>{item.solution}</p>
                        </div>
                        <div className="space-y-4 border-l-2 pl-6 relative" style={{ borderColor: "var(--color-accent)" }}>
                          <div className="absolute w-3 h-3 rounded-full -left-[7px] top-2" style={{ backgroundColor: "var(--color-accent)" }}></div>
                          <h4 className="font-semibold" style={{ color: "var(--color-title-secondary)" }}>{t('backlog.result')}</h4>
                          <p style={{ color: "var(--color-text)" }}>{item.result}</p>
                        </div>
                        <div className="space-y-4 border-l-2 pl-6 relative" style={{ borderColor: "var(--color-secondary)" }}>
                          <div className="absolute w-3 h-3 rounded-full -left-[7px] top-2" style={{ backgroundColor: "var(--color-secondary)" }}></div>
                          <h4 className="font-semibold" style={{ color: "var(--color-title-secondary)" }}>{t('backlog.note')}</h4>
                          <p style={{ color: "var(--color-text)" }}>{item.note}</p>
                        </div>
                      </motion.div>
                    </AccordionContent>
                  </div>
                </div>
              </AccordionItem>
            ))
          )}
        </Accordion>

        {/* Paginação */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <CTAButton
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            variant="ghost"
            size="sm"
            icon={ChevronLeft}
            iconPosition="left"
            ariaLabel={t('backlog.previous')}
          >
            {t('backlog.previous')}
          </CTAButton>

          <span className="text-[var(--color-text)] font-medium px-4">
            {t('backlog.page')} {currentPage} {t('backlog.of')} {totalPages}
          </span>

          <CTAButton
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            variant="ghost"
            size="sm"
            icon={ChevronRight}
            iconPosition="right"
            ariaLabel={t('backlog.next')}
          >
            {t('backlog.next')}
          </CTAButton>
        </div>
      </motion.div>
    </section>
  );
};

export default BacklogCycle;
