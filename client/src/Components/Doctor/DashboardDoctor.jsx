import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DoctorNavbar from "./DoctorNavbar";

const DashboardDoctor = () => {
  return (
    <>
    <DoctorNavbar/>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#fffaf0",
      }}
    >
      {/* Dashboard Header */}
      <Typography
        variant="h3"
        sx={{
          color: "orange",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <MedicalServicesIcon fontSize="large" />
        Doctor Dashboard
      </Typography>

      <Typography variant="body1" sx={{ marginTop: 2, color: "#555", textAlign: "center" }}>
        Welcome to the Doctor's Dashboard. Here, you can verify vaccinations and manage pet records.
      </Typography>

      {/* Navigation Card */}
      <Card
        sx={{
          marginTop: 4,
          width: "350px",
          border: "2px solid orange",
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: "#fff",
          transition: "0.3s",
          "&:hover": { boxShadow: 6 },
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ color: "orange", fontWeight: "bold" }}>
            Pet Verification
          </Typography>
          <Typography variant="body2" sx={{ color: "#777", marginBottom: 2 }}>
            Approve or reject pet vaccination details.
          </Typography>

          <Button
            component={Link}
            to="/doctor/verify-vaccination"
            variant="contained"
            sx={{
              backgroundColor: "orange",
              color: "white",
              "&:hover": { backgroundColor: "#e69500" },
            }}
          >
            🏥 Verify Vaccination
          </Button>
        </CardContent>
      </Card>
    </Box>
    </>
  );
};

export default DashboardDoctor;



