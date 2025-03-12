import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MiniNav from "../components/MiniNav";
import Popular from "../components/Popular";
import Community from "../components/Community";
import HowItsWork from "../components/HowItsWork";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Redirect to Dashboard if user is logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Redirect to backend Google login
  };

  return (
    <div>
      <div
        className="flex items-center justify-between min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <MiniNav />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Left Section */}
        <div className="relative z-10 w-full md:w-2/5 p-6 text-white">
          <h1 className="text-5xl font-bold mb-4">
            Buy, sell, and discover fashion, home decor, beauty, and more
          </h1>
          <p className="mb-6">
            Sign up now and join millions of people on the social marketplace for all things style.
          </p>

          {/* Google Signup Button */}
          {!user && (
            <button
              className="flex items-center justify-center w-[275px] bg-white text-black border py-3 rounded-lg mb-3 hover:bg-gray-100"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="mr-2" /> Continue with Google
            </button>
          )}
        </div>
      </div>

      <Popular />
      <Community />
      <HowItsWork />
    </div>
  );
};

export default SignupPage;
