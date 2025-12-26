import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';
import Snippets from './components/Snippets';
import ProjectsPage from './components/ProjectsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CommandPalette from './components/CommandPalette';
import { PROJECTS } from './constants';
import { ArrowRightIcon } from './components/icons';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Featured Project (First one)
  const featuredProject = PROJECTS[0];

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-blue-500/30 selection:text-blue-200 font-sans text-sm md:text-base">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      </div>

      <CommandPalette 
         isOpen={isSearchOpen} 
         onClose={() => setIsSearchOpen(false)} 
         onNavigate={setCurrentPage} 
      />

      <Navbar 
          onNavigate={setCurrentPage} 
          currentPage={currentPage} 
          onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="max-w-5xl mx-auto px-6">
        
        {currentPage === 'home' ? (
          <>
            <div className="max-w-3xl mx-auto">
              <Hero onNavigate={setCurrentPage} />
            </div>
            
            {/* Featured Work Section */}
            <div className="max-w-3xl mx-auto mt-16">
              <section id="work" className="py-10 animate-slide-up opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                
                {/* Section Header */}
                <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                   <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight">
                     Selected <span className="text-primary/20">Work</span>
                   </h2>
                   
                   <button 
                     onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setCurrentPage('projects');
                     }}
                     className="px-5 py-2 rounded-full border border-primary/10 text-[10px] font-bold tracking-widest hover:bg-primary hover:text-background transition-all duration-300 uppercase"
                   >
                     All Projects
                   </button>
                </div>
                
                {/* Featured Project Card - Full Width */}
                <div className="w-full">
                  <div className="group relative rounded-3xl overflow-hidden border border-primary/10 bg-surface h-[400px] lg:h-[500px]">
                      {/* Image Background */}
                      <div className="absolute inset-0">
                         <img 
                           src={featuredProject.image} 
                           alt={featuredProject.title} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-end">
                         {/* Tags */}
                         <div className="flex gap-2 mb-4">
                            {featuredProject.tags.slice(0, 4).map(tag => (
                               <span key={tag} className="px-2.5 py-1 bg-surface/50 backdrop-blur-md border border-primary/10 rounded-lg text-[10px] font-bold text-primary uppercase tracking-wider">
                                  {tag}
                               </span>
                            ))}
                         </div>

                         {/* Title */}
                         <h3 className="text-3xl md:text-5xl font-bold text-primary mb-3 leading-tight">
                            {featuredProject.title}
                         </h3>

                         {/* Description */}
                         <p className="text-secondary text-base md:text-lg max-w-xl mb-4 line-clamp-3">
                            {featuredProject.description}
                         </p>

                         {/* Arrow Button */}
                         <a 
                            href={featuredProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all duration-300 cursor-pointer"
                         >
                             <ArrowRightIcon className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                         </a>
                      </div>
                  </div>
                </div>

              </section>
            </div>
            
            <div className="animate-slide-up max-w-3xl mx-auto" style={{ animationDelay: '1000ms' }}>
               <Footer onNavigate={setCurrentPage} />
            </div>
          </>
        ) : currentPage === 'projects' ? (
           <ProjectsPage onGoBack={() => setCurrentPage('home')} />
        ) : currentPage === 'snippets' ? (
           <Snippets onGoBack={() => setCurrentPage('home')} />
        ) : currentPage === 'about' ? (
           <AboutPage onGoBack={() => setCurrentPage('home')} />
        ) : currentPage === 'contact' ? (
           <ContactPage onGoBack={() => setCurrentPage('home')} />
        ) : null}
        
      </main>
    </div>
  );
};

export default App;