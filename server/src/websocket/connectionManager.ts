import { Server, Socket } from 'socket.io';
import CanvasNode from '../models/CanvasNode';
import CanvasEvent from '../models/EventLog';
import { validateNodePermission, UserContext } from '../middleware/rbac';
import { classifyIntent, IntentResult } from '../ai/intentClassifier';
import { v4 as uuidv4 } from 'uuid';

interface ClientState {
  lastEventVersion: number;
  userId: string;
  userName: string;
  color: string;
  role: string;
  canvasId: string;
}

const clientStates = new Map<string, ClientState>();

export function setupWebSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);
    
    // Handle user joining canvas
    socket.on('join_canvas', async (data: { userId: string; userName: string; color: string; role: string; canvasId: string }) => {
      const { userId, userName, color, role, canvasId } = data;
      
      socket.data.userContext = { userId, role, canvasId } as UserContext;
      socket.join(canvasId);
      
      clientStates.set(socket.id, {
        lastEventVersion: 0,
        userId,
        userName,
        color,
        role,
        canvasId
      });
      
      // Load existing nodes for canvas
      const nodes = await CanvasNode.find({ canvasId });
      socket.emit('canvas_state', { nodes });
      
      // Broadcast presence
      io.to(canvasId).emit('user_joined', { userId, userName, color, role });
      broadcastPresence(io, canvasId);
    });
    
    // Handle node creation
    socket.on('node_create', async (data: any) => {
      const userContext = socket.data.userContext as UserContext;
      if (!userContext) return;
      
      const nodeId = uuidv4();
      const nodeData = {
        ...data,
        id: nodeId,
        canvasId: userContext.canvasId,
        author: userContext.userId
      };
      
      try {
        const node = await CanvasNode.create(nodeData);
        
        // Classify intent
        const intentResult = classifyIntent(node.content);
        if (intentResult.confidence > 0.5) {
          node.intent = intentResult.type;
          node.intentData = intentResult.extractedData;
          await node.save();
        }
        
        // Create event log
        const eventVersion = await getNextEventVersion(userContext.canvasId);
        await CanvasEvent.create({
          id: uuidv4(),
          canvasId: userContext.canvasId,
          version: eventVersion,
          eventType: 'node_create',
          nodeId,
          delta: nodeData,
          userId: userContext.userId
        });
        
        // Broadcast to other clients
        socket.to(userContext.canvasId).emit('node_created', { node, intent: intentResult });
        
        // Update client state
        const clientState = clientStates.get(socket.id);
        if (clientState) {
          clientState.lastEventVersion = eventVersion;
        }
      } catch (error) {
        socket.emit('error', { message: 'Failed to create node' });
      }
    });
    
    // Handle node update
    socket.on('node_update', async (data: { nodeId: string; updates: any }) => {
      const userContext = socket.data.userContext as UserContext;
      if (!userContext) return;
      
      // Validate permissions
      const hasPermission = await validateNodePermission(socket, data.nodeId, 'edit');
      if (!hasPermission) return;
      
      try {
        const node = await CanvasNode.findOneAndUpdate(
          { id: data.nodeId },
          { ...data.updates, updatedAt: new Date() },
          { new: true }
        );
        
        if (!node) return;
        
        // Re-classify intent if content changed
        let intentResult: IntentResult = { type: node.intent || 'reference', confidence: 0 };
        if (data.updates.content) {
          intentResult = classifyIntent(node.content);
          if (intentResult.confidence > 0.5) {
            node.intent = intentResult.type;
            node.intentData = intentResult.extractedData;
            await node.save();
          }
        }
        
        // Create event log
        const eventVersion = await getNextEventVersion(userContext.canvasId);
        await CanvasEvent.create({
          id: uuidv4(),
          canvasId: userContext.canvasId,
          version: eventVersion,
          eventType: 'node_update',
          nodeId: data.nodeId,
          delta: data.updates,
          userId: userContext.userId
        });
        
        // Broadcast to other clients
        socket.to(userContext.canvasId).emit('node_updated', { 
          nodeId: data.nodeId, 
          updates: data.updates,
          intent: intentResult
        });
        
        const clientState = clientStates.get(socket.id);
        if (clientState) {
          clientState.lastEventVersion = eventVersion;
        }
      } catch (error) {
        socket.emit('error', { message: 'Failed to update node' });
      }
    });
    
    // Handle node lock/unlock
    socket.on('node_lock', async (data: { nodeId: string; locked: boolean }) => {
      const userContext = socket.data.userContext as UserContext;
      if (!userContext) return;
      
      const hasPermission = await validateNodePermission(socket, data.nodeId, 'lock');
      if (!hasPermission) return;
      
      try {
        await CanvasNode.findOneAndUpdate(
          { id: data.nodeId },
          { 'acl.locked': data.locked }
        );
        
        const eventVersion = await getNextEventVersion(userContext.canvasId);
        await CanvasEvent.create({
          id: uuidv4(),
          canvasId: userContext.canvasId,
          version: eventVersion,
          eventType: data.locked ? 'node_lock' : 'node_unlock',
          nodeId: data.nodeId,
          delta: { locked: data.locked },
          userId: userContext.userId
        });
        
        socket.to(userContext.canvasId).emit('node_locked', { 
          nodeId: data.nodeId, 
          locked: data.locked 
        });
      } catch (error) {
        socket.emit('error', { message: 'Failed to lock node' });
      }
    });
    
    // Handle cursor movement
    socket.on('cursor_move', (data: { x: number; y: number }) => {
      const clientState = clientStates.get(socket.id);
      if (!clientState) return;
      
      socket.to(clientState.canvasId).emit('cursor_update', {
        userId: clientState.userId,
        userName: clientState.userName,
        color: clientState.color,
        x: data.x,
        y: data.y
      });
    });
    
    // Handle reconnection with event replay
    socket.on('request_replay', async (data: { canvasId: string; lastVersion: number }) => {
      try {
        const missedEvents = await CanvasEvent.find({
          canvasId: data.canvasId,
          version: { $gt: data.lastVersion }
        }).sort({ version: 1 });
        
        socket.emit('replay_events', { events: missedEvents });
        
        const clientState = clientStates.get(socket.id);
        if (clientState && missedEvents.length > 0) {
          clientState.lastEventVersion = missedEvents[missedEvents.length - 1].version;
        }
      } catch (error) {
        socket.emit('error', { message: 'Failed to replay events' });
      }
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      const clientState = clientStates.get(socket.id);
      if (clientState) {
        io.to(clientState.canvasId).emit('user_left', { userId: clientState.userId });
        broadcastPresence(io, clientState.canvasId);
        clientStates.delete(socket.id);
      }
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

async function getNextEventVersion(canvasId: string): Promise<number> {
  const lastEvent = await CanvasEvent.findOne({ canvasId })
    .sort({ version: -1 })
    .limit(1);
  
  return lastEvent ? lastEvent.version + 1 : 1;
}

function broadcastPresence(io: Server, canvasId: string) {
  const users = Array.from(clientStates.values())
    .filter(state => state.canvasId === canvasId)
    .map(state => ({
      userId: state.userId,
      userName: state.userName,
      color: state.color,
      role: state.role
    }));
  
  io.to(canvasId).emit('presence_update', { users });
}
