import React from 'react';
import { useUserStore } from '../../store/userStore';

const Navbar: React.FC<{ activeTab: string, setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const { currentUser, setCurrentUser } = useUserStore();
  const initials = currentUser?.name.substring(0, 2).toUpperCase() || 'AD';

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <img src="/taskorbit_logo_1777394787859.png" alt="Logo" className="h-8 w-auto hover:rotate-12 transition-transform duration-300" />
              <span className="font-bold text-xl tracking-tight text-gray-900">TaskOrbit</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <button 
                onClick={() => setActiveTab('about')}
                className={`${activeTab === 'about' ? 'border-[#051C45] text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
              >
                About
              </button>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`${activeTab === 'dashboard' ? 'border-[#051C45] text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => window.location.href='mailto:ammarah@example.com'}
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
          <div className="flex items-center">
            {/* Personal Branding in Navbar */}
            <div className="hidden lg:flex items-center space-x-2 mr-6 text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <span>Ammara – AI Web Developer & Founder</span>
              <a href="https://github.com/kAmmarah/app" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#051C45] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {currentUser && (
              <div
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={() => setCurrentUser(null)}
                title="Sign out"
              >
                <div className="w-8 h-8 rounded-full bg-[#051C45] group-hover:bg-red-600 transition-colors text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {initials}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
