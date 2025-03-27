import { useState, useEffect } from "react";
import { FaChevronDown, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => { 
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });
        const data = await response.json();
        setUser(data.user || null);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Navigate to search results page
    }
  };
  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-teal-600 text-3xl font-bold">OLY</h1>
          <div className="hidden md:block relative">
           
          </div>
          <div className="relative w-full md:w-96">
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search for items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button type="submit" className="absolute right-3 top-3 text-gray-500">
              <FaSearch />
            </button>
          </form>
            </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile">
                <img
                  src={user.profilePicture || "/default-avatar.png"}
                  alt="Profile"
                  className="rounded-full w-8 h-8 cursor-pointer"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="text-teal-600 border border-teal-600 px-4 py-2 rounded-full hover:bg-teal-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="text-teal-600 border border-teal-600 px-4 py-2 rounded-full hover:bg-teal-100">
                Sign up
              </Link>
              <Link to="/" className="text-teal-600 hover:underline">Log in</Link>
            </>
          )}
          <Link to="/profile" className="bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-700">Sell now
             
              </Link>
             </div>

        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4">
          {!user ? (
            <>
              <Link to="/" className="hover:text-teal-600">Sign up</Link>
              <Link to="/" className="hover:text-teal-600">Log in</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="hover:text-teal-600">Logout</button>
          )}
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <Link to="/about" className="hover:text-teal-600">About</Link>
          <Link to="/profile">
                <img
                  src={user.profilePicture || "/default-avatar.png"}
                  alt="Profile"
                  className="rounded-full w-8 h-8 cursor-pointer"
                />
              </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;