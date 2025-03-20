// Example API endpoint to handle adding reviews
const express = require("express");
const router = express.Router();
const Review = require("../models/Review"); // Import Review model
const User = require("../models/User");
const mongoose = require('mongoose');

router.post("/api/reviews", async (req, res) => {
    console.log("Received data:", req.body); // Log the request body for debugging
  
    const { userId, targetUserId, rating, comment } = req.body;
  
    // Validation
    if (!userId || !targetUserId || !rating || !comment) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    // Check that the userIds are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(targetUserId)) {
      return res.status(400).json({ error: "Invalid userId or targetUserId" });
    }
  
    try {
      const review = new Review({
        userId,
        targetUserId,
        rating,
        comment
      });
  
      await review.save();
      res.status(201).json(review); // Successfully saved review
    } catch (error) {
      console.error("Error saving review:", error);
      res.status(500).json({ error: "Failed to add review" });
    }
  });
  



router.get("/api/reviews/user/:userId", async (req, res) => {
  try {
    const reviews = await Review.find({ targetUserId: req.params.userId })
      .populate("userId", "name profilePicture")
      .sort({ createdAt: -1 }); // Sort by latest reviews first
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Add a review


module.exports = router;
