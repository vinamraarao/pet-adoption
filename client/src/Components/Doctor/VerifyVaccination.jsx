import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, TextField, Box, Modal, Grid } from "@mui/material";
import DoctorNavbar from "./DoctorNavbar";

const VerifyVaccination = () => {
  const [pets, setPets] = useState([]);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [showAppointmentPopup, setShowAppointmentPopup] = useState(false);
  const [showPrescriptionPopup, setShowPrescriptionPopup] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
    location: "",
    notes: "",
  });
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetsForVerification = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/doctor/verificationPending");
        console.log("Fetched pets for verification:", response.data);
        setPets(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pets for verification:", error);
        setError("Failed to load pets. Please try again later.");
        setLoading(false);
      }
    };
    fetchPetsForVerification();
  }, []);

  const handleVerify = async (petId, status) => {
    if (status === "rejected") {
      setSelectedPetId(petId);
      setShowRejectPopup(true);
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/doctor/verify/${petId}`, { status });
      alert(`✅ Pet ${status} successfully! User will be notified.`);
      setPets(pets.filter((pet) => pet._id !== petId));
    } catch (error) {
      console.error("Error updating pet status:", error);
      alert("❌ Failed to update pet status.");
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      alert("❌ Please provide a reason for rejection!");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/doctor/verify/${selectedPetId}`, {
        status: "rejected",
        rejectReason,
      });
      alert("❌ Pet rejected successfully! User will be notified.");
      setPets(pets.filter((pet) => pet._id !== selectedPetId));
      setShowRejectPopup(false);
      setRejectReason("");
      setSelectedPetId(null);
    } catch (error) {
      console.error("Error rejecting pet:", error);
      alert("❌ Failed to reject pet.");
    }
  };

  const handleProvideVaccination = (petId) => {
    setSelectedPetId(petId);
    setShowAppointmentPopup(true);
  };

  const handleAppointmentSubmit = async () => {
    if (!appointmentDetails.date || !appointmentDetails.time || !appointmentDetails.location) {
      alert("❌ Please fill in all required appointment fields!");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/doctor/scheduleAppointment/${selectedPetId}`, {
        appointmentDetails,
      });
      alert("✅ Appointment scheduled successfully! User will be notified.");
      setPets(pets.map((pet) =>
        pet._id === selectedPetId
          ? { ...pet, status: "appointment_scheduled", appointmentDetails }
          : pet
      ));
      setShowAppointmentPopup(false);
      setAppointmentDetails({ date: "", time: "", location: "", notes: "" });
      setSelectedPetId(null);
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      alert("❌ Failed to schedule appointment.");
    }
  };

  const handleUploadPrescription = (petId) => {
    setSelectedPetId(petId);
    setShowPrescriptionPopup(true);
  };

  const handlePrescriptionSubmit = async () => {
    if (!prescriptionFile) {
      alert("❌ Please select a prescription file!");
      return;
    }

    const formData = new FormData();
    formData.append("prescriptionFile", prescriptionFile);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/doctor/uploadPrescription/${selectedPetId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const fileUrl = response.data.fileUrl; // Assuming backend returns the file URL
      const pet = pets.find((p) => p._id === selectedPetId);
      const notificationMessage = `Your pet's vaccination file has been uploaded for ${pet.name}. Download it here: <a href="${fileUrl}" target="_blank" rel="noopener noreferrer">${fileUrl}</a>`;

      alert("✅ Prescription uploaded successfully! Pet approved and user notified.");
      setPets(pets.filter((pet) => pet._id !== selectedPetId));
      setShowPrescriptionPopup(false);
      setPrescriptionFile(null);
      setSelectedPetId(null);

      // Commenting out the notification call since the endpoint doesn't exist yet
      /*
      await axios.post(`http://localhost:5000/api/notifications/user/${pet.userId || "mockUserId"}`, {
        message: notificationMessage,
        fileUrl,
      });
      */
      // Assuming the backend handles notification internally via /api/doctor/uploadPrescription
    } catch (error) {
      console.error("Error uploading prescription:", error);
      alert("❌ Failed to upload prescription.");
    }
  };

  if (loading) {
    return (
      <>
        <DoctorNavbar />
        <Box sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "orange" }}>
            Loading pets for verification...
          </Typography>
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <DoctorNavbar />
        <Box sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h6" sx={{ color: "orange" }}>
            {error}
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <DoctorNavbar />
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          sx={{ marginBottom: 4, color: "orange", fontWeight: "bold", textAlign: "center" }}
        >
          Verify Vaccination Details
        </Typography>
        {pets.length > 0 ? (
          <Grid container spacing={4} justifyContent="center">
            {pets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pet._id}>
                <Card
                  sx={{
                    width: 250,
                    minHeight: 400,
                    border: "2px solid orange",
                    boxShadow: 5,
                    borderRadius: 3,
                    backgroundColor: "#fffaf0",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": { boxShadow: 8, transform: "scale(1.05)" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, padding: 2 }}>
                    {pet.petImage && (
                      <img
                        src={`http://localhost:5000/${pet.petImage}`}
                        alt={pet.name}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: 150,
                          objectFit: "cover",
                          borderRadius: "10px 10px 0 0",
                          marginBottom: "10px",
                        }}
                        onError={(e) => console.error(`Failed to load image for pet ${pet._id}:`, e)}
                      />
                    )}
                    <Typography variant="h6" sx={{ color: "orange", fontWeight: "bold", mb: 1 }}>
                      {pet.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "orange", mb: 0.75 }}>
                      <strong>Age:</strong> {pet.age}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "orange", mb: 0.75 }}>
                      <strong>Location:</strong> {pet.location}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "orange", mb: 0.75 }}>
                      <strong>Pet Type:</strong> {pet.petType}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "orange", mb: 0.75 }}>
                      <strong>Owner Email:</strong> {pet.email}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "orange", mb: 0.75 }}>
                      <strong>Phone:</strong> {pet.phone}
                    </Typography>
                    {pet.vaccinationFile ? (
                      <Typography variant="body2" sx={{ color: "orange", mt: 0.75, mb: 0.75 }}>
                        <strong>Vaccination File:</strong>{" "}
                        <a
                          href={`http://localhost:5000/${pet.vaccinationFile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "orange", textDecoration: "underline" }}
                        >
                          View File
                        </a>
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ color: "orange", mt: 0.75, mb: 0.75 }}>
                        <strong>Vaccination File:</strong> Not provided
                      </Typography>
                    )}
                    {pet.appointmentDetails && (
                      <Typography variant="body2" sx={{ color: "orange", mt: 0.75, mb: 0.75 }}>
                        <strong>Appointment:</strong> {pet.appointmentDetails.date} at {pet.appointmentDetails.time}, {pet.appointmentDetails.location}
                      </Typography>
                    )}
                    {pet.prescriptionFile && (
                      <Typography variant="body2" sx={{ color: "orange", mt: 0.75, mb: 0.75 }}>
                        <strong>Prescription File:</strong>{" "}
                        <a
                          href={`http://localhost:5000/${pet.prescriptionFile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "orange", textDecoration: "underline" }}
                        >
                          View File
                        </a>
                      </Typography>
                    )}
                  </CardContent>
                  <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: 1.5, gap: 1 }}>
                    {pet.vaccinationFile ? (
                      <>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "orange",
                            color: "white",
                            "&:hover": { backgroundColor: "#e69500" },
                            padding: "5px 10px",
                            fontSize: "0.9rem",
                            flex: "1 1 45%",
                          }}
                          onClick={() => handleVerify(pet._id, "verified")}
                        >
                          ✅ Approve
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "orange",
                            color: "orange",
                            "&:hover": { backgroundColor: "#ffcc80" },
                            padding: "5px 10px",
                            fontSize: "0.9rem",
                            flex: "1 1 45%",
                          }}
                          onClick={() => handleVerify(pet._id, "rejected")}
                        >
                          ❌ Reject
                        </Button>
                      </>
                    ) : pet.status === "appointment_scheduled" ? (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "green",
                          color: "white",
                          "&:hover": { backgroundColor: "#004d00" },
                          padding: "5px 10px",
                          fontSize: "0.9rem",
                          width: "100%",
                        }}
                        onClick={() => handleUploadPrescription(pet._id)}
                      >
                        📄 Upload Vaccination File
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "blue",
                          color: "white",
                          "&:hover": { backgroundColor: "#003087" },
                          padding: "5px 10px",
                          fontSize: "0.9rem",
                          width: "100%",
                        }}
                        onClick={() => handleProvideVaccination(pet._id)}
                      >
                        💉 Provide Vaccination
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem" }}>
            No pets available for verification.
          </Typography>
        )}

        <Modal open={showRejectPopup} onClose={() => setShowRejectPopup(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2, color: "orange", fontWeight: "bold" }}>
              Enter Reason for Rejection
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason..."
              variant="outlined"
              sx={{ marginBottom: 2, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "orange" } } }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "orange", color: "white", padding: "10px 20px" }}
                onClick={handleRejectSubmit}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "orange", color: "orange", padding: "10px 20px" }}
                onClick={() => setShowRejectPopup(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={showAppointmentPopup} onClose={() => setShowAppointmentPopup(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2, color: "orange", fontWeight: "bold" }}>
              Schedule Vaccination Appointment
            </Typography>
            <TextField
              fullWidth
              label="Date (YYYY-MM-DD)"
              value={appointmentDetails.date}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Time (HH:MM)"
              value={appointmentDetails.time}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, time: e.target.value })}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Location"
              value={appointmentDetails.location}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, location: e.target.value })}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Notes (Optional)"
              multiline
              rows={2}
              value={appointmentDetails.notes}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, notes: e.target.value })}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "orange", color: "white", padding: "10px 20px" }}
                onClick={handleAppointmentSubmit}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "orange", color: "orange", padding: "10px 20px" }}
                onClick={() => setShowAppointmentPopup(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={showPrescriptionPopup} onClose={() => setShowPrescriptionPopup(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2, color: "orange", fontWeight: "bold" }}>
              Upload Vaccination File
            </Typography>
            <TextField
              fullWidth
              type="file"
              onChange={(e) => setPrescriptionFile(e.target.files[0])}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "orange", color: "white", padding: "10px 20px" }}
                onClick={handlePrescriptionSubmit}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "orange", color: "orange", padding: "10px 20px" }}
                onClick={() => setShowPrescriptionPopup(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default VerifyVaccination;