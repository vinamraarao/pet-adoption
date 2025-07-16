const express = require("express");
const router = express.Router();
const UserPet = require("../models/UserPet");

// Approve request and add to user pets
router.post("/", async (req, res) => {
  try {
    const newPet = new UserPet(req.body);
    await newPet.save();
    res.json({ message: "Pet added to user pets" });
  } catch (error) {
    res.status(500).json({ message: "Error adding pet" });
  }
});

module.exports = router;
