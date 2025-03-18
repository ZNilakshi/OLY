import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          credentials: "include",
        });
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        } else {
          navigate("/signup"); // Redirect if no user is found
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6">
     <h1 className="text-3xl font-bold mb-4">
  Welcome, {user?.name?.givenName} {user?.name?.familyName}!
</h1>
 <p>Email: {user?.email}</p>
      <button
        onClick={() => {
          fetch("http://localhost:5000/api/auth/logout", { credentials: "include" })
            .then(() => navigate("/signup"));
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;