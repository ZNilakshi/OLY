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

const allowedOrigins = [
  "https://oly-steel.vercel.app",
  "http://oly-steel.vercel.app",
  "http://localhost:3000" 
];

app.use(cors({ 
  origin: [
    "https://oly-steel.vercel.app",
    "http://oly-steel.vercel.app",
    "http://localhost:3000"
  ], 
  credentials: true 
}));

app.use("/api", listingRoutes);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "Nilakshie", 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", 
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000 
    
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(userRoutes);
app.use(listingRoutes); 
app.use("/api/send-email", sendMailRouter); 



app.listen(5000, () => {
  console.log("Server running on port 5000");
});