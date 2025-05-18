const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_BASE_URL}/login`,
    successRedirect: process.env.CLIENT_BASE_URL,
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
    res.redirect(process.env.CLIENT_BASE_URL);
  });
});

module.exports = router;
