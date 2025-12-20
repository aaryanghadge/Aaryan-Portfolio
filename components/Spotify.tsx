import React from 'react';

const Spotify: React.FC = () => {
  return (
    <div className="w-full max-w-sm border border-white/10 bg-black/60 backdrop-blur-xl rounded-xl p-5 hover:border-white/20 transition-all duration-300 cursor-default group shadow-[0_10px_40px_-10px_rgba(29,185,84,0.15)] hover:shadow-[0_20px_60px_-10px_rgba(29,185,84,0.3)] relative overflow-hidden animate-float">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
            {/* Pulsating Play Icon */}
            <div className="relative flex h-3 w-3 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1db954] opacity-75"></span>
                <svg className="relative w-2.5 h-2.5 text-[#1db954] fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Spotify</span>
        </div>
        <div className="text-gray-600">
           {/* Vinyl Record Icon - Spinning */}
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin-slow opacity-60 group-hover:opacity-100 transition-opacity"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
      </div>

      <div className="flex items-center gap-4 relative z-10">
        {/* Album Art with rotation/scale */}
        <div className="relative w-16 h-16 bg-neutral-900 rounded-lg overflow-hidden flex-shrink-0 shadow-lg group-hover:shadow-[#1db954]/20 transition-all duration-500 border border-white/5">
          <img 
            src="https://i.scdn.co/image/ab67616d0000b2734718e28c2492771310654386" 
            alt="Album Art" 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-700"
            onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                e.currentTarget.parentElement!.innerHTML = '<svg class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
            }}
          />
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col justify-center h-full space-y-2">
             <div className="truncate pr-2">
                <a href="#" className="text-sm font-bold text-white hover:text-[#1db954] transition-colors truncate block tracking-tight">
                    Haule Haule
                </a>
                <p className="text-[11px] text-gray-400 truncate mt-0.5 font-medium">Sukhwinder Singh • Rab Ne Bana Di Jodi</p>
             </div>
             
             {/* Animated Equalizer Bars - Made Larger */}
             <div className="flex items-end gap-[3px] h-4">
                <span className="w-[3px] bg-[#1db954] rounded-sm animate-music-bar-1"></span>
                <span className="w-[3px] bg-[#1db954] rounded-sm animate-music-bar-2"></span>
                <span className="w-[3px] bg-[#1db954] rounded-sm animate-music-bar-3"></span>
                <span className="w-[3px] bg-[#1db954] rounded-sm animate-music-bar-4"></span>
                <span className="w-[3px] bg-[#1db954] rounded-sm animate-music-bar-2"></span>
             </div>
        </div>
      </div>
      
      {/* Background glow effect */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#1db954]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#1db954]/20 transition-colors duration-500"></div>
    </div>
  );
};

export default Spotify;