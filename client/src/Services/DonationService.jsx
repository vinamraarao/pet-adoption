// DonationService.jsx
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/donations'; // Adjust port if needed

export const makeDonation = async (donationData) => {
  try {
    const response = await axios.post(API_URL, donationData);
    return response.data;
  } catch (error) {
    console.error('Donation failed:', error);
    throw error;
  }
};
