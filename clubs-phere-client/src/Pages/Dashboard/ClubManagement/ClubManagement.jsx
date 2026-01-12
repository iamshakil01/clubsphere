import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const ClubsManagement = () => {
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const [editingClub, setEditingClub] = useState(null);

    const { register, handleSubmit, reset, watch } = useForm();
    const bannerPreview = watch("bannerImage");

    const filter = new URLSearchParams(location.search).get("filter");

    
    const {
        data: clubs = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ["clubs"],
        queryFn: async () => {
            const res = await axiosSecure.get("/dashboard/clubs-management");
            return res.data;
        }
    });

    
    const handleStatusChange = async (id, status) => {
        try {
            const res = await axiosSecure.patch(
                `/dashboard/clubs-management/${id}/status`,
                { status }
            );
            if (res.data.modifiedCount > 0) refetch();
        } catch (err) {
            console.error(err);
        }
    };

    
    const handleDelete = async (id) => {
        try {
            const res = await axiosSecure.delete(
                `/dashboard/clubs-management/${id}`
            );
            if (res.data.deletedCount > 0) refetch();
        } catch (err) {
            console.error(err);
        }
    };

    
    const openEditForm = (club) => {
        setEditingClub(club);
        reset({
            clubName: club.clubName,
            description: club.description,
            location: club.location,
            membershipFee: club.membershipFee,
            category: club.category,
            bannerImage: club.bannerImage
        });
    };

    const onSubmit = async (data) => {
        try {
            if (!data.bannerImage?.trim()) delete data.bannerImage;

            const res = await axiosSecure.patch(
                `/dashboard/clubs-management/${editingClub._id}`,
                data
            );

            if (res.data.modifiedCount > 0) {
                setEditingClub(null);
                refetch();
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) return <Loading />;

    const filtered = filter
        ? clubs.filter(c => c.status === filter)
        : clubs;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto p-6"
        >
            <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-bold mb-4"
            >
                Total Clubs: {clubs.length}
            </motion.h2>

            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="overflow-x-auto bg-white rounded shadow"
            >
                <table className="w-full text-center">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Creator</th>
                            <th>Status</th>
                            <th>Fee</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <AnimatePresence>
                        {filtered.map((club, i) => (
                            <motion.tr 
                                key={club._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="border-b"
                                whileHover={{ y: -2, backgroundColor: '#f9fafb' }}
                            >
                                <td>{i + 1}</td>
                                <td>{club.clubName}</td>
                                <td>{club.createdBy}</td>
                                <td>{club.status}</td>
                                <td>{club.membershipFee}</td>
                                <td className="space-x-1 py-2">
                                    {club.status === "pending" && (
                                        <>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() =>
                                                    handleStatusChange(club._id, "approved")
                                                }
                                                className="bg-green-600 text-white px-2 py-1 rounded"
                                            >
                                                Approve
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() =>
                                                    handleStatusChange(club._id, "rejected")
                                                }
                                                className="bg-red-600 text-white px-2 py-1 rounded"
                                            >
                                                Reject
                                            </motion.button>
                                        </>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => openEditForm(club)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleDelete(club._id)}
                                        className="bg-gray-700 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </motion.div>

            {/* edit modal */}
            <AnimatePresence>
            {editingClub && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="bg-white p-5 rounded w-96"
                    >
                        <h3 className="text-xl font-bold mb-3">Edit Club</h3>

                        {bannerPreview && (
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                src={bannerPreview}
                                alt="preview"
                                className="w-full h-40 object-cover rounded mb-3"
                                onError={(e) =>
                                (e.target.src =
                                    "https://via.placeholder.com/600x300")
                                }
                            />
                        )}

                        <motion.form 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            onSubmit={handleSubmit(onSubmit)} 
                            className="space-y-2"
                        >
                            <motion.input 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                {...register("clubName")} 
                                placeholder="e.g., Photography Enthusiasts Club, Tech Innovators Society, Sports Champions United" 
                                className="input w-full"
                            />
                            <motion.input 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                {...register("description")} 
                                placeholder="Share the club's mission, vision, activities, meeting schedule, goals, and what makes it special. Describe what members will gain from joining and any unique features..." 
                                className="input w-full"
                            />
                            <motion.input 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                {...register("location")} 
                                placeholder="e.g., Downtown Community Center" 
                                className="input w-full"
                            />
                            <motion.input 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                type="number" 
                                {...register("membershipFee")} 
                                placeholder="e.g., 25" 
                                className="input w-full"
                            />
                            <motion.input 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                {...register("category")} 
                                placeholder="e.g., Photography" 
                                className="input w-full"
                            />
                            <motion.input
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                {...register("bannerImage")}
                                placeholder="e.g., https://images.unsplash.com/photo-1542500429-4116073fc98f (club activity, meeting, or relevant image)"
                                className="input w-full"
                            />

                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                className="flex justify-end gap-2"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={() => setEditingClub(null)}
                                    className="bg-gray-400 px-3 py-1 rounded text-white"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="bg-indigo-600 px-3 py-1 rounded text-white"
                                >
                                    Save
                                </motion.button>
                            </motion.div>
                        </motion.form>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ClubsManagement;
