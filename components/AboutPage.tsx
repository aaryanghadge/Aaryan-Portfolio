import React from 'react';
import { ArrowRightIcon } from './icons';

interface AboutPageProps {
  onGoBack: () => void;
}

const TIMELINE = [
   {
      year: '2023 – Present',
      title: 'Independent Builder',
      subtitle: 'BUILDING & SHIPPING',
      description: `Building real-world products like Splitily.\nFocused on full-stack development, product design, and shipping usable software.\nLearning by iterating fast on real problems.`
   },
   {
      year: '2020 – 2023',
      title: 'Self-Directed Learning',
      subtitle: 'PROJECT-BASED ENGINEERING',
      description: `Learned programming by building projects instead of following a fixed syllabus.\nStarted with Python and gradually moved into web development, backend systems, and product-focused engineering.`
   },
   {
      year: '2020',
      title: 'The Spark',
      subtitle: 'FIRST PROJECT',
      description: `Started with Python and built my first game — a Flappy Bird clone.\nThat project introduced me to core programming concepts and sparked a long-term passion for building software.`
   }
];

const SKILLS = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Python", "Rust", "PostgreSQL", "Redis", "GraphQL"] },
  { category: "AI & Data", items: ["LangChain", "TensorFlow", "OpenAI API", "Pinecone", "Pandas"] },
  { category: "DevOps", items: ["Docker", "AWS", "Vercel", "CI/CD", "Terraform"] }
];

const AboutPage: React.FC<AboutPageProps> = ({ onGoBack }) => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16 animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
          <button 
            onClick={onGoBack}
            className="flex items-center gap-2 text-blue-500 mb-6 group hover:text-blue-400 transition-colors"
          >
              <span className="text-base transition-transform group-hover:-translate-x-1">&lt;</span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold">Back to Home</span>
          </button>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-primary mb-4">
            ABOUT <span className="text-primary/10">ME</span>
          </h1>
        </div>

        {/* Bio Section - Text Only */}
        <div className="mb-24 animate-slide-up opacity-0" style={{ animationDelay: '200ms' }}>
           <div className="flex flex-col justify-center max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                 I enjoy learning by building things.
              </h2>
              <div className="space-y-4 text-base text-secondary leading-relaxed">
                 <p>
                   I started programming in 2020 with Python, where my first real project was a simple Flappy Bird game. Building that game introduced me to programming fundamentals like logic, loops, and debugging, and it made me curious about how software works under the hood.
                 </p>

                 <p>
                   Since then, I’ve been learning computer science by building projects rather than just reading about concepts. From small experiments to full-stack applications like Splitily, I enjoy turning ideas into working products and improving them step by step.
                 </p>

                 <p>
                   I’m especially interested in understanding how things work whether it’s writing cleaner code, designing better user experiences, or learning how scalable systems are built. I see programming as a continuous learning process, and I actively look for opportunities to improve by building and experimenting.
                 </p>

                 <p>
                   Outside of coding, I like exploring new tech, learning from other builders, and thinking about how software can solve everyday problems.
                 </p>
              </div>

              {/* Signature / Footer of Bio */}
              <div className="mt-8 pt-6 border-t border-primary/10 flex items-center gap-4">
                  <div className="h-px bg-blue-500 w-10"></div>
                  <span className="font-handwriting text-xl text-primary italic opacity-80">Aaryan Ghadge</span>
              </div>
           </div>
        </div>

        {/* Journey & Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-slide-up opacity-0" style={{ animationDelay: '300ms' }}>
            
            {/* Left: Timeline (7 cols) */}
            <div className="lg:col-span-7">
               <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  My Journey
               </h3>
               
               <div className="space-y-6">
                  {TIMELINE.map((item, index) => (
                      <div key={index} className="group relative pl-6 border-l border-primary/10 hover:border-blue-500/50 transition-colors duration-300">
                          <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-surface border border-primary/20 group-hover:border-blue-500 group-hover:scale-125 transition-all"></div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                             <h4 className="text-lg font-bold text-primary group-hover:text-blue-400 transition-colors">{item.title}</h4>
                             <span className="text-xs font-mono text-secondary">{item.year}</span>
                          </div>
                          <div className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">{item.subtitle}</div>
                          <p className="text-sm text-secondary leading-relaxed max-w-lg">
                             {item.description}
                          </p>
                      </div>
                  ))}
               </div>
            </div>

            {/* Right: Skills (5 cols) */}
            <div className="lg:col-span-5">
               <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Technical Arsenal
               </h3>
               
               <div className="grid grid-cols-1 gap-4">
                  {SKILLS.map((skillGroup, index) => (
                      <div key={index} className="bg-surface border border-primary/5 rounded-xl p-5 hover:border-primary/10 transition-colors">
                          <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-3 border-b border-primary/5 pb-2">
                             {skillGroup.category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                             {skillGroup.items.map(skill => (
                                 <span key={skill} className="px-2 py-0.5 text-[10px] text-secondary bg-primary/5 rounded hover:text-primary hover:bg-primary/10 transition-colors cursor-default">
                                    {skill}
                                 </span>
                             ))}
                          </div>
                      </div>
                  ))}
               </div>
            </div>

        </div>

        {/* Connect CTA */}
        <div className="mt-24 p-10 bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-2xl border border-primary/10 text-center animate-slide-up opacity-0" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Building something special?</h2>
            <p className="text-secondary text-base mb-6 max-w-xl mx-auto">
               I'm always open to discussing new opportunities, whether it's a full-time role, a freelance project, or just a coffee chat.
            </p>
            <a 
               href="mailto:hello@aaryan.dev"
               className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-full font-bold text-sm hover:scale-105 transition-transform"
            >
               <span>Get in Touch</span>
               <ArrowRightIcon className="w-4 h-4" />
            </a>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;