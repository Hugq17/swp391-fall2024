import React, { useEffect, useState } from "react";
import axios from "axios";
import "./KoiTank.css"; // Import CSS for styling

const PondParameters = () => {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModals, setShowModals] = useState({}); // To manage which modals are open

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

  // Handle input changes for the water parameters
  const handleWaterParameterChange = (pondId, e) => {
    const { name, value } = e.target;
    setPonds((prevPonds) =>
      prevPonds.map((pond) =>
        pond.id === pondId
          ? {
              ...pond,
              waterParameter: {
                ...pond.waterParameter,
                [name]: value,
              },
            }
          : pond
      )
    );
  };

  // Save pond data to the API
  const handleSavePond = async (pondId) => {
    const pondToSave = ponds.find((pond) => pond.id === pondId);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found! Please login first.");
      return;
    }

    try {
      const response = await axios.post(
        "https://koi-care-server.azurewebsites.net/api/ponds/save",
        {
          ...pondToSave,
          waterParameter: { ...pondToSave.waterParameter }, // Send only the water parameters entered by the user
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );
      if (response.status === 200) {
        alert("Pond data saved successfully!");
        setShowModals((prev) => ({ ...prev, [pondId]: false })); // Close the modal
      }
    } catch (error) {
      console.error("Error saving pond data:", error);
      alert("An error occurred while saving pond data.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="pond-container">
      {ponds.map((pond) => (
        <div className="pond-card" key={pond.id}>
          <h2 className="pond-name">{pond.name}</h2>
          <img
            src={pond.imageUrl}
            alt={`Image of ${pond.name}`}
            className="pond-image"
          />
          <div className="pond-details">
            <p className="pond-dimension">
              <strong>Chiều dài:</strong> {pond.length} m
            </p>
            <p className="pond-dimension">
              <strong>Chiều rộng:</strong> {pond.width} m
            </p>
            <p className="pond-dimension">
              <strong>Độ sâu:</strong> {pond.depth} m
            </p>
            <p className="pond-dimension">
              <strong>Thể tích:</strong> {pond.volume} L
            </p>
            <p className="pond-dimension">
              <strong>Số lượng cống thoát:</strong> {pond.drainageCount}
            </p>
            <p className="pond-dimension">
              <strong>Công suất máy bơm:</strong> {pond.pumpCapacity} L/h
            </p>
          </div>

          <button
            onClick={() =>
              setShowModals((prev) => ({ ...prev, [pond.id]: true }))
            }
          >
            Nhập Thông Số Nước
          </button>

          {showModals[pond.id] && (
            <div className="modal">
              <h2>Nhập Thông Số Nước cho {pond.name}</h2>
              <input
                type="number"
                name="temperature"
                value={pond.waterParameter?.temperature || ""}
                onChange={(e) => handleWaterParameterChange(pond.id, e)}
                placeholder="Nhiệt độ"
              />
              <input
                type="number"
                name="salinity"
                value={pond.waterParameter?.salinity || ""}
                onChange={(e) => handleWaterParameterChange(pond.id, e)}
                placeholder="Độ mặn"
              />
              <input
                type="number"
                name="ph"
                value={pond.waterParameter?.ph || ""}
                onChange={(e) => handleWaterParameterChange(pond.id, e)}
                placeholder="pH"
              />
              <input
                type="number"
                name="oxygen"
                value={pond.waterParameter?.oxygen || ""}
                onChange={(e) => handleWaterParameterChange(pond.id, e)}
                placeholder="Oxy"
              />
              <input
                type="number"
                name="nO2"
                value={pond.waterParameter?.nO2 || ""}
                onChange={(e) => handleWaterParameterChange(pond.id, e)}
                placeholder="nO2"
              />
              <input
                type="number"
                name="nO3"
                value={pond.waterParameter?.nO3 || ""}
                onChange={(e) => handleWaterParameterChange(pond.id, e)}
                placeholder="nO3"
              />
              <input
                type="number"
                name="pO4"
                value={pond.waterParameter?.pO4 || ""}
                onChange={(e) => handleWaterParameterChange(pond.id, e)}
                placeholder="pO4"
              />

              <button onClick={() => handleSavePond(pond.id)}>
                Lưu Thông Số
              </button>
              <button
                onClick={() =>
                  setShowModals((prev) => ({ ...prev, [pond.id]: false }))
                }
              >
                Đóng
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PondParameters;
