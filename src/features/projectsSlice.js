import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  projects: [
    {
      id: "1",
      title: "Task Management App",
      description: "React project management",
      startDate: "2026-04-01",
      endDate: "2026-04-20",
      tasks: [
        { id: "t1", title: "Design UI", status: "done" },
        { id: "t2", title: "Setup Redux", status: "in-progress" },
      ],
    },
    {
      id: "2",
      title: "Chat App",
      description: "Realtime chat system",
      startDate: "2026-03-10",
      endDate: "2026-04-15",
      tasks: [{ id: "t3", title: "Socket setup", status: "todo" }],
    },
    {
      id: "3",
      title: "E-commerce",
      description: "Online shopping platform",
      startDate: "2026-02-01",
      endDate: "2026-05-01",
      tasks: [],
    },
    {
      id: "4",
      title: "Portfolio",
      description: "Personal portfolio website",
      startDate: "2026-01-01",
      endDate: "2026-01-20",
      tasks: [],
    },
    {
      id: "5",
      title: "Search Engine UI",
      description: "Frontend search UI clone",
      startDate: "2026-04-05",
      endDate: "2026-04-30",
      tasks: [],
    },
  ],

  selectedProjectId: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push({
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        tasks: [],
      });
    },

    deleteProject: (state, action) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);

      if (state.selectedProjectId === action.payload) {
        state.selectedProjectId = null;
      }
    },

    selectProject: (state, action) => {
      state.selectedProjectId = action.payload;
    },

    updateProject: (state, action) => {
      const { id, data } = action.payload;

      const project = state.projects.find((p) => p.id === id);

      if (project) {
        project.title = data.title;
        project.description = data.description;
        project.startDate = data.startDate;
        project.endDate = data.endDate;
      }
    },

    addTaskToProject: (state, action) => {
      const { projectId, task } = action.payload;

      const project = state.projects.find((p) => p.id === projectId);

      if (project) {
        project.tasks.push({
          id: nanoid(),
          title: task.title,
          status: "todo",
        });
      }
    },

    deleteTask: (state, action) => {
      const { projectId, taskId } = action.payload;

      const project = state.projects.find((p) => p.id === projectId);

      if (project) {
        project.tasks = project.tasks.filter((t) => t.id !== taskId);
      }
    },
  },
});

export const {
  addProject,
  deleteProject,
  selectProject,
  updateProject,
  addTaskToProject,
  deleteTask,
} = projectsSlice.actions;

export default projectsSlice.reducer;
