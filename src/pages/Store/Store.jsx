import React, { useState } from "react";
import "./Store.css"; // CSS cho Store

const Store = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const storeInfo = {
    name: "Cửa hàng cá Koi đẹp",
    phone: "0901234567",
    address: "123 Đường Đẹp, Quận 1, TP. Hồ Chí Minh",
  };

  const categories = {
    "Hồ cá": [
      {
        id: 1,
        name: "Hồ cá Koi 1000L",
        price: 5000000,
        description: "Hồ cá Koi chất lượng cao, dung tích 1000L.",
        image: "path/to/tank-image.jpg", // Thay bằng đường dẫn thực tế
      },
      {
        id: 2,
        name: "Hồ cá Koi 500L",
        price: 3000000,
        description: "Hồ cá Koi dung tích 500L.",
        image: "path/to/tank-image.jpg", // Thay bằng đường dẫn thực tế
      },
    ],
    "Đồ lọc hồ": [
      {
        id: 3,
        name: "Máy lọc nước",
        price: 800000,
        description: "Máy lọc nước hồ cá hiệu quả.",
        image: "path/to/filter-image.jpg", // Thay bằng đường dẫn thực tế
      },
    ],
    "Phụ kiện máy móc": [
      {
        id: 4,
        name: "Máy sục khí",
        price: 500000,
        description: "Máy sục khí cho hồ cá, giúp duy trì nồng độ oxy.",
        image: "path/to/aerator-image.jpg", // Thay bằng đường dẫn thực tế
      },
    ],
    "Phụ kiện trang trí": [
      {
        id: 5,
        name: "Đá trang trí",
        price: 150000,
        description: "Đá trang trí cho hồ cá.",
        image: "path/to/decorative-stone-image.jpg", // Thay bằng đường dẫn thực tế
      },
    ],
    "Thuốc cho cá": [
      {
        id: 6,
        name: "Thuốc trị bệnh cho cá",
        price: 200000,
        description: "Thuốc điều trị bệnh cho cá Koi.",
        image: "path/to/medicine-image.jpg", // Thay bằng đường dẫn thực tế
      },
    ],
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="store-container">
      <h2>{storeInfo.name}</h2>
      <p>Điện thoại: {storeInfo.phone}</p>
      <p>Địa chỉ: {storeInfo.address}</p>

      {/* Danh sách ngành hàng */}
      <div className="categories">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className="category-button"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Hiển thị sản phẩm theo ngành hàng đã chọn */}
      {selectedCategory && (
        <div className="product-list">
          <h3>Sản phẩm trong ngành hàng: {selectedCategory}</h3>
          {categories[selectedCategory].map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Giá: {product.price.toLocaleString()} VNĐ</p>
              <button
                className="add-to-cart"
                onClick={() => addToCart(product)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Hiển thị giỏ hàng */}
      <div className="cart-summary">
        <h3>Giỏ hàng của bạn</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price.toLocaleString()} VNĐ
              </li>
            ))}
          </ul>
        ) : (
          <p>Giỏ hàng trống.</p>
        )}
      </div>
    </div>
  );
};

export default Store;
