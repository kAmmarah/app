# LIGMA - Let's Integrate Groups, Manage Anything
## Virtual Collaboration Workspace

**Created by: Ammara Dawood**

A real-time collaborative workspace that bridges ideation and execution. Teams brainstorm on a shared infinite canvas; the platform automatically extracts intent from canvas content and populates a live task board.

---

## Features

### Core Features
- **Infinite Canvas**: Collaborative whiteboard with sticky notes, text blocks, shapes, and freehand drawing
- **Real-Time Collaboration**: Multiple users can edit simultaneously with live cursor presence
- **AI Intent Classification**: Automatic extraction of action items, decisions, questions, and references
- **Task Board**: Auto-populated from canvas action items with no data duplication
- **Node-Level RBAC**: Per-node access control (Lead, Contributor, Viewer roles)
- **Append-Only Event Log**: Immutable audit trail of all canvas mutations
- **CRDT Conflict Resolution**: Proper merge logic for simultaneous edits (no "last write wins")
- **WebSocket Management**: Efficient delta broadcasting with graceful reconnection and event replay

### Bonus Features
- **AI Summary Export**: One-click export of structured brief (decisions, tasks, questions)
- **Presence Indicators**: Real-time user presence with colored cursors

---

## Tech Stack

### Frontend
- **Vite + React + TypeScript**: Modern, fast development experience
- **Konva + React-Konva**: Canvas rendering engine
- **Socket.io-client**: Real-time WebSocket communication
- **Zustand**: Lightweight state management
- **TailwindCSS**: Utility-first styling

### Backend
- **Node.js + Express**: RESTful API server
- **Socket.io**: WebSocket server for real-time sync
- **Mongoose**: MongoDB ODM
- **Rule-Based NLP**: Custom intent classification engine (no paid APIs)

### Database
- **MongoDB Atlas**: Cloud-hosted database (free tier)

### Deployment
- **Render**: Cloud platform for hosting (free tier)

---

## Project Structure

```
ligma/
├── client/                  # Frontend (Vite + React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Canvas/
│   │   │   │   └── InfiniteCanvas.tsx
│   │   │   ├── TaskBoard/
│   │   │   │   └── TaskBoard.tsx
│   │   │   ├── EventLog/
│   │   │   │   └── EventLogPanel.tsx
│   │   │   └── Header/
│   │   │       └── Header.tsx
│   │   ├── store/
│   │   │   ├── canvasStore.ts
│   │   │   ├── taskStore.ts
│   │   │   ├── userStore.ts
│   │   │   └── eventStore.ts
│   │   ├── hooks/
│   │   │   └── useWebSocket.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── public/
│       └── taskorbit_logo_1777394787859.png
│
├── server/                  # Backend (Node.js + Express)
│   ├── src/
│   │   ├── websocket/
│   │   │   └── connectionManager.ts
│   │   ├── models/
│   │   │   ├── CanvasNode.ts
│   │   │   └── EventLog.ts
│   │   ├── middleware/
│   │   │   └── rbac.ts
│   │   ├── ai/
│   │   │   └── intentClassifier.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   └── .env
│
├── shared/                  # Shared types
│   └── types/
│       └── index.ts
│
├── render.yaml              # Render deployment config
└── package.json             # Root workspace config
```

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   cd /Users/ammarah/Desktop/app
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**
   
   Edit `server/.env`:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_atlas_connection_string
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```
   
   Edit `client/.env`:
   ```env
   VITE_SERVER_URL=http://localhost:4000
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```
   
   This starts:
   - Backend server on `http://localhost:4000`
   - Frontend dev server on `http://localhost:3000`

5. **Open in browser**
   ```bash
   open http://localhost:3000
   ```

---

## Usage

### Joining a Workspace
1. Enter your name
2. Select your role (Lead, Contributor, or Viewer)
3. Click "Join Workspace"

### Canvas Tools
- **Sticky Note**: Click canvas to create a sticky note
- **Text Block**: Click canvas to create a text block
- **Pan**: Hold space + drag
- **Zoom**: Mouse wheel

### Real-Time Collaboration
- Open multiple browser tabs to simulate multiple users
- Each user gets a unique colored cursor
- All changes sync in real-time via WebSocket

### Task Board
- Action items automatically appear in the Task Board
- Click a task to navigate to its canvas node
- Tasks show author, priority, and deadline (if extracted)

### Node Permissions
- **Leads**: Can edit, delete, and lock any node
- **Contributors**: Can edit unlocked nodes
- **Viewers**: Read-only access

### Event Log
- Toggle Event Log panel to view all canvas mutations
- Events are immutable and append-only
- Each event shows type, user, timestamp, and version

### Export Summary
- Click "Export Summary" in the header
- Generates structured brief with:
  - Decisions made
  - Action items
  - Open questions
  - References

---

## Technical Challenges Implemented

### 1. CRDT Conflict Resolution
- Using Yjs for automatic conflict resolution
- Proper merge logic for simultaneous edits
- No "last write wins" - converges to consistent state

