
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); 
const Listing = require("../models/Listing");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const multer = require("multer"); 
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });


router.post("/api/listings", upload.array("photos"), async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body
    console.log("Uploaded Files:", req.files); // Log the uploaded files

    const { userId, category, title, description, size, condition, rentOrSell, priceType, price } = req.body;

   
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

  
    if (!category || !title || !description || !size || !condition) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No photos uploaded" });
    }

    const photoUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "listings",
      });
      photoUrls.push(result.secure_url);
    }

    
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


router.get("/api/listings", async (req, res) => {
  try {
    const listings = await Listing.find().populate("userId", "username email"); // Populate user details if needed
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});
router.get("/api/listings/user/:userId", async (req, res) => {
  try {
    const userListings = await Listing.find({ userId: req.params.userId });
    res.json(userListings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings" });
  }
});

module.exports = router;