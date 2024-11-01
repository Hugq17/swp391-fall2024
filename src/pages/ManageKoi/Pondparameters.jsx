import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Pondparameters.css"; // Đảm bảo rằng tệp CSS được cập nhật với các class name mới
const PondParameters = () => {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModals, setShowModals] = useState({}); // Quản lý trạng thái mở modal

  // Fetch all ponds data from the API
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
          waterParameter: { ...pondToSave.waterParameter },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Pond data saved successfully!");
        setShowModals((prev) => ({ ...prev, [pondId]: false }));
      }
    } catch (error) {
      console.error("Error saving pond data:", error);
      alert("An error occurred while saving pond data.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pond-list">
      {ponds.map((pond) => (
        <div className="pond-item" key={pond.id}>
          <div className="pond-details">
            <h2 className="pond-title">{pond.name}</h2>
            <button
              onClick={() =>
                setShowModals((prev) => ({ ...prev, [pond.id]: true }))
              }
              className="open-water-modal"
            >
              Nhập Thông Số Nước
            </button>

            {showModals[pond.id] && (
              <div className="water-modal">
                <div className="modal-body">
                  <h2>Nhập Thông Số Nước cho {pond.name}</h2>
                  <div className="input-container">
                    <div className="input-group">
                      <label>Nhiệt độ (°C)</label>
                      <input
                        type="number"
                        name="temperature"
                        value={pond.waterParameter?.temperature || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="Nhiệt độ"
                      />
                    </div>
                    <div className="input-group">
                      <label>Độ mặn (ppt)</label>
                      <input
                        type="number"
                        name="salinity"
                        value={pond.waterParameter?.salinity || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="Độ mặn"
                      />
                    </div>
                    <div className="input-group">
                      <label>pH</label>
                      <input
                        type="number"
                        name="ph"
                        value={pond.waterParameter?.ph || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="pH"
                      />
                    </div>
                    <div className="input-group">
                      <label>Oxy (mg/L)</label>
                      <input
                        type="number"
                        name="oxygen"
                        value={pond.waterParameter?.oxygen || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="Oxy"
                      />
                    </div>
                    <div className="input-group">
                      <label>nO2 (mg/L)</label>
                      <input
                        type="number"
                        name="nO2"
                        value={pond.waterParameter?.nO2 || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="nO2"
                      />
                    </div>
                    <div className="input-group">
                      <label>nO3 (mg/L)</label>
                      <input
                        type="number"
                        name="nO3"
                        value={pond.waterParameter?.nO3 || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="nO3"
                      />
                    </div>
                    <div className="input-group">
                      <label>pO4 (mg/L)</label>
                      <input
                        type="number"
                        name="pO4"
                        value={pond.waterParameter?.pO4 || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="pO4"
                      />
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button
                      onClick={() => handleSavePond(pond.id)}
                      className="save-water-parameters"
                    >
                      Lưu Thông Số
                    </button>
                    <button
                      onClick={() =>
                        setShowModals((prev) => ({ ...prev, [pond.id]: false }))
                      }
                      className="close-water-modal"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showModals[pond.id] && (
              <div className="water-modal">
                <div className="modal-body">
                  <h2>Nhập Thông Số Nước cho {pond.name}</h2>
                  <div className="input-container">
                    {" "}
                    {/* New container for input fields */}
                    <div className="input-group">
                      <label>Nhiệt độ (°C)</label>
                      <input
                        type="number"
                        name="temperature"
                        value={pond.waterParameter?.temperature || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="Nhiệt độ"
                      />
                    </div>
                    <div className="input-group">
                      <label>Độ mặn (ppt)</label>
                      <input
                        type="number"
                        name="salinity"
                        value={pond.waterParameter?.salinity || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="Độ mặn"
                      />
                    </div>
                    <div className="input-group">
                      <label>pH</label>
                      <input
                        type="number"
                        name="ph"
                        value={pond.waterParameter?.ph || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="pH"
                      />
                    </div>
                    <div className="input-group">
                      <label>Oxy (mg/L)</label>
                      <input
                        type="number"
                        name="oxygen"
                        value={pond.waterParameter?.oxygen || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="Oxy"
                      />
                    </div>
                    <div className="input-group">
                      <label>nO2 (mg/L)</label>
                      <input
                        type="number"
                        name="nO2"
                        value={pond.waterParameter?.nO2 || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="nO2"
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    {" "}
                    {/* Additional input row */}
                    <div className="input-group">
                      <label>nO3 (mg/L)</label>
                      <input
                        type="number"
                        name="nO3"
                        value={pond.waterParameter?.nO3 || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="nO3"
                      />
                    </div>
                    <div className="input-group">
                      <label>pO4 (mg/L)</label>
                      <input
                        type="number"
                        name="pO4"
                        value={pond.waterParameter?.pO4 || ""}
                        onChange={(e) => handleWaterParameterChange(pond.id, e)}
                        placeholder="pO4"
                      />
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button
                      onClick={() => handleSavePond(pond.id)}
                      className="save-water-parameters"
                    >
                      Lưu Thông Số
                    </button>
                    <button
                      onClick={() =>
                        setShowModals((prev) => ({ ...prev, [pond.id]: false }))
                      }
                      className="close-water-modal"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PondParameters;