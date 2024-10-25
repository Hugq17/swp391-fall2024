// BlogDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDate } from "./utils"; // Import the utility function

const BlogDetail = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found! Please login first.");
        return;
      }

      try {
        const response = await axios.get(`https://koi-care-server.azurewebsites.net/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response.data); 
      } catch (error) {
        console.error("Error fetching blog detail:", error);
        alert("Error fetching blog detail. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!blog) {
    return <div>Blog not found.</div>; 
  }

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <p><strong>Tác giả:</strong> {blog.author}</p>
      <p><strong>Ngày tạo:</strong> {formatDate(blog.createdAt)}</p> {/* Use the formatDate function */}
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
