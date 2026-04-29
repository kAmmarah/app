import { useState, useRef, useTransition } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import About from './components/About/About';
import StickyNotesPage from './pages/StickyNotesPage';
import TasksBoardPage from './pages/TasksBoardPage';
import EventLogPage from './pages/EventLogPage';
import ExportSummaryPage from './pages/ExportSummaryPage';
import UsersPage from './pages/UsersPage';
import EmailBlocksPage from './pages/EmailBlocksPage';
import LinksPage from './pages/LinksPage';
import SettingsPage from './pages/SettingsPage';
import { useUserStore } from './store/userStore';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const loginNameRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  
  const { currentUser, setCurrentUser, addUser } = useUserStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const loginName = loginNameRef.current?.value;
    if (!loginName || !loginName.trim()) return;
    
    const newUser = {
      id: Math.random().toString(36).substring(7),
      name: loginName,
      email: `${loginName.toLowerCase().replace(/\s+/g, '')}@taskorbit.com`,
      color: '#051C45',
      role: 'lead' as const,
      status: 'Active' as const
    };
    
    startTransition(() => {
      addUser(newUser);
      setCurrentUser(newUser);
    });
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#051C45]/5 to-[#051C45]/20 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
          <div className="text-center mb-8">
            <img 
              src="/taskorbit_logo_1777394787859.png" 
              alt="TaskOrbit Logo" 
              className="h-16 mx-auto mb-4 object-contain"
            />
            <h1 className="text-3xl font-bold text-gray-800">TaskOrbit</h1>
            <p className="text-gray-500 mt-2 text-sm">Sign in to your workspace</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                ref={loginNameRef}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C45] focus:border-[#051C45] outline-none transition-all"
                placeholder="e.g. John Doe"
                required
                disabled={isPending}
              />
            </div>
            
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center bg-[#051C45] text-white py-2.5 rounded-lg hover:bg-[#041534] transition-colors font-medium shadow-md shadow-[#051C45]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Enter Workspace'
              )}
            </button>
          </form>
          
          <p className="text-center text-xs text-gray-400 mt-8">
            Created by Ammara Dawood
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
        {activeTab === 'about' && <About />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'sticky-notes' && <StickyNotesPage />}
        {activeTab === 'tasks-board' && <TasksBoardPage />}
        {activeTab === 'event-log' && <EventLogPage />}
        {activeTab === 'export-summary' && <ExportSummaryPage />}
        {activeTab === 'users' && <UsersPage />}
        {activeTab === 'email-blocks' && <EmailBlocksPage />}
        {activeTab === 'links' && <LinksPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
