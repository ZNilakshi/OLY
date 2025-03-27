import React from 'react';
import { FaCheck, FaTimes, FaExclamationTriangle, FaShieldAlt, FaHandshake, FaUserLock } from 'react-icons/fa';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-200">
          <div className="bg-gradient-to-r from-teal-600 to-green-600 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2  tracking-tight">Terms and Conditions</h1>
            <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm text-white/90 font-medium">
              Last Updated: 27.03.2025
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Intro Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="prose prose-indigo max-w-none">
              <p className="text-lg text-gray-600">
                Welcome to <span className="font-semibold text-indigo-600">LYLU</span>, the peer-to-peer marketplace 
                where users connect to buy, sell, and rent items through direct meetups. 
                These Terms govern your use of our platform.
              </p>
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                <p className="text-indigo-700 flex items-start">
                  <FaExclamationTriangle className="flex-shrink-0 mt-1 mr-3 text-indigo-500" />
                  <span>
                    <strong>Important:</strong> LYLU is a connection platform only. All transactions 
                    are between users—we don't handle payments, shipping, or guarantees.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Who Can Use */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FaUserLock className="mr-3 text-indigo-500" />
              <span>1. Eligibility</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100">
                    <FaCheck className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <p className="ml-3 text-gray-600">Must be at least 18 years old</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100">
                    <FaCheck className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <p className="ml-3 text-gray-600">Must provide accurate personal information</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-red-100">
                    <FaTimes className="h-3 w-3 text-red-600" />
                  </div>
                </div>
                <p className="ml-3 text-gray-600">No commercial resellers or business accounts</p>
              </div>
            </div>
          </div>

          {/* User Responsibilities */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FaHandshake className="mr-3 text-indigo-500" />
              <span>2. User Responsibilities</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sellers */}
              <div className="bg-indigo-50/50 p-5 rounded-lg border border-indigo-100">
                <h3 className="font-semibold text-indigo-800 mb-3">Sellers Must:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white border border-indigo-200">
                        <FaCheck className="h-3 w-3 text-indigo-600" />
                      </div>
                    </div>
                    <span className="ml-2 text-gray-700">Accurately describe item condition</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white border border-indigo-200">
                        <FaCheck className="h-3 w-3 text-indigo-600" />
                      </div>
                    </div>
                    <span className="ml-2 text-gray-700">Honor agreed prices and meetups</span>
                  </li>
                </ul>
              </div>

              {/* Buyers */}
              <div className="bg-blue-50/50 p-5 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-3">Buyers Must:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white border border-blue-200">
                        <FaCheck className="h-3 w-3 text-blue-600" />
                      </div>
                    </div>
                    <span className="ml-2 text-gray-700">Communicate respectfully</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-white border border-blue-200">
                        <FaCheck className="h-3 w-3 text-blue-600" />
                      </div>
                    </div>
                    <span className="ml-2 text-gray-700">Complete transactions as agreed</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Safety Notice */}
            <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-lg border border-amber-100">
              <h4 className="font-medium text-amber-800 mb-2 flex items-center">
                <FaShieldAlt className="mr-2 text-amber-600" />
                Safety First
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-amber-700">
                <li>Always meet in public, well-lit areas</li>
                <li>Bring a friend if possible</li>
                <li>Trust your instincts—if something feels wrong, walk away</li>
              </ul>
            </div>
          </div>

          {/* Prohibited Items */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Prohibited Items</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-red-50/50 p-4 rounded-lg">
                <h3 className="font-medium text-red-700 mb-2">Never Allowed</h3>
                <ul className="space-y-2 text-red-600">
                  <li className="flex items-start">
                    <FaTimes className="flex-shrink-0 mt-1 mr-2 text-red-500" />
                    <span>Weapons or illegal items</span>
                  </li>
                  <li className="flex items-start">
                    <FaTimes className="flex-shrink-0 mt-1 mr-2 text-red-500" />
                    <span>Drugs or paraphernalia</span>
                  </li>
                  <li className="flex items-start">
                    <FaTimes className="flex-shrink-0 mt-1 mr-2 text-red-500" />
                    <span>Stolen property</span>
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50/50 p-4 rounded-lg">
                <h3 className="font-medium text-amber-700 mb-2">Restricted Content</h3>
                <ul className="space-y-2 text-amber-600">
                  <li className="flex items-start">
                    <FaTimes className="flex-shrink-0 mt-1 mr-2 text-amber-500" />
                    <span>Adult or explicit material</span>
                  </li>
                  <li className="flex items-start">
                    <FaTimes className="flex-shrink-0 mt-1 mr-2 text-amber-500" />
                    <span>Counterfeit goods</span>
                  </li>
                  <li className="flex items-start">
                    <FaTimes className="flex-shrink-0 mt-1 mr-2 text-amber-500" />
                    <span>Hazardous materials</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Dispute Resolution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Disputes & Liability</h2>
            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-600">
                LYLU provides the platform but is <strong>not involved</strong> in transactions between users. 
                We don't guarantee item condition, seller/buyer reliability, or transaction safety.
              </p>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">If issues arise:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li>Attempt to resolve directly with the other party</li>
                  <li>Document all communications and evidence</li>
                  <li>For fraud or illegal activity, contact local authorities</li>
                  <li>Report platform violations to LYLU support</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Final Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">By using LYLU, you agree to these Terms</h2>
              <p className="text-gray-600 mb-6">
                We're building a community based on trust and mutual respect. 
                Help us maintain a safe marketplace for everyone.
              </p>
              <a href="/contact " className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700">
                Contact Support
              </a>
              <p className="mt-6 text-sm text-gray-500">
                LYLU Team • lylumarketplace@gmail.com 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;