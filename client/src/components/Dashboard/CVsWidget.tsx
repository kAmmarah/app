import React, { useState } from 'react';
import { Users, Briefcase, GraduationCap, Plus, X } from 'lucide-react';

const initialCVs = [
  { name: 'Ali Raza', email: 'ali.raza@example.com', phone: '+92 300 1234567', skills: 'Python, Flask, AI, APIs', experience: '2 years Software Developer', education: 'BS Computer Science' },
  { name: 'Sara Khan', email: 'sara.khan@example.com', phone: '+92 321 7654321', skills: 'Marketing, Sales, Communication', experience: '3 years Sales Executive', education: 'MBA Marketing' },
  { name: 'Usman Ahmed', email: 'usman.ahmed@example.com', phone: '+92 333 9988776', skills: 'Embedded Systems, C++, IoT', experience: '4 years Embedded Developer', education: 'BS Electrical Engineering' }
];

const CVsWidget: React.FC = () => {
  const [cvs, setCvs] = useState(initialCVs);
  const [isAdding, setIsAdding] = useState(false);
  const [newCV, setNewCV] = useState({ name: '', email: '', phone: '', skills: '', experience: '', education: '' });

  const handleAddCV = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCV.name || !newCV.skills) return;
    setCvs([newCV, ...cvs]);
    setIsAdding(false);
    setNewCV({ name: '', email: '', phone: '', skills: '', experience: '', education: '' });
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users size={20} className="text-indigo-500" />
          <h2 className="text-lg font-bold text-gray-800">Candidate CVs</h2>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center space-x-1 px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
        >
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          <span>{isAdding ? 'Cancel' : 'Add CV'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddCV} className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 mb-4 flex flex-col space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <input required type="text" placeholder="Name" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newCV.name} onChange={e => setNewCV({...newCV, name: e.target.value})} />
            <input type="text" placeholder="Email" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newCV.email} onChange={e => setNewCV({...newCV, email: e.target.value})} />
            <input type="text" placeholder="Experience (e.g. 2 years)" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newCV.experience} onChange={e => setNewCV({...newCV, experience: e.target.value})} />
            <input type="text" placeholder="Education" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newCV.education} onChange={e => setNewCV({...newCV, education: e.target.value})} />
          </div>
          <input required type="text" placeholder="Skills (comma separated)" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newCV.skills} onChange={e => setNewCV({...newCV, skills: e.target.value})} />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            Save Candidate
          </button>
        </form>
      )}

      <div className="flex flex-col space-y-4 overflow-y-auto pr-2 flex-1">
        {cvs.map((cv, index) => (
          <div key={index} className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col space-y-2 hover:bg-white hover:shadow-sm transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{cv.name}</h3>
                <p className="text-xs text-gray-500">{cv.email} • {cv.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700 mt-2">
              <Briefcase size={14} className="text-gray-400" />
              <span>{cv.experience}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <GraduationCap size={14} className="text-gray-400" />
              <span>{cv.education}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {cv.skills.split(', ').map((skill, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVsWidget;
