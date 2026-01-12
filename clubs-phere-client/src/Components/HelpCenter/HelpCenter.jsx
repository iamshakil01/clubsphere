import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState('getting-started');

  const tabs = [
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'account', name: 'Account Settings' },
    { id: 'clubs', name: 'Managing Clubs' },
    { id: 'events', name: 'Events & Activities' },
    { id: 'billing', name: 'Billing & Payments' },
    { id: 'troubleshooting', name: 'Troubleshooting' }
  ];

  const helpSections = {
    'getting-started': [
      {
        title: "Creating Your Account",
        description: "Learn how to set up your ClubSphere account and complete your profile.",
        steps: [
          "Click on 'Register' in the top navigation bar",
          "Fill in your personal information",
          "Verify your email address",
          "Complete your profile with a photo and bio"
        ]
      },
      {
        title: "Finding Clubs",
        description: "Discover clubs that match your interests and join them.",
        steps: [
          "Browse clubs on the 'All Clubs' page",
          "Use filters to narrow down by category or location",
          "Click on a club to view details",
          "Click 'Join Club' to become a member"
        ]
      },
      {
        title: "Navigating the Dashboard",
        description: "Understand how to use your personalized dashboard.",
        steps: [
          "Access your dashboard from the profile dropdown",
          "View your clubs and events",
          "Manage your membership information",
          "Update your notification preferences"
        ]
      }
    ],
    'account': [
      {
        title: "Updating Your Profile",
        description: "Keep your profile information current and accurate.",
        steps: [
          "Go to your Profile page",
          "Click on 'Edit Profile'",
          "Update your information",
          "Save your changes"
        ]
      },
      {
        title: "Changing Your Password",
        description: "Learn how to securely update your password.",
        steps: [
          "Visit your Profile page",
          "Click on 'Security Settings'",
          "Enter your current password",
          "Set your new password and confirm"
        ]
      },
      {
        title: "Managing Notifications",
        description: "Control what notifications you receive.",
        steps: [
          "Access your Profile",
          "Go to 'Notification Settings'",
          "Adjust your preferences",
          "Save your settings"
        ]
      }
    ],
    'clubs': [
      {
        title: "Creating a New Club",
        description: "Start your own club to bring people together.",
        steps: [
          "Click 'Create Club' in the navigation bar",
          "Fill in club details",
          "Add a cover image and description",
          "Submit for approval"
        ]
      },
      {
        title: "Managing Club Members",
        description: "Add, remove, and moderate club members.",
        steps: [
          "Go to your club dashboard",
          "Select 'Members' tab",
          "View pending requests",
          "Approve or reject members as needed"
        ]
      },
      {
        title: "Setting Membership Fees",
        description: "Configure payment options for your club.",
        steps: [
          "Access your club settings",
          "Go to 'Membership' section",
          "Set your fee structure",
          "Configure payment methods"
        ]
      }
    ],
    'events': [
      {
        title: "Creating Events",
        description: "Organize and promote events for your club.",
        steps: [
          "Click 'Create Event' in the navigation",
          "Enter event details",
          "Set date, time, and location",
          "Publish your event"
        ]
      },
      {
        title: "Managing Attendees",
        description: "Track who has registered for your events.",
        steps: [
          "Visit your club dashboard",
          "Select the event",
          "View registration list",
          "Send reminders to attendees"
        ]
      },
      {
        title: "Event Promotion",
        description: "Spread the word about your events.",
        steps: [
          "Include event details in club announcements",
          "Share on social media",
          "Send email invitations",
          "Post in relevant community channels"
        ]
      }
    ],
    'billing': [
      {
        title: "Payment Methods",
        description: "Manage your payment options and billing information.",
        steps: [
          "Go to 'Payment History' in your dashboard",
          "Select 'Payment Methods'",
          "Add or update payment information",
          "Save your payment details"
        ]
      },
      {
        title: "Subscription Plans",
        description: "Choose the right plan for your needs.",
        steps: [
          "Visit 'Membership Plans' section",
          "Compare available options",
          "Select your preferred plan",
          "Complete the upgrade process"
        ]
      },
      {
        title: "Receipts & Invoices",
        description: "Access your billing history and receipts.",
        steps: [
          "Go to 'Payment History'",
          "Filter by date range if needed",
          "Download receipts as PDF",
          "Print or save for records"
        ]
      }
    ],
    'troubleshooting': [
      {
        title: "Common Issues",
        description: "Solutions to frequently encountered problems.",
        steps: [
          "Check your internet connection",
          "Clear browser cache and cookies",
          "Try accessing from a different browser",
          "Contact support if issues persist"
        ]
      },
      {
        title: "Login Problems",
        description: "Resolve issues with accessing your account.",
        steps: [
          "Reset your password if needed",
          "Check for typos in email/password",
          "Ensure caps lock is off",
          "Try logging in after clearing cache"
        ]
      },
      {
        title: "Performance Issues",
        description: "Improve app performance if experiencing slowness.",
        steps: [
          "Close other browser tabs",
          "Check your internet speed",
          "Update your browser",
          "Restart your device if necessary"
        ]
      }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-6"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.h1 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          Help Center
        </motion.h1>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Find answers to common questions and learn how to make the most of your ClubSphere experience.
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-8"
      >
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              custom={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-base-200 text-gray-700 hover:bg-base-300'
              }`}
            >
              {tab.name}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full p-4 pl-12 rounded-xl border border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
            exit: { opacity: 0 },
          }}
          className="space-y-8"
        >
          {helpSections[activeTab].map((section, index) => (
            <motion.div 
              key={index}
              custom={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{section.title}</h2>
              <p className="text-gray-600 mb-6">{section.description}</p>
              
              <div className="space-y-4">
                {section.steps.map((step, stepIndex) => (
                  <motion.div 
                    key={stepIndex}
                    custom={stepIndex}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-start"
                  >
                    <div className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                      {stepIndex + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <motion.h2 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Still need help?
        </motion.h2>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-gray-600 mb-6"
        >
          Our support team is ready to assist you with any questions you might have.
        </motion.p>
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="flex justify-center gap-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
          >
            Contact Support
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline"
          >
            Schedule a Demo
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HelpCenter;