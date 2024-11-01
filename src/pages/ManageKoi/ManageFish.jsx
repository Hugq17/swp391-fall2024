import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageFish.css"; // Import file CSS cho bảng và modal
import { Line } from "react-chartjs-2"; // Import chart component

const ManageFish = () => {
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
      koiTypeId: parseInt(newFish.koiTypeId), // Chuyển đổi thành số nguyên
      age: parseInt(newFish.age),
      weight: parseInt(newFish.weight),
      gender: parseInt(newFish.gender),
      shape: parseFloat(newFish.shape), // Chuyển đổi thành số thực
      length: parseFloat(newFish.length),
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
          gender: "",
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
// Component hiển thị bảng cá Koi trong từng hồ (KoiFishTable)
const KoiFishTable = ({ pondId }) => {
  const [koiFish, setKoiFish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedFish, setSelectedFish] = useState(null);
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [growthData, setGrowthData] = useState(null);

  useEffect(() => {
    const fetchKoiFish = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found! Please login first.");
        return;
      }

      try {
        const response = await axios.get(
          `https://koi-care-server.azurewebsites.net/api/koifish/get-all-fish/${pondId}`,
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

  // Open the form modal for updating fish length and weight
  const openFormModal = (fish) => {
    setSelectedFish(fish);
    setLength(fish.length);
    setWeight(fish.weight);
    setShowFormModal(true);
  };

  // Submit the updated length and weight to the API
  const handleUpdateFish = async () => {
    if (!length || !weight) {
      alert("Please enter both length and weight.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found! Please login first.");
      return;
    }

    const updatedData = {
      koiIndividualId: selectedFish.id,
      length: parseFloat(length),
      weight: parseFloat(weight),
    };

    try {
      const response = await axios.post(
        "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/koigrowth/create",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Fish updated successfully!");
        setShowFormModal(false);
        setKoiFish((prev) =>
          prev.map((fish) =>
            fish.id === selectedFish.id
              ? {
                  ...fish,
                  length: updatedData.length,
                  weight: updatedData.weight,
                }
              : fish
          )
        );
      }
    } catch (error) {
      console.error("There was an error updating the fish!", error);
      alert("Error updating fish.");
    }
  };

  if (loading) {
    return <div>Loading koi fish...</div>;
  }
  const fetchGrowthData = async (fish) => {
    setSelectedFish(fish);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found! Please login first.");
      return;
    }

    try {
      const response = await axios.get(
        `https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/koigrowth/get-all-fish-growth/${fish.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGrowthData(response.data.koiGrowthResults);
      setShowChartModal(true); // Show chart modal
    } catch (error) {
      console.error("Error fetching growth data", error);
      alert("Could not retrieve growth data.");
    }
  };

  // Prepare data for chart
  const getChartData = () => {
    if (!growthData) return null;

    const labels = growthData.map((data) =>
      new Date(data.measuredAt).toLocaleDateString()
    );
    const lengthData = growthData.map((data) => data.length);
    const weightData = growthData.map((data) => data.weight);

    return {
      labels,
      datasets: [
        {
          label: "Length (cm)",
          data: lengthData,
          borderColor: "blue",
          fill: false,
        },
        {
          label: "Weight (g)",
          data: weightData,
          borderColor: "green",
          fill: false,
        },
      ],
    };
  };

  if (loading) {
    return <div>Loading koi fish...</div>;
  }

  return (
    <div>
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
            <th>Kích thước</th> {/* Update Column */}
            <th>Xem biểu đồ</th> {/* View Chart Column */}
          </tr>
        </thead>
        <tbody>
          {koiFish.map((fish) => (
            <tr key={fish.id}>
              <td>{fish.id}</td>
              <td>{fish.name}</td>
              <td>{fish.koiType}</td>
              <td>
                <img
                  src={fish.imageUrl}
                  alt={fish.name}
                  className="koi-image"
                />
              </td>
              <td>{fish.age}</td>
              <td>{fish.length}</td>
              <td>{fish.weight}</td>
              <td>{fish.gender === 1 ? "Đực" : "Cái"}</td>
              <td>{fish.origin}</td>
              <td>{fish.shape}</td>
              <td>{fish.breed}</td>
              <td>
                <button onClick={() => openFormModal(fish)}>Cập nhật</button>
              </td>
              <td>
                <button onClick={() => fetchGrowthData(fish)}>
                  Xem biểu đồ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating fish length and weight */}
      {showFormModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Cập nhật cá: {selectedFish.name}</h3>
            <label>Chiều dài (m):</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              required
            />
            <label>Trọng lượng (g):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <div className="modal-buttons">
              <button onClick={handleUpdateFish}>Lưu</button>
              <button onClick={() => setShowFormModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for showing the growth chart */}
      {showChartModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Biểu đồ phát triển của {selectedFish.name}</h3>
            <Line data={getChartData()} />
            <button onClick={() => setShowChartModal(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFish;
