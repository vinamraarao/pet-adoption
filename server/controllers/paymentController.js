// const generateUpiLink = require('../utils/upi');
// const Payment = require('../models/Payment');

// // POST  /api/payment/upi-link
// exports.createUpiLink = async (req, res) => {
//   try {
//     const { amount } = req.body;                    // ₹ (not paise)
//     const tr = 'UPI' + Date.now();                  // unique txn ref
//     const upiLink = generateUpiLink({
//       pa: process.env.UPI_ID,                       // e.g. "petadoption@icici"
//       pn: 'Pet Adoption',                           // merchant name
//       tr,
//       am: amount,
//       tn: 'Adoption / Donation',
//     });

//     await Payment.create({                          // status tracking
//       orderId: tr,
//       method: 'UPI',
//       amount,
//       status: 'PENDING',
//     });

//     res.json({ upiLink, paymentId: tr });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };




const crypto = require('crypto');
const generateUpiLink = require('../utils/upi');
const Payment = require('../models/Payment');
const razorpay = require('../utils/razorpay');

// POST /api/payment/upi-link
exports.createUpiLink = async (req, res) => {
  try {
    const { amount } = req.body;
    const tr = 'UPI' + Date.now();
    const upiLink = generateUpiLink({
      pa: process.env.UPI_ID,
      pn: 'Pet Adoption',
      tr,
      am: amount,
      tn: 'Adoption / Donation',
    });

    await Payment.create({
      orderId: tr,
      method: 'UPI',
      amount,
      status: 'PENDING',
    });

    res.json({ upiLink, paymentId: tr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/payment/orders (Razorpay)
exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // in paise
      currency: 'INR',
      receipt: 'receipt_order_' + Math.random(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/payment/verify (Razorpay Verification)
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const payment = new Payment({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        method: 'RAZORPAY',
        status: 'PAID',
      });
      await payment.save();
      res.json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
