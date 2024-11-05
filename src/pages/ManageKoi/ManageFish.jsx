import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageFish.css";
import KoiFishTable from "./KoiFishTable";

const ManageFish = () => {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPondId, setSelectedPondId] = useState(null);
  const [koiTypes, setKoiTypes] = useState([]);
  const [imageFile, setImageFile] = useState(null); // Thêm trạng thái cho file ảnh

  const [newFish, setNewFish] = useState({
    name: "",
    koiTypeId: "",
    age: "",
    length: "",
    weight: "",
    gender: "1",
    origin: "",
    shape: "",
    breed: "",
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
        setKoiTypes(response.data.koiTypes);
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

  // Xử lý chọn file ảnh
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Lưu file ảnh
  };

  // Hàm tải ảnh lên và trả về URL
  const uploadImage = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await axios.post(
        "https://koi-care-server.azurewebsites.net/api/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Lỗi tải lên hình ảnh, vui lòng thử lại.");
      return null;
    }
  };

  // Hàm gọi API thêm cá vào hồ
  const handleAddFish = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found! Please login first.");
      return;
    }

    // Tải ảnh trước nếu có
    const imageUrl = await uploadImage();
    if (imageFile && !imageUrl) {
      alert("Lỗi khi tải lên ảnh.");
      return;
    }

    const fishData = {
      ...newFish,
      pondId: selectedPondId,
      koiTypeId: parseInt(newFish.koiTypeId),
      age: parseInt(newFish.age),
      weight: parseInt(newFish.weight),
      gender: parseInt(newFish.gender),
      shape: parseFloat(newFish.shape),
      length: parseFloat(newFish.length),
      imageUrl, // Gán URL ảnh nếu có
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
        setShowModal(false);
        setNewFish({
          name: "",
          koiTypeId: "",
          age: "",
          length: "",
          weight: "",
          gender: "1",
          origin: "",
          shape: "",
          breed: "",
        });
        setImageFile(null); // Reset file ảnh
      }
    } catch (error) {
      console.error("There was an error adding the fish!", error);
      alert("Có lỗi xảy ra khi thêm cá.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pond-card-container">
      {ponds.map((pond) => (
        <div className="pond-card" key={pond.id}>
          <h2 className="pond-name">{pond.name}</h2>
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
          </div>

          <KoiFishTable pondId={pond.id} />

          <button
            className="button-add-fish"
            onClick={() => {
              setSelectedPondId(pond.id);
              setShowModal(true);
            }}
          >
            + Thêm Cá
          </button>
        </div>
      ))}

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
            <label>Hình ảnh:</label>
            <input type="file" onChange={handleImageChange} />

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

export default ManageFish;
