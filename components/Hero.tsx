import React from 'react';
import { 
  GithubIcon, 
  TwitterIcon, 
  MailIcon, 
  LinkedInIcon, 
  FileTextIcon,
  SendIcon
} from './icons';
import Spotify from './Spotify';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const techStack = [
    { name: "TypeScript", class: "bg-blue-900/20 text-blue-300 border-blue-500/20" },
    { name: "React", class: "bg-cyan-900/20 text-cyan-300 border-cyan-500/20" },
    { name: "Next.js", class: "bg-neutral-800 text-neutral-300 border-neutral-700" },
    { name: "PostgreSQL", class: "bg-indigo-900/20 text-indigo-300 border-indigo-500/20" },
    { name: "MongoDB", class: "bg-green-900/20 text-green-300 border-green-500/20" },
    { name: "Python", class: "bg-yellow-900/20 text-yellow-300 border-yellow-500/20" },
    { name: "Rust", class: "bg-orange-900/20 text-orange-300 border-orange-500/20" },
    { name: "Vercel", class: "bg-black text-white border-white/20" },
  ];

  return (
    <section id="about" className="min-h-[85vh] flex flex-col justify-center py-16 pt-24">
      <div className="space-y-8">
        
        {/* Status Indicator */}
        <div 
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface border border-primary/10 w-fit animate-fade-in opacity-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] text-secondary font-bold tracking-widest uppercase">Available for work</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-2 animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary leading-tight">
            Hi, I'm Aaryan.
          </h1>
          <p className="text-lg md:text-xl text-[#3b82f6] font-medium tracking-tight">
            Creative Developer / Full-Stack & AI Engineer.
          </p>
        </div>

        {/* Description */}
        <div className="max-w-2xl space-y-4 text-base text-secondary leading-relaxed animate-slide-up opacity-0" style={{ animationDelay: '200ms' }}>
          <p>
            I build fast, reliable, human-centered digital experiences.
          </p>
          <p>
            I love blending thoughtful design with scalable engineering to create products that are genuinely useful.
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="animate-slide-up opacity-0 space-y-3" style={{ animationDelay: '300ms' }}>
           <div className="flex flex-wrap items-center gap-2.5 text-sm">
             <span className="text-primary font-bold mr-2 text-xs">Currently working with</span>
             {techStack.map((tech, index) => (
               <span 
                key={tech.name} 
                className={`px-2.5 py-1 rounded-md border text-[10px] font-semibold transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 cursor-default ${tech.class}`}
               >
                 {tech.name}
               </span>
             ))}
             <span className="text-secondary italic text-[10px] ml-1">and more</span>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap gap-4 animate-slide-up opacity-0" style={{ animationDelay: '400ms' }}>
          
          {/* Contact Me Button - Flying Icon Swap Animation */}
          <button 
             onClick={() => onNavigate('contact')}
            className="group relative px-6 py-2.5 bg-primary text-background rounded-full font-bold text-sm overflow-hidden transition-transform duration-300 hover:scale-[1.05] active:scale-[0.95]"
          >
            {/* Background Fill Effect */}
            <div className="absolute inset-0 bg-blue-500/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            
            <div className="relative flex items-center gap-2">
               <div className="relative overflow-hidden w-4 h-4 flex items-center justify-center">
                   {/* Icon 1: Flies out */}
                   <SendIcon className="absolute inset-0 transition-all duration-500 group-hover:translate-x-full group-hover:-translate-y-full group-hover:opacity-0" />
                   {/* Icon 2: Flies in */}
                   <SendIcon className="absolute inset-0 -translate-x-full translate-y-full opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 text-blue-600" />
               </div>
               <span className="group-hover:text-blue-600 transition-colors duration-300">Contact Me</span>
            </div>
          </button>
          
          {/* CV / Resume Button - Scanning Shine Animation */}
          <a 
            href="#"
            className="group relative px-6 py-2.5 bg-surface text-primary border border-primary/10 rounded-full font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:border-primary/30 active:scale-[0.95]"
          >
            {/* Shine Element */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/10 before:to-transparent" />
            
            <div className="flex items-center gap-2 relative z-10">
              <FileTextIcon className="w-4 h-4 text-secondary group-hover:text-primary transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span>CV / Resume</span>
            </div>
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 text-secondary animate-slide-up opacity-0 pt-2 items-center" style={{ animationDelay: '500ms' }}>
           <a href="https://github.com/aaryanghadge" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200"><GithubIcon className="w-5 h-5" /></a>
           <a href="https://x.com/aaryan_ghadge" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors hover:scale-110 transform duration-200"><TwitterIcon className="w-5 h-5" /></a>
           <a href="https://www.linkedin.com/in/aaryan-ghadge22/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors hover:scale-110 transform duration-200"><LinkedInIcon className="w-5 h-5" /></a>
           <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aaryanghadge07@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 transform duration-200"><MailIcon className="w-5 h-5" /></a>
        </div>

        {/* Spotify Widget */}
        <div className="pt-4 animate-slide-up opacity-0" style={{ animationDelay: '600ms' }}>
          <Spotify />
        </div>

      </div>
    </section>
  );
};

export default Hero;