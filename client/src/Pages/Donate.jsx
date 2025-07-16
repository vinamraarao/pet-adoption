// // client/src/Pages/Donate.jsx
// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography, Container } from '@mui/material';
// import GooglePayQR from '../Components/Payment/GooglePayQR';

// const Donate = () => {
//   const [amount, setAmount] = useState('');
//   const [showQR, setShowQR] = useState(false);

//   const handleDonateClick = () => {
//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       alert('Please enter a valid amount');
//       return;
//     }
//     setShowQR(true);
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom align="center">Make a Donation</Typography>
//       <Typography variant="body1" align="center" mb={3}>
//         Your donation supports our mission to rescue and care for animals.
//       </Typography>

//       <TextField
//         fullWidth
//         label="Enter Amount (₹)"
//         type="number"
//         variant="outlined"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       <Button
//         fullWidth
//         variant="contained"
//         color="primary"
//         onClick={handleDonateClick}
//         sx={{ mt: 2 }}
//       >
//         Generate UPI QR
//       </Button>

//       {showQR && <GooglePayQR amount={amount} />}
//     </Container>
//   );
// };

// export default Donate;





// // client/src/Pages/Donate.jsx
// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Container,
//   Grid,
//   Paper,
// } from '@mui/material';
// import GooglePayQR from '../Components/Payment/GooglePayQR';
// // import banner from '../Assets/donate-banner.jpeg';
// import pet1 from '../Assets/pet-1.png';
// import pet2 from '../Assets/pet-2.png';
// import pet3 from '../Assets/pet-3.png';


// const Donate = () => {
//   const [amount, setAmount] = useState('');
//   const [showQR, setShowQR] = useState(false);

//   const handleDonateClick = () => {
//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       alert('Please enter a valid amount');
//       return;
//     }
//     setShowQR(true);
//   };

//   return (
//     <Box>
//       {/* Banner Image */}
//       <Box
//         sx={{
//           height: '300px',
//         //   backgroundImage: `url(${banner})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <Box sx={{ backgroundColor: 'rgba(0,0,0,0.4)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Typography variant="h3" color="white" fontWeight="bold">
//             Donate & Help Save a Life
//           </Typography>
//         </Box>
//       </Box>

//       <Container maxWidth="md" sx={{ mt: 5 }}>
//         {/* Info Section */}
//         <Typography variant="h5" gutterBottom align="center">
//           Every rupee you donate brings hope to an abandoned animal
//         </Typography>
//         <Typography variant="body1" align="center" mb={4}>
//           Your support allows us to rescue, rehabilitate, and rehome pets in need. Even a small contribution can provide food, shelter, and medical care to animals waiting for their forever home.
//         </Typography>

//         {/* Image Grid */}
//         <Grid container spacing={2} mb={4}>
//           {[pet1, pet2, pet3].map((img, index) => (
//             <Grid item xs={12} sm={4} key={index}>
//               <Paper elevation={2}>
//                 <img src={img} alt={`Pet ${index + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Donation Amount + QR */}
//         <Paper elevation={3} sx={{ padding: 4 }}>
//           <Typography variant="h6" gutterBottom>Enter Donation Amount</Typography>
//           <TextField
//             fullWidth
//             label="Amount in ₹"
//             variant="outlined"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             type="number"
//           />

//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//             onClick={handleDonateClick}
//           >
//             Generate QR to Pay
//           </Button>

//           {showQR && <GooglePayQR amount={amount} />}
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default Donate;




import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import GooglePayQR from '../Components/Payment/GooglePayQR';

// Pet Images
import pet1 from '../Assets/pet-1.png';
import pet2 from '../Assets/pet-2.png';
import pet3 from '../Assets/pet-3.png';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [showQR, setShowQR] = useState({ visible: false, thanked: false });

  const handleDonateClick = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    setShowQR({ visible: true, thanked: false });
  };

  const donationStories = [
    {
      img: pet1,
      title: 'Feed the Hungry',
      text:
        'Thousands of stray animals go to sleep hungry every night. Your donation helps us provide nutritious meals, clean water, and comfort to those who’ve never known kindness.',
    },
    {
      img: pet2,
      title: 'Medical Help',
      text:
        'Every day, injured and sick animals are found needing urgent care. Your donation ensures they receive life-saving treatment, vaccinations, and post-operative care.',
    },
    {
      img: pet3,
      title: 'Shelter & Safety',
      text:
        'Your support helps build safe, warm shelters for animals rescued from the streets. These safe havens give them love, care, and a chance to be adopted into forever homes.',
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#FFF8F0', minHeight: '100vh', pb: 6 }}>
      {/* Curved Orange Banner */}
      <Box
        sx={{
          height: '280px',
          backgroundColor: '#FFA500',
          borderBottomLeftRadius: '50% 20%',
          borderBottomRightRadius: '50% 20%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Donate & Help Save a Life
        </Typography>
      </Box>

      {/* Info Section */}
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ color: '#FF8C00', fontWeight: 'bold' }}
        >
          Every rupee you donate brings hope to an abandoned animal
        </Typography>
        <Typography variant="body1" align="center" mb={4}>
          Your kindness fuels our mission. Whether it's feeding a stray, healing a wound,
          or finding a home — your donation creates second chances and saves innocent lives.
        </Typography>

        {/* Z-formatted Pet Stories */}
        <Grid container spacing={4} mb={4}>
          {donationStories.map((item, index) => (
            <Grid
              container
              item
              spacing={2}
              key={index}
              alignItems="center"
              flexDirection={index % 2 === 0 ? 'row' : 'row-reverse'}
            >
              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    height: { xs: '220px', sm: '280px' },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                  }}
                >
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.title}
                    sx={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ color: '#FF8C00', fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {item.text}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>

        {/* Donation Box */}
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            backgroundColor: '#FFF3E0',
            border: '2px solid #FFA500',
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#FF8C00' }}
          >
            Enter Donation Amount
          </Typography>
          <TextField
            fullWidth
            label="Amount in ₹"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            sx={{ mt: 1 }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: '#FF8C00',
              '&:hover': {
                backgroundColor: '#FF7000',
              },
              fontWeight: 'bold',
            }}
            onClick={handleDonateClick}
          >
            Generate QR to Pay
          </Button>

          {/* QR Code + Thank You */}
          {showQR.visible && (
            <Box mt={4} textAlign="center">
              <GooglePayQR amount={amount} />

              {!showQR.thanked && (
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ mt: 2, fontWeight: 'bold' }}
                  onClick={() => setShowQR({ ...showQR, thanked: true })}
                >
                  I've Paid
                </Button>
              )}

              {showQR.thanked && (
                <Paper
                  elevation={3}
                  sx={{
                    mt: 4,
                    p: 3,
                    backgroundColor: '#E8F5E9',
                    border: '2px solid #4CAF50',
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
                    🎉 Thank You for Your Kind Donation!
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Your generosity is helping save lives and bring hope to homeless animals.
                  </Typography>
                </Paper>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Donate;
