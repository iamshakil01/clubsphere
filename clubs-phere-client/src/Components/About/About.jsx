import useAxiosSecure from '../../Hooks/useAxiosSecure';
import React, { useState, useEffect } from 'react';

const About = () => {
  const [stats, setStats] = useState({
    activeMembers: 0,
    activeClubs: 0,
    monthlyEvents: 0
  });
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosSecure.get('/admin');
        setStats({
          activeMembers: response.data.totalUsers,
          activeClubs: response.data.totalClubs,
          monthlyEvents: response.data.totalEvents
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default values in case of error
        setStats({
          activeMembers: 0,
          activeClubs: 0,
          monthlyEvents: 0
        });
      }
    };

    fetchStats();
  }, [axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About ClubSphere</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Connecting passionate individuals through shared interests and fostering vibrant communities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At ClubSphere, we believe that shared passions bring people together. Our mission is to provide 
            a seamless platform where individuals can discover, create, and participate in clubs that align 
            with their interests. We aim to foster meaningful connections and vibrant communities by offering 
            intuitive tools for club management and engagement.
          </p>
        </div>

        <div className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What We Offer</h2>
          <ul className="text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              Easy club creation and management tools
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              Comprehensive event organization features
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              Secure membership management systems
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              Intuitive user interface for all skill levels
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              Responsive design for all devices
            </li>
          </ul>
        </div>
      </div>

      <div className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          ClubSphere was founded with a simple idea: that people are at their best when they're pursuing 
          their passions with others who share similar interests. What started as a small project to connect 
          local enthusiasts has grown into a thriving platform that hosts thousands of clubs across diverse 
          categories.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Today, we continue to evolve and improve our platform, listening to our community and adapting 
          to meet their ever-changing needs. Our commitment remains the same: to facilitate genuine 
          connections and meaningful experiences through shared interests.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{stats.activeMembers}</h3>
          <p className="text-gray-600">Active Members</p>
        </div>
        <div className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{stats.activeClubs}</h3>
          <p className="text-gray-600">Active Clubs</p>
        </div>
        <div className="card card-standard bg-base-100 border border-base-300 rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{stats.monthlyEvents}</h3>
          <p className="text-gray-600">Total Events</p>
        </div>
      </div>
    </div>
  );
};

export default About;