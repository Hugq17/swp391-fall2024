import React from "react";
import "./ImageCard.css";

const ImageCard = ({ imageSrc, title }) => {
  return (
    <div className="image-card">
      <img src={imageSrc} alt={title} />
      <h3 className="image-title">{title}</h3>
    </div>
  );
};

export default ImageCard;
