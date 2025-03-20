import React, { } from "react";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Profile from "./pages/Profile";
import ListingDetails from "./pages/ListingDetails";
// If UserProfile.jsx is inside the components folder
import UserProfile from "./components/UserProfile";

function App() {
 
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/user/:userId" element={<UserProfile />} />
     
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;