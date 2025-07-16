// client/src/Components/Payment/PaymentPage.jsx
import React, { useState } from 'react';
import RazorpayCheckout from './RazorpayCheckout';
import GooglePayQR from './GooglePayQR';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';

const PaymentPage = () => {
  const [amount, setAmount] = useState(500);
  const [method, setMethod] = useState('');

  return (
    <Box maxWidth="500px" mx="auto" mt={6} p={3} boxShadow={3} borderRadius={3}>
      <Typography variant="h5" gutterBottom align="center">
        Support Pet Adoption 🐾
      </Typography>

      <TextField
        label="Amount (₹)"
        type="number"
        fullWidth
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Select
        fullWidth
        value={method}
        displayEmpty
        onChange={(e) => setMethod(e.target.value)}
        sx={{ my: 2 }}
      >
        <MenuItem value="" disabled>Select Payment Method</MenuItem>
        <MenuItem value="razorpay">Razorpay</MenuItem>
        <MenuItem value="gpay">Google Pay (UPI QR)</MenuItem>
      </Select>

      {method === 'razorpay' && <RazorpayCheckout amount={amount} />}
      {method === 'gpay' && <GooglePayQR amount={amount} />}
    </Box>
  );
};

export default PaymentPage;
