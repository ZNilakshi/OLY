import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating"; // Import the StarRating component

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 1, comment: "" });
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

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

        // Fetch user reviews
        const reviewsResponse = await fetch(`http://localhost:5000/api/reviews/user/${userId}`);
        if (!reviewsResponse.ok) throw new Error("Failed to fetch reviews");
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        // Calculate the average rating
        const totalRatings = reviewsData.reduce((acc, review) => acc + review.rating, 0);
        setAverageRating(totalRatings / reviewsData.length);
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

    const loggedInUserId = "GET_THE_LOGGED_IN_USER_ID"; // Replace with actual user ID from auth

    try {
        const response = await fetch("http://localhost:5000/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: loggedInUserId,  // Pass correct user ID
                targetUserId: userId,
                rating: newReview.rating,
                comment: newReview.comment,
            }),
        });

        if (!response.ok) throw new Error("Failed to add review");
        const reviewData = await response.json();
        setReviews([reviewData, ...reviews]);

        // Recalculate average rating
        const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0) + newReview.rating;
        setAverageRating(totalRatings / (reviews.length + 1));

        setNewReview({ rating: 1, comment: "" });
    } catch (error) {
        console.error("Error adding review:", error);
    }
};


  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center text-red-500">User not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
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

        {/* Display Average Rating */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Average Rating</h3>
          <StarRating 
            rating={averageRating} 
            onRatingChange={() => {}} // Disable the edit of average rating
            totalStars={5} 
          />
          <p className="text-gray-600">({averageRating.toFixed(1)} / 5)</p> {/* Show numeric rating */}
        </div>
      </div>

      {/* Display User's Listings */}
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
                <p className="text-gray-600">{listing.priceType === "Free" ? "Free" : `$${listing.price}`}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No listings available</p>
        )}
      </div>

      {/* Display Reviews */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        {reviews.length > 0 ? (
          <div>
            {reviews.map((review) => (
              <div key={review._id} className="border p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <img
                    src={review.userId.profilePicture || "https://via.placeholder.com/50"}
                    alt={review.userId.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <p className="font-semibold">{review.userId.name}</p>
                </div>
                <div className="flex mb-2">
                  <StarRating rating={review.rating} totalStars={5} /> {/* Display rating as stars */}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet</p>
        )}
      </div>

      {/* Add Review */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Add a Review</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="text-lg font-semibold">Rating</label>
            <StarRating
              rating={newReview.rating}
              onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
            />
          </div>
          <div>
            <label className="text-lg font-semibold">Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
