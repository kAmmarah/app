import React, { useEffect, useState } from 'react';
import { Pin, Trash2, Plus } from 'lucide-react';
import { useCanvasStore } from '../../store/canvasStore';
import { v4 as uuidv4 } from 'uuid';

const bgColors = ['bg-[#FFDEE9]', 'bg-[#E3FDF5]', 'bg-[#E0C3FC]', 'bg-[#FFF1EB]', 'bg-[#E2D1C3]', 'bg-[#D4FC79]'];
const shadowColors = ['shadow-[#FFDEE9]', 'shadow-[#E3FDF5]', 'shadow-[#E0C3FC]', 'shadow-[#FFF1EB]', 'shadow-[#E2D1C3]', 'shadow-[#D4FC79]'];

const StickyNotesWidget: React.FC = () => {
  const { nodes, addNode, updateNode, deleteNode } = useCanvasStore();
  const notes = nodes.filter(n => n.type === 'sticky');
  
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // Seed initial data if empty to match the mockup
    if (nodes.length === 0) {
      const initialNotes = [
        { text: "Server maintenance scheduled on May 25, 2025 10:00 PM", author: "Admin" },
        { text: "Review and update user roles and permissions.", author: "Admin" },
        { text: "Client meeting tomorrow at 11:00 AM", author: "Admin" },
        { text: "Deployment successfully completed.", author: "System" },
        { text: "Don't forget to backup the database.", author: "Admin" },
        { text: "Check logs for error reports.", author: "Admin" },
      ];
      initialNotes.forEach(note => {
        addNode({
          id: uuidv4(),
          type: 'sticky',
          position: { x: 0, y: 0 },
          content: note.text,
          author: note.author,
          createdAt: new Date(),
          updatedAt: new Date(),
          acl: { locked: false, allowedRoles: ['lead', 'contributor', 'viewer'] }
        });
      });
    }
  }, [nodes.length, addNode]);

  const handleAddNote = () => {
    const newId = uuidv4();
    addNode({
      id: newId,
      type: 'sticky',
      position: { x: 0, y: 0 },
      content: 'New note...',
      author: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      acl: { locked: false, allowedRoles: ['lead', 'contributor', 'viewer'] }
    });
    setEditingId(newId);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[#F59E0B] rounded-sm"></div>
          <h2 className="text-lg font-bold text-gray-800">Sticky Notes</h2>
        </div>
        <button onClick={handleAddNote} className="flex items-center space-x-1 px-4 py-2 text-sm text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors font-medium">
          <Plus size={16} />
          <span>Add Note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <div key={note.id} className={`${bgColors[index % bgColors.length]} p-6 rounded-[2rem] rounded-tr-lg shadow-sm hover:shadow-lg ${shadowColors[index % shadowColors.length]}/50 hover:-translate-y-2 flex flex-col justify-between h-40 transition-all duration-300 relative group`}>
            <div className="flex justify-between items-start h-full">
              {editingId === note.id ? (
                <textarea
                  className="w-full h-full bg-transparent resize-none outline-none text-[15px] font-medium text-gray-800 leading-snug"
                  value={note.content}
                  onChange={(e) => updateNode(note.id, { content: e.target.value })}
                  onBlur={() => setEditingId(null)}
                  autoFocus
                />
              ) : (
                <p 
                  className="text-[15px] font-medium text-gray-800 leading-snug cursor-pointer flex-1 h-full"
                  onClick={() => setEditingId(note.id)}
                >
                  {note.content}
                </p>
              )}
              <button 
                onClick={(e) => { e.stopPropagation(); deleteNode(note.id); }}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2 opacity-0 group-hover:opacity-100 bg-white/50 p-1.5 rounded-full"
                title="Delete Note"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-gray-700/60 mt-4">
              <Pin size={14} className="fill-current text-gray-700/40" />
              <span>{note.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNotesWidget;
