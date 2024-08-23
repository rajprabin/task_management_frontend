import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  // const response = await axios.get("/api/tasks");
  const response = {
    data: [
      {
        id: 1,
        title: "Task 1",
        status: "completed",
        description: "This is a description of Task 1",
        dueDate: "2024-08-23",
      },
      {
        id: 2,
        title: "Task 2",
        status: "pending",
        description: "This is a description of Task 2",
        dueDate: "2021-12-31",
      },
      {
        id: 3,
        title: "Task 3",
        status: "in_progress",
        description: "This is a description of Task 3",
        dueDate: "2024-08-25",
      },
    ],
  };
  return response.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await axios.post("/api/tasks", task);
  return response.data;
});

export const fetchTaskDetails = createAsyncThunk(
  "tasks/fetchTaskDetails",
  async (id) => {
    const response = await axios.get(`/api/tasks/${id}`);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`/api/tasks/${id}`);
  return id;
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    searchTasks: (state, action) => {
      state.items = state.items.filter((task) =>
        task.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchTaskDetails.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
