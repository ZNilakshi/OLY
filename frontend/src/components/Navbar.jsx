import { useState } from "react";
import { FaChevronDown, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Hide navbar on home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="bg-white shadow-md p-4">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <h1 className="text-teal-600 text-3xl font-bold">Vinted</h1>
          <div className="hidden md:block relative">
            <button className="flex items-center gap-2 text-gray-700 font-medium hover:text-teal-600">
              Catalog <FaChevronDown className="text-sm" />
            </button>
          </div>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search for items"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-teal-600 border border-teal-600 px-4 py-2 rounded-full hover:bg-teal-100">
            Sign up
          </button>
          <button className="text-teal-600 hover:underline">Log in</button>
          <button className="bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-700">
            Sell now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Second Line - Category Links */}
      <div className="hidden md:flex justify-center gap-6 mt-4 text-gray-600 text-sm font-medium border-t pt-2">
        <a href="/" className="hover:text-teal-600">Women</a>
        <a href="/" className="hover:text-teal-600">Men</a>
        <a href="/" className="hover:text-teal-600">Designer</a>
        <a href="/" className="hover:text-teal-600">Kids</a>
        <a href="/" className="hover:text-teal-600">Home</a>
        <a href="/" className="hover:text-teal-600">Electronics</a>
        <a href="/" className="hover:text-teal-600">Entertainment</a>
        <a href="/" className="hover:text-teal-600">Pet care</a>
        <a href="/" className="hover:text-teal-600">About</a>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4">
          <a href="/" className="hover:text-teal-600">Sign up</a>
          <a href="/" className="hover:text-teal-600">Log in</a>
          <a href="/" className="hover:text-teal-600">Sell now</a>
          <a href="/" className="hover:text-teal-600">Women</a>
          <a href="/" className="hover:text-teal-600">Men</a>
          <a href="/" className="hover:text-teal-600">Designer</a>
          <a href="/" className="hover:text-teal-600">Kids</a>
          <a href="/" className="hover:text-teal-600">Home</a>
          <a href="/" className="hover:text-teal-600">Electronics</a>
          <a href="/" className="hover:text-teal-600">Entertainment</a>
          <a href="/" className="hover:text-teal-600">Pet care</a>
          <a href="/" className="hover:text-teal-600">About</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
