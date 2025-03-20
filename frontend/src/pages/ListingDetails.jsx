import React from "react";
import { useLocation, Link } from "react-router-dom";

const ListingDetails = () => {
  const location = useLocation();
  const { listing } = location.state;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{listing.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Listing Image */}
        <div>
          <img
            src={listing.photos[0]}
            alt="Listing Preview"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Listing Details */}
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
            <span className="font-semibold">Description:</span> {listing.description}
          </p>

          {/* Display User Details */}
          {listing.userId && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-100 flex items-center">
              {/* Clickable Profile Picture */}
              <Link to={`/user/${listing.userId._id}`}>
                <img
                  src={listing.userId.profilePicture || "https://via.placeholder.com/150"}
                  alt="User Profile"
                  className="w-16 h-16 rounded-full mr-4 cursor-pointer hover:opacity-75"
                />
              </Link>

              <div>
                <h3 className="text-lg font-semibold">Listed By</h3>
                <p className="text-gray-700"><span className="font-semibold">Name:</span> {listing.userId.name}</p>
                <p className="text-gray-700"><span className="font-semibold">Email:</span> {listing.userId.email}</p>
                <p className="text-gray-700"><span className="font-semibold">Phone:</span> {listing.userId.phone || "N/A"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
