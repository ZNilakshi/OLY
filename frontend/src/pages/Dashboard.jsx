import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    category: "",
    size: "",
    condition: "",
    priceType: "Fixed",
    price: "",
    photos: [],
  });

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        } else {
          navigate("/signup");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch all listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/listings");
        if (!response.ok) throw new Error("Failed to fetch listings");
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewListing({ ...newListing, [name]: value });
  };

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewListing({ ...newListing, photos: files });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", user._id); // Attach the user ID
    formData.append("title", newListing.title);
    formData.append("description", newListing.description);
    formData.append("category", newListing.category);
    formData.append("size", newListing.size);
    formData.append("condition", newListing.condition);
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
      setListings([...listings, data]); // Add the new listing to the state
      setIsAdding(false);
      setNewListing({
        title: "",
        description: "",
        category: "",
        size: "",
        condition: "",
        priceType: "Fixed",
        price: "",
        photos: [],
      }); // Reset form
    } catch (error) {
      console.error("Error submitting listing:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6">
     

     


      {/* Display Listings */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <div key={listing._id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{listing.title}</h2>
            <p className="text-gray-600">{listing.description}</p>
            <p className="text-gray-600">Category: {listing.category}</p>
            <p className="text-gray-600">Size: {listing.size}</p>
            <p className="text-gray-600">Condition: {listing.condition}</p>
            <p className="text-gray-600">
              Price:{" "}
              {listing.priceType === "Free"
                ? "Free"
                : listing.priceType === "Negotiable"
                ? `$${listing.price} (Negotiable)`
                : `$${listing.price}`}
            </p>
            {listing.photos.length > 0 && (
              <img
                src={listing.photos[0]}
                alt="Listing Preview"
                className="w-full h-32 object-cover mt-2 rounded"
              />
            )}
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Dashboard;