import React, { useState } from 'react';
import { SNIPPETS } from '../constants';
import { CopyIcon, CheckIcon } from './icons';

interface SnippetsProps {
  onGoBack: () => void;
}

const Snippets: React.FC<SnippetsProps> = ({ onGoBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // State for window controls: key is snippet ID
  const [snippetStates, setSnippetStates] = useState<Record<string, { minimized: boolean; maximized: boolean; closed: boolean }>>({});

  const getState = (id: string) => snippetStates[id] || { minimized: false, maximized: false, closed: false };

  const updateState = (id: string, updates: Partial<{ minimized: boolean; maximized: boolean; closed: boolean }>) => {
    setSnippetStates(prev => ({
      ...prev,
      [id]: { ...getState(id), ...updates }
    }));
  };

  const handleClose = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    updateState(id, { closed: true });
  };

  const handleMinimize = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const current = getState(id);
    updateState(id, { minimized: !current.minimized });
  };

  const handleMaximize = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const current = getState(id);
    // If maximizing, ensure it's not minimized
    updateState(id, { maximized: !current.maximized, minimized: false });
  };

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSnippets = SNIPPETS.filter(snippet => 
    snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    snippet.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto mb-12 animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
        <button 
          onClick={onGoBack}
          className="flex items-center gap-2 text-blue-500 mb-4 group hover:text-blue-400 transition-colors"
        >
            <span className="text-base transition-transform group-hover:-translate-x-1">&gt;</span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold">System Library</span>
        </button>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-primary mb-8">
          CODE <span className="text-primary/10">FRAGMENTS</span>
        </h1>

        {/* Search Input */}
        <div className="relative max-w-lg group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-secondary group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full bg-surface border border-primary/10 rounded-xl py-3 pl-10 pr-4 text-sm text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
            placeholder="Search protocols..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
             <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-primary/5 border border-primary/10 rounded text-[10px] text-secondary">⌘ K</kbd>
          </div>
        </div>
      </div>

      {/* Snippets List */}
      <div className="max-w-3xl mx-auto space-y-8 perspective-1000">
        {filteredSnippets.map((snippet, index) => {
          const state = getState(snippet.id);
          if (state.closed) return null;

          const isMaximized = state.maximized;
          const isMinimized = state.minimized;

          return (
            <React.Fragment key={snippet.id}>
              {/* Backdrop when maximized */}
              {isMaximized && (
                  <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[50] animate-fade-in"
                    onClick={() => updateState(snippet.id, { maximized: false })}
                  />
              )}

              <div 
                className={`
                    bg-surface border border-primary/10 overflow-hidden shadow-2xl 
                    transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                    ${isMaximized ? 'fixed inset-4 z-[60] rounded-xl' : 'rounded-xl relative hover:border-primary/20'}
                    ${!isMaximized && 'animate-slide-up'}
                `}
                style={!isMaximized ? { animationDelay: `${200 + index * 100}ms` } : {}}
              >
                {/* Window Header */}
                <div 
                    className="bg-surface border-b border-primary/5 px-4 py-2 flex items-center justify-between select-none"
                    onDoubleClick={(e) => handleMaximize(e, snippet.id)}
                >
                  {/* Mac Traffic Lights */}
                  <div className="flex items-center gap-2 group/controls">
                    {/* Close (Red) */}
                    <button 
                        onClick={(e) => handleClose(e, snippet.id)}
                        className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 flex items-center justify-center text-black/60 transition-transform active:scale-90 focus:outline-none"
                        aria-label="Close"
                    >
                        <svg className="w-1.5 h-1.5 opacity-0 group-hover/controls:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    
                    {/* Minimize (Yellow) */}
                    <button 
                        onClick={(e) => handleMinimize(e, snippet.id)}
                        className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 flex items-center justify-center text-black/60 transition-transform active:scale-90 focus:outline-none"
                        aria-label="Minimize"
                    >
                        <svg className="w-1.5 h-1.5 opacity-0 group-hover/controls:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    
                    {/* Maximize (Green) */}
                    <button 
                        onClick={(e) => handleMaximize(e, snippet.id)}
                        className="w-2.5 h-2.5 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 flex items-center justify-center text-black/60 transition-transform active:scale-90 focus:outline-none"
                        aria-label="Maximize"
                    >
                        {isMaximized ? (
                            <svg className="w-1.5 h-1.5 opacity-0 group-hover/controls:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                        ) : (
                            <svg className="w-1.5 h-1.5 opacity-0 group-hover/controls:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                        )}
                    </button>
                  </div>

                  <div className="text-[10px] font-mono text-secondary font-medium tracking-wide">
                    ~/{snippet.filename}
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                     <span className="text-[9px] uppercase font-bold text-secondary tracking-wider">Bash</span>
                  </div>
                </div>

                {/* Content Area - Split Layout */}
                <div 
                    className={`
                        flex flex-col md:flex-row 
                        transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                        ${isMinimized ? 'max-h-0 opacity-0' : 'max-h-[800px] opacity-100'} 
                        ${isMaximized ? '!max-h-[calc(100vh-46px)] h-[calc(100%-46px)]' : ''}
                    `}
                >
                  {/* Left Info Panel */}
                  <div className="p-5 md:w-1/3 border-b md:border-b-0 md:border-r border-primary/5 bg-surface/50">
                    <div className="sticky top-6">
                        <h2 className="text-lg font-bold text-primary mb-2 group-hover:text-blue-400 transition-colors">
                          {snippet.title}
                        </h2>
                        <p className="text-xs text-secondary leading-relaxed mb-4">
                          {snippet.description}
                        </p>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="text-[9px] uppercase tracking-wider text-secondary font-bold mb-1">Category</div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-500 text-[10px] font-medium border border-yellow-500/20">
                              {snippet.category}
                            </span>
                          </div>
                          <div>
                            <div className="text-[9px] uppercase tracking-wider text-secondary font-bold mb-1">Language</div>
                            <span className="inline-flex items-center gap-1.5 text-[10px] text-secondary font-mono">
                               <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                               {snippet.language}
                            </span>
                          </div>
                        </div>
                    </div>
                  </div>

                  {/* Right Code Panel */}
                  <div className="md:w-2/3 bg-[#0d1117] p-5 overflow-auto relative group">
                    {/* Copy Button */}
                    <button 
                      onClick={() => handleCopy(snippet.id, snippet.code)}
                      className="absolute top-4 right-4 p-1.5 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white/20 hover:scale-110 text-white z-10"
                      aria-label="Copy code"
                    >
                        {copiedId === snippet.id ? (
                          <CheckIcon className="w-3.5 h-3.5 text-green-400 animate-pop" />
                        ) : (
                          <CopyIcon className="w-3.5 h-3.5" />
                        )}
                    </button>

                    <div className="flex font-mono text-xs leading-relaxed h-full">
                       {/* Line Numbers */}
                       <div className="flex flex-col text-right pr-4 select-none text-gray-600 border-r border-white/5 mr-4 h-full min-w-[2em]">
                          {snippet.code.split('\n').map((_, i) => (
                            <span key={i} className="h-5">{i + 1}</span>
                          ))}
                       </div>
                       
                       {/* Code Content */}
                       <pre className="text-gray-300 flex-1 h-full font-mono">
                          {snippet.code.split('\n').map((line, i) => (
                            <div key={i} className="h-5 whitespace-pre">
                              <SyntaxHighlight code={line} />
                            </div>
                          ))}
                       </pre>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}

        {filteredSnippets.length === 0 && (
            <div className="text-center py-20 text-secondary animate-fade-in text-sm">
                No fragments found matching your search.
            </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Syntax Highlighter
const SyntaxHighlight: React.FC<{ code: string }> = ({ code }) => {
    // Regex to capture:
    // 1. Comments (starting with //)
    // 2. Strings (single, double, backtick)
    // 3. Numbers
    // 4. Identifiers/Keywords
    // 5. Punctuation/Operators
    const tokenRegex = /((?:\/\/.*$)|(?:`(?:[^`\\]|\\.)*`)|(?:'(?:[^'\\]|\\.)*')|(?:"(?:[^"\\]|\\.)*")|(?:\b\d+\b)|(?:[a-zA-Z_$][a-zA-Z0-9_$]*)|(?:[{}()\[\].,:;=<>!&|?+\-*/%^~]))/g;
    
    const parts = code.split(tokenRegex);

    const keywords = new Set([
        'import', 'from', 'export', 'default', 'const', 'let', 'var', 
        'function', 'class', 'interface', 'type', 'enum', 'return', 
        'if', 'else', 'switch', 'case', 'break', 'continue', 'while', 'for', 
        'try', 'catch', 'throw', 'finally', 'async', 'await', 'new', 'this', 
        'super', 'extends', 'implements', 'public', 'private', 'protected', 
        'static', 'readonly', 'void', 'null', 'undefined', 'true', 'false', 'typeof', 'instanceof'
    ]);

    const builtins = new Set(['console', 'window', 'document', 'process', 'module', 'require', 'Promise', 'JSON', 'Math', 'Date', 'Array', 'Object', 'String', 'Number', 'Boolean', 'RegExp', 'Map', 'Set', 'Error', 'EventSource']);

    return (
        <>
            {parts.map((part, index) => {
                if (!part) return null;
                
                // Comments
                if (part.startsWith('//')) {
                    return <span key={index} className="text-gray-500 italic">{part}</span>;
                }
                
                // Strings
                if (part.startsWith("'") || part.startsWith('"') || part.startsWith('`')) {
                    return <span key={index} className="text-green-400">{part}</span>;
                }
                
                // Numbers
                if (/^\d+$/.test(part)) {
                    return <span key={index} className="text-blue-300">{part}</span>;
                }
                
                // Keywords & Identifiers
                if (keywords.has(part)) {
                    // Differentiate control flow from declarations
                    if (['import', 'from', 'export', 'return', 'if', 'else', 'try', 'catch', 'async', 'await'].includes(part)) {
                        return <span key={index} className="text-purple-400 font-medium">{part}</span>;
                    }
                    return <span key={index} className="text-blue-400 font-medium">{part}</span>;
                }

                // Types (Capitalized identifiers usually)
                if (/^[A-Z]/.test(part) && part.length > 1) {
                    return <span key={index} className="text-yellow-200">{part}</span>;
                }
                
                // Builtins
                if (builtins.has(part)) {
                    return <span key={index} className="text-yellow-200">{part}</span>;
                }
                
                // Punctuation
                if (/^[{}()\[\].,:;=<>!&|?+\-*/%^~]$/.test(part)) {
                     return <span key={index} className="text-gray-500">{part}</span>;
                }
                
                // Default Variable / Text
                return <span key={index} className="text-[#a6accd]">{part}</span>;
            })}
        </>
    );
};

export default Snippets;