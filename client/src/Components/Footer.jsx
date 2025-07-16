import React from "react";
import { Box, Typography, Grid, Link, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import logo from "../Assets/logo.png"; // Same logo as Navbar.jsx

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)",
        color: "#333",
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 4 },
        mt: "auto",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
        borderTop: "3px solid #FFA500",
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: "1200px", mx: "auto" }}>
        {/* Branding Section */}
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <img src={logo} alt="PawFinds Logo" style={{ width: "40px", height: "40px", marginRight: "10px" }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#FFA500",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              PawFinds
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "#555",
              lineHeight: 1.6,
              maxWidth: "300px",
            }}
          >
            Connecting pets with loving families. Adopt, foster, and make a difference with PawFinds.
          </Typography>
        </Grid>

        {/* Navigation Links */}
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#FFA500",
              mb: 2,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {[
              { to: "/", label: "Home" },
              { to: "/services", label: "Services" },
              { to: "/pets", label: "Pets" },
              { to: "/contact", label: "Contact Us" },
              { to: "/request-service", label: "Request a Service" },
            ].map((link) => (
              <Link
                key={link.to}
                component={RouterLink}
                to={link.to}
                sx={{
                  color: "#333",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.3s, transform 0.3s",
                  "&:hover": {
                    color: "#FFA500",
                    transform: "translateX(5px)",
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} sm={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#FFA500",
              mb: 2,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", mb: 1 }}>
            Email: <Link href="mailto:support@pawfinds.com" sx={{ color: "#FFA500", textDecoration: "none" }}>
              support@pawfinds.com
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
            Phone: <Link href="tel:+11234567890" sx={{ color: "#FFA500", textDecoration: "none" }}>
              +91 9019364733
            </Link>
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#555", fontWeight: "medium", mb: 1 }}
          >
            Follow us:
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {[
              { href: "https://facebook.com", icon: <Facebook />, label: "Facebook" },
              { href: "https://twitter.com", icon: <Twitter />, label: "Twitter" },
              { href: "https://instagram.com", icon: <Instagram />, label: "Instagram" },
            ].map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                sx={{
                  color: "#333",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.3s, transform 0.3s",
                  "&:hover": {
                    color: "#FFA500",
                    transform: "scale(1.2)",
                  },
                }}
              >
                {React.cloneElement(social.icon, {
                  sx: { fontSize: "24px" },
                })}
              </Link>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 4, backgroundColor: "#ddd" }} />

      {/* Copyright */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="body2"
          sx={{
            color: "#555",
            fontSize: "0.9rem",
          }}
        >
          © {new Date().getFullYear()} PawFinds. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;