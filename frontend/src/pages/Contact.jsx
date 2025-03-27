import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 py-16 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you!
        </p>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side: Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
              >
                Send Message
              </button>

              {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
            </form>
          </div>

          {/* Right Side: Contact Info & Social */}
          <div className="space-y-8">
            {/* Business Info */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaPhone className="text-teal-600 mt-1 mr-4 text-xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone Number</h3>
                    <p className="text-gray-600">+94 70 261 0614 /+94 76 940 1474</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="text-teal-600 mt-1 mr-4 text-xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email Address</h3>
                    <p className="text-gray-600">lylumarketplace@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition">
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-800">How do I sell my pre-loved items?</h3>
              <p className="text-gray-600 mt-1">
                Simply create an account, list your items with photos and descriptions, and set your price.
                We handle the rest!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
