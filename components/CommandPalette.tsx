import React, { useState, useEffect, useRef } from 'react';
import { 
  HomeIcon, 
  BriefcaseIcon, 
  FolderIcon, 
  FileTextIcon, 
  WrenchIcon, 
  PhoneIcon 
} from './icons';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigationCommands = [
    {
      id: 'home',
      title: 'Go to Home',
      subtitle: 'Navigate to the homepage',
      icon: <HomeIcon className="w-5 h-5" />,
      action: () => onNavigate('home'),
      shortcut: 'H'
    },
    {
      id: 'work',
      title: 'Go to Work Experience',
      subtitle: 'View work experience and employment history',
      icon: <BriefcaseIcon className="w-5 h-5" />,
      action: () => onNavigate('about'), // Mapped to about for now
      shortcut: 'W'
    },
    {
      id: 'projects',
      title: 'Go to Projects',
      subtitle: 'View all projects and portfolio work',
      icon: <FolderIcon className="w-5 h-5" />,
      action: () => onNavigate('projects'),
      shortcut: 'P'
    },
    {
      id: 'resume',
      title: 'Go to Resume',
      subtitle: 'View and download resume',
      icon: <FileTextIcon className="w-5 h-5" />,
      action: () => window.open('/resume.pdf', '_blank'), // Placeholder
      shortcut: 'R'
    },
    {
      id: 'setup',
      title: 'Go to Setup',
      subtitle: 'View development setup and tools',
      icon: <WrenchIcon className="w-5 h-5" />,
      action: () => onNavigate('snippets'), // Mapped to snippets/library
      shortcut: 'S'
    },
    {
      id: 'contact',
      title: 'Go to Contact',
      subtitle: 'Get in touch',
      icon: <PhoneIcon className="w-5 h-5" />,
      action: () => onNavigate('contact'),
      shortcut: 'C'
    }
  ];

  // Filter commands
  const filteredCommands = navigationCommands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) || 
    cmd.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-pop">
        
        {/* Input */}
        <div className="flex items-center px-4 border-b border-white/5">
           <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
           <input
             ref={inputRef}
             type="text"
             className="w-full h-14 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
             placeholder="Type a command or search..."
             value={query}
             onChange={(e) => {
                 setQuery(e.target.value);
                 setSelectedIndex(0);
             }}
           />
           <div className="text-xs text-gray-600 font-medium px-2 py-1 border border-white/10 rounded">ESC</div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</div>
            
            {filteredCommands.length > 0 ? (
                filteredCommands.map((command, index) => (
                    <div
                        key={command.id}
                        onClick={() => {
                            command.action();
                            onClose();
                        }}
                        className={`mx-2 px-4 py-3 flex items-center justify-between rounded-lg cursor-pointer transition-colors ${
                            index === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'
                        }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${index === selectedIndex ? 'text-white' : 'text-gray-400'}`}>
                                {command.icon}
                            </div>
                            <div>
                                <div className={`font-medium ${index === selectedIndex ? 'text-white' : 'text-gray-300'}`}>
                                    {command.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {command.subtitle}
                                </div>
                            </div>
                        </div>
                        
                        {command.shortcut && (
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-mono text-gray-500 border border-white/10 rounded px-1.5 py-0.5 min-w-[20px] text-center">
                                    {command.shortcut}
                                </span>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="px-8 py-12 text-center text-gray-500">
                    No results found.
                </div>
            )}
        </div>
        
        {/* Footer */}
        <div className="bg-white/[0.02] border-t border-white/5 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
             <div>
                <span className="font-medium text-gray-400">ProTip:</span> Use arrow keys to navigate
             </div>
             <div className="flex gap-4">
                <span>Select <kbd className="font-sans px-1 bg-white/10 rounded">↵</kbd></span>
             </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;