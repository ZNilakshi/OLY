import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });
        const data = await response.json();
        if (!data.user) {
          navigate("/signup");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch all listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/listings");
        if (!response.ok) throw new Error("Failed to fetch listings");
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition duration-300"
            onClick={() => navigate(`/listing/${listing._id}`, { state: { listing } })}
          >
            <div className="flex items-center mb-3">
              {listing.userId?.profilePicture ? (
                <img
                  src={listing.userId.profilePicture}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full mr-3"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              )}
              <p className="font-semibold text-gray-700">{listing.userId?.name || "Unknown User"}</p>
            </div>
            <h2 className="text-xl font-bold">{listing.title}</h2>
            <p className="text-gray-600">{listing.description}</p>
            <p className="text-gray-600">Category: {listing.category}</p>
            <p className="text-gray-600">Size: {listing.size}</p>
            <p className="text-gray-600">Condition: {listing.condition}</p>
            <p className="text-gray-600">
              Price:{" "}
              {listing.priceType === "Free"
                ? "Free"
                : listing.priceType === "Negotiable"
                ? `$${listing.price} (Negotiable)`
                : `$${listing.price}`}
            </p>
            {listing.photos.length > 0 && (
              <img
                src={listing.photos[0]}
                alt="Listing Preview"
                className="w-full h-32 object-cover mt-2 rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
