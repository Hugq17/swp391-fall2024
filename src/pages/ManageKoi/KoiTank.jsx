import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PondCard.css"; // Import file CSS cho card và modal

const PondCard = () => {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Trạng thái để hiển thị modal
  const [newFish, setNewFish] = useState({
    name: "",
    imageUrl: "",
    size: "",
    weight: "",
    gender: "",
    species: "",
    origin: "",
  });

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
        console.error("There was an error fetching the ponds!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPonds();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFish({
      ...newFish,
      [name]: value,
    });
  };

  const handleAddFish = (pondId) => {
    // Xử lý khi người dùng nhấn "Lưu Cá"
    console.log("New Fish Added to pond:", pondId, newFish);
    setShowModal(false); // Đóng modal sau khi thêm cá
  };

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang tải
  }

  return (
    <div className="pond-card-container">
      {ponds.map((pond) => (
        <div className="pond-card" key={pond.id}>
          <img src={pond.imageUrl} alt={pond.name} className="pond-image" />
          <h2 className="pond-name">{pond.name}</h2>
          <p>Chiều dài: {pond.length} m</p>
          <p>Chiều rộng: {pond.width} m</p>
          <p>Độ sâu: {pond.depth} m</p>
          <p>Thể tích: {pond.volume} L</p>
          <p>Số lượng cống thoát: {pond.drainageCount}</p>
          <p>Công suất máy bơm: {pond.pumpCapacity} L/h</p>

          {/* Button để hiển thị modal thêm cá */}
          <button className="button-add-fish" onClick={() => setShowModal(true)}>+ Thêm Cá</button>
        </div>
      ))}

      {/* Modal hiển thị form thêm cá */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Thêm Cá Mới</h3>
            <label>Tên cá:</label>
            <input
              type="text"
              name="name"
              value={newFish.name}
              onChange={handleInputChange}
              required
            />
            <label>Hình ảnh URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={newFish.imageUrl}
              onChange={handleInputChange}
              required
            />
            <label>Kích thước (cm):</label>
            <input
              type="number"
              name="size"
              value={newFish.size}
              onChange={handleInputChange}
              required
            />
            <label>Trọng lượng (g):</label>
            <input
              type="number"
              name="weight"
              value={newFish.weight}
              onChange={handleInputChange}
              required
            />
            <label>Giới tính:</label>
            <select
              name="gender"
              value={newFish.gender}
              onChange={handleInputChange}
            >
              <option value="male">Đực</option>
              <option value="female">Cái</option>
            </select>
            <label>Giống:</label>
            <input
              type="text"
              name="species"
              value={newFish.species}
              onChange={handleInputChange}
              required
            />
            <label>Xuất xứ:</label>
            <input
              type="text"
              name="origin"
              value={newFish.origin}
              onChange={handleInputChange}
              required
            />
            <div className="modal-buttons">
              <button onClick={() => handleAddFish()}>Thêm Cá</button>
              <button onClick={() => setShowModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PondCard;
