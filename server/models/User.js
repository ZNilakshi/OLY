const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  about: String,
  phone: String,
  location: String,
  profilePicture: String,
  averageRating: { type: Number, default: 0 },

  role: { type: String, enum: ["admin", "user"], default: "user" },
});


module.exports = mongoose.model("User", UserSchema);