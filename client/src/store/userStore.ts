import { create } from 'zustand';
import { User } from '../types';

interface UserState {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  users: [
    { id: '1', name: 'Admin', email: 'admin@taskorbit.com', color: '#051C45', role: 'lead', status: 'Active' }
  ],
  setCurrentUser: (user) => set({ currentUser: user }),
  setUsers: (users) => set({ users }),
  addUser: (user: User) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (userId, updates) => set((state) => ({
    users: state.users.map(u => u.id === userId ? { ...u, ...updates } : u)
  })),
}));
