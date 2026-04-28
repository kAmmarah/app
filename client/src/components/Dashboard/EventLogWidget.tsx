import React from 'react';
import { CalendarDays, User, ListTodo, Database, ShieldAlert } from 'lucide-react';

const EventLogWidget: React.FC = () => {
  const events = [
    { id: 1, icon: <User size={16} className="text-yellow-600" />, text: "Admin logged in", ip: "192.168.1.10", time: "May 21, 2025 09:15 AM", bg: "bg-yellow-50" },
    { id: 2, icon: <User size={16} className="text-blue-600" />, text: "New user created: John Doe", ip: "192.168.1.12", time: "May 21, 2025 09:30 AM", bg: "bg-blue-50" },
    { id: 3, icon: <ListTodo size={16} className="text-[#4338CA]" />, text: "Task \"API integration\" updated", ip: "192.168.1.15", time: "May 21, 2025 10:05 AM", bg: "bg-indigo-50" },
    { id: 4, icon: <Database size={16} className="text-green-600" />, text: "Server backup completed", ip: "192.168.1.10", time: "May 21, 2025 10:30 AM", bg: "bg-green-50" },
    { id: 5, icon: <ShieldAlert size={16} className="text-red-600" />, text: "Failed login attempt", ip: "192.168.1.20", time: "May 21, 2025 11:02 AM", bg: "bg-red-50", isError: true },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CalendarDays size={20} className="text-gray-700" />
          <h2 className="text-lg font-bold text-gray-800">Event Log</h2>
        </div>
        <button className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event, i) => (
          <React.Fragment key={event.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${event.bg}`}>
                  {event.icon}
                </div>
                <span className={`text-sm ${event.isError ? 'text-red-600 font-medium' : 'text-gray-800'}`}>
                  {event.text}
                </span>
              </div>
              <div className="flex items-center space-x-8 text-xs text-gray-500">
                <span className="w-24">{event.ip}</span>
                <span>{event.time}</span>
              </div>
            </div>
            {i < events.length - 1 && <hr className="border-gray-50" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default EventLogWidget;
