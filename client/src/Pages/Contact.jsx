import React from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaPhone } from "react-icons/fa";
import developerPng from "../Assets/developer-png.png"; // Import image

const Contact = () => {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "80px 10%", 
        backgroundColor: "#fff", 
        fontFamily: "'Poppins', sans-serif" 
      }}
    >
      {/* Left Section - Contact Details */}
      <Box sx={{ width: "40%" }}>
        <Typography variant="h4" sx={{ fontWeight: "700", mb: 3, color: "#1a1a1a" }}>
          Let's get in touch
        </Typography>

        {[ 
          { icon: <FaEnvelope />, text: "support@pawfinds.com" },
          { icon: <FaLinkedin />, text: "User Name: vinamraarao" },
          { icon: <FaGithub />, text: "vinamraarao" },
          { icon: <FaInstagram />, text: "@vinamra_a_rao" },
          { icon: <FaPhone />, text: "+91 9019364733" }
        ].map((item, index) => (
          <Box 
            key={index} 
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", mb: 3 }}
          >
            <IconButton sx={{ fontSize: 48, color: "#1a1a1a", mb: 1 }}>
              {item.icon}
            </IconButton>
            <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#333" }}>
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Right Section - Image */}
      <Box sx={{ width: "50%", display: "flex", justifyContent: "center" }}>
        <Avatar 
          src={developerPng} 
          alt="Profile" 
          sx={{ width: "100%", maxWidth: 500, height: "auto", borderRadius: 0 }} 
        />
      </Box>
    </Box>
  );
};

export default Contact;
