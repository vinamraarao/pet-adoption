import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Grid, Button, CircularProgress } from "@mui/material";

const ApprovedByDoctor = () => {
  const [approvedPets, setApprovedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedPets = async () => {
      try {
        console.log("Fetching approved pets from /api/pets/approvedByDoctor");
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/pets/approvedByDoctor");
        console.log("Approved pets response:", response.data);
        setApprovedPets(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching approved pets:", error.response || error.message);
        setError(`Failed to load approved pets: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedPets();
  }, []);

  const handleApprove = async (petId) => {
    try {
      console.log("Approving pet:", petId);
      await axios.put(`http://localhost:5000/api/pets/moveToAvailable/${petId}`);
      setApprovedPets(approvedPets.filter((pet) => pet._id !== petId));
      console.log("Pet approved successfully");
      alert("✅ Pet approved and moved to available pets!");
    } catch (error) {
      console.error("Error approving pet:", error);
      alert("❌ Error approving pet");
    }
  };

  const handleReject = async (petId) => {
    try {
      console.log("Rejecting pet:", petId);
      await axios.put(`http://localhost:5000/api/pets/hidePet/${petId}`);
      setApprovedPets(approvedPets.filter((pet) => pet._id !== petId));
      console.log("Pet rejected successfully");
      alert("🚫 Pet rejected and hidden!");
    } catch (error) {
      console.error("Error rejecting pet:", error);
      alert("❌ Error rejecting pet");
    }
  };

  if (loading) {
    return (
      <Box p={4} sx={{ textAlign: "center" }}>
        <CircularProgress sx={{ color: "orange" }} />
        <Typography variant="h6" sx={{ color: "orange", mt: 2 }}>
          Loading approved pets...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "red" }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        sx={{
          color: "orange",
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        ✅ Approved by Doctor (Admin Review)
      </Typography>
      {approvedPets.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", color: "gray", fontStyle: "italic", fontSize: "1.2rem" }}
        >
          No pets available for approval.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {approvedPets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pet._id}>
              <Card
                sx={{
                  width: 300,
                  minHeight: 450,
                  border: "2px solid orange",
                  borderRadius: 3,
                  boxShadow: 5,
                  transition: "0.3s, box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: 8,
                    transform: "scale(1.05)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {pet.petImage && (
                    <img
                      src={`http://localhost:5000/${pet.petImage}`}
                      alt={pet.name}
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        borderRadius: "10px 10px 0 0",
                        marginBottom: "15px",
                      }}
                    />
                  )}
                  <Typography variant="h5" sx={{ color: "orange", fontWeight: "bold", mb: 1 }}>
                    {pet.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "orange", mb: 1 }}>
                    <strong>Age:</strong> {pet.age}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "orange", mb: 1 }}>
                    <strong>Location:</strong> {pet.location}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "orange", mb: 1 }}>
                    <strong>Pet Type:</strong> {pet.petType}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "orange", mb: 1 }}>
                    <strong>Owner Email:</strong> {pet.email}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "orange", mb: 1 }}>
                    <strong>Phone:</strong> {pet.phone}
                  </Typography>
                  {pet.vaccinationFile && (
                    <Typography variant="body1" sx={{ color: "orange", mb: 1 }}>
                      <strong>Vaccination File:</strong>{" "}
                      <a
                        href={`http://localhost:5000/${pet.vaccinationFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "orange", textDecoration: "underline" }}
                      >
                        View File
                      </a>
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-around", padding: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": { backgroundColor: "darkgreen" },
                      padding: "10px 20px",
                      fontSize: "1rem",
                    }}
                    onClick={() => handleApprove(pet._id)}
                  >
                    ✅ Approve
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "red",
                      color: "white",
                      "&:hover": { backgroundColor: "darkred" },
                      padding: "10px 20px",
                      fontSize: "1rem",
                    }}
                    onClick={() => handleReject(pet._id)}
                  >
                    ❌ Reject
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ApprovedByDoctor;