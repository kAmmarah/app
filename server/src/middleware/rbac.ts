import { Socket } from 'socket.io';
import CanvasNode from '../models/CanvasNode';
import { UserRole } from '../types';

export interface UserContext {
  userId: string;
  role: UserRole;
  canvasId: string;
}

export async function validateNodePermission(
  socket: Socket,
  nodeId: string,
  action: 'edit' | 'delete' | 'lock'
): Promise<boolean> {
  try {
    const node = await CanvasNode.findOne({ id: nodeId });
    
    if (!node) {
      socket.emit('error', { message: 'Node not found' });
      return false;
    }
    
    // Check if node is locked
    if (node.acl.locked && action === 'edit') {
      const userContext = socket.data.userContext as UserContext;
      
      // Only leads can edit locked nodes
      if (userContext.role !== 'lead') {
        socket.emit('error', { 
          message: 'Node is locked. Only leads can edit locked nodes.',
          nodeId 
        });
        return false;
      }
    }
    
    // Check user permissions
    const userContext = socket.data.userContext as UserContext;
    
    if (node.acl.permissions && node.acl.permissions[userContext.userId]) {
      const perm = node.acl.permissions[userContext.userId];
      
      if (action === 'edit' && !perm.canEdit) {
        socket.emit('error', { message: 'You do not have permission to edit this node' });
        return false;
      }
      
      if (action === 'delete' && !perm.canDelete) {
        socket.emit('error', { message: 'You do not have permission to delete this node' });
        return false;
      }
      
      if (action === 'lock' && !perm.canLock) {
        socket.emit('error', { message: 'You do not have permission to lock this node' });
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Permission validation error:', error);
    socket.emit('error', { message: 'Permission validation failed' });
    return false;
  }
}

export function canAccessNode(userRole: UserRole, nodeACL: any): boolean {
  if (!nodeACL.allowedRoles || nodeACL.allowedRoles.length === 0) {
    return true;
  }
  
  return nodeACL.allowedRoles.includes(userRole);
}
