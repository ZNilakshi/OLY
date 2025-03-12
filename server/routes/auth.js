const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// Google Auth Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Auth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    successRedirect: "http://localhost:3000",
  })
);

// Get Logged-in User
router.get("/user", async (req, res) => {
  if (!req.user) return res.json(null);

  const user = await User.findById(req.user._id);
  res.json({
    id: user._id, // Include the `id` field
    name: user.name,
    email: user.email,
    role: user.role,
    // Include other fields as needed
  });
});

// Logout Route
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session = null;
    res.redirect("http://localhost:3000");
  });
});

module.exports = router;
