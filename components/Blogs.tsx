import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';
import { ArrowRightIcon, CalendarIcon, ClockIcon } from './icons';

interface BlogsProps {
  onGoBack: () => void;
}

const Blogs: React.FC<BlogsProps> = ({ onGoBack }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="pt-24 pb-16 min-h-screen animate-fade-in">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back Button */}
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-secondary mb-6 group hover:text-primary transition-colors"
          >
              <span className="text-base transition-transform group-hover:-translate-x-1">&lt;</span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold">Back to Articles</span>
          </button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
                {selectedPost.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded-full border border-blue-500/20">
                        {tag}
                    </span>
                ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-primary mb-4 leading-tight">
                {selectedPost.title}
            </h1>
            <div className="flex items-center gap-6 text-xs text-secondary font-mono border-b border-primary/10 pb-6">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>{selectedPost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>{selectedPost.readTime}</span>
                </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-10 border border-primary/10">
            <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Content */}
          <article className="prose prose-invert prose-base max-w-none text-secondary leading-relaxed space-y-5">
             {/* Note: Prose defaults to grayscale, might need overriding for specific semantic colors if not matching perfectly */}
             <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto mb-16 px-6 animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
        <button 
          onClick={onGoBack}
          className="flex items-center gap-2 text-blue-500 mb-4 group hover:text-blue-400 transition-colors"
        >
            <span className="text-base transition-transform group-hover:-translate-x-1">&gt;</span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold">Main Feed</span>
        </button>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-primary mb-4">
          WRITING <span className="text-primary/10">& THOUGHTS</span>
        </h1>
        <p className="text-secondary text-base max-w-lg">
            Thoughts on software architecture, design patterns, and the evolving web ecosystem.
        </p>
      </div>

      {/* Blog List */}
      <div className="max-w-3xl mx-auto px-6 space-y-6">
        {BLOG_POSTS.map((post, index) => (
            <div 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative bg-surface border border-primary/5 rounded-2xl p-5 md:p-6 hover:border-primary/10 transition-all duration-300 hover:bg-surface/80 cursor-pointer animate-slide-up opacity-0"
                style={{ animationDelay: `${200 + index * 100}ms` }}
            >
                <div className="flex flex-col md:flex-row gap-6 justify-between">
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2 text-[10px] text-secondary font-mono mb-1">
                             <span>{post.date}</span>
                             <span className="w-1 h-1 bg-secondary/50 rounded-full"></span>
                             <span>{post.readTime}</span>
                        </div>
                        
                        <h2 className="text-xl font-bold text-primary group-hover:text-blue-400 transition-colors">
                            {post.title}
                        </h2>
                        
                        <p className="text-secondary text-sm leading-relaxed">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2 pt-1">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 bg-primary/5 text-secondary text-[9px] uppercase font-bold tracking-wider rounded border border-primary/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center text-secondary group-hover:bg-blue-500 group-hover:text-white group-hover:border-transparent transition-all transform group-hover:scale-110">
                            <ArrowRightIcon className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;