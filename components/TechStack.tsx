import React from 'react';
import { TerminalIcon } from './icons';

const technologies = [
  "TypeScript", "React", "Next.js", "PostgreSQL", 
  "MongoDB", "Python", "Rust", "Vercel"
];

const TechStack: React.FC = () => {
  return (
    <div className="py-12 border-y border-white/5 bg-white/[0.02]">
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <div className="flex items-center gap-3 text-gray-400 min-w-fit">
          <TerminalIcon className="w-5 h-5 text-blue-400" />
          <span className="font-medium text-sm tracking-wider uppercase">Currently working with</span>
        </div>
        
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {technologies.map((tech) => (
            <span key={tech} className="text-gray-300 hover:text-white transition-colors cursor-default font-medium">
              {tech}
            </span>
          ))}
          <span className="text-gray-600">and more...</span>
        </div>
      </div>
    </div>
  );
};

export default TechStack;