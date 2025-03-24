import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingCard from "./ListingCard";
import { StarIcon } from "@heroicons/react/24/solid";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current logged-in user
        const currentUserRes = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });
        if (currentUserRes.ok) {
          const currentUserData = await currentUserRes.json();
          setCurrentUser(currentUserData.user || null);
        }

        // Fetch profile user
        const userResponse = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch user listings
        const listingsResponse = await fetch(
          `http://localhost:5000/api/listings/user/${userId}`
        );
        if (!listingsResponse.ok) throw new Error("Failed to fetch listings");
        const listingsData = await listingsResponse.json();
        setUserListings(listingsData);

        // Fetch user reviews
        const reviewsResponse = await fetch(
          `http://localhost:5000/api/reviews/user/${userId}`
        );
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || newReview.rating === 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${userId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setReviews([...reviews, data]);
        setNewReview({ rating: 0, comment: "" });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center text-red-500">User not found</div>;
  }

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "No ratings yet";

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
          <div className="flex items-center my-2">
            <span className="text-gray-600 mr-2">Rating: {averageRating}</span>
            {typeof averageRating === "number" && (
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < averageRating ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            )}
          </div>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone || "No phone available"}</p>
          <p className="text-gray-600">{user.location || "No location provided"}</p>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        
        {/* Review Form (only for logged-in users who aren't viewing their own profile) */}
        {currentUser && currentUser._id !== user._id && (
          <form onSubmit={handleReviewSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2">Add Your Review</h4>
            <div className="flex items-center mb-4">
              <span className="mr-2">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  <StarIcon
                    className={`h-6 w-6 ${star <= newReview.rating ? "text-yellow-400" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Write your review here..."
              className="w-full p-2 border rounded mb-4"
              rows="3"
            />
            <button
              type="submit"
              disabled={isSubmitting || newReview.rating === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <img
                    src={review.reviewer.profilePicture || "https://via.placeholder.com/150"}
                    alt={review.reviewer.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{review.reviewer.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet</p>
        )}
      </div>

      {/* User's Listings Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-2xl font-semibold mb-4">
          {currentUser && currentUser._id === user._id ? "Your Listings" : `Listings by ${user.name}`}
        </h3>
        {userListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userListings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No listings available</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;