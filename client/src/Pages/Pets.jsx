import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Select, MenuItem, CircularProgress } from "@mui/material";
import PetList from "./PetList";

const Pets = () => {
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pets/availablePets");
        setPetsData(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Filter pets based on selected type
  const filteredPets = petsData.filter((pet) =>
    filter === "all" ? true : pet.petType.toLowerCase() === filter.toLowerCase()
  );

  return (
    <Box textAlign="center" p={3} sx={{ backgroundColor: "#FFF8E1", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ color: "#FF6600", mb: 3 }}>
        🐾 Available Pets for Adoption 🐾
      </Typography>

      {/* Filter Dropdown */}
      {/* <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{
          mb: 3,
          minWidth: 220,
          bgcolor: "#FFA726",
          color: "white",
          borderRadius: 2,
          "&:hover": { bgcolor: "#FB8C00" },
          "& .MuiSelect-icon": { color: "white" },
        }}
      >
        <MenuItem value="all">All Pets</MenuItem>
        <MenuItem value="Dog">Dogs</MenuItem>
        <MenuItem value="Cat">Cats</MenuItem>
        <MenuItem value="Rabbit">Rabbits</MenuItem>
      </Select> */}

      {loading ? (
        <CircularProgress sx={{ color: "#FF6600" }} />
      ) : (
        <PetList pets={filteredPets} />
      )}
    </Box>
  );
};

export default Pets;