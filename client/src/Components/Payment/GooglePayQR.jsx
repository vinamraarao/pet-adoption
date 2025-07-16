// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Typography, CircularProgress } from '@mui/material';
// import QRCode from 'react-qr-code';

// export default function GooglePayQR({ amount = 500 }) {
//   const [upiLink, setUpiLink]   = useState('');
//   const [paymentId, setPaymentId] = useState('');

//   useEffect(() => {
//     (async () => {
//       const { data } = await axios.post('/api/payment/upi-link', { amount });
//       setUpiLink(data.upiLink);
//       setPaymentId(data.paymentId);
//     })();
//   }, [amount]);

//   if (!upiLink) return <CircularProgress />;

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
//       <Typography variant="h6">Scan with Google Pay / any UPI app</Typography>
//       <QRCode value={upiLink} size={240} />
//       <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{upiLink}</Typography>

//       <Button variant="outlined" onClick={() => navigator.clipboard.writeText(upiLink)}>
//         Copy UPI Link
//       </Button>

//       {/* Optional: navigate to success page after manual confirmation */}
//       <Button
//         variant="contained"
//         color="success"
//         href="/payment-success"
//         sx={{ mt: 1 }}
//       >
//         I have paid
//       </Button>
//     </Box>
//   );
// }




// // client/src/Components/Payment/GooglePayQR.jsx
// import React, { useEffect, useState } from 'react';
// import QRCode from 'react-qr-code';
// import { Box, Typography, Paper, Divider } from '@mui/material';

// const GooglePayQR = ({ amount }) => {
//   const [upiLink, setUpiLink] = useState('');

//   useEffect(() => {
//     const link = `upi://pay?pa=vinamra@icici&pn=Vinamra Rao&am=${amount}&cu=INR&tn=Pet%20Adoption`;
//     setUpiLink(link);
//   }, [amount]);

//   return (
//     <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         Scan QR to Pay via Google Pay / PhonePe / Paytm
//       </Typography>

//       {upiLink && (
//         <Box display="flex" justifyContent="center" my={2}>
//           <QRCode value={upiLink} size={200} />
//         </Box>
//       )}

//       <Typography variant="body1">
//         <strong>UPI ID:</strong> vinamraarao@okicici
//       </Typography>

//       <Divider sx={{ my: 2 }} />

//       <Typography variant="subtitle1" gutterBottom>
//         Or Pay via Bank Transfer
//       </Typography>

//       <Typography variant="body2"><strong>Bank Name:</strong> ICICI Bank</Typography>
//       <Typography variant="body2"><strong>Account Holder:</strong> Vinamra A Rao</Typography>
//       <Typography variant="body2"><strong>Account Number:</strong> 123456789012</Typography>
//       <Typography variant="body2"><strong>IFSC Code:</strong> ICIC0001234</Typography>

//       <Divider sx={{ my: 2 }} />

//       <Typography variant="body2" color="text.secondary">
//         Please include your name or contact number in the UPI note while making payment.
//       </Typography>
//     </Paper>
//   );
// };

// export default GooglePayQR;




// client/src/Components/Payment/GooglePayQR.jsx
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Box, Typography, Paper } from '@mui/material';

const GooglePayQR = ({ amount }) => {
  const [upiLink, setUpiLink] = useState('');

  useEffect(() => {
    if (amount) {
      const link = `upi://pay?pa=vinamraarao@okicici&pn=Vinamra Rao&am=${amount}&cu=INR&tn=Donation`;
      setUpiLink(link);
    }
  }, [amount]);

  if (!amount) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', mt: 2 }}>
      <Typography variant="h6" gutterBottom>Scan to Donate via UPI</Typography>
      <QRCode value={upiLink} size={200} style={{ margin: '20px auto' }} />
      <Typography variant="body1" mt={2}>
        UPI ID: <strong>vinamraarao@okicici</strong>
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Note: Your donation helps us care for more pets 🐶🐱
      </Typography>
    </Paper>
  );
};

export default GooglePayQR;
