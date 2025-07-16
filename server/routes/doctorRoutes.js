const express = require("express");
const multer = require("multer");
const path = require("path");
const Pet = require("../models/petModel");
const ApprovedPet = require("../models/approvedPetModel");
const RejectedPet = require("../models/rejectedPetModel");
const Notification = require("../models/Notification");
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get verification pending pets
router.get("/verificationPending", async (req, res) => {
  try {
    const pets = await Pet.find({ status: { $in: ["verification_pending", "appointment_scheduled"] } });
    res.json(pets);
  } catch (error) {
    console.error("❌ Error fetching verification pending pets:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Verify pet
router.put("/verify/:id", async (req, res) => {
  const { status, rejectReason } = req.body;
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "❌ Pet not found" });

    let notificationMessage;
    if (status === "verified") {
      const approvedPet = new ApprovedPet({
        ...pet.toObject(),
        userId: pet.userId,
        status: "approved",
      });
      await approvedPet.save();
      notificationMessage = `Your post pet request for ${pet.name} (${pet.petType}) is approved by the doctor.`;
      await Pet.findByIdAndDelete(req.params.id);
    } else if (status === "rejected") {
      const rejectedPet = new RejectedPet({
        ...pet.toObject(),
        userId: pet.userId,
        status: "rejected",
        rejectReason: rejectReason || "No reason provided",
      });
      await rejectedPet.save();
      notificationMessage = `Your post pet request for ${pet.name} (${pet.petType}) is rejected by the doctor. Reason: ${rejectReason || "No reason provided"}`;
      await Pet.findByIdAndDelete(req.params.id);
    } else {
      return res.status(400).json({ message: "❌ Invalid status" });
    }

    const notification = new Notification({
      userId: pet.userId,
      message: notificationMessage,
      read: false,
      createdAt: new Date(),
    });
    await notification.save();
    console.log("Notification sent:", notification);

    res.status(200).json({ message: `✅ Pet ${status} successfully` });
  } catch (error) {
    console.error("❌ Error verifying pet:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Schedule appointment for vaccination
router.put("/scheduleAppointment/:id", async (req, res) => {
  const { appointmentDetails } = req.body;
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "❌ Pet not found" });

    pet.status = "appointment_scheduled";
    pet.appointmentDetails = appointmentDetails;
    await pet.save();

    const notificationMessage = `Your pet ${pet.name} (${pet.petType}) has been scheduled for a vaccination appointment. Details: Date: ${appointmentDetails.date}, Time: ${appointmentDetails.time}, Location: ${appointmentDetails.location}${appointmentDetails.notes ? `, Notes: ${appointmentDetails.notes}` : ""}. Please attend as scheduled.`;
    const notification = new Notification({
      userId: pet.userId,
      message: notificationMessage,
      read: false,
      createdAt: new Date(),
    });
    await notification.save();
    console.log("Appointment notification sent:", notification);

    res.status(200).json({ message: "✅ Appointment scheduled successfully" });
  } catch (error) {
    console.error("❌ Error scheduling appointment:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Upload prescription
router.put("/uploadPrescription/:id", upload.single("prescriptionFile"), async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "❌ Pet not found" });

    if (!req.file) return res.status(400).json({ message: "❌ No prescription file uploaded" });

    pet.prescriptionFile = req.file.path;
    await pet.save();

    const approvedPet = new ApprovedPet({
      ...pet.toObject(),
      userId: pet.userId,
      status: "approved",
    });
    await approvedPet.save();

    const notificationMessage = `Your pet ${pet.name} (${pet.petType}) has been vaccinated and a prescription has been provided. Your request is now approved.`;
    const notification = new Notification({
      userId: pet.userId,
      message: notificationMessage,
      read: false,
      createdAt: new Date(),
    });
    await notification.save();
    console.log("Prescription notification sent:", notification);

    await Pet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "✅ Prescription uploaded and pet approved" });
  } catch (error) {
    console.error("❌ Error uploading prescription:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Get rejected pets
router.get("/rejectedPets", async (req, res) => {
  try {
    const rejectedPets = await RejectedPet.find();
    res.json(rejectedPets);
  } catch (error) {
    console.error("Error fetching rejected pets:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;