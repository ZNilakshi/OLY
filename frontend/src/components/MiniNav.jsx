import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaBan } from 'react-icons/fa';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 py-8 px-6 text-white">
          <h1 className="text-3xl font-bold mb-2">LYLU Terms and Conditions</h1>
          <p className="text-purple-100">Last Updated: 27.03.2025</p>
        </header>

        {/* Content */}
        <main className="p-6 sm:p-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome to LYLU</h2>
            <p className="text-gray-600 mb-4">
              A platform where users can sell, rent, or buy items through direct meetups or preferred arrangements. 
              By using LYLU, you agree to comply with these Terms and Conditions (T&Cs).
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-600">
                LYLU is a marketplace that connects buyers and sellers for transactions involving second-hand goods, rentals, and other items. 
                We do not handle payments, shipping, or delivery—transactions are conducted directly between users.
              </p>
            </div>
          </section>

          {/* Who Can Use */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">1. Who Can Use LYLU?</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaCheckCircle className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">You must be at least 18 years old</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">You must provide accurate and truthful information</span>
              </li>
              <li className="flex items-start">
                <FaBan className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">You must not use LYLU for illegal, fraudulent, or commercial resale purposes</span>
              </li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">2. User Responsibilities</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">For Sellers:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">You must accurately describe the item's condition</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">You must honor agreed-upon prices and meetup arrangements</span>
                </li>
                <li className="flex items-start">
                  <FaBan className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">You cannot list prohibited items (see Section 5)</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">For Buyers:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">You must communicate respectfully with sellers</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">You must complete transactions as agreed (e.g., meetup time, price)</span>
                </li>
                <li className="flex items-start">
                  <FaBan className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">You cannot misuse listings or harass sellers</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationTriangle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-blue-800">For All Users:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-blue-700">
                    <li>LYLU does not handle payments—transactions are between users</li>
                    <li>Meet at safe, public locations—LYLU is not responsible for scams, fraud, or unsafe meetups</li>
                    <li>Report suspicious activity to LYLU support immediately</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Prohibited Items */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">3. Prohibited Items & Conduct</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">You Cannot List/Sell:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Illegal items (weapons, drugs, counterfeit goods)</li>
                <li>Stolen or unauthorized items</li>
                <li>Adult content or explicit material</li>
                <li>Items that violate intellectual property rights</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">You Cannot:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Spam, scam, or deceive other users</li>
                <li>Harass, threaten, or discriminate against others</li>
                <li>Use bots or automated tools to manipulate listings</li>
              </ul>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">4. Dispute Resolution & Liability</h2>
            
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">LYLU's Role:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>We do not mediate transactions</li>
                <li>We do not guarantee item quality or seller/buyer reliability</li>
                <li>We reserve the right to suspend accounts violating these terms</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-yellow-800">User Responsibility:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-yellow-700">
                    <li>Meet in safe, public places (e.g., university)</li>
                    <li>Verify items before paying—LYLU is not responsible for scams</li>
                    <li>Report issues to local authorities if fraud occurs</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Account Termination */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">5. Account Termination</h2>
            <p className="text-gray-600 mb-4">
              LYLU may suspend or ban accounts for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Fraud, scams, or illegal activity</li>
              <li>Repeated policy violations</li>
              <li>Harassment or abusive behavior</li>
            </ul>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">6. Changes to These Terms</h2>
            <p className="text-gray-600">
              We may update these T&Cs. You will be notified of major changes. Continued use means acceptance.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">7. Contact & Support</h2>
            <p className="text-gray-600 mb-2">
              For questions or issues, contact:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>📧 Email: <a href="lylumarketplace@gmail.com" className="text-purple-600 hover:underline">lylumarketplace@gmail.com</a></li>
                </ul>
          </section>

          {/* Acceptance */}
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 text-center">
            <p className="text-gray-700 font-medium mb-2">
              By using LYLU, you agree to these Terms and Conditions.
            </p>
            <p className="text-purple-600 font-bold">
              Stay safe and happy trading! 🚀
            </p>
            <p className="text-gray-500 text-sm mt-2">
              LYLU Team
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;