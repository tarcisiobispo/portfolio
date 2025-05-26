import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '@/components/OptimizedImage';
import { ensureStringArray } from '@/utils/translationHelpers';
import '@/styles/project-cards.css';

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
      {/* Header Section - Padronizado com Contact */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 text-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4">
          {t('projects.title')}
        </h1>
        <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
          {t('projects.description')}
        </p>
      </motion.div>

      {/* Projects Grid - NOVO DESIGN LIMPO */}
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
            {/* Imagem */}
            <div className="project-card-image-container">
              <OptimizedImage
                src={project.imageUrl}
                alt={`${t(`projects.${project.projectKey}.title`)} - ${t('projects.projectImage')}`}
                className="project-card-image"
                loading="lazy"
                width={600}
                height={300}
              />
            </div>

            {/* Conteúdo */}
            <div className="project-card-content">
              {/* Título */}
              <h3 id={`project-title-${index}`} className="project-card-title">
                {t(`projects.${project.projectKey}.title`)}
              </h3>

              {/* Descrição */}
              <p className="project-card-description">
                {t(`projects.${project.projectKey}.overview`)}
              </p>

              {/* Badges - SEMPRE 3 BADGES PARA ALTURA UNIFORME */}
              <div className="project-card-tags">
                {(() => {
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

                  let badges = projectBadges[project.projectKey] || [];

                  // GARANTIR EXATAMENTE 3 BADGES PARA ALTURA UNIFORME
                  if (badges.length > 3) {
                    badges = badges.slice(0, 3); // Limita a 3 badges
                  } else if (badges.length < 3) {
                    // Adiciona badges genéricos se necessário (fallback)
                    const fallbackBadges = [
                      t('projects.badges.design'),
                      t('projects.badges.strategy'),
                      t('projects.badges.research')
                    ];
                    while (badges.length < 3) {
                      badges.push(fallbackBadges[badges.length] || 'UX Design');
                    }
                  }

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
                    <EyeOff size={14} style={{ marginLeft: '8px' }} />
                  ) : (
                    <Eye size={14} style={{ marginLeft: '8px' }} />
                  )}
                </button>
              </div>

              {/* Conteúdo Expansivo */}
              <AnimatePresence>
                {activeProject === index && (
                  <motion.div
                    id={`project-details-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="project-expanded-content">

                      {/* Overview */}
                      <div className="project-section">
                        <h4 className="project-section-title">
                          {t('projects.overview')}
                        </h4>
                        <p className="project-section-content">
                          {t(`projects.${project.projectKey}.overview`)}
                        </p>
                      </div>

                      {/* Discovery */}
                      <div className="project-section">
                        <h4 className="project-section-title">
                          {t('projects.discovery')}
                        </h4>
                        <p className="project-section-content">
                          {t(`projects.${project.projectKey}.discovery`)}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="project-section">
                        <h4 className="project-section-title">
                          {t('projects.solution')}
                        </h4>
                        <p className="project-section-content">
                          {t(`projects.${project.projectKey}.solution`)}
                        </p>
                      </div>

                      {/* Iteration */}
                      <div className="project-section">
                        <h4 className="project-section-title">
                          {t('projects.iteration')}
                        </h4>
                        <p className="project-section-content">
                          {t(`projects.${project.projectKey}.iteration`)}
                        </p>
                      </div>

                      {/* Outcomes */}
                      <div className="project-section">
                        <h4 className="project-section-title">
                          {t('projects.outcomes')}
                        </h4>
                        <ul className="project-outcomes-list">
                          {(() => {
                            const outcomesRaw = t(`projects.${project.projectKey}.outcomes`, { returnObjects: true });
                            const outcomes = ensureStringArray(outcomesRaw);

                            return outcomes.map((item: string, idx: number) => (
                              <li key={idx} className="project-outcome-item">
                                <div className="project-outcome-bullet"></div>
                                <span>{item}</span>
                              </li>
                            ));
                          })()}
                        </ul>
                      </div>

                      {/* Insights */}
                      <div className="project-section">
                        <h4 className="project-section-title">
                          {t('projects.insights')}
                        </h4>
                        <p className="project-section-content" style={{ fontStyle: 'italic' }}>
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