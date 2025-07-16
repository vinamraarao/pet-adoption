// const router = require('express').Router();
// const ctrl   = require('../controllers/paymentController');

// // existing Razorpay routes …
// router.post('/orders',  ctrl.createOrder);
// router.post('/verify',  ctrl.verifyPayment);

// // NEW: dynamic UPI link
// router.post('/upi-link', ctrl.createUpiLink);

// module.exports = router;




// const router = require('express').Router();
// const ctrl = require('../controllers/paymentController');

// // Razorpay
// router.post('/orders', ctrl.createOrder);
// router.post('/verify', ctrl.verifyPayment);

// // Google Pay UPI QR
// router.post('/upi-link', ctrl.createUpiLink);

// module.exports = router;



const router = require('express').Router();
const ctrl = require('../controllers/paymentController');

// Razorpay
router.post('/orders', ctrl.createOrder);
router.post('/verify', ctrl.verifyPayment);

// Google Pay UPI QR
router.post('/upi-link', ctrl.createUpiLink);

module.exports = router;
