import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "./../components/ListingCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });
        const data = await response.json();
        if (!data.user) {
          navigate("/");
        } else {
          setUser(data.user);
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
    <div className="bg-gray-50">
      {/* Header with photo */}
      <div className="relative h-64 w-full">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/beer.jpg')"
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            {user && (
              <div className="text-center p-4 text-white">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome back, {user.name || user.username}!</h1>
                <p className="text-lg sm:text-xl">Find your perfect place</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Listings grid */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Available Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;