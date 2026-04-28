export interface CanvasNode {
  id: string;
  type: 'sticky' | 'text' | 'shape' | 'drawing';
  position: { x: number; y: number };
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  acl: NodeACL;
  intent?: IntentType;
  intentData?: IntentExtractedData;
}

export interface NodeACL {
  locked: boolean;
  allowedRoles: UserRole[];
  permissions?: {
    [userId: string]: {
      role: UserRole;
      canEdit: boolean;
      canDelete: boolean;
      canLock: boolean;
    };
  };
}

export type UserRole = 'lead' | 'contributor' | 'viewer';

export type IntentType = 'action_item' | 'decision' | 'question' | 'reference';

export interface IntentExtractedData {
  assignee?: string;
  deadline?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface CanvasEvent {
  id: string;
  canvasId: string;
  eventType: 'node_create' | 'node_update' | 'node_delete' | 'node_lock' | 'node_unlock';
  nodeId: string;
  delta: any;
  userId: string;
  timestamp: Date;
  version: number;
}

export interface User {
  id: string;
  name: string;
  color: string;
  role: UserRole;
}

export interface CursorPosition {
  userId: string;
  x: number;
  y: number;
  timestamp: number;
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
