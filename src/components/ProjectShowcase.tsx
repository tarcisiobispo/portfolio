import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
import { ensureStringArray } from '@/utils/translationHelpers';
import { ProjectSkeleton } from '@/components/ui/ProjectSkeleton';

interface ProjectDetails {
  projectKey: string;
  imageUrl: string;
}

interface ProjectShowcaseProps {
  projects: ProjectDetails[];
  loading?: boolean;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects, loading = false }) => {
  // Estado modificado para controlar expansão por projeto
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const { t } = useTranslation();

  // Função atualizada para alternar expansão individual
  const toggleProject = (projectKey: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    setExpandedProjects(prev => ({
      ...prev,
      [projectKey]: !prev[projectKey] // Alterna apenas o estado deste projeto
    }));
  };

  return (
    <section className="w-full py-12">
      <div className="mb-16 text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-8">
          {t('projects.title')}
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8">
          {t('projects.description')}
        </p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto items-start">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => <ProjectSkeleton key={idx} />)
        ) : projects.length > 0 ? (
          projects.map((project, idx) => {
            const isActive = expandedProjects[project.projectKey]; // Estado individual

            return (
              <article
                key={project.projectKey}
                className={`w-full bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-2xl shadow-lg relative project-card focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 transition-all duration-300 self-start ${isActive ? 'shadow-xl ring-1 ring-blue-500/20' : ''
                  }`}
                aria-labelledby={`project-title-${project.projectKey}`}
                aria-describedby={`project-overview-${project.projectKey}`}
              >
                <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden group/image">
                  <OptimizedImage
                    src={project.imageUrl}
                    alt={`${t(`projects.${project.projectKey}.title`)} - ${t('projects.projectImage')}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-105 group-hover/image:brightness-95 block z-[1]"
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                  <div className="absolute inset-0 pointer-events-none transition-all duration-500 group-hover/image:bg-black/10 z-[2]" />
                </div>
                <div className="flex flex-col w-full p-6 lg:p-8 relative bg-transparent">
                  <div className="mb-6">
                    <h2 id={`project-title-${project.projectKey}`} className="text-2xl font-semibold text-[var(--color-text)] w-full mb-3">
                      {t(`projects.${project.projectKey}.title`)}
                    </h2>
                    <p id={`project-overview-${project.projectKey}`} className="text-base text-[var(--color-text-secondary)] w-full line-clamp-3 min-h-[4.5rem]">
                      {t(`projects.${project.projectKey}.overview`)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full mb-6">
                    {(() => {
                      let badges = t(`projects.${project.projectKey}.badges`, { returnObjects: true });
                      if (!Array.isArray(badges) || badges.length === 0 || badges.some(b => typeof b !== 'string' || b.startsWith('projects.'))) {
                        return null;
                      }
                      return badges.slice(0, 3).map((badge, i) => (
                        <span key={i} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-700 rounded-full w-fit font-medium">
                          {badge}
                        </span>
                      ));
                    })()}
                  </div>
                  <div className="w-full flex justify-start items-center gap-4">
                    <button
                      type="button"
                      onClick={(e) => toggleProject(project.projectKey, e)}
                      className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white transition-all duration-300 rounded-lg w-fit shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 ${isActive
                        ? 'bg-gray-600 hover:bg-gray-700'
                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
                        }`}
                      aria-expanded={isActive}
                    >
                      {isActive ? t('projects.seeLess') : t('projects.seeMore')}
                      {isActive
                        ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      }
                    </button>
                    <Link
                      to={`/projetos/${project.projectKey}`}
                      className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-white bg-green-600 hover:bg-green-700 transition-all duration-300 rounded-lg w-fit shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-green-500 focus-visible:outline-offset-2"
                      aria-label={`${t('projects.seeResults')} ${t(`projects.${project.projectKey}.title`)}`}
                    >
                      {t('projects.seeResults')}
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>

                  {/* Conteúdo expandido */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{
                          duration: 0.4,
                          height: { type: "spring", stiffness: 100, damping: 15 },
                          opacity: { duration: 0.25 }
                        }}
                        className="w-full overflow-hidden expanded-content"
                      >
                        {/* Conteúdo expandido com margens negativas para preencher todo o card */}
                        <div className="flex flex-col gap-4 sm:gap-6 w-full border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6 mt-2 sm:mt-4 bg-gray-50 dark:bg-gray-800/30 shadow-inner expanded-content-inner" style={{ marginLeft: '-24px', marginRight: '-24px', width: 'calc(100% + 48px)' }}>
                          <div className="w-full">
                            <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.overview')}</h4>
                            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">{t(`projects.${project.projectKey}.overview`)}</p>
                          </div>
                          <div className="w-full">
                            <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.discovery')}</h4>
                            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">{t(`projects.${project.projectKey}.discovery`)}</p>
                          </div>
                          <div className="w-full">
                            <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.solution')}</h4>
                            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">{t(`projects.${project.projectKey}.solution`)}</p>
                          </div>
                          <div className="w-full">
                            <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.iteration')}</h4>
                            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">{t(`projects.${project.projectKey}.iteration`)}</p>
                          </div>
                          <div className="w-full">
                            <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.outcomes')}</h4>
                            <ul className="list-disc pl-4 sm:pl-6 space-y-1.5 sm:space-y-2 w-full">
                              {ensureStringArray(t(`projects.${project.projectKey}.outcomes`, { returnObjects: true })).map((item: string, itemIdx: number) => (
                                <li key={itemIdx} className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="w-full">
                            <h4 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2 border-l-3 sm:border-l-4 border-blue-500 pl-4 sm:pl-6">{t('projects.insights')}</h4>
                            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] italic leading-relaxed">{t(`projects.${project.projectKey}.insights`)}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </article>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-[var(--color-muted)]">{t('projects.noProjects')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectShowcase;