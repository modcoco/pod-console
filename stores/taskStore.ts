// stores/taskStore.ts
import { create } from 'zustand';
import { Task } from '../app/(app)/pod/data/schema';

interface TaskState {
  task: Task | null;
  setTask: (task: Task) => void;
}

export const useTaskStore = create<TaskState>(set => ({
  task: null,
  setTask: (task) => set({ task }),
}));