import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const MyClubs = () => {
  const [myClubs, setMyClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyClubs = async () => {
      try {
        if (user) {
          // Fetch clubs created by the current user
          const response = await axiosSecure.get(`/clubs`);
          const userClubs = response.data.filter(club => club.createdBy === user.email);
          setMyClubs(userClubs);
        }
      } catch (error) {
        console.error('Error fetching user clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyClubs();
  }, [user, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-10"
    >
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6"
      >
        My Clubs
      </motion.h1>
      
      {myClubs.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center py-10"
        >
          <motion.h3 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-xl font-medium text-gray-700 mb-2"
          >
            You haven't created any clubs yet
          </motion.h3>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-gray-500 mb-6"
          >
            Start by creating your first club!
          </motion.p>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/create-club" className="btn btn-primary">
              Create a Club
            </Link>
          </motion.div>
        </motion.div>
      ) : (
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
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {myClubs.map((club, index) => (
            <motion.div
              key={club._id}
              custom={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-white rounded-3xl shadow-lg border border-transparent hover:border-green-200 overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={club.image}
                  alt={club.clubName}
                  className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 opacity-0 group-hover:opacity-50 transition"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors underline-offset-2 group-hover:underline">
                  {club.clubName}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {club.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {club.category}
                  </span>

                  <span
                    className={`text-sm font-semibold ${
                      club.membershipFee === 0
                        ? "text-green-600 bg-green-100 px-2 py-1 rounded-full"
                        : "text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full"
                    }`}
                  >
                    {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
                  </span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/clubs/${club._id}`}
                    className="inline-block w-full text-center text-white bg-green-600 hover:bg-green-700 font-semibold py-2 rounded-xl transition transform hover:-translate-y-0.5"
                  >
                    View Details
                  </Link>
                </motion.div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition"></div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyClubs;