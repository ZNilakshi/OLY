import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingCard from "./ListingCard";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch user data and listings
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user
        const currentUserRes = await fetch("http://localhost:5000/user");
        if (currentUserRes.ok) {
          const currentUserData = await currentUserRes.json();
          setCurrentUser(currentUserData);
        }

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

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

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