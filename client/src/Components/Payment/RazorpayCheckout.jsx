// client/src/Components/Payment/RazorpayCheckout.jsx
import React from 'react';
import axios from 'axios';

const RazorpayCheckout = () => {
  const handlePayment = async () => {
    const { data } = await axios.post('/api/payment/orders', { amount: 500 }); // ₹500

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your key
      amount: data.amount,
      currency: data.currency,
      name: 'Pet Adoption',
      description: 'Adoption Fee / Donation',
      order_id: data.id,
      handler: async function (response) {
        await axios.post('/api/payment/verify', {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        window.location.href = '/payment-success';
      },
      prefill: {
        name: 'User',
        email: 'user@example.com',
        contact: '9999999999',
      },
      theme: { color: '#3399cc' },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return <button onClick={handlePayment}>Pay ₹500</button>;
};

export default RazorpayCheckout;
