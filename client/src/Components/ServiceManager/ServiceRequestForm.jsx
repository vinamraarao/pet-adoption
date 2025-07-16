import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import petwalking from "../../Assets/petwalking.png";
import petgrooming from "../../Assets/petgrooming.png";
import petcareing from "../../Assets/petcareing.png";
import axios from "axios";

const services = [
  { title: "Dog Walking", description: "Ensure your furry friend gets their daily exercise with our trusted dog walking service.", image: petwalking },
  { title: "Pet Grooming", description: "Pamper your pet with a fresh haircut and spa session.", image: petgrooming },
  { title: "Pet Caring", description: "Need someone to look after your pet while you're away?", image: petcareing },
];

const ServiceRequestForm = () => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const firstFocusableElement = useRef(null);

  const handleOpen = (service) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to request a service.");
      navigate("/login");
      return;
    }
    setSelectedService(service);
    setFormData({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not authenticated. Please log in again.");
        navigate("/login");
        return;
      }

      const payload = {
        userId,
        userName: formData.name,
        userContact: formData.contact,
        serviceType: selectedService,
        petName: formData.petName,
        petType: formData.petType,
        petBreed: formData.petBreed || null,
        address: formData.address,
        time: formData.walkTime || formData.groomingType || formData.careDuration,
        careDuration: formData.careDuration || null,
        specialInstructions: formData.specialInstructions || null,
      };

      console.log("Submitting payload:", payload);

      const response = await axios.post("http://localhost:5000/api/serviceManager/request", payload);
      console.log("Service Requested:", response.data);
      alert("Service request submitted successfully!");
      handleClose();
    } catch (error) {
      console.error("Error submitting service request:", error.response?.data || error.message);
      alert(`Failed to submit request: ${error.response?.data?.error || error.message}`);
    }
  };

  useEffect(() => {
    if (open && firstFocusableElement.current) {
      firstFocusableElement.current.focus();
    }
  }, [open]);

  const renderFormFields = () => {
    return (
      <>
        <TextField
          inputRef={firstFocusableElement}
          label="Your Name"
          variant="outlined"
          fullWidth
          required
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          required
          value={formData.contact || ""}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
        />
        <TextField
          label="Pet Name"
          variant="outlined"
          fullWidth
          required
          value={formData.petName || ""}
          onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
        />
        <TextField
          label="Pet Type"
          variant="outlined"
          fullWidth
          required
          value={formData.petType || ""}
          onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          required
          value={formData.address || ""}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        {selectedService === "Dog Walking" && (
          <TextField
            label="Preferred Walking Time"
            select
            fullWidth
            required
            value={formData.walkTime || ""}
            onChange={(e) => setFormData({ ...formData, walkTime: e.target.value })}
          >
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Afternoon">Afternoon</MenuItem>
            <MenuItem value="Evening">Evening</MenuItem>
          </TextField>
        )}
        {selectedService === "Pet Grooming" && (
          <>
            <TextField
              label="Grooming Type"
              select
              fullWidth
              required
              value={formData.groomingType || ""}
              onChange={(e) => setFormData({ ...formData, groomingType: e.target.value })}
            >
              <MenuItem value="Haircut">Haircut</MenuItem>
              <MenuItem value="Full Grooming">Full Grooming</MenuItem>
              <MenuItem value="Bath Only">Bath Only</MenuItem>
            </TextField>
            <TextField
              label="Pet Breed"
              variant="outlined"
              fullWidth
              required
              value={formData.petBreed || ""}
              onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
            />
          </>
        )}
        {selectedService === "Pet Caring" && (
          <>
            <TextField
              label="Care Duration (Hours)"
              type="number"
              variant="outlined"
              fullWidth
              required
              value={formData.careDuration || ""}
              onChange={(e) => setFormData({ ...formData, careDuration: e.target.value })}
            />
            <TextField
              label="Special Instructions"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={formData.specialInstructions || ""}
              onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
            />
          </>
        )}
      </>
    );
  };

  return (
    <Box sx={{ maxWidth: "900px", margin: "auto", padding: 5 }}>
      <Grid container spacing={5} direction="column" alignItems="center">
        {services.map((service, index) => (
          <Grid item xs={12} key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <motion.div
              whileHover={{ scale: 1.1, y: -15, transition: { type: "spring", stiffness: 300 } }}
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50px",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Box component="img" src={service.image} alt={service.title} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </motion.div>

            <Box sx={{ backgroundColor: "#fff", boxShadow: 3, borderRadius: "20px", padding: 4, width: "100%", maxWidth: "500px" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>{service.title}</Typography>
              <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>{service.description}</Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#FFA500", fontWeight: "bold", borderRadius: "8px", padding: "10px 20px", "&:hover": { backgroundColor: "#ff9100" } }}
                onClick={() => handleOpen(service.title)}
              >
                Apply Now
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="service-request-dialog-title"
        aria-describedby="service-request-dialog-description"
      >
        <DialogTitle id="service-request-dialog-title">Request {selectedService} Service</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: "400px" }}>
            {renderFormFields()}
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit Request
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ServiceRequestForm;

