import { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
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
  const [loginName, setLoginName] = useState('');
  
  const { currentUser, setCurrentUser, addUser } = useUserStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim()) return;
    
    const newUser = {
      id: Math.random().toString(36).substring(7),
      name: loginName,
      email: `${loginName.toLowerCase().replace(/\s+/g, '')}@taskorbit.com`,
      color: '#051C45',
      role: 'lead' as const,
      status: 'Active' as const
    };
    
    addUser(newUser);
    setCurrentUser(newUser);
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
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051C45] focus:border-[#051C45] outline-none transition-all"
                placeholder="e.g. John Doe"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#051C45] text-white py-2.5 rounded-lg hover:bg-[#041534] transition-colors font-medium shadow-md shadow-[#051C45]/20"
            >
              Enter Workspace
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
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
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
      </div>
    </div>
  );
}

export default App;
