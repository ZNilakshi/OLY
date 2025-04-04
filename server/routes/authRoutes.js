const express = require("express");
const passport = require("passport");

const router = express.Router();


// Modified Google auth route to accept redirect parameter
router.get("/auth/google", (req, res, next) => {
  const redirectUrl = req.query.redirect || "http://oly-steel.vercel.app/dashboard";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirectUrl, // Pass the redirect URL via state
  })(req, res, next);
});


router.get(
  "/auth/google/callback",
  passport.authenticate("google", { 
    failureRedirect: "http://oly-steel.vercel.app/login",
    session: true 
  }),
  (req, res) => {
    // Use the stored redirect URL or fallback to production
    const redirectUrl = req.session.returnTo || "http://oly-steel.vercel.app/dashboard";
    delete req.session.returnTo; // Clean up
    res.redirect(redirectUrl);
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
