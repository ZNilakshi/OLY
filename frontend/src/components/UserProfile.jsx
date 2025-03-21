import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating"; // Import the StarRating component

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch user data, listings, and reviews
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details
        const userResponse = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch user listings
        const listingsResponse = await fetch(`http://localhost:5000/api/listings/user/${userId}`);
        if (!listingsResponse.ok) throw new Error("Failed to fetch listings");
        const listingsData = await listingsResponse.json();
        setUserListings(listingsData);

        // Fetch reviews
        const reviewsResponse = await fetch(`http://localhost:5000/api/reviews/${userId}`);
        if (!reviewsResponse.ok) throw new Error("Failed to fetch reviews");
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const review = {
        reviewedUser: userId, // The user being reviewed
        rating,
        comment,
      };
  
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include credentials for session-based authentication
          credentials: "include",
        },
        body: JSON.stringify(review),
      });
  
      if (!response.ok) throw new Error("Failed to submit review");
  
      const newReview = await response.json();
      setReviews([...reviews, newReview]); // Add the new review to the list
      setRating(0); // Reset rating
      setComment(""); // Reset comment
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center text-red-500">User not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* User Profile Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <div className="flex flex-col items-center">
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone || "No phone available"}</p>
          <p className="text-gray-600">{user.location || "No location provided"}</p>
        </div>
      </div>

      {/* User's Listings Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Other Listings by {user.name}</h3>
        {userListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userListings.map((listing) => (
              <div key={listing._id} className="border rounded-lg p-4">
                <img
                  src={listing.photos[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-semibold">{listing.title}</h4>
                <p className="text-gray-600">{listing.category}</p>
                <p className="text-gray-600">
                  {listing.priceType === "Free" ? "Free" : `$${listing.price}`}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No listings available</p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={review.reviewer.profilePicture || "https://via.placeholder.com/150"}
                  alt={review.reviewer.name}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <p className="font-semibold">{review.reviewer.name}</p>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews available</p>
        )}
      </div>

      {/* Review Submission Form */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Leave a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Rating</label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-2 border rounded-lg"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;