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


module.exports = router;