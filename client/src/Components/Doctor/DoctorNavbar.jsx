import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DoctorNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear doctor-related session storage (if any)
    localStorage.removeItem("userToken");
    localStorage.removeItem("role");
    
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ff7f00",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "10px 20px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side - Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/doctor/dashboard")}
        >
          ⚕️ Doctor Panel
        </Typography>

        {/* Middle - Navigation Links */}
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Button
            onClick={() => navigate("/doctor/dashboard")}
            sx={{ color: "white", fontWeight: "bold", "&:hover": { color: "#ffddcc" } }}
          >
            Dashboard
          </Button>
          <Button
            onClick={() => navigate("/doctor/verify-vaccination")}
            sx={{ color: "white", fontWeight: "bold", "&:hover": { color: "#ffddcc" } }}
          >
            Verify Vaccination
          </Button>
        </Box>

        {/* Right Side - Logout Button */}
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            backgroundColor: "white",
            color: "#ff7f00",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#ff5500", color: "white" },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default DoctorNavbar;
