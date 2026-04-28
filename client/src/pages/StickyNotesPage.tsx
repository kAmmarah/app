import React from 'react';
import StickyNotesWidget from '../components/Dashboard/StickyNotesWidget';

const StickyNotesPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sticky Notes</h1>
        <p className="text-gray-600 mt-1">Manage all your sticky notes in one place.</p>
      </div>
      <div className="h-[calc(100%-100px)]">
        <StickyNotesWidget />
      </div>
    </div>
  );
};

export default StickyNotesPage;
