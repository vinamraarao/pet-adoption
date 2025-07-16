const Pet = require('../models/petModel');
const Doctor = require('../models/doctor');

// Verify Pet Vaccination Details
exports.verifyVaccination = async (req, res) => {
  const { petId, doctorId, status } = req.body;

  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (status === 'verified') {
      doctor.verifiedPets.push(petId);
      pet.status = 'verified';
    } else if (status === 'rejected') {
      doctor.rejectedPets.push(petId);
      pet.status = 'rejected';
    }

    await doctor.save();
    await pet.save();

    res.status(200).json({ message: `Pet ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get All Pets for Verification
exports.getPetsForVerification = async (req, res) => {
  try {
    const pets = await Pet.find({ status: 'pending' });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.loginDoctor = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(400).json({ success: false, message: "Doctor not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// const Pet = require('../models/petModel');
// const Doctor = require('../models/doctor');

// // Verify Pet Vaccination
// exports.verifyVaccination = async (req, res) => {
//   const { petId, doctorId, status } = req.body;

//   try {
//     const pet = await Pet.findById(petId);
//     if (!pet) return res.status(404).json({ message: 'Pet not found' });

//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

//     if (status === 'verified') {
//       doctor.verifiedPets.push(petId);
//       pet.status = 'verified';
//     } else if (status === 'rejected') {
//       doctor.rejectedPets.push(petId);
//       pet.status = 'rejected';
//     }

//     await doctor.save();
//     await pet.save();

//     res.status(200).json({ message: `Pet ${status} successfully` });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Get Pets Pending Verification
// exports.getPetsForVerification = async (req, res) => {
//   try {
//     const pets = await Pet.find({ status: 'pending' });
//     res.status(200).json(pets);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Approve Pet
// exports.approvePet = async (req, res) => {
//   const { petId } = req.body;

//   try {
//     const pet = await Pet.findByIdAndUpdate(petId, { status: 'approved' }, { new: true });
//     if (!pet) return res.status(404).json({ message: 'Pet not found' });

//     res.status(200).json({ message: 'Pet approved successfully', pet });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Reject Pet with Reason
// exports.rejectPet = async (req, res) => {
//   const { petId, reason } = req.body;

//   try {
//     const pet = await Pet.findByIdAndUpdate(petId, { status: 'rejected', rejectionReason: reason }, { new: true });
//     if (!pet) return res.status(404).json({ message: 'Pet not found' });

//     res.status(200).json({ message: 'Pet rejected successfully', pet });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };


// exports.loginDoctor = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const doctor = await Doctor.findOne({ email });

//     if (!doctor) {
//       return res.status(400).json({ success: false, message: "Doctor not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, doctor.password);

//     if (!isPasswordValid) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

//     res.json({ success: true, message: "Login successful" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };