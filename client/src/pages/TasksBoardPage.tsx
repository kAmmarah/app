import React from 'react';
import TasksBoardWidget from '../components/Dashboard/TasksBoardWidget';

const TasksBoardPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tasks Board</h1>
        <p className="text-gray-600 mt-1">Manage your team's tasks and progress.</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <TasksBoardWidget />
      </div>
    </div>
  );
};

export default TasksBoardPage;
