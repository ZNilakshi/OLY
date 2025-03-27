import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

   console.log("Listing Data:", listing);

   useEffect(() => {
    if (listing.photos && listing.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % listing.photos.length
        );
      }, 3000); 

      return () => clearInterval(interval); 
    }
  }, [listing.photos]);

 

 
  if (!listing.photos || listing.photos.length === 0) {
    return <div className="text-center text-gray-500 py-4">No photos available for this listing.</div>;
  }

  
  const handleCardClick = () => {
    navigate(`/listing/${listing._id}`, { state: { listing } });
  };

  return (
    <div
      className="border border-gray-200 p-1 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white"
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={listing.photos[currentImageIndex]}
            alt={`Listing ${currentImageIndex}`}
            className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-105"
          />
         
          {listing.priceType === "Free" && (
            <div className="absolute top-2 right-2 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
              Free
            </div>
          )}
         
          {listing.priceType === "Negotiable" && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
              Negotiable
            </div>
          )}
          
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {listing.rentOrSell}
          </div>
        </div>

       
      </div>

     
      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-800 hover:text-teal-600 transition-colors duration-200">
          {listing.title}
        </h2>
        <p className="text-gray-600 mt-2">
          {listing.rentOrSell === "Sell" ? "Price" : "Rent"}:{" "}
          {listing.priceType === "Free"
            ? "Free"
            : listing.priceType === "Negotiable"
            ? `Rs.${listing.price} `
            : `Rs${listing.price}`}
        </p>
      </div>
    </div>
  );
};

export default ListingCard;