import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PetAdoptForm = ({ closeForm, pet }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Before adopting pet you have to login for website.");
      console.log("Unauthorized adoption attempt blocked for pet:", pet._id);
      closeForm();
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Before adopting pet you have to login for website.");
      console.log("No userId found, adoption blocked for pet:", pet._id);
      closeForm();
      return;
    }

    console.log("Submitting adoption request with data:", {
      petId: pet._id,
      petName: pet.name,
      petType: pet.petType,
      userId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      reason: formData.reason,
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/adoption-requests/add",
        {
          petId: pet._id,
          petName: pet.name,
          petType: pet.petType,
          userId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          reason: formData.reason,
        }
      ); // Line ~104
      alert("✅ Adoption request submitted successfully!");
      closeForm();
    } catch (error) {
      console.error("❌ Error submitting adoption request:", error.response?.data || error.message);
      alert(
        "❌ Failed to submit adoption request: " +
          (error.response?.data?.message || "Please try again.")
      ); // Line ~118
    }
  };

  if (!isLoggedIn) {
    return (
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography variant="h6" sx={{ color: "#FF6600", mb: 2 }}>
          Before adopting pet you have to login for website.
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{ backgroundColor: "#FF6600", color: "white" }}
          onClick={closeForm}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ color: "#FF6600", mb: 2 }}>
        Adopt {pet.name}
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <TextField
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Reason for Adoption"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#FF6600",
            "&:hover": { backgroundColor: "#e65c00" },
            mt: 2,
          }}
        >
          Submit Request
        </Button>
      </form>
    </Box>
  );
};

export default PetAdoptForm;