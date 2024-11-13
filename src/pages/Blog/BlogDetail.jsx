// BlogDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BlogDetail.css";
import { useParams } from "react-router-dom";
import { formatDate } from "./utils"; // Import the utility function

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(
          `https://koi-care-at-home-server-h3fyedfeeecdg7fh.southeastasia-01.azurewebsites.net/api/blogs/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog detail:", error);
        alert("Lỗi hiển thị chi tiết bài blog vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return <div className="centered-container">Blog not found.</div>;
  }

  return (
    <div className="blog-detail-container">
      <div className="blog-detail">
        {blog.image && (
          <div className="blog-image-container">
            <img src={blog.image} alt={blog.title} className="blog-image" />
          </div>
        )}
        <h1>{blog.title}</h1>
        <p>
          <strong>Tác giả:</strong> {blog.author}
        </p>
        <p>
          <strong>Ngày tạo:</strong> {formatDate(blog.createdAt)}
        </p>
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
