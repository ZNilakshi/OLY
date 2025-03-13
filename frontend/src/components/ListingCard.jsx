import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (listing.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === listing.photos.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [listing.photos.length]);

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden relative cursor-pointer"
      onClick={() => navigate(`/listing/${index}`, { state: { listing } })}
    >
      {listing.photos.length > 0 && (
        <div className="relative w-full h-40">
          <img
            src={URL.createObjectURL(listing.photos[currentImageIndex])}
            alt="Listing Preview"
            className="w-full h-full object-cover"
          />
          {(listing.priceType === "Free" || listing.priceType === "Negotiable") && (
            <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-sm rounded">
              {listing.priceType === "Free" ? "Free" : "Negotiable"}
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-sm text-gray-500">Size: {listing.size}</p>
        <p className="text-sm text-gray-500">Condition: {listing.condition}</p>
        <p className="text-green-600 font-bold mt-1">
          {listing.priceType === "Free"
            ? "Free"
            : listing.priceType === "Negotiable"
            ? ` $${listing.price}`
            : `$${listing.price}`}
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
