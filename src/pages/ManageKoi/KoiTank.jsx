import React, { useEffect, useState } from "react";
import axios from "axios";
import "./KoiTank.css"; // Import file CSS cho bảng và modal

const PondCard = () => {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Trạng thái để hiển thị modal
  const [selectedPondId, setSelectedPondId] = useState(null); // Trạng thái lưu hồ cá được chọn để thêm cá
  const [koiTypes, setKoiTypes] = useState([]); // Lưu danh sách giống cá
  const [newFish, setNewFish] = useState({
    name: "",
    koiTypeId: "",
    age: "",
    length: "",
    weight: "",
    gender: "1", // Mặc định là Giới tính đực
    origin: "",
    shape: "",
    breed: "",
    imageUrl: "",
  });

  // Lấy danh sách hồ cá
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

  // Lấy danh sách giống cá từ API
  useEffect(() => {
    const fetchKoiTypes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found! Please login first.");
        return;
      }

      try {
        const response = await axios.get(
          "https://koi-care-server.azurewebsites.net/api/koifish/get-all-koi-types",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setKoiTypes(response.data.koiTypes); // Lưu danh sách giống cá vào state
      } catch (error) {
        console.error("There was an error fetching the koi types!", error);
      }
    };

    fetchKoiTypes();
  }, []);

  // Xử lý thay đổi input của form thêm cá
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFish({
      ...newFish,
      [name]: value,
    });
  };

  // Hàm gọi API thêm cá vào hồ
  const handleAddFish = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found! Please login first.");
      return;
    }

    const fishData = {
      ...newFish,
      pondId: selectedPondId, // Thêm pondId vào dữ liệu gửi đi
    };

    try {
      const response = await axios.post(
        "https://koi-care-server.azurewebsites.net/api/koifish/create",
        fishData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Cá đã được thêm thành công!");
        setShowModal(false); // Đóng modal sau khi thêm cá
        setNewFish({
          // Reset form
          name: "",
          koiTypeId: "",
          age: "",
          length: "",
          weight: "",
          gender: "1",
          origin: "",
          shape: "",
          breed: "",
          imageUrl: "",
        });
      }
    } catch (error) {
      console.error("There was an error adding the fish!", error);
      alert("Có lỗi xảy ra khi thêm cá.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang tải
  }

  return (
    <div className="pond-card-container">
      {ponds.map((pond) => (
        <div className="pond-card" key={pond.id}>
          <h2 className="pond-name">{pond.name}</h2>
          <p>Chiều dài: {pond.length} m</p>
          <p>Chiều rộng: {pond.width} m</p>
          <p>Độ sâu: {pond.depth} m</p>
          <p>Thể tích: {pond.volume} L</p>

          {/* Bảng hiển thị cá trong hồ */}
          <KoiFishTable pondId={pond.id} />

          {/* Nút để mở modal thêm cá */}
          <button
            className="button-add-fish"
            onClick={() => {
              setSelectedPondId(pond.id); // Lưu id hồ cá hiện tại để thêm cá
              setShowModal(true); // Mở modal thêm cá
            }}
          >
            + Thêm Cá
          </button>
        </div>
      ))}

      {/* Modal hiển thị form thêm cá */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Thêm Cá Mới vào hồ {selectedPondId}</h3>
            <label>Tên cá:</label>
            <input
              type="text"
              name="name"
              value={newFish.name}
              onChange={handleInputChange}
              required
            />

            <label>Giống cá Koi:</label>
            <select
              name="koiTypeId"
              value={newFish.koiTypeId}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn giống cá</option>
              {koiTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

            <label>Tuổi:</label>
            <input
              type="number"
              name="age"
              value={newFish.age}
              onChange={handleInputChange}
              required
            />
            <label>Chiều dài (m):</label>
            <input
              type="number"
              name="length"
              value={newFish.length}
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
              <option value="1">Đực</option>
              <option value="2">Cái</option>
            </select>

            <label>Xuất xứ:</label>
            <input
              type="text"
              name="origin"
              value={newFish.origin}
              onChange={handleInputChange}
              required
            />
            <label>Hình dáng:</label>
            <input
              type="text"
              name="shape"
              value={newFish.shape}
              onChange={handleInputChange}
              required
            />
            <label>Dòng giống:</label>
            <input
              type="text"
              name="breed"
              value={newFish.breed}
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

            <div className="modal-buttons">
              <button onClick={handleAddFish}>Thêm Cá</button>
              <button onClick={() => setShowModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Component hiển thị bảng cá Koi trong từng hồ (KoiFishTable)
const KoiFishTable = ({ pondId }) => {
  const [koiFish, setKoiFish] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKoiFish = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found! Please login first.");
        return;
      }

      try {
        const response = await axios.get(
          `https://koi-care-server.azurewebsites.net/api/koifish/${pondId}`, // API lấy danh sách cá của từng hồ
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setKoiFish(response.data.koiResults);
      } catch (error) {
        console.error("There was an error fetching the koi fish!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKoiFish();
  }, [pondId]);

  if (loading) {
    return <div>Loading koi fish...</div>;
  }

  return (
    <table className="koi-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Giống</th>
          <th>Hình ảnh</th>
          <th>Tuổi</th>
          <th>Chiều dài (m)</th>
          <th>Trọng lượng (g)</th>
          <th>Giới tính</th>
          <th>Xuất xứ</th>
          <th>Hình dáng</th>
          <th>Dòng giống</th>
        </tr>
      </thead>
      <tbody>
        {koiFish.map((fish) => (
          <tr key={fish.id}>
            <td>{fish.id}</td>
            <td>{fish.name}</td>
            <td>{fish.koiType}</td>
            <td>
              <img src={fish.imageUrl} alt={fish.name} className="koi-image" />
            </td>
            <td>{fish.age}</td>
            <td>{fish.length}</td>
            <td>{fish.weight}</td>
            <td>{fish.gender === 1 ? "Đực" : "Cái"}</td>
            <td>{fish.origin}</td>
            <td>{fish.shape}</td>
            <td>{fish.breed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PondCard;
