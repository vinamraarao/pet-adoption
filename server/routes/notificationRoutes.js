const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();

// Fetch notifications for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    console.log(`Notifications fetched for user ${userId}:`, notifications);
    res.json(notifications);
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

module.exports = router;

