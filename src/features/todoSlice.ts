import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  tasks: Task[];
}

const initialState: TodoState = {
  tasks: [],
};

let nextId = 1;

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      },
      prepare: (text: string) => ({
        payload: { id: nextId++, text, completed: false } as Task,
      }),
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask: (
      state,
      action: PayloadAction<Partial<Task> & { id: number }>
    ) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload);
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = todoSlice.actions;
export default todoSlice.reducer;
