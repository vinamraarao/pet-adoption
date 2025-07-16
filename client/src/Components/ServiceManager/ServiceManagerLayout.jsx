import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PetsIcon from "@mui/icons-material/Pets";

// Create an orange theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#f28c38", // Orange color
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffcc80", // Light orange
    },
    background: {
      default: "#fff3e0", // Very light orange background
    },
  },
});

const ServiceManagerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if we're on the dashboard route
  const isDashboard = location.pathname === "/service-manager/dashboard";

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Back to Dashboard function
  const handleBack = () => {
    navigate("/service-manager/dashboard");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <PetsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Service Manager Panel
          </Typography>
          {/* Show "Back to Dashboard" button only if not on the dashboard */}
          {!isDashboard && (
            <Button color="inherit" onClick={handleBack}>
              Back to Dashboard
            </Button>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Outlet /> {/* Renders the child routes (Dashboard or ManageServiceRequests) */}

      {/* Footer */}
      <Box
        sx={{
          mt: 4,
          py: 2,
          textAlign: "center",
          backgroundColor: "#f28c38",
          color: "white",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Pet Service Manager. All rights reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default ServiceManagerLayout;