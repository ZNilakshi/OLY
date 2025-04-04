const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://oly-steel.vercel.app/login",
    successRedirect: "http://oly-steel.vercel.app",
  })
);


router.get("/user", async (req, res) => {
  if (!req.user) return res.json(null);

  const user = await User.findById(req.user._id);
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    about: user.about,  
    phone: user.phone,  
    location: user.location,  
    profilePicture: user.profilePicture,  
  });
});



router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session = null;
    res.redirect("http://oly-steel.vercel.app");
  });
});

module.exports = router;
