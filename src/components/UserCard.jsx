import React from "react";
import "./UserCard.css";

const UserCard = ({ user, onImageLoad }) => {
  const idPart = user.profile_pic_id || "unknown";
  const imagePath = `/temp/${user.username}_${idPart}.jpg`;

  return (
    <div className="user-card">
      <img
        src={imagePath}
        alt={user.username}
        onLoad={onImageLoad}
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = "/default-profile.jpg"; // fallback to a default image
        }}
      />
      <h3>{user.full_name || user.username}</h3>
      <p>@{user.username}</p>
    </div>
  );
};

export default UserCard;
