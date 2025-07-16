import React, { useState, useEffect } from "react";
import axios from "axios";
import PetAdoptForm from "./PetAdoptForm";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

const PetList = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filters, setFilters] = useState({
    petType: "",
    location: "",
    age: "",
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pets/availablePets");
        setPets(response.data);
        setFilteredPets(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError("Failed to load pets. Please try again later.");
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...pets];
      if (filters.petType) {
        filtered = filtered.filter((pet) =>
          pet.petType.toLowerCase() === filters.petType.toLowerCase()
        );
      }
      if (filters.location) {
        filtered = filtered.filter((pet) =>
          pet.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      if (filters.age) {
        filtered = filtered.filter((pet) => {
          const ageNumber = parseInt(pet.age) || 0;
          const filterAge = parseInt(filters.age) || 0;
          return ageNumber === filterAge;
        });
      }
      setFilteredPets(filtered);
    };
    applyFilters();
  }, [pets, filters]);

  const handleShowInterest = (pet) => {
    if (!isLoggedIn) {
      alert("Before adopting pet you have to login for website.");
      console.log("Unauthorized attempt to adopt pet:", pet._id);
      return;
    }
    setSelectedPet(pet);
  };

  const closeForm = () => setSelectedPet(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ petType: "", location: "", age: "" });
  };

  const uniquePetTypes = [...new Set(pets.map((pet) => pet.petType))];
  const uniqueLocations = [...new Set(pets.map((pet) => pet.location))];

  if (loading) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h6" sx={{ color: "#FF6600" }}>
          Loading pets...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h6" sx={{ color: "#FF6600" }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box textAlign="center" p={3}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="pet-type-filter-label">Pet Type</InputLabel>
          <Select
            labelId="pet-type-filter-label"
            name="petType"
            value={filters.petType}
            label="Pet Type"
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            {uniquePetTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="location-filter-label">Location</InputLabel>
          <Select
            labelId="location-filter-label"
            name="location"
            value={filters.location}
            label="Location"
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueLocations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Age (years)"
          name="age"
          value={filters.age}
          onChange={handleFilterChange}
          type="number"
          sx={{ width: 150 }}
        />
        <Button
          variant="outlined"
          color="error"
          onClick={clearFilters}
          sx={{ height: "fit-content" }}
        >
          Clear Filters
        </Button>
      </Box>

      {filteredPets.length === 0 ? (
        <Typography variant="h6" sx={{ color: "#FF6600" }}>
          No pets match the selected filters.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {filteredPets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pet._id}>
              <Card
                sx={{
                  width: 300,
                  minHeight: 450,
                  backgroundColor: "white",
                  color: "#FF6600",
                  border: "2px solid #FF6600",
                  borderRadius: "15px",
                  textAlign: "center",
                  boxShadow: 5,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {pet.petImage && pet.petImageMimeType ? (
                    <img
                      src={`data:${pet.petImageMimeType};base64,${pet.petImage}`}
                      alt={pet.name}
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        borderRadius: "10px 10px 0 0",
                        marginBottom: "15px",
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      Pet image not available
                    </Typography>
                  )}
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                    {pet.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Type:</strong> {pet.petType}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Age:</strong> {pet.age}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Location:</strong> {pet.location}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Justification:</strong> {pet.justification}
                  </Typography>
                  {pet.vaccinationFile && pet.vaccinationFileMimeType ? (
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Vaccination File:</strong>{" "}
                      <a
                        href={`data:${pet.vaccinationFileMimeType};base64,${pet.vaccinationFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#FF6600", textDecoration: "underline" }}
                      >
                        View File
                      </a>
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      Vaccination file not available
                    </Typography>
                  )}
                </CardContent>
                <CardContent>
                  {isLoggedIn ? (
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#FF6600",
                        "&:hover": { backgroundColor: "#e65c00" },
                        padding: "10px 20px",
                        fontSize: "1rem",
                      }}
                      onClick={() => handleShowInterest(pet)}
                    >
                      Show Interest
                    </Button>
                  ) : (
                    <Typography variant="body2" sx={{ color: "#FF6600" }}>
                      <Link to="/login" style={{ color: "#FF6600", textDecoration: "underline" }}>
                        Log in to adopt
                      </Link>
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Modal open={Boolean(selectedPet && isLoggedIn)} onClose={closeForm}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          {selectedPet && isLoggedIn ? (
            <>
              <PetAdoptForm closeForm={closeForm} pet={selectedPet} />
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={closeForm}
              >
                Close
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ color: "#FF6600", mb: 2 }}>
                Before adopting pet you have to login for website.
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                sx={{ backgroundColor: "#FF6600", color: "white" }}
              >
                Go to Login
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PetList;