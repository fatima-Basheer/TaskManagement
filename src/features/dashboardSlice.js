import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalTasks: 0,
  completedTasks: 0,
  activeProjects: 0,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    calculateStats: (state, action) => {
      const { tasks, projects } = action.payload;

      state.totalTasks = tasks.length;
      state.completedTasks = tasks.filter(
        (t) => t.status === "done"
      ).length;

      state.activeProjects = projects.length;
    },
  },
});

export const { calculateStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;