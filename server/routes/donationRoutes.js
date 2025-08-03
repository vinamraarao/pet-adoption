// const express = require("express");
// const router = express.Router();
// const { createDonation, getAllDonations } = require("../controllers/donationController");

// router.post("/", createDonation);
// router.get("/", getAllDonations); // Optional for admin

// module.exports = router;



const express = require("express");
const router = express.Router();
const { createDonation } = require("../controllers/donationController");

router.post("/donate", createDonation);

module.exports = router;
