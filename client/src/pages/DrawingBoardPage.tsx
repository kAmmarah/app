import React from 'react';
import DrawingCanvas from '../components/Drawing/DrawingCanvas';

const DrawingBoardPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Drawing Board</h1>
        <p className="text-gray-600 mt-1">Sketch, design, and save your ideas as images or sticky notes.</p>
      </div>
      <div className="flex-1 h-[calc(100%-100px)]">
        <DrawingCanvas />
      </div>
    </div>
  );
};

export default DrawingBoardPage;
