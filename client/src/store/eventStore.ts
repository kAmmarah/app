import { create } from 'zustand';
import { CanvasEvent } from '../types';

interface EventState {
  events: CanvasEvent[];
  setEvents: (events: CanvasEvent[]) => void;
  addEvent: (event: CanvasEvent) => void;
  lastEventVersion: number;
  setLastEventVersion: (version: number) => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  lastEventVersion: 0,
  setLastEventVersion: (version) => set({ lastEventVersion: version }),
}));
