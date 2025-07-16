const express = require("express");
const mongoose = require("mongoose");
const Pet = require("../models/petModel");
const ApprovedPet = require("../models/approvedPetModel");
const RejectedPet = require("../models/rejectedPetModel");
const Notification = require("../models/Notification");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and image files are allowed!"), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Add a pet
router.post("/add",upload.fields([{ name: "petImage" }, { name: "vaccinationFile" }]),
  async (req, res) => {
    try {
      const { name, age, location, petType, justification, email, phone, userId } = req.body;

      // Only require petImage
      if (!req.files?.petImage) {
        return res.status(400).json({ message: "❌ Pet image is required" });
      }

      const petImage = req.files.petImage[0];
      const vaccinationFile = req.files.vaccinationFile ? req.files.vaccinationFile[0] : null;

      const newPet = new Pet({
        userId: userId || new mongoose.Types.ObjectId(),
        name,
        age,
        location,
        petType,
        justification,
        email,
        phone,
        petImage: petImage.path,
        vaccinationFile: vaccinationFile ? vaccinationFile.path : null, // Optional
        status: "pending",
      });
      await newPet.save();
      res.status(201).json({ message: "✅ Pet request submitted", pet: newPet });
    } catch (error) {
      console.error("❌ Error adding pet:", error);
      res.status(500).json({ message: "❌ Error adding pet", error: error.message });
    }
  }
);

// Send to doctor
router.put("/sendToDoctor/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { status: "verification_pending" },
      { new: true }
    );
    if (!pet) return res.status(404).json({ message: "❌ Pet not found" });

    const notification = new Notification({
      userId: pet.userId,
      message: `Your post pet request for ${pet.name} (${pet.petType}) is sent to doctor.`,
      read: false,
      createdAt: new Date(),
    });
    await notification.save();
    console.log("Notification sent:", notification);

    res.status(200).json({ message: "✅ Pet sent to doctor", pet });
  } catch (error) {
    console.error("❌ Error sending to doctor:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Reject pet
router.put("/reject/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "❌ Pet not found" });

    const rejectedPet = new RejectedPet({
      ...pet.toObject(),
      status: "rejected",
      rejectReason: req.body.rejectReason || "Rejected by admin",
    });
    await rejectedPet.save();

    const notification = new Notification({
      userId: pet.userId,
      message: `Your post pet request for ${pet.name} (${pet.petType}) has been rejected.`,
      read: false,
      createdAt: new Date(),
    });
    await notification.save();
    console.log("Notification sent:", notification);

    await Pet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "❌ Pet request rejected", pet: rejectedPet });
  } catch (error) {
    console.error("❌ Error rejecting pet:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Hide pet (reject by admin)
router.put("/hidePet/:id", async (req, res) => {
  try {
    const pet = await ApprovedPet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "❌ Pet not found" });

    res.status(200).json({ message: "🚫 Pet hidden from Approved by Doctor!", pet });
  } catch (error) {
    console.error("Error rejecting pet:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get approved by doctor
router.get("/approvedByDoctor", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB connection is not established");
    }

    const approvedPets = await ApprovedPet.find().lean();
    console.log("Approved pets fetched:", approvedPets);

    if (!approvedPets.length) {
      return res.json([]);
    }

    for (const pet of approvedPets) {
      if (!pet.userId || !mongoose.Types.ObjectId.isValid(pet.userId)) {
        console.warn(`Skipping notification for pet ${pet._id}: Invalid or missing userId`);
        continue;
      }
      if (!pet.name || !pet.petType) {
        console.warn(`Skipping notification for pet ${pet._id}: Missing name or petType`);
        continue;
      }

      const existingNotification = await Notification.findOne({
        userId: pet.userId,
        message: `Your post pet request for ${pet.name} (${pet.petType}) is pending to verify by Admin.`,
      });

      if (!existingNotification) {
        const notification = new Notification({
          userId: pet.userId,
          message: `Your post pet request for ${pet.name} (${pet.petType}) is pending to verify by Admin.`,
          read: false,
          createdAt: new Date(),
        });
        await notification.save();
        console.log("Notification sent:", notification);
      }
    }

    res.json(approvedPets);
  } catch (error) {
    console.error("❌ Error fetching approved pets:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Get rejected by doctor
router.get("/rejectedByDoctor", async (req, res) => {
  try {
    const rejectedPets = await RejectedPet.find().lean();
    for (const pet of rejectedPets) {
      if (!pet.userId || !mongoose.Types.ObjectId.isValid(pet.userId)) continue;
      const existingNotification = await Notification.findOne({
        userId: pet.userId,
        message: `Your post pet request for ${pet.name} (${pet.petType}) is pending to verify by Admin.`,
      });
      if (!existingNotification) {
        const notification = new Notification({
          userId: pet.userId,
          message: `Your post pet request for ${pet.name} (${pet.petType}) is pending to verify by Admin.`,
          read: false,
          createdAt: new Date(),
        });
        await notification.save();
        console.log("Notification sent:", notification);
      }
    }
    res.json(rejectedPets);
  } catch (error) {
    console.error("❌ Error fetching rejected pets:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Admin approve
router.put("/moveToAvailable/:id", async (req, res) => {
  try {
    const pet = await ApprovedPet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "❌ Pet not found" });

    const newPet = new Pet({ ...pet.toObject(), status: "available" });
    await newPet.save();

    const notification = new Notification({
      userId: pet.userId,
      message: `Your post pet request for ${pet.name} (${pet.petType}) is accepted by the Admin.`,
      read: false,
      createdAt: new Date(),
    });
    await notification.save();
    console.log("Notification sent:", notification);

    await ApprovedPet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "✅ Pet moved to available", pet: newPet });
  } catch (error) {
    console.error("❌ Error moving to available:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Admin reject
router.put("/rejectByAdmin/:id", async (req, res) => {
  try {
    const pet = await ApprovedPet.findById(req.params.id) || await RejectedPet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "❌ Pet not found" });

    const notification = new Notification({
      userId: pet.userId,
      message: `Your post pet request for ${pet.name} (${pet.petType}) is rejected by the Admin.`,
      read: false,
      createdAt: new Date(),
    });
    await notification.save();
    console.log("Notification sent:", notification);

    if (pet instanceof ApprovedPet) await ApprovedPet.findByIdAndDelete(req.params.id);
    else await RejectedPet.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "✅ Pet rejected by Admin" });
  } catch (error) {
    console.error("❌ Error rejecting by admin:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Get pending requests with Base64-encoded files
router.get("/requests", async (req, res) => {
  try {
    const pendingPets = await Pet.find({ status: "pending" });
    const petsWithBase64 = await Promise.all(
      pendingPets.map(async (pet) => {
        let petImageBase64 = null;
        let vaccinationFileBase64 = null;
        let petImageMimeType = null;
        let vaccinationFileMimeType = null;

        if (pet.petImage) {
          try {
            const imagePath = path.resolve(__dirname, "..", pet.petImage);
            const imageData = await fs.readFile(imagePath);
            petImageBase64 = imageData.toString("base64");
            petImageMimeType = `image/${path.extname(pet.petImage).slice(1).toLowerCase()}`;
          } catch (err) {
            console.error(`Failed to read pet image at ${pet.petImage}:`, err);
          }
        }

        if (pet.vaccinationFile) {
          try {
            const filePath = path.resolve(__dirname, "..", pet.vaccinationFile);
            const fileData = await fs.readFile(filePath);
            vaccinationFileBase64 = fileData.toString("base64");
            vaccinationFileMimeType =
              path.extname(pet.vaccinationFile).toLowerCase() === ".pdf"
                ? "application/pdf"
                : `image/${path.extname(pet.vaccinationFile).slice(1).toLowerCase()}`;
          } catch (err) {
            console.error(`Failed to read vaccination file at ${pet.vaccinationFile}:`, err);
          }
        }

        return {
          ...pet.toObject(),
          petImage: petImageBase64,
          petImageMimeType,
          vaccinationFile: vaccinationFileBase64,
          vaccinationFileMimeType,
        };
      })
    );

    console.log("Sending pending pets to frontend:", petsWithBase64);
    res.json(petsWithBase64);
  } catch (error) {
    console.error("❌ Error fetching requests:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Get available pets with Base64-encoded files
router.get("/availablePets", async (req, res) => {
  try {
    const availablePets = await Pet.find({ status: "available" });
    const petsWithBase64 = await Promise.all(
      availablePets.map(async (pet) => {
        let petImageBase64 = null;
        let vaccinationFileBase64 = null;
        let petImageMimeType = null;
        let vaccinationFileMimeType = null;

        if (pet.petImage) {
          try {
            const imagePath = path.resolve(__dirname, "..", pet.petImage);
            const imageData = await fs.readFile(imagePath);
            petImageBase64 = imageData.toString("base64");
            petImageMimeType = `image/${path.extname(pet.petImage).slice(1).toLowerCase()}`;
          } catch (err) {
            console.error(`Failed to read pet image at ${pet.petImage}:`, err);
          }
        }

        if (pet.vaccinationFile) {
          try {
            const filePath = path.resolve(__dirname, "..", pet.vaccinationFile);
            const fileData = await fs.readFile(filePath);
            vaccinationFileBase64 = fileData.toString("base64");
            vaccinationFileMimeType =
              path.extname(pet.vaccinationFile).toLowerCase() === ".pdf"
                ? "application/pdf"
                : `image/${path.extname(pet.vaccinationFile).slice(1).toLowerCase()}`;
          } catch (err) {
            console.error(`Failed to read vaccination file at ${pet.vaccinationFile}:`, err);
          }
        }

        return {
          ...pet.toObject(),
          petImage: petImageBase64,
          petImageMimeType,
          vaccinationFile: vaccinationFileBase64,
          vaccinationFileMimeType,
        };
      })
    );

    console.log("Sending pets to frontend:", petsWithBase64);
    res.json(petsWithBase64);
  } catch (error) {
    console.error("Error fetching available pets:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;