import React from 'react';
import { Trash2 } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { useCanvasStore } from '../../store/canvasStore';

const TaskBoard: React.FC = () => {
  const { tasks, deleteTask } = useTaskStore();
  const { setSelectedNode } = useCanvasStore();

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  const TaskCard = ({ task }: any) => (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-2 hover:shadow-md transition-shadow cursor-pointer relative group"
         onClick={() => setSelectedNode(task.nodeId)}>
      <button 
        onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded-full p-1"
      >
        <Trash2 size={14} />
      </button>
      <p className="text-sm text-gray-800 mb-2 pr-5">{task.content}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{task.author}</span>
        {task.priority && (
          <span className={`px-2 py-1 rounded ${
            task.priority === 'high' ? 'bg-red-100 text-red-700' :
            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {task.priority}
          </span>
        )}
      </div>
      {task.deadline && (
        <p className="text-xs text-gray-500 mt-1">Due: {task.deadline}</p>
      )}
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Task Board</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">To Do ({todoTasks.length})</h3>
          <div className="space-y-2">
            {todoTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">In Progress ({inProgressTasks.length})</h3>
          <div className="space-y-2">
            {inProgressTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Done ({doneTasks.length})</h3>
          <div className="space-y-2">
            {doneTasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
