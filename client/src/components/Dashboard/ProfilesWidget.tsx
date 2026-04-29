import React, { useState } from 'react';
import { Users, Briefcase, GraduationCap, Plus, X, Trash2 } from 'lucide-react';
import { useUserStore } from '../../store/userStore';

const ProfilesWidget: React.FC = () => {
  const { profiles, addProfile, deleteProfile } = useUserStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newProfile, setNewProfile] = useState({ name: '', email: '', phone: '', skills: '', experience: '', education: '' });

  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfile.name || !newProfile.skills) return;
    addProfile({ id: Date.now().toString(), ...newProfile });
    setIsAdding(false);
    setNewProfile({ name: '', email: '', phone: '', skills: '', experience: '', education: '' });
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users size={20} className="text-indigo-500" />
          <h2 className="text-lg font-bold text-gray-800">Profiles</h2>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center space-x-1 px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
        >
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          <span>{isAdding ? 'Cancel' : 'Add Profile'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddProfile} className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 mb-4 flex flex-col space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <input required type="text" placeholder="Name" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newProfile.name} onChange={e => setNewProfile({...newProfile, name: e.target.value})} />
            <input type="text" placeholder="Email" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newProfile.email} onChange={e => setNewProfile({...newProfile, email: e.target.value})} />
            <input type="text" placeholder="Experience (e.g. 2 years)" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newProfile.experience} onChange={e => setNewProfile({...newProfile, experience: e.target.value})} />
            <input type="text" placeholder="Education" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newProfile.education} onChange={e => setNewProfile({...newProfile, education: e.target.value})} />
          </div>
          <input required type="text" placeholder="Skills (comma separated)" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={newProfile.skills} onChange={e => setNewProfile({...newProfile, skills: e.target.value})} />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            Save Profile
          </button>
        </form>
      )}

      <div className="flex flex-col space-y-4 overflow-y-auto pr-2 flex-1">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col space-y-2 hover:bg-white hover:shadow-sm transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{profile.name}</h3>
                <p className="text-xs text-gray-500">{profile.email} • {profile.phone}</p>
              </div>
              <button 
                onClick={() => deleteProfile(profile.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                title="Delete Profile"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700 mt-2">
              <Briefcase size={14} className="text-gray-400" />
              <span>{profile.experience}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <GraduationCap size={14} className="text-gray-400" />
              <span>{profile.education}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {profile.skills.split(', ').map((skill, i) => (
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

export default ProfilesWidget;
