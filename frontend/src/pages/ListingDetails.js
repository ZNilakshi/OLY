import React from "react";
import { useLocation } from "react-router-dom";

const ListingDetails = () => {
  const location = useLocation();
  const { listing } = location.state; 

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{listing.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        <div>
          <img
            src={listing.photos[0]} 
            alt="Listing Preview"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
       
        <div className="space-y-4">
          <p className="text-gray-600">
            <span className="font-semibold">Category:</span> {listing.category}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Size:</span> {listing.size}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Condition:</span> {listing.condition}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Price:</span>{" "}
            {listing.priceType === "Free"
              ? "Free"
              : listing.priceType === "Negotiable"
              ? `$${listing.price} (Negotiable)`
              : `$${listing.price}`}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Description:</span>{" "}
            {listing.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;