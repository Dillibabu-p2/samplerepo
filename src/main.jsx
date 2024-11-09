import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const taskLoader = async () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const archivedTasks = JSON.parse(localStorage.getItem("archivedTasks")) || [];
  return { tasks: storedTasks, archivedTasks: archivedTasks };
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: taskLoader,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        loader: taskLoader,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
