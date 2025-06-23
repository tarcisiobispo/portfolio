import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface SimpleProject {
  id: string;
  title: string;
  description: string;
}

const ProjectShowcaseDebug: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const projects: SimpleProject[] = [
    { id: 'test1', title: 'Projeto Teste 1', description: 'Descrição do primeiro projeto de teste' },
    { id: 'test2', title: 'Projeto Teste 2', description: 'Descrição do segundo projeto de teste' }
  ];

  const toggleProject = (projectId: string) => {
    console.log('🔄 Debug: toggleProject called with:', projectId);
    console.log('🔄 Debug: Current state:', expandedProjects);
    
    setExpandedProjects(prev => {
      const newState = {
        ...prev,
        [projectId]: !prev[projectId]
      };
      console.log('✅ Debug: New state:', newState);
      return newState;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Debug ProjectShowcase</h1>
      
      <div className="grid gap-6">
        {projects.map((project) => {
          const isExpanded = expandedProjects[project.id];
          console.log(`🎯 Debug: Rendering ${project.id}, isExpanded = ${isExpanded}`);
          
          return (
            <div 
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border"
            >
              <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
              
              <button
                type="button"
                onClick={() => toggleProject(project.id)}
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all duration-300 ${
                  isExpanded 
                    ? 'bg-gray-600 hover:bg-gray-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                aria-expanded={isExpanded}
              >
                {isExpanded ? 'Ocultar detalhes' : 'Ver detalhes'}
                {isExpanded 
                  ? <EyeOff className="w-4 h-4" /> 
                  : <Eye className="w-4 h-4" />
                }
              </button>

              {/* Conteúdo expandido */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{
                      duration: 0.4,
                      height: { type: "spring", stiffness: 100, damping: 15 },
                      opacity: { duration: 0.25 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mt-4 border-t border-gray-200 dark:border-gray-600">
                      <h4 className="font-semibold text-lg mb-2">Conteúdo Expandido</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Este é o conteúdo que deve aparecer quando o card é expandido.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        <strong>Estado atual:</strong> {isExpanded ? 'Expandido' : 'Recolhido'}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>ID do projeto:</strong> {project.id}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
        <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Estado Atual:</h3>
        <pre className="text-sm text-yellow-700 dark:text-yellow-300">
          {JSON.stringify(expandedProjects, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ProjectShowcaseDebug;