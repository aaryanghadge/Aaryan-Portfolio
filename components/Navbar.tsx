import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSearch: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  };

  const handleNavClick = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-background/80 backdrop-blur-md border-b border-primary/5' : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        
        {/* Left Side: Logo + Nav Links */}
        <div className="flex items-center gap-10">
            <div 
                onClick={(e) => handleNavClick(e, 'home')}
                className="text-lg font-bold tracking-tight cursor-pointer text-primary hover:text-secondary transition-colors"
            >
              Aaryan<span className="text-blue-500">.</span>
            </div>
            
            <div className="hidden md:flex gap-6 text-sm font-medium text-secondary">
              <a 
                href="#" 
                onClick={(e) => handleNavClick(e, 'snippets')}
                className={`hover:text-primary transition-colors ${currentPage === 'snippets' ? 'text-primary font-semibold' : ''}`}
              >
                Snippets
              </a>
              <a 
                href="#" 
                onClick={(e) => handleNavClick(e, 'blogs')}
                className={`hover:text-primary transition-colors ${currentPage === 'blogs' ? 'text-primary font-semibold' : ''}`}
              >
                Blogs
              </a>
              <a 
                href="#" 
                onClick={(e) => handleNavClick(e, 'projects')}
                className={`hover:text-primary transition-colors ${currentPage === 'projects' ? 'text-primary font-semibold' : ''}`}
              >
                Projects
              </a>
              <a 
                 href="#"
                 onClick={(e) => handleNavClick(e, 'about')}
                 className={`hover:text-primary transition-colors ${currentPage === 'about' ? 'text-primary font-semibold' : ''}`}
              >
                About Me
              </a>
            </div>
        </div>

        {/* Right Side: Search + Theme Toggle */}
        <div className="flex items-center gap-3">
            {/* Search Bar */}
            <button 
                onClick={onOpenSearch}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface border border-primary/10 rounded-lg text-xs text-secondary hover:border-primary/20 hover:text-primary transition-all group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>Search</span>
                <span className="ml-1.5 flex items-center gap-1 text-[10px] bg-primary/5 px-2 py-0.5 rounded border border-primary/5 text-secondary group-hover:border-primary/10 font-medium">
                    <span className="text-xs leading-none">⌘</span>
                    <span>K</span>
                </span>
            </button>

            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
                aria-label="Toggle theme"
            >
                {isDark ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                )}
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;