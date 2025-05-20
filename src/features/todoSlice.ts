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

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
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

export const { setTasks, addTask, removeTask, updateTask } = todoSlice.actions;
export default todoSlice.reducer;
