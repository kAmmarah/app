import React, { useEffect } from 'react';
import { Plus, CheckCircle2, ListTodo, Trash2 } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { v4 as uuidv4 } from 'uuid';

const TasksBoardWidget: React.FC = () => {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useTaskStore();

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

  const handleAddTask = (status: 'todo' | 'in_progress' | 'done') => {
    const text = prompt("Enter task description:");
    if (!text) return;
    addTask({
      id: uuidv4(),
      nodeId: '',
      content: text,
      author: 'Admin',
      createdAt: new Date(),
      status: status,
      priority: 'medium',
      deadline: 'Pending'
    });
  };

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ListTodo size={20} className="text-[#4338CA]" />
          <h2 className="text-lg font-bold text-gray-800">Tasks Board</h2>
        </div>
        <button 
          onClick={() => handleAddTask('todo')}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
        >
          <Plus size={14} />
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
            <div key={task.id} className="bg-white border border-gray-100 shadow-sm rounded-lg p-4 flex flex-col space-y-3 cursor-pointer hover:shadow-md transition-shadow relative group" onClick={() => updateTaskStatus(task.id, 'in_progress')}>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
              <p className="text-sm font-medium text-gray-800 pr-6">{task.content}</p>
              <div className="flex items-center justify-between text-xs mt-auto">
                <span className={`px-2 py-0.5 rounded ${
                  task.priority === 'low' ? 'bg-green-100 text-green-700' :
                  task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}
                </span>
                <span className="text-gray-500">{task.deadline}</span>
              </div>
            </div>
          ))}

          <button onClick={() => handleAddTask('todo')} className="flex items-center text-[#4338CA] text-sm font-medium mt-2 hover:underline">
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
            <div key={task.id} className="bg-white border border-gray-100 shadow-sm rounded-lg p-4 flex flex-col space-y-3 cursor-pointer hover:shadow-md transition-shadow relative group" onClick={() => updateTaskStatus(task.id, 'done')}>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
              <p className="text-sm font-medium text-gray-800 pr-6">{task.content}</p>
              <div className="flex items-center justify-between text-xs mt-auto">
                <span className={`px-2 py-0.5 rounded ${
                  task.priority === 'low' ? 'bg-green-100 text-green-700' :
                  task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}
                </span>
                <span className="text-gray-500">{task.deadline}</span>
              </div>
            </div>
          ))}
          
          <button onClick={() => handleAddTask('in_progress')} className="flex items-center text-[#4338CA] text-sm font-medium mt-2 hover:underline">
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
            <div key={task.id} className="bg-white border border-gray-100 shadow-sm rounded-lg p-4 flex flex-col space-y-3 cursor-pointer hover:shadow-md transition-shadow relative group" onClick={() => updateTaskStatus(task.id, 'todo')}>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
              <p className="text-sm font-medium text-gray-800 line-through pr-6">{task.content}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                <span>{task.deadline}</span>
                <CheckCircle2 size={16} className="text-green-500" />
              </div>
            </div>
          ))}
          
          <button onClick={() => handleAddTask('done')} className="flex items-center text-[#4338CA] text-sm font-medium mt-2 hover:underline">
            <Plus size={16} className="mr-1" /> Add Task
          </button>
        </div>

      </div>
    </div>
  );
};

export default TasksBoardWidget;
