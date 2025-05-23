import React from 'react';

interface ProjectCardProps {
  title: string;
  category: string;
  overview: string;
  discovery: string;
  solution: string;
  iteration: string;
  outcomes: string[];
  insights: string;
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
}) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <span className="text-sm font-medium text-portfolio-blue">{category}</span>
      <h3 className="text-xl font-semibold mt-1">{title}</h3>
      <div className="mt-4 space-y-4">
        <div>
          <h4 className="font-medium mb-1">Overview</h4>
          <p>{overview}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Discovery</h4>
          <p>{discovery}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Solution</h4>
          <p>{solution}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Iteration</h4>
          <p>{iteration}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Outcomes</h4>
          <ul className="list-disc pl-5">
            {outcomes.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-1">Insights</h4>
          <p>{insights}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
