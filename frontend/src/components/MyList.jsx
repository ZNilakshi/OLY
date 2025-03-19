import { useState, useEffect } from "react";
import ListingCard from "./ListingCard";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchListings = async () => {
      if (!user?._id) return console.error("User ID is missing");

      try {
        console.log("Fetching listings for user ID:", user._id);
        const response = await fetch(`http://localhost:5000/api/listings/user/${user._id}`);

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Listings:", data);
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user?._id]);

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
      console.log("Listing created:", data);
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center text-lg">Please log in to view your listings.</div>;
  }

  return (
    <div className="p-4 md:p-8">
      {isAdding ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
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

          <div className="flex gap-3">
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg">
              Submit
            </button>
            <button type="button" onClick={() => setIsAdding(false)} className="w-full bg-gray-400 text-white p-2 rounded-lg">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setIsAdding(true)} className="w-full md:w-auto bg-blue-500 text-white p-3 rounded-lg">
          Add New Listing
        </button>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default MyList;
