const Pet = require("../models/petModel");

// ✅ Add a pet function
const addPet = async (req, res) => {
  try {
    const { name, age, location, petType, justification, email, phone } = req.body;

    // ✅ Validate input fields
    if (!name || !age || !location || !petType || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Create and save pet
    const newPet = new Pet({ name, age, location, petType, justification, email, phone });
    await newPet.save();

    res.status(201).json({ message: "Pet added successfully", pet: newPet });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addPet };
