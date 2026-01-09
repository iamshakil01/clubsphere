import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import useAuth from "../../../Hooks/useAuth";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosSecure.get("/events");
        setEvents(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Could not load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [axiosSecure]);

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;


  const handleFreeJoin = async () => {
    try {
      await axiosSecure.post(`/events/${selectedEvent._id}/register`);
      alert("Registered successfully 🎉");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
    setSelectedEvent(null);
  };


  const handleStripePay = async () => {
    try {
      const paymentInfo = {
        cost: selectedEvent.price,
        clubId: selectedEvent.clubId,     
        eventId: selectedEvent._id,        
        senderEmail: user.email,             
        clubName: selectedEvent.title,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment failed");
    }
    setSelectedEvent(null);
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Upcoming Events
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover exciting events and connect with your community
        </p>
      </div>

      {/* EVENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((evt) => (
          <div 
            key={evt._id} 
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full border border-base-200 overflow-hidden"
          >
            <div className="relative">
              <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-4xl font-bold mb-2">{new Date(evt.date).getDate()}</div>
                  <div className="text-lg font-semibold">{new Date(evt.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-indigo-600">
                {evt.price > 0 ? `$${evt.price}` : "Free"}
              </div>
            </div>
            
            <div className="card-body p-6">
              <h2 className="card-title text-xl font-bold mb-3 text-gray-800 dark:text-white">
                {evt.title}
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(evt.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                
                {evt.location && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {evt.location}
                  </div>
                )}
              </div>

              {evt.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {evt.description}
                </p>
              )}

              <div className="mt-auto pt-4">
                <button
                  className="btn btn-primary w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-none"
                  onClick={() => setSelectedEvent(evt)}
                >
                  Join Event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-base-100 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
              <div className="flex items-center text-indigo-100">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200 rounded-full text-sm font-semibold">
                  {selectedEvent.price > 0 ? `$${selectedEvent.price}` : "Free Event"}
                </span>
              </div>
              
              {selectedEvent.location && (
                <div className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedEvent.location}
                </div>
              )}
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {selectedEvent.description}
              </p>
              
              <div className="space-y-3">
                {selectedEvent.price > 0 ? (
                  <button
                    className="btn btn-primary w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-none"
                    onClick={handleStripePay}
                  >
                    Pay & Join - ${selectedEvent.price}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-none"
                    onClick={handleFreeJoin}
                  >
                    Join Event
                  </button>
                )}
                
                <button
                  className="btn btn-outline w-full border-gray-300 text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
                  onClick={() => setSelectedEvent(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
