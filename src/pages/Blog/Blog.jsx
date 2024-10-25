// BlogList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BlogList.css"; // Import CSS for styling

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs data from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        alert("No token found! Please login first.");
        return;
      }

      try {
        const response = await axios.get("https://koi-care-server.azurewebsites.net/api/blogs/get-all", {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        setBlogs(response.data.blogs); // Assume the response contains a blogs array
      } catch (error) {
        console.error("Error fetching blogs:", error);
        alert("Error fetching blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="blog-container">
      {blogs.map((blog) => (
        <div className="blog-card" key={blog.id}>
          <h2 className="blog-title">{blog.title}</h2>
          <p className="blog-summary">{blog.summary}</p>
          <Link to={`/blog/${blog.id}`} className="read-more">
            Đọc thêm
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
