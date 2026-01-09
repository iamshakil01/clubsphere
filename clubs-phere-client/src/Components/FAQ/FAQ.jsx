import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create a new club?",
      answer: "To create a new club, click on the 'Create Club' button in the navigation bar. Fill in the required details like club name, description, category, and image URL. You can also set a membership fee if it's a paid club."
    },
    {
      question: "Can I join multiple clubs?",
      answer: "Yes, you can join as many clubs as you like. Simply browse through the 'All Clubs' section and click on any club to view its details and join."
    },
    {
      question: "How do I become a club manager?",
      answer: "When you create a club, you automatically become the manager of that club. Club managers have special privileges like creating events and managing club members."
    },
    {
      question: "How do I create events for my club?",
      answer: "As a club manager, you can create events by clicking on the 'Create Event' option in the navigation bar. Select your club, add event details like title, date, location, and description."
    },
    {
      question: "What payment methods are accepted?",
      answer: "Our platform integrates with secure payment gateways to accept major credit cards and digital payment methods. Specific payment options will be available during the club membership checkout process."
    },
    {
      question: "How do I update my profile information?",
      answer: "You can update your profile information by visiting the 'Profile' page from the dropdown menu in the top right corner. From there, you can edit your personal details and profile picture."
    },
    {
      question: "Can I cancel my club membership?",
      answer: "Membership cancellation policies depend on the specific club. Check the club's terms and conditions or contact the club manager directly for assistance with membership cancellations."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "If you encounter inappropriate content or behavior, please report it immediately through our support system or contact our admin team. We take all reports seriously and will investigate promptly."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about using ClubSphere and managing your clubs and memberships.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm">
            <div 
              className="cursor-pointer p-6 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              <svg 
                className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
            
            {openIndex === index && (
              <div className="px-6 pb-6 pt-2 border-t border-base-300">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          Our support team is here to help you with any additional questions you might have.
        </p>
        <button className="btn btn-primary">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQ;