// File: server/controllers/petShopController.js
const PetShop = require("../models/PetShop");
const ServiceRequest = require("../models/ServiceRequest");

// Accept a service request
exports.acceptRequest = async (req, res) => {
  try {
    const { requestId, shopId } = req.body;
    const request = await ServiceRequest.findById(requestId);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.acceptedBy) return res.status(400).json({ message: "Request already accepted" });

    request.acceptedBy = shopId;
    request.status = "Accepted";
    await request.save();

    res.status(200).json({ message: "Request accepted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject a service request
exports.rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await ServiceRequest.findById(requestId);

    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "Rejected";
    await request.save();

    res.status(200).json({ message: "Request rejected" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
