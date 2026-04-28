import React, { useEffect, useState } from 'react';
import { Pin, Trash2, Plus } from 'lucide-react';
import { useCanvasStore } from '../../store/canvasStore';
import { v4 as uuidv4 } from 'uuid';

const bgColors = ['bg-[#FFF9C4]', 'bg-[#C8E6C9]', 'bg-[#BBDEFB]', 'bg-[#F8BBD0]', 'bg-[#E1BEE7]', 'bg-[#FFE0B2]'];

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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[#F59E0B] rounded-sm"></div>
          <h2 className="text-lg font-bold text-gray-800">Sticky Notes</h2>
        </div>
        <button onClick={handleAddNote} className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors">
          <Plus size={14} />
          <span>Add Note</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <div key={note.id} className={`${bgColors[index % bgColors.length]} p-4 rounded-lg shadow-sm flex flex-col justify-between h-36`}>
            <div className="flex justify-between items-start h-full">
              {editingId === note.id ? (
                <textarea
                  className="w-full h-full bg-transparent resize-none outline-none text-sm text-gray-800 leading-snug"
                  value={note.content}
                  onChange={(e) => updateNode(note.id, { content: e.target.value })}
                  onBlur={() => setEditingId(null)}
                  autoFocus
                />
              ) : (
                <p 
                  className="text-sm text-gray-800 leading-snug cursor-pointer flex-1 h-full"
                  onClick={() => setEditingId(note.id)}
                >
                  {note.content}
                </p>
              )}
              <button 
                onClick={(e) => { e.stopPropagation(); deleteNode(note.id); }}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                title="Delete Note"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-600 mt-4">
              <Pin size={12} className="fill-current" />
              <span>{note.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNotesWidget;
