import React from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const TermsConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-green-600 py-8 px-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>
          <p className="text-teal-100">Last updated: June 10, 2024</p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Update Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Our updated Terms & Conditions came into effect on June 10, 2024. By using our platform, you agree to these terms.
                </p>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome to Our Marketplace</h2>
            <p className="text-gray-600 mb-4">
              These Terms and Conditions ("Terms") govern your use of our university-focused marketplace platform ("Platform"). 
              Please read them carefully before using our services.
            </p>
          </section>

          {/* TOC */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">Table of Contents</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>1. About Our Platform</li>
              <li>2. User Responsibilities</li>
              <li>3. Buying and Selling</li>
              <li>4. Transactions and Payments</li>
              <li>5. Content and Conduct</li>
              <li>6. Privacy and Data</li>
              <li>7. Account Management</li>
              <li>8. Dispute Resolution</li>
              <li>9. Limitation of Liability</li>
              <li>10. Changes to Terms</li>
            </ul>
          </div>

          {/* Main Sections */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">1. About Our Platform</h2>
            <p className="text-gray-600 mb-4">
              Our Platform connects university students to buy, sell, and rent pre-loved items within their campus community. 
              We act solely as an intermediary and are not party to any transactions between users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">2. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              To use our Platform, you must:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <FaCheckCircle className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Be a currently enrolled university student</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Use your university email for verification</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Only list items you legally own</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Comply with all university policies</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">3. Buying and Selling</h2>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">For Sellers:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Accurately describe items with clear photos</li>
                <li>Price items fairly (no commercial selling)</li>
                <li>Arrange safe, public meetups on campus</li>
                <li>Remove sold items promptly</li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">For Buyers:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Inspect items before payment</li>
                <li>Communicate clearly with sellers</li>
                <li>Only use WhatsApp for transactions</li>
                <li>Meet in designated safe zones</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">4. Transactions and Payments</h2>
            <p className="text-gray-600 mb-4">
              All transactions are conducted directly between buyers and sellers via WhatsApp. 
              We do not handle payments or offer buyer/seller protection. Users are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4">
              <li>Verifying item condition before payment</li>
              <li>Using secure payment methods (cash recommended)</li>
              <li>Resolving any disputes directly</li>
            </ul>
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Never share personal financial information through our Platform. All payments should be arranged in person.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">5. Content and Conduct</h2>
            <p className="text-gray-600 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4">
              <li>Post prohibited items (see Restricted Items list)</li>
              <li>Use offensive language or harass others</li>
              <li>Share false information</li>
              <li>Circumvent our Platform for commercial purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">6. Privacy and Data</h2>
            <p className="text-gray-600 mb-4">
              We collect minimal data necessary to operate the Platform. By using our services, you consent to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4">
              <li>Verification of your student status</li>
              <li>Storage of your contact information</li>
              <li>Use of cookies for basic functionality</li>
            </ul>
            <p className="text-gray-600">
              We never sell your data to third parties. See our <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a> for details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">7. Account Management</h2>
            <p className="text-gray-600 mb-4">
              You may deactivate your account at any time. We reserve the right to suspend accounts that:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4">
              <li>Violate these Terms</li>
              <li>Show fraudulent activity</li>
              <li>Are no longer associated with a university</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">8. Dispute Resolution</h2>
            <p className="text-gray-600 mb-4">
              As we don't mediate transactions, please:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4">
              <li>Attempt to resolve issues directly with the other party</li>
              <li>Report serious concerns to university authorities</li>
              <li>Contact us only for platform-related issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              Our Platform is provided "as is." We are not liable for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4">
              <li>Transactions gone wrong</li>
              <li>Item condition disputes</li>
              <li>Personal injuries during meetups</li>
              <li>Unauthorized account access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We may update these Terms periodically. Significant changes will be:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4">
              <li>Announced via email 30 days in advance</li>
              <li>Highlighted on our Platform</li>
              <li>Dated clearly at the top of this page</li>
            </ul>
            <p className="text-gray-600">
              Continued use after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Acceptance */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-center">
              By using our Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;