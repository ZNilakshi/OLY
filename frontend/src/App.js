import React from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Profile from "./pages/Profile";
import ListingDetails from "./pages/ListingDetails";
import LDetails from "./pages/LDetails";
import UserProfile from "./components/UserProfile";
import SearchResults from "./components/SearchResults"; // Fixed import
import CategoryListings from "./pages/CategoryPage";
import SecondNav from "./components/SecondNav"; // Import the SecondNav compon
function App() {
  return (
    <Router>
      <Navbar />
      <SecondNav />
   

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/lsting/:id" element={<LDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/category/:category" element={<CategoryListings />} />
      
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;