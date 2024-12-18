import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2"; // Import chart component
import "./ManageFish.css";

const KoiFishTable = ({ pondId }) => {
  const [koiFish, setKoiFish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedFish, setSelectedFish] = useState(null);
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [growthData, setGrowthData] = useState(null);
  const [feedingInfo, setFeedingInfo] = useState(null);
  const fetchFeedingInfo = async (pondId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này!!!");
      return;
    }

    try {
      const response = await axios.get(
        `https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/feeding/serving-size?PondId=${pondId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeedingInfo(response.data);
    } catch (error) {
      console.error("Error fetching feeding information", error);
      alert("Không thể truy xuất thông tin cho ăn.");
    }
  };

  const calculateFeedingForFish = (fish) => {
    if (!feedingInfo) return 0;

    // Tính lượng thức ăn cho cá riêng biệt bằng cách nhân weightPercent với weight của cá
    const feedingAmount = feedingInfo.weightPercent * fish.weight;
    return feedingAmount.toFixed(2); // Trả về lượng thức ăn cho cá làm tròn đến 2 chữ số thập phân
  };

  const calculateTotalFeeding = () => {
    if (!feedingInfo) return 0;

    // Tính tổng lượng thức ăn cho tất cả các cá trong hồ
    const totalFeedingAmount = koiFish.reduce((total, fish) => {
      return total + feedingInfo.weightPercent * fish.weight;
    }, 0);

    return totalFeedingAmount.toFixed(2); // Trả về tổng lượng thức ăn làm tròn đến 2 chữ số thập phân
  };

  useEffect(() => {
    const fetchKoiFish = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập để thực hiện chức năng này!.");
        return;
      }

      try {
        const response = await axios.get(
          `https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/koifish/get-all-fish/${pondId}`,
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

  const openFormModal = (fish) => {
    setSelectedFish(fish);
    setLength(fish.length);
    setWeight(fish.weight);
    setShowFormModal(true);
  };

  const handleUpdateFish = async () => {
    if (!length || !weight) {
      alert("Vui lòng nhập chiều cao hoặc cân nặng.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này.");
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
        alert("Cập nhật thành công!!!");
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
      alert("Lỗi cập nhật cá");
    }
  };

  const fetchGrowthData = async (fish) => {
    setSelectedFish(fish);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này.");
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
      alert("Không thể truy xuất dữ liệu tăng trưởng.");
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
            <th>Kích thước</th>
            <th>Xem biểu đồ</th>
            <th>Xem lượng thức ăn</th>
          </tr>
        </thead>
        <tbody>
          {koiFish.map((fish) => (
            <tr key={fish.id}>
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
                <button
                  className="update-button"
                  onClick={() => openFormModal(fish)}
                >
                  Cập nhật
                </button>
              </td>
              <td>
                <button
                  className="chart-button"
                  onClick={() => fetchGrowthData(fish)}
                >
                  Xem biểu đồ
                </button>
              </td>
              <td>
                <button
                  className="feeding-button"
                  onClick={() => fetchFeedingInfo(pondId)}
                >
                  Lượng thức ăn cần thiết
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
      {/* Hiển thị modal nếu có dữ liệu feedingInfo */}
      {feedingInfo && (
        <div className="modal">
          <div className="modal-content">
            <h3>Thông tin lượng thức ăn cho các cá trong hồ</h3>
            <table>
              <thead>
                <tr>
                  <th>Tên cá</th>
                  <th>Trọng lượng (g)</th>
                  <th>Lượng thức ăn cần thiết (g)</th>
                </tr>
              </thead>
              <tbody>
                {koiFish.map((fish) => (
                  <tr key={fish.id}>
                    <td>{fish.name}</td>
                    <td>{fish.weight}</td>
                    <td>{calculateFeedingForFish(fish)} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>
              <strong>Tổng lượng thức ăn cho tất cả cá:</strong>{" "}
              {calculateTotalFeeding()} g
            </h4>
            <button onClick={() => setFeedingInfo(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KoiFishTable;
