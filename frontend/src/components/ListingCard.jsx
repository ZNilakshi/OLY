import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  // Debugging: Log the listing object to verify its structure
  console.log("Listing Data:", listing);

  // Auto slideshow logic
  useEffect(() => {
    if (listing.photos && listing.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % listing.photos.length
        );
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [listing.photos]);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listing.photos.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.photos.length - 1 : prevIndex - 1
    );
  };

  // Ensure listing.photos exists and has at least one photo
  if (!listing.photos || listing.photos.length === 0) {
    return <div>No photos available for this listing.</div>;
  }

  // Handle click to navigate to listing details
  const handleCardClick = () => {
    navigate(`/listing/${listing._id}`, { state: { listing } });
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick} // Add click handler
    >
      <div className="mt-4 relative">
        <div className="relative">
          <img
            src={listing.photos[currentImageIndex]}
            alt={`Listing ${currentImageIndex}`}
            className="w-full h-64 object-cover rounded-lg"
          />
          {/* Free Badge */}
          {listing.priceType === "Free" && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Free
            </div>
          )}
          {/* Negotiable Badge */}
          {listing.priceType === "Negotiable" && (
            <div className="absolute top-1 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Negotiable
            </div>
          )}
          {/* Rent/Sell Badge */}
          <div className="absolute top-9 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {listing.rentOrSell}
          </div>
        </div>

        {/* Navigation Arrows */}
        {listing.photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              &gt;
            </button>
          </>
        )}
      </div>

      {/* Listing Details */}
      <h2 className="text-xl font-bold mt-4">{listing.title}</h2>
      <p className="text-gray-600">
        {listing.rentOrSell === "Sell" ? "Price" : "Rent"}:{" "}
        {listing.priceType === "Free"
          ? "Free"
          : listing.priceType === "Negotiable"
          ? `$${listing.price} (Negotiable)`
          : `$${listing.price}`}
      </p>
                 </div>
  );
};

export default ListingCard;