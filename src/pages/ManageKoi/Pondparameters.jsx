import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Pondparameters.css";
const PondParameters = () => {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModals, setShowModals] = useState({}); // Quản lý trạng thái mở modal

  useEffect(() => {
    const fetchPonds = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập để thực hiện chức năng này.");
        return;
      }

      try {
        const response = await axios.get(
          "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/ponds",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPonds(response.data.ponds);
      } catch (error) {
        console.error("Error fetching ponds:", error);
        alert("Lỗi hiển thị thông số hồ");
      } finally {
        setLoading(false);
      }
    };

    fetchPonds();
  }, []);

  const handleWaterParameterChange = (pondId, e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu giá trị là số và không âm
    if (value < 0) {
      alert("Giá trị không thể là số âm.");
      return;
    }

    // Cập nhật state nếu giá trị hợp lệ
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

  const handleSavePond = async (pondId) => {
    const pondToSave = ponds.find((pond) => pond.id === pondId);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này!!!");
      return;
    }

    try {
      const response = await axios.post(
        "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/ponds/save",
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
        alert("Cập nhật dữ liễu thành công!");
        setShowModals((prev) => ({ ...prev, [pondId]: false }));
      }
    } catch (error) {
      console.error("Error saving pond data:", error);
      alert("Đã cập nhật hồ thành công");
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
