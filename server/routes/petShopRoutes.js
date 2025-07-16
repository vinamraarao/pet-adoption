const express = require("express");
const router = express.Router();
const petShopController = require("../controllers/petShopController");

router.post("/accept", petShopController.acceptRequest);
router.post("/reject", petShopController.rejectRequest);

module.exports = router;
