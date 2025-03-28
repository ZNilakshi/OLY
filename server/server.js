const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const mongoose = require("mongoose");

require("./config/passport"); // Ensure this sets up Passport strategies

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");
const sendMailRouter = require("./routes/sendMailRouter");

const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://oly-steel.vercel.app",
  "https://oly-production.up.railway.app",
];

app.use(
  cors({
    origin: allowedOrigins, // Use the array of allowed origins
    credentials: true, // Required for cookies/sessions
  })
);

// Body Parsers (for JSON and form data)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "Nilakshie", // Use env variable for secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      sameSite: "lax", // Helps with CSRF protection
    },
  })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes); // Prefix all auth routes with /api/auth
app.use("/api/users", userRoutes); // Prefix user routes
app.use("/api/listings", listingRoutes); // Prefix listing routes
app.use("/api/send-email", sendMailRouter); // Already prefixed

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});