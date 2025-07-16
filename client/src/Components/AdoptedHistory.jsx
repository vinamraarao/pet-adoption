import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, CardContent, Typography, Grid, Box, Pagination } from "@mui/material";

const AdoptedHistory = () => {
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(6); // Display 6 pets per page

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/adopted-history")
      .then((response) => {
        console.log("Fetched adopted pets:", response.data);
        setAdoptedPets(response.data);
      })
      .catch((error) => console.error("Error fetching adopted pets:", error));
  }, []);

  // Calculate the pets to display on the current page
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = adoptedPets.slice(indexOfFirstPet, indexOfLastPet);

  // Calculate total number of pages
  const totalPages = Math.ceil(adoptedPets.length / petsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#ff9800" }}>
        Adopted Pets History
      </Typography>

      {adoptedPets.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No adopted pets yet.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {currentPets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet._id}>
                <Card
                  sx={{
                    border: "2px solid #ff9800",
                    borderRadius: "10px",
                    backgroundColor: "#fff3e0",
                    boxShadow: 3,
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  <CardContent>
                  {pet.petImage ? (
                    <img
                      src={`http://localhost:5000/${pet.petImage}`}
                      alt={pet.petName}
                      style={{ width: "100%", height: "auto", marginBottom: "10px" }}
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Pet image not available
                    </Typography>
                  )}
                    <Typography variant="h6" sx={{ color: "#ff9800", fontWeight: "bold" }}>
                      {pet.petName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Pet Type:</strong> {pet.petType}
                    </Typography>
                    <Typography variant="body1">
                      Adopted by:{" "}
                      <Box component="span" sx={{ color: "#ff9800", fontWeight: "bold" }}>
                        {pet.name}
                      </Box>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Email: {pet.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Phone: {pet.phone}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Adopted At: {new Date(pet.adoptedAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#ff9800",
                    "&.Mui-selected": {
                      backgroundColor: "#ff9800",
                      color: "white",
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default AdoptedHistory;