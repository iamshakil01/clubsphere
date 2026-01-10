import React from 'react';
import { Link } from 'react-router';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Privacy Policy</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Welcome to ClubSphere! We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and share your information when you use our services.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We collect information you provide directly to us, such as when you create an account, participate in clubs, or communicate with us.
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Account information (name, email address, profile picture)</li>
            <li>Club participation and activity data</li>
            <li>Communication preferences</li>
            <li>Technical information (device type, browser, IP address)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We use your information to provide, maintain, and improve our services, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Creating and managing your account</li>
            <li>Facilitating club membership and participation</li>
            <li>Sending important service notifications</li>
            <li>Improving user experience and developing new features</li>
            <li>Ensuring security and preventing fraud</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Data Sharing and Disclosure</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We may share your information in the following situations:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>With your consent or at your direction</li>
            <li>With service providers who help us operate our services</li>
            <li>To comply with legal obligations or protect our rights</li>
            <li>In connection with a merger, acquisition, or sale of assets</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Data Security</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Your Rights</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Data portability in certain circumstances</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have questions about this privacy policy, please contact us at{' '}
            <Link to="/contact" className="text-indigo-600 hover:underline">
              Contact Us
            </Link>.
          </p>
        </div>
        
        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;