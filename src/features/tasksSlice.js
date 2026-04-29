import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: "t1",
      title: "Design UI",
      assignTo: "Amna",
      status: "done",
      projectId: "1",
      description: "Using React + Tailwind",
    },
    {
      id: "t2",
      title: "Setup Redux",
      assignTo: "Ali",
      status: "in-progress",
      projectId: "1",
      description: "Redux Toolkit setup",
    },
    {
      id: "t3",
      title: "Socket setup",
      assignTo: "Sara",
      status: "todo",
      projectId: "2",
      description: "Realtime chat sockets",
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    
    moveTask: (state, action) => {
      const { id, status } = action.payload;

      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = status;
      }
    },

    
    addTask: (state, action) => {
      state.tasks.push({
        id: nanoid(),
        title: action.payload.title,
        assignTo: action.payload.assignTo,
        description: action.payload.description,
        status: action.payload.status || "todo",
        projectId: action.payload.projectId,
      });
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },
  },
});

export const { moveTask, addTask, deleteTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;