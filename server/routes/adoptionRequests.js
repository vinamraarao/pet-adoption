const express = require("express");
const AdoptionRequest = require("../models/adoptionRequestModel");
const AdoptedHistory = require("../models/adoptedHistoryModel");
const Pet = require("../models/petModel");
const Notification = require("../models/Notification");

const router = express.Router();

// Add a New Adoption Request
router.post("/add", async (req, res) => {
  try {
    const { name, email, phone, reason, petId, petName, petType, userId } = req.body;

    if (!name || !email || !phone || !reason || !petId || !petName || !petType) {
      return res.status(400).json({ message: "❌ All fields are required!" });
    }

    const newRequest = new AdoptionRequest({ name, email, phone, reason, petId, petName, petType, userId });
    await newRequest.save();

    // Send notification to the adopter
    if (userId) {
      const notification = new Notification({
        userId,
        message: `Your adoption request for ${petName} (${petType}) has been submitted.`,
        read: false,
        createdAt: new Date(),
      });
      await notification.save();
      console.log("Notification sent:", notification);
    } else {
      console.warn("No userId provided for adoption request notification");
    }

    res.status(201).json({ message: "✅ Adoption request submitted successfully!" });
  } catch (error) {
    console.error("Error submitting adoption request:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Approve an Adoption Request (Move to Adopted History & Remove Pet)
router.put("/approve/:id", async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "❌ Adoption request not found" });
    }

    // Fetch the pet to get the petImage and userId of the pet owner
    const pet = await Pet.findById(request.petId);

    // Move approved request to AdoptedHistory
    const adoptedPet = new AdoptedHistory({
      name: request.name,
      email: request.email,
      phone: request.phone,
      petId: request.petId,
      petName: request.petName,
      petType: request.petType,
      petImage: pet ? pet.petImage : null,
    });

    await adoptedPet.save();
    await AdoptionRequest.findByIdAndDelete(req.params.id); // Remove request

    // Remove the pet from listings and notify the pet owner
    if (pet) {
      await Pet.findByIdAndDelete(request.petId);
      if (pet.userId) {
        const ownerNotification = new Notification({
          userId: pet.userId,
          message: `Your pet ${request.petName} (${request.petType}) has been adopted by ${request.name}.`,
          read: false,
          createdAt: new Date(),
        });
        await ownerNotification.save();
        console.log("Notification sent to pet owner:", ownerNotification);
      }
    } else {
      console.warn("⚠ Pet not found in listings, possibly already removed.");
    }

    // Notify the adopter
    if (request.userId) {
      const adopterNotification = new Notification({
        userId: request.userId,
        message: `Your adoption request for ${request.petName} (${request.petType}) has been approved!`,
        read: false,
        createdAt: new Date(),
      });
      await adopterNotification.save();
      console.log("Notification sent to adopter:", adopterNotification);
    }

    res.status(200).json({ message: "✅ Request approved, pet adopted and removed from listings!" });
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Reject an Adoption Request (Only Remove Request, Keep Pet in Database)
router.delete("/reject/:id", async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "❌ Adoption request not found" });
    }

    // Delete only the adoption request, not the pet
    await AdoptionRequest.findByIdAndDelete(req.params.id);

    // Notify the adopter
    if (request.userId) {
      const notification = new Notification({
        userId: request.userId,
        message: `Your adoption request for ${request.petName} (${request.petType}) has been rejected.`,
        read: false,
        createdAt: new Date(),
      });
      await notification.save();
      console.log("Notification sent:", notification);
    }

    res.status(200).json({ message: "❌ Adoption request rejected and removed from requests!" });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Fetch All Adoption Requests (For Admin) with Pet Image
router.get("/", async (req, res) => {
  try {
    const requests = await AdoptionRequest.find();
    // Fetch petImage for each request
    const requestsWithImages = await Promise.all(
      requests.map(async (request) => {
        const pet = await Pet.findById(request.petId);
        return {
          ...request.toObject(),
          petImage: pet ? pet.petImage : null,
        };
      })
    );
    res.json(requestsWithImages);
  } catch (error) {
    console.error("Error fetching adoption requests:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

module.exports = router;