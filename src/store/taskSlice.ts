import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Task interface
interface Task {
  id: number;
  task: string;
  severity: string;
  done: boolean;
}

// Initial tasks data (loaded from tasks.json)
import tasksData from '../data/tasks.json'; // Update the import path

// Define the initial state with the loaded tasks data
const initialState: Task[] = tasksData;

// Create a task slice
const taskSlice = createSlice({
  name: 'tasks', // Name of the slice
  initialState, // Initial state
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.findIndex((task) => task.id === action.payload.id);
      if (taskIndex !== -1) {
        state[taskIndex] = action.payload;
      }
    },
  },
});

// Export the action creators and reducer
export const { addTask, removeTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
