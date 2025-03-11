import {  FaGoogle, } from "react-icons/fa";
import MiniNav from "../components/MiniNav";
import Popular from "../components/Popular";
import Community from "../components/Community";
import HowItsWork from "../components/HowItsWork";

const SignupPage = () => {
  return (
<div>
    
    <div
      className="flex items-center justify-between min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    ><MiniNav />
     
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Left Section */}
      <div className="relative z-10 w-full md:w-2/5 p-6 text-white">
        <h1 className="text-5xl font-bold mb-4">
          Buy, sell, and discover fashion, home decor, beauty, and more
        </h1>
        <p className="mb-6">
          Sign up now and join millions of people on the social marketplace for all things style.
        </p>

        {/* Signup Buttons */}
        
        <button className="flex items-center justify-center w-[275px] bg-white text-black border py-3 rounded-lg mb-3 hover:bg-gray-100">
          <FaGoogle className="mr-2" /> Continue with Google
        </button>
       
    
      </div>

     
      
    </div>
    <Popular />
    <Community />
    <HowItsWork />
    </div>
  );
};

export default SignupPage;
