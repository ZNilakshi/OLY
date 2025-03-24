import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ListingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch logged-in user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });
        const data = await response.json();
        setUser(data.user || null);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Photo carousel logic
  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === listing?.photos.length - 1 ? 0 : prevIndex + 1
    );
  }, [listing?.photos.length]);

  useEffect(() => {
    if (listing?.photos.length > 1) {
      const interval = setInterval(() => {
        nextPhoto();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [nextPhoto, listing?.photos.length]);

  // Fetch listing details
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/listings/${id}`);
        if (!response.ok) throw new Error("Failed to fetch listing");
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleChatWithSeller = () => {
    if (!user) {
      navigate('/login', { state: { from: `/listings/${id}` } });
      return;
    }

    if (listing?.userId?.phone) {
      // Open WhatsApp with the seller's number
      const phoneNumber = listing.userId.phone;
      // Remove any non-digit characters from the phone number
      const cleanedNumber = phoneNumber.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${cleanedNumber}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert("Seller hasn't provided a phone number");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!listing) {
    return <div className="text-center text-red-500">Listing not found</div>;
  }

  return (
    <div className="p-6 max-w-6xl mt-2 mx-auto bg-white rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Photos and Details */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={listing.photos[currentPhotoIndex]}
              alt="Listing Preview"
              className="w-full h-96 object-cover rounded-sm shadow-md"
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto">
            {listing.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Listing Preview ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-sm cursor-pointer ${
                  index === currentPhotoIndex ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setCurrentPhotoIndex(index)}
              />
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-sm shadow-sm border border-gray">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Category:</span> {listing.category}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold text-gray-900">Size:</span> {listing.size}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold text-gray-900">Condition:</span> {listing.condition}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-sm shadow-sm border border-gray">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Description:</span> {listing.description}
            </p>
          </div>
        </div>

        {/* Right Column - Price and Seller Info */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-sm shadow-sm">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{listing.title}</h1>
            <p className="text-2xl font-semibold text-gray-900">
              {listing.price === 0 || listing.price === null ? "Free" : `$${listing.price}`}
            </p>
          </div>

          {listing?.userId && (
            <div className="bg-gray-50 p-6 rounded-sm shadow-sm border border-gray">
              <div className="flex items-center space-x-4">
                <Link to={`/user/${listing.userId._id}`}>
                  <img
                    src={listing.userId.profilePicture || "https://via.placeholder.com/150"}
                    alt="User Profile"
                    className="w-16 h-16 rounded-full cursor-pointer hover:opacity-75 transition-opacity"
                  />
                </Link>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Listed By</h3>
                  <p className="text-gray-700 flex items-center">
                    {listing.userId.name}<span className="mr-2">→</span>
                  </p>
                  {listing.userId.phone && (
                    <p className="text-sm text-gray-500 mt-1">
                      Phone: {listing.userId.phone}
                    </p>
                  )}
                </div>
              </div>
              <button
                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                onClick={handleChatWithSeller}
              >
                {user ? "Chat on WhatsApp" : "Login to Chat"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;