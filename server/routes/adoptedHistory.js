const express = require("express");
const AdoptedHistory = require("../models/adoptedHistoryModel");

const router = express.Router();

// Get all adopted pets history
router.get("/", async (req, res) => {
  try {
    const adoptedPets = await AdoptedHistory.find();
    res.json(adoptedPets);
  } catch (error) {
    console.error("Error fetching adopted history:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

module.exports = router;