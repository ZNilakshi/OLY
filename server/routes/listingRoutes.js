
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

router.get("/user/:userId", async (req, res) => {
  try {
    const listings = await Listing.find({ userId: req.params.userId });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

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
    const listings = await Listing.find().populate("userId", "name email phone profilePicture");
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});
router.get('/api/listings/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const listings = await Listing.find({ category: new RegExp(category, 'i') })
      .populate("userId", "name email phone profilePicture"); // Populate user details
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings", error });
  }
});

router.get("/api/listings/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const userListings = await Listing.find({ userId }).populate("userId", "name email phone profilePicture");
    res.json(userListings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

router.put("/api/listings/:id", upload.array("photos"), async (req, res) => {
  try {
    const { id } = req.params;
    const { category, title, description, size, condition, rentOrSell, priceType, price } = req.body;

    // Validate required fields
    if (!category || !title || !description || !size || !condition) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Handle photo uploads (if new photos are provided)
    let photoUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "listings",
        });
        photoUrls.push(result.secure_url);
      }
    }

    // Find the listing and update it
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      {
        category,
        title,
        description,
        size,
        condition,
        rentOrSell,
        priceType,
        price,
        photos: photoUrls.length > 0 ? photoUrls : undefined, // Only update photos if new ones are uploaded
      },
      { new: true } // Return the updated document
    );

    if (!updatedListing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ error: "Failed to update listing" });
  }
});


router.delete("/api/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the listing
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ error: "Failed to delete listing" });
  }
});



router.get("/api/listings/search", async (req, res) => {
  try {
    const { q } = req.query; // Get the search query from the URL

    // Search for listings where the title or category matches the query (case-insensitive)
    const listings = await Listing.find({
      $or: [
        { title: { $regex: q, $options: "i" } }, // Case-insensitive search for title
        { category: { $regex: q, $options: "i" } }, // Case-insensitive search for category
      ],
    }).populate("userId", "name email phone profilePicture");

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error searching listings:", error);
    res.status(500).json({ error: "Failed to search listings" });
  }
});

router.get("/api/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate listing ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    const listing = await Listing.findById(id).populate("userId", "name email phone profilePicture");

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).json({ error: "Failed to fetch listing" });
  }
});
router.get("/api/listings/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;

    
    const reviews = await Review.find({ listedUserId: id });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});
module.exports = router;