
const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to the user who created the listing
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: String, required: true },
  condition: { type: String, required: true },
  rentOrSell: { type: String, required: true },
  priceType: { type: String, required: true },
  price: { type: Number },
  photos: [{ type: String }], 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Listing", ListingSchema);