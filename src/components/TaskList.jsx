import React from "react";

const TaskList = ({ tasks, updateTask, removeTask, archiveTask }) => {
  const handleEdit = (task, field, value) => {
    const updatedTask = { ...task, [field]: value };
    updateTask(updatedTask);
  };
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task ${task.completed ? "completed" : ""}`}
        >
          <input
            type="text"
            value={task.description}
            onChange={(e) => handleEdit(task, "description", e.target.value)}
          />
          <input
            type="date"
            value={task.deadline}
            onChange={(e) => handleEdit(task, "deadline", e.target.value)}
          />
          <select
            value={task.priority}
            onChange={(e) => handleEdit(task, "priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label>
            Completed:
            <input
              onChange={(e) => handleEdit(task, "completed", e.target.checked)}
              checked={task.completed}
              type="checkbox"
            />
          </label>
          <button onClick={() => removeTask(task.id)}>Delete</button>
          <button
            onClick={() => {
              archiveTask(task.id);
            }}
            id="archive-btn"
          >
            Archive
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
