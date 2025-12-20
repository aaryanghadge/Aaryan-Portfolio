import React from 'react';
import { GithubIcon, TwitterIcon, MailIcon, LinkedInIcon } from './icons';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="contact" className="py-10 border-t border-primary/10 mt-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">Let's connect.</h2>
          <p className="text-secondary text-sm max-w-sm">
             Feel free to reach out for collaborations or just a friendly hello.
          </p>
        </div>
        
         <button 
            onClick={() => onNavigate('contact')}
            className="group flex items-center gap-2 px-5 py-2.5 bg-primary text-background rounded-full font-bold hover:bg-secondary/20 hover:text-primary transition-all text-sm"
          >
            <MailIcon className="w-4 h-4" />
            Say Hello
          </button>
      </div>
      
      <div className="pt-6 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center text-xs text-secondary gap-4">
        <p>© {new Date().getFullYear()} Aaryan. All rights reserved.</p>
        
        <div className="flex gap-6 text-secondary">
           <a href="https://github.com/aaryanghadge" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
           <a href="https://x.com/aaryan_ghadge" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Twitter</a>
           <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;