import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Grid, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import petAdoptionBg from "../Assets/pet_adoption_bg.png.jpg"; // Corrected path

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });

      console.log(response.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user", error.response?.data || error.message);
      alert(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${petAdoptionBg})`, // Reference the imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={6}
            sx={{
              display: "flex",
              borderRadius: "25px",
              overflow: "hidden",
              maxWidth: "800px",
              margin: "auto",
              backgroundColor: "rgba(255, 253, 253, 0.3)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Grid container>
              <Grid item xs={12} md={6} sx={{ padding: "40px" }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#f97316" }}>
                  Registration
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#f97316" },
                        "&:hover fieldset": { borderColor: "#ea580c" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#f97316" },
                        "&:hover fieldset": { borderColor: "#ea580c" },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#f97316" },
                        "&:hover fieldset": { borderColor: "#ea580c" },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      marginTop: "20px",
                      padding: "10px",
                      fontSize: "16px",
                      backgroundColor: "#f97316",
                      "&:hover": { backgroundColor: "#ea580c" },
                    }}
                    fullWidth
                  >
                    Register
                  </Button>
                </form>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  backgroundColor: "#f97316",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Welcome Back!
                </Typography>
                <Typography sx={{ marginTop: "10px" }}>
                  Already have an account?
                </Typography>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outlined"
                  sx={{
                    marginTop: "20px",
                    borderColor: "white",
                    color: "white",
                    "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255, 255, 255, 0.1)" },
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;