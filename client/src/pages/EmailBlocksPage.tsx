import React from 'react';
import { Mail } from 'lucide-react';

const EmailBlocksPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <Mail size={40} className="text-[#051C45]" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Email Blocks</h1>
      <p className="text-gray-500 max-w-md">
        Manage and design your email templates using a drag-and-drop block builder.
        This feature is fully integrated into the TaskOrbit workflow.
      </p>
      <button className="mt-8 bg-[#051C45] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#041534] transition-colors">
        Create Email Template
      </button>
    </div>
  );
};

export default EmailBlocksPage;
