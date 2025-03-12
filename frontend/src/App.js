import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/authSlice"; // Import fetchUser action
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user from Redux store

  // Fetch user data on app load
  useEffect(() => {
    if (!user) {
      dispatch(fetchUser()); // Fetch user data if not already loaded
    }
  }, [dispatch, user]); // Add user to dependency array to avoid unnecessary fetches

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;