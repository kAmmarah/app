import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 animate-slide-up">
      <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-pink-200 via-purple-200 to-indigo-200 p-1 shadow-lg shrink-0 overflow-hidden group">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
            <img 
              src="/taskorbit_logo_1777394787859.png" 
              alt="TaskOrbit Logo" 
              className="w-20 h-20 md:w-28 md:h-28 object-contain animate-float drop-shadow-md" 
            />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-wider uppercase mb-4 animate-fade-in">
            About The Creator
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#051C45] to-indigo-600 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.open('https://github.com/kAmmarah', '_blank')}>Ammara</span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-gray-600 mb-6">
            AI Web Developer
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Passionate about crafting intelligent, modern web applications that blend 
            seamless user experiences with powerful AI-driven capabilities. I build 
            solutions that don't just look beautiful—they solve real problems and 
            scale for the future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="https://github.com/kAmmarah/app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
