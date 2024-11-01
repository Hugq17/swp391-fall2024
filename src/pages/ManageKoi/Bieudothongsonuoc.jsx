import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./ManageFish";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const KoiInfo = () => {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPonds = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found! Please login first.");
        return;
      }

      try {
        const response = await axios.get(
          "https://koi-care-server.azurewebsites.net/api/ponds",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPonds(response.data.ponds);
      } catch (error) {
        console.error("Error fetching ponds:", error);
        alert("Error fetching ponds. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPonds();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pond-container">
      {ponds.map((pond) => (
        <div className="pond-card" key={pond.id}>
          <h2 className="pond-name">{pond.name}</h2>
          <h3>Thông số nước cho {pond.name}</h3>
          <div className="charts-container">
            <CombinedParameterChart pond={pond} />
          </div>
        </div>
      ))}
    </div>
  );
};

const CombinedParameterChart = ({ pond }) => {
  const labels = pond.waterParameters.map((param) =>
    new Date(param.measuredAt).toLocaleString()
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Nhiệt độ (°C)",
        data: pond.waterParameters.map((param) => param.temperature),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Độ mặn (ppt)",
        data: pond.waterParameters.map((param) => param.salinity),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      {
        label: "pH",
        data: pond.waterParameters.map((param) => param.ph),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        fill: true,
      },
      {
        label: "Oxy (mg/L)",
        data: pond.waterParameters.map((param) => param.oxygen),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "nO2 (mg/L)",
        data: pond.waterParameters.map((param) => param.nO2),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
      {
        label: "nO3 (mg/L)",
        data: pond.waterParameters.map((param) => param.nO3),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
      },
      {
        label: "pO4 (mg/L)",
        data: pond.waterParameters.map((param) => param.pO4),
        borderColor: "rgba(201, 203, 207, 1)",
        backgroundColor: "rgba(201, 203, 207, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Biểu đồ thông số hồ ${pond.name}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="chart-item">
      <Line data={chartData} options={options} height={500} width={800} />
    </div>
  );
};

export default KoiInfo;
