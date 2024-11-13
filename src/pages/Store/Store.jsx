import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductStore.css";

function ProductStore({ onCartUpdate }) {
  // Nhận props từ Navbar
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);

  // Fetch danh sách ngành hàng
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/category/get-all"
        );
        setCategories(response.data.results);
      } catch (error) {
        setError("Không thể tải ngành hàng. Vui lòng thử lại.");
      }
    };
    fetchCategories();
  }, []);

  // Fetch danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/product/get-all"
        );
        setProducts(response.data.products);
      } catch (error) {
        setError("Không thể tải sản phẩm. Vui lòng thử lại.");
      }
    };
    fetchProducts();
  }, []);

  // Chọn ngành hàng
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  // Lọc sản phẩm theo ngành hàng
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingProduct = storedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Tăng số lượng nếu sản phẩm đã có trong giỏ
    } else {
      storedCart.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới vào giỏ hàng
    }

    localStorage.setItem("cartItems", JSON.stringify(storedCart));

    // Cập nhật giỏ hàng ở Navbar
    onCartUpdate(storedCart); // Gọi hàm callback để cập nhật giỏ hàng trong Navbar
  };

  return (
    <div className="store-container">
      <aside className="category-sidebar">
        <h3>Danh mục sản phẩm</h3>
        {error ? (
          <p>{error}</p>
        ) : (
          <ul className="category-list">
            <li
              onClick={() => handleCategoryClick(null)} // Đặt selectedCategory về null để hiển thị tất cả sản phẩm
              className={!selectedCategory ? "selected" : ""}
            >
              Tất cả sản phẩm
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={selectedCategory === category.name ? "selected" : ""}
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </aside>

      <main className="product-display">
        <h3>
          {selectedCategory
            ? `Sản phẩm: ${selectedCategory}`
            : "Tất cả sản phẩm"}
        </h3>
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-item">
                <div className="product-header">
                  <div className="product-image">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <p>Không có ảnh</p>
                    )}
                  </div>
                  <h4 className="product-name">{product.name}</h4>
                </div>
                <div className="product-info">
                  <p>{product.description}</p>
                  <p className="product-price">
                    Giá: {product.price.toLocaleString("vi-VN")} VND
                  </p>
                  <button
                    className="button-add-cart"
                    onClick={() => addToCart(product)}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm trong ngành hàng này.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProductStore;
