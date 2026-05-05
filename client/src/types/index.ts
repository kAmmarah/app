export interface CanvasNode {
  id: string;
  type: 'sticky' | 'text' | 'shape' | 'drawing' | 'image';
  position: { x: number; y: number };
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  acl: NodeACL;
  intent?: IntentType;
  intentData?: IntentExtractedData;
  imageUrl?: string;
  width?: number;
  height?: number;
}

export interface NodeACL {
  locked: boolean;
  allowedRoles: UserRole[];
}

export type UserRole = 'lead' | 'contributor' | 'viewer';
export type IntentType = 'action_item' | 'decision' | 'question' | 'reference';

export interface IntentExtractedData {
  assignee?: string;
  deadline?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface User {
  id: string;
  name: string;
  email: string;
  color: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
}

export interface TaskItem {
  id: string;
  nodeId: string;
  content: string;
  author: string;
  createdAt: Date;
  status: 'todo' | 'in_progress' | 'done';
  assignee?: string;
  deadline?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface CanvasEvent {
  id: string;
  eventType: string;
  nodeId: string;
  userId: string;
  timestamp: Date;
  version: number;
}
