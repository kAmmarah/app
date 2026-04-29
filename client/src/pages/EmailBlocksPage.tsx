import React, { useState } from 'react';
import { Mail, Plus, Search, MoreVertical, Edit2, Send, Trash2, Tag, Calendar } from 'lucide-react';

const mockTemplates = [
  { id: 1, name: 'Welcome Onboarding', subject: "Welcome to TaskOrbit! Let's get started", category: 'Marketing', status: 'Active', date: 'May 24, 2025' },
  { id: 2, name: 'Weekly Update', subject: 'Your weekly progress report', category: 'Newsletters', status: 'Draft', date: 'May 20, 2025' },
  { id: 3, name: 'Candidate Rejection', subject: 'Update on your application', category: 'Outreach', status: 'Active', date: 'May 18, 2025' },
  { id: 4, name: 'Team Meeting Reminder', subject: 'Sync up tomorrow at 10 AM', category: 'Internal', status: 'Active', date: 'May 15, 2025' },
  { id: 5, name: 'New Feature Launch', subject: 'Introducing Smart Analytics!', category: 'Marketing', status: 'Draft', date: 'May 10, 2025' },
];

const categories = ['All', 'Marketing', 'Newsletters', 'Outreach', 'Internal'];

const EmailBlocksPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Mail size={24} />
            </div>
            Email Blocks
          </h1>
          <p className="text-gray-500 mt-2">Manage and design your reusable email templates.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#051C45] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#041534] transition-all shadow-md shadow-[#051C45]/20 hover:-translate-y-0.5">
          <Plus size={18} />
          Create Template
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
            placeholder="Search templates..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <div key={template.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                template.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
              }`}>
                {template.status}
              </span>
              <button className="text-gray-400 hover:text-gray-700 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-1">{template.subject}</p>
            
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
              <div className="flex items-center gap-1.5">
                <Tag size={14} /> {template.category}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} /> {template.date}
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-4 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex-1 flex justify-center items-center gap-1.5 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Edit2 size={16} /> Edit
              </button>
              <button className="flex-1 flex justify-center items-center gap-1.5 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                <Send size={16} /> Send
              </button>
              <button className="w-10 flex justify-center items-center py-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <Mail size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No templates found</h3>
          <p className="text-gray-500">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default EmailBlocksPage;
