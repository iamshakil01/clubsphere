import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
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
          Frequently Asked Questions
        </motion.h1>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Find answers to common questions about using ClubSphere and managing your clubs and memberships.
        </motion.p>
      </motion.div>

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
        className="space-y-4"
      >
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            custom={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm overflow-hidden"
          >
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
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 pt-2 border-t border-base-300 overflow-hidden"
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

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
          Still have questions?
        </motion.h2>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-gray-600 mb-6"
        >
          Our support team is here to help you with any additional questions you might have.
        </motion.p>
        <motion.button 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.9, duration: 0.3 }}
          className="btn btn-primary"
        >
          Contact Support
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;