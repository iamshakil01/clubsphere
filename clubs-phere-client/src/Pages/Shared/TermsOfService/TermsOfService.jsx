import React from 'react';
import { Link } from 'react-router';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Terms of Service</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            By accessing and using ClubSphere, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, you are not authorized to use or access ClubSphere.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Description of Service</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            ClubSphere provides a platform for users to join, create, and manage clubs and organizations. Our services include, but are not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Club creation and management tools</li>
            <li>Member registration and management</li>
            <li>Event planning and scheduling</li>
            <li>Communication tools for club members</li>
            <li>Payment processing for club memberships</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">User Responsibilities</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            As a user of ClubSphere, you agree to:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Provide accurate and current information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Use the service in accordance with all applicable laws</li>
            <li>Respect other users and their rights</li>
            <li>Not engage in any illegal or harmful activities</li>
            <li>Comply with club-specific rules and regulations</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Content Guidelines</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You are responsible for all content you post or share on ClubSphere. You agree not to post content that:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Is illegal, offensive, or threatening</li>
            <li>Infringes on intellectual property rights</li>
            <li>Contains hate speech or discriminatory material</li>
            <li>Violates privacy or publicity rights</li>
            <li>Includes adult content or explicit material</li>
            <li>Spreads false information or misinformation</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The ClubSphere service and its original content, features, and functionality are owned by ClubSphere and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            ClubSphere shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Modifications to Service</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We reserve the right to modify or discontinue, temporarily or permanently, ClubSphere or any features or portions thereof without prior notice. We shall not be liable for any modification, suspension, or discontinuation of ClubSphere.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Governing Law</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about these Terms of Service, please contact us at{' '}
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

export default TermsOfService;