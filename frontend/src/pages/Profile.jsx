import { useState, useEffect } from "react";
import MyList from "../components/MyList";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    about: "",
    phone: "",
    location: "",
    profilePicture: "/default-avatar.png",
  });
  const [activeTab, setActiveTab] = useState("My Listings");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", { 
          credentials: "include" 
        });
        const data = await response.json();
        console.log("Fetched user data:", data.user);
        if (data.user) {
          setUser(data.user);
          setProfileData({
            name: data.user.name || "",
            about: data.user.about || "",
            phone: data.user.phone || "",
            location: data.user.location || "",
            profilePicture: data.user.profilePicture || "/default-avatar.png",
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileData({ 
          ...profileData, 
          profilePicture: reader.result 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setProfileData({
      ...profileData,
      profilePicture: "/default-avatar.png"
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      alert("User ID is missing. Please log in again.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update profile");
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      setImagePreview(null);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* Profile Section */}
      <div className="w-full  bg-white shadow-lg rounded-2xl border border-gray-300">
        <div className="flex flex-col items-center text-center p-6">
          <img
            src={profileData.profilePicture}
            alt="Profile"
            className="rounded-full w-28 h-28 border-4 border-teal-400 shadow-md object-cover"
          />
          <h2 className="text-2xl font-semibold mt-2">{profileData.name}</h2>
          <p className="text-gray-600 text-sm">📍 {profileData.location || "No location set"}</p>
          <p className="text-gray-600 text-sm">📞 {profileData.phone || "No phone number provided"}</p>
          <p className="text-gray-600 text-sm mt-2 max-w-md">{profileData.about || "No bio provided"}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-teal-600 text-white px-5 py-2 mt-4 hover:bg-teal-700 transition rounded-lg shadow-md"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full bg-white shadow-lg rounded-2xl border border-gray-300 mt-6 mb-8">
        <div className="flex justify-between border-b border-gray-300 p-4">
          {["My Listings"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium ${
                activeTab === tab 
                  ? "border-b-2 border-teal-500 text-teal-600" 
                  : "text-gray-500 hover:text-teal-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "My Listings" && <MyList user={user} />}
        
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full border border-gray-300 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-teal-600">Edit Profile</h2>
              
              <form onSubmit={handleSave} className="grid grid-cols-1 gap-4">
                {/* Profile Picture with Preview */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600 text-sm font-medium">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                  
                  {/* Image Preview */}
                  {(imagePreview || profileData.profilePicture) && (
                    <div className="mt-4 flex justify-center">
                      <div className="relative">
                        <img
                          src={imagePreview || profileData.profilePicture}
                          alt="Profile Preview"
                          className="w-32 h-32 object-cover rounded-full border-2 border-teal-200"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition shadow-md"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600 text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600 text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  />
                </div>

                {/* Location */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600 text-sm font-medium">
                    Location
                  </label>
                  <select
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent appearance-none"
                  >
                    <option value="">Select Location</option>
                    <option value="SUSL">SUSL</option>
                    <option value="UOC">UOC</option>
                  </select>
                </div>

                {/* About Me */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-teal-600 text-sm font-medium">
                    About Me
                  </label>
                  <textarea
                    name="about"
                    value={profileData.about}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
                    rows="4"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-md"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setImagePreview(null);
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

export default ProfilePage;