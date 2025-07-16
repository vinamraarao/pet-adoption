import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Select, MenuItem, Typography, Box } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

const PostPetSection = () => {
  const isLoggedIn = !!localStorage.getItem("token"); // Check for auth token
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    petType: "",
    justification: "",
    email: "",
    phone: "",
  });
  const [petImage, setPetImage] = useState(null);
  const [vaccinationFile, setVaccinationFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePetImageChange = (e) => {
    setPetImage(e.target.files[0]);
  };

  const handleVaccinationFileChange = (e) => {
    setVaccinationFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!petImage) {
      alert("❌ Please upload a pet image.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("location", formData.location);
    data.append("petType", formData.petType);
    data.append("justification", formData.justification);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("petImage", petImage);
    if (vaccinationFile) {
      data.append("vaccinationFile", vaccinationFile);
    }
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("❌ User not authenticated.");
      return;
    }
    data.append("userId", userId);

    try {
      const response = await axios.post("http://localhost:5000/api/pets/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Pet submission response:", response.data);
      alert("✅ Pet submitted successfully!");
      setFormData({
        name: "",
        age: "",
        location: "",
        petType: "",
        justification: "",
        email: "",
        phone: "",
      });
      setPetImage(null);
      setVaccinationFile(null);
      document.getElementById("petImage").value = "";
      document.getElementById("vaccinationFile").value = "";
    } catch (error) {
      console.error("Error saving pet:", error.response?.data || error.message);
      alert("❌ Failed to submit pet: " + (error.response?.data?.message || "Please try again."));
    }
  };

  if (!isLoggedIn) {
    return (
      <Box sx={{ width: "45%", margin: "auto", padding: "20px", textAlign: "center" }}>
        <Typography variant="h5" sx={{ color: "#f7931e", mb: 2 }}>
          If you want to post a pet, you have to login.
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{ backgroundColor: "#f7931e", color: "white" }}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <div style={{ width: "45%", textAlign: "center", margin: "auto", padding: "20px" }}>
      <h2 style={{ color: "#f7931e", borderBottom: "2px solid #f7931e", paddingBottom: "5px", marginBottom: "20px" }}>
        Post a Pet for Adoption
      </h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" }}>
        <TextField label="Name" name="name" variant="outlined" fullWidth style={{ width: "80%" }} value={formData.name} onChange={handleChange} />
        <TextField label="Pet Age" name="age" variant="outlined" fullWidth style={{ width: "80%" }} value={formData.age} onChange={handleChange} />
        <TextField label="Location" name="location" variant="outlined" fullWidth style={{ width: "80%" }} value={formData.location} onChange={handleChange} />
        <Select name="petType" value={formData.petType} onChange={handleChange} displayEmpty fullWidth style={{ width: "80%" }}>
          <MenuItem value="">Select Pet Type</MenuItem>
          <MenuItem value="Dog">Dog</MenuItem>
          <MenuItem value="Cat">Cat</MenuItem>
          <MenuItem value="Rabbit">Rabbit</MenuItem>
        </Select>
        <TextField label="Justification" name="justification" multiline rows={3} variant="outlined" fullWidth style={{ width: "80%" }} value={formData.justification} onChange={handleChange} />
        <TextField label="Email" name="email" variant="outlined" fullWidth style={{ width: "80%" }} value={formData.email} onChange={handleChange} />
        <TextField label="Phone" name="phone" variant="outlined" fullWidth style={{ width: "80%" }} value={formData.phone} onChange={handleChange} />
        <div style={{ width: "80%", textAlign: "left" }}>
          <label htmlFor="petImage" style={{ color: "#333" }}>Pet Image (Max 10MB, Required):</label>
          <input type="file" id="petImage" name="petImage" accept="image/*" onChange={handlePetImageChange} style={{ width: "100%", marginTop: "5px" }} />
        </div>
        <div style={{ width: "80%", textAlign: "left" }}>
          <label htmlFor="vaccinationFile" style={{ color: "#333" }}>Vaccination File (PDF or Image, Max 10MB, Optional):</label>
          <input type="file" id="vaccinationFile" name="vaccinationFile" accept="application/pdf,image/*" onChange={handleVaccinationFileChange} style={{ width: "100%", marginTop: "5px" }} />
        </div>
        <Button type="submit" variant="contained" style={{ backgroundColor: "#f7931e", color: "white", width: "80%", marginTop: "20px", padding: "10px 20px", fontSize: "16px", borderRadius: "4px" }}>
          Submit Your Pet
        </Button>
      </form>
    </div>
  );
};

export default PostPetSection;