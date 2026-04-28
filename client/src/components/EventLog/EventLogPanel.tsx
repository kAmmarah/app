import React from 'react';
import { useEventStore } from '../../store/eventStore';

const EventLogPanel: React.FC = () => {
  const { events } = useEventStore();

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'node_create': return '➕';
      case 'node_update': return '✏️';
      case 'node_delete': return '🗑️';
      case 'node_lock': return '🔒';
      case 'node_unlock': return '🔓';
      default: return '📝';
    }
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'node_create': return 'bg-green-100 text-green-800';
      case 'node_update': return 'bg-blue-100 text-blue-800';
      case 'node_delete': return 'bg-red-100 text-red-800';
      case 'node_lock': return 'bg-yellow-100 text-yellow-800';
      case 'node_unlock': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Event Log</h2>
      
      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">No events yet</p>
        ) : (
          events.slice().reverse().map((event) => (
            <div key={event.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start space-x-2">
                <span className="text-lg">{getEventIcon(event.eventType)}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs px-2 py-1 rounded ${getEventColor(event.eventType)}`}>
                      {event.eventType}
                    </span>
                    <span className="text-xs text-gray-500">v{event.version}</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    User: {event.userId}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventLogPanel;
