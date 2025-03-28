import { useState, useEffect } from "react";
import Lcard from "./Lcard";
import { FaEdit, FaTrash } from "react-icons/fa"; 

const MyList = ({ user }) => {
  const [listings, setListings] = useState([]);
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch listings for the current user
  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchListings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/listings/user/${user._id}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user?._id]);

  // Handle Edit Listing
  const handleEdit = (listing) => {
    setEditingListing(listing);
    setIsEditing(true);
    setNewListing({
      category: listing.category,
      title: listing.title,
      description: listing.description,
      size: listing.size,
      condition: listing.condition,
      rentOrSell: listing.rentOrSell,
      priceType: listing.priceType,
      price: listing.price,
      photos: listing.photos,
    });
  };

  // Handle Update Listing
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
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
      const response = await fetch(`http://localhost:5000/api/listings/${editingListing._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update listing");

      const data = await response.json();
      setListings(listings.map((listing) => (listing._id === data._id ? data : listing)));
      setIsEditing(false);
      setEditingListing(null);
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  // Handle Delete Listing
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/listings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete listing");

      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewListing({ ...newListing, [name]: value });
  };

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewListing({ ...newListing, photos: [...newListing.photos, ...files] });
  };

  // Handle Remove Photo
  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...newListing.photos];
    updatedPhotos.splice(index, 1);
    setNewListing({ ...newListing, photos: updatedPhotos });
  };

  // Handle Submit (Add Listing)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", user._id);
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
      setListings([...listings, data]);
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
      });
    } catch (error) {
      console.error("Error submitting listing:", error);
    }
  };

  // Loading State
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  // No User State
  if (!user) {
    return <div className="text-center text-lg">Please log in to view your listings.</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Add New Listing Button */}
      <button
        onClick={() => setIsAdding(true)}
        className="w-full md:w-auto bg-teal-600 hover:bg-teal-800 text-white p-3 rounded-lg mb-6 font-medium transition-colors shadow-md"
      >
        Add New Listing
      </button>

      {/* Listings Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {listings.map((listing) => (
          <div key={listing._id} className="relative group">
            <Lcard listing={listing} />
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(listing)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
                title="Edit"
              >
                <FaEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(listing._id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                title="Delete"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Listing Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isEditing ? "Edit Listing" : "Add New Listing"}
                </h2>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setIsEditing(false);
                    setEditingListing(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600 text-sm font-medium">Category</label>
                  <select
                    name="category"
                    value={newListing.category}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent appearance-none"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Bags">Bags</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Purses">Purses</option>
                    <option value="Sarees">Sarees</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Accessorize">Accessorize</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                {/* Title */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600  text-sm font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Product Title"
                    value={newListing.title}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400  focus:border-transparent"
                    required
                  />
                </div>

                {/* Description (full width) */}
                <div className="relative md:col-span-2">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600  text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    placeholder="Detailed description of your product"
                    value={newListing.description}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400  focus:border-transparent resize-none"
                    rows="4"
                    required
                  />
                </div>

                {/* Size */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600 text-sm font-medium">Size</label>
                  <input
                    type="text"
                    name="size"
                    placeholder="Medium, 40, XL etc."
                    value={newListing.size}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400  focus:border-transparent"
                    required
                  />
                </div>

                {/* Condition */}
                <div className="relative ">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600  text-sm font-medium">Condition</label>
                  <select
                    name="condition"
                    value={newListing.condition}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent appearance-none"
                    required
                  >
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </select>
                </div>

                {/* Rent or Sell */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600  text-sm font-medium">Listing Type</label>
                  <select
                    name="rentOrSell"
                    value={newListing.rentOrSell}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent appearance-none"
                    required
                  >
                    <option value="Sell">Sell</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>

                {/* Price Type and Price */}
                <div className="relative md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600  text-sm font-medium">Price Type</label>
                      <select
                        name="priceType"
                        value={newListing.priceType}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent appearance-none"
                         required
                      >
                        <option value="Fixed">Fixed Price</option>
                        <option value="Free">Free</option>
                        <option value="Negotiable">Negotiable</option>
                      </select>
                    </div>

                    {(newListing.priceType === "Fixed" || newListing.priceType === "Negotiable") && (
                      <div className="relative">
                        <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600 text-sm font-medium">Price (Rs)</label>
                        <input
                          type="number"
                          name="price"
                          placeholder="Enter Price"
                          value={newListing.price}
                          onChange={handleChange}
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Photos Upload */}
                <div className="relative md:col-span-2">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600  text-sm font-medium">Product Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400  focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-orange-100"
                  />
                </div>

                {/* Photo Previews */}
                {newListing.photos.length > 0 && (
                  <div className="flex flex-wrap gap-4 md:col-span-2">
                    {newListing.photos.map((photo, index) => {
                      const photoUrl = photo instanceof File || photo instanceof Blob
                        ? URL.createObjectURL(photo)
                        : photo;
                      return (
                        <div key={index} className="relative">
                          <img
                            src={photoUrl}
                            alt="Uploaded Preview"
                            className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 md:col-span-2 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-teal-500  hover:bg-teal-600  text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-md"
                  >
                    {isEditing ? "Update Listing" : "Create Listing"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setIsEditing(false);
                      setEditingListing(null);
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyList;