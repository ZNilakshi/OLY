import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MiniNav from "../components/MiniNav";
import Popular from "../components/Popular";
import Community from "../components/Community";
import HowItsWork from "../components/HowItsWork";

const SignupPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, navigate, loading]); 

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div>
      <div
        className="flex items-center justify-between min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <MiniNav />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 w-full md:w-2/5 p-6 text-white">
          <h1 className="text-5xl font-bold mb-4">
            Buy, sell, and discover fashion, home decor, beauty, and more
          </h1>
          <p className="mb-6">
            Sign up now and join millions of people on the social marketplace for all things style.
          </p>

          {!loading && !user && (
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
