import React, { useState, useEffect, useCallback } from "react";
import { useLocation} from "react-router-dom";

const ListingDetails = () => {
  const location = useLocation();
  const { listing } = location.state;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  
  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === listing.photos.length - 1 ? 0 : prevIndex + 1
    );
  }, [listing.photos.length]);

  
  useEffect(() => {
    if (listing.photos.length > 1) {
      const interval = setInterval(() => {
        nextPhoto();
      }, 3000); 

      
      return () => clearInterval(interval);
    }
  }, [nextPhoto, listing.photos.length]); 

  return (
    <div className="p-6 max-w-6xl mt-2 mx-auto bg-white rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
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

       
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-sm shadow-sm">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{listing.title}</h1>
            <p className="text-2xl font-semibold text-gray-900">
              {listing.price === 0 || listing.price === null ? "Free" : `$${listing.price}`}
            </p>
          </div>

         
          
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;