// server/utils/razorpay.js
const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY',
  key_secret: 'YOUR_RAZORPAY_SECRET',
});

module.exports = razorpayInstance;
