const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db"); // Import DB connection
require("./config/passport"); // Import Passport config
const User = require("./models/User"); // Import User model
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const multer = require("multer");
const path = require("path");
const app = express();

// Connect to MongoDB
connectDB();
// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save files in the "uploads" folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
    },
  });
  
  const upload = multer({ storage });
  
  // Middleware
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());
  app.use("/uploads", express.static("uploads")); // Serve uploaded files

app.use(
  session({
    secret: "your_secret_key", // Replace with a strong secret
    resave: false, // Prevents session from being saved on every request
    saveUninitialized: true, // Save new sessions that have not been modified
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.put("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Received User ID:", id); // Log the ID
      console.log("Request Body:", req.body); // Log the request body
  
      // Validate the ID
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      const { name, about, phone, location, profilePicture } = req.body;
  
      // Update user details in the database
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, about, phone, location, profilePicture },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error); // Log the full error
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
app.listen(5000, () => console.log("🚀 Server running on port 5000"));