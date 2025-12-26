import React from 'react';
import { Project } from '../types';
import { ExternalLinkIcon } from './icons';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const handleClick = () => {
    if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="group flex flex-col h-full p-6 bg-surface border border-primary/10 rounded-2xl hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 cursor-pointer hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Live badge in corner (pill style) */}
      {project.link && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3 bg-black/40 border border-white/5 px-3 py-1 rounded-full text-xs font-semibold text-white/90 backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
          <span className="uppercase tracking-wide">LIVE</span>
        </div>
      )}
      <div className="flex items-start justify-between mb-5 relative z-10">
        {/* Logo Placeholder - using the image as a logo */}
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-primary/10 bg-primary/5 shadow-sm group-hover:scale-105 transition-transform duration-500">
             <img 
               src={project.image} 
               alt={project.title} 
               className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
             />
        </div>
        
        {/* External Link Icon (visible on hover) */}
        <ExternalLinkIcon className="w-4 h-4 text-secondary group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 duration-300" />
      </div>

      <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-blue-500 transition-colors relative z-10">
        {project.title}
      </h3>
      
      <p className="text-secondary text-sm leading-relaxed mb-6 flex-grow relative z-10">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] font-medium text-secondary bg-primary/5 rounded border border-primary/5 group-hover:border-primary/10 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Circular live action button (bottom-right) */}
      {project.link && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(project.link, '_blank');
          }}
          aria-label={`Open ${project.title} live site`}
          className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full border border-white/6 bg-black/40 flex items-center justify-center text-white/90 hover:scale-105 transition-transform duration-150"
        >
          <ExternalLinkIcon className="w-4 h-4" />
        </button>
      )}

      {/* Subtle Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default ProjectCard;