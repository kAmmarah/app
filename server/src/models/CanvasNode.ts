import mongoose, { Schema, Document } from 'mongoose';
import { CanvasNode, NodeACL, IntentType, IntentExtractedData } from '../types';

export interface ICanvasNode extends Omit<Document, 'id'>, Omit<CanvasNode, 'acl' | 'intent' | 'intentData'> {
  canvasId: string;
  acl: NodeACL;
  intent?: IntentType;
  intentData?: IntentExtractedData;
}

const NodeACLSchema = new Schema<NodeACL>({
  locked: { type: Boolean, default: false },
  allowedRoles: [{ type: String, enum: ['lead', 'contributor', 'viewer'] }],
  permissions: { type: Map, of: new Schema({
    role: { type: String, enum: ['lead', 'contributor', 'viewer'] },
    canEdit: Boolean,
    canDelete: Boolean,
    canLock: Boolean
  })}
});

const CanvasNodeSchema = new Schema<ICanvasNode>({
  id: { type: String, required: true, unique: true },
  canvasId: { type: String, required: true, index: true },
  type: { type: String, enum: ['sticky', 'text', 'shape', 'drawing'], required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  content: { type: String, default: '' },
  author: { type: String, required: true },
  acl: { type: NodeACLSchema, default: () => ({ locked: false, allowedRoles: ['lead', 'contributor', 'viewer'] }) },
  intent: { type: String, enum: ['action_item', 'decision', 'question', 'reference'] },
  intentData: {
    assignee: String,
    deadline: String,
    priority: { type: String, enum: ['high', 'medium', 'low'] }
  }
}, {
  timestamps: true
});

CanvasNodeSchema.index({ canvasId: 1, intent: 1 });

export default mongoose.model<ICanvasNode>('CanvasNode', CanvasNodeSchema);
