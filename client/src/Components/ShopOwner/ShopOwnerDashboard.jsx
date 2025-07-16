import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const ShopOwnerDashboard = () => {
  return (
    <Box
      sx={{
        padding: 5,
        minHeight: "calc(100vh - 64px - 64px)", // Adjust for AppBar and footer from layout
        backgroundColor: "#fff3e0", // Match the theme's background
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 3, color: "#f28c38", textAlign: "center" }}
      >
        Shop Owner Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ padding: 3, textAlign: "center", boxShadow: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#f28c38" }}>
              Pending Requests
            </Typography>
            <Typography variant="body1" sx={{ color: "gray", my: 2 }}>
              View and manage service requests.
            </Typography>
            <Link to="/shop-owner/manage-requests" style={{ textDecoration: "none" }}>
              <Typography variant="button" color="primary">
                View Requests
              </Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopOwnerDashboard;