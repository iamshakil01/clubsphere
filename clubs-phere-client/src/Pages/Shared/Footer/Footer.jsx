import React from 'react';
import { Link } from 'react-router';
import Logo from '../../../Components/Logo/Logo';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-center md:justify-start">
                            <Link to="/" className="flex items-center">
                                <Logo className="w-36 h-auto" />
                            </Link>
                        </div>
                        <p className="text-center md:text-left text-gray-400 text-lg font-medium">
                            Join Our <span className="text-white font-bold !text-white dark:text-white">ClubSphere</span><br /> Connecting passionate individuals since 2015
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4 sm:space-x-5 text-gray-400">
                            <a href="https://linkedin.com/in/iamshakil01" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                                </svg>
                            </a>
                            <a href="https://github.com/iamshakil01" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.107.823 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                                </svg>
                            </a>
                            <a href="https://facebook.com/iamshakil05" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left space-y-3">
                        <h4 className="text-xl font-semibold text-white border-b border-green-500 pb-2 inline-block">Quick Links</h4>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <Link to="/" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                                    <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span> Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/all-clubs" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                                    <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span> All Clubs
                                </Link>
                            </li>
                            <li>
                                <Link to="/events" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                                    <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span> Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                                    <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span> Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                                    <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span> Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="text-center md:text-left space-y-3">
                        <h4 className="text-xl font-semibold text-white border-b border-green-500 pb-2 inline-block">Services</h4>
                        <ul className="space-y-3 mt-4">
                            <li>
                                <Link to="/create-club" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                                    <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span> Create Club
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                                    <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span> FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/help" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                                    <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span> Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-green-400 transition-colors duration-300 flex items-center group">
                                    <span className="mr-2 group-hover:translate-x-1 transition-transform">→</span> About Us
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="text-center md:text-left space-y-3">
                        <h4 className="text-xl font-semibold text-white border-b border-green-500 pb-2 inline-block">Stay Connected</h4>
                        <p className="text-gray-400 mt-4">Subscribe to our newsletter for the latest updates and club activities.</p>
                        <div className="mt-4 space-y-3">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="input input-bordered w-full px-4 py-2 rounded-lg text-gray-800"
                                />
                                <button className="btn btn-primary hover:btn-success text-white px-4 py-2 rounded-lg whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-center md:text-left text-sm text-gray-500">
                        © {new Date().getFullYear()} ClubSphere. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300">
                            Privacy Policy
                        </Link>
                        
                        <Link to="/terms" className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300">
                            Terms of Service
                        </Link>

                        <Link to="/contact" className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300">
                            Contact Us
                        </Link>
                    </div>
                </div>
                <div className="text-center mt-6 text-sm text-gray-500">
                    Made with ❤️ by the ClubSphere Team
                </div>
            </div>
        </footer>
    );
};

export default Footer;
