import { create } from 'zustand';
import { CanvasNode } from '../types';

interface CanvasState {
  nodes: CanvasNode[];
  selectedNodeId: string | null;
  zoom: number;
  pan: { x: number; y: number };
  
  setNodes: (nodes: CanvasNode[]) => void;
  addNode: (node: CanvasNode) => void;
  updateNode: (id: string, updates: Partial<CanvasNode>) => void;
  deleteNode: (id: string) => void;
  removeNode: (id: string) => void;
  setSelectedNode: (nodeId: string | null) => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  nodes: [],
  selectedNodeId: null,
  zoom: 1,
  pan: { x: 0, y: 0 },
  
  setNodes: (nodes) => set({ nodes }),
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  updateNode: (id, updates) => set((state) => ({
    nodes: state.nodes.map((node) => 
      node.id === id ? { ...node, ...updates, updatedAt: new Date() } : node
    ),
  })),
  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
  })),
  removeNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id)
  })),
  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),
  setZoom: (zoom) => set({ zoom }),
  setPan: (pan) => set({ pan }),
}));
