import { useState } from "react";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newListing, setNewListing] = useState({
    category: "",
    title: "",
    description: "",
    size: "",
    condition: "",
    price: "",
    priceType: "Fixed", // Default to Fixed Price
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewListing({ ...newListing, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setNewListing({ ...newListing, photos: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setListings([...listings, newListing]);
    setNewListing({
      category: "",
      title: "",
      description: "",
      size: "",
      condition: "",
      price: "",
      priceType: "Fixed",
      photos: [],
    });
    setIsAdding(false);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsAdding(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Start Listing
      </button>

      {isAdding && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Add New Listing</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Category Selection */}
            <select
              name="category"
              value={newListing.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="Bags">Bags</option>
              <option value="Shoes">Shoes</option>
              <option value="Purses">Purses</option>
              <option value="Sarees">Sarees</option>
              <option value="Clothes">Clothes</option>
            </select>

            {/* Title */}
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newListing.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Description"
              value={newListing.description}
              onChange={handleChange}
              className="w-full p-2 border rounded resize-none"
              required
            />

            {/* Size */}
            <input
              type="text"
              name="size"
              placeholder="Size (e.g., Medium, 40, XL)"
              value={newListing.size}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            {/* Condition */}
            <select
              name="condition"
              value={newListing.condition}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>

            {/* Price Options */}
            <div className="flex gap-3">
              <select
                name="priceType"
                value={newListing.priceType}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"
                required
              >
                <option value="Fixed">Fixed Price</option>
                <option value="Free">Free</option>
                <option value="Negotiable">Negotiable</option>
              </select>
              {newListing.priceType === "Fixed" && (
                <input
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  value={newListing.price}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded"
                  required
                />
              )}
            </div>

            {/* Photo Upload */}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="w-full p-2 border rounded"
            />
            {newListing.photos.length > 0 && (
              <div className="mt-2 flex gap-2">
                {newListing.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt="Uploaded Preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Listings Display */}
      <div className="mt-6">
        {listings.length === 0 ? (
          <p className="text-gray-600">You haven't listed anything yet.</p>
        ) : (
          <ul className="space-y-4">
            {listings.map((listing, index) => (
              <li key={index} className="p-4 bg-white shadow rounded-lg">
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                <p className="text-gray-600">{listing.description}</p>
                <p className="text-sm text-gray-500">Size: {listing.size}</p>
                <p className="text-sm text-gray-500">
                  Condition: {listing.condition}
                </p>
                <p className="text-green-600 font-bold mt-1">
                  {listing.priceType === "Free"
                    ? "Free"
                    : listing.priceType === "Negotiable"
                    ? "Negotiable"
                    : `$${listing.price}`}
                </p>
                {listing.photos.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {listing.photos.map((photo, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(photo)}
                        alt="Listing Preview"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyListings;
