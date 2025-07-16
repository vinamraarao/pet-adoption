import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Grid, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import petAdoptionBg from "../Assets/pet_adoption_bg.png.jpg"; // Corrected path

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login with:", { email, password });
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userId", response.data.userId);
        console.log("Stored in localStorage:", {
          token: response.data.token,
          role: response.data.role,
          userId: response.data.userId,
        });

        console.log("Verifying localStorage after setting:", {
          token: localStorage.getItem("token"),
          role: localStorage.getItem("role"),
          userId: localStorage.getItem("userId"),
        });

        try {
          const verifyResponse = await axios.get("http://localhost:5000/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          });
          console.log("Token verification response:", verifyResponse.data);

          setTimeout(() => {
            const targetPath =
              response.data.role === "service-manager"
                ? "/service-manager/dashboard"
                : response.data.role === "shop-owner"
                ? "/shop-owner/dashboard"
                : response.data.role === "admin"
                ? "/admin/dashboard"
                : response.data.role === "doctor"
                ? "/doctor/dashboard"
                : "/";
            console.log("Navigating to:", targetPath);
            navigate(targetPath, { replace: true });
          }, 100);
        } catch (verifyError) {
          console.error("Token verification failed:", verifyError.response?.data || verifyError.message);
          alert("Invalid token. Please try logging in again.");
          localStorage.clear();
        }
      } else {
        alert("Login failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error logging in", error.response?.data || error.message);
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
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
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
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
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  backgroundColor: "#f97316",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems릿: "center",
                  justifyContent: "center",
                  padding: "40px",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Hello, Welcome!
                </Typography>
                <Typography sx={{ marginTop: "10px" }}>
                  Create an account to get started.
                </Typography>
                <Button
                  onClick={() => navigate("/register")}
                  variant="outlined"
                  sx={{
                    marginTop: "20px",
                    borderColor: "white",
                    color: "white",
                    "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255, 255, 255, 0.1)" },
                  }}
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={12} md={6} sx={{ padding: "40px" }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#f97316" }}>
                  Login
                </Typography>
                <form onSubmit={handleSubmit}>
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
                      "& .MuiOutlinedInput-root": { // Fixed typo
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
                    Login
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;