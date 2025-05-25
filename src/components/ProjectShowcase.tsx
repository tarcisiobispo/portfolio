import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CTAButton from '@/components/ui/CTAButton';
import OptimizedImage from '@/components/OptimizedImage';
import { ensureStringArray } from '@/utils/translationHelpers';

interface ProjectDetails {
  projectKey: string; // Chave para buscar as traduções
  imageUrl: string;
}

interface ProjectShowcaseProps {
  projects: ProjectDetails[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const { t } = useTranslation();

  const toggleProject = (index: number) => {
    setActiveProject(activeProject === index ? null : index);
  };

  return (
    <section className="w-full">
      {/* Header Section - Centralizado e Alinhado */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 text-center"
      >
        <h2 className="text-center">
          {t('projects.title')}
        </h2>
        <div className="h-1 w-20 mb-6 rounded mx-auto" style={{ background: "var(--color-primary)" }}></div>
      </motion.div>

      {/* Projects Grid - SEM LIMITAÇÃO DE LARGURA */}
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            key={project.projectKey}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: "easeOut"
            }}
            className="project-card"
            tabIndex={0}
            role="article"
            aria-labelledby={`project-title-${index}`}
            aria-describedby={`project-overview-${index}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleProject(index);
              }
            }}
          >
            {/* Project Image - Otimizada para Performance */}
            <div className="project-card-image-container">
              <OptimizedImage
                src={project.imageUrl}
                alt={`${t(`projects.${project.projectKey}.title`)} - ${t('projects.projectImage')}`}
                className="project-card-image"
                loading="lazy"
                width={600}
                height={300}
              />

              {/* Overlay sutil para efeito visual */}
              <div className="project-card-overlay"></div>
            </div>

            {/* Project Content - SEM CLASSES TAILWIND QUE INTERFEREM */}
            <div className="project-card-content">
              {/* Título */}
              <h3 id={`project-title-${index}`} className="project-card-title">
                {t(`projects.${project.projectKey}.title`)}
              </h3>

              {/* Descrição */}
              <p className="project-card-description">
                {t(`projects.${project.projectKey}.overview`)}
              </p>

              {/* Tags */}
              <div className="project-card-tags">
                {(() => {
                  // Buscar badges traduzidos para cada projeto
                  const projectBadges: { [key: string]: string[] } = {
                    'fgvLaw': [
                      t('projects.badges.usability'),
                      t('projects.badges.informationArchitecture'),
                      t('projects.badges.userTesting')
                    ],
                    'direitoGV': [
                      t('projects.badges.uxResearch'),
                      t('projects.badges.journeyMapping'),
                      t('projects.badges.stakeholderManagement')
                    ],
                    'taliparts': [
                      t('projects.badges.productStrategy'),
                      t('projects.badges.seo'),
                      t('projects.badges.productValidation')
                    ],
                    'tvInstitucional': [
                      t('projects.badges.visualDesign'),
                      t('projects.badges.communication'),
                      t('projects.badges.engagement')
                    ]
                  };

                  const badges = projectBadges[project.projectKey] || [];

                  return badges.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className="project-card-tag"
                    >
                      {badge}
                    </span>
                  ));
                })()}
              </div>

              {/* Botão */}
              <div className="project-card-actions">
                <button
                  onClick={() => toggleProject(index)}
                  className="project-card-button"
                  aria-label={activeProject === index ? t('projects.seeLess') : t('projects.seeMore')}
                >
                  {activeProject === index ? t('projects.seeLess') : t('projects.seeMore')}
                  {activeProject === index ? (
                    <EyeOff className="w-3.5 h-3.5 ml-2" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 ml-2" />
                  )}
                </button>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {activeProject === index && (
                  <motion.div
                    id={`project-details-${index}`}
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-[var(--color-border)]/30 space-y-6">

                      {/* Overview Section */}
                      <div className="space-y-3">
                        <h4 className="border-l-3 border-[var(--color-primary)] pl-3 text-base font-semibold">
                          {t('projects.overview')}
                        </h4>
                        <p className="text-[var(--color-muted)] leading-relaxed text-sm pl-6">
                          {t(`projects.${project.projectKey}.overview`)}
                        </p>
                      </div>

                      {/* Discovery Section */}
                      <div className="space-y-3">
                        <h4 className="border-l-3 border-[var(--color-primary)] pl-3 text-base font-semibold">
                          {t('projects.discovery')}
                        </h4>
                        <p className="text-[var(--color-muted)] leading-relaxed text-sm pl-6">
                          {t(`projects.${project.projectKey}.discovery`)}
                        </p>
                      </div>

                      {/* Solution Section */}
                      <div className="space-y-3">
                        <h4 className="border-l-3 border-[var(--color-primary)] pl-3 text-base font-semibold">
                          {t('projects.solution')}
                        </h4>
                        <p className="text-[var(--color-muted)] leading-relaxed text-sm pl-6">
                          {t(`projects.${project.projectKey}.solution`)}
                        </p>
                      </div>

                      {/* Iteration Section */}
                      <div className="space-y-3">
                        <h4 className="border-l-3 border-[var(--color-primary)] pl-3 text-base font-semibold">
                          {t('projects.iteration')}
                        </h4>
                        <p className="text-[var(--color-muted)] leading-relaxed text-sm pl-6">
                          {t(`projects.${project.projectKey}.iteration`)}
                        </p>
                      </div>

                      {/* Outcomes Section */}
                      <div className="space-y-3">
                        <h4 className="border-l-3 border-[var(--color-primary)] pl-3 text-base font-semibold">
                          {t('projects.outcomes')}
                        </h4>
                        <ul className="space-y-2 pl-6">
                          {(() => {
                            const outcomesRaw = t(`projects.${project.projectKey}.outcomes`, { returnObjects: true });
                            const outcomes = ensureStringArray(outcomesRaw);

                            return outcomes.map((item: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3 text-[var(--color-muted)] text-sm">
                                <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ));
                          })()}
                        </ul>
                      </div>

                      {/* Insights Section */}
                      <div className="space-y-3">
                        <h4 className="border-l-3 border-[var(--color-primary)] pl-3 text-base font-semibold">
                          {t('projects.insights')}
                        </h4>
                        <p className="text-[var(--color-muted)] leading-relaxed text-sm pl-6 italic">
                          {t(`projects.${project.projectKey}.insights`)}
                        </p>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;