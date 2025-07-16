import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ServiceManagerDashboard = () => {
  const navigate = useNavigate();

  // Navigate to ManageServiceRequests
  const handleManageRequests = () => {
    navigate("/service-manager/manage-requests"); // Update path to match nested route
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px - 64px)", // Adjust for AppBar and footer height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#f28c38", mb: 2 }}
        >
          Service Manager Dashboard
        </Typography>
      </Box>

      <Box
        sx={{
          border: "2px solid #ffcc80",
          borderRadius: 2,
          p: 3,
          backgroundColor: "white",
          textAlign: "center",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleManageRequests}
          sx={{ textTransform: "uppercase" }}
        >
          Manage Service Requests
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceManagerDashboard;