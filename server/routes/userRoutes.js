const express = require("express");
const router = express.Router();
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;


router.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, about, phone, location, profilePicture } = req.body;

        let imageUrl = profilePicture;
    if (profilePicture && profilePicture.startsWith("data:image")) {
      const uploadedResponse = await cloudinary.uploader.upload(profilePicture, {
        folder: "profile_pictures", 
      });
      imageUrl = uploadedResponse.secure_url;
    }

    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, about, phone, location, profilePicture: imageUrl },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "name profilePicture"); // Fetch only name and profilePicture
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/api/current-user", async (req, res) => {
  try {
    if (!req.user) {
      return res.json(null);
    }
    
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ error: "Failed to fetch current user" });
  }
});
module.exports = router;