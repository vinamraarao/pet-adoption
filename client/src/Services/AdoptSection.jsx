import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import adopt1 from "../Assets/adopt1.png";
import adopt2 from "../Assets/adopt2.png";


const AdoptSection = () => {
  const navigate = useNavigate(); // ✅ Declare navigate

  return (
    <div style={{ width: "45%", textAlign: "center" }}>
      <h2 style={{ color: "#f7931e", borderBottom: "2px solid #f7931e", paddingBottom: "5px" }}>
        Adopt a Pet
      </h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
          <img src={adopt1} alt="Pet Adoption" width="150px" />
          <img src={adopt2} alt="Pet Adoption" width="150px" />
      </div>

      <p>Welcome to our pet adoption program! Adopting a pet brings joy and companionship into your life.</p>

      <h3 style={{ color: "#f7931e" }}>Benefits of Pet Adoption</h3>
      <ul style={{ textAlign: "left", margin: "0 auto", width: "70%" }}>
        <li>Provide a loving home to a pet in need</li>
        <li>Experience the unconditional love of a pet</li>
        <li>Create lasting memories and cherished moments</li>
      </ul>

      <h3 style={{ color: "#f7931e" }}>Adoption Process</h3>
      <ul style={{ textAlign: "left", margin: "0 auto", width: "70%" }}>
        <li>Fill out an adoption application</li>
        <li>Meet potential pets in person</li>
        <li>Complete the necessary paperwork</li>
      </ul>

      <Button
        onClick={() => navigate("/pets")} // ✅ Use navigate properly
        variant="contained"
        style={{ backgroundColor: "#f7931e", color: "white", marginTop: "10px" }}
      >
        Find Your Perfect Pet
      </Button>
    </div>
  );
};

export default AdoptSection;
