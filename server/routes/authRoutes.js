const express = require("express");
const passport = require("passport");

const router = express.Router();


router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));


router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard"); // Redirect to frontend dashboard
  }
);


router.get("/api/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// Logout
router.post("/api/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
