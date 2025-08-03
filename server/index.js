require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Add this import

const petRoutes = require("./routes/petRoutes");
const adoptionRequests = require("./routes/adoptionRequests");
const adoptedHistoryRoutes = require("./routes/adoptedHistory");
const doctorRoutes = require("./routes/doctorRoutes");
const authRoutes = require("./routes/authRoutes");
const serviceManagerRoutes = require("./routes/serviceManagerRoutes");
const petShopRoutes = require("./routes/petShopRoutes");
const shopOwnerRoutes = require("./routes/shopOwnerRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require("./routes/reviewRoutes");
const donationRoutes = require("./routes/donationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pet-adoption";

// Middleware
app.use(express.json()); // Parse JSON bodies

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS configuration
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "user-id"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
}));

// Debug CORS headers
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, URL: ${req.url}`);
  console.log("Response Headers:", res.getHeaders());
  next();
});

// Define Routes
app.use("/api", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adoption-requests", adoptionRequests);
app.use("/api/adopted-history", adoptedHistoryRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/serviceManager", serviceManagerRoutes);
app.use("/api/petShop", petShopRoutes);
app.use("/api/shopOwner", shopOwnerRoutes);
app.use("/api/notifications", notificationRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/donations", donationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// MongoDB Connection and Start Server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });