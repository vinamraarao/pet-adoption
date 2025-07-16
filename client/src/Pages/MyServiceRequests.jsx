import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to view your requests.");
      navigate("/login");
      return;
    }

    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`http://localhost:5000/api/serviceManager/user-requests/${userId}`);
        setRequests(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch your service requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [navigate]);

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "1400px",
        margin: "auto",
        mt: 2,
        backgroundColor: "#fff3e0",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, textAlign: "center", fontWeight: "bold", color: "#f28c38" }}
      >
        My Service Requests
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 64px - 64px)",
          }}
        >
          <Typography variant="body1" sx={{ color: "#616161" }}>
            Loading...
          </Typography>
        </Box>
      ) : error ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 64px - 64px)",
          }}
        >
          <Box
            sx={{
              border: "2px solid #ffcc80",
              borderRadius: 2,
              p: 3,
              backgroundColor: "white",
              textAlign: "center",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Typography variant="body1" sx={{ color: "#d32f2f" }}>
              {error}
            </Typography>
          </Box>
        </Box>
      ) : requests.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 64px - 64px)",
          }}
        >
          <Typography variant="body1" sx={{ color: "#616161", mb: 2 }}>
            No Service Requests Found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {requests.map((req) => (
            <Grid item xs={12} sm={6} md={4} key={req._id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 2,
                      color: "#f28c38",
                      borderBottom: "2px solid #ffcc80",
                      pb: 1,
                    }}
                  >
                    {req.serviceType}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: "#e65100" }}>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        backgroundColor:
                          req.status === "Pending"
                            ? "#ff9800"
                            : req.status === "Accepted"
                            ? "#4caf50"
                            : req.status === "Rejected"
                            ? "#d32f2f"
                            : "#757575",
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {req.status}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Pet Details:</strong> {req.petDetails}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Time:</strong> {new Date(req.time).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Address:</strong> {req.address}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Pet Shop:</strong>{" "}
                    <span
                      style={{
                        color: req.assignedPetShop ? "#4caf50" : "#757575",
                      }}
                    >
                      {req.assignedPetShop?.name || "Not Assigned"}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyServiceRequests;