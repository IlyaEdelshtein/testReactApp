import { configureStore, createSlice } from '@reduxjs/toolkit';
import todoReducer from './features/todoSlice';
import authReducer from './features/authSlice';

// Example slice showing the typical setup
const exampleSlice = createSlice({
  name: 'example',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1;
    },
  },
});

export const { increment } = exampleSlice.actions;

export const store = configureStore({
  reducer: {
    example: exampleSlice.reducer,
    todo: todoReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

