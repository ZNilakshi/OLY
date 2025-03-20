// server.js
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");

require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes"); // Add this line
const mongoose = require("mongoose");
const reviewRoutes = require("./routes/reviewRoutes"); // Add this line

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api", listingRoutes);

// Increase payload size limit
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(reviewRoutes);

app.use(
  session({
    secret: "Nilakshie",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(userRoutes);
app.use(listingRoutes); // Add this line

app.listen(5000, () => {
  console.log("Server running on port 5000");
});