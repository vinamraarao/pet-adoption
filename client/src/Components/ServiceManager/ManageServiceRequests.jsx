import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [shopOwners, setShopOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedShopOwner, setSelectedShopOwner] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [requestsResponse, ownersResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/serviceManager/requests"),
          axios.get("http://localhost:5000/api/shopOwner/shop-owners")
        ]);
        console.log("Fetched service requests:", requestsResponse.data);
        console.log("Fetched shop owners:", ownersResponse.data);
        setRequests(requestsResponse.data);
        setShopOwners(ownersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data: " + (error.response?.data?.error || error.message));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpen = (request) => {
    setSelectedRequest(request);
    setSelectedShopOwner("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequest(null);
    setSelectedShopOwner("");
  };

  const handleAssign = async () => {
    try {
      if (!selectedShopOwner) {
        alert("Please select a shop owner.");
        return;
      }

      console.log("Assigning request:", {
        requestId: selectedRequest._id,
        petShopId: selectedShopOwner,
      });

      const response = await axios.post("http://localhost:5000/api/serviceManager/assign", {
        requestId: selectedRequest._id,
        petShopId: selectedShopOwner,
      });

      console.log("Assignment response:", response.data);

      setRequests(requests.map((req) =>
        req._id === selectedRequest._id ? response.data.request : req
      ));
      alert("Request assigned successfully!");
      handleClose();
    } catch (error) {
      console.error("Error assigning request:", error);
      alert("Failed to assign request: " + (error.response?.data?.error || error.message));
    }
  };

  const sortRequests = (a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  };

  const groupedRequests = {
    "Dog Walking": requests.filter((r) => r.serviceType === "Dog Walking").sort(sortRequests),
    "Pet Grooming": requests.filter((r) => r.serviceType === "Pet Grooming").sort(sortRequests),
    "Pet Caring": requests.filter((r) => r.serviceType === "Pet Caring").sort(sortRequests),
  };

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
        "&:hover": { transform: "scale(1.02)", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)" },
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
      {request.petBreed && <Typography variant="body2" sx={{ color: "gray" }}>Pet Breed: {request.petBreed}</Typography>}
      <Typography variant="body2" sx={{ color: "gray" }}>Address: {request.address}</Typography>
      <Typography variant="body2" sx={{ color: "gray" }}>Time: {request.time}</Typography>
      {request.careDuration && <Typography variant="body2" sx={{ color: "gray" }}>Care Duration: {request.careDuration} hours</Typography>}
      {request.specialInstructions && <Typography variant="body2" sx={{ color: "gray" }}>Special Instructions: {request.specialInstructions}</Typography>}
      <Typography variant="body2" sx={{ color: "gray" }}>Status: {request.status}</Typography>
      <Typography variant="body2" sx={{ color: "gray" }}>
        Assigned Pet Shop: {request.assignedPetShop?.name || "Not assigned"}
      </Typography>
      <Typography variant="body2" sx={{ color: "gray" }}>
        Requested On: {new Date(request.createdAt).toLocaleString()}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen(request)}
          disabled={request.status !== "Pending"}
        >
          Assign to Pet Shop
        </Button>
      </Box>
    </Paper>
  );

  const renderRequestSection = (sectionTitle, requestList) => (
    <Box sx={{ height: "100%", padding: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#f28c38", textAlign: "center" }}>
        {sectionTitle}
      </Typography>
      {requestList.length === 0 ? (
        <Typography variant="body1" sx={{ color: "#616161", textAlign: "center" }}>
          No {sectionTitle.toLowerCase()} requests available.
        </Typography>
      ) : (
        requestList.map((request) => (
          <Box key={request._id}>{renderRequestCard(request)}</Box>
        ))
      )}
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ padding: 5, textAlign: "center", minHeight: "calc(100vh - 64px - 64px)", backgroundColor: "#fff3e0" }}>
        <Typography variant="h6" sx={{ color: "#f28c38" }}>Loading requests...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 5, minHeight: "calc(100vh - 64px - 64px)", backgroundColor: "#fff3e0" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#f28c38", textAlign: "center" }}>
        Manage Service Requests
      </Typography>

      {requests.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 64px - 64px)" }}>
          <Typography variant="body1" sx={{ color: "#616161" }}>No requests available.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>{renderRequestSection("Dog Walking", groupedRequests["Dog Walking"])}</Grid>
          <Grid item xs={12} md={4}>{renderRequestSection("Pet Grooming", groupedRequests["Pet Grooming"])}</Grid>
          <Grid item xs={12} md={4}>{renderRequestSection("Pet Caring", groupedRequests["Pet Caring"])}</Grid>
        </Grid>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Assign Request to Pet Shop</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Select Pet Shop"
            value={selectedShopOwner}
            onChange={(e) => setSelectedShopOwner(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          >
            {shopOwners.map((owner) => (
              <MenuItem key={owner._id} value={owner._id}>{owner.name}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleAssign} color="primary">Assign</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageServiceRequests;