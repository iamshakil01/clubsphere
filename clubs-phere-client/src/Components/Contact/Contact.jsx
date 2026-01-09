import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or need assistance? Reach out to us and our team will get back to you as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="input input-bordered w-full p-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="input input-bordered w-full p-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="input input-bordered w-full p-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="input input-bordered w-full p-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Subject</label>
              <select
                className="select select-bordered w-full p-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="" disabled selected>Select a subject</option>
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Billing Question</option>
                <option>Account Issue</option>
                <option>Feature Request</option>
                <option>Report a Problem</option>
                <option>Partnership Opportunity</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Priority Level</label>
              <select
                className="select select-bordered w-full p-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option>Normal</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Please provide detailed information about your inquiry..."
                className="textarea textarea-bordered w-full p-3 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="consent"
                className="mt-1 mr-2"
              />
              <label htmlFor="consent" className="text-gray-700 text-sm">
                I consent to having ClubSphere contact me regarding my inquiry
              </label>
            </div>
            
            <button type="submit" className="btn btn-primary w-full mt-4">
              Send Message
            </button>
          </form>
        </div>

        <div>
          <div className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">Mon-Fri from 9am to 5pm EST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@clubsphere.com</p>
                  <p className="text-gray-600">info@clubsphere.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Office</h3>
                  <p className="text-gray-600">123 Innovation Drive</p>
                  <p className="text-gray-600">Tech City, TC 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-gray-700">How do I reset my password?</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-gray-700">Can I change my membership plan?</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-gray-700">How do I cancel my subscription?</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-gray-700">What payment methods do you accept?</span>
              </li>
            </ul>
            <button className="btn btn-outline w-full mt-6">
              Visit Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;