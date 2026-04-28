# LIGMA - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies

```bash
cd /Users/ammarah/Desktop/app
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### Step 2: Configure MongoDB

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier M0)
3. Get your connection string
4. Edit `server/.env` and replace the MONGODB_URI:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ligma?retryWrites=true&w=majority
```

### Step 3: Run the Application

```bash
# Start both frontend and backend
npm run dev
```

Open your browser to: **http://localhost:3000**

---

## 📋 Testing the Application

### Test Real-Time Collaboration
1. Open http://localhost:3000 in Tab 1 - Login as "Alice" (Lead)
2. Open http://localhost:3000 in Tab 2 - Login as "Bob" (Contributor)
3. Create sticky notes in Tab 1
4. Watch them appear in real-time in Tab 2

### Test AI Intent Classification
Create a sticky note with this text:
```
Need to fix login bug by Friday, assign to John
```
This should automatically appear in the Task Board as an action item.

### Test Node Locking
1. As Alice (Lead), select a node
2. Lock the node
3. Switch to Bob's tab - the node should show a lock icon and be read-only

### Test Task Board
1. Create several action items on the canvas
2. Open the Task Board panel
3. All action items should appear organized by status

---

## 🎯 Key Features to Demo

1. **Infinite Canvas**: Pan and zoom, create sticky notes
2. **Real-time Sync**: Multiple tabs editing simultaneously
3. **AI Classification**: Action items auto-populate task board
4. **RBAC**: Different permissions for different roles
5. **Event Log**: All changes tracked immutably
6. **Export**: One-click summary generation

---

## 🛠️ Troubleshooting

### "Cannot connect to server"
- Ensure backend is running on port 4000
- Check `client/.env` has correct VITE_SERVER_URL

### "MongoDB connection failed"
- Verify connection string in `server/.env`
- Whitelist your IP in MongoDB Atlas dashboard

### Port already in use
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## 📦 Deployment to Render

### Backend
1. Push code to GitHub
2. Create Web Service on Render
3. Set environment variables:
   - MONGODB_URI
   - NODE_ENV=production
   - PORT=10000

### Frontend
1. Create Static Site on Render
2. Build command: `cd client && npm install && npm run build`
3. Publish directory: `client/dist`

---

## 🎓 Hackathon Demo Tips

1. **Start with the canvas** - Show sticky note creation
2. **Open 2 tabs** - Demonstrate real-time collaboration
3. **Show AI magic** - Write an action item, watch it appear in Task Board
4. **Demonstrate RBAC** - Lock a node, show it's protected
5. **Show event log** - Prove immutability
6. **Export summary** - One-click structured brief

---

**Created by Ammara Dawood**  
**LIGMA - Let's Integrate Groups, Manage Anything**
