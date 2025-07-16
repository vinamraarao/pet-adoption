const ServiceRequest = require("../models/ServiceRequest");

// Get pending service requests
exports.getServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ status: "Pending" });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Error fetching requests" });
  }
};

// Accept or reject service requests
exports.updateServiceRequest = async (req, res) => {
  const { status } = req.body;
  try {
    await ServiceRequest.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: `Request ${status}` });
  } catch (error) {
    res.status(500).json({ error: "Error updating request" });
  }
};
