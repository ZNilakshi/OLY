const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");
const sendMailRouter = require("./routes/sendMailRouter");

const cloudinary = require("cloudinary").v2;

// -------------------- Cloudinary --------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------- MongoDB --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();

// -------------------- CORS --------------------
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL, // e.g. https://your-frontend.vercel.app
    credentials: true,
  })
);

// -------------------- Body Parser --------------------
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// -------------------- Session --------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "Nilakshie",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: true,
    },
  })
);

// -------------------- Passport --------------------
app.use(passport.initialize());
app.use(passport.session());

// -------------------- Routes --------------------
app.use("/api", listingRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(listingRoutes);
app.use("/api/send-email", sendMailRouter);

// -------------------- Server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
