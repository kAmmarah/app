import React, { useState } from 'react';
import { Link2, Plus, Search, Copy, ExternalLink, Trash2, Globe, Webhook, Key } from 'lucide-react';

const mockLinks = [
  { id: 1, name: 'Client Portal Access', url: 'https://taskorbit.com/p/client-portal', type: 'Public URL', status: 'Active', usage: '1,245 views', date: 'May 20, 2025' },
  { id: 2, name: 'Zapier Integration', url: 'wh_live_89f3b2a...', type: 'Webhook', status: 'Active', usage: '8,432 requests', date: 'May 15, 2025' },
  { id: 3, name: 'Legacy API Key', url: 'sk_live_9a8b7c...', type: 'API Key', status: 'Revoked', usage: '0 requests', date: 'Jan 10, 2025' },
  { id: 4, name: 'Design Assets Share', url: 'https://taskorbit.com/share/assets', type: 'Public URL', status: 'Active', usage: '342 views', date: 'May 22, 2025' },
  { id: 5, name: 'Slack Notifications', url: 'wh_live_22x9a...', type: 'Webhook', status: 'Active', usage: '12,040 requests', date: 'Mar 05, 2025' },
];

const categories = ['All', 'Public URL', 'Webhook', 'API Key'];

const getIconForType = (type: string) => {
  if (type === 'Webhook') return <Webhook size={16} className="text-purple-500" />;
  if (type === 'API Key') return <Key size={16} className="text-amber-500" />;
  return <Globe size={16} className="text-blue-500" />;
};

const LinksPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLinks = mockLinks.filter(link => {
    const matchesCategory = activeCategory === 'All' || link.type === activeCategory;
    const matchesSearch = link.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          link.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Link2 size={24} />
            </div>
            System Links
          </h1>
          <p className="text-gray-500 mt-2">Manage your public workspace links and integration endpoints.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#051C45] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#041534] transition-all shadow-md shadow-[#051C45]/20 hover:-translate-y-0.5">
          <Plus size={18} />
          Generate New Link
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search links..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4 font-medium">Link Name & Endpoint</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Usage</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLinks.map(link => (
                <tr key={link.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 mb-1">{link.name}</div>
                    <div className="text-sm text-gray-500 font-mono bg-gray-50 px-2 py-0.5 rounded border border-gray-100 inline-block">
                      {link.url}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      {getIconForType(link.type)}
                      {link.type}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      link.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}>
                      {link.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {link.usage}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Copy Link">
                        <Copy size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Open Link">
                        <ExternalLink size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLinks.length === 0 && (
          <div className="text-center py-20 bg-white">
            <Link2 size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No links found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinksPage;
