import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "./../components/ListingCard";
import { FiLoader } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });
        const userData = await userResponse.json();
        
        if (!userData.user) {
          navigate("/");
          return;
        }
        
        setUser(userData.user);

        const listingsResponse = await fetch("http://localhost:5000/api/listings");
        if (!listingsResponse.ok) throw new Error("Failed to fetch listings");
        const listingsData = await listingsResponse.json();
        
        setListings(listingsData);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FiLoader className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
     
      <div className="relative">
        <div 
          className="h-[500px] bg-cover bg-center w-full" 
          style={{
            backgroundImage: "url('/dashboard.webp')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center p-4 text-white max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Welcome back, {user?.name || user?.username || 'User'}!
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-6">
                Discover your perfect space
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Listings section */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Available Properties
          </h2>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">
              No properties available yet
            </h3>
            <button
              onClick={() => navigate("/create-listing")}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Be the first to list
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {listings.map((listing) => (
              <ListingCard 
                key={listing._id} 
                listing={listing} 
                user={user} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;