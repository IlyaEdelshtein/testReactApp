import { configureStore } from '@reduxjs/toolkit';

// Example slice showing the typical setup
import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

