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
          <h1 className="text-7xl font-bold mb-4">
          Buy, Sell, Rent & Refresh Your Style       </h1>
          <p className="mb-6 mt-10 text-xl">
          The ultimate social marketplace for fashion, home decor, beauty, and more.
          Discover treasures, list your items, or rent what you love—all in one place!   </p>

          {!loading && !user && (
            <button
            className="flex items-center justify-center w-[275px] bg-white text-gray-800 py-3 rounded-md mb-3 hover:bg-gray-50 shadow-sm border border-gray-300 transition-colors"
            onClick={handleGoogleSignIn}
          >
            <div className="flex items-center">
              <div className="bg-white p-1 rounded-sm mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path 
                    fill="#4285F4" 
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path 
                    fill="#34A853" 
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path 
                    fill="#FBBC05" 
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path 
                    fill="#EA4335" 
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <span className="font-medium text-m">Continue with Google</span>
            </div>
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
