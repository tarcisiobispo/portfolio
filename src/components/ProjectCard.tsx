import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProjectCardProps {
  title: string;
  category: string;
  overview: string;
  discovery: string;
  solution: string;
  iteration: string;
  outcomes: string[];
  insights: string;
  imageUrl?: string;
  expandedByDefault?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  overview,
  discovery,
  solution,
  iteration,
  outcomes,
  insights,
  imageUrl,
  expandedByDefault = false,
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(expandedByDefault);

  const toggleExpansion = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    setIsExpanded(prev => !prev);
    console.log('ProjectCard: Toggling expansion from', isExpanded, 'to', !isExpanded);
  };
  
  return (
    <article 
      className={`w-full bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-2xl shadow-lg relative transition-all duration-300 ${
        isExpanded ? 'shadow-xl ring-1 ring-blue-500/20' : ''
      }`}
      aria-labelledby={`project-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      aria-describedby={`project-overview-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Imagem do projeto (se fornecida) */}
      {imageUrl && (
        <div className="relative w-full aspect-video overflow-hidden group/image">
          <img
            src={imageUrl}
            alt={`${title} - ${t('projects.projectImage')}`}
            className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-105 group-hover/image:brightness-95 block z-[1]"
            loading="lazy"
          />
          <div className="absolute inset-0 pointer-events-none transition-all duration-500 group-hover/image:bg-black/10 z-[2]" />
        </div>
      )}
      
      <div className="flex flex-col w-full p-6 lg:p-8 relative bg-transparent">
        {/* Cabeçalho do card */}
        <div className="mb-6">
          <span className="text-sm font-medium text-[var(--color-primary)] mb-2 block">{category}</span>
          <h2 id={`project-title-${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-2xl font-semibold text-[var(--color-text)] w-full mb-3">
            {title}
          </h2>
          <p id={`project-overview-${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-base text-[var(--color-text-secondary)] w-full line-clamp-3">
            {overview}
          </p>
        </div>

        {/* Botão de expansão */}
        <div className="w-full flex justify-start mb-4">
          <button
            type="button"
            onClick={toggleExpansion}
            className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white transition-all duration-300 rounded-lg w-fit shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 ${
              isExpanded
                ? 'bg-gray-600 hover:bg-gray-700'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
            }`}
            aria-expanded={isExpanded}
          >
            {isExpanded ? t('projects.seeLess') : t('projects.seeMore')}
            {isExpanded
              ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            }
          </button>
        </div>

        {/* Conteúdo expandido */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{
                duration: 0.4,
                height: { type: "spring", stiffness: 100, damping: 15 },
                opacity: { duration: 0.25 }
              }}
              className="w-full overflow-hidden expanded-content"
            >
              <div className="flex flex-col gap-4 sm:gap-6 w-full border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6 mt-2 sm:mt-4 bg-gray-50 dark:bg-gray-800/30 shadow-inner expanded-content-inner -mx-6 px-6">
                
                {/* Overview expandida */}
                <div className="w-full">
                  <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.overview')}</h4>
                  <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">{overview}</p>
                </div>

                {/* Discovery */}
                <div className="w-full">
                  <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.discovery')}</h4>
                  <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">{discovery}</p>
                </div>

                {/* Solution */}
                <div className="w-full">
                  <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.solution')}</h4>
                  <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">{solution}</p>
                </div>

                {/* Iteration */}
                <div className="w-full">
                  <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.iteration')}</h4>
                  <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">{iteration}</p>
                </div>

                {/* Outcomes */}
                <div className="w-full">
                  <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.outcomes')}</h4>
                  <ul className="list-disc pl-4 sm:pl-6 space-y-1.5 sm:space-y-2 w-full">
                    {outcomes.map((item, idx) => (
                      <li key={idx} className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Insights */}
                <div className="w-full">
                  <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.insights')}</h4>
                  <p className="text-sm sm:text-base text-[var(--color-text-secondary)] italic leading-relaxed">{insights}</p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};

export default ProjectCard;