### 2. Node-Level RBAC
- Per-node ACL enforcement
- Server-side validation on all mutations
- Client-side UI affordances for permissions

### 3. Intent-Aware Task Extraction
- Rule-based NLP engine (no paid APIs)
- Classifies: action items, decisions, questions, references
- Extracts metadata: assignee, deadline, priority

### 4. Append-Only Event Log
- Immutable event storage in MongoDB
- Schema-level prevention of updates/deletes
- Versioned events for efficient replay

### 5. Real-Time WebSocket Management
- Delta broadcasting (not full state)
- Event versioning for reconnection recovery
- Graceful reconnection with missed event replay

### 6. Deployment on Render
- Render deployment configuration included
- Free tier compatible
- Health check endpoint included

---

## Testing

### Manual Testing

1. **Conflict Resolution**
   - Open 2 tabs
   - Edit same node simultaneously
   - Verify both edits merge correctly

2. **RBAC Enforcement**
   - Create a node as Lead
   - Lock the node
   - Try to edit as Contributor (should fail)
   - Send raw WebSocket message to edit locked node (server should reject)

3. **Reconnection**
   - Kill server
   - Make changes offline
   - Restart server
   - Verify client reconnects and replays missed events

4. **Intent Classification**
   - Write "Need to fix login bug by Friday" → Should classify as action item
   - Write "We decided to use React" → Should classify as decision
   - Write "How should we handle auth?" → Should classify as question

5. **Event Log Immutability**
   - Check MongoDB - events collection should only have inserts
   - No updates or deletes allowed

---

## Deployment to Render

### Backend Deployment

1. Push code to GitHub
2. Go to Render Dashboard
3. Create new Web Service
4. Connect your repository
5. Configure:
   - **Build Command**: `cd server && npm install && npm run build`
   - **Start Command**: `cd server && npm start`
   - **Environment Variables**:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `NODE_ENV`: production
     - `PORT`: 10000

### Frontend Deployment

1. Create new Static Site on Render
2. Configure:
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/dist`
   - **Environment Variables**:
     - `VITE_SERVER_URL`: Your backend URL

---

## API Endpoints

### REST API
- `GET /api/health` - Health check
- `GET /api/canvas/:canvasId/export` - Export canvas summary

### WebSocket Events

**Client → Server:**
- `join_canvas` - Join a canvas room
- `node_create` - Create a new node
- `node_update` - Update an existing node
- `node_lock` - Lock/unlock a node
- `cursor_move` - Broadcast cursor position
- `request_replay` - Request missed events after reconnection

**Server → Client:**
- `canvas_state` - Initial canvas state
- `node_created` - New node created
- `node_updated` - Node updated
- `node_locked` - Node lock status changed
- `cursor_update` - Another user's cursor moved
- `presence_update` - User presence changed
- `replay_events` - Missed events for reconnection
- `error` - Error message

---

## Database Schema

### CanvasNode Collection
```typescript
{
  _id: ObjectId,
  id: string (unique),
  canvasId: string,
  type: 'sticky' | 'text' | 'shape' | 'drawing',
  position: { x: number, y: number },
  content: string,
  author: string,
  acl: {
    locked: boolean,
    allowedRoles: string[]
  },
  intent: 'action_item' | 'decision' | 'question' | 'reference',
  intentData: {
    assignee: string,
    deadline: string,
    priority: 'high' | 'medium' | 'low'
  },
  createdAt: Date,
  updatedAt: Date
}
```

### CanvasEvent Collection (Append-Only)
```typescript
{
  _id: ObjectId,
  id: string (unique),
  canvasId: string,
  version: number,
  eventType: 'node_create' | 'node_update' | 'node_delete' | 'node_lock',
  nodeId: string,
  delta: object,
  userId: string,
  timestamp: Date
}
```

---

## Security Considerations

- All mutations validated server-side against node ACL
- WebSocket authentication via session
- Input sanitization on canvas content
- MongoDB injection prevention via Mongoose
- Append-only event log enforced at schema level

---

## Performance Optimizations

- Delta broadcasting (only send changes, not full state)
- Event versioning for efficient reconnection
- Debounced intent classification (1s delay)
- Cursor position throttling (50ms interval)
- Indexed MongoDB queries for fast event replay

---

## Troubleshooting

### Server won't start
- Check MongoDB connection string in `server/.env`
- Ensure port 4000 is not in use

### Frontend won't connect
- Verify `VITE_SERVER_URL` in `client/.env`
- Check browser console for WebSocket errors

### MongoDB connection failed
- Whitelist your IP in MongoDB Atlas
- Verify connection string format

---

## License

MIT License - Created by Ammara Dawood

---

## Credits

**Creator**: Ammara Dawood  
**Project**: LIGMA - Virtual Collaboration Workspace  
**Hackathon**: Web Development Hackathon

---

## Support

For issues or questions, please refer to the documentation or contact the development team.
