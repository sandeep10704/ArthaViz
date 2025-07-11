import React from "react";
import { useNavigate } from "react-router";

const UnderMaintenance = () => {
    const navigate = useNavigate();
    const handleClick = () => {
    navigate(-1);
  };
    
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Video section */}
      <div style={{ maxWidth: "600px", width: "100%", marginBottom: "30px" }}>
        <video
          src="https://res.cloudinary.com/dq7lkkucz/video/upload/v1752224070/error_bxhqvo.mp4" 
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </div>

      {/* Text section */}
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
        Oops! site is under maintenance
      </h1>
      <p style={{ color: "#777", marginBottom: "20px" }}>
        We're working hard to improve your experience.<br />
        Check back soon for updates!{" "}
        <span style={{ color: "orange", fontWeight: "500",cursor: "pointer" }}  onClick={handleClick}>Turn back.</span>
      </p>
    </div>
  );
};

export default UnderMaintenance;
