import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductStore.css";

function ProductStore() {
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

  return (
    <div className="store-container">
      <aside className="category-sidebar">
        <h3>Ngành hàng</h3>
        {error ? (
          <p>{error}</p>
        ) : (
          <ul>
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
              <div key={product.id} className="product-item">
                <div className="product-image">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} />
                  ) : (
                    <p>Không có ảnh</p>
                  )}
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <p className="product-price">
                    Giá: {product.price.toLocaleString("vi-VN")} VND
                  </p>
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
