const express = require("express");
const AdoptionRequest = require("../models/adoptionRequestModel");
const AdoptedHistory = require("../models/adoptedHistoryModel");

const router = express.Router();

// ✅ Fetch all adoption requests
router.get("/", async (req, res) => {
  try {
    const requests = await AdoptionRequest.find();
    res.json(requests);
  } catch (error) {
    console.error("❌ Error fetching requests:", error);
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// ✅ Approve an adoption request (Move to Adopted History)
router.put("/approve/:id", async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "❌ Adoption request not found" });
    }

    // Move the approved request to Adopted History
    const adoptedPet = new AdoptedHistory({
      name: request.name,
      email: request.email,
      phone: request.phone,
      petId: request.petId,
      petName: request.petName,
      petType: request.petType,
    });

    await adoptedPet.save();
    await AdoptionRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "✅ Request approved and saved in Adopted History!" });
  } catch (error) {
    console.error("❌ Error approving request:", error);
    res.status(500).json({ message: "❌ Server error", error });
  }
});

// ✅ Reject an adoption request
router.delete("/:id", async (req, res) => {
  try {
    const request = await AdoptionRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "❌ Adoption request not found" });
    }
    res.status(200).json({ message: "❌ Adoption request rejected and removed!" });
  } catch (error) {
    console.error("❌ Error rejecting request:", error);
    res.status(500).json({ message: "❌ Server error", error });
  }
});

module.exports = router;
