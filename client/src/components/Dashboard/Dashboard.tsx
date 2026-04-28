import React from 'react';
import StickyNotesWidget from './StickyNotesWidget';
import TasksBoardWidget from './TasksBoardWidget';
import EventLogWidget from './EventLogWidget';
import ExportSummaryWidget from './ExportSummaryWidget';
import { Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            Welcome, Admin <span className="ml-2 text-2xl">👋</span>
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your system today.</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-white px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 shadow-sm">
          <Calendar size={16} className="text-gray-500" />
          <span>May 21, 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <StickyNotesWidget />
        </div>
        <div className="w-full">
          <TasksBoardWidget />
        </div>
        <div className="w-full">
          <EventLogWidget />
        </div>
        <div className="w-full">
          <ExportSummaryWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
