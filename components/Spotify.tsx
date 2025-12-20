import React, { useState, useEffect } from 'react';


const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

// NOTE: You need a refresh token to access your user account's "Now Playing" data.
// If you don't have one, the widget will show "Not Playing".
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

const Spotify: React.FC = () => {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  const getAccessToken = async () => {
    if (!REFRESH_TOKEN) return null;

    const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
      }),
    });

    return response.json();
  };

  const fetchNowPlaying = async () => {
    try {
      if (!REFRESH_TOKEN) {
        setLoading(false);
        return;
      }

      const { access_token } = await getAccessToken();

      const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status === 204 || response.status > 400) {
        setData({
            isPlaying: false,
            title: "Not Playing",
            artist: "Spotify",
            album: "Offline",
            albumImageUrl: "",
            songUrl: "https://open.spotify.com"
        });
        return;
      }

      const song = await response.json();
      const isPlaying = song.is_playing;
      const title = song.item.name;
      const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
      const album = song.item.album.name;
      const albumImageUrl = song.item.album.images[0].url;
      const songUrl = song.item.external_urls.spotify;

      setData({
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
      });
    } catch (error) {
      console.error("Spotify API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-sm border border-white/10 bg-black/40 backdrop-blur-xl rounded-xl p-5 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/5 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 bg-white/10 rounded"></div>
            <div className="h-2 w-32 bg-white/5 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for when no data is available
  const currentData = data || {
    isPlaying: false,
    title: "Not Playing",
    artist: "Spotify",
    album: "Offline",
    albumImageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop",
    songUrl: "https://open.spotify.com"
  };

  return (
    <div className="w-full max-w-sm border border-white/10 bg-black/60 backdrop-blur-xl rounded-xl p-5 hover:border-white/20 transition-all duration-300 cursor-default group shadow-[0_10px_40px_-10px_rgba(29,185,84,0.15)] hover:shadow-[0_20px_60px_-10px_rgba(29,185,84,0.3)] relative overflow-hidden animate-float">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
            <div className="relative flex h-3 w-3 items-center justify-center">
                {currentData.isPlaying && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1db954] opacity-75"></span>
                )}
                <svg className={`relative w-2.5 h-2.5 ${currentData.isPlaying ? 'text-[#1db954]' : 'text-gray-500'} fill-current`} viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              {currentData.isPlaying ? 'Currently Playing' : 'Offline'}
            </span>
        </div>
        <div className="text-gray-600">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${currentData.isPlaying ? 'animate-spin-slow' : ''} opacity-60 group-hover:opacity-100 transition-opacity`}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <a 
          href={currentData.songUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative w-16 h-16 bg-neutral-900 rounded-lg overflow-hidden flex-shrink-0 shadow-lg group-hover:shadow-[#1db954]/20 transition-all duration-500 border border-white/5 block"
        >
          <img 
            src={currentData.albumImageUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop"} 
            alt="Album Art" 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-700"
          />
        </a>
        
        <div className="flex-1 min-w-0 flex flex-col justify-center h-full space-y-2">
             <div className="truncate pr-2">
                <a 
                  href={currentData.songUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-white hover:text-[#1db954] transition-colors truncate block tracking-tight"
                >
                    {currentData.title}
                </a>
                <p className="text-[11px] text-gray-400 truncate mt-0.5 font-medium">
                  {currentData.artist} • {currentData.album}
                </p>
             </div>
             
             {currentData.isPlaying && (
               <div className="flex items-end gap-[3px] h-4">
                  <span className="w-[3px] bg-[#1db954] rounded-sm animate-music-bar-1"></span>
                  <span className="w-[3px] bg-[#1db954] rounded-sm animate-music-bar-2"></span>
                  <span className="w-[3px] bg-[#1db954] rounded-sm animate-music-bar-3"></span>
                  <span className="w-[3px] bg-[#1db954] rounded-sm animate-music-bar-4"></span>
                  <span className="w-[3px] bg-[#1db954] rounded-sm animate-music-bar-2"></span>
               </div>
             )}
        </div>
      </div>
      
      {/* Background glow effect */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#1db954]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#1db954]/20 transition-colors duration-500"></div>
    </div>
  );
};

export default Spotify;