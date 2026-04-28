import React from 'react';
import { Bell, Plus } from 'lucide-react';
import { useUserStore } from '../../store/userStore';

const Header: React.FC = () => {
  const { currentUser, setCurrentUser } = useUserStore();
  const initials = currentUser?.name.substring(0, 2).toUpperCase() || 'AD';

  return (
    <header className="h-20 bg-white px-8 flex items-center justify-between border-b border-gray-100 z-10">
      <div className="flex items-center space-x-4">
        {/* Placeholder for left side elements if needed, maybe breadcrumbs */}
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={() => alert("Global Create action triggered.")}
          className="bg-[#051C45] hover:bg-[#041534] text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors shadow-sm"
        >
          <Plus size={16} />
          <span>Create</span>
        </button>

        <div className="relative cursor-pointer">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <Bell size={20} />
          </div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-[#051C45] border-2 border-white rounded-full flex items-center justify-center text-[9px] text-white font-bold">
            3
          </div>
        </div>

        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => setCurrentUser(null)}
          title="Sign out"
        >
          <div className="w-10 h-10 rounded-full bg-[#051C45] group-hover:bg-red-600 transition-colors text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {initials}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-bold text-gray-800">{currentUser?.name || 'Admin'}</div>
            <div className="text-xs text-gray-500 capitalize">{currentUser?.role || 'Administrator'}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
