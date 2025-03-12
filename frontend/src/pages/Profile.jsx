import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyList from "../components/MyList";
import { useEffect } from "react";
import { fetchUser } from "../redux/authSlice";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("User object:", user);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(fetchUser()); // Fetch user data when component loads
  }, [dispatch]);

  // Add this line
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    about: user.about || "",
    phone: user.phone || "",
    location: user.location || "",
    profilePicture: user.profilePicture || "/default-avatar.png",
  });

  const [activeTab, setActiveTab] = useState("My Listings");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData({ ...profileData, profilePicture: imageUrl });
    }
  };

  const handleSave = async () => {
    if (!user?.id) {
      console.error("User ID is missing");
      alert("User ID is missing. Please log in again.");
      return;
    }
  
    try {
      const dataToSend = {
        ...profileData,
        profilePicture: profileData.profilePicture || "/default-avatar.png", // Add a default value
      };
  
      console.log("Profile Data:", dataToSend); // Log the profile data
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
  
      const updatedUser = await response.json();
  
      // Dispatch action to update Redux store
      dispatch({ type: "UPDATE_PROFILE", payload: updatedUser });
  
      // Close edit mode
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
        
        {/* Left Section: Profile Info */}
        <div className="flex flex-col items-center text-center md:text-left w-full md:w-1/2 p-6 border-r border-gray-300">
          <img
            src={profileData.profilePicture}
            alt="Profile"
            className="rounded-full w-28 h-28 border-4 border-teal-400 shadow-md"
          />
          <h2 className="text-2xl font-semibold mt-2">{profileData.name}</h2>
          <p className="text-gray-600 text-sm">
            {user.followers || 0} Followers • {user.following || 0} Following
          </p>
          <p className="text-gray-500 text-sm mt-1">{profileData.about}</p>
          <p className="text-gray-500 text-sm mt-1">{profileData.phone}</p>
          <p className="text-gray-500 text-sm mt-1">📍 {profileData.location || "No location set"}</p>

          {/* Only show Edit Profile button for regular users */}
          {user.role !== "admin" && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-teal-600 text-white px-5 py-2 mt-4 hover:bg-teal-900 transition rounded-lg"
            >
              Edit Profile
            </button>
          )}

          {/* Show Admin Panel button for admins */}
          {user.role === "admin" && (
            <button
              onClick={() => window.location.href = "/admin"}
              className="bg-red-600 text-white px-5 py-2 mt-4 hover:bg-red-800 transition rounded-lg"
            >
              Go to Admin Panel
            </button>
          )}
        </div>

        {/* Right Section: Tabs */}
        <div className="flex flex-col w-full md:w-1/2 p-6">
          <div className="flex justify-between border-b border-gray-300 mb-4">
            {user.role === "admin" ? (
              <button className="px-4 py-2 border-b-2 border-red-600 text-red-600">
                Admin Dashboard
              </button>
            ) : (
              ["My Listings", "Wishlist", "Orders"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${
                    activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))
            )}
          </div>
          
          {/* Display content based on role */}
          <div className="text-center">
            {user.role === "admin" ? (
              <p className="text-gray-600">
                Welcome to the Admin Dashboard. Manage users, listings, and more.
              </p>
            ) : (
              <>
                {activeTab === "My Listings" && <p className="text-gray-600"><MyList /></p>}
                {activeTab === "Wishlist" && <p className="text-gray-600">No items in wishlist yet.</p>}
                {activeTab === "Orders" && <p className="text-gray-600">No orders placed yet.</p>}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Section - Only for Regular Users */}
      {isEditing && user.role !== "admin" && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border border-gray-300">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
      <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full mt-1 border p-2 rounded-lg border-gray-300" />
      
      <label className="block text-sm font-medium text-gray-700 mt-3">Name</label>
      <input type="text" name="name" value={profileData.name} onChange={handleChange} className="block w-full border p-2 rounded-lg border-gray-300" />
      
      <label className="block text-sm font-medium text-gray-700 mt-3">Phone</label>
      <input type="tel" name="phone" value={profileData.phone} onChange={handleChange} className="block w-full border p-2 rounded-lg border-gray-300" />

      <label className="block text-sm font-medium text-gray-700 mt-3">Location</label>
      <select
        name="location"
        value={profileData.location}
        onChange={handleChange}
        className="block w-full border p-2 rounded-lg border-gray-300"
      >
        <option value="">Select Location</option>
        <option value="SUSL">SUSL</option>
        <option value="UOC">UOC</option>
      </select>

      <label className="block text-sm font-medium text-gray-700 mt-3">About Me</label>
      <textarea name="about" value={profileData.about} onChange={handleChange} className="block w-full border p-2 rounded-lg border-gray-300 resize-none" />

      <div className="flex gap-3 mt-4">
        <button onClick={handleSave} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Save
        </button>
        <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition">
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ProfilePage;

