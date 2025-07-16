import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material"; // ✅ Named imports
import { useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ff7f00", // Orange background
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "10px 20px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Admin Panel Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          🐾 Admin Panel
        </Typography>

        {/* Logout Button */}
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            backgroundColor: "white",
            color: "#ff7f00",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#ff5500",
              color: "white",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavBar; // ✅ Ensure the export is correct
