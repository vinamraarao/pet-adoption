const Donation = require("../models/Donation");

exports.createDonation = async (req, res) => {
  try {
    const { name, email, amount, paymentMethod, message } = req.body;

    const newDonation = new Donation({
      name,
      email,
      amount,
      paymentMethod,
      message
    });

    await newDonation.save();
    res.status(201).json({ success: true, message: "Donation saved. Thank you!" });
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
