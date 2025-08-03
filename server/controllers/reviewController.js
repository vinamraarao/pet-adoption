const Review = require("../models/Review");

// POST: Add Review
exports.addReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const newReview = new Review({ name, rating, comment });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit review" });
  }
};

// GET: All Reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
