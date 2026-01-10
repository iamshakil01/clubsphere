import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loadingReviewSubmit, setLoadingReviewSubmit] = useState(false);
  
  // Fetch reviews when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        // Assuming there's an API endpoint for reviews
        const response = await axiosSecure.get(`/clubs/${id}/reviews`);
        const fetchedReviews = response.data;
        setReviews(fetchedReviews);
        
        // Calculate average rating
        if (fetchedReviews.length > 0) {
          const totalRating = fetchedReviews.reduce((sum, review) => sum + review.rating, 0);
          const avgRating = totalRating / fetchedReviews.length;
          setAverageRating(avgRating);
        } else {
          setAverageRating(0);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
        setAverageRating(0);
      } finally {
        setLoadingReviews(false);
      }
    };
    
    fetchReviews();
  }, [id, axiosSecure]);
  
  // Function to handle adding a new review
  const handleAddReview = async () => {
    if (!selectedRating || !reviewText.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Please select a rating and write a review.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    try {
      setLoadingReviewSubmit(true);
      
      // Get user info from auth context if needed
      // For now, assuming the backend gets user info from the token
      const reviewData = {
        rating: selectedRating,
        comment: reviewText,
        clubId: id // Associate the review with the club
      };
      
      // Submit the review to the backend
      await axiosSecure.post(`/clubs/${id}/reviews`, reviewData);
      
      // Show success message
      Swal.fire({
        title: 'Success',
        text: 'Your review has been submitted!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
      // Reset the form
      setSelectedRating(0);
      setReviewText('');
      
      // Refresh the reviews list
      const response = await axiosSecure.get(`/clubs/${id}/reviews`);
      const fetchedReviews = response.data;
      setReviews(fetchedReviews);
      
      // Recalculate average rating
      if (fetchedReviews.length > 0) {
        const totalRating = fetchedReviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / fetchedReviews.length;
        setAverageRating(avgRating);
      } else {
        setAverageRating(0);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      
      // Check for specific error messages from the backend
      if (error.response?.data?.message) {
        if (error.response.data.message.includes('You have already reviewed this club')) {
          Swal.fire({
            title: 'Duplicate Review',
            text: 'You have already submitted a review for this club.',
            icon: 'info',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to submit your review. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } finally {
      setLoadingReviewSubmit(false);
    }
  };

  const { data: clubs, isLoading } = useQuery({
    queryKey: ["clubs", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/clubs/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleJoin = () => {
    Swal.fire({
      icon: "success",
      title: "Joined Successfully!",
      text: `You are now a member of ${clubs.clubName}`,
      confirmButtonColor: "#16a34a"
    });
    document.getElementById("join_modal").close();
  };

  const handleStripePay = async () => {
    const paymentInfo = {
      cost: clubs.membershipFee,
      clubId: clubs._id,
      clubName: clubs.clubName,
    };

    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    if (res.data.url) {
      window.location.href = res.data.url;
    }
    document.getElementById("join_modal").close();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <img
          src={clubs.image}
          alt={clubs.clubName}
          className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
        />
        <h1 className="absolute bottom-4 left-6 text-4xl font-extrabold text-white drop-shadow-lg">
          {clubs.clubName}
        </h1>
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 flex items-center space-x-2 shadow-lg">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371-1.24.588-1.81L7.05 2.927z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-800 font-bold text-sm">{averageRating > 0 ? averageRating.toFixed(1) : 'No ratings'}</span>
        </div>
      </div>
  
      {/* Gallery Section */}
      {clubs.gallery && clubs.gallery.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {clubs.gallery.map((galleryImage, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-xl shadow-md">
                <img
                  src={galleryImage}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}
  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Description / Overview */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-200 pb-2">Description / Overview</h2>
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
              {clubs.description}
            </p>
          </section>
  
          {/* Key Information / Specifications */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-200 pb-2">Key Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Category: <span className="font-semibold">{clubs.category}</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3m-6 9c0 1.657 1.343 3 3 3h10c1.657 0 3-1.343 3-3v-8c0-1.657-1.343-3-3-3H9c-1.657 0-3 1.343-3 3v8z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Membership Fee: <span className="font-semibold">{clubs.membershipFee === 0 ? "Free" : `$${clubs.membershipFee}`}</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Location: <span className="font-semibold">{clubs.location || "N/A"}</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">Created: <span className="font-semibold">{new Date(clubs.createdAt || clubs.createdAt).toLocaleDateString()}</span></span>
              </div>
            </div>
          </section>
  
          {/* Reviews / Ratings */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-200 pb-2">Reviews & Ratings</h2>
            <div className="space-y-4">
              {loadingReviews ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">Loading reviews...</p>
                </div>
              ) : reviews && reviews.length > 0 ? (
                <>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${(i + 1) <= averageRating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371-1.24.588-1.81L7.05 2.927z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">{averageRating.toFixed(1)} out of 5</span>
                  </div>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review._id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-semibold mr-3">
                            {review.reviewerName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white">{review.reviewerName}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${(i + 1) <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371-1.24.588-1.81L7.05 2.927z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No reviews yet. Be the first to review this club!</p>
              )}
            </div>
          </section>

          {/* Add Review Form */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-200 pb-2">Add Your Review</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Rating:</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-2xl ${star <= selectedRating ? 'text-yellow-400' : 'text-gray-300'}`}
                      onClick={() => setSelectedRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this club..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="4"
              />
              <button
                onClick={handleAddReview}
                disabled={!selectedRating || !reviewText.trim() || loadingReviewSubmit}
                className="btn bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2 rounded-full font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingReviewSubmit ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </section>
        </div>
  
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <button
              className="btn bg-indigo-600 text-white hover:bg-indigo-700 w-full py-3 rounded-full font-semibold transition mb-4"
              onClick={() => document.getElementById("join_modal").showModal()}
            >
              Join Club
            </button>
            <Link
              to="/all-clubs"
              className="btn btn-outline w-full py-3 rounded-full font-medium"
            >
              ← Back to All Clubs
            </Link>
          </div>
  
          {/* Related Items */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Related Clubs</h2>
            <div className="space-y-4">
              {clubs.relatedClubs && clubs.relatedClubs.length > 0 ? (
                clubs.relatedClubs.map((relatedClub) => (
                  <Link
                    key={relatedClub._id}
                    to={`/clubs/${relatedClub._id}`}
                    className="block p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-white">{relatedClub.clubName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{relatedClub.description}</p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No related clubs found.</p>
              )}
            </div>
          </section>
        </div>
      </div>
  
      <dialog id="join_modal" className="modal">
        <div className="modal-box space-y-4 p-6 bg-white rounded-xl shadow-2xl">
          <h3 className="text-2xl font-bold text-center">{`Join ${clubs.clubName}`}</h3>
  
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Category:</strong> {clubs.category}</p>
            <p><strong>Fee:</strong>{}
              {clubs.membershipFee === 0 ? "Free" : `$${clubs.membershipFee}`}</p>
            <p className="text-gray-500">{clubs.description}</p>
          </div>
  
          <div className="modal-action flex flex-col gap-3">
            {clubs.membershipFee === 0 ? (
              <>
                <button
                  className="btn btn-secondary w-full rounded-full"
                  onClick={handleJoin}
                >
                  Confirm Join
                </button>
                <button
                  className="btn btn-outline w-full rounded-full"
                  onClick={() => document.getElementById("join_modal").close()}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-secondary w-full rounded-full"
                  onClick={handleStripePay}
                >
                  Pay with Stripe
                </button>
                <button
                  className="btn btn-outline w-full rounded-full"
                  onClick={() => document.getElementById("join_modal").close()}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ClubDetails;