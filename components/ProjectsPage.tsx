import React from 'react';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';

interface ProjectsPageProps {
  onGoBack: () => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onGoBack }) => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
       <div className="max-w-5xl mx-auto px-6 mb-10 animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
         {/* Back Button */}
        <button 
          onClick={onGoBack}
          className="flex items-center gap-2 text-blue-500 mb-6 group hover:text-blue-400 transition-colors"
        >
            <span className="text-base transition-transform group-hover:-translate-x-1">&lt;</span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold">Back to Home</span>
        </button>
        
         <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <h1 className="text-3xl md:text-5xl font-black text-primary mb-3">
                  ALL <span className="text-secondary">PROJECTS</span>
                </h1>
                <p className="text-secondary text-base max-w-lg">
                   A comprehensive collection of my engineering and design work.
                </p>
            </div>
         </div>
       </div>

       <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up opacity-0" style={{ animationDelay: '200ms' }}>
             {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
             ))}
          </div>
       </div>
    </div>
  );
};

export default ProjectsPage;