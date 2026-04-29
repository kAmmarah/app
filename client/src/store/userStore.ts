import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string;
  experience: string;
  education: string;
}

interface UserState {
  currentUser: User | null;
  users: User[];
  profiles: Profile[];
  setCurrentUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  addProfile: (profile: Profile) => void;
  deleteProfile: (id: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      users: [
        { id: '1', name: 'Admin', email: 'admin@taskorbit.com', color: '#051C45', role: 'lead', status: 'Active' }
      ],
      profiles: [
        { id: '1', name: 'Ali Raza', email: 'ali.raza@example.com', phone: '+92 300 1234567', skills: 'Python, Flask, AI, APIs', experience: '2 years Software Developer', education: 'BS Computer Science' },
        { id: '2', name: 'Sara Khan', email: 'sara.khan@example.com', phone: '+92 321 7654321', skills: 'Marketing, Sales, Communication', experience: '3 years Sales Executive', education: 'MBA Marketing' },
        { id: '3', name: 'Usman Ahmed', email: 'usman.ahmed@example.com', phone: '+92 333 9988776', skills: 'Embedded Systems, C++, IoT', experience: '4 years Embedded Developer', education: 'BS Electrical Engineering' }
      ],
      setCurrentUser: (user) => set({ currentUser: user }),
      setUsers: (users) => set({ users }),
      addUser: (user: User) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (userId, updates) => set((state) => ({
        users: state.users.map(u => u.id === userId ? { ...u, ...updates } : u)
      })),
      addProfile: (profile: Profile) => set((state) => ({ profiles: [profile, ...state.profiles] })),
      deleteProfile: (id: string) => set((state) => ({ profiles: state.profiles.filter(p => p.id !== id) })),
    }),
    {
      name: 'user-storage',
    }
  )
);
