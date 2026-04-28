import mongoose, { Schema } from 'mongoose';
import { CanvasEvent } from '../types';

export interface ICanvasEvent extends Omit<CanvasEvent, 'timestamp'> {
  timestamp: Date;
}

const CanvasEventSchema = new Schema<ICanvasEvent>({
  id: { type: String, required: true, unique: true },
  canvasId: { type: String, required: true, index: true },
  version: { type: Number, required: true, index: true },
  eventType: { 
    type: String, 
    enum: ['node_create', 'node_update', 'node_delete', 'node_lock', 'node_unlock'],
    required: true 
  },
  nodeId: { type: String, required: true, index: true },
  delta: { type: Schema.Types.Mixed, required: true },
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, {
  timestamps: false // Disable automatic timestamps to maintain immutability
});

// Compound index for efficient event replay
CanvasEventSchema.index({ canvasId: 1, version: 1 });

// Prevent updates and deletes (append-only enforcement at schema level)
CanvasEventSchema.pre('findOneAndUpdate', function(next: any) {
  next(new Error('Event log is append-only. Updates are not allowed.'));
});

CanvasEventSchema.pre('deleteOne', function(next: any) {
  next(new Error('Event log is append-only. Deletions are not allowed.'));
});

CanvasEventSchema.pre('deleteMany', function(next: any) {
  next(new Error('Event log is append-only. Deletions are not allowed.'));
});

export default mongoose.model<ICanvasEvent>('CanvasEvent', CanvasEventSchema);
