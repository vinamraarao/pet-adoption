const express = require("express");
const router = express.Router();
const ServiceRequest = require("../models/ServiceRequest");
const User = require("../models/userModel");
const Notification = require("../models/Notification");

router.use(express.json());

// Fetch all shop owners
router.get("/shop-owners", async (req, res) => {
  try {
    const shopOwners = await User.find({ role: "shop-owner" }).select("name _id");
    console.log("Fetched shop owners:", shopOwners);
    res.json(shopOwners);
  } catch (error) {
    console.error("Error fetching shop owners:", error);
    res.status(500).json({ error: "Error fetching shop owners" });
  }
});

// Fetch requests assigned to the shop owner
router.get("/requests", async (req, res) => {
  try {
    const shopOwnerId = req.headers["user-id"];
    if (!shopOwnerId) {
      return res.status(400).json({ error: "Shop owner ID is required" });
    }
    console.log(`Fetching requests for shop owner ${shopOwnerId}`);
    const requests = await ServiceRequest.find({ assignedPetShop: shopOwnerId })
      .populate("userId", "name email")
      .populate("assignedPetShop", "name");
    console.log(`Found ${requests.length} requests for shop owner ${shopOwnerId}:`, requests);
    res.json(requests);
  } catch (error) {
    console.error("Error fetching shop owner requests:", error);
    res.status(500).json({ error: "Error fetching requests" });
  }
});

// Update request status (Accept/Reject)
router.put("/request/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await ServiceRequest.findById(id)
      .populate("userId", "name email")
      .populate("assignedPetShop", "name");
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    request.status = status;
    await request.save();

    // Create a detailed notification for the user
    const notification = new Notification({
      userId: request.userId._id,
      message: `Your ${request.serviceType} request for ${request.petName} (${request.petType}) has been ${status.toLowerCase()} by ${request.assignedPetShop.name}.`,
      requestId: request._id,
      read: false,
      createdAt: new Date(),
    });
    await notification.save();

    console.log(`Updated request ${id} to status ${status}, notification created for user ${request.userId._id}`);

    res.json({ message: `Request ${status} successfully!`, request });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ error: "Error updating request" });
  }
});

module.exports = router;