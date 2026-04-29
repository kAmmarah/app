import React from 'react';
import StickyNotesWidget from './StickyNotesWidget';
import TasksBoardWidget from './TasksBoardWidget';
import ExportSummaryWidget from './ExportSummaryWidget';
import ProfilesWidget from './ProfilesWidget';
import { Calendar } from 'lucide-react';
import { useUserStore } from '../../store/userStore';

const Dashboard: React.FC = () => {
  const { currentUser } = useUserStore();
  return (
    <div className="animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center tracking-tight">
            Welcome back, {currentUser?.name || 'Admin'} <span className="ml-3 text-3xl animate-float inline-block">✨</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Your personalized workspace is looking great today.</p>
        </div>
        
        <div className="mt-4 md:mt-0 relative flex items-center bg-white px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 font-medium shadow-sm hover:border-indigo-300 transition-colors cursor-pointer group">
          <Calendar size={18} className="text-indigo-500 absolute left-4 pointer-events-none group-hover:text-indigo-600 transition-colors" />
          <input 
            type="date" 
            className="pl-8 pr-2 py-1 bg-transparent border-none outline-none text-gray-700 cursor-pointer appearance-none flex-1 w-full font-medium"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <TasksBoardWidget />
        </div>
        <div className="w-full">
          <StickyNotesWidget />
        </div>
        <div className="w-full">
          <ProfilesWidget />
        </div>
        <div className="w-full">
          <ExportSummaryWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
