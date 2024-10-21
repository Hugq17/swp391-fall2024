import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PondCard.css"; // Import file CSS cho card

const PondCard = () => {
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
        console.error("There was an error fetching the ponds!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPonds();
  }, []);

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
        </div>
      ))}
    </div>
  );
};

export default PondCard;
