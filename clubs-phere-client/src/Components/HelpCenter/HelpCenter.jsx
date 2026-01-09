import React, { useState } from 'react';

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
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Help Center</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions and learn how to make the most of your ClubSphere experience.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-base-200 text-gray-700 hover:bg-base-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="mb-8">
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
        </div>
      </div>

      <div className="space-y-8">
        {helpSections[activeTab].map((section, index) => (
          <div key={index} className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{section.title}</h2>
            <p className="text-gray-600 mb-6">{section.description}</p>
            
            <div className="space-y-4">
              {section.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                    {stepIndex + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Still need help?</h2>
        <p className="text-gray-600 mb-6">
          Our support team is ready to assist you with any questions you might have.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn btn-primary">
            Contact Support
          </button>
          <button className="btn btn-outline">
            Schedule a Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;