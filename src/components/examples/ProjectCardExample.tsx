import React from 'react';
import ProjectCard from '@/components/ProjectCard';

const ProjectCardExample: React.FC = () => {
  const sampleProject = {
    title: "Exemplo de Projeto",
    category: "UX Design",
    overview: "Este é um exemplo de projeto para demonstrar a funcionalidade de expansão do ProjectCard.",
    discovery: "Durante a fase de descoberta, identificamos que os usuários precisavam de uma melhor experiência de navegação.",
    solution: "Desenvolvemos uma solução inovadora que melhora significativamente a usabilidade.",
    iteration: "Após testes com usuários, refinamos a interface baseada no feedback recebido.",
    outcomes: [
      "Aumento de 35% na satisfação do usuário",
      "Redução de 50% no tempo de navegação",
      "Melhoria de 25% na taxa de conversão"
    ],
    insights: "A simplicidade na interface resulta em melhor experiência do usuário e melhores resultados de negócio.",
    imageUrl: "https://via.placeholder.com/600x400/4f46e5/ffffff?text=Projeto+Exemplo"
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Teste do ProjectCard</h1>
      <ProjectCard {...sampleProject} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Funcionalidade Implementada:</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>✅ Estado de expansão com useState</li>
          <li>✅ Botão de toggle com ícones (Eye/EyeOff)</li>
          <li>✅ Animações suaves com framer-motion</li>
          <li>✅ Design responsivo</li>
          <li>✅ Logging no console para debug</li>
          <li>✅ Suporte a imagem opcional</li>
          <li>✅ Tradução com react-i18next</li>
          <li>✅ Acessibilidade (aria-expanded, aria-labelledby)</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectCardExample;