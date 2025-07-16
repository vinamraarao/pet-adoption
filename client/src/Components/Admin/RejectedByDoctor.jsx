import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, Grid, Button, Modal, TextField, CircularProgress } from "@mui/material";

const RejectedByDoctor = () => {
  const [rejectedPets, setRejectedPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRejectedPets = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/doctor/rejectedPets");
        console.log("Fetched rejected pets:", response.data);
        setRejectedPets(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching rejected pets:", error);
        setError("Failed to load rejected pets. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRejectedPets();
  }, []);

  const handleViewReason = (pet) => {
    setSelectedPet(pet);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPet(null);
  };

  if (loading) {
    return (
      <Box p={4} sx={{ textAlign: "center" }}>
        <CircularProgress sx={{ color: "orange" }} />
        <Typography variant="h6" sx={{ color: "orange", mt: 2 }}>
          Loading rejected pets...
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
        ❌ Rejected by Doctor
      </Typography>
      {rejectedPets.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", color: "gray", fontStyle: "italic", fontSize: "1.2rem" }}
        >
          No pets rejected yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {rejectedPets.map((pet) => (
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
                <CardContent>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "orange",
                      color: "white",
                      "&:hover": { backgroundColor: "darkorange" },
                      padding: "10px 20px",
                      fontSize: "1rem",
                      width: "100%",
                    }}
                    onClick={() => handleViewReason(pet)}
                  >
                    View Rejection Reason
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: "orange", fontWeight: "bold" }}>
            Rejection Reason for {selectedPet?.name}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={selectedPet?.rejectReason || ""}
            variant="outlined"
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "orange", color: "white", padding: "10px 20px" }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default RejectedByDoctor;