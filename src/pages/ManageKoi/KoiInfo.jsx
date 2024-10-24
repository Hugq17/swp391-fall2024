import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2"; // Sử dụng biểu đồ đường để thể hiện sự thay đổi qua thời gian
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
import "./KoiTank.css"; // Import CSS for styling

// Register necessary Chart.js components
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

  // Fetch all ponds data from the API
  useEffect(() => {
    const fetchPonds = async () => {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        alert("No token found! Please login first.");
        return;
      }

      try {
        const response = await axios.get(
          "https://koi-care-server.azurewebsites.net/api/ponds",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );
        setPonds(response.data.ponds); // Assume the response contains a ponds array
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
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="pond-container">
      {ponds.map((pond) => (
        <div className="pond-card" key={pond.id}>
          <h2 className="pond-name">{pond.name}</h2>

          {/* Render detailed charts for each parameter */}
          <h3>Thông số nước cho {pond.name}</h3>
          <div className="charts-container">
            {/* Prepare data for each parameter */}
            <ParameterChart parameter="temperature" pond={pond} />
            <ParameterChart parameter="salinity" pond={pond} />
            <ParameterChart parameter="ph" pond={pond} />
            <ParameterChart parameter="oxygen" pond={pond} />
            <ParameterChart parameter="nO2" pond={pond} />
            <ParameterChart parameter="nO3" pond={pond} />
            <ParameterChart parameter="pO4" pond={pond} />
          </div>
        </div>
      ))}
    </div>
  );
};

// Component to render chart for each parameter
const ParameterChart = ({ parameter, pond }) => {
  const dataPoints = pond.waterParameters.map((param) => ({
    x: new Date(param.measuredAt).toLocaleString(), // Convert to local string for readability
    y: param[parameter], // Access the correct parameter value
  }));

  const chartData = {
    datasets: [
      {
        label:
          parameter === "temperature"
            ? "Nhiệt độ (°C)"
            : parameter === "salinity"
            ? "Độ mặn (ppt)"
            : parameter === "ph"
            ? "pH"
            : parameter === "oxygen"
            ? "Oxy (mg/L)"
            : parameter === "nO2"
            ? "nO2 (mg/L)"
            : parameter === "nO3"
            ? "nO3 (mg/L)"
            : "pO4 (mg/L)",
        data: dataPoints,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Giữ tỷ lệ không cố định
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${parameter.charAt(0).toUpperCase() + parameter.slice(1)} Chart`,
      },
    },
  };

  return (
    <div className="chart-item">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default KoiInfo;
