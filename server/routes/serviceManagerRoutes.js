const express = require("express");
const router = express.Router();
const ServiceRequest = require("../models/ServiceRequest");
const User = require("../models/userModel");
const ServiceManager = require("../models/ServiceManager");
const Notification = require("../models/Notification");

// Rename `/create` to `/addServiceManager` to avoid confusion
router.post('/addServiceManager', async (req, res) => {
  console.log("Received Data:", req.body);
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newServiceManager = new ServiceManager({ name, email, phone });
    await newServiceManager.save();

    res.status(201).json({ message: 'Service Manager created successfully', data: newServiceManager });
  } catch (error) {
    console.error('Error creating service manager:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new service request
router.post('/request', async (req, res) => {
  try {
    const {
      userId,
      userName,
      userContact,
      serviceType,
      petName,
      petType,
      petBreed,
      address,
      time,
      careDuration,
      specialInstructions,
    } = req.body;

    // Validate required fields
    if (!userId || !userName || !userContact || !serviceType || !petName || !petType || !address || !time) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const newRequest = new ServiceRequest({
      userId,
      userName,
      userContact,
      serviceType,
      petName,
      petType,
      petBreed: petBreed || null,
      address,
      time,
      careDuration: careDuration || null,
      specialInstructions: specialInstructions || null,
      status: "Pending",
    });

    await newRequest.save();
    console.log("New service request saved:", newRequest);

    res.status(201).json({ message: "Service request submitted successfully!", newRequest });
  } catch (error) {
    console.error("Error creating service request:", error);
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
});

// Route to fetch all service requests
router.get("/requests", async (req, res) => {
  try {
    const requests = await ServiceRequest.find()
      .populate("userId", "name email")
      .populate("assignedPetShop", "name");
    console.log("Fetched service requests for manager:", requests);
    res.json(requests);
  } catch (error) {
    console.error("Error fetching service requests:", error);
    res.status(500).json({ error: "Error fetching service requests: " + error.message });
  }
});

// Route to assign a service request to a pet shop
router.post("/assign", async (req, res) => {
  try {
    const { requestId, petShopId } = req.body;

    // Validate request body
    if (!requestId || !petShopId) {
      return res.status(400).json({ error: "requestId and petShopId are required" });
    }

    // Fetch the request and validate required fields
    const request = await ServiceRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Check if required fields are present (for debugging/validation)
    const requiredFields = ['petType', 'petName', 'userContact', 'userName'];
    const missingFields = requiredFields.filter(field => !request[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Request is missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Fetch and validate shop owner
    const shopOwner = await User.findById(petShopId);
    if (!shopOwner || shopOwner.role !== "shop-owner") {
      return res.status(404).json({ error: "Shop owner not found" });
    }

    // Update request
    request.status = "Assigned to Pet Shop";
    request.assignedPetShop = petShopId;
    await request.save();
    console.log("Updated request:", request);

    // Create a notification for the user
    const notification = new Notification({
      userId: request.userId,
      message: `Your ${request.serviceType} request for ${request.petName} (${request.petType}) has been sent to ${shopOwner.name}.`,
      requestId: request._id,
      read: false,
      createdAt: new Date(),
    });
    await notification.save();
    console.log(`Notification created for user ${request.userId}:`, notification);

    // Fetch updated request with populated fields
    const updatedRequest = await ServiceRequest.findById(requestId)
      .populate("userId", "name email")
      .populate("assignedPetShop", "name");

    res.json({ message: "Request assigned successfully!", request: updatedRequest });
  } catch (error) {
    console.error("Error assigning request:", error);
    res.status(500).json({ error: "Error assigning request: " + error.message });
  }
});

module.exports = router;

