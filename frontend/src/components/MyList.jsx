import { useState } from "react";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewListing({ ...newListing, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setListings([...listings, newListing]);
    setNewListing({ title: "", description: "", price: "" });
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
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newListing.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newListing.description}
              onChange={handleChange}
              className="w-full p-2 border rounded resize-none"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newListing.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
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

      <div className="mt-6">
        {listings.length === 0 ? (
          <p className="text-gray-600">You haven't listed anything yet.</p>
        ) : (
          <ul className="space-y-4">
            {listings.map((listing, index) => (
              <li key={index} className="p-4 bg-white shadow rounded-lg">
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                <p className="text-gray-600">{listing.description}</p>
                <p className="text-green-600 font-bold mt-1">${listing.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyListings;
