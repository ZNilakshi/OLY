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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", { credentials: "include" });
        const data = await response.json();
        console.log("Fetched user data:", data.user); // Debugging line
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
        setProfileData({ ...profileData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
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
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen bg-gray-100">
      {/* Profile Section (Always on Top) */}
      <div className="w-full max-w-8xl bg-white shadow-lg rounded-2xl border border-gray-300">
        <div className="flex flex-col items-center text-center p-6">
          <img
            src={profileData.profilePicture}
            alt="Profile"
            className="rounded-full w-28 h-28 border-4 border-teal-400 shadow-md"
          />
          <h2 className="text-2xl font-semibold mt-2">{profileData.name}</h2>
          <p className="text-gray-600 text-sm">📍 {profileData.location || "No location set"}</p>
          <p className="text-gray-600 text-sm">📞 {profileData.phone || "No phone number provided"}</p>
          <p className="text-gray-600 text-sm mt-2">{profileData.about || "No bio provided"}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-teal-600 text-white px-5 py-2 mt-4 hover:bg-teal-900 transition rounded-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Content Section (Below Profile) */}
      <div className="w-full max-w-8xl bg-white shadow-lg rounded-2xl border border-gray-300 mt-6">
        <div className="flex justify-between border-b border-gray-300 p-4">
          {["My Listings", "Wishlist", "Orders"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="">
          {activeTab === "My Listings" && <MyList user={user} />}
          {activeTab === "Wishlist" && <p>No items in wishlist yet.</p>}
          {activeTab === "Orders" && <p>No orders placed yet.</p>}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 p-4">Edit Profile</h2>
            <div className="p-4">
              <label>Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full mt-1 border rounded-lg"
              />
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="block w-full border rounded-lg"
              />
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                className="block w-full border rounded-lg"
              />
              <label>Location</label>
              <select
                name="location"
                value={profileData.location}
                onChange={handleChange}
                className="block w-full border rounded-lg"
              >
                <option value="">Select Location</option>
                <option value="SUSL">SUSL</option>
                <option value="UOC">UOC</option>
              </select>
              <label>About Me</label>
              <textarea
                name="about"
                value={profileData.about}
                onChange={handleChange}
                className="block w-full border rounded-lg resize-none"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;