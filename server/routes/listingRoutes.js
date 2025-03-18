// routes/listingRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // Import mongoose
const Listing = require("../models/Listing");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const multer = require("multer"); // Import multer
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Create a new listing
router.post("/api/listings", upload.array("photos"), async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body
    console.log("Uploaded Files:", req.files); // Log the uploaded files

    const { userId, category, title, description, size, condition, rentOrSell, priceType, price } = req.body;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Validate required fields
    if (!category || !title || !description || !size || !condition) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No photos uploaded" });
    }

    // Upload photos to Cloudinary
    const photoUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "listings",
      });
      photoUrls.push(result.secure_url);
    }

    // Save listing to the database
    const newListing = new Listing({
      userId,
      category,
      title,
      description,
      size,
      condition,
      rentOrSell,
      priceType,
      price,
      photos: photoUrls,
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ error: "Failed to create listing" });
  }
});

module.exports = router;