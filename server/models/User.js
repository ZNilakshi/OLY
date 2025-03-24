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
// Add a virtual for reviews
UserSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'listedUserId'
});

// Update average rating when reviews change
UserSchema.methods.updateAverageRating = async function() {
  const reviews = await mongoose.model('Review').find({ listedUserId: this._id });
  if (reviews.length > 0) {
    this.averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    await this.save();
  }
};

module.exports = mongoose.model("User", UserSchema);