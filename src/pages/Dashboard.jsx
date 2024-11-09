import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./Dashboard.css";
import { useLoaderData } from "react-router-dom";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const loadedData = useLoaderData();
  const data = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        labels: "Task Priority Distribution",
        data: [
          loadedData.tasks.filter((task) => task.priority == "high").length,
          loadedData.tasks.filter((task) => task.priority == "medium").length,
          loadedData.tasks.filter((task) => task.priority == "low").length,
        ],
        backgroundColor: ["#f9844a", "#f39c12", "#e74c3c"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Task Priority Distribution",
      },
    },
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Bar data={data} options={options}></Bar>
    </div>
  );
};

export default Dashboard;
