import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';

interface ProjectDetails {
  title: string;
  category: string;
  imageUrl: string;
  overview: string;
  discovery: string;
  solution: string;
  iteration: string;
  outcomes: string[];
  insights: string;
}

interface ProjectShowcaseProps {
  projects: ProjectDetails[];
}

const sectionTitles: Record<string, string> = {
  overview: "Visão Geral",
  discovery: "Descoberta",
  solution: "Solução",
  iteration: "Iteração",
  outcomes: "Resultados",
  insights: "Insights",
};

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-portfolio-blue-dark mb-2">Projetos</h2>
        <div className="h-1 w-20 bg-portfolio-blue mb-12"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="project-card rounded-xl overflow-hidden self-start"
          >
            {/* Project Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-white/80 text-sm font-medium">
                  {project.category}
                </span>
                <h3 className="text-white text-xl font-semibold mt-1">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6 bg-white">
              <button
                onClick={() => setActiveProject(activeProject === index ? null : index)}
                className="group inline-flex items-center font-medium text-portfolio-blue hover:text-portfolio-blue-dark transition-colors"
              >
                <Eye size={18} className="mr-2 transition-transform group-hover:scale-110 duration-300" />
                <span>Ver mais</span>
                <ArrowRight
                  size={16}
                  className={`ml-1.5 transition-transform duration-300 ${activeProject === index ? 'rotate-90' : 'group-hover:translate-x-1'}`}
                />
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {activeProject === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-6">
                      <div>
                        <h4 className="font-medium text-portfolio-blue-dark mb-2">{sectionTitles.overview}</h4>
                        <p className="text-portfolio-gray-dark">{project.overview}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-portfolio-blue-dark mb-2">{sectionTitles.discovery}</h4>
                        <p className="text-portfolio-gray-dark">{project.discovery}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-portfolio-blue-dark mb-2">{sectionTitles.solution}</h4>
                        <p className="text-portfolio-gray-dark">{project.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-portfolio-blue-dark mb-2">{sectionTitles.iteration}</h4>
                        <p className="text-portfolio-gray-dark">{project.iteration}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-portfolio-blue-dark mb-2">{sectionTitles.outcomes}</h4>
                        <ul className="list-disc pl-5 text-portfolio-gray-dark">
                          {project.outcomes.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-portfolio-blue-dark mb-2">{sectionTitles.insights}</h4>
                        <p className="text-portfolio-gray-dark">{project.insights}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;