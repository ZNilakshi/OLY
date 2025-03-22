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
    setNewListing({ ...newListing, photos: files });
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
    <div className="p-4 md:p-8">
      {/* Add New Listing Button */}
      <button
        onClick={() => setIsAdding(true)}
        className="w-full md:w-auto bg-blue-500 text-white p-3 rounded-lg mb-6"
      >
        Add New Listing
      </button>

      
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <div key={listing._id} className="relative">
            <Lcard listing={listing} />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEdit(listing)}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  <FaEdit className="w-3 h-3" /> 
               
              </button>
              <button
                onClick={() => handleDelete(listing._id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
              >
                <FaTrash className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

     
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Listing" : "Add New Listing"}
            </h2>
            <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="space-y-4">
              <select
                name="category"
                value={newListing.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select Category</option>
                <option value="Bags">Bags</option>
                <option value="Shoes">Shoes</option>
                <option value="Purses">Purses</option>
                <option value="Sarees">Sarees</option>
                <option value="Clothes">Clothes</option>
                <option value="Accessorize">Accessorize</option>
                <option value="Others">others</option>
              </select>

              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newListing.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={newListing.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg resize-none"
                required
              />

              <input
                type="text"
                name="size"
                placeholder="Size (e.g., Medium, 40, XL)"
                value={newListing.size}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />

              <select
                name="condition"
                value={newListing.condition}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
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
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
              </select>

              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  name="priceType"
                  value={newListing.priceType}
                  onChange={handleChange}
                  className="w-full sm:w-1/2 p-2 border rounded-lg"
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
                    className="w-full sm:w-1/2 p-2 border rounded-lg"
                    required
                  />
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="w-full p-2 border rounded-lg"
              />

              {newListing.photos.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {newListing.photos.map((photo, index) => {
                    const photoUrl = photo instanceof File || photo instanceof Blob
                      ? URL.createObjectURL(photo)
                      : photo;
                    return (
                      <img
                        key={index}
                        src={photoUrl}
                        alt="Uploaded Preview"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    );
                  })}
                </div>
              )}

              <div className="flex gap-3">
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg">
                  {isEditing ? "Update" : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setIsEditing(false);
                    setEditingListing(null);
                  }}
                  className="w-full bg-gray-400 text-white p-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyList;