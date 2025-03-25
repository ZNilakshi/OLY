import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
         
          <div>
            <h2 className="text-xl font-bold">Marketplace</h2>
            <p className="text-gray-400 mt-2">
              Buy & sell pre-loved fashion easily with personal meetups.
            </p>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/AboutUs" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/HowItWorks" className="text-gray-400 hover:text-white">How It Works</a></li>
              <li><a href="/Contact" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="/TermsConditions" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <p className="text-gray-400 mt-2">Email: lylumarketplace@gmail.com</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white text-xl"><FaFacebook /></a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white text-xl"><FaInstagram /></a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white text-xl"><FaTwitter /></a>
              <a href="mailto:support@marketplace.com" className="text-gray-400 hover:text-white text-xl"><FaEnvelope /></a>
            </div>
          </div>
        </div>

       
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
