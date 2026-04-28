import React from 'react';
import EventLogWidget from '../components/Dashboard/EventLogWidget';

const EventLogPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Event Log</h1>
        <p className="text-gray-600 mt-1">View all system events and activities.</p>
      </div>
      <EventLogWidget />
    </div>
  );
};

export default EventLogPage;
