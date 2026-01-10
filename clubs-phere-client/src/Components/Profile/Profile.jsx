import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        photoURL: ''
    });
    
    // Update formData when user changes
    React.useEffect(() => {
        setFormData({
            displayName: user?.displayName || '',
            photoURL: user?.photoURL || ''
        });
    }, [user]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        
        try {
            // Update user profile in Firebase
            await updateUserProfile({
                displayName: formData.displayName,
                photoURL: formData.photoURL
            });
            
            // Update user data in backend database
            await axiosSecure.patch(`/users/${user.email}`, {
                displayName: formData.displayName,
                photoURL: formData.photoURL
            });
            
            Swal.fire({
                title: 'Success!',
                text: 'Profile updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update profile. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden">


                <div className="bg-green-600 text-white py-6 px-8">
                    <h1 className="text-5xl font-bold">Your Profile</h1>
                </div>

                <div className="flex flex-col md:flex-row md:items-start p-8 gap-10">


                    <div className="flex flex-col items-center md:items-start">
                        <div className="w-40 h-40 rounded-full ring-8 ring-white shadow-lg overflow-hidden">
                            <img
                                src={user.photoURL || "https://i.ibb.co/6rW81yM/user-default.png"}
                                alt="Profile Avatar"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <p className="mt-4 text-lg font-semibold text-gray-800 uppercase bg-yellow-400 px-4 py-2 rounded-full shadow-inner">
                            {role}
                        </p>
                    </div>

                    {/* User Details Card */}
                    <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 space-y-6">

                        {/* Name & Email */}
                        <div className="space-y-2">
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-700">Full Name</h3>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleInputChange}
                                        className="text-3xl font-bold text-gray-900 w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                                    />
                                ) : (
                                    <p className="text-3xl font-bold text-gray-900">{user.displayName}</p>
                                )}
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold text-gray-700">Email Address</h3>
                                <p className="text-xl text-gray-900">{user.email}</p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-semibold text-gray-700">Joined ClubSphere On</h3>
                                <p className="text-md text-gray-600">
                                    {user.metadata?.creationTime}
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-700">Profile Picture URL</h3>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="photoURL"
                                        value={formData.photoURL}
                                        onChange={handleInputChange}
                                        className="text-md text-gray-900 w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                                        placeholder="Enter image URL"
                                    />
                                ) : (
                                    <p className="text-md text-gray-900 truncate">{user.photoURL || 'No profile picture'}</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Edit Controls */}
                        <div className="flex flex-wrap gap-4 mt-6">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleUpdateProfile}
                                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFormData({
                                                displayName: user.displayName || '',
                                                photoURL: user.photoURL || ''
                                            });
                                        }}
                                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        {/* Manage Info */}
                        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-sm">
                            <p className="font-semibold text-green-700 text-lg">
                                Manager Status
                            </p>
                            <p className="text-md text-green-600">
                                You manage <span className="font-bold">1</span> club(s).
                                Access and manage them from the Dashboard.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
