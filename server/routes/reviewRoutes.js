const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const User = require("../models/User");
const mongoose = require("mongoose");

// Create a new review
router.post("/reviews", async (req, res) => {
  try {
    const { listedUserId, reviewUserId, rating, review } = req.body;

    // Validate input
    if (!listedUserId || !reviewUserId || !rating || !review) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if rating is valid (1-5)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    // Create new review
    const newReview = new Review({
      listedUserId,
      reviewUserId,
      rating,
      review
    });

    await newReview.save();

    // Update the user's average rating
    await updateUserAverageRating(listedUserId);

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
});

// Get reviews for a specific user
router.get("/api/reviews/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ listedUserId: userId })
      .populate("reviewUserId", "name profilePicture");

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Helper function to update user's average rating
async function updateUserAverageRating(userId) {
  const reviews = await Review.find({ listedUserId: userId });
  
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    
    await User.findByIdAndUpdate(userId, { averageRating });
  }
}

module.exports = router;