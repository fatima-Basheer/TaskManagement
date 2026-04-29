import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DashBoard from "./pages/DashBoard.jsx";
import Projects from "./pages/Projects.jsx";
import TaskBoard from "./pages/TaskBoard.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import "./App.css";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store.js";

import Navbar from "./components/ui/Navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },
      {
        path: "task-board",
        element: <TaskBoard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
