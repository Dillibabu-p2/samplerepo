import React, { useState, useEffect } from "react";

import "./Home.css";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import ArchivedTasks from "../components/ArchivedTasks";
import { useLoaderData } from "react-router-dom";

function Home() {
  const { tasks: initialTasks, archivedTasks: initialarchivedTasks } =
    useLoaderData();

  const [tasks, setTasks] = useState(initialTasks);
  const [archivedTasks, setArchivedTasks] = useState(initialarchivedTasks);

  const [filter, setFilter] = useState({
    completed: "all",
    priority: "all",
    deadline: null,
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));
  }, [archivedTasks]);

  const addTask = (task) => setTasks([...tasks, task]);
  const removeTask = (id) => setTasks(tasks.filter((task) => task.id !== id));
  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const archiveTask = (id) => {
    const taskToArchive = tasks.find((task) => task.id == id);
    setArchivedTasks([...archivedTasks, taskToArchive]);
    removeTask(id);
  };

  const filteredTasks = tasks.filter((task) => {
    const byCompletion =
      filter.completed === "all" ||
      task.completed === (filter.completed === "true");

    const byPriority =
      filter.priority === "all" || task.priority === filter.priority;

    const byDeadline =
      !filter.deadline || new Date(task.deadline) <= new Date(filter.deadline);

    return byCompletion && byPriority && byDeadline;
  });
  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask}></TaskForm>
      <div className="filters">
        <label>
          Completion:
          <select
            onChange={(e) =>
              setFilter({ ...filter, completed: e.target.value })
            }
          >
            <option value="all">All</option>
            <option value="True">Completed</option>
            <option value="False">Incomplete</option>
          </select>
        </label>

        <label>
          Priority:
          <select
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label
          onChange={(e) => setFilter({ ...filter, deadline: e.target.value })}
        >
          Deadline:
          <input type="date" />
        </label>
      </div>
      <TaskList
        archiveTask={archiveTask}
        removeTask={removeTask}
        updateTask={updateTask}
        tasks={filteredTasks}
      ></TaskList>
      <ArchivedTasks archivedTasks={archivedTasks}></ArchivedTasks>
    </div>
  );
}

export default Home;
