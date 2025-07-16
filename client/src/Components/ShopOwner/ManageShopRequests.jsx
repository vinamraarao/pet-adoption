import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageShopRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const shopOwnerId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      if (!shopOwnerId) {
        throw new Error("Shop owner ID not found. Please log in again.");
      }
      console.log("Fetching requests for shop owner ID:", shopOwnerId);
      const response = await axios.get("http://localhost:5000/api/serviceManager/requests", {
        headers: {
          "user-id": shopOwnerId,
        },
      });
      console.log("Fetched requests:", response.data);

      // Sort requests: unread first, then by createdAt (newest first)
      const sortedRequests = response.data.sort((a, b) => {
        if (a.read !== b.read) {
          return a.read ? 1 : -1; // Unread (false) comes first
        }
        return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
      });

      setRequests(sortedRequests);
      setError(null);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError(error.response?.data?.error || error.message);
      if (error.message.includes("Shop owner ID not found")) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [shopOwnerId, navigate]);

  const handleAction = async (requestId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/shopOwner/request/${requestId}`, { status });
      setRequests(requests.filter((req) => req._id !== requestId));
      alert(`Request ${status}!`);
      fetchRequests(); // Refresh the list after action
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to update request: " + (error.response?.data?.error || error.message));
    }
  };

  // Group requests by service type
  const dogWalkingRequests = requests
    .filter((request) => request.serviceType === "Dog Walking")
    .sort((a, b) => {
      if (a.read !== b.read) {
        return a.read ? 1 : -1; // Unread (false) comes first
      }
      return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
    });

  const petGroomingRequests = requests
    .filter((request) => request.serviceType === "Pet Grooming")
    .sort((a, b) => {
      if (a.read !== b.read) {
        return a.read ? 1 : -1; // Unread (false) comes first
      }
      return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
    });

  const petCaringRequests = requests
    .filter((request) => request.serviceType === "Pet Caring")
    .sort((a, b) => {
      if (a.read !== b.read) {
        return a.read ? 1 : -1; // Unread (false) comes first
      }
      return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
    });

  const renderRequestCard = (request) => (
    <Paper
      sx={{
        padding: 3,
        marginBottom: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: request.read ? "#f5f5f5" : "#fff",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Typography variant="h6" sx={{ color: request.read ? "gray" : "#f28c38", fontWeight: "bold" }}>
        {request.serviceType} - {request.petName} ({request.petType})
      </Typography>
      <Typography variant="body2" sx={{ color: "gray" }}>
        User: {request.userName} ({request.userId?.email})
      </Typography>
      <Typography variant="body2" sx={{ color: "gray" }}>
        Contact: {request.userContact}
      </Typography>
      {request.petBreed && (
        <Typography variant="body2" sx={{ color: "gray" }}>
          Pet Breed: {request.petBreed}
        </Typography>
      )}
      <Typography variant="body2" sx={{ color: "gray" }}>
        Address: {request.address}
      </Typography>
      <Typography variant="body2" sx={{ color: "gray" }}>
        Time: {request.time}
      </Typography>
      {request.careDuration && (
        <Typography variant="body2" sx={{ color: "gray" }}>
          Care Duration: {request.careDuration} hours
        </Typography>
      )}
      {request.specialInstructions && (
        <Typography variant="body2" sx={{ color: "gray" }}>
          Special Instructions: {request.specialInstructions}
        </Typography>
      )}
      <Typography variant="body2" sx={{ color: "gray" }}>
        Status: {request.status}
      </Typography>
      <Typography variant="body2" sx={{ color: "gray" }}>
        Requested On: {new Date(request.createdAt).toLocaleString()}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ mr: 2 }}
          onClick={() => handleAction(request._id, "Accepted")}
          disabled={request.status !== "Assigned to Pet Shop"}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleAction(request._id, "Rejected")}
          disabled={request.status !== "Assigned to Pet Shop"}
        >
          Reject
        </Button>
      </Box>
    </Paper>
  );

  const renderRequestSection = (sectionTitle, requestList) => (
    <Box sx={{ height: "100%", padding: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 2, color: "#f28c38", textAlign: "center" }}
      >
        {sectionTitle}
      </Typography>
      {requestList.length === 0 ? (
        <Typography variant="body1" sx={{ color: "#616161", textAlign: "center" }}>
          No {sectionTitle.toLowerCase()} requests available.
        </Typography>
      ) : (
        requestList.map((request) => (
          <Box key={request._id}>
            {renderRequestCard(request)}
          </Box>
        ))
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        padding: 5,
        minHeight: "calc(100vh - 64px - 64px)",
        backgroundColor: "#fff3e0",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 3, color: "#f28c38", textAlign: "center" }}
      >
        Manage Shop Requests
      </Typography>

      {error ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 64px - 64px)",
          }}
        >
          <Typography variant="body1" sx={{ color: "#d32f2f" }}>
            {error}
          </Typography>
        </Box>
      ) : requests.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 64px - 64px)",
          }}
        >
          <Typography variant="body1" sx={{ color: "#616161" }}>
            No pending requests.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            {renderRequestSection("Dog Walking", dogWalkingRequests)}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderRequestSection("Pet Grooming", petGroomingRequests)}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderRequestSection("Pet Caring", petCaringRequests)}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ManageShopRequests;