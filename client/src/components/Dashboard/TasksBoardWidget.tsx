import React, { useEffect, useState } from 'react';
import { Plus, CheckCircle2, ListTodo, Trash2, X } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { v4 as uuidv4 } from 'uuid';

const TasksBoardWidget: React.FC = () => {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useTaskStore();
  const [addingTo, setAddingTo] = useState<'todo' | 'in_progress' | 'done' | null>(null);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    if (tasks.length === 0) {
      const initialTasks = [
        { content: "Fix login issue", priority: "low", status: "todo", deadline: "May 23" },
        { content: "Update user profile page", priority: "medium", status: "todo", deadline: "May 24" },
        { content: "Backup database", priority: "high", status: "todo", deadline: "May 22" },
        { content: "UI/UX improvements", priority: "medium", status: "in_progress", deadline: "May 21" },
        { content: "API integration", priority: "high", status: "in_progress", deadline: "May 22" },
        { content: "Setup server", priority: "low", status: "done", deadline: "May 20" },
        { content: "Create database schema", priority: "medium", status: "done", deadline: "May 18" },
      ] as any[];
      
      initialTasks.forEach(task => {
        addTask({
          id: uuidv4(),
          nodeId: '',
          content: task.content,
          author: 'Admin',
          createdAt: new Date(),
          status: task.status,
          priority: task.priority,
          deadline: task.deadline
        });
      });
    }
  }, [tasks.length, addTask]);

  const handleAddTaskSubmit = (status: 'todo' | 'in_progress' | 'done') => {
    if (!newTaskText.trim()) {
      setAddingTo(null);
      return;
    }
    addTask({
      id: uuidv4(),
      nodeId: '',
      content: newTaskText.trim(),
      author: 'Admin',
      createdAt: new Date(),
      status: status,
      priority: 'medium',
      deadline: 'Pending'
    });
    setNewTaskText('');
    setAddingTo(null);
  };

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ListTodo size={20} className="text-[#4338CA]" />
          <h2 className="text-lg font-bold text-gray-800">Tasks Board</h2>
        </div>
        <button 
          onClick={() => setAddingTo('todo')}
          className="flex items-center space-x-1 px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* To Do Column */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-sm">To Do</h3>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">{todoTasks.length}</span>
          </div>
          
          {todoTasks.map(task => (
            <div key={task.id} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col space-y-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group" onClick={() => updateTaskStatus(task.id, 'in_progress')}>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                className="absolute top-3 right-3 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded-full p-1"
              >
                <Trash2 size={16} />
              </button>
              <p className="text-sm font-medium text-gray-800 pr-6 leading-relaxed">{task.content}</p>
              <div className="flex items-center justify-between text-xs mt-auto pt-2 border-t border-gray-50">
                <span className={`px-2.5 py-1 rounded-full font-medium ${
                  task.priority === 'low' ? 'bg-teal-50 text-teal-600 border border-teal-100' :
                  task.priority === 'high' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                }`}>
                  {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}
                </span>
                <span className="text-gray-400 font-medium">{task.deadline}</span>
              </div>
            </div>
          ))}

          {addingTo === 'todo' && (
            <div className="bg-white border border-indigo-200 shadow-md rounded-2xl p-4 flex flex-col space-y-3">
              <input
                autoFocus
                type="text"
                placeholder="Task description..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddTaskSubmit('todo'); }}
              />
              <div className="flex space-x-2">
                <button onClick={() => handleAddTaskSubmit('todo')} className="flex-1 bg-indigo-600 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700">Add</button>
                <button onClick={() => { setAddingTo(null); setNewTaskText(''); }} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"><X size={16} /></button>
              </div>
            </div>
          )}

          <button onClick={() => setAddingTo('todo')} className="flex items-center text-[#4338CA] text-sm font-medium mt-2 hover:underline">
            <Plus size={16} className="mr-1" /> Add Task
          </button>
        </div>

        {/* In Progress Column */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-sm">In Progress</h3>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">{inProgressTasks.length}</span>
          </div>
          
          {inProgressTasks.map(task => (
            <div key={task.id} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col space-y-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group" onClick={() => updateTaskStatus(task.id, 'done')}>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                className="absolute top-3 right-3 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded-full p-1"
              >
                <Trash2 size={16} />
              </button>
              <p className="text-sm font-medium text-gray-800 pr-6 leading-relaxed">{task.content}</p>
              <div className="flex items-center justify-between text-xs mt-auto pt-2 border-t border-gray-50">
                <span className={`px-2.5 py-1 rounded-full font-medium ${
                  task.priority === 'low' ? 'bg-teal-50 text-teal-600 border border-teal-100' :
                  task.priority === 'high' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                }`}>
                  {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}
                </span>
                <span className="text-gray-400 font-medium">{task.deadline}</span>
              </div>
            </div>
          ))}
          
          {addingTo === 'in_progress' && (
            <div className="bg-white border border-indigo-200 shadow-md rounded-2xl p-4 flex flex-col space-y-3">
              <input
                autoFocus
                type="text"
                placeholder="Task description..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddTaskSubmit('in_progress'); }}
              />
              <div className="flex space-x-2">
                <button onClick={() => handleAddTaskSubmit('in_progress')} className="flex-1 bg-indigo-600 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700">Add</button>
                <button onClick={() => { setAddingTo(null); setNewTaskText(''); }} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"><X size={16} /></button>
              </div>
            </div>
          )}
          
          <button onClick={() => setAddingTo('in_progress')} className="flex items-center text-[#4338CA] text-sm font-medium mt-2 hover:underline">
            <Plus size={16} className="mr-1" /> Add Task
          </button>
        </div>

        {/* Completed Column */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-sm">Completed</h3>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">{doneTasks.length}</span>
          </div>
          
          {doneTasks.map(task => (
            <div key={task.id} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col space-y-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group opacity-75 hover:opacity-100" onClick={() => updateTaskStatus(task.id, 'todo')}>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                className="absolute top-3 right-3 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded-full p-1"
              >
                <Trash2 size={16} />
              </button>
              <p className="text-sm font-medium text-gray-500 line-through pr-6 leading-relaxed">{task.content}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2 border-t border-gray-50">
                <span className="font-medium">{task.deadline}</span>
                <CheckCircle2 size={18} className="text-emerald-500" />
              </div>
            </div>
          ))}
          
          {addingTo === 'done' && (
            <div className="bg-white border border-indigo-200 shadow-md rounded-2xl p-4 flex flex-col space-y-3">
              <input
                autoFocus
                type="text"
                placeholder="Task description..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddTaskSubmit('done'); }}
              />
              <div className="flex space-x-2">
                <button onClick={() => handleAddTaskSubmit('done')} className="flex-1 bg-indigo-600 text-white py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700">Add</button>
                <button onClick={() => { setAddingTo(null); setNewTaskText(''); }} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"><X size={16} /></button>
              </div>
            </div>
          )}
          
          <button onClick={() => setAddingTo('done')} className="flex items-center text-[#4338CA] text-sm font-medium mt-2 hover:underline">
            <Plus size={16} className="mr-1" /> Add Task
          </button>
        </div>

      </div>
    </div>
  );
};

export default TasksBoardWidget;
