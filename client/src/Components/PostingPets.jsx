import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Grid,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const PostingPets = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [petType, setPetType] = useState("");
  const [location, setLocation] = useState("");
  const [petTypes, setPetTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pets/requests")
      .then(({ data }) => {
        console.log("Fetched pet requests:", data);
        setRequests(data);
        setFilteredRequests(data);
        setPetTypes([...new Set(data.map((req) => req.petType))].sort());
        setLocations([...new Set(data.map((req) => req.location))].sort());
      })
      .catch((error) => console.log("❌ Error fetching pet requests:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredRequests(
      requests.filter(
        (req) =>
          (!petType || req.petType === petType) &&
          (!location || req.location === location)
      )
    );
  }, [petType, location, requests]);

  const handleAction = async (id, action) => {
    try {
      await axios.put(`http://localhost:5000/api/pets/${action === "send" ? "sendToDoctor" : "reject"}/${id}`);
      alert(action === "send" ? "✅ Pet sent for verification!" : "❌ Pet request rejected!");
      setRequests(requests.filter((req) => req._id !== id));
      setFilteredRequests(filteredRequests.filter((req) => req._id !== id));
    } catch (error) {
      console.error(`❌ Error ${action}ing pet:`, error);
      alert(`❌ Failed to ${action} pet: ${error.response?.data?.message || error.message}`);
    }
  };

  const clearFilters = () => {
    setPetType("");
    setLocation("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ color: "#ff9800", fontWeight: "bold", mb: 2 }}>
        Manage Pet Requests
      </Typography>

      <Box sx={{ mb: 2, display: "flex", gap: 2, justifyContent: "center" }}>
        <FormControl sx={{ width: 150 }}>
          <Select
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            displayEmpty
            sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ff9800" } }}
          >
            <MenuItem value="">All Types</MenuItem>
            {petTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 150 }}>
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            displayEmpty
            sx={{ "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ff9800" } }}
          >
            <MenuItem value="">All Locations</MenuItem>
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>{loc}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={clearFilters}
          sx={{ borderColor: "#ff9800", color: "#ff9800" }}
        >
          Clear
        </Button>
      </Box>

      {loading ? (
        <CircularProgress sx={{ color: "#ff9800" }} />
      ) : filteredRequests.length === 0 ? (
        <Typography variant="h6" sx={{ color: "gray" }}>
          {petType || location ? "No matching pet requests." : "No pet requests available."}
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {filteredRequests.map(
            ({
              _id,
              name,
              petType,
              age,
              location,
              justification,
              email,
              phone,
              petImage,
              petImageMimeType,
              vaccinationFile,
              vaccinationFileMimeType,
            }) => (
              <Grid item xs={12} sm={6} md={4} key={_id}>
                <Card sx={{ border: "2px solid #ff9800", borderRadius: 2, backgroundColor: "#fff3e0" }}>
                  <CardContent>
                    {petImage && petImageMimeType ? (
                      <img
                        src={`data:${petImageMimeType};base64,${petImage}`}
                        alt={name}
                        style={{ width: "100%", height: "auto", mb: 1 }}
                      />
                    ) : (
                      <Typography sx={{ color: "gray" }}>No image</Typography>
                    )}
                    <Typography variant="h6" sx={{ color: "#ff9800", fontWeight: "bold" }}>
                      {name}
                    </Typography>
                    <Typography sx={{ color: "gray" }}>Type: {petType}</Typography>
                    <Typography sx={{ color: "gray" }}>Age: {age}</Typography>
                    <Typography sx={{ color: "gray" }}>Location: {location}</Typography>
                    <Typography sx={{ color: "gray" }}>Justification: {justification}</Typography>
                    <Typography sx={{ color: "gray" }}>Email: {email}</Typography>
                    <Typography sx={{ color: "gray" }}>Phone: {phone}</Typography>
                    {vaccinationFile && vaccinationFileMimeType ? (
                      <Typography sx={{ color: "gray", mt: 1 }}>
                        Vaccination: <a href={`data:${vaccinationFileMimeType};base64,${vaccinationFile}`} target="_blank" style={{ color: "#ff9800" }}>View</a>
                      </Typography>
                    ) : (
                      <Typography sx={{ color: "gray", mt: 1 }}>No vaccination file</Typography>
                    )}
                  </CardContent>
                  <CardContent sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      sx={{ flex: 1, backgroundColor: "#ff9800", "&:hover": { backgroundColor: "#e68900" } }}
                      onClick={() => handleAction(_id, "send")}
                    >
                      Send
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ flex: 1, backgroundColor: "#d9534f", "&:hover": { backgroundColor: "#c9302c" } }}
                      onClick={() => handleAction(_id, "reject")}
                    >
                      Reject
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      )}
    </Container>
  );
};

export default PostingPets;