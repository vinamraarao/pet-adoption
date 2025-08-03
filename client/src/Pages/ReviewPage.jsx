// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Rating,
//   Card,
//   CardContent,
//   Grid,
// } from '@mui/material';

// const ReviewPage = () => {
//   const [reviews, setReviews] = useState([]);
//   const [form, setForm] = useState({
//     name: '',
//     rating: 0,
//     comment: '',
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRatingChange = (e, newValue) => {
//     setForm({ ...form, rating: newValue });
//   };

//   const handleSubmit = () => {
//     if (form.name && form.rating && form.comment) {
//       setReviews([form, ...reviews]);
//       setForm({ name: '', rating: 0, comment: '' });
//     }
//   };

//   return (
//     <Box sx={{ p: 4, backgroundColor: '#fff8f1', minHeight: '100vh' }}>
//       <Typography variant="h4" sx={{ color: '#ff6f00', mb: 3, textAlign: 'center' }}>
//         Pet Adoption Reviews
//       </Typography>

//       {/* Review Form */}
//       <Box
//         sx={{
//           backgroundColor: '#ffe0b2',
//           p: 3,
//           borderRadius: 2,
//           maxWidth: 600,
//           mx: 'auto',
//           mb: 5,
//           boxShadow: 3,
//         }}
//       >
//         <Typography variant="h6" sx={{ mb: 2 }}>
//           Leave a Review
//         </Typography>
//         <TextField
//           fullWidth
//           label="Your Name"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//         />
//         <Rating
//           name="rating"
//           value={form.rating}
//           onChange={handleRatingChange}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           fullWidth
//           label="Your Comment"
//           name="comment"
//           value={form.comment}
//           onChange={handleChange}
//           multiline
//           rows={4}
//           sx={{ mb: 2 }}
//         />
//         <Button
//           variant="contained"
//           onClick={handleSubmit}
//           sx={{
//             backgroundColor: '#ff6f00',
//             '&:hover': { backgroundColor: '#e65100' },
//           }}
//         >
//           Submit Review
//         </Button>
//       </Box>

//       {/* Reviews List */}
//       <Grid container spacing={3} justifyContent="center">
//         {reviews.map((review, index) => (
//           <Grid item key={index} xs={12} sm={8} md={6}>
//             <Card sx={{ backgroundColor: '#fff3e0', boxShadow: 2 }}>
//               <CardContent>
//                 <Typography variant="h6" sx={{ color: '#ff6f00' }}>
//                   {review.name}
//                 </Typography>
//                 <Rating value={review.rating} readOnly />
//                 <Typography variant="body1" sx={{ mt: 1 }}>
//                   {review.comment}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default ReviewPage;





import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { submitReview, getAllReviews } from '../Services/ReviewService';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' });

  // Fetch reviews on load
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await getAllReviews();
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e, newValue) => {
    setForm({ ...form, rating: newValue });
  };

  const handleSubmit = async () => {
    if (form.name && form.rating && form.comment) {
      try {
        await submitReview(form);
        fetchReviews(); // Refresh reviews
        setForm({ name: '', rating: 0, comment: '' });
      } catch (err) {
        console.error("Error submitting review", err);
      }
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#fff8f1', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: '#ff6f00', mb: 3, textAlign: 'center' }}>
        Pet Adoption Reviews
      </Typography>

      {/* Review Form */}
      <Box
        sx={{
          backgroundColor: '#ffe0b2',
          p: 3,
          borderRadius: 2,
          maxWidth: 600,
          mx: 'auto',
          mb: 5,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Leave a Review
        </Typography>
        <TextField
          fullWidth
          label="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Rating
          name="rating"
          value={form.rating}
          onChange={handleRatingChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Your Comment"
          name="comment"
          value={form.comment}
          onChange={handleChange}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#ff6f00',
            '&:hover': { backgroundColor: '#e65100' },
          }}
        >
          Submit Review
        </Button>
      </Box>

      {/* Review List */}
      <Grid container spacing={3} justifyContent="center">
        {reviews.map((review, index) => (
          <Grid item key={index} xs={12} sm={8} md={6}>
            <Card sx={{ backgroundColor: '#fff3e0', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#ff6f00' }}>
                  {review.name}
                </Typography>
                <Rating value={review.rating} readOnly />
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewPage;
