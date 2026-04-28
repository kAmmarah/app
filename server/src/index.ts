import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupWebSocket } from './websocket/connectionManager';

dotenv.config();

const app = express();
const server = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ligma';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

setupWebSocket(io);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Export summary endpoint
app.get('/api/canvas/:canvasId/export', async (req, res) => {
  try {
    const CanvasNode = mongoose.model('CanvasNode');
    const nodes = await CanvasNode.find({ canvasId: req.params.canvasId });
    
    const summary = {
      decisions: nodes.filter((n: any) => n.intent === 'decision'),
      actionItems: nodes.filter((n: any) => n.intent === 'action_item'),
      questions: nodes.filter((n: any) => n.intent === 'question'),
      references: nodes.filter((n: any) => n.intent === 'reference')
    };
    
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export canvas' });
  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
