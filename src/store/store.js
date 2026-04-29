import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasksSlice";
import projectReducer from "../features/projectsSlice";
import dashboardReducer from "../features/dashboardSlice";
const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    tasks: tasksReducer,   
    projects: projectReducer,
  },
});

export default store;