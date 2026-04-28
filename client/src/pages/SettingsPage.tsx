import React from 'react';
import { Settings } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
        <p className="text-gray-600 mt-1">Configure workspace preferences and integrations.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Settings size={18} className="mr-2 text-[#051C45]" />
              General Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <div>
                  <div className="font-medium text-gray-800">Workspace Name</div>
                  <div className="text-sm text-gray-500">The name of your primary organization</div>
                </div>
                <input type="text" defaultValue="TaskOrbit Global" className="px-3 py-1.5 border border-gray-200 rounded text-sm outline-none focus:ring-2 focus:ring-[#051C45]" />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <div>
                  <div className="font-medium text-gray-800">Default View</div>
                  <div className="text-sm text-gray-500">What users see upon logging in</div>
                </div>
                <select className="px-3 py-1.5 border border-gray-200 rounded text-sm outline-none focus:ring-2 focus:ring-[#051C45] bg-white">
                  <option>Dashboard</option>
                  <option>Tasks Board</option>
                  <option>Sticky Notes</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <button className="bg-[#051C45] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#041534] transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
