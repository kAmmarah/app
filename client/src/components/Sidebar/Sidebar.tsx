import React from 'react';
import { 
  Home, 
  StickyNote, 
  Mail, 
  LayoutList, 
  CalendarDays, 
  Link2, 
  Download, 
  Users, 
  Settings,
  Moon
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'sticky-notes', label: 'Sticky Notes', icon: StickyNote },
    { id: 'email-blocks', label: 'Email Blocks', icon: Mail },
    { id: 'tasks-board', label: 'Tasks Board', icon: LayoutList },
    { id: 'event-log', label: 'Event Log', icon: CalendarDays },
    { id: 'links', label: 'Links', icon: Link2 },
    { id: 'export-summary', label: 'Export Summary', icon: Download },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col transition-all duration-500 shadow-2xl relative z-20">
      <div className="p-6 flex items-center space-x-3 mb-4 group cursor-pointer">
        <div className="bg-white p-1.5 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-md">
          <img src="/taskorbit_logo_1777394787859.png" alt="TaskOrbit" className="w-6 h-6 object-contain" />
        </div>
        <h1 className="text-xl font-bold tracking-wide text-gray-100 group-hover:text-white transition-colors">TaskOrbit</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium transform ${
                isActive 
                  ? 'bg-white text-gray-900 shadow-lg scale-105' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white hover:translate-x-2'
              }`}
            >
              <Icon size={18} className={isActive ? "text-gray-900" : "text-gray-400 group-hover:text-white transition-colors"} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 mt-auto border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-400 text-sm font-medium hover:text-white transition-colors cursor-pointer">
            <Moon size={16} />
            <span>Dark Mode</span>
          </div>
          <button className="w-10 h-6 bg-gray-700 rounded-full relative flex items-center px-1 transition-colors hover:bg-gray-600">
            <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
