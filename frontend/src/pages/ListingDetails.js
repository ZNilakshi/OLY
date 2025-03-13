import { useLocation, useNavigate } from "react-router-dom";

const ListingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const listing = location.state?.listing;

  if (!listing) return <p>Listing not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">
        ← Back
      </button>
      <h2 className="text-2xl font-bold mb-2">{listing.title}</h2>
      <p className="text-gray-600 mb-2">{listing.description}</p>
      <p className="text-gray-700">Category: {listing.category}</p>
      <p className="text-gray-700">Size: {listing.size}</p>
      <p className="text-gray-700">Condition: {listing.condition}</p>
      <p className="text-green-600 font-bold mt-1">
        {listing.priceType === "Free"
          ? "Free"
          : listing.priceType === "Negotiable"
          ? ` $${listing.price}`
          : `$${listing.price}`}
      </p>
      {listing.photos.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {listing.photos.map((photo, index) => (
            <img key={index} src={URL.createObjectURL(photo)} alt="Preview" className="w-full h-40 object-cover rounded" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
