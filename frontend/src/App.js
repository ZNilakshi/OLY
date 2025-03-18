import React, { useEffect } from "react";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Profile from "./pages/Profile";
import ListingDetails from "./pages/ListingDetails";

function App() {
 
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
   
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;