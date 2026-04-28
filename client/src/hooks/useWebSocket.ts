import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useCanvasStore } from '../store/canvasStore';
import { useTaskStore } from '../store/taskStore';
import { useUserStore } from '../store/userStore';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

export function useWebSocket() {
  const socketRef = useRef<Socket | null>(null);
  const { addNode, updateNode, setNodes } = useCanvasStore();
  const { addTask, setTasks } = useTaskStore();
  const { setCurrentUser, setUsers } = useUserStore();
  // Event store available for future use

  useEffect(() => {
    const socket = io(SERVER_URL, {
      transports: ['websocket', 'polling']
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('canvas_state', (data: { nodes: any[] }) => {
      setNodes(data.nodes);
      
      // Extract tasks from action items
      const tasks = data.nodes
        .filter(node => node.intent === 'action_item')
        .map(node => ({
          id: node.id,
          nodeId: node.id,
          content: node.content,
          author: node.author,
          createdAt: new Date(node.createdAt),
          status: 'todo' as const,
          assignee: node.intentData?.assignee,
          deadline: node.intentData?.deadline,
          priority: node.intentData?.priority
        }));
      
      setTasks(tasks);
    });

    socket.on('node_created', (data: { node: any; intent: any }) => {
      addNode(data.node);
      
      if (data.node.intent === 'action_item') {
        addTask({
          id: data.node.id,
          nodeId: data.node.id,
          content: data.node.content,
          author: data.node.author,
          createdAt: new Date(data.node.createdAt),
          status: 'todo',
          assignee: data.node.intentData?.assignee,
          deadline: data.node.intentData?.deadline,
          priority: data.node.intentData?.priority
        });
      }
    });

    socket.on('node_updated', (data: { nodeId: string; updates: any }) => {
      updateNode(data.nodeId, data.updates);
    });

    socket.on('presence_update', (data: { users: any[] }) => {
      setUsers(data.users);
    });

    socket.on('error', (data: { message: string }) => {
      console.error('Server error:', data.message);
      alert(data.message);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinCanvas = (userId: string, userName: string, color: string, role: string, canvasId: string) => {
    socketRef.current?.emit('join_canvas', { userId, userName, color, role, canvasId });
    const userColor = color || `#${Math.floor(Math.random()*16777215).toString(16)}`;
    setCurrentUser({ 
      id: userId, 
      name: userName, 
      email: `${userName.toLowerCase().replace(/\s+/g, '')}@taskorbit.com`,
      status: 'Active',
      color: userColor, 
      role: role as any 
    });
  };

  const createNode = (nodeData: any) => {
    socketRef.current?.emit('node_create', nodeData);
  };

  const updateNodeData = (nodeId: string, updates: any) => {
    socketRef.current?.emit('node_update', { nodeId, updates });
  };

  const lockNode = (nodeId: string, locked: boolean) => {
    socketRef.current?.emit('node_lock', { nodeId, locked });
  };

  const sendCursorMove = (x: number, y: number) => {
    socketRef.current?.emit('cursor_move', { x, y });
  };

  return {
    joinCanvas,
    createNode,
    updateNodeData,
    lockNode,
    sendCursorMove,
    socket: socketRef.current
  };
}
