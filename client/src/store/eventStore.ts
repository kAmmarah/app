import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CanvasEvent } from '../types';

interface EventState {
  events: CanvasEvent[];
  setEvents: (events: CanvasEvent[]) => void;
  addEvent: (event: CanvasEvent) => void;
  lastEventVersion: number;
  setLastEventVersion: (version: number) => void;
}

export const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      events: [],
      setEvents: (events) => set({ events }),
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      lastEventVersion: 0,
      setLastEventVersion: (version) => set({ lastEventVersion: version }),
    }),
    {
      name: 'event-storage',
    }
  )
);
