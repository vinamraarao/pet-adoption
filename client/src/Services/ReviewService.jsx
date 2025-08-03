import axios from "axios";

const API = "http://localhost:5000/api/reviews"; // Adjust if hosted

export const submitReview = async (review) => {
  return axios.post(`${API}/add`, review);
};

export const getAllReviews = async () => {
  return axios.get(`${API}/all`);
};
