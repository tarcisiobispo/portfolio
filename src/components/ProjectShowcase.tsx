import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CTAButton from '@/components/ui/CTAButton';
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
        <h1 className="text-center">
          {t('projects.title')}
        </h1>
        <div className="h-1 w-20 mb-6 rounded mx-auto" style={{ background: "var(--color-primary)" }}></div>
      </motion.div>

      {/* Projects Grid - Centralizado */}
      <div className="projects-grid max-w-6xl mx-auto">
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
            {/* Project Image - Nielsen Norman Optimized */}
            <div className="project-card-image-container">
              <img
                src={project.imageUrl}
                alt={`${t(`projects.${project.projectKey}.title`)} - ${t('projects.projectImage')}`}
                className="project-card-image"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
              />

              {/* Overlay sutil para efeito visual */}
              <div className="project-card-overlay"></div>
            </div>

            {/* Project Content */}
            <div className="project-card-content">
              {/* Título e Skills */}
              <div className="mb-6">
                <h3 id={`project-title-${index}`} className="project-card-title">
                  {t(`projects.${project.projectKey}.title`)}
                </h3>

                {/* Badges de Skills/Metodologias - Top 3 */}
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
              </div>

              {/* Actions Row */}
              <div className="project-card-actions">
                {/* Ver mais Button */}
                <CTAButton
                  onClick={() => toggleProject(index)}
                  variant="ghost"
                  size="sm"
                  icon={activeProject === index ? EyeOff : Eye}
                  iconPosition="left"
                  ariaLabel={activeProject === index ? 'Ocultar detalhes do projeto' : 'Ver mais detalhes do projeto'}
                  className="text-sm"
                >
                  {activeProject === index ? 'Ver menos' : 'Ver mais'}
                </CTAButton>
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
                        <h6 className="border-l-3 border-[var(--color-primary)] pl-3">
                          {t('projects.overview')}
                        </h6>
                        <p className="text-[var(--color-muted)] leading-relaxed text-sm pl-6">
                          {t(`projects.${project.projectKey}.overview`)}
                        </p>
                      </div>

                      {/* Discovery Section */}
                      <div className="space-y-3">
                        <h6 className="border-l-3 border-[var(--color-primary)] pl-3">
                          {t('projects.discovery')}
                        </h6>
                        <p className="text-[var(--color-muted)] leading-relaxed text-sm pl-6">
                          {t(`projects.${project.projectKey}.discovery`)}
                        </p>
                      </div>

                      {/* Solution Section */}
                      <div className="space-y-3">
                        <h6 className="border-l-3 border-[var(--color-primary)] pl-3">
                          {t('projects.solution')}
                        </h6>
                        <p className="text-[var(--color-muted)] leading-relaxed text-sm pl-6">
                          {t(`projects.${project.projectKey}.solution`)}
                        </p>
                      </div>

                      {/* Iteration Section */}
                      <div className="space-y-3">
                        <h6 className="border-l-3 border-[var(--color-primary)] pl-3">
                          {t('projects.iteration')}
                        </h6>
                        <p className="text-[var(--color-muted)] leading-relaxed text-sm pl-6">
                          {t(`projects.${project.projectKey}.iteration`)}
                        </p>
                      </div>

                      {/* Outcomes Section */}
                      <div className="space-y-3">
                        <h6 className="border-l-3 border-[var(--color-primary)] pl-3">
                          {t('projects.outcomes')}
                        </h6>
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
                        <h6 className="border-l-3 border-[var(--color-primary)] pl-3">
                          {t('projects.insights')}
                        </h6>
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