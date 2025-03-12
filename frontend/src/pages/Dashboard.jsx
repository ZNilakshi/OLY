import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to login if user is not logged in
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await axios.get("http://localhost:5000/auth/logout", { withCredentials: true });
    dispatch(logout());
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="p-10">
      {user ? (
        <div>
          <h1 className="text-4xl font-bold">Welcome, {user.name}! 🎉</h1>
          <img src={user.profilePicture} alt="User" className="rounded-full w-16 h-16 mt-4" />
          <p className="text-lg mt-2">Role: {user.role}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
            Logout
          </button>
        </div>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
