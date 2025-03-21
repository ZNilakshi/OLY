const express = require("express");
const router = express.Router();
const passport = require("passport");
const Review = require("../models/Review");

// Submit a review (protected route)
router.post(
  "/api/reviews",
  passport.authenticate("google", { session: false }), // Use Google OAuth2 strategy
  async (req, res) => {
    try {
      const { reviewedUser, rating, comment } = req.body;

      // Ensure the user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const review = new Review({
        reviewer: req.user._id, // Use the authenticated user's ID
        reviewedUser,
        rating,
        comment,
      });

      await review.save();
      res.status(201).json(review);
    } catch (error) {
      console.error("Error submitting review:", error);
      res.status(500).json({ error: "Failed to submit review" });
    }
  }
);

module.exports = router;

// Fetch reviews for a user
router.get("/api/reviews/:userId", async (req, res) => {
  try {
    const reviews = await Review.find({ reviewedUser: req.params.userId }).populate("reviewer", "name profilePicture");
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;