import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Admin from "./pages/Admin";

function App() {
  
  return (
    <Router>
      <Navbar />
     
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/Admin" element={<Admin/>} />
     
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
