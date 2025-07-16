const ServiceRequest = require("../models/ServiceRequest");
const PetShop = require("../models/PetShop");
const ServiceManager = require("../models/ServiceManager");

// Create a new Service Manager
exports.createServiceManager = async (req, res) => {
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
};

// Create a new service request
exports.createServiceRequest = async (req, res) => {
    try {
        const { userId, serviceType, petDetails, time, address } = req.body;

        if (!userId || !serviceType || !petDetails || !time || !address) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newRequest = new ServiceRequest({
            userId,
            serviceType,
            petDetails,
            time,
            address,
            status: "Pending"
        });

        await newRequest.save();
        res.status(201).json({ message: "Service request submitted successfully!", newRequest });
    } catch (error) {
        console.error("Error creating service request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fetch all service requests
exports.getUserServiceRequests = async (req, res) => {
    try {
        const requests = await ServiceRequest.find().populate("userId", "name email");
        res.json(requests);
    } catch (error) {
        console.error("Error fetching service requests:", error);
        res.status(500).json({ error: "Error fetching service requests" });
    }
};

// Assign request to a pet shop
exports.assignRequestToPetShop = async (req, res) => {
    try {
        const { requestId, petShopId } = req.body;

        const request = await ServiceRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ error: "Request not found" });
        }

        request.status = "Assigned to Pet Shop";
        request.assignedPetShop = petShopId;
        await request.save();

        res.json({ message: "Request assigned successfully!", request });
    } catch (error) {
        console.error("Error assigning request:", error);
        res.status(500).json({ error: "Error assigning request" });
    }
};
