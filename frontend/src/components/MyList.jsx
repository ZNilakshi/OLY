// components/MyList.js
import { useState } from "react";

const MyList = ({ user }) => {
  const [newListing, setNewListing] = useState({
    category: "",
    title: "",
    description: "",
    size: "",
    condition: "",
    rentOrSell: "Sell",
    priceType: "Fixed",
    price: "",
    photos: [],
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewListing({ ...newListing, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewListing({ ...newListing, photos: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", user._id); // Use the user prop
    formData.append("category", newListing.category);
    formData.append("title", newListing.title);
    formData.append("description", newListing.description);
    formData.append("size", newListing.size);
    formData.append("condition", newListing.condition);
    formData.append("rentOrSell", newListing.rentOrSell);
    formData.append("priceType", newListing.priceType);
    formData.append("price", newListing.price);
    newListing.photos.forEach((photo) => formData.append("photos", photo));

    try {
      const response = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create listing");

      const data = await response.json();
      console.log("Listing created:", data);
      setIsAdding(false);
      setNewListing({
        category: "",
        title: "",
        description: "",
        size: "",
        condition: "",
        rentOrSell: "Sell",
        priceType: "Fixed",
        price: "",
        photos: [],
      }); // Reset form
    } catch (error) {
      console.error("Error submitting listing:", error);
    }
  };

  return (
    <div>
      {isAdding ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}
          <select
            name="category"
            value={newListing.category}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Bags">Bags</option>
            <option value="Shoes">Shoes</option>
            <option value="Purses">Purses</option>
            <option value="Sarees">Sarees</option>
            <option value="Clothes">Clothes</option>
          </select>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newListing.title}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={newListing.description}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="size"
            placeholder="Size (e.g., Medium, 40, XL)"
            value={newListing.size}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            name="condition"
            value={newListing.condition}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>

          <select
            name="rentOrSell"
            value={newListing.rentOrSell}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
          </select>

          <div className="flex gap-3">
            <select
              name="priceType"
              value={newListing.priceType}
              onChange={handleChange}
              className="w-1/2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Fixed">Fixed Price</option>
              <option value="Free">Free</option>
              <option value="Negotiable">Negotiable</option>
            </select>

            {(newListing.priceType === "Fixed" || newListing.priceType === "Negotiable") && (
              <input
                type="number"
                name="price"
                placeholder="Enter Price"
                value={newListing.price}
                onChange={handleChange}
                className="w-1/2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {newListing.photos.length > 0 && (
            <div className="mt-3 flex gap-2">
              {newListing.photos.map((photo, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(photo)}
                  alt="Uploaded Preview"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Add New Listing
        </button>
      )}
    </div>
  );
};

export default MyList;