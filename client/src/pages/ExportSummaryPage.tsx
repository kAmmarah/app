import React from 'react';
import ExportSummaryWidget from '../components/Dashboard/ExportSummaryWidget';

const ExportSummaryPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Export Summary</h1>
        <p className="text-gray-600 mt-1">View system statistics and export data.</p>
      </div>
      <ExportSummaryWidget />
    </div>
  );
};

export default ExportSummaryPage;
