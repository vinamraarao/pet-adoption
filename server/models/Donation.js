const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    email: String,
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["Google Pay", "Card", "UPI"],
      default: "Google Pay",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
