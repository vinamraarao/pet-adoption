import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";

const AdoptingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/adoption-requests")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("❌ Error fetching adoption requests:", error);
      });
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/adoption-requests/approve/${id}`);
      setRequests(requests.filter((r) => r._id !== id));
      alert("✅ Pet request approved and saved in Adopted History!");
    } catch (error) {
      console.error("❌ Error approving request:", error);
      alert("❌ Error approving request.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/adoption-requests/reject/${id}`);
      setRequests(requests.filter((request) => request._id !== id));
      alert("❌ Pet request rejected and removed from adoption request.");
    } catch (error) {
      console.error("❌ Error rejecting request:", error);
      alert("❌ Error rejecting request.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ color: "#ff9800", fontWeight: "bold", mb: 3 }}>
        Adoption Requests
      </Typography>

      {requests.length === 0 ? (
        <Typography variant="h6" sx={{ color: "gray" }}>
          No adoption requests yet.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {requests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request._id}>
              <Card
                sx={{
                  border: "2px solid #ff9800",
                  borderRadius: "10px",
                  boxShadow: 3,
                  p: 2,
                  backgroundColor: "#fff3e0",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {request.petImage && (
                    <img
                      src={`http://localhost:5000/${request.petImage}`}
                      alt={request.petName}
                      style={{ width: "100%", height: "auto", marginBottom: "10px" }}
                    />
                  )}
                  <Typography
                    variant="h6"
                    sx={{ color: "#ff9800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {request.petName}
                  </Typography>
                  <Typography>
                    <strong>Pet Type:</strong> {request.petType}
                  </Typography>
                  <Typography>
                    <strong>Adopter Name:</strong> {request.name}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {request.email}
                  </Typography>
                  <Typography>
                    <strong>Phone:</strong> {request.phone}
                  </Typography>
                  <Typography>
                    <strong>Reason:</strong> {request.reason}
                  </Typography>
                </CardContent>

                <CardContent sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#5cb85c", "&:hover": { backgroundColor: "#4cae4c" } }}
                    onClick={() => handleApprove(request._id)}
                  >
                    Approve
                  </Button>

                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#d9534f", "&:hover": { backgroundColor: "#c9302c" } }}
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdoptingRequests;